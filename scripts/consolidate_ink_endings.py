#!/usr/bin/env python3
"""Give each node-based Ink conversation one terminal passage.

Preserves testimony, evidence tags, passage names and non-terminal choices.
Distinct former endings become closing remarks followed by the shared ending.
"""
import argparse
import re
from pathlib import Path

from ink_to_json import parse_ink, convert_file

HEADER = re.compile(r'^===\s*(\w+)\s*===\s*$', re.MULTILINE)
TERMINAL = re.compile(r'^\s*->\s*(DONE|END)\s*$')
CHOICE_END = re.compile(r'^(\s*[+*]\s*\[.*?\]\s*->\s*)(DONE|END)\s*$')


def consolidate(text):
    matches = list(HEADER.finditer(text))
    if not matches:
        return text
    names = [m[1] for m in matches]
    if len(names) != len(set(names)):
        raise ValueError('Duplicate passage names must be resolved first')
    parsed = parse_ink(text)
    terminals = [n for n, v in parsed.items() if not v['choices']]
    preferred = ['closing', 'conversation_end', 'interview_end', 'end', 'final']
    ending = next((n for n in preferred if n in terminals), None)
    ending = ending or next((n for n in terminals if n.startswith('closing')), None)
    if not ending and len(terminals) == 1:
        ending = terminals[0]
    new_ending = not ending
    if new_ending:
        ending = 'conversation_end'
        while ending in parsed:
            ending += '_final'

    # Identify closed loops and stranded paths using existing valid connections.
    can_exit = set(terminals)
    while True:
        expanded = can_exit | {n for n, v in parsed.items()
                               if any(c['destination'] in can_exit for c in v['choices'])}
        if expanded == can_exit:
            break
        can_exit = expanded

    direct_ends = [line for line in text.splitlines() if TERMINAL.fullmatch(line)]
    mixed_end = False
    for index, match in enumerate(matches):
        boundary = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        if parsed[match[1]]['choices'] and any(TERMINAL.fullmatch(line) for line in text[match.end():boundary].splitlines()):
            mixed_end = True
    if (len(terminals) == 1 and len(direct_ends) == 1 and not mixed_end
            and len(can_exit) == len(parsed)
            and not any(CHOICE_END.fullmatch(line) for line in text.splitlines())):
        return text

    output = [text[:matches[0].start()].rstrip()]
    for index, match in enumerate(matches):
        name = match[1]
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        body = text[match.end():end].strip('\n')
        lines = body.splitlines()
        had_end = any(TERMINAL.fullmatch(line) for line in lines)
        lines = [line for line in lines if not TERMINAL.fullmatch(line)]
        lines = [CHOICE_END.sub(lambda m: m[1] + ending, line) for line in lines]
        body = '\n'.join(lines).rstrip()
        if name == ending:
            body += '\n-> DONE'
        else:
            has_exit = any(re.match(r'^\s*[+*]\s*\[.*?\]\s*->\s*' + re.escape(ending) + r'\s*$', line) for line in lines)
            if not has_exit and (name in terminals or had_end or name not in can_exit):
                body += '\n* [Finish the interview.] -> ' + ending
        output.append('=== ' + name + ' ===\n' + body)
    if new_ending:
        # No invented witness speech: an empty terminal simply closes the UI.
        output.append('=== ' + ending + ' ===\n-> DONE')
    result = '\n\n'.join(output).strip() + '\n'
    data = parse_ink(result)
    assert [n for n, v in data.items() if not v['choices']] == [ending]
    assert sum(bool(TERMINAL.fullmatch(line)) for line in result.splitlines()) == 1
    for name, node in parsed.items():
        assert node['content'] == data[name]['content'], ('Changed testimony', name)
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    changed = 0
    for path in sorted((root / 'assets/story').rglob('*.ink')):
        before = path.read_text()
        after = consolidate(before)
        if after != before:
            changed += 1
            if args.write:
                path.write_text(after)
                convert_file(path)
            print(path.relative_to(root))
    print(f'{changed} conversations ' + ('updated' if args.write else 'would change'))


if __name__ == '__main__':
    main()
