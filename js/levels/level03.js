/**
 * level03.js — Phase 3: The Man Born Blind
 * Loop step: "Talk to witnesses"
 */

const baseNPCPath = './story/extras/';

export default {
    phase:    3,
    actLabel: 'ACT 2: THE EVIDENCE OF ANOMALIES',
    title:    'The Man Born Blind',
    subtitle: 'A beggar says Jesus healed a man blind from birth. Track down the details.',
    location: 'TEMPLE COURTS',

    modelKey:      'temple_courts',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'temple_ambient',

    quest: {
        id:   'BLIND_MAN',
        name: 'THE MAN BORN BLIND',
        task: 'Gather witness statements regarding the Bethesda Pool healing.',
        cur:  0,
        tar:  2,
    },

    npcs: [
        {
            id:          'nervous_citizen_01',
            name:        'Nervous Citizen',
            color:       0xffaa00,
            pos:         [12, 22],
            storyFile:   baseNPCPath + 'rumor_whisper.json',
            hasDialogue: true,
            bubbleMsg:   'Last Sabbath a man blind from birth walked out of the Pool of Bethesda and now says he sees.',
            dialogueEvidence: ['bethesda_eyewitness_account'],
        },
        {
            id:          'simon_pharisee_01',
            name:        'Simon the Pharisee',
            color:       0xffaa00,
            pos:         [8, 14],
            storyFile:   baseNPCPath + 'pharisee_critique.json',
            hasDialogue: true,
            bubbleMsg:   'A man heals on the Sabbath and claims authority over the Law. Torah asks the question.',
            dialogueEvidence: ['sabbath_compliance_objection'],
        }
    ],

    collectables: [],

    evidence: [
        {
            id:          'bethesda_eyewitness_account',
            label:       'Bethesda Eyewitness Account',
            category:    'Miracles',
            description: 'A hidden citizen confirms that a beggar known to be blind since birth left the Bethesda washing pools completely healed.',
            required:    true,
        },
        {
            id:          'sabbath_compliance_objection',
            label:       'Sabbath Compliance Objection',
            category:    'Opposition',
            description: 'Temple authorities focus entirely on the legal infraction of performing work on the Sabbath, treating the healing as religious treason.',
            required:    true,
        }
    ],

    explanation: {
        title: 'Consistency Under Pressure',
        body:  'The man born blind gave the same exact account to religious leaders who desperately wanted him to change his story. He lost his social standing by remaining completely honest.',
    },

    locations: [
        { name: "LOC_BEThesda_POOL", pos: [0.25, 0.35], r: 0.1 },
        { name: "LOC_TEMPLE_PORTICO", pos: [0.65, 0.75], r: 0.08, questId: 0 }
    ],
};
