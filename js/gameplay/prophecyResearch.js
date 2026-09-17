// Resolve only authored relationships; never guess a prophecy's evidence match.
export function getResearchEvidenceIds(caseData, prophecy) {
  const pool = caseData?.evidencePool || [];
  const valid = new Set(pool.filter(e => e.type !== 'scripture' && !e.fake).map(e => e.id));
  const explicit = prophecy.researchEvidenceIds || (prophecy.fulfillmentEvidenceId ? [prophecy.fulfillmentEvidenceId] : []);
  if (explicit.length) return [...new Set(explicit.filter(id => valid.has(id)))];
  const related = pool.filter(e => [].concat(e.relatedProphecy || []).includes(prophecy.id)).map(e => e.id);
  const pairs = Object.entries(caseData?.deductions || {}).filter(([, operations]) =>
    Object.values(operations || {}).some(d => d.revealsProphecy === prophecy.id)
  ).flatMap(([pair]) => pair.split('+'));
  return [...new Set([...related, ...pairs].filter(id => valid.has(id)))];
}
