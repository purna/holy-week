import test from 'node:test';
import assert from 'node:assert/strict';
import { ConversationStory, createConversation, evaluate } from '../js/gameplay/conversationStory.js';

const literal = value => ({ literal: value });
const fixture = () => ({
    _meta: { schema: 2, revision: 'test', entry: 'intro', variables: { count: 0, listened: false } },
    intro: { steps: [{ text: 'Welcome.' }, { tag: 'UNLOCK_EVIDENCE: clue' }, { divert: 'hub' }], choices: [] },
    hub: { steps: [], choices: [
        { text: 'Listen', destination: 'detail', once: false },
        { text: 'Compare', destination: 'detail', condition: { variable: 'evidence_clue' } },
        { text: 'Leave', destination: 'closing' }
    ] },
    detail: { steps: [{ set: 'count', operator: '+=', value: literal(1) },
        { set: 'listened', operator: '=', value: literal(true) }, { text: 'A detail.' }, { divert: 'hub' }], choices: [] },
    closing: { steps: [{ text: 'Thank you.', condition: { variable: 'listened' } }, { divert: 'DONE' }], choices: [] }
});

test('automatic transitions do not create passage-name buttons', () => {
    const story = new ConversationStory(fixture());
    assert.equal(story.Continue(), 'Welcome.');
    assert.deepEqual(story.currentTags, ['UNLOCK_EVIDENCE: clue']);
    assert.deepEqual(story.currentChoices.map(c => c.text), ['Listen', 'Leave']);
});

test('conditions use case facts, not the presence of a similarly named topic', () => {
    const story = new ConversationStory(fixture(), { facts: () => ({ evidence_clue: true }) });
    story.Continue();
    assert.equal(story.currentChoices[1].text, 'Compare');
});

test('return visits refresh evidence-gated choices without replaying the passage', () => {
    let saved;
    const story = new ConversationStory(fixture(), { save: s => { saved = s; } });
    story.Continue();
    const resumed = new ConversationStory(fixture(), { saved, facts: () => ({ evidence_clue: true }) });
    resumed.Continue();
    assert.equal(resumed.currentChoices[1].text, 'Compare');
    assert.deepEqual(resumed.currentTags, []);
});

test('resume restores the current reply without replaying assignments or tags', () => {
    let saved;
    const story = new ConversationStory(fixture(), { save: state => { saved = state; } });
    story.Continue(); story.ChooseChoiceIndex(0); story.Continue();
    assert.equal(saved.variables.count, 1);
    const resumed = new ConversationStory(fixture(), { saved });
    assert.equal(resumed.Continue(), 'A detail.');
    assert.equal(resumed.variables.count, 1);
    assert.deepEqual(resumed.currentTags, []);
    assert.match(resumed.currentChoices[0].text, /reviewed/);
});

test('resume between selection and reply applies effects exactly once', () => {
    let saved;
    const story = new ConversationStory(fixture(), { save: s => { saved = s; } });
    story.Continue(); story.ChooseChoiceIndex(0);
    const resumed = new ConversationStory(fixture(), { saved });
    resumed.Continue(); resumed.Continue();
    assert.equal(resumed.variables.count, 1);
});

test('completed interviews can be revisited while retaining memory', () => {
    let saved;
    const story = new ConversationStory(fixture(), { save: s => { saved = s; } });
    story.Continue(); story.ChooseChoiceIndex(0); story.Continue();
    story.ChooseChoiceIndex(1); assert.equal(story.Continue(), 'Thank you.');
    assert.equal(saved.completed, true);
    const replay = new ConversationStory(fixture(), { saved });
    assert.equal(replay.Continue(), 'Welcome.');
    assert.equal(replay.variables.listened, true);
    assert.match(replay.currentChoices[0].text, /reviewed/);
});

test('story revisions reset only the incompatible interview snapshot', () => {
    const data = fixture();
    const story = new ConversationStory(data, { saved: { version: 1, revision: 'old', variables: { count: 50 } } });
    story.Continue(); assert.equal(story.variables.count, 0);
});

test('once-only and repeatable choices are distinct', () => {
    const data = fixture(); data.hub.choices[0].once = true;
    const story = new ConversationStory(data);
    story.Continue(); story.ChooseChoiceIndex(0); story.Continue();
    assert.deepEqual(story.currentChoices.map(c => c.text), ['Leave']);
});

test('infinite automatic loops fail rather than locking the page', () => {
    const data = fixture(); data.hub.choices = []; data.hub.steps = [{ divert: 'intro' }];
    assert.throws(() => new ConversationStory(data).Continue(), /loop/);
});

test('invalid destinations produce a useful error', () => {
    const data = fixture(); data.hub.choices[0].destination = 'missing';
    const story = new ConversationStory(data); story.Continue();
    assert.throws(() => story.ChooseChoiceIndex(0), /Missing conversation destination/);
});

test('case saves isolate the same NPC and reset with case progress', () => {
    const cm = { progress: { cases: { a: {}, b: {} } }, _saveProgress() {} };
    const manager = { caseManager: cm };
    const a = createConversation(fixture(), manager, 'peter', 'a');
    a.Continue(); a.ChooseChoiceIndex(0); a.Continue();
    const b = createConversation(fixture(), manager, 'peter', 'b');
    b.Continue(); assert.equal(b.variables.count, 0);
    assert.equal(createConversation(fixture(), manager, 'peter', 'a').variables.count, 1);
    cm.progress.cases.a = {};
    assert.equal(createConversation(fixture(), manager, 'peter', 'a').variables.count, 0);
});

test('safe evaluator supports booleans and comparisons without executing code', () => {
    assert.equal(evaluate({ all: [{ variable: 'ready' }, { compare: 'ge', left: { variable: 'count' }, right: literal(2) }] }, { ready: true, count: 3 }), true);
    assert.equal(evaluate({ variable: 'unknown' }, {}), false);
    assert.equal(evaluate({ not: { variable: 'ready' } }, { ready: false }), true);
});
