// levels.js
// Imports case data from act files and transforms to level format for GameLevelManager

import { act1CaseA, act1CaseB, act1CaseC } from './act1_case.js';
import { act2CaseA, act2CaseB, act2CaseC } from './act2_case.js';
import { act3CaseA, act3CaseB, act3CaseC, act3CaseD, act3CaseE } from './act3_case.js';
import { act4CaseA, act4CaseB, act4CaseC } from './act4_case.js';

function caseToLevel(caseObj, index) {
    return {
        id: index + 1,
        name: caseObj.title || caseObj.name || `LEVEL ${index + 1}`,
        modelPath: caseObj.modelPath || "./assets/models/jerusalem_gate.glb",
        spawnPoint: caseObj.spawnPoint || { x: 0, y: 52, z: 0 },
        npcs: (caseObj.npcs || []).map(npc => ({
            id: npc.id,
            name: npc.name,
            position: npc.pos || npc.position || { x: 0, y: 50, z: 0 },
            color: npc.color,
            dialogueId: npc.storyFile || npc.id,
            hasDialogue: npc.hasDialogue || true,
            data: { questId: caseObj.quest?.id || npc.data?.questId }
        })),
        quests: caseObj.quest ? [{
            id: caseObj.quest.id || caseObj.id,
            name: caseObj.quest.name || caseObj.title,
            task: caseObj.quest.task || "Investigate this case",
            cur: 0,
            tar: caseObj.quest.tar || 1,
            completed: false
        }] : [],
        evidence: (caseObj.evidencePool || caseObj.evidence || []).map(e => ({
            id: e.id,
            name: e.name,
            position: e.pos || e.position || { x: 0, y: 50, z: 0 }
        }))
    };
}

const cases = [
    act1CaseA, act1CaseB, act1CaseC,
    act2CaseA, act2CaseB, act2CaseC,
    act3CaseA, act3CaseB, act3CaseC, act3CaseD, act3CaseE,
    act4CaseA, act4CaseB, act4CaseC
];

export const levels = cases.map((c, i) => caseToLevel(c, i));