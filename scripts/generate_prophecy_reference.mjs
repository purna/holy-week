import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const outputPath = path.join(rootDir, '__docs', 'PROPHECY_REFERENCE.md');

const modules = await Promise.all([
  import('../js/act1_case.js'),
  import('../js/act2_case.js'),
  import('../js/act3_case.js'),
  import('../js/act4_case.js'),
]);

const cases = modules.flatMap((module, actIndex) =>
  Object.entries(module)
    .filter(([name]) => /^act\dCase[A-Z]$/.test(name))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([exportName, caseData]) => ({
      act: actIndex + 1,
      exportName,
      caseData,
    })),
);

const lines = [];
const add = (...values) => lines.push(...values);
const text = (value) => value === undefined || value === null || value === '' ? '—' : String(value);
const list = (value) => Array.isArray(value) ? value.join('; ') : text(value);
const anchor = (value) => String(value)
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-');
const relatedIds = (evidence) => {
  const value = evidence.relatedProphecy;
  if (Array.isArray(value)) return value;
  if (!value || value === '-') return [];
  return [value];
};

const prophecyCount = cases.reduce((total, entry) => total + (entry.caseData.prophecies?.length ?? 0), 0);

add(
  '# Prophecy and Typology Reference',
  '',
  '> **Generated file — do not edit manually.** Runtime truth remains in `act1_case.js` through `act4_case.js`. Regenerate this document with `node scripts/generate_prophecy_reference.mjs`.',
  '',
  `This document combines all **${prophecyCount} prophecy and typology records** from the **${cases.length} exported cases**, together with their configured Scripture evidence, fulfilment evidence, supporting evidence links, biblical context, and case truth references.`,
  '',
  '## Contents',
  '',
);

for (const { act, exportName, caseData } of cases) {
  add(`- Act ${act}: [${caseData.title}](#${anchor(caseData.title)}) — \`${exportName}\` / \`${caseData.id}\``);
}

add('', '## Field meanings', '');
add(
  '- **Scripture evidence:** the evidence card containing or representing the biblical text.',
  '- **Fulfilment evidence:** the evidence card representing how the text or pattern is fulfilled in the case.',
  '- **Supporting evidence:** any other evidence whose `relatedProphecy` points to the same prophecy ID.',
  '- **Predictive prophecy and typology:** both use the same runtime structure. The record text and explanation state how the game interprets the relationship.',
  '',
);

for (const { act, exportName, caseData } of cases) {
  const evidencePool = caseData.evidencePool ?? [];
  add(
    `## ${caseData.title}`,
    '',
    `- **Act:** ${act}`,
    `- **Export:** \`${exportName}\``,
    `- **Case ID:** \`${caseData.id}\``,
    `- **Act label:** ${text(caseData.actLabel)}`,
    `- **Location:** ${text(caseData.eventLocation ?? caseData.location)}`,
    `- **Time:** ${text(caseData.timeOfDay)}`,
    `- **Case Bible references:** ${list(caseData.truth?.furtherReading)}`,
    `- **Truth record — prophecies fulfilled:** ${list(caseData.truth?.prophesyFulfilled)}`,
    '',
  );

  if (caseData.biblicalContext) {
    add('### Biblical context', '');
    for (const [key, value] of Object.entries(caseData.biblicalContext)) {
      add(`- **${key}:** ${text(value)}`);
    }
    add('');
  }

  for (const [index, prophecy] of (caseData.prophecies ?? []).entries()) {
    const directIds = new Set([prophecy.scriptureEvidenceId, prophecy.fulfillmentEvidenceId].filter(Boolean));
    const supporting = evidencePool.filter((evidence) =>
      relatedIds(evidence).includes(prophecy.id) && !directIds.has(evidence.id),
    );

    add(
      `### ${index + 1}. ${text(prophecy.reference)}`,
      '',
      `- **ID:** \`${prophecy.id}\``,
      `- **Written:** ${text(prophecy.written)}`,
      `- **Text:** ${text(prophecy.text)}`,
      `- **Fulfilled by:** ${text(prophecy.fulfilledBy)}`,
      `- **Gospel/New Testament link:** ${text(prophecy.gospelLink)}`,
      `- **Explanation:** ${text(prophecy.explanation)}`,
      `- **Insight:** ${text(prophecy.insight)}`,
      `- **Icon:** ${text(prophecy.icon)}`,
      '',
      '#### Configured evidence pair',
      '',
    );

    const configured = [
      ['Scripture evidence', prophecy.scriptureEvidenceId],
      ['Fulfilment evidence', prophecy.fulfillmentEvidenceId],
    ];

    for (const [label, evidenceId] of configured) {
      if (!evidenceId) {
        add(`- **${label}:** Not configured.`);
        continue;
      }
      const evidence = evidencePool.find((item) => item.id === evidenceId);
      if (!evidence) {
        add(`- **${label}:** \`${evidenceId}\` — **referenced ID not found in this case's evidence pool.**`);
        continue;
      }
      add(`- **${label}:** ${evidence.name} (\`${evidence.id}\`)`);
      add(`  - Type/category: ${text(evidence.type)} / ${text(evidence.category)}`);
      add(`  - Description: ${text(evidence.desc)}`);
      add(`  - Bible reference: ${text(evidence.bibleRef)}`);
      add(`  - Additional Bible references: ${list(evidence.bibleRefs)}`);
      add(`  - Prophetic link: ${text(evidence.propheticLink)}`);
      add(`  - Prophetic references: ${list(evidence.propheticRefs)}`);
      add(`  - Investigator note: ${text(evidence.investigatorNote)}`);
      add(`  - Related prophecy: ${list(evidence.relatedProphecy)}`);
      add(`  - Fake: ${evidence.fake === true ? 'Yes' : 'No'}`);
      add(`  - Timeline order: ${text(evidence.timelineOrder)}`);
    }

    add('', '#### Other supporting evidence', '');
    if (supporting.length === 0) {
      add('No additional evidence points to this prophecy ID.', '');
    } else {
      for (const evidence of supporting) {
        add(`- **${evidence.name}** (\`${evidence.id}\`)`);
        add(`  - Type/category: ${text(evidence.type)} / ${text(evidence.category)}`);
        add(`  - Description: ${text(evidence.desc)}`);
        add(`  - Bible reference: ${text(evidence.bibleRef)}`);
        add(`  - Additional Bible references: ${list(evidence.bibleRefs)}`);
        add(`  - Prophetic link: ${text(evidence.propheticLink)}`);
        add(`  - Prophetic references: ${list(evidence.propheticRefs)}`);
        add(`  - Investigator note: ${text(evidence.investigatorNote)}`);
        add(`  - Fake: ${evidence.fake === true ? 'Yes' : 'No'}`);
        add(`  - Timeline order: ${text(evidence.timelineOrder)}`);
      }
      add('');
    }
  }
}

add(
  '## Maintenance',
  '',
  '1. Edit prophecy and evidence data only in the appropriate `act*_case.js` module.',
  '2. Run `node scripts/generate_prophecy_reference.mjs` from the project root.',
  '3. Review any “referenced ID not found” warnings in this document.',
  '4. Commit the regenerated document alongside the runtime change.',
  '',
);

await writeFile(outputPath, `${lines.join('\n')}\n`, 'utf8');
console.log(`Generated ${outputPath} with ${prophecyCount} records across ${cases.length} cases.`);
