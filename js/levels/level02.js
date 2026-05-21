/**
 * level02.js — Phase 2: Hear Rumours & Pick Up Quests
 * Loop step: "Hear rumours and pick up quests"
 *
 * The player drifts through the marketplace. Conflicting stories about Jesus
 * are everywhere. The investigation starts here.
 */

const baseNPCPath = './assets/dialogue/';

/** @type {import('./LevelManager.js').LevelData} */
export default {
    phase:    2,
    actLabel: 'ACT 1 – THE ARRIVAL',
    title:    'Rumours in the Marketplace',
    subtitle: 'Everyone has an opinion. Who do you believe?',
    location: 'MARKETPLACE',

    modelKey:      'marketplace',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'market_bustle',

    quest: {
        id:   'HEAR_RUMOURS',
        name: 'GATHERING RUMOURS',
        task: 'Speak to 3 people with different opinions about Jesus',
        cur:  0,
        tar:  3,
    },

    npcs: [
        {
            id:          'trader_01',
            name:        'Travelling Trader',
            color:       0xddaa55,
            pos:         [4, 1],
            storyFile:   baseNPCPath + 'trader_rumours.json',
            hasDialogue: true,
            bubbleMsg:   'I heard he fed five thousand people with almost nothing.',
            dialogueEvidence: ['miracle_account_feeding'],
        },
        {
            id:          'scribe_01',
            name:        'Young Scribe',
            color:       0x8888cc,
            pos:         [-5, 2],
            storyFile:   baseNPCPath + 'scribe_rumours.json',
            hasDialogue: true,
            bubbleMsg:   'The Pharisees say he breaks the law.',
            dialogueEvidence: ['pharisee_opposition'],
        },
        {
            id:          'woman_01',
            name:        'Market Woman',
            color:       0xcc8899,
            pos:         [0, -4],
            storyFile:   baseNPCPath + 'woman_rumours.json',
            hasDialogue: true,
            bubbleMsg:   'My neighbour says he healed her son. I don\'t know what to think.',
            dialogueEvidence: ['healing_rumour'],
        },
        {
            id:          'beggar_01',
            name:        'Beggar',
            color:       0x996633,
            pos:         [7, 3],
            storyFile:   baseNPCPath + 'beggar_rumours.json',
            hasDialogue: true,
            bubbleMsg:   'He sat and talked with people like me. No one does that.',
        },
    ],

    collectables: [],

    evidence: [
        {
            id:          'miracle_account_feeding',
            label:       'Miracle Account: Feeding',
            category:    'Miracles',
            description: 'A trader claims Jesus fed an enormous crowd with almost no food. The story has spread across several towns.',
            required:    true,
        },
        {
            id:          'pharisee_opposition',
            label:       'Pharisee Opposition',
            category:    'Opposition',
            description: 'Religious scholars accuse Jesus of breaking Sabbath rules. They see him as a threat to religious order.',
            required:    true,
        },
        {
            id:          'healing_rumour',
            label:       'Healing Rumour',
            category:    'Miracles',
            description: 'A woman says her neighbour\'s son was healed. She can\'t explain it but can\'t dismiss it either.',
            required:    true,
        },
    ],

    explanation: null,
};
