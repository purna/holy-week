import * as THREE from 'three';

export class NPC {
    constructor(data, planetR, scene) {
        this.data = data;
        this.planetR = planetR;
        this.mesh = null;
        this.bodyMesh = null;
        this.createMesh(scene);
    }

    createMesh(scene) {
        const grp = new THREE.Group();

        // Base Pad
        const pad = new THREE.Mesh(
            new THREE.CylinderGeometry(2.5, 2.5, 0.2, 16),
            new THREE.MeshStandardMaterial({ color: 0x222222, emissive: 0x111111 })
        );
        grp.add(pad);

        // NPC Body
        this.bodyMesh = new THREE.Mesh(
            new THREE.CapsuleGeometry(1, 2),
            new THREE.MeshToonMaterial({ color: this.data.color })
        );
        this.bodyMesh.position.y = 1.5;
        this.bodyMesh.castShadow = true;
        this.bodyMesh.receiveShadow = true;
        grp.add(this.bodyMesh);

        const p = new THREE.Vector3().setFromSphericalCoords(
            this.planetR,
            this.data.pos[0] * Math.PI,
            this.data.pos[1] * Math.PI * 2
        );
        grp.position.copy(p);
        grp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), p.clone().normalize());

        scene.add(grp);
        this.mesh = grp;
    }

    updateBobbing() {
        this.bodyMesh.position.y = 1.5 + Math.sin(Date.now() * 0.002 + this.data.id) * 0.2;
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
