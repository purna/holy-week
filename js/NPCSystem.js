import { NPC } from './NPC.js';

export class NPCSystem {
    constructor(npcs, planetR, scene, modelMgr) {
        this.npcsData = npcs;
        this.planetR = planetR;
        this.scene = scene;
        this.modelMgr = modelMgr;
        this.npcMeshes = [];
        this.activeNpc = null;
        this.lastNearNpcId = null;

        this.createAllNPCs();
    }

    createAllNPCs() {
        this.npcMeshes = this.npcsData.map(npcData => {
            const npc = new NPC(npcData, this.planetR, this.scene, this.modelMgr);
            return npc;
        });
    }

    findNearestNPC(playerPosition) {
        let nearest = null;
        let nearestDist = Infinity;

        for (const npc of this.npcMeshes) {
            npc.updateBobbing();
            const dist = playerPosition.distanceTo(npc.mesh.position);
            if (dist < 8 && dist < nearestDist) {
                nearestDist = dist;
                nearest = npc;
            }
        }

        return nearest;
    }

    getClosestNonDialogueNPC(playerPosition) {
        for (const npc of this.npcMeshes) {
            if (!npc.data.hasDialogue && playerPosition.distanceTo(npc.mesh.position) < 10) {
                return npc;
            }
        }
        return null;
    }

    setActiveNPC(npc) {
        this.activeNpc = npc;
    }

    getActiveNPC() {
        return this.activeNpc;
    }

    getLastNearNPCId() {
        return this.lastNearNpcId;
    }

    setLastNearNPCId(id) {
        this.lastNearNpcId = id;
    }

    getNPCData(id) {
        return this.npcsData.find(n => n.id === id);
    }
}
