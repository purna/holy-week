/**
 * level07.js — Phase 7: Attend Public Teachings
 * Loop step: "Attend public teachings"
 *
 * Mount of Olives. Jesus teaches openly to a large crowd.
 * The player attends and records key teaching moments.
 * Also: "Render Unto Caesar" trap in the Temple courts.
 */

const baseNPCPath = './assets/dialogue/';

/** @type {import('./LevelManager.js').LevelData} */
export default {
    phase:    7,
    actLabel: 'ACT 3 – THE PRESSURE BUILDS',
    title:    'The Teacher Speaks',
    subtitle: 'Find a place in the crowd. Listen. Record what you hear.',
    location: 'MOUNT OF OLIVES',

    modelKey:      'mount_of_olives',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'crowd_outdoor',

    quest: {
        id:   'PUBLIC_TEACHINGS',
        name: 'ATTEND THE TEACHING',
        task: 'Witness 2 public teaching moments',
        cur:  0,
        tar:  2,
    },

    // Teaching triggers: positional events the player walks into
    // (handled by TriggerSystem using TRIGGER_Teaching_X named objects in scene)
    teachingTriggers: [
        {
            triggerId:   'TRIGGER_Teaching_GreatestCommandment',
            evidenceId:  'love_god_and_others',
            label:       'Greatest Commandment',
        },
        {
            triggerId:   'TRIGGER_Teaching_RenderCaesar',
            evidenceId:  'wisdom_under_pressure',
            label:       'Render Unto Caesar',
        },
        {
            triggerId:   'TRIGGER_Teaching_WidowOffering',
            evidenceId:  'true_generosity',
            label:       'The Widow\'s Offering',
        },
    ],

    npcs: [
        {
            id:          'listener_commandment',
            name:        'Young Listener',
            color:       0x88ccaa,
            pos:         [3, 2],
            storyFile:   baseNPCPath + 'listener_commandment.json',
            hasDialogue: true,
            bubbleMsg:   'Love God. Love your neighbour. He made it sound so simple.',
            dialogueEvidence: ['love_god_and_others'],
        },
        {
            id:          'roman_supporter',
            name:        'Roman Sympathiser',
            color:       0xcc7766,
            pos:         [-5, 1],
            storyFile:   baseNPCPath + 'roman_sympathiser.json',
            hasDialogue: true,
            bubbleMsg:   'He didn\'t refuse the tax. The Pharisees looked like fools.',
            dialogueEvidence: ['wisdom_under_pressure'],
        },
        {
            id:          'rebel_01',
            name:        'Jewish Rebel',
            color:       0x885522,
            pos:         [7, -2],
            storyFile:   baseNPCPath + 'rebel_caesar.json',
            hasDialogue: true,
            bubbleMsg:   'I wanted him to say no to Caesar. He didn\'t.',
            dialogueEvidence: ['wisdom_under_pressure'],
        },
        {
            id:          'widow_01',
            name:        'Poor Widow',
            color:       0x999999,
            pos:         [-8, 3],
            storyFile:   baseNPCPath + 'widow.json',
            hasDialogue: true,
            bubbleMsg:   'These two coins are all I have. I trust God.',
            dialogueEvidence: ['true_generosity'],
        },
        {
            id:          'wealthy_donor',
            name:        'Wealthy Donor',
            color:       0xddcc55,
            pos:         [0, -5],
            storyFile:   baseNPCPath + 'wealthy_donor.json',
            hasDialogue: true,
            bubbleMsg:   'I gave a hundred coins today. Quite generously, I think.',
        },
    ],

    collectables: [
        {
            id:        'coin_denarius',
            name:      'Roman Denarius',
            key:       'coin',
            evidenceId: 'wisdom_under_pressure',
            color:     0xddcc33,
            primitive: { type: 'sphere', radius: 0.35 },
            position:  [4, 0.5, -3],
        },
        {
            id:        'two_small_coins',
            name:      'Two Small Coins',
            key:       'small_coins',
            evidenceId: 'true_generosity',
            color:     0xbbaa44,
            primitive: { type: 'sphere', radius: 0.25 },
            position:  [-6, 0.5, 4],
        },
    ],

    evidence: [
        {
            id:          'love_god_and_others',
            label:       'Love God and Others',
            category:    'Teachings',
            description: '"Love the Lord your God with all your heart, and love your neighbour as yourself." Jesus said every other commandment hangs on these two. He reduced a complex legal system to a relational principle.',
            required:    true,
        },
        {
            id:          'wisdom_under_pressure',
            label:       'Wisdom Under Pressure',
            category:    'Teachings',
            description: 'When asked whether to pay Roman taxes — a trap designed to get him arrested or hated — Jesus asked for a coin, noted whose face was on it, and said "Give to Caesar what is Caesar\'s, and to God what is God\'s." The crowd was astonished.',
            required:    true,
        },
        {
            id:          'true_generosity',
            label:       'True Generosity',
            category:    'Teachings',
            description: 'Jesus watched wealthy people make large public donations, then pointed to a poor widow who gave two tiny coins. He said her gift was greater than all of theirs — because she gave everything she had.',
            required:    false,
        },
    ],

    explanation: {
        title: 'Teaching vs Preaching',
        body:  'Most religious teachers of the time lectured people about rules. Jesus asked questions, told stories, and addressed the person in front of him. He noticed the widow when everyone else was watching the wealthy donors. His teaching tended to flip expectations: the last are first, the humble are honoured, the least significant act is the most meaningful.',
    },
};
