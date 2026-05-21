/**
 * level05.js — Phase 5: Collect Evidence Items
 * Loop step: "Collect evidence items"
 *
 * Bethany. The player travels outside Jerusalem and investigates
 * the Lazarus rumour. Evidence items are scattered across the area.
 */

const baseNPCPath = './assets/dialogue/';

/** @type {import('./LevelManager.js').LevelData} */
export default {
    phase:    5,
    actLabel: 'ACT 2 – THE TEACHER',
    title:    'Whispers About Lazarus',
    subtitle: 'Someone says Jesus raised a man from the dead. Travel to Bethany and find out.',
    location: 'BETHANY',

    modelKey:      'bethany_village',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'rural_birds',

    quest: {
        id:   'LAZARUS',
        name: 'THE LAZARUS QUESTION',
        task: 'Collect 4 pieces of evidence about the Lazarus account',
        cur:  0,
        tar:  4,
    },

    npcs: [
        {
            id:          'mary_bethany',
            name:        'Mary of Bethany',
            color:       0xee99cc,
            pos:         [3, 1],
            storyFile:   baseNPCPath + 'mary_lazarus.json',
            hasDialogue: true,
            bubbleMsg:   'Jesus wept. Even he was heartbroken. Then he called Lazarus\'s name.',
            dialogueEvidence: ['lazarus_lives'],
        },
        {
            id:          'neighbour_bethany',
            name:        'Bethany Neighbour',
            color:       0xbbaa88,
            pos:         [-6, 2],
            storyFile:   baseNPCPath + 'neighbour_lazarus.json',
            hasDialogue: true,
            bubbleMsg:   'We all saw the burial. Four days, no question.',
            dialogueEvidence: ['burial_confirmed'],
        },
        {
            id:          'spy_01',
            name:        'Stranger (Spy?)',
            color:       0x664444,
            pos:         [9, -1],
            storyFile:   baseNPCPath + 'spy_bethany.json',
            hasDialogue: true,
            bubbleMsg:   '...',
            dialogueEvidence: ['leaders_fear_jesus'],
        },
        {
            id:          'lazarus_himself',
            name:        'Lazarus',
            color:       0xddddff,
            pos:         [0, 4],
            storyFile:   baseNPCPath + 'lazarus.json',
            hasDialogue: true,
            bubbleMsg:   'I don\'t have the words for what I experienced.',
            dialogueEvidence: ['lazarus_lives'],
        },
    ],

    collectables: [
        {
            id:        'burial_cloth_01',
            name:      'Burial Cloth Fragment',
            key:       'cloth',
            evidenceId: 'burial_confirmed',
            color:     0xeeeedd,
            primitive: { type: 'box', size: [0.8, 0.1, 0.5] },
            position:  [1, 0.5, 6],
        },
        {
            id:        'tomb_marker',
            name:      'Tomb Marker Stone',
            key:       'stone',
            evidenceId: 'burial_confirmed',
            color:     0x888877,
            primitive: { type: 'sphere', radius: 0.7 },
            position:  [-2, 0.5, 8],
        },
        {
            id:        'spy_note',
            name:      'Crumpled Note',
            key:       'note',
            evidenceId: 'leaders_fear_jesus',
            color:     0xddcc99,
            primitive: { type: 'octahedron', radius: 0.5 },
            position:  [10, 0.5, 0],
        },
    ],

    evidence: [
        {
            id:          'lazarus_lives',
            label:       'Lazarus Lives',
            category:    'Miracles',
            description: 'Both Mary and Lazarus himself confirm the account. Lazarus was buried four days before Jesus arrived. Neighbours witnessed the burial and the restoration.',
            required:    true,
        },
        {
            id:          'burial_confirmed',
            label:       'Burial Independently Confirmed',
            category:    'Miracles',
            description: 'Multiple people in Bethany confirm the burial. This was not a staged sickness — Lazarus was genuinely dead and entombed.',
            required:    true,
        },
        {
            id:          'leaders_fear_jesus',
            label:       'Leaders Fear Jesus',
            category:    'Opposition',
            description: 'A crumpled note and a suspicious stranger suggest the religious leaders sent people to Bethany to monitor the situation. They fear public reaction to the miracle.',
            required:    true,
        },
        {
            id:          'jesus_wept',
            label:       'Jesus Wept at the Tomb',
            category:    'Questions',
            description: 'Mary says Jesus cried before he raised Lazarus. If he knew he could raise him, why cry? Either the grief was real — or there is something about this moment we don\'t fully understand.',
            required:    false,
        },
    ],

    explanation: {
        title: 'What the Lazarus Account Raises',
        body:  'Raising someone dead for four days is the most extreme claim in the Gospels. The evidence here is unusually strong: multiple independent witnesses, a public burial, and a hostile audience that didn\'t attempt to deny the event happened — only tried to suppress the story. The religious leaders\' response was not "it didn\'t happen" but "we need to stop people hearing about it."',
    },
};
