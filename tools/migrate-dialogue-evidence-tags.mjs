import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DIALOGUE_ID_MAP } from '../js/gameplay/dialogueMaps.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const caseFiles = ['js/act1_case.js', 'js/act2_case.js', 'js/act3_case.js', 'js/act4_case.js'];
const storyRoot = path.join(root, 'assets/story');
const requirements = new Map();

for (const relativeFile of caseFiles) {
  const module = await import(path.join(root, relativeFile));
  for (const caseData of Object.values(module).filter(value => value && Array.isArray(value.npcs))) {
    for (const npc of caseData.npcs.filter(Boolean)) {
      if (!npc.storyFile || !Array.isArray(npc.unlocksEvidence) || npc.unlocksEvidence.length === 0) continue;
      if (!requirements.has(npc.storyFile)) requirements.set(npc.storyFile, new Set());
      npc.unlocksEvidence.forEach(id => requirements.get(npc.storyFile).add(id));
    }
  }
}

const inkFiles = [];
const visit = directory => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) visit(fullPath);
    else if (entry.name.endsWith('.ink')) inkFiles.push(fullPath);
  }
};
visit(storyRoot);

let changed = 0;
let changedJson = 0;
for (const [storyFile, evidenceIds] of requirements) {
  const mappedJson = DIALOGUE_ID_MAP[storyFile];
  const mappedInk = mappedJson
    ? path.resolve(root, mappedJson.replace(/^\.\.\//, '').replace(/\.json$/, '.ink'))
    : null;
  const matches = mappedInk && fs.existsSync(mappedInk)
    ? [mappedInk]
    : inkFiles.filter(file => path.basename(file, '.ink') === storyFile);
  if (matches.length !== 1) {
    console.warn(`${storyFile}: expected one Ink source, found ${matches.length}`);
    continue;
  }

  const file = matches[0];
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let startIndex = lines.findIndex(line => /^\s*===\s*start\s*===\s*$/.test(line));
  if (startIndex < 0) startIndex = lines.findIndex(line => /^\s*===.+===\s*$/.test(line));
  if (startIndex < 0) {
    console.warn(`${path.relative(root, file)}: no dialogue knot`);
    continue;
  }

  const mandatoryTags = [...evidenceIds].map(id => `# UNLOCK_EVIDENCE: ${id}`);
  const checkpointIndex = lines.findIndex(line => line.trim() === '// Required evidence checkpoint: reached before the first player choice.');
  let choiceStart = startIndex;
  let choiceEnd = lines.findIndex((line, index) => index > choiceStart && /^\s*===.+===\s*$/.test(line));
  let choiceRegion = lines.slice(choiceStart + 1, choiceEnd < 0 ? lines.length : choiceEnd);
  if (!choiceRegion.some(line => /^\s*[*+]\s*\[/.test(line))) {
    const hub = choiceRegion.map(line => line.match(/^\s*->\s*([\w.-]+)\s*$/)?.[1]).find(Boolean);
    const hubIndex = hub ? lines.findIndex(line => line.trim() === `=== ${hub} ===`) : -1;
    if (hubIndex >= 0) {
      choiceStart = hubIndex;
      choiceEnd = lines.findIndex((line, index) => index > choiceStart && /^\s*===.+===\s*$/.test(line));
      choiceRegion = lines.slice(choiceStart + 1, choiceEnd < 0 ? lines.length : choiceEnd);
    }
  }
  const destinations = choiceRegion
      .filter(line => /^\s*[*+]\s*\[/.test(line))
      .map(line => line.match(/->\s*([\w.-]+)/)?.[1])
      .filter(Boolean);

  // Remove checkpoints created by older versions of this migration. Unlocking
  // in the opening paragraph gives the clue away before the player investigates.
  if (checkpointIndex >= 0) {
    lines.splice(checkpointIndex, 1);
    for (const tag of mandatoryTags) {
      const openingTagIndex = lines.indexOf(tag, startIndex + 1);
      if (openingTagIndex >= 0 && (choiceEnd < 0 || openingTagIndex < choiceEnd)) lines.splice(openingTagIndex, 1);
    }
  }

  const tagsToPlace = mandatoryTags.filter(tag => !lines.includes(tag) || checkpointIndex >= 0);
  if (tagsToPlace.length > 0 && destinations.length > 0) {
    for (const destination of [...new Set(destinations)].reverse()) {
      const knotIndex = lines.findIndex(line => line.trim() === `=== ${destination} ===`);
      if (knotIndex < 0) continue;
      const existing = new Set(lines.slice(knotIndex + 1, knotIndex + 1 + mandatoryTags.length + 2));
      lines.splice(knotIndex + 1, 0, ...mandatoryTags.filter(tag => !existing.has(tag)));
    }
    fs.writeFileSync(file, `${lines.join('\n').replace(/\n+$/, '')}\n`);
    changed++;
    console.log(`updated ${path.relative(root, file)}: ${mandatoryTags.join(', ')}`);
  }

  const jsonFile = file.replace(/\.ink$/, '.json');
  if (fs.existsSync(jsonFile)) {
    const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    const entryKey = data.start ? 'start' : data.root ? 'root' : Object.keys(data)[0];
    const entry = data[entryKey];
    if (entry && typeof entry.content === 'string') {
      const openingPattern = new RegExp(`(?:^|\\n)(?:${mandatoryTags.map(tag => tag.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')).join('|')})(?=\\n|$)`, 'g');
      const cleaned = entry.content.replace(openingPattern, '').replace(/\\n{3,}/g, '\\n\\n').trim();
      let jsonChanged = cleaned !== entry.content;
      entry.content = cleaned;
      const firstDestinations = (entry.choices || []).map(choice => choice.destination).filter(Boolean);
      for (const destination of firstDestinations) {
        const node = data[destination];
        if (!node || typeof node.content !== 'string') continue;
        const missing = mandatoryTags.filter(tag => !node.content.includes(tag));
        if (!missing.length) continue;
        node.content = `${missing.join('\n')}\n${node.content}`;
        jsonChanged = true;
      }
      if (jsonChanged) {
        fs.writeFileSync(jsonFile, `${JSON.stringify(data, null, 2)}\n`);
        changedJson++;
      }
    }
  }
}

console.log(`Updated ${changed} Ink source files.`);
console.log(`Updated ${changedJson} dialogue JSON files.`);
