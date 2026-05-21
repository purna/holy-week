/**
 * level04.js — Phase 4: Complete Tasks / Actions
 * Loop step: "Complete tasks/actions"
 *
 * The Temple has just been turned upside down. Stalls overturned, coins scattered.
 * The player must investigate and complete moral-choice tasks.
 */

const baseNPCPath = './assets/dialogue/';

/** @type {import('./LevelManager.js').LevelData} */
export default {
    phase:    4,
    actLabel: 'ACT 2 – THE TEACHER',
    title:    'The Cleansed Temple',
    subtitle: 'Chaos at the Temple. Stalls overturned. Find out what happened — and why.',
    location: 'THE TEMPLE',

    modelKey:      'temple_interior',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'temple_chaos',

    quest: {
        id:   'TEMPLE_CLEANSED',
        name: 'INSIDE THE TEMPLE',
        task: 'Investigate the overturned stalls and gather accounts',
        cur:  0,
        tar:  2,
    },

    // ── Generic actions remain cross-level (defined in config.js).
    // Level-specific action overrides can be added here:
    actionOverrides: [
        // "Return scattered coins" — moral choice action only available this level
        {
            name:     'Return Coins',
            type:     'return_coins',
            iconType: 'heal',   // reuse heal icon for now
            uses:     1,
            // When executed, awards evidence token
            onExecute: 'temple_corruption',
        },
        {
            name:     'Inspect Overturned Stall',
            type:     'inspect',
            iconType: 'scan',
            uses:     3,
            onExecute: 'jesus_defends_worship',
        },
    ],

    npcs: [
        {
            id:          'merchant_02',
            name:        'Angry Merchant',
            color:       0xddaa33,
            pos:         [4, 0],
            storyFile:   baseNPCPath + 'merchant_temple.json',
            hasDialogue: true,
            bubbleMsg:   'Look at this mess! Months of stock — ruined!',
            dialogueEvidence: ['temple_corruption'],
        },
        {
            id:          'poor_woman_01',
            name:        'Poor Worshipper',
            color:       0xbbbbbb,
            pos:         [-5, 2],
            storyFile:   baseNPCPath + 'poor_woman_temple.json',
            hasDialogue: true,
            bubbleMsg:   'I couldn\'t afford their prices. I just wanted to pray.',
            dialogueEvidence: ['jesus_defends_worship'],
        },
        {
            id:          'temple_guard_01',
            name:        'Temple Guard',
            color:       0x885522,
            pos:         [7, -3],
            storyFile:   baseNPCPath + 'temple_guard.json',
            hasDialogue: true,
            bubbleMsg:   'Move along. The situation is under control.',
        },
        {
            id:          'disciple_bystander',
            name:        'Disciple (Bystander)',
            color:       0x4488cc,
            pos:         [-8, 1],
            storyFile:   baseNPCPath + 'disciple_temple.json',
            hasDialogue: true,
            bubbleMsg:   'I\'ve never seen him like that. But he wasn\'t wrong.',
        },
    ],

    collectables: [
        {
            id:        'scattered_coins_01',
            name:      'Scattered Coins',
            key:       'coins',
            evidenceId: 'temple_corruption',
            color:     0xffdd00,
            primitive: { type: 'sphere', radius: 0.4 },
            position:  [2, 0.5, 3],
        },
        {
            id:        'scattered_coins_02',
            name:      'Scattered Coins',
            key:       'coins',
            evidenceId: 'temple_corruption',
            color:     0xffdd00,
            primitive: { type: 'sphere', radius: 0.4 },
            position:  [-3, 0.5, -2],
        },
    ],

    evidence: [
        {
            id:          'temple_corruption',
            label:       'Temple Corruption',
            category:    'Opposition',
            description: 'Merchants were charging inflated prices on items required for worship, exploiting pilgrims who had no choice but to pay. The poorest worshippers suffered most.',
            required:    true,
        },
        {
            id:          'jesus_defends_worship',
            label:       'Jesus Defends Worship',
            category:    'Teachings',
            description: 'Jesus called the Temple a "house of prayer" that had been turned into a "den of thieves". His anger was directed at injustice, not at the Temple itself.',
            required:    true,
        },
    ],

    explanation: {
        title: 'Why Jesus Was Angry',
        body:  'The Temple was the most sacred place in Judaism — a place to meet God. But religious leaders had allowed it to become a commercial operation that exploited the poor. Jesus\' anger wasn\'t random. It was a deliberate protest against injustice dressed up as religion. The overturned tables were a statement about priorities: worship over profit, people over systems.',
    },
};
