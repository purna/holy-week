// Evidence is awarded when a conversation opens, independently of branch choice.
// Run with --check to verify without writing. Existing evidence IDs are preserved.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
const tagPattern = /^\s*#\s*UNLOCK_EVIDENCE\s*:\s*([\w-]+)\s*$/i;
const headerPattern = /^\s*===\s*(\w+)\s*===\s*$/;

export function moveEvidenceToOpening(source) {
  const lines = source.split(/\r?\n/);
  const ids = [...new Set(lines.map(line => line.match(tagPattern)?.[1]).filter(Boolean))];
  if (!ids.length) return source;
  const remaining = lines.filter(line => !tagPattern.test(line));
  const headers = remaining.map((line, index) => ({ index, name: line.match(headerPattern)?.[1] }))
    .filter(header => header.name);
  const opening = headers.find(header => header.name === 'start')
    || headers.find(header => header.name === 'root') || headers[0];
  if (!opening) throw new Error('Evidence tags found without a dialogue entry');
  if (headers.filter(header => header.name === opening.name).length !== 1) {
    throw new Error('Duplicate opening passage: ' + opening.name);
  }
  remaining.splice(opening.index + 1, 0, ...ids.map(id => '# UNLOCK_EVIDENCE: ' + id));
  return remaining.join('\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let changed = 0;
  let tagged = 0;
  let tags = 0;
  const storyRoot = path.join(root, 'assets/story');
  const files = fs.readdirSync(storyRoot, { recursive: true }).filter(file => file.endsWith('.ink')).sort();
  for (const relative of files) {
    const file = path.join(storyRoot, relative);
    const before = fs.readFileSync(file, 'utf8');
    const after = moveEvidenceToOpening(before);
    const count = after.split(/\r?\n/).filter(line => tagPattern.test(line)).length;
    if (count) tagged++;
    tags += count;
    if (before !== after) {
      changed++;
      if (!check) fs.writeFileSync(file, after);
    }
  }
  console.log(JSON.stringify({ files: files.length, conversationsWithEvidence: tagged, uniqueTags: tags,
    [check ? 'filesNeedingMigration' : 'filesUpdated']: changed }));
  if (check && changed) process.exitCode = 1;
}
