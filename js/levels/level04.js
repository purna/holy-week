/**
 * level04.js — Phase 4: The Cleansed Temple
 * Loop step: "Complete tasks/actions"
 */

const baseNPCPath = './story/extras/';

export default {
    phase:    4,
    actLabel: 'ACT 2: THE EVIDENCE OF ANOMALIES',
    title:    'The Cleansed Temple',
    subtitle: 'Chaos in the outer courts. Stalls overturned. Discover what happened.',
    location: 'THE TEMPLE',

    modelKey:      'temple_interior',
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'temple_chaos',

    quest: {
        id:   'TEMPLE_CLEANSED',
        name: 'INSIDE THE TEMPLE',
        task: 'Investigate the monetary disruption and check the market ruins.',
        cur:  0,
        tar:  2,
    },

    actionOverrides: [
        {
            name:     'Return Coins',
            type:     'return_coins',
            iconType: 'heal',
            uses:     1,
            onExecute: 'temple_corruption_disrupted',
        }
    ],

    npcs: [
        {
            id:          'garrison_guard_01',
            name:        'Roman Garrison Guard',
            color:       0xffaa00,
            pos:         [14, 25],
            storyFile:   baseNPCPath + 'guard_report.json',
            hasDialogue: true,
            bubbleMsg:   'Tables overturned, animals scattered... He called it My Father\'s house. The merchants called it their living. I called it my afternoon.',
            dialogueEvidence: ['gcall_gnum_aux_report'],
        },
        {
            id:          'money_changer_01',
            name:        'The Temple Money Changer',
            color:       0xffaa00,
            pos:         [11, 19],
            storyFile:   baseNPCPath + 'money_changer.ink',
            hasDialogue: true,
            bubbleMsg:   'Look at this mess! Tyrian shekels scattered into the filth! Our weights are fair, our rates are posted!',
            dialogueEvidence: ['temple_corruption_disrupted'],
        }
    ],

    collectables: [],

    evidence: [
        {
            id:          'temple_corruption_disrupted',
            label:       'Temple Overheads Disrupted',
            category:    'Opposition',
            description: 'Merchants were charging inflated currency exchange rates on approved Tyrian silver temple coinage, exploiting poor provincial festival worshippers.',
            required:    true,
        },
        {
            id:          'gcall_gnum_aux_report',
            label:       'Auxiliary Garrison Assessment',
            category:    'Teachings',
            description: 'Jesus deliberately targeted the operational infrastructure of the sacrificial market, declaring it a den of thieves.',
            required:    true,
        }
    ],

    explanation: {
        title: 'Priority of Worship over Profit',
        body:  'The overturned tables served as an open statement about systemic exploitation dressed up as official religion. The protest was focused on justice for marginalized outsiders.',
    },

    locations: [
        { name: "LOC_TEMPLE_INTERIOR", pos: [0.5, 0.5], r: 0.15 },
        { name: "LOC_MONEY_CHANGERS", pos: [0.3, 0.3], r: 0.08, questId: 0 }
    ],
};
