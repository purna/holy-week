/**
 * level03.js — Phase 3: Talk to Witnesses
 * Loop step: "Talk to witnesses"
 *
 * The Temple Courts — religious debates, healing accounts, conflicting testimony.
 * The player must find the man born blind and verify his story.
 */

const baseNPCPath = './assets/dialogue/';

/** @type {import('./LevelManager.js').LevelData} */
export default {
    phase:    3,
    actLabel: 'ACT 2 – THE TEACHER',
    title:    'The Man Born Blind',
    subtitle: 'A beggar says Jesus healed a man who was blind from birth. Find him.',
    location: 'TEMPLE COURTS',

    modelKey:      'temple_courts',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'temple_ambient',

    quest: {
        id:   'BLIND_MAN',
        name: 'THE MAN BORN BLIND',
        task: 'Find the healed man and gather testimony',
        cur:  0,
        tar:  2,
    },

    npcs: [
        {
            id:          'blind_man_01',
            name:        'The Healed Man',
            color:       0xaaddff,
            pos:         [3, 0],
            storyFile:   baseNPCPath + 'blind_man.json',
            hasDialogue: true,
            bubbleMsg:   'I was blind. Now I see. That\'s all I know.',
            dialogueEvidence: ['healing_testimony'],
        },
        {
            id:          'neighbour_01',
            name:        'Sceptical Neighbour',
            color:       0x999999,
            pos:         [-4, 1],
            storyFile:   baseNPCPath + 'neighbour_blind.json',
            hasDialogue: true,
            bubbleMsg:   'I knew him as a boy. He really was blind.',
            dialogueEvidence: ['neighbour_confirms'],
        },
        {
            id:          'pharisee_02',
            name:        'Temple Official',
            color:       0x664422,
            pos:         [8, -2],
            storyFile:   baseNPCPath + 'pharisee_blind.json',
            hasDialogue: true,
            bubbleMsg:   'This "miracle" happened on the Sabbath. That alone makes it suspect.',
            dialogueEvidence: ['leaders_question_miracle'],
        },
        {
            id:          'parents_01',
            name:        'Man\'s Father',
            color:       0x887766,
            pos:         [-7, 3],
            storyFile:   baseNPCPath + 'parents_blind.json',
            hasDialogue: true,
            bubbleMsg:   'He\'s an adult — ask him yourself. We don\'t want trouble.',
        },
    ],

    collectables: [
        {
            id:        'mud_fragment',
            name:      'Dried Mud Fragment',
            key:       'mud_fragment',
            evidenceId: 'healing_testimony',
            color:     0xaa8844,
            primitive: { type: 'sphere', radius: 0.5 },
            position:  [2, 1, -2],
        },
    ],

    evidence: [
        {
            id:          'healing_testimony',
            label:       'Healing Testimony',
            category:    'Miracles',
            description: 'The man himself says Jesus put mud on his eyes and told him to wash. He came back able to see. He had been blind since birth — neighbours confirm it.',
            required:    true,
        },
        {
            id:          'neighbour_confirms',
            label:       'Neighbour Confirms Blindness',
            category:    'Miracles',
            description: 'The sceptical neighbour grudgingly admits the man really was blind from childhood. This rules out a hoax about his original condition.',
            required:    false,
        },
        {
            id:          'leaders_question_miracle',
            label:       'Religious Leaders Question Miracle',
            category:    'Opposition',
            description: 'Temple officials focus on the fact the healing happened on the Sabbath rather than on the healing itself. They seem more interested in the rule-breaking than the miracle.',
            required:    true,
        },
    ],

    explanation: {
        title: 'What Makes This Testimony Interesting',
        body:  'Investigators look for consistent, independent accounts. The man born blind gave the same story under pressure from religious leaders who wanted him to change it. He lost his social standing by staying honest. People rarely risk everything for a lie.',
    },
};
