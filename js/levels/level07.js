/**
 * level07.js — Phase 7: The Teacher Speaks
 * Loop step: "Attend public teachings"
 */

const baseNPCPath = './story/extras/';

export default {
    phase:    7,
    actLabel: 'ACT 3: THE MOUNTING PRESSURE',
    title:    'The Teacher Speaks',
    subtitle: 'Find a place in the outer courts. Record how authorities mount legal traps.',
    location: 'MOUNT OF OLIVES',

    modelKey:      'mount_of_olives',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'crowd_outdoor',

    quest: {
        id:   'PUBLIC_TEACHINGS',
        name: 'ATTEND THE TEACHING',
        task: 'Witness public arguments regarding covenant legalities and imperial taxes.',
        cur:  0,
        tar:  2,
    },

    npcs: [
        {
            id:          'priest_objection_01',
            name:        'The Temple Priest',
            color:       0xffaa00,
            pos:         [12, 15],
            storyFile:   baseNPCPath + 'priest_objection.json',
            hasDialogue: true,
            bubbleMsg:   'I am a priest under the Law of Sinai. The Law does not bend for crowds or healings.',
            dialogueEvidence: ['authority_contravention'],
        },
        {
            id:          'annas_patriarch_01',
            name:        'Annas the Patriarch',
            color:       0xffaa00,
            pos:         [18, 10],
            storyFile:   baseNPCPath + 'annas_patriarch.json',
            hasDialogue: true,
            bubbleMsg:   'Governments are not built on passion. They are built on stone and historical continuity.',
            dialogueEvidence: ['sadducean_absolute_policy'],
        }
    ],

    collectables: [],

    evidence: [
        {
            id:          'authority_contravention',
            label:       'Authority Contravention',
            category:    'Teachings',
            description: 'Jesus bypassed secondary administrative precedents, compressing legal obligations into love of God and neighbor.',
            required:    true,
        },
        {
            id:          'sadducean_absolute_policy',
            label:       'Sadducean Absolute Policy',
            category:    'Opposition',
            description: 'The dynastic priestly families evaluate public teachers purely as systemic threats to status-quo civil peacekeeping.',
            required:    true,
        }
    ],

    explanation: null,

    locations: [
        { name: "LOC_MOUNT_VIEW", pos: [0.5, 0.3], r: 0.12 },
        { name: "LOC_TEACHER_STONE", pos: [0.7, 0.5], r: 0.06, questId: 0 }
    ],
};
