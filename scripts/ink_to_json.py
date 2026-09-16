#!/usr/bin/env python3
"""
ink_to_json.py — Convert Miracle Maker .ink dialogue files to the
node-based JSON format used by DialogueManager (same shape as the
existing assets/story/*.json files).

Usage:
    python ink_to_json.py                          # convert all .ink → .json
    python ink_to_json.py path/to/file.ink          # single file
    python ink_to_json.py path/to/file.ink out.json # single file, custom output
    python ink_to_json.py --dry-run                 # show what would happen
    python ink_to_json.py --backup                  # keep .ink.bak copies

The script is idempotent: running it twice produces identical output
unless the .ink source has changed.
"""

import re
import os
import sys
import json
import argparse
import shutil
import ast
import hashlib
from pathlib import Path


# ── Ink parser ───────────────────────────────────────────────────────────────

INK_NODE_RE = re.compile(r'^===\s*(\w+)\s*===\s*$', re.MULTILINE)
CHOICE_RE   = re.compile(r'^\s*[+*]\s*\[(.+?)\]\s*->\s*([\w.-]+)\s*$')
DIVERT_RE   = re.compile(r'^->\s*(DONE|END|\w+)\s*$')
COMMENT_RE  = re.compile(r'^\s*//.*$')
BLANK_RE    = re.compile(r'^\s*$')


def parse_ink(text: str) -> dict:
    return parse_stateful_ink(text)


def expression(source):
    """Compile a deliberately small, safe expression dialect; never eval text."""
    source = re.sub(r'\btrue\b', 'True', source.strip())
    source = re.sub(r'\bfalse\b', 'False', source)
    def visit(node):
        if isinstance(node, ast.Constant) and type(node.value) in (bool, int, float, str):
            return {'literal': node.value}
        if isinstance(node, ast.Name):
            return {'variable': node.id}
        if isinstance(node, ast.UnaryOp) and isinstance(node.op, ast.Not):
            return {'not': visit(node.operand)}
        if isinstance(node, ast.BoolOp):
            return {'all' if isinstance(node.op, ast.And) else 'any': [visit(v) for v in node.values]}
        if isinstance(node, ast.Compare) and len(node.ops) == 1:
            op = {ast.Eq: 'eq', ast.NotEq: 'ne', ast.Gt: 'gt', ast.GtE: 'ge', ast.Lt: 'lt', ast.LtE: 'le'}.get(type(node.ops[0]))
            if op:
                return {'compare': op, 'left': visit(node.left), 'right': visit(node.comparators[0])}
        raise ValueError('Unsupported expression: ' + source)
    return visit(ast.parse(source, mode='eval').body)


def parse_stateful_ink(text):
    nodes, variables, conditions = {}, {}, []
    node = None
    entry = None
    for number, raw in enumerate(text.splitlines(), 1):
        line = raw.strip()
        if not line or line.startswith('//'):
            continue
        declaration = re.fullmatch(r'VAR\s+(\w+)\s*=\s*(.+)', line)
        if declaration:
            value = expression(declaration[2])
            if 'literal' not in value:
                raise ValueError(f'Line {number}: defaults must be literals')
            variables[declaration[1]] = value['literal']
            continue
        header = INK_NODE_RE.fullmatch(line)
        if header:
            if conditions:
                raise ValueError(f'Line {number}: unclosed condition')
            name = header[1]
            if name in nodes:
                raise ValueError(f'Line {number}: duplicate passage {name}')
            node = nodes[name] = {'content': '', 'choices': [], 'steps': []}
            continue
        block = re.fullmatch(r'\{\s*(.+):', line)
        if block:
            conditions.append(expression(block[1]))
            continue
        if line == '- else:':
            if not conditions:
                raise ValueError(f'Line {number}: else without condition')
            conditions[-1] = {'not': conditions[-1]}
            continue
        if line == '}':
            if not conditions:
                raise ValueError(f'Line {number}: unmatched brace')
            conditions.pop()
            continue
        divert = DIVERT_RE.fullmatch(line)
        if node is None:
            if divert:
                entry = divert[1]
                continue
            raise ValueError(f'Line {number}: content outside a passage')
        condition = {'all': list(conditions)}
        choice = re.fullmatch(r'([*+])\s*(?:\{(.+?)\}\s*)?\[(.+?)\]\s*->\s*([\w.-]+)', line)
        if choice:
            guards = list(conditions)
            if choice[2]:
                guards.append(expression(choice[2]))
            node['choices'].append({'text': choice[3], 'destination': choice[4], 'once': choice[1] == '*', 'condition': {'all': guards}})
            continue
        assignment = re.fullmatch(r'~\s*(\w+)\s*(=|\+=|-=)\s*(.+)', line)
        if assignment:
            node['steps'].append({'set': assignment[1], 'operator': assignment[2], 'value': expression(assignment[3]), 'condition': condition})
        elif divert:
            node['steps'].append({'divert': divert[1], 'condition': condition})
        elif line.startswith('#'):
            node['steps'].append({'tag': line[1:].strip(), 'condition': condition})
        else:
            if line.startswith(('~', '{', '}', '*', '+', 'LIST ', 'EXTERNAL ', 'INCLUDE ')):
                raise ValueError(f'Line {number}: unsupported Ink syntax: {line}')
            node['steps'].append({'text': line, 'condition': condition})
            node['content'] += ('\n' if node['content'] else '') + line
    if conditions:
        raise ValueError('Unclosed condition')
    if not nodes:
        return {}
    entry = entry or ('start' if 'start' in nodes else 'root' if 'root' in nodes else next(iter(nodes)))
    if entry not in nodes:
        raise ValueError('Missing entry: ' + entry)
    for name, passage in nodes.items():
        targets = [c['destination'] for c in passage['choices']] + [s['divert'] for s in passage['steps'] if 'divert' in s]
        for target in targets:
            if target not in nodes and target not in ('DONE', 'END'):
                raise ValueError(f'{name}: missing destination {target}')
    nodes['_meta'] = {'schema': 2, 'entry': entry, 'variables': variables, 'revision': hashlib.sha256(text.encode()).hexdigest()[:16]}
    return nodes


def parse_legacy_ink(text: str) -> dict:
    """
    Parse raw .ink text into {node_name: {content, choices}}.
    - Strips // comments and blank lines.
    - Collects plain text lines as content until a choice or next node.
    - Choices become {text, destination} objects.
    - -> DONE / -> END are terminal (no choices).
    - -> knot_name is treated as an implicit choice (where text == knot_name).
    """
    nodes = {}
    current_node = None
    current_content_lines = []
    current_choices = []

    lines = text.split('\n')

    for line in lines:
        # Skip pure comments and blank lines inside content
        if COMMENT_RE.match(line) or BLANK_RE.match(line):
            continue

        # Node header
        node_match = INK_NODE_RE.match(line)
        if node_match:
            # Flush previous node
            if current_node is not None:
                nodes[current_node] = _flush_node(current_content_lines, current_choices)
            current_node = node_match.group(1)
            current_content_lines = []
            current_choices = []
            continue

        # Choice line
        choice_match = CHOICE_RE.match(line)
        if choice_match:
            text = choice_match.group(1).strip()
            dest = choice_match.group(2).strip()
            current_choices.append({"text": text, "destination": dest})
            continue

        # Divert line (terminal or implicit jump)
        divert_match = DIVERT_RE.match(line)
        if divert_match:
            target = divert_match.group(1)
            if target in ('DONE', 'END'):
                # Terminal — handled in _flush_node
                pass
            else:
                # Implicit choice: text is the knot name itself
                current_choices.append({"text": target, "destination": target})
            continue

        # Plain content line
        if current_node is not None:
            current_content_lines.append(line)

    # Flush final node
    if current_node is not None:
        nodes[current_node] = _flush_node(current_content_lines, current_choices)

    return nodes


def _flush_node(content_lines: list, choices: list) -> dict:
    """Join content lines and attach choices."""
    content = '\n'.join(content_lines).strip()
    # Clean up leading/trailing whitespace on each line but preserve intentional breaks
    content = '\n'.join(line.rstrip() for line in content.split('\n'))
    node = {"content": content}
    if choices:
        node["choices"] = choices
    else:
        # Terminal node: signal end-of-dialogue
        node["choices"] = []
    return node


# ── File helpers ─────────────────────────────────────────────────────────────

def ink_paths(directory: str):
    """Yield all .ink file paths under directory."""
    directory = Path(directory)
    yield from sorted(directory.glob('**/*.ink'))


def json_counterpart(ink_path: Path) -> Path:
    """Return the matching .json path (same basename, adjacent directory)."""
    return ink_path.with_suffix('.json')


def convert_file(ink_path: Path, json_path: Path = None, *, dry_run=False, backup=False) -> tuple:
    """
    Convert a single .ink file.
    Returns (status, message) where status is 'ok' | 'skip' | 'error'.
    """
    if json_path is None:
        json_path = json_counterpart(ink_path)

    source_text = ink_path.read_text(encoding='utf-8')

    # Skip files that are pure comment headers (no nodes)
    if not INK_NODE_RE.search(source_text):
        return 'skip', f'no story nodes found in {ink_path.name}'

    try:
        data = parse_ink(source_text)
    except Exception as exc:
        return 'error', f'{ink_path.name}: parse failed: {exc}'

    if not data:
        return 'skip', f'{ink_path.name}: empty after parsing'

    json_text = json.dumps(data, indent=2, ensure_ascii=False) + '\n'

    if dry_run:
        return 'ok', f'{ink_path.name} → {json_path.name}  ({len(data)} nodes)'

    if backup and json_path.exists():
        backup_path = json_path.with_suffix('.json.bak')
        shutil.copy2(json_path, backup_path)

    json_path.write_text(json_text, encoding='utf-8')
    return 'ok', f'{ink_path.name} → {json_path.name}  ({len(data)} nodes)'


# ── CLI ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description='Convert .ink dialogue files to JSON for DialogueManager.'
    )
    parser.add_argument(
        'inputs',
        nargs='*',
        help='.ink file(s) or directory to convert (default: assets/story/ in cwd)'
    )
    parser.add_argument(
        '--all', action='store_true',
        help='convert every .ink in the target directory recursively'
    )
    parser.add_argument(
        '--dry-run', action='store_true',
        help='show what would be converted without writing files'
    )
    parser.add_argument(
        '--backup', action='store_true',
        help='copy existing .json to .json.bak before overwriting'
    )
    parser.add_argument(
        '-o', '--output',
        help='output path (only valid with a single input file)'
    )
    args = parser.parse_args()

    # Determine targets
    targets = []
    if args.inputs:
        for raw in args.inputs:
            p = Path(raw)
            if p.is_dir():
                targets.extend(ink_paths(p))
            elif p.suffix == '.ink':
                targets.append(p)
            else:
                print(f'⚠  skipping {raw} (not .ink)', file=sys.stderr)
    else:
        # Default: assets/story/ in current working directory
        story_dir = Path('story')
        if story_dir.is_dir():
            targets.extend(ink_paths(story_dir))
        else:
            targets.extend(ink_paths(Path('.')))

    if not targets:
        print('No .ink files found.', file=sys.stderr)
        sys.exit(1)

    single_output = None
    if args.output and len(targets) == 1:
        single_output = Path(args.output)

    results = {'ok': 0, 'skip': 0, 'error': 0}
    for ink_path in targets:
        out_path = single_output if single_output else None
        status, msg = convert_file(
            ink_path, out_path,
            dry_run=args.dry_run,
            backup=args.backup
        )
        results[status] += 1
        icon = {'ok': '✓', 'skip': '⠿', 'error': '✗'}.get(status, '?')
        print(f'  {icon}  {msg}')

    total = sum(results.values())
    print(f'\n{total} file(s) processed — {results["ok"]} converted, {results["skip"]} skipped, {results["error"]} errors.')

    if args.dry_run:
        print('(dry run — no files written)')
    elif args.backup and results['ok']:
        print('Backups saved as .json.bak alongside originals.')
    if results['error']:
        sys.exit(1)


if __name__ == '__main__':
    main()
