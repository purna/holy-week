import * as THREE from 'three';

export class NPC {
    constructor(data, planetR, scene, modelMgr) {
        this.data = data;
        this.planetR = planetR;
        this.scene = scene;
        this.modelMgr = modelMgr;
        this.mesh = null;
        this.bodyMesh = null; // Reference to mesh that bobs
        this.createMesh();
    }

    createMesh() {
        const grp = new THREE.Group();

        // Base Pad (still primitive)
        const pad = new THREE.Mesh(
            new THREE.CylinderGeometry(2.5, 2.5, 0.2, 16),
            new THREE.MeshStandardMaterial({ color: 0x222222, emissive: 0x111111 })
        );
        grp.add(pad);

        // NPC Body: use ModelManager if GLB system, else primitive
        if (this.modelMgr && this.modelMgr.system === 'glb') {
            const modelKey = this.getModelKey();
            const npcModel = this.modelMgr.getModel(modelKey);
            grp.add(npcModel.clone());

            // Assume the first mesh in the model is the body for bobbing
            this.bodyMesh = npcModel.children[0];
            if (this.bodyMesh) {
                this.bodyMesh.castShadow = true;
                this.bodyMesh.receiveShadow = true;
                // Store original Y offset for bobbing
                this.bodyMesh.userData.originalY = this.bodyMesh.position.y;
            }
        } else {
            // Primitive fallback
            this.bodyMesh = new THREE.Mesh(
                new THREE.CapsuleGeometry(1, 2),
                new THREE.MeshToonMaterial({ color: this.data.color })
            );
            this.bodyMesh.position.y = 1.5;
            this.bodyMesh.castShadow = true;
            this.bodyMesh.receiveShadow = true;
            grp.add(this.bodyMesh);
        }

        const p = new THREE.Vector3().setFromSphericalCoords(
            this.planetR,
            this.data.pos[0] * Math.PI,
            this.data.pos[1] * Math.PI * 2
        );
        grp.position.copy(p);
        grp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), p.clone().normalize());

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
