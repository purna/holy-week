/**
 * level05.js — Phase 5: Whispers About Lazarus
 * Loop step: "Collect evidence items"
 */

const baseNPCPath = './assets/dialogue/';

export default {
    phase:    5,
    actLabel: 'ACT 2: THE EVIDENCE OF ANOMALIES',
    title:    'Whispers About Lazarus',
    subtitle: 'Track downstream tracking data regarding the resurrection claim at Bethany.',
    location: 'BETHANY',

    modelKey:      'bethany_village',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'rural_birds',

    quest: {
        id:   'LAZARUS',
        name: 'THE LAZARUS QUESTION',
        task: 'Avoid active surveillance sweeps and secure secret intelligence coordinates.',
        cur:  0,
        tar:  2,
    },

    npcs: [
        {
            id:          'temple_spy_01',
            name:        'The Temple Spy',
            color:       0xffaa00,
            pos:         [9, 14],
            storyFile:   baseNPCPath + 'temple_spy.ink',
            hasDialogue: true,
            bubbleMsg:   'Keep moving, scribe. Do not look at me directly. I am cataloging the faces near the gates.',
            dialogueEvidence: ['bethany_resurrection_claim', 'priestly_coordination_notes'],
        }
    ],

    collectables: [],

    evidence: [
        {
            id:          'bethany_resurrection_claim',
            label:       'Bethany Resurrection Claim',
            category:    'Miracles',
            description: 'Multiple local elements confirm that a man entombed for four days walked out of his crypt alive when summoned by name.',
            required:    true,
        },
        {
            id:          'priestly_coordination_notes',
            label:       'Priestly Coordination Notes',
            category:    'Opposition',
            description: 'Crumpled records reveal high council directives to monitor Bethany immediately; authorities do not deny the event, they only try to suppress it.',
            required:    true,
        }
    ],

    explanation: null,

    locations: [
        { name: "LOC_BETHANY_ROADS", pos: [0.6, 0.4], r: 0.12 },
        { name: "LOC_SPY_POSITION", pos: [0.45, 0.25], r: 0.06, questId: 0 }
    ],
};
