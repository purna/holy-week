/**
 * level08.js — Phase 8: Stories With Hidden Meanings
 * Loop step: "Learn meanings of parables"
 */

const baseNPCPath = './assets/dialogue/';

export default {
    phase:    8,
    actLabel: 'ACT 3: THE MOUNTING PRESSURE',
    title:    'Stories With Hidden Meanings',
    subtitle: 'Extract the geopolitical subtext behind the newest public allegories.',
    location: 'JERUSALEM STREETS & GARDENS',

    modelKey:      'jerusalem_garden_path',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'garden_ambient',

    quest: {
        id:   'PARABLES',
        name: 'THE HIDDEN MEANINGS',
        task: 'Decode vineyard tenant metaphors via deep conversation.',
        cur:  0,
        tar:  2,
    },

    npcs: [
        {
            id:          'thomas_twin_01',
            name:        'Thomas the Twin',
            color:       0xffaa00,
            pos:         [16, 22],
            storyFile:   baseNPCPath + 'parable_vineyard.json',
            hasDialogue: true,
            bubbleMsg:   'Thomas. Ask more questions than I answer. The honest ones. Consider the cornerstone.',
            dialogueEvidence: ['rebellious_tenant_dossier', 'rejected_cornerstone_formula'],
        }
    ],

    collectables: [],

    evidence: [
        {
            id:          'rebellious_tenant_dossier',
            label:       'Rebellious Tenant Dossier',
            category:    'Teachings',
            description: 'The parable describes tenants murdering an owner\'s son; council rulers immediately recognize the story as a direct indictment against themselves.',
            required:    true,
        },
        {
            id:          'rejected_cornerstone_formula',
            label:       'Rejected Cornerstone Formula',
            category:    'Prophecies',
            description: 'The stone the builders cast aside becomes the head of the foundation. The crowd watches where the text points.',
            required:    true,
        }
    ],

    explanation: null,

    locations: [
        { name: "LOC_GARDEN_PATH", pos: [0.4, 0.6], r: 0.1 },
        { name: "LOC_VINEYARD_VIEW", pos: [0.6, 0.4], r: 0.07, questId: 0 }
    ],
};
