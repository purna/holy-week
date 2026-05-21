/**
 * level06.js — Phase 6: Unlock Deeper Conversations
 * Loop step: "Unlock deeper conversations"
 *
 * Dinner in Bethany. The player attends a private gathering and earns
 * deeper access to disciple conversations by asking the right questions.
 * Curiosity unlocks hidden dialogue branches.
 */

const baseNPCPath = './assets/dialogue/';

/** @type {import('./LevelManager.js').LevelData} */
export default {
    phase:    6,
    actLabel: 'ACT 3 – THE PRESSURE BUILDS',
    title:    'Dinner in Bethany',
    subtitle: 'You\'ve been invited inside. Listen carefully — some disciples are troubled.',
    location: 'BETHANY – PRIVATE HOME',

    modelKey:      'bethany_interior',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'indoor_evening',

    quest: {
        id:   'BETHANY_DINNER',
        name: 'THE DINNER TABLE',
        task: 'Unlock 3 deeper conversations by asking the right questions',
        cur:  0,
        tar:  3,
    },

    // Curiosity system: NPCs with `curiosityGated: true` only open full
    // dialogue after the player has asked at least `curiosityThreshold`
    // questions total (tracked in LevelManager via a curiosityScore).
    curiosityThreshold: 5,

    npcs: [
        {
            id:          'martha_01',
            name:        'Martha',
            color:       0xff9966,
            pos:         [2, 0],
            storyFile:   baseNPCPath + 'martha_dinner.json',
            hasDialogue: true,
            bubbleMsg:   'Please, sit. There\'s enough for everyone.',
            dialogueEvidence: ['devotion_and_sacrifice'],
        },
        {
            id:          'disciple_judas',
            name:        'Disciple (Judas)',
            color:       0x446644,
            pos:         [-4, 1],
            storyFile:   baseNPCPath + 'judas_dinner.json',
            hasDialogue: true,
            bubbleMsg:   'That perfume was worth a year\'s wages. Think of the poor.',
            dialogueEvidence: ['tension_among_followers'],
            curiosityGated: true,       // Only opens after threshold
        },
        {
            id:          'disciple_john',
            name:        'Disciple (John)',
            color:       0x4488cc,
            pos:         [5, -2],
            storyFile:   baseNPCPath + 'john_dinner.json',
            hasDialogue: true,
            bubbleMsg:   'She understood something we didn\'t. Jesus said so himself.',
            dialogueEvidence: ['devotion_and_sacrifice'],
            curiosityGated: true,
        },
        {
            id:          'woman_anoints',
            name:        'Woman (Mary)',
            color:       0xcc88bb,
            pos:         [0, 3],
            storyFile:   baseNPCPath + 'mary_anoints.json',
            hasDialogue: true,
            bubbleMsg:   '...',
            dialogueEvidence: ['devotion_and_sacrifice'],
        },
        {
            id:          'lazarus_dinner',
            name:        'Lazarus',
            color:       0xddddff,
            pos:         [-6, -2],
            storyFile:   baseNPCPath + 'lazarus_dinner.json',
            hasDialogue: true,
            bubbleMsg:   'I don\'t say much at meals anymore. I just notice everything.',
            curiosityGated: true,
        },
    ],

    collectables: [
        {
            id:        'perfume_jar',
            name:      'Broken Alabaster Jar',
            key:       'jar',
            evidenceId: 'devotion_and_sacrifice',
            color:     0xffeecc,
            primitive: { type: 'octahedron', radius: 0.5 },
            position:  [1, 0.5, 2],
        },
    ],

    evidence: [
        {
            id:          'devotion_and_sacrifice',
            label:       'Devotion and Sacrifice',
            category:    'Public Reaction',
            description: 'A woman broke open a jar of expensive perfume and poured it on Jesus. Jesus said it was a beautiful act, and connected it to his coming death. It was not random — she seemed to understand something others didn\'t.',
            required:    true,
        },
        {
            id:          'tension_among_followers',
            label:       'Tension Among Followers',
            category:    'Questions',
            description: 'Not everyone in Jesus\'s inner circle agreed. One disciple loudly objected to the perfume. The group had internal tensions, which makes their continued loyalty more significant, not less.',
            required:    true,
        },
        {
            id:          'death_foretold',
            label:       'Jesus Speaks of Death',
            category:    'Teachings',
            description: 'Jesus connected the woman\'s act to his burial preparation. He spoke about dying with calm clarity. His disciples seemed not to fully understand, but Jesus appeared to know exactly what was coming.',
            required:    false,
        },
    ],

    explanation: {
        title: 'What the Perfume Moment Reveals',
        body:  'The woman who anointed Jesus was criticised for waste. But Jesus defended her. He said she had prepared him for burial — meaning he understood his death was imminent and accepted it. This is either someone fabricating a prophecy after the fact, or someone who genuinely knew what was coming and chose it willingly.',
    },
};
