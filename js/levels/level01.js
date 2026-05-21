/**
 * level01.js — Phase 1: Explore Jerusalem
 * Loop step: "Explore Jerusalem"
 *
 * The player arrives during Palm Sunday. The city is alive with noise.
 * Objective: get your bearings, find the crowd, collect your first rumour.
 */

const baseNPCPath  = './assets/dialogue/';
const baseModelPath = './assets/models/';

/** @type {import('./LevelManager.js').LevelData} */
export default {
    phase:    1,
    actLabel: 'ACT 1 – THE ARRIVAL',
    title:    'The Donkey King',
    subtitle: 'Jerusalem is packed. Something is happening near the city gate.',
    location: 'JERUSALEM STREETS',

    // 3D scene — swap modelKey to your actual GLB key once the asset exists
    modelKey:      'jerusalem_streets',   // MODELS key in config.js
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'crowd_day',            // AudioManager key

    // ── Quest ──────────────────────────────────────────────────────────────
    quest: {
        id:   'DONKEY_KING',
        name: 'THE DONKEY KING',
        task: 'Find out why the crowd is cheering',
        cur:  0,
        tar:  2,   // 2 required evidence tokens
    },

    // ── NPCs ───────────────────────────────────────────────────────────────
    npcs: [
        {
            id:          'child_01',
            name:        'Excited Child',
            color:       0xffcc44,
            pos:         [5, 0],
            storyFile:   baseNPCPath + 'child_palm_sunday.json',
            hasDialogue: true,
            bubbleMsg:   'Did you see him? Did you SEE him?',
            questId:     'DONKEY_KING',
            // Evidence unlocked after this conversation
            dialogueEvidence: ['prophecy_fulfilled'],
        },
        {
            id:          'pilgrim_01',
            name:        'Elderly Pilgrim',
            color:       0xaaaaaa,
            pos:         [-6, 2],
            storyFile:   baseNPCPath + 'pilgrim_palm_sunday.json',
            hasDialogue: true,
            bubbleMsg:   'I have waited seventy years for this day...',
            questId:     'DONKEY_KING',
            dialogueEvidence: ['crowd_calls_him_king'],
        },
        {
            id:          'merchant_01',
            name:        'Suspicious Merchant',
            color:       0x888866,
            pos:         [8, -3],
            storyFile:   baseNPCPath + 'merchant_palm_sunday.json',
            hasDialogue: true,
            bubbleMsg:   'Kings ride horses. This is just theatre.',
        },
        {
            id:          'guard_01',
            name:        'Roman Guard',
            color:       0xcc3333,
            pos:         [-10, 0],
            storyFile:   baseNPCPath + 'guard_palm_sunday.json',
            hasDialogue: true,
            bubbleMsg:   'Keep moving. Nothing to see here.',
        },
    ],

    // ── Collectables (physical pickups) ────────────────────────────────────
    collectables: [
        {
            id:        'palm_branch_01',
            name:      'Palm Branch',
            key:       'palm_branch',
            evidenceId: 'prophecy_fulfilled',   // collected → LevelManager.collectEvidence()
            color:     0x44aa44,
            primitive: { type: 'octahedron', radius: 0.6 },
            position:  [3, 1, 0],
        },
        {
            id:        'palm_branch_02',
            name:      'Palm Branch',
            key:       'palm_branch',
            evidenceId: 'prophecy_fulfilled',
            color:     0x44aa44,
            primitive: { type: 'octahedron', radius: 0.6 },
            position:  [-2, 1, 4],
        },
    ],

    // ── Evidence tokens this phase can produce ─────────────────────────────
    evidence: [
        {
            id:          'prophecy_fulfilled',
            label:       'Prophecy Fulfilled',
            category:    'Prophecies',
            description: 'A prophet wrote that God\'s chosen king would arrive on a donkey — humbly, not on a war horse. Jesus rode a donkey into Jerusalem today.',
            required:    true,
        },
        {
            id:          'crowd_calls_him_king',
            label:       'Crowd Calls Him King',
            category:    'Public Reaction',
            description: 'Hundreds of people lined the road waving palm branches — the traditional greeting for a conquering hero or king. They shouted "Hosanna!" which means "Save us!".',
            required:    true,
        },
        {
            id:          'roman_concern',
            label:       'Romans Are Watching',
            category:    'Opposition',
            description: 'The Roman guard seemed tense. Anything that stirs up a crowd draws their attention. They don\'t like the idea of a "king" who isn\'t Caesar.',
            required:    false,
        },
    ],

    // ── Explanation card (shown after both required evidence are collected) ─
    explanation: {
        title: 'Why the Donkey Matters',
        body:  'Long ago, the prophet Zechariah wrote: "Your king comes to you, gentle and riding on a donkey." Riding a donkey instead of a war horse was a deliberate message — Jesus was announcing himself as a king of peace, not conquest. Many people understood the symbol. That is why they responded like it was the arrival of royalty.',
    },
};
