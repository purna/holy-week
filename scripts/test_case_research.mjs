import test from 'node:test';
import assert from 'node:assert/strict';
import { CaseManager } from '../js/gameplay/caseManager.js';
import { EvidenceSystem } from '../js/gameplay/evidenceSystem.js';
import { DeductionEngine } from '../js/gameplay/deductionEngine.js';
import { AccuseUI } from '../js/ui/AccuseUI.js';
import { getResearchEvidenceIds } from '../js/gameplay/prophecyResearch.js';
import * as a1 from '../js/act1_case.js';
import * as a2 from '../js/act2_case.js';
import * as a3 from '../js/act3_case.js';
import * as a4 from '../js/act4_case.js';
const cases = [a1,a2,a3,a4].flatMap(a => Object.values(a).filter(c => c?.id && c.evidencePool));
globalThis.localStorage = { getItem: () => null, setItem() {} };
function setup(c) {
  const cm = new CaseManager();
  cm._saveProgress = () => true;
  cm._refreshMetricsUI = () => {};
  cm.checkAndAutoConclude = () => false;
  cm.progress = { cases: {}, codex: {} };
  cases.forEach(c => cm.registerCase(c));
  cm.startCase(c.id);
  const es = new EvidenceSystem(cm); es.loadCase(c);
  const de = new DeductionEngine(cm, es); de.loadCase();
  return {cm, es, de};
}
test('all witnesses list all four first-case prophecies without unlocking any', () => {
  const c = a1.act1CaseA; const {cm} = setup(c);
  assert.equal(cm.hasInterviewedAllWitnesses(), false);
  c.npcs.filter(Boolean).forEach(n => cm.recordWitnessInterview(n.id));
  assert.equal(cm.hasInterviewedAllWitnesses(), true);
  for (const p of c.prophecies) {
    assert.equal(cm.isCaseProphecyListed(p.id), true);
    assert.notEqual(cm.getCodexStatus(p.id), 'complete');
    assert.ok(new AccuseUI(cm).render().includes(p.reference));
  }
  assert.ok(cm.getAllPropheciesWithStatus().every(p => p.status === 'unseen'));
});
test('first-case research works without finding extra scroll pickups and cannot farm points', () => {
  const c = a1.act1CaseA; const {cm, es, de} = setup(c);
  c.npcs.filter(Boolean).forEach(n => cm.recordWitnessInterview(n.id));
  for (const p of c.prophecies) {
    es.discover(p.fulfillmentEvidenceId);
    assert.equal(de.researchProphecy(p.id, p.fulfillmentEvidenceId).success, true);
    assert.equal(cm.getCodexStatus(p.id), 'complete');
    assert.ok(es.isCollected(p.scriptureEvidenceId));
    const count = cm.getCaseProgress(c.id).deductionsMade.length;
    assert.equal(de.researchProphecy(p.id, p.fulfillmentEvidenceId).alreadyComplete, true);
    assert.equal(cm.getCaseProgress(c.id).deductionsMade.length, count);
  }
  assert.ok(cm.getAllPropheciesWithStatus().filter(p => p.caseId === c.id).every(p => p.status === 'unseen'));
});
test('wrong or uncollected evidence cannot unlock a prophecy', () => {
  const c = a1.act1CaseA; const {cm, es, de} = setup(c);
  c.npcs.filter(Boolean).forEach(n => cm.recordWitnessInterview(n.id));
  assert.equal(de.researchProphecy(c.prophecies[0].id, 'cloaks').success, false);
  es.discover('rope_fibers');
  assert.equal(de.researchProphecy(c.prophecies[0].id, 'rope_fibers').success, false);
  assert.notEqual(cm.getCodexStatus(c.prophecies[0].id), 'complete');
});
test('research shared Scripture independently in each case', () => {
  const {cm} = setup(a1.act1CaseA);
  cm.setCodexStatus('malachi_3_1','complete'); cm.recordProphecyFound('malachi_3_1');
  cm.startCase(a1.act1CaseB.id);
  assert.equal(cm.getCodexStatus('malachi_3_1'), 'unseen');
  assert.equal(cm.getCodexStatus('malachi_3_1',a1.act1CaseA.id), 'complete');
});
for (const c of cases) test(`${c.id}: every required connection is a valid, achievable operation`, () => {
  const {cm, es, de} = setup(c);
  c.evidencePool.forEach(e => es.discover(e.id));
  for (const required of c.requiredConnections || []) {
    const [a,b] = required.pair.split('+');
    assert.ok(es.getById(a) && es.getById(b));
    es.selectForSlot(a,'A'); es.selectForSlot(b,'B');
    const result = de.operate(required.operation);
    assert.equal(result.isValidatedInsight, true);
    assert.equal(result.operation, required.operation);
    assert.equal(result.evidenceAId, a);
  }
  // No authored match may reference a nonexistent evidence item.
  for (const p of c.prophecies || []) for(const id of getResearchEvidenceIds(c,p)) assert.ok(es.getById(id));
});

for (const c of cases) test(`${c.id}: every prophecy is listed after interviews and researchable in the Lab`, () => {
  const {cm, es, de} = setup(c);
  c.npcs.filter(Boolean).forEach(n => cm.recordWitnessInterview(n.id));
  c.evidencePool.forEach(e => es.discover(e.id));
  for (const p of c.prophecies || []) {
    assert.equal(cm.isCaseProphecyListed(p.id), true, p.id);
    const matches = getResearchEvidenceIds(c, p);
    assert.ok(matches.length, `${c.id}/${p.id} needs supporting evidence`);
    assert.equal(de.researchProphecy(p.id, matches[0]).success, true, p.id);
    assert.equal(cm.getCodexStatus(p.id), 'complete', p.id);
  }
  assert.ok(cm.getAllPropheciesWithStatus().filter(p => p.caseId === c.id).every(p => p.status === 'unseen'));
});
