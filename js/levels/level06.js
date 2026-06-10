/**
 * level06.js — Phase 6: Dinner in Bethany
 * Loop step: "Unlock deeper conversations"
 */

const baseNPCPath = './story/extras/';

export default {
    phase:    6,
    actLabel: 'ACT 3: THE MOUNTING PRESSURE',
    title:    'Dinner in Bethany',
    subtitle: 'Step inside a secure shelter. Disciple group defense lines are cracking.',
    location: 'BETHANY – PRIVATE HOME',

    modelKey:      'bethany_interior',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'indoor_evening',

    quest: {
        id:   'BETHANY_DINNER',
        name: 'THE DINNER TABLE',
        task: 'Ask high-curiosity questions to unlock hidden dialogue branches.',
        cur:  0,
        tar:  2,
    },

    curiosityThreshold: 5,

    npcs: [
        {
            id:          'martha_bethany_01',
            name:        'Martha of Bethany',
            color:       0xffaa00,
            pos:         [15, 22],
            storyFile:   baseNPCPath + 'martha_bethany.ink',
            hasDialogue: true,
            bubbleMsg:   'There are thirteen extra mouths to feed, and the road is monitored by patrols. We are hiding outlaws.',
            dialogueEvidence: ['bethany_anointing_incident'],
        },
        {
            id:          'mary_magdalene_01',
            name:        'Mary Magdalene',
            color:       0xffaa00,
            pos:         [11, 25],
            storyFile:   baseNPCPath + 'mary_magdalene.ink',
            hasDialogue: true,
            bubbleMsg:   'They speak of him in the palaces as if he were a tactical problem. My memory is my only anchor.',
            dialogueEvidence: ['disciple_resource_deficit'],
        }
    ],

    collectables: [],

    evidence: [
        {
            id:          'bethany_anointing_incident',
            label:       'Bethany Anointing Incident',
            category:    'Miracles',
            description: 'A woman broke open a jar of expensive perfume over the teacher, anointing him ahead of his impending burial.',
            required:    true,
        },
        {
            id:          'disciple_resource_deficit',
            label:       'Disciple Resource Deficit',
            category:    'Questions',
            description: 'Internal financial arguments break out among core followers, highlighting rising tension and operational stress.',
            required:    true,
        }
    ],

    explanation: null,

    locations: [
        { name: "LOC_BETHANY_HOME", pos: [0.5, 0.5], r: 0.1 },
        { name: "LOC_DINING_AREA", pos: [0.7, 0.4], r: 0.07, questId: 0 }
    ],
};
