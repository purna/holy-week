#!/usr/bin/env python3
"""Remove generated closing placeholders and reflow prose without rewriting witnesses."""
import argparse
import re
from pathlib import Path

from audit_ink import reflow
from ink_to_json import parse_ink, convert_file

HEADER = re.compile(r'^===[ \t]*(\w+)[ \t]*===[ \t]*$', re.MULTILINE)


def clean(text):
    data = parse_ink(text)
    marker = text.find('// ── Auto-generated missing branches')
    headers = list(HEADER.finditer(text))
    aliases = {}
    for header in headers:
        if marker < 0 or header.start() < marker:
            continue
        name = header[1]
        node = data[name]
        choices = node['choices']
        if ('#' not in node['content'] and len(choices) == 1
                and choices[0]['text'] == 'Finish the interview.'
                and choices[0]['destination'] in data
                and not data[choices[0]['destination']]['choices']):
            aliases[name] = choices[0]['destination']
    output = text[:headers[0].start()] if headers else text
    for i, header in enumerate(headers):
        end = headers[i + 1].start() if i + 1 < len(headers) else len(text)
        if header[1] not in aliases:
            output += text[header.start():end]
    # Only rewrite actual choice/divert lines, never words inside testimony.
    lines = []
    for line in output.splitlines():
        if re.match(r'^\s*(?:[*+]\s*\[.*?\]\s*)?->', line):
            line = re.sub(r'(->\s*)([\w.-]+)(\s*)$',
                          lambda m: m[1] + aliases.get(m[2], m[2]) + m[3], line)
        if aliases and 'Auto-generated missing branches' in line:
            continue
        lines.append(line)
    result = reflow('\n'.join(lines))
    after = parse_ink(result)
    assert not set(aliases) & set(after)
    for name, node in data.items():
        if name not in aliases:
            assert re.sub(r'\s+', ' ', node['content']).strip() == re.sub(r'\s+', ' ', after[name]['content']).strip(), name
            assert after[name]['choices'] == [dict(c, destination=aliases.get(c['destination'], c['destination'])) for c in node['choices']], name
    return result, aliases


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    removed = changed = 0
    for path in sorted((root / 'assets/story').rglob('*.ink')):
        before = path.read_text()
        after, aliases = clean(before)
        if before != after:
            changed += 1
            removed += len(aliases)
            print(f'{path.relative_to(root)}: {len(aliases)} redundant closing passages')
            if args.write:
                path.write_text(after)
                convert_file(path)
    print(f'{changed} files; {removed} generated closing placeholders removed' + ('' if args.write else ' (preview only)'))


if __name__ == '__main__':
    main()
