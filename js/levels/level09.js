/**
 * level09.js — Phase 9: The Last Supper
 * Loop step: "Build an investigation board"
 */

const baseNPCPath = './assets/dialogue/';

export default {
    phase:    9,
    actLabel: 'ACT 4: THE CONDEMNATION MACHINE',
    title:    'The Last Supper',
    subtitle: 'The core circle secures an upper room under cover of dusk.',
    location: 'UPPER ROOM',

    modelKey:      'upper_room',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'indoor_night_quiet',

    quest: {
        id:   'LAST_SUPPER',
        name: 'THE LAST SUPPER',
        task: 'Audit the hidden space and identify incoming betrayal vectors.',
        cur:  0,
        tar:  3,
    },

    openBoardOnComplete: true,

    npcs: [
        {
            id:          'john_disciple_01',
            name:        'John the Beloved Disciple',
            color:       0xffaa00,
            pos:         [15, 25],
            storyFile:   baseNPCPath + 'john_disciple.ink',
            hasDialogue: true,
            bubbleMsg:   'Something is fracturing inside our circle tonight, and I do not think words can mend it.',
            dialogueEvidence: ['upper_room_protocol'],
        },
        {
            id:          'judas_iscariot_01',
            name:        'Judas Iscariot',
            color:       0xffaa00,
            pos:         [12, 18],
            storyFile:   baseNPCPath + 'judas_iscariot.ink',
            hasDialogue: true,
            bubbleMsg:   'You think you are tracking a simple exchange of silver. Someone must force his hand to action.',
            dialogueEvidence: ['asymmetrical_info_cash'],
        },
        {
            id:          'market_informant_01',
            name:        'The Market Informant',
            color:       0xffaa00,
            pos:         [20, 15],
            storyFile:   baseNPCPath + 'informant_bribe.json',
            hasDialogue: true,
            bubbleMsg:   'Information has a price. One of the twelve has finalized a ledger before sundown.',
            dialogueEvidence: ['asymmetrical_info_cash'],
        }
    ],

    collectables: [],

    evidence: [
        {
            id:          'upper_room_protocol',
            label:       'Upper Room Protocol',
            category:    'Teachings',
            description: 'Jesus frames bread and wine as a broken body and poured blood, sealing a farewell covenant with his core followers.',
            required:    true,
        },
        {
            id:          'asymmetrical_info_cash',
            label:       'Asymmetrical Information Cash',
            category:    'Questions',
            description: 'Thirty silver pieces match the exact legal cost of an injured slave, revealing a cold transactional valuation of the teacher\'s location coordinates.',
            required:    true,
        }
    ],

    explanation: null,

    locations: [
        { name: "LOC_UPPER_ROOM", pos: [0.5, 0.5], r: 0.12 },
        { name: "LOC_TABLE_AREA", pos: [0.65, 0.4], r: 0.07, questId: 0 }
    ],
};
