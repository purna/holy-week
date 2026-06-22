/**
 * level11.js — Phase 11: The Imperial Legality
 * Loop step: "Process administrative state legalities"
 */

const baseNPCPath = './assets/dialogue/';

export default {
    phase:    11,
    actLabel: 'ACT 5: THE MACHINE OF STATE',
    title:    'The Imperial Legality',
    subtitle: 'Blasphemy claims are systematically translated into Roman sedition files.',
    location: 'THE PRAETORIUM',

    modelKey:      'temple_interior', 
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'crowd_day',

    quest: {
        id:   'IMPERIAL_TRIAL',
        name: 'THE IMPERIAL TRIAL',
        task: 'Audit the Roman judicial process and track mob mechanics.',
        cur:  0,
        tar:  3,
    },

    npcs: [
        {
            id:          'pontius_pilate_01',
            name:        'Pontius Pilate',
            color:       0xffaa00,
            pos:         [15, 11],
            storyFile:   baseNPCPath + 'pontius_pilate.ink',
            hasDialogue: true,
            bubbleMsg:   'Am am I an expert in your laws? What is truth to a man holding three legions?',
            dialogueEvidence: ['imperial_bureaucracy_brief'],
        },
        {
            id:          'pilates_secretary_01',
            name:        'Pilate\'s Secretary',
            color:       0xffaa00,
            pos:         [12, 24],
            storyFile:   baseNPCPath + 'pilates_secretary.ink',
            hasDialogue: true,
            bubbleMsg:   'The Prefect ordered it to read: "Jesus of Nazareth, King of the Jews." What is written, is written.',
            dialogueEvidence: ['sedition_formula_titulus'],
        },
        {
            id:          'barabbas_insurgent_01',
            name:        'Barabbas the Insurgent',
            color:       0xffaa00,
            pos:         [9, 36],
            storyFile:   baseNPCPath + 'barabbas_insurgent.ink',
            hasDialogue: true,
            bubbleMsg:   'The crowd wants an assassin, scribe! Rome only understands the edge of a curved blade.',
            dialogueEvidence: ['mob_variable_weight'],
        }
    ],

    collectables: [],

    evidence: [
        {
            id:          'imperial_bureaucracy_brief',
            label: 'Imperial Bureaucracy Brief',
            category: 'Opposition',
            description: 'Governor Pilate evaluates execution options purely via strategic calculus and risk arithmetic to avoid provincial uprisings.',
            required: true,
        },
        {
            id:          'sedition_formula_titulus',
            label: 'Sedition Formula Titulus',
            category: 'Teachings',
            description: 'The execution placard explicitly labels the political crime: claiming local kingship in defiance of Caesar.',
            required: true,
        },
        {
            id:          'mob_variable_weight',
            label: 'Mob Variable Weight',
            category: 'Public Reaction',
            description: 'Widespread public pressure shifts toward an insurgent fighter, sealing a complete conversion of populist support.',
            required: true,
        }
    ],

    explanation: null,

    locations: [
        { name: "LOC_PRAETORIUM", pos: [0.4, 0.5], r: 0.12 },
        { name: "LOC_JUDGMENT_SEAT", pos: [0.6, 0.35], r: 0.07, questId: 0 }
    ],
};
