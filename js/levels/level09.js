/**
 * level09.js — Phase 9: Build the Investigation Board
 * Loop step: "Build an investigation board"
 *
 * The Last Supper preparations. The player gathers final evidence
 * while the investigation board UI opens for review.
 * Betrayal clues are embedded here.
 */

const baseNPCPath = './assets/dialogue/';

/** @type {import('./LevelManager.js').LevelData} */
export default {
    phase:    9,
    actLabel: 'ACT 4 – THE LAST NIGHT',
    title:    'The Last Supper',
    subtitle: 'The disciples are gathering for a final meal. Something feels wrong.',
    location: 'UPPER ROOM',

    modelKey:      'upper_room',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'indoor_night_quiet',

    quest: {
        id:   'LAST_SUPPER',
        name: 'THE LAST SUPPER',
        task: 'Help prepare the room and gather 3 final clues',
        cur:  0,
        tar:  3,
    },

    // Board review: triggered when quest completes, opens investigation board UI
    openBoardOnComplete: true,

    npcs: [
        {
            id:          'nervous_disciple',
            name:        'Nervous Disciple (Peter)',
            color:       0x4466cc,
            pos:         [3, 1],
            storyFile:   baseNPCPath + 'peter_last_supper.json',
            hasDialogue: true,
            bubbleMsg:   'Something feels wrong tonight. I can feel it.',
            dialogueEvidence: ['prediction_of_betrayal'],
        },
        {
            id:          'disciple_james',
            name:        'Disciple (James)',
            color:       0x66aacc,
            pos:         [-4, 0],
            storyFile:   baseNPCPath + 'james_last_supper.json',
            hasDialogue: true,
            bubbleMsg:   'He said one of us would betray him. We all looked at each other.',
            dialogueEvidence: ['prediction_of_betrayal'],
        },
        {
            id:          'disciple_judas_supper',
            name:        'Disciple (Judas)',
            color:       0x557755,
            pos:         [6, -2],
            storyFile:   baseNPCPath + 'judas_last_supper.json',
            hasDialogue: true,
            bubbleMsg:   'I have my reasons. You wouldn\'t understand.',
            dialogueEvidence: ['tension_among_followers'],
        },
        {
            id:          'host_disciple',
            name:        'Disciple (Andrew)',
            color:       0x88aadd,
            pos:         [-7, 2],
            storyFile:   baseNPCPath + 'andrew_last_supper.json',
            hasDialogue: true,
            bubbleMsg:   'He washed our feet. The teacher washed our feet.',
            dialogueEvidence: ['new_covenant'],
        },
    ],

    // Supplies to gather (task actions)
    actionOverrides: [
        {
            name:     'Prepare the Room',
            type:     'prepare_room',
            iconType: 'repair',
            uses:     1,
            onExecute: 'new_covenant',
        },
        {
            name:     'Gather Supplies',
            type:     'gather_supplies',
            iconType: 'scan',
            uses:     2,
            onExecute: 'prediction_of_betrayal',
        },
    ],

    collectables: [
        {
            id:        'bread_fragment',
            name:      'Unleavened Bread Fragment',
            key:       'bread',
            evidenceId: 'new_covenant',
            color:     0xddcc99,
            primitive: { type: 'sphere', radius: 0.45 },
            position:  [1, 0.5, 2],
        },
        {
            id:        'wine_cup',
            name:      'Small Wine Cup',
            key:       'cup',
            evidenceId: 'new_covenant',
            color:     0x993333,
            primitive: { type: 'octahedron', radius: 0.5 },
            position:  [-2, 0.5, 3],
        },
        {
            id:        'thirty_coins_note',
            name:      'Overheard Conversation (Note)',
            key:       'note',
            evidenceId: 'prediction_of_betrayal',
            color:     0xeecc88,
            primitive: { type: 'box', size: [0.6, 0.1, 0.4] },
            position:  [8, 0.5, -1],
        },
    ],

    evidence: [
        {
            id:          'new_covenant',
            label:       'A New Covenant',
            category:    'Teachings',
            description: 'At the meal, Jesus broke bread and shared wine, saying these represented his body and blood — a new covenant between God and people. He also washed the disciples\' feet, an act reserved for the lowest servant.',
            required:    true,
        },
        {
            id:          'prediction_of_betrayal',
            label:       'Prediction of Betrayal',
            category:    'Questions',
            description: 'Jesus told the disciples one of them would betray him. He didn\'t seem angry — he seemed to know, and to accept it. Disciples confirm he named it before it happened.',
            required:    true,
        },
        {
            id:          'judas_motive',
            label:       'Judas\'s Motive (Unclear)',
            category:    'Questions',
            description: 'Judas went to the religious leaders for thirty silver coins. Was it greed? Disillusionment? A twisted attempt to force Jesus\'s hand? Witnesses disagree. The motive remains one of history\'s most debated questions.',
            required:    false,
        },
    ],

    explanation: {
        title: 'The Board Is Taking Shape',
        body:  'You now have evidence across six categories. Before the trial, review what you have found. Some pieces point in the same direction. Some raise more questions. That is how real investigations work — you rarely get certainty, only weight of evidence. What does yours say?',
    },
};
