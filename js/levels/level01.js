/**
 * level01.js — Phase 1: The Donkey King
 * Loop step: "Explore Jerusalem"
 */

const baseNPCPath = './story/extras/';

export default {
    phase:    1,
    actLabel: 'ACT 1: THE POPULIST ARRIVAL',
    title:    'The Donkey King',
    subtitle: 'Jerusalem is packed. Something is happening near the East Gate entrance.',
    location: 'JERUSALEM STREETS',

    modelKey:      'jerusalem_streets',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'crowd_day',

    quest: {
        id:   'DONKEY_KING',
        name: 'THE DONKEY KING',
        task: 'Find out why the crowd is cheering and speak with the travelers.',
        cur:  0,
        tar:  2,
    },

    npcs: [
        {
            id:          'galilean_pilgrim_01',
            name:        'Galilean Pilgrim',
            color:       0xffaa00,
            pos:         [15, 12],
            storyFile:   baseNPCPath + 'galilean_pilgrim.ink',
            hasDialogue: true,
            bubbleMsg:   'Look at the gates—even the children are cutting palm leaves!',
            dialogueEvidence: ['prophecy_fulfilled', 'populist_momentum'],
        }
    ],

    collectables: [
        {
            id:          'woven_palm_branch_01',
            name:        'Woven Palm Branch',
            key:         'palm',
            evidenceId:  'populist_momentum',
            color:       0xaa66ff,
            primitive:   { type: 'sphere', radius: 0.4 },
            position:    [14, 0.5, 28],
        }
    ],

    evidence: [
        {
            id:          'prophecy_fulfilled',
            label:       'Prophecy Fulfilled',
            category:    'Prophecies',
            description: 'A prophet wrote that God\'s chosen king would arrive on a donkey — humbly, not on a war horse. Jesus rode a donkey into Jerusalem today.',
            required:    true,
        },
        {
            id:          'populist_momentum',
            label:       'Populist Momentum',
            category:    'Public Reaction',
            description: 'Hundreds of people lined the road waving palm branches — the traditional greeting for royalty or conquering heroes.',
            required:    true,
        }
    ],

    explanation: {
        title: 'Why the Donkey Matters',
        body:  'Long ago, the prophet Zechariah wrote: "Your king comes to you, gentle and riding on a donkey." Riding a donkey instead of a war horse was a deliberate message — Jesus was announcing himself as a king of peace, not military conquest.',
    },

    locations: [
        { name: "LOC_EAST_GATE", pos: [0.15, 0.1], r: 0.15, questId: 0 }
    ],
};
