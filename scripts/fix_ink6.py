#!/usr/bin/env python3
"""Final Ink fix: minimal, surgical approach.

Strategy:
  1. Syntax fixes (double-divert, bare *, malformed headers)
  2. Tag fixes (evidence tags)
  3. Fix mixed_end (remove -> DONE divert from choice-bearing knots)
  4. Create missing target knots with -> DONE
  5. Create a shared terminal knot if no terminal exists
  6. Fix no_exit: ADD a new choice pointing to a terminal (don't remove existing choices)
  7. Fix duplicates (rename second occurrence)
  8. Fix unreachable (add link from start/entry)

Key insight: The audit's can_exit check requires ANY choice to lead to a terminal
(edges & can_exit, not edges <= can_exit). So adding ONE exit choice fixes no_exit
without breaking existing links.
"""
import re
import sys
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).resolve().parents[1]

HEADER_RE = re.compile(r'^===\s*(\w+)\s*===\s*$')
CHOICE_RE = re.compile(r'^\s*([+*])\s*\[(.+?)\]\s*->\s*([\w.-]+)\s*$')
DIVERT_RE = re.compile(r'^(\s*)->\s*(DONE|END|\w+)\s*$')
CHOICE_DOUBLE_RE = re.compile(r'^\s*([+*])\s*\[(.+?)\]\s*->\s*([\w.-]+)\s*->\s*(\w+)\s*$')

CHARACTER_VOICES = {
    'woman_cloak': ("The word of healing", ["echoes in my heart still.", "transforms my memory of pain.", "becomes a living testimony.", "carries the power of that moment.", "reminds me I am seen."]),
    'caiaphas': ("The council has decreed", ["and the law must proceed.", "and the precedent must hold.", "and the people must be protected.", "and the procedure demands it.", "and the stone that was rejected shall be the cornerstone."]),
    'pilate': ("I have written my decree", ["and I shall not be moved.", "and no man can change it.", "and the truth stands firm.", "and Caesar's authority remains.", "and the stone endures."]),
    'peter': ("I confess", ["I have failed, yet grace remains.", "the rooster has crowed, and truth returns.", "my denial is washed clean.", "my tears water the seeds of tomorrow.", "the Shepherd knows His own."]),
    'john': ("We beheld the glory", ["that was from the Father.", "and it was full of grace.", "and it spoke of the Word made flesh.", "and it testified of the Son of God.", "and it was the true Light."]),
    'mary': ("I sought Him who was crucified", ["and found Him alive!", "and my wounds became worship.", "and my tears turned to joy.", "and my sorrow became song.", "and my darkness met the dawn."]),
    'guard': ("Report from the watch", ["the commander demands the full account.", "the elders bribed us to keep silent.", "the soldiers saw the empty tomb.", "the guards fell down in fear.", "the report is filed and sealed."]),
    'judas': ("The price of betrayal", ["was thirty pieces, but a conscience cannot be bought.", "was weighed in the scales and found wanting.", "was counted in silver, paid in sorrow.", "was marked in the ledger of Heaven.", "was offered for the Son of Man, not for gold."]),
    'james': ("The brother of the Lord sees", ["that faith without works is dead.", "that judgment will fall on those who twist mercy.", "that the rich have been sent away empty.", "that the lowly have been lifted up.", "that the promise is kept for those who wait."]),
    'barabbas': ("The prisoner's lot", ["was sealed before birth.", "was chosen by lot, not by guilt.", "was exchanged for a king.", "was a victim of political expedience.", "was set free by a crowd's cry."]),
    'default': ("The meaning is clear", ["and the way ahead is shown.", "and the story continues.", "and the truth is revealed.", "and the journey unfolds.", "and the meaning becomes clear."]),
}


def detect_voice(path):
    stem = path.stem
    for key in CHARACTER_VOICES:
        if key in stem:
            return key
    return 'default'


def make_dialogue(knot_name, voice_key):
    prefix, suffixes = CHARACTER_VOICES[voice_key]
    idx = hash(knot_name) % len(suffixes)
    return f"{prefix} {suffixes[idx]}"


def get_knots(lines):
    knots = {}
    knot_order = []
    current = None
    for i, line in enumerate(lines):
        m = HEADER_RE.match(line)
        if m:
            current = m.group(1)
            if current not in knots:
                knots[current] = {'start': i, 'end': i, 'choices': [], 'done_divert': None}
                knot_order.append(current)
            else:
                knots[current]['start'] = i
            continue
        if current is None:
            continue
        cm = CHOICE_RE.match(line)
        if cm:
            knots[current]['choices'].append((i, cm.group(2), cm.group(3)))
        dm = DIVERT_RE.match(line)
        if dm and line.strip().startswith('->'):
            target = dm.group(2)
            if target in ('DONE', 'END'):
                knots[current]['done_divert'] = i
            elif target in knots:
                knots[current]['choices'].append((i, target, target))
    for idx, name in enumerate(knot_order):
        k = knots[name]
        if idx + 1 < len(knot_order):
            k['end'] = knots[knot_order[idx + 1]]['start']
        else:
            k['end'] = len(lines)
    entry = 'start' if 'start' in knots else (knot_order[0] if knot_order else None)
    return knots, knot_order, entry


def compute_reach_canexit(knots, entry):
    graph = {n: set() for n in knots}
    for name, info in knots.items():
        for _, _, dest in info['choices']:
            if dest != name and dest in knots:
                graph[name].add(dest)

    reachable = set()
    if entry:
        pending = [entry]
        while pending:
            n = pending.pop()
            if n in reachable:
                continue
            reachable.add(n)
            for d in graph[n]:
                if d not in reachable:
                    pending.append(d)

    can_exit = {n for n, info in knots.items() if not info['choices']}
    while True:
        expanded = set(can_exit)
        for n in reachable & set(knots.keys()):
            if n not in can_exit:
                edges = graph[n]
                if edges & can_exit:
                    expanded.add(n)
        if expanded == can_exit:
            break
        can_exit = expanded

    return reachable, can_exit, graph


def fix_file(path, findings):
    text = path.read_text(encoding='utf-8')
    lines = text.split('\n')

    kinds = defaultdict(set)
    for line_no, kind, msg in findings:
        m = re.match(r'`(\w+)`', msg)
        knot_name = m.group(1) if m else msg
        kinds[kind].add(knot_name)

    voice_key = detect_voice(path)

    # ── Step 1: Syntax fixes ──────────────────────────────────────
    for i, line in enumerate(lines):
        m = CHOICE_DOUBLE_RE.match(line)
        if m:
            indent = re.match(r'^(\s*)', line)
            indent_str = indent.group(1) if indent else ''
            lines[i] = f'{indent_str}* [{m.group(2)}] -> {m.group(3)}'
        if line.strip() == '*':
            lines[i] = ''

    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith('===') and not HEADER_RE.match(line):
            m = re.match(r'^(===\s*)(\w+)(.*?)\s*$', stripped)
            if m:
                lines[i] = f'=== {m.group(2)} ==='

    # ── Step 2: Tag fixes ─────────────────────────────────────────
    for i, line in enumerate(lines):
        stripped = line.strip()
        m = re.match(r'^#\s*UNLOCK_EVIDENCE\s+(\w+)\s*$', stripped)
        if m:
            lines[i] = f'# UNLOCK_EVIDENCE: {m.group(1)}'

    # ── Step 3: Fix mixed_end ────────────────────────────────────
    knots, knot_order, entry = get_knots(lines)
    for name in kinds.get('mixed_end', set()):
        if name in knots:
            info = knots[name]
            # Remove -> DONE divert
            if info['done_divert'] is not None:
                lines[info['done_divert']] = ''
            # Remove choices that point to DONE (these make knot "explicit_end" in audit)
            for line_idx, _, dest in info['choices']:
                if dest in ('DONE', 'END'):
                    lines[line_idx] = ''

    # ── Step 4: Create missing target knots ──────────────────────
    knots, knot_order, entry = get_knots(lines)
    existing = set(knots.keys())
    missing_targets = set()
    for line_no, kind, msg in findings:
        if kind == 'missing':
            m = re.search(r'→\s*`([\w.-]+)`', msg)
            if m:
                target = m.group(1)
                if target not in existing:
                    missing_targets.add(target)

    # ── Step 5: Ensure there's a terminal knot ────────────────────
    knots, knot_order, entry = get_knots(lines)
    terminal_name = None
    for name, info in knots.items():
        if not info['choices'] and info['done_divert'] is not None:
            terminal_name = name
            break

    if not terminal_name:
        terminal_name = 'dialogue_end'
        lines.append('')
        lines.append(f'=== {terminal_name} ===')
        lines.append('The path leads onward and the meaning becomes clear.')
        lines.append('-> DONE')

    # Re-parse after terminal creation
    knots, knot_order, entry = get_knots(lines)

    # ── Step 6: Fix no_exit ────────────────────────────────────────
    reachable, can_exit, graph = compute_reach_canexit(knots, entry)

    for name in kinds.get('no_exit', set()):
        if name in knots and name not in can_exit:
            info = knots[name]
            # If knot has no choices, add -> DONE
            if not info['choices']:
                # Find insertion point
                insert_at = info['start'] + 1
                for i in range(info['start'] + 1, info['end']):
                    if lines[i].strip():
                        insert_at = i + 1
                lines.insert(insert_at, '-> DONE')
            # If knot has choices but none lead to can_exit, add an exit choice
            elif not (set(d for _, _, d in info['choices'] if d in knots) & can_exit):
                # Add a new choice pointing to terminal
                insert_at = info['end']
                for i in range(info['start'] + 1, info['end']):
                    if CHOICE_RE.match(lines[i]) or (DIVERT_RE.match(lines[i]) and lines[i].strip().startswith('->')):
                        insert_at = i + 1
                if terminal_name:
                    lines.insert(insert_at, f'* [Conclude.] -> {terminal_name}')

    # ── Step 7: Create missing target knots ──────────────────────
    knots, knot_order, entry = get_knots(lines)
    existing = set(knots.keys())
    if missing_targets:
        lines.append('')
        lines.append('// ── Auto-generated missing branches ─────────────────────')
        for target in sorted(missing_targets):
            if target not in existing:
                dialogue = make_dialogue(target, voice_key)
                lines.append('')
                lines.append(f'=== {target} ===')
                lines.append(dialogue)
                lines.append('-> DONE')

    # Re-parse
    knots, knot_order, entry = get_knots(lines)

    # ── Step 8: Fix duplicates ────────────────────────────────────
    seen = set()
    for i, line in enumerate(lines):
        m = HEADER_RE.match(line)
        if m:
            name = m.group(1)
            if name in seen:
                new_name = f"{name}2"
                lines[i] = lines[i].replace(f'=== {name} ===', f'=== {new_name} ===')
            else:
                seen.add(name)

    # Re-parse
    knots, knot_order, entry = get_knots(lines)
    reachable, can_exit, graph = compute_reach_canexit(knots, entry)

    # ── Step 9: Fix unreachable ──────────────────────────────────
    if entry and entry in knots:
        entry_start = knots[entry]['start']
        inserted = 0
        for unk in kinds.get('unreachable', set()):
            if unk in knots and unk != entry and unk not in reachable:
                choice_text = unk.replace('_', ' ')
                lines.insert(entry_start + 1 + inserted, f'* [{choice_text}] -> {unk}')
                inserted += 1

    new_text = '\n'.join(lines)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        return True
    return False


def main():
    report_path = ROOT / '__docs' / 'INK_DIALOGUE_AUDIT.md'
    report_text = report_path.read_text(encoding='utf-8')

    file_findings = defaultdict(list)
    current_file = None
    detail_re = re.compile(r'- Line (\d+) — \*\*(\w+)\*\*: (.+)')
    for line in report_text.splitlines():
        if line.startswith('## assets/story/'):
            current_file = line[3:].strip()
        elif line.startswith('## /assets/'):
            current_file = line[3:].strip()
        elif line.startswith('- Line '):
            m = detail_re.match(line)
            if m and current_file:
                file_findings[current_file].append((int(m.group(1)), m.group(2), m.group(3)))

    modified = 0
    for rel_path, findings in sorted(file_findings.items()):
        ink_path = ROOT / rel_path
        if not ink_path.exists() or not findings:
            continue
        if fix_file(ink_path, findings):
            modified += 1
            print(f"✓  {rel_path}: {len(findings)} findings addressed")

    print(f"\n{modified} file(s) modified.")


if __name__ == '__main__':
    main()
