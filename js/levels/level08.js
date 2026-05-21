/**
 * level08.js — Phase 8: Learn Meanings of Parables
 * Loop step: "Learn meanings of parables"
 *
 * The player collects parable fragments from NPCs, then assembles the meaning.
 * Two parables this phase: Good Samaritan + Lost Son.
 * Optional side quest: help two arguing brothers (mirrors the Lost Son story).
 */

const baseNPCPath = './assets/dialogue/';

/** @type {import('./LevelManager.js').LevelData} */
export default {
    phase:    8,
    actLabel: 'ACT 3 – THE PRESSURE BUILDS',
    title:    'Stories With Hidden Meanings',
    subtitle: 'Jesus teaches in parables. Talk to the listeners and piece them together.',
    location: 'JERUSALEM STREETS & GARDENS',

    modelKey:      'jerusalem_garden_path',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'garden_ambient',

    quest: {
        id:   'PARABLES',
        name: 'THE HIDDEN MEANINGS',
        task: 'Understand 2 parables through conversation',
        cur:  0,
        tar:  2,
    },

    npcs: [
        // ── Good Samaritan ───────────────────────────────────────────────
        {
            id:          'samaritan_listener',
            name:        'Confused Listener',
            color:       0x88aacc,
            pos:         [4, 1],
            storyFile:   baseNPCPath + 'listener_samaritan.json',
            hasDialogue: true,
            bubbleMsg:   'I still don\'t get it. Why is the Samaritan the hero?',
            dialogueEvidence: ['love_your_neighbour'],
        },
        {
            id:          'samaritan_scholar',
            name:        'Legal Scholar',
            color:       0x664422,
            pos:         [-4, 0],
            storyFile:   baseNPCPath + 'scholar_samaritan.json',
            hasDialogue: true,
            bubbleMsg:   'He asked "who is my neighbour?" Jesus turned the question around.',
            dialogueEvidence: ['love_your_neighbour'],
        },

        // ── Lost Son / Prodigal ──────────────────────────────────────────
        {
            id:          'lost_son_listener',
            name:        'Young Listener',
            color:       0xcc9966,
            pos:         [0, -4],
            storyFile:   baseNPCPath + 'listener_lost_son.json',
            hasDialogue: true,
            bubbleMsg:   'The father ran to meet him. That surprised everyone.',
            dialogueEvidence: ['god_forgives'],
        },
        {
            id:          'older_brother_listener',
            name:        'Older Brother (Listener)',
            color:       0x888855,
            pos:         [7, -2],
            storyFile:   baseNPCPath + 'listener_older_brother.json',
            hasDialogue: true,
            bubbleMsg:   'I understand the older brother\'s anger. Is that bad?',
            dialogueEvidence: ['god_forgives'],
        },

        // ── Side quest NPCs ──────────────────────────────────────────────
        {
            id:          'arguing_brother_1',
            name:        'Brother (Amos)',
            color:       0xcc6644,
            pos:         [-7, 3],
            storyFile:   baseNPCPath + 'brother_amos.json',
            hasDialogue: true,
            bubbleMsg:   'He took father\'s money and wasted it. I owe him nothing.',
            // Side quest: player mediating this conversation mirrors the parable
            isSideQuest: true,
        },
        {
            id:          'arguing_brother_2',
            name:        'Brother (Joel)',
            color:       0x668844,
            pos:         [-9, 1],
            storyFile:   baseNPCPath + 'brother_joel.json',
            hasDialogue: true,
            bubbleMsg:   'I made mistakes. I know that. I just want my brother back.',
            isSideQuest: true,
        },
    ],

    collectables: [
        {
            id:        'parable_scroll_samaritan',
            name:      'Parable Fragment: Good Samaritan',
            key:       'scroll',
            evidenceId: 'love_your_neighbour',
            color:     0xddccaa,
            primitive: { type: 'octahedron', radius: 0.55 },
            position:  [2, 0.5, 4],
        },
        {
            id:        'parable_scroll_lost_son',
            name:      'Parable Fragment: Lost Son',
            key:       'scroll',
            evidenceId: 'god_forgives',
            color:     0xaaddcc,
            primitive: { type: 'octahedron', radius: 0.55 },
            position:  [-3, 0.5, -5],
        },
    ],

    evidence: [
        {
            id:          'love_your_neighbour',
            label:       'Love Your Neighbour',
            category:    'Teachings',
            description: 'In the Good Samaritan story, a man from a despised group is the only one who helps an injured stranger. Jesus redefines "neighbour" to include anyone who needs mercy — especially outsiders and enemies.',
            required:    true,
        },
        {
            id:          'god_forgives',
            label:       'God Forgives',
            category:    'Teachings',
            description: 'In the Lost Son story, a rebellious son returns expecting punishment. His father runs to welcome him before he can even apologise properly. Jesus taught that forgiveness is not earned — it\'s given freely to those who turn back.',
            required:    true,
        },
        {
            id:          'brothers_reconciled',
            label:       'Brothers Reconciled (Side Quest)',
            category:    'Questions',
            description: 'You helped mediate between two brothers in real life. The parable\'s message landed differently after that — as something practical, not just theoretical.',
            required:    false,
        },
    ],

    explanation: {
        title: 'Why Jesus Used Stories',
        body:  'Parables work because they make you feel something before you understand it intellectually. By the time the Good Samaritan story ends, you like the Samaritan — then the point hits: the people you look down on might be the most compassionate. Jesus used stories to bypass defensiveness and reach the heart directly. That is why they are still remembered 2,000 years later.',
    },
};
