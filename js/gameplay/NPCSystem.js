import { NPC } from '../NPC.js';

export class NPCSystem {
    constructor(npcs, planetR, scene, modelMgr, toonShader = null) {
        this.npcsData = npcs;
        this.planetR = planetR;
        this.scene = scene;
        this.modelMgr = modelMgr;
        this.toonShader = toonShader;
        this.npcMeshes = [];
        this.activeNpc = null;
        this.lastNearNpcId = null;

        this.createAllNPCs();
    }

    createAllNPCs() {
        this.npcMeshes = this.npcsData.map(npcData => {
            const npc = new NPC(npcData, this.planetR, this.scene, this.modelMgr, this.toonShader);
            return npc;
        });
    }

    /** Remove every NPC mesh from the scene and clear the array */
    removeAllNPCs() {
        for (const npc of this.npcMeshes) {
            if (npc.mesh) {
                this.scene.remove(npc.mesh);
                npc.mesh.traverse(child => {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
                        else child.material.dispose();
                    }
                });
            }
        }
        this.npcMeshes = [];
    }

    /** Rebuild all NPC meshes from the current npcsData array (called on level load) */
    rebuildFromData() {
        this.removeAllNPCs();
        this.createAllNPCs();
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
