/**
 * level10.js — Phase 10: Reach Your Conclusion Before the Trial
 * Loop step: "Reach your conclusion before the trial"
 *
 * The Garden of Gethsemane → Jerusalem morning of the trial.
 * Final evidence. Then the player presents their investigation board
 * and chooses their conclusion. Game ends without forcing an answer.
 */

const baseNPCPath = './assets/dialogue/';

/** @type {import('./LevelManager.js').LevelData} */
export default {
    phase:    10,
    actLabel: 'ACT 5 – THE TRIAL BEGINS',
    title:    'The Garden & The Trial',
    subtitle: 'Jerusalem wakes to rumours of an arrest. It is time to decide.',
    location: 'GARDEN OF GETHSEMANE',

    modelKey:      'gethsemane_garden',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'garden_night',

    quest: {
        id:   'THE_TRIAL',
        name: 'THE TRIAL',
        task: 'Collect final evidence, then reach your verdict',
        cur:  0,
        tar:  2,
    },

    // Final board + conclusion screen opens when quest completes
    openBoardOnComplete: true,
    showConclusionOnComplete: true,

    npcs: [
        {
            id:          'frightened_witness',
            name:        'Frightened Witness',
            color:       0x9999cc,
            pos:         [3, 1],
            storyFile:   baseNPCPath + 'witness_arrest.json',
            hasDialogue: true,
            bubbleMsg:   'They came with torches. Jesus stepped forward willingly.',
            dialogueEvidence: ['jesus_surrenders'],
        },
        {
            id:          'disciple_fled',
            name:        'Disciple Who Fled',
            color:       0x6688aa,
            pos:         [-4, 2],
            storyFile:   baseNPCPath + 'disciple_fled.json',
            hasDialogue: true,
            bubbleMsg:   'I ran. I\'m ashamed. But I saw it all before I did.',
            dialogueEvidence: ['betrayal'],
        },
        {
            id:          'soldier_aftermath',
            name:        'Roman Soldier',
            color:       0xcc4433,
            pos:         [7, -1],
            storyFile:   baseNPCPath + 'soldier_arrest.json',
            hasDialogue: true,
            bubbleMsg:   'Straightforward arrest. He didn\'t resist. Most unusual.',
            dialogueEvidence: ['jesus_surrenders'],
        },
        {
            id:          'high_priest_official',
            name:        'Temple Official',
            color:       0x664422,
            pos:         [-7, 0],
            storyFile:   baseNPCPath + 'temple_official_trial.json',
            hasDialogue: true,
            bubbleMsg:   'He claimed to be the Son of God. That is why this must end.',
            dialogueEvidence: ['son_of_god_claim'],
        },
    ],

    collectables: [
        {
            id:        'torch_fragment',
            name:      'Burnt Torch Fragment',
            key:       'torch',
            evidenceId: 'betrayal',
            color:     0x993300,
            primitive: { type: 'box', size: [0.3, 0.8, 0.3] },
            position:  [2, 0.5, 5],
        },
        {
            id:        'soldiers_report',
            name:      'Roman Soldier\'s Report',
            key:       'scroll',
            evidenceId: 'jesus_surrenders',
            color:     0xddccaa,
            primitive: { type: 'octahedron', radius: 0.5 },
            position:  [-5, 0.5, -3],
        },
    ],

    evidence: [
        {
            id:          'betrayal',
            label:       'Betrayal',
            category:    'Questions',
            description: 'Judas led guards to Jesus using a greeting kiss as the signal. Jesus had predicted it. He did not try to escape or deny who he was.',
            required:    true,
        },
        {
            id:          'jesus_surrenders',
            label:       'Jesus Surrenders Peacefully',
            category:    'Public Reaction',
            description: 'Multiple witnesses — including a Roman soldier — confirm Jesus did not resist arrest. One disciple drew a sword; Jesus told him to put it away. He went willingly.',
            required:    true,
        },
        {
            id:          'son_of_god_claim',
            label:       'Son of God Claim',
            category:    'Questions',
            description: 'The Temple official says Jesus was charged specifically for claiming to be the Son of God — not for political rebellion. This was the core accusation that led to the trial.',
            required:    false,
        },
    ],

    explanation: null, // Replaced by the conclusion screen

    // ── Conclusion options ──────────────────────────────────────────────────
    // Shown after all evidence collected. Player chooses one. No option is
    // marked "correct" in the game — the investigation matters, not a forced answer.
    conclusions: [
        {
            id:    'prophet',
            label: 'A Prophet',
            body:  'Jesus was a remarkable teacher and healer who spoke truth to power. His courage, compassion, and wisdom place him among the great prophets. His death was a tragedy, not a plan.',
        },
        {
            id:    'teacher',
            label: 'A Great Teacher',
            body:  'The parables, the teaching style, the focus on love and justice — these mark Jesus as one of history\'s most influential moral teachers. Whether anything supernatural happened is less certain than the quality of the teaching.',
        },
        {
            id:    'revolutionary',
            label: 'A Revolutionary',
            body:  'Overturning temple tables, challenging corrupt religious leaders, gathering a popular following — Jesus was a social revolutionary challenging an unjust system. The establishment had him killed because he threatened their power.',
        },
        {
            id:    'son_of_god',
            label: 'The Son of God',
            body:  'The accumulated evidence — fulfilled prophecy, independent miracle accounts, his own clear claims, and a willingness to die rather than deny who he was — points to someone who was exactly who he said he was.',
        },
        {
            id:    'unsure',
            label: 'I\'m Not Sure Yet',
            body:  'The evidence is real. The questions are real. Honesty about uncertainty is more valuable than a forced conclusion. The investigation isn\'t over — it may never be. But you\'ve done the work, and that matters.',
        },
    ],
};
