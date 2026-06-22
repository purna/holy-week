/**
 * level12.js — Phase 12: Deterrence, Secret Loyalty & Resurrection
 * Loop step: "Finalize Evidence Board and Present Conclusions"
 */

const baseNPCPath = './assets/dialogue/';

export default {
    phase:    12,
    actLabel: 'ACT 5: THE FINAL SUMMARY & RESURRECTION',
    title:    'Deterrence, Secret Loyalty & Resurrection',
    subtitle: 'The execution detail reports back as tomb security protocols collapse.',
    location: 'GOLGOTHA AND BEYOND',

    modelKey:      'gethsemane_container', 
    modelPosition: [0, 0, 0],
    modelScale:    1,

    ambientSound: 'indoor_night_quiet',

    quest: {
        id:   'FINAL_CONCLUSIONS',
        name: 'FINAL CONCLUSION',
        task: 'Compile all 12 phases of documentation and choose your final verdict.',
        cur:  0,
        tar:  5,
    },

    openBoardOnComplete: true,
    showConclusionOnComplete: true,

    npcs: [
        {
            id:          'simon_cyrene_01',
            name:        'Simon of Cyrene',
            color:       0xffaa00,
            pos:         [14, 32],
            storyFile:   baseNPCPath + 'simon_cyrene.ink',
            hasDialogue: true,
            bubbleMsg:   'The wood was rough—splinters tearing into my chest, his blood soaking my tunic.',
            dialogueEvidence: ['gallows_soldier_assessment'],
        },
        {
            id:          'simon_peter_02',
            name:        'Simon Peter',
            color:       0xffaa00,
            pos:         [19, 36],
            storyFile:   baseNPCPath + 'peter_defense.json',
            hasDialogue: true,
            bubbleMsg:   'I am still here, which is either resilience or foolishness. You decide.',
            dialogueEvidence: ['peter_restoration_dialogue'],
        },
        {
            id:          'claudius_centurion_01',
            name:        'Claudius the Centurion',
            color:       0xffaa00,
            pos:         [24, 22],
            storyFile:   baseNPCPath + 'roman_assessment.json',
            hasDialogue: true,
            bubbleMsg:   'I am Claudius. I hold the Antonia fortress. The servant was healed before the messenger reported back.',
            dialogueEvidence: ['veil_rupture_metric'],
        },
        {
            id:          'execution_soldier_01',
            name:        'The Execution Detail Soldier',
            color:       0xffaa00,
            pos:         [15, 40],
            storyFile:   baseNPCPath + 'execution_soldier.ink',
            hasDialogue: true,
            bubbleMsg:   'When the sky went pitch black at noon, the entire detail stopped gambling.',
            dialogueEvidence: ['gallows_soldier_assessment'],
        },
        {
            id:          'joseph_joseph_01',
            name:        'Joseph of Arimathea',
            color:       0xffaa00,
            pos:         [8, 45],
            storyFile:   baseNPCPath + 'joseph_arimathea.ink',
            hasDialogue: true,
            bubbleMsg:   'Conscience is an expensive thing to buy back when you have kept silent for too long.',
            dialogueEvidence: ['sealed_crypt_protocol'],
        },
        {
            id:          'scribe_master_01',
            name:        'Scribe Master Benjamin',
            color:       0xffaa00,
            pos:         [15, 30],
            storyFile:   baseNPCPath + 'board_review.json',
            hasDialogue: true,
            bubbleMsg:   'I have watched your investigation board grow. Can you tell the difference yet?',
            dialogueEvidence: ['resurrection_inconsistency_logs'],
        }
    ],

    collectables: [],

    evidence: [
        {
            id:          'gallows_soldier_assessment',
            label:       'Gallows Soldier Assessment',
            category:    'Opposition',
            description: 'Hardened auxiliary execution guards document unprecedented climate anomalies and unexpected prisoner dignity.',
            required:    true,
        },
        {
            id:          'veil_rupture_metric',
            label:       'Veil Rupture Metric',
            category:    'Questions',
            description: 'Reports leak out from the inner sanctuary indicating structural tearing of the sacred Temple veil at the exact moment of demise.',
            required:    true,
        },
        {
            id:          'peter_restoration_dialogue',
            label:       'Peter Restoration Dialogue',
            category:    'Public Reaction',
            description: 'Core disciples begin to regroup past their moral collapse, claiming personal reconciliation and unexpected encounters.',
            required:    true,
        },
        {
            id:          'sealed_crypt_protocol',
            label:       'Sealed Crypt Protocol',
            category:    'Opposition',
            description: 'Elite guards verify that a heavy stone vault was secured with official Roman seals to prevent fraud, yet the crypt stands empty.',
            required:    true,
        },
        {
            id:          'resurrection_inconsistency_logs',
            label:       'Resurrection Inconsistency Logs',
            category:    'Miracles',
            description: 'Independent tracking logs note early witness accounts that do not match standard human patterns, pointing to an ultimate anomaly.',
            required:    true,
        }
    ],

    conclusions: [
        {
            id:    'prophet',
            label: 'A Holy Prophet',
            body:  'The evidence shows an extraordinary teacher and healer who spoke truth to power. His courage, compassion, and wisdom place him among the great prophets. His death was a tragedy, not a plan.',
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
        }
    ],

    locations: [
        { name: "LOC_GETHSEMANE", pos: [0.3, 0.4], r: 0.1 },
        { name: "LOC_CRUCIFIXION_SITE", pos: [0.7, 0.6], r: 0.08, questId: 0 }
    ],
};
