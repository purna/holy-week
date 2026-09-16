#!/usr/bin/env python3
"""Print an apply_patch patch for reviewed, mechanical interview conventions.

Does not write files. Keeps prose, passage names, and distinct destinations.
Usage: python3 scripts/standardize_interviews.py assets/story/act1
"""
import difflib
import re
import sys
from pathlib import Path

HEADER = re.compile(r'^===\s*(\w+)\s*===$')
CHOICE = re.compile(r'^([*+])\s*(\{.+?\}\s*)?\[(.+?)\]\s*->\s*([\w.-]+)$')
TAG = re.compile(r'^\s*#\s*UNLOCK_EVIDENCE:\s*([\w-]+)\s*$')


def standardize(text):
    lines = [line for line in text.splitlines() if not line.strip().startswith('```')]
    tags = list(dict.fromkeys(m[1] for line in lines if (m := TAG.fullmatch(line))))
    headers = [m[1] for line in lines if (m := HEADER.fullmatch(line.strip()))]
    if not headers:
        return text
    prefix = '\n'.join(lines).split('===', 1)[0]
    initial = re.search(r'^->\s*(\w+)\s*$', prefix, re.M)
    entry = initial[1] if initial else ('start' if 'start' in headers else headers[0])
    output, choices = [], set()
    for line in lines:
        if TAG.fullmatch(line):
            continue
        match = HEADER.fullmatch(line.strip())
        if match:
            choices = set()
            output.append(line)
            if match[1] == entry:
                output.extend('# UNLOCK_EVIDENCE: ' + tag for tag in tags)
            continue
        choice = CHOICE.fullmatch(line.strip())
        if choice:
            _, guard, label, target = choice.groups()
            if label == target:
                label = 'Return to my questions.' if target in ('start', 'intro', 'main_hub') else 'Ask about ' + target.replace('_', ' ').rstrip('0123456789') + '.'
            if label.lower().rstrip('.') in ('conclude', 'finish the interview', 'closing'):
                label = 'Finish the interview.'
            if target in ('start', 'main_hub') and label.lower().startswith(('continue', 'return')):
                label = 'Return to my questions.'
            key = (label, target, guard)
            if key in choices:
                continue
            choices.add(key)
            # Existing interviews were authored as repeatable topic navigation.
            # Explicit once-only * choices remain available to future authors.
            line = '+ ' + (guard or '') + '[' + label + '] -> ' + target
        line = line.replace('<i>', '').replace('</i>', '')
        output.append(line)
    # Collapse purely cosmetic menus, but never merge guarded alternatives.
    sections = re.split(r'(^===\s*\w+\s*===\s*$)', '\n'.join(output), flags=re.M)
    for i in range(2, len(sections), 2):
        body = sections[i].splitlines()
        menu = [(j, CHOICE.fullmatch(line.strip())) for j, line in enumerate(body) if CHOICE.fullmatch(line.strip())]
        if len(menu) > 1 and all(not match[2] for _, match in menu) and len({match[4] for _, match in menu}) == 1:
            target = menu[0][1][4]
            label = 'Finish the interview.' if all(match[3] == 'Finish the interview.' for _, match in menu) else 'Continue.'
            body[menu[0][0]] = f'+ [{label}] -> {target}'
            for j, _ in reversed(menu[1:]):
                del body[j]
            sections[i] = '\n'.join(body) + '\n'
    return ''.join(sections).rstrip() + '\n'


if __name__ == '__main__':
    print('*** Begin Patch')
    target = Path(sys.argv[1])
    for path in ([target] if target.is_file() else sorted(target.rglob('*.ink'))):
        before = path.read_text()
        after = standardize(before)
        if before == after:
            continue
        print('*** Update File: ' + str(path.resolve()))
        for line in list(difflib.unified_diff(before.splitlines(), after.splitlines(), n=2))[2:]:
            print('@@' if line.startswith('@@') else line)
    print('*** End Patch')
