import test from 'node:test';
import assert from 'node:assert/strict';
import { LabWorkspaceUI } from '../js/ui/LabWorkspaceUI.js';

const evidence = [
  { id: 'a', name: 'First clue', type: 'physical', timelineOrder: 1 },
  { id: 'b', name: 'Second clue', type: 'testimonial', timelineOrder: 2 }
];
function setup() {
  const cm = {
    activeCaseId: 'one', progress: { one: {}, two: {} }, writes: 0,
    getCaseProgress(id) { return this.progress[id]; },
    getActiveCase() { return { evidencePool: evidence, timelineEvidenceIds: ['a', 'b'] }; },
    _saveProgress() { this.writes++; return true; }
  };
  const es = { caseManager: cm, getCollected: () => evidence, getEvidencePool: () => evidence };
  const make = () => { const lab = new LabWorkspaceUI({ caseManager: cm }, es, {}); lab._initState(); return lab; };
  return { cm, make };
}
test('folders, timeline, comparison and test feedback survive a fresh Lab instance', () => {
  const { cm, make } = setup();
  const lab = make();
  lab.folderState = { physical: ['a'], testimonial: ['b'] };
  lab.timelineSlots = { 1: ['b'], 2: ['a'] };
  lab.compareSlots = [lab.evidence[0], lab.evidence[1]];
  lab.currentTab = 'timeline';
  lab._folderChecked = true;
  lab._timelineChecked = true;
  lab._lastFeedback = { text: 'Incorrect order', type: 'error' };
  lab._saveWorkspace();
  cm.progress = JSON.parse(JSON.stringify(cm.progress));
  const restored = make();
  assert.deepEqual(restored.folderState, lab.folderState);
  assert.deepEqual(restored.timelineSlots, lab.timelineSlots);
  assert.deepEqual(restored.compareSlots.map(x => x.id), ['a', 'b']);
  assert.equal(restored.currentTab, 'timeline');
  assert.equal(restored._timelineChecked, true);
  assert.equal(restored._lastFeedback.text, 'Incorrect order');
});
test('case changes and resets do not leak or revive another workspace', () => {
  const { cm, make } = setup();
  const old = make(); old.folderState = { physical: ['a'] }; old._saveWorkspace();
  cm.activeCaseId = 'two'; old._saveWorkspace();
  assert.equal(cm.progress.two.labWorkspace, undefined);
  assert.deepEqual(make().folderState, {});
  cm.activeCaseId = 'one'; cm.progress.one = {};
  assert.deepEqual(make().folderState, {});
});
test('old verified saves recover their completed placements without awarding points', () => {
  const { cm, make } = setup();
  cm.progress.one.insightAwards = { 'lab:folder_verify': true, 'lab:timeline_test': true };
  const lab = make();
  assert.deepEqual(lab.folderState, { physical: ['a'], testimonial: ['b'] });
  assert.deepEqual(lab.timelineSlots, { 1: ['a'], 2: ['b'] });
  assert.equal(cm.writes, 0);
});
test('restore removes unknown evidence, duplicate placements and stale groups', () => {
  const { cm, make } = setup();
  cm.progress.one.labWorkspace = { version: 1, folders: { physical: ['a', 'a', 'missing'], fake: ['b'] }, timeline: { 1: ['a'], 2: ['a', 'b'], 99: ['b'] } };
  const lab = make();
  assert.deepEqual(lab.folderState, { physical: ['a'] });
  assert.deepEqual(lab.timelineSlots, { 1: ['a'], 2: ['b'] });
});
test('verification expands groups and marks each card with persistent correctness', () => {
  const { make } = setup(); const lab = make();
  const cards = ['a', 'b'].map(id => ({ dataset: { evidenceId: id }, attributes: {}, setAttribute(k,v) { this.attributes[k] = v; } }));
  const classes = new Set();
  const group = { dataset: { folder: 'physical', step: '1' }, classList: { add: x => classes.add(x) }, querySelectorAll: () => cards, querySelector: () => null };
  lab.root = { querySelectorAll: () => [group] };
  lab._showPlacementResults('folder');
  assert.ok(classes.has('expanded'));
  assert.equal(cards[0].attributes['data-folder-status'], 'correct');
  assert.equal(cards[1].attributes['data-folder-status'], 'wrong');
  classes.clear(); lab._showPlacementResults('timeline');
  assert.ok(classes.has('expanded'));
  assert.equal(cards[1].attributes['data-folder-status'], 'wrong');
});
