#!/usr/bin/env python3
"""Audit the project's node-based Ink dialect without changing story content.

Run: python3 scripts/audit_ink.py --report /tmp/ink-audit.md
Optional --format joins hard-wrapped prose, preserving paragraph boundaries,
comments, tags, choices and diverts. Missing branches are never invented.
Exit status is 1 when structural issues remain, 0 when clean.
"""
import argparse
import collections
import json
import re
from pathlib import Path

from ink_to_json import parse_ink

HEADER = re.compile(r'^===\s*(\w+)\s*===\s*$')
CHOICE = re.compile(r'^\s*[+*]\s*\[(.+?)\]\s*->\s*([\w.-]+)\s*$')
DIVERT = re.compile(r'^\s*->\s*([\w.-]+)\s*$')
TERMINALS = {'DONE', 'END'}


def reflow(text):
    result, paragraph = [], []

    def flush():
        if paragraph:
            result.append(' '.join(line.strip() for line in paragraph))
            paragraph.clear()

    for line in text.splitlines():
        stripped = line.strip()
        structural = (not stripped or stripped.startswith(('//', '#', '===', '*', '+', '->', '~', '{', '}', 'VAR ', 'LIST ', 'EXTERNAL ', 'INCLUDE ')))
        if structural:
            flush()
            result.append(line.rstrip())
        else:
            paragraph.append(line)
    flush()
    return '\n'.join(result).rstrip() + '\n'


def audit(path):
    text = path.read_text(encoding='utf-8')
    nodes, issues, links = {}, [], []
    current = None
    explicit_ends = set()
    for number, line in enumerate(text.splitlines(), 1):
        stripped = line.strip()
        if not stripped or stripped.startswith('//'):
            continue
        match = HEADER.fullmatch(line)
        if match:
            current = match[1]
            if current in nodes:
                issues.append((number, 'duplicate', f'Passage `{current}` repeats line {nodes[current]}; conversion overwrites earlier content.'))
            else:
                nodes[current] = number
            continue
        choice, divert = CHOICE.fullmatch(line), DIVERT.fullmatch(line)
        if choice or divert:
            target = choice[2] if choice else divert[1]
            if target in TERMINALS:
                explicit_ends.add(current)
            else:
                links.append((current, target, number))
        elif stripped.startswith(('*', '+', '->', '===')):
            issues.append((number, 'syntax', f'Unrecognized structural line: `{stripped}`'))
        if stripped.startswith('# UNLOCK_EVIDENCE:') and not re.fullmatch(r'# UNLOCK_EVIDENCE:\s*[\w-]+', stripped):
            issues.append((number, 'tag', 'Malformed evidence tag or prose attached to tag.'))
    # DialogueManager uses start, then root, then the first parsed passage.
    entry = 'start' if 'start' in nodes else 'root' if 'root' in nodes else next(iter(nodes), None)
    if entry is None:
        issues.append((1, 'entry', 'No playable passages.'))
    parsed = parse_ink(text)
    graph = {n: {c['destination'] for c in v['choices'] if c['destination'] in parsed}
             for n, v in parsed.items()}
    for source, target, number in links:
        if target not in nodes:
            issues.append((number, 'missing', f'`{source or "entry"}` → `{target}` does not exist.'))
    reachable, pending = set(), [entry] if entry else []
    while pending:
        node = pending.pop()
        if node in reachable:
            continue
        reachable.add(node)
        pending.extend(graph[node] - reachable)
    for node in nodes.keys() - reachable:
        issues.append((nodes[node], 'unreachable', f'`{node}` cannot be reached from `{entry}`.'))
    # Use the actual converter's exit semantics; a node with no choices ends.
    can_exit = {n for n, v in parsed.items() if not v['choices']}
    while True:
        expanded = can_exit | {n for n, edges in graph.items() if edges & can_exit}
        if expanded == can_exit:
            break
        can_exit = expanded
    for node in reachable - can_exit:
        issues.append((nodes[node], 'no_exit', f'`{node}` has no valid route to a dialogue ending.'))
    for node in explicit_ends:
        if node in parsed and parsed[node]['choices']:
            issues.append((nodes[node], 'mixed_end', f'`{node}` mixes choices with a terminal divert; runtime retains the choices.'))
    counterpart = path.with_suffix('.json')
    try:
        if json.loads(counterpart.read_text(encoding='utf-8')) != parsed:
            issues.append((1, 'json_mismatch', 'Playable JSON differs from Ink source.'))
    except (OSError, ValueError):
        issues.append((1, 'json_mismatch', 'Playable JSON missing or invalid.'))
    return sorted(issues), len(nodes)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--format', action='store_true')
    parser.add_argument('--report', type=Path)
    args = parser.parse_args()
    paths = sorted(args.root.rglob('*.ink'))
    changed = 0
    if args.format:
        for path in paths:
            before = path.read_text(encoding='utf-8')
            after = reflow(before)
            # Formatting must not alter any non-whitespace character.
            assert re.sub(r'\s+', '', before) == re.sub(r'\s+', '', after), path
            if before != after:
                path.write_text(after, encoding='utf-8')
                changed += 1
        print(f'Reformatted {changed} files (whitespace only).')
    results = [(p, *audit(p)) for p in paths]
    counts = collections.Counter(kind for _, issues, _ in results for _, kind, _ in issues)
    lines = ['# Ink dialogue audit', '', f'Files checked: {len(paths)}. Files with findings: {sum(bool(i) for _, i, _ in results)}.', '',
             'This checks the node-based dialect used by `scripts/ink_to_json.py`, not full Ink compilation. It checks connections and source/JSON synchronization, not biblical accuracy or evidence-ID validity.', '',
             '## Summary', '', '| Finding | Count |', '| --- | ---: |']
    lines += [f'| {kind} | {count} |' for kind, count in sorted(counts.items())]
    lines += ['', '## File inventory', '', '| File | Passages | Findings |', '| --- | ---: | ---: |']
    lines += [f'| {p.relative_to(args.root)} | {size} | {len(issues)} |' for p, issues, size in results]
    for path, issues, _ in results:
        if issues:
            lines += ['', f'## {path.relative_to(args.root)}', '']
            lines += [f'- Line {line} — **{kind}**: {message}' for line, kind, message in issues]
    report = '\n'.join(lines) + '\n'
    if args.report:
        args.report.write_text(report, encoding='utf-8')
    print(f'{len(paths)} files checked: {dict(counts)}')
    return int(bool(counts))


if __name__ == '__main__':
    raise SystemExit(main())
