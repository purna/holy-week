/**
 * level10.js — Phase 10: The Garden & Sanhedrin
 * Loop step: "Reach your conclusion before the trial"
 */

const baseNPCPath = './assets/dialogue/';

export default {
    phase:    10,
    actLabel: 'ACT 4: THE CONDEMNATION MACHINE',
    title:    'The Garden & Sanhedrin',
    subtitle: 'An emergency midnight tribunal is assembled at the high priest\'s residence.',
    location: 'COURT OF CAIAPHAS',

    modelKey:      'gethsemane_garden',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'garden_night',

    quest: {
        id:   'THE_SANHEDRIN_TRIAL',
        name: 'THE TRIBUNAL',
        task: 'Document witness contradictions and high-priestly existential arguments.',
        cur:  0,
        tar:  1,
    },

    npcs: [
        {
            id:          'caiaphas_priest_01',
            name:        'Caiaphas the High Priest',
            color:       0xffaa00,
            pos:         [11, 30],
            storyFile:   baseNPCPath + 'caiaphas_priest.ink',
            hasDialogue: true,
            bubbleMsg:   'It is expedient that one man should die for the people. Do you understand the weight of this chair?',
            dialogueEvidence: ['tribunal_transcript_log'],
        }
    ],

    collectables: [],

    evidence: [
        {
            id:          'tribunal_transcript_log',
            label:       'Tribunal Transcript Log',
            category:    'Opposition',
            description: 'Faced with conflicting testimony, the high priest uses direct oath protocol to force a blasphemy declaration.',
            required:    true,
        }
    ],

    explanation: null,

    locations: [
        { name: "LOC_SANHEDRIN_HALL", pos: [0.5, 0.5], r: 0.12 },
        { name: "LOC_HIGH_PRIEST_CHAIR", pos: [0.7, 0.4], r: 0.07, questId: 0 }
    ],
};
