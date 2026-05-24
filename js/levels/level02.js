/**
 * level02.js — Phase 2: Rumours in the Marketplace
 * Loop step: "Hear rumours and pick up quests"
 */

const baseNPCPath = './assets/dialogue/';

export default {
    phase:    2,
    actLabel: 'ACT 1: THE POPULIST ARRIVAL',
    title:    'Rumours in the Marketplace',
    subtitle: 'Everyone has an opinion. Learn to barter for street news.',
    location: 'MARKETPLACE',

    modelKey:      'marketplace',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'market_bustle',

    quest: {
        id:   'HEAR_RUMOURS',
        name: 'GATHERING RUMOURS',
        task: 'Barter with merchants and locals to discover conflicting street opinions.',
        cur:  0,
        tar:  2,
    },

    npcs: [
        {
            id:          'market_vendor_01',
            name:        'Market Vendor',
            color:       0xffaa00,
            pos:         [10, 15],
            storyFile:   baseNPCPath + 'market_rumors.json',
            hasDialogue: true,
            bubbleMsg:   'Good day! The market moves faster than news. What draws you to my stall?',
            dialogueEvidence: ['market_ledger_details'],
        },
        {
            id:          'jerusalem_local_01',
            name:        'Jerusalem Local',
            color:       0xffaa00,
            pos:         [18, 22],
            storyFile:   baseNPCPath + 'jerusalem_local.ink',
            hasDialogue: true,
            bubbleMsg:   'This Galilean rabble is going to get the entire market burnt down if they keep calling him a king.',
            dialogueEvidence: ['gossip_commodity_key'],
        }
    ],

    collectables: [],

    evidence: [
        {
            id:          'market_ledger_details',
            label:       'Market Ledger Details',
            category:    'Public Reaction',
            description: 'Street merchants are actively logging the rapid change in public attention, charting news indicators against standard daily trade values.',
            required:    true,
        },
        {
            id:          'gossip_commodity_key',
            label:       'Gossip Commodity Key',
            category:    'Questions',
            description: 'Long-time city residents view incoming provincial religious movements with deep financial and structural skepticism.',
            required:    true,
        }
    ],

    explanation: null,

    locations: [
        { name: "LOC_MARKET_CENTER", pos: [0.5, 0.5], r: 0.12 },
        { name: "LOC_FOOD_STALLS", pos: [0.3, 0.7], r: 0.1, questId: 0 }
    ],
};
