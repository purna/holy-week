// levels.js
// Complete 10-Level Narrative Loop Structure 
// Aligned with ActionManager keys: RUMOR, WITNESS, EVIDENCE, PARABLE

export const levels = [
    {
        id: 1,
        name: "1. Explore Jerusalem",
        modelPath: "./assets/models/jerusalem_gate.glb",
        spawnPoint: { x: 0, y: 52, z: 0 },
        npcs: [
            { 
                id: "scribe_master", 
                name: "Master Scribe", 
                position: { x: 5, y: 50, z: 5 }, 
                color: 0xCCAA77,
                dialogueId: "scribe_intro",
                hasDialogue: true,
                data: { questId: "RUMOR" } 
            }
        ],
        quests: [
            { id: "RUMOR", name: "Entering the Gates", task: "Explore the market plaza and listen for rumors", cur: 0, tar: 1, completed: false }
        ],
        evidence: []
    },
    {
        id: 2,
        name: "2. Hear Rumours & Quests",
        modelPath: "./assets/models/jerusalem_market.glb",
        spawnPoint: { x: 10, y: 52, z: -10 },
        npcs: [
            { 
                id: "merchant", 
                name: "Market Vendor", 
                position: { x: -2, y: 50, z: 12 }, 
                color: 0xDDAa55,
                dialogueId: "market_rumors",
                hasDialogue: true,
                data: { questId: "RUMOR" }
            },
            { 
                id: "citizen", 
                name: "Passerby", 
                position: { x: 15, y: 50, z: 0 }, 
                color: 0xaaaaaa,
                dialogueId: "rumor_whisper",
                hasDialogue: true,
                data: { questId: "RUMOR" }
            }
        ],
        quests: [
            { id: "RUMOR", name: "Whispers in the Crowd", task: "Listen to the marketplace rumors regarding His arrival", cur: 0, tar: 2, completed: false }
        ],
        evidence: [
            { id: "token_rumor_1", name: "Temple Scroll Fragment", position: { x: 3, y: 50, z: 3 } }
        ]
    },
    {
        id: 3,
        name: "3. Talk to Witnesses",
        modelPath: "./assets/models/bethesda_pool.glb",
        spawnPoint: { x: -5, y: 52, z: 20 },
        npcs: [
            { 
                id: "healed_man", 
                name: "Healed Man", 
                position: { x: 0, y: 50, z: 25 }, 
                color: 0x55cc99,
                dialogueId: "witness_healed",
                hasDialogue: true,
                data: { questId: "WITNESS" }
            },
            { 
                id: "skeptic_priest", 
                name: "Skeptic Priest", 
                position: { x: -12, y: 50, z: 18 }, 
                color: 0x997766,
                dialogueId: "priest_objection",
                hasDialogue: true,
                data: { questId: "WITNESS" }
            }
        ],
        quests: [
            { id: "WITNESS", name: "The Lame Walk", task: "Interrogate eyewitnesses near the Pool of Bethesda", cur: 0, tar: 2, completed: false }
        ],
        evidence: []
    },
    {
        id: 4,
        name: "4. Complete Tasks & Actions",
        modelPath: "./assets/models/temple_court.glb",
        spawnPoint: { x: 25, y: 52, z: 25 },
        npcs: [
            { 
                id: "temple_guard", 
                name: "Temple Guard", 
                position: { x: 20, y: 50, z: 30 }, 
                color: 0x777766,
                dialogueId: "guard_report",
                hasDialogue: true,
                data: { questId: "WITNESS" }
            },
            { 
                id: "disciple_peter", 
                name: "Simon Peter", 
                position: { x: 30, y: 50, z: 15 }, 
                color: 0x6688cc,
                dialogueId: "peter_defense",
                hasDialogue: true,
                data: { questId: "WITNESS" }
            }
        ],
        quests: [
            { id: "WITNESS", name: "Clearing the Courts", task: "Interrogate guards about the disruption in the courtyard", cur: 0, tar: 2, completed: false }
        ],
        evidence: [
            { id: "token_coins", name: "Overturned Coin Token", position: { x: 22, y: 50, z: 22 } }
        ]
    },
    {
        id: 5,
        name: "5. Collect Evidence Items",
        modelPath: "./assets/models/antonia_fortress.glb",
        spawnPoint: { x: 0, y: 52, z: -40 },
        npcs: [
            { 
                id: "centurion_claudius", 
                name: "Centurion Claudius", 
                position: { x: 4, y: 50, z: -35 }, 
                color: 0x888888,
                dialogueId: "roman_assessment",
                hasDialogue: true,
                data: { questId: "EVIDENCE" }
            },
            { 
                id: "nicodemus", 
                name: "Nicodemus", 
                position: { x: -15, y: 50, z: -45 }, 
                color: 0x996699,
                dialogueId: "secret_visit",
                hasDialogue: true,
                data: { questId: "EVIDENCE" }
            }
        ],
        quests: [
            { id: "EVIDENCE", name: "The Roman Record", task: "Examine physical evidence items or documents near the fortress", cur: 0, tar: 2, completed: false }
        ],
        evidence: [
            { id: "token_scroll", name: "Roman Decree", position: { x: -2, y: 50, z: -38 } }
        ]
    },
    {
        id: 6,
        name: "6. Unlock Deeper Conversations",
        modelPath: "./assets/models/upper_room_streets.glb",
        spawnPoint: { x: -30, y: 52, z: 5 },
        npcs: [
            { 
                id: "mary_mother_mark", 
                name: "Mary (House Owner)", 
                position: { x: -25, y: 50, z: 10 }, 
                color: 0xccaa99,
                dialogueId: "upper_room_prep",
                hasDialogue: true,
                data: { questId: "WITNESS" }
            },
            { 
                id: "temple_informant", 
                name: "Shifty Inquirer", 
                position: { x: -35, y: 50, z: -2 }, 
                color: 0x554400,
                dialogueId: "informant_bribe",
                hasDialogue: true,
                data: { questId: "WITNESS" }
            }
        ],
        quests: [
            { id: "WITNESS", name: "The Secret Supper", task: "Interrogate locals about the closed-door gathering", cur: 0, tar: 2, completed: false }
        ],
        evidence: []
    },
    {
        id: 7,
        name: "7. Attend Public Teachings",
        modelPath: "./assets/models/mount_of_olives.glb",
        spawnPoint: { x: 40, y: 52, z: -40 },
        npcs: [
            { 
                id: "young_john", 
                name: "John the Disciple", 
                position: { x: 45, y: 50, z: -35 }, 
                color: 0x77aacc,
                dialogueId: "teaching_mount",
                hasDialogue: true,
                data: { questId: "PARABLE" }
            },
            { 
                id: "simon_pharisee", 
                name: "Simon the Pharisee", 
                position: { x: 35, y: 50, z: -45 }, 
                color: 0x886677,
                dialogueId: "pharisee_critique",
                hasDialogue: true,
                data: { questId: "PARABLE" }
            }
        ],
        quests: [
            { id: "PARABLE", name: "Prophecy and Signs", task: "Reflect on declarations made concerning Jerusalem's future", cur: 0, tar: 2, completed: false }
        ],
        evidence: [
            { id: "token_olive_branch", name: "Withered Fig Branch", position: { x: 42, y: 50, z: -42 } }
        ]
    },
    {
        id: 8,
        name: "8. Learn Meanings of Parables",
        modelPath: "./assets/models/gethsemane_outskirts.glb",
        spawnPoint: { x: 15, y: 52, z: -60 },
        npcs: [
            { 
                id: "thomas_doubter", 
                name: "Thomas", 
                position: { x: 20, y: 50, z: -55 }, 
                color: 0xcc9966,
                dialogueId: "parable_vineyard",
                hasDialogue: true,
                data: { questId: "PARABLE" }
            },
            { 
                id: "joanna", 
                name: "Joanna", 
                position: { x: 10, y: 50, z: -65 }, 
                color: 0xcc8899,
                dialogueId: "parable_meaning",
                hasDialogue: true,
                data: { questId: "PARABLE" }
            }
        ],
        quests: [
            { id: "PARABLE", name: "The Corner Stone", task: "Reflect on the true meanings hidden within the Parables", cur: 0, tar: 2, completed: false }
        ],
        evidence: []
    },
    {
        id: 9,
        name: "9. Build an Investigation Board",
        modelPath: "./assets/models/scribe_archive.glb",
        spawnPoint: { x: 0, y: 52, z: 0 },
        npcs: [
            { 
                id: "elder_scribe", 
                name: "Senior Scribe", 
                position: { x: 5, y: 50, z: -5 }, 
                color: 0x445566,
                dialogueId: "board_review",
                hasDialogue: true,
                data: { questId: "EVIDENCE" }
            },
            { 
                id: "fellow_apprentice", 
                name: "Apprentice Maluch", 
                position: { x: -5, y: 50, z: 5 }, 
                color: 0x99bb66,
                dialogueId: "board_debate",
                hasDialogue: true,
                data: { questId: "EVIDENCE" }
            }
        ],
        quests: [
            { id: "EVIDENCE", name: "Connecting the Dots", task: "Examine your compiled notes on your investigation board", cur: 0, tar: 2, completed: false }
        ],
        evidence: [
            { id: "token_final_clue", name: "Cross-Reference Map", position: { x: 0, y: 50, z: -2 } }
        ]
    },
    {
        id: 10,
        name: "10. Reach Your Conclusion Before Trial",
        modelPath: "./assets/models/caiaphas_palace.glb",
        spawnPoint: { x: 50, y: 52, z: 50 },
        npcs: [
            { 
                id: "palace_maid", 
                name: "Palace Maid", 
                position: { x: 45, y: 50, z: 55 }, 
                color: 0xeeeedd,
                dialogueId: "trial_rumors",
                hasDialogue: true,
                data: { questId: "PARABLE" }
            },
            { 
                id: "peter_weeping", 
                name: "Peter (In Hiding)", 
                position: { x: 55, y: 50, z: 45 }, 
                color: 0x99aacc,
                dialogueId: "peter_denial",
                hasDialogue: true,
                data: { questId: "PARABLE" }
            }
        ],
        quests: [
            { id: "PARABLE", name: "The Scribe's Verdict", task: "Reflect on all evidence and declare who you believe He is", cur: 0, tar: 2, completed: false }
        ],
        evidence: []
    }
];