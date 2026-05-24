import * as THREE from 'three';
import { NPC_PAD } from './config.js';

export class NPC {
    constructor(data, planetR, scene, modelMgr, toonShader = null) {
        this.data = data;
        this.planetR = planetR;
        this.scene = scene;
        this.modelMgr = modelMgr;
        this.toonShader = toonShader;
        this.mesh = null;
        this.bodyMesh = null; // Reference to mesh that bobs
        this.createMesh();
    }

    createMesh() {
        const grp = new THREE.Group();

        // 1. Build Base Shading / Pad layout attachments...
        // Base Pad with toon shader
        const padToon = this.toonShader.createToonGroup(
            new THREE.CylinderGeometry(2.5, 2.5, 0.2, 16),
            NPC_PAD.baseColor,
            0.05,
            { emissive: NPC_PAD.emissive }
        );
        grp.add(padToon.group);

        // NPC Body: use ModelManager if GLB system, else primitive
        if (this.modelMgr && this.modelMgr.system === 'glb') {
            const modelKey = this.getModelKey();
            const npcModel = this.modelMgr.getModel(modelKey);
            if (npcModel) {
                const clonedModel = npcModel.clone();
                // Update materials to toon
                clonedModel.traverse((child) => {
                    if (child.isMesh && child.material) {
                        child.material = this.toonShader.createToonMaterial(this.data.color);
                    }
                });
                grp.add(clonedModel);

                // Assume the first mesh in the model is the body for bobbing
                this.bodyMesh = clonedModel.children[0];
                if (this.bodyMesh) {
                    // Store original Y offset for bobbing
                    this.bodyMesh.userData.originalY = this.bodyMesh.position.y;
                }
            } else {
                // Fallback to toon group
                const npcToon = this.toonShader.createToonGroup(
                    new THREE.CapsuleGeometry(1, 2),
                    this.data.color,
                    0.1
                );
                npcToon.group.position.y = 1.5;
                grp.add(npcToon.group);
                this.bodyMesh = npcToon.mainMesh;
            }
        } else {
            // Primitive fallback with toon shader
            const npcToon = this.toonShader.createToonGroup(
                new THREE.CapsuleGeometry(1, 2),
                this.data.color,
                0.1
            );
            npcToon.group.position.y = 1.5;
            grp.add(npcToon.group);
            this.bodyMesh = npcToon.mainMesh;
        }

        // 2. Resolve flat Cartesian / legacy spherical position
        if (this.data.position) {
            // Explicitly format direct transform positions from levels.js layout
            grp.position.set(this.data.position.x, this.data.position.y, this.data.position.z);
            // Orient the node baseline relative to the planet mesh centre core
            const upVector = grp.position.clone().normalize();
            grp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), upVector);
        } else if (this.data.pos) {
            // Fallback option processing for legacy normalized spherical coordinate arrays
            const p = new THREE.Vector3().setFromSphericalCoords(
                this.planetR,
                this.data.pos[0] * Math.PI,
                this.data.pos[1] * Math.PI * 2
            );
            grp.position.copy(p);
            grp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), p.clone().normalize());
        }

        this.scene.add(grp);
        this.mesh = grp;
}

    getModelKey() {
        // Map NPC IDs to model keys matching MODELS config (camelCase)
        const idMap = {
            1: 'npcEcho',
            2: 'npcHorizon',
            3: 'npcSpire',
            4: 'npcKeeper'
        };
        return idMap[this.data.id] || 'npcEcho';
    }

    updateBobbing() {
        if (this.bodyMesh) {
            const originalY = this.bodyMesh.userData.originalY || 1.5;
            this.bodyMesh.position.y = originalY + Math.sin(Date.now() * 0.002 + this.data.id) * 0.2;
        }
    }

    getWorldPosition() {
        return this.mesh.position;
    }

    getScreenPosition(camera, planetR) {
        const pPos = this.getWorldPosition();
        const up = pPos.clone().normalize();
        return pPos.clone().add(up.clone().multiplyScalar(5)).project(camera);
    }
}
