import * as THREE from 'three';
import * as CANNON from 'cannon';

export class Player {
    constructor(world, scene, modelMgr) {
        this.world = world;
        this.scene = scene;
        this.modelMgr = modelMgr;
        this.planetR = 50;
        this.canJump = true;
        this.camHeading = new THREE.Vector3(0, 0, 1);

        this.setupPhysics();
        this.setupMesh();
    }

    setupPhysics() {
        this.pBody = new CANNON.Body({
            mass: 1,
            shape: new CANNON.Box(new CANNON.Vec3(0.5, 1, 0.5)),
            fixedRotation: true,
            linearDamping: 0.9
        });
        this.pBody.position.set(0, this.planetR + 10, 0);
        this.world.addBody(this.pBody);
    }

    setupMesh() {
        // Use ModelManager to get player model
        const playerModel = this.modelMgr.getModel('player');

        this.playerMesh = new THREE.Group();
        this.playerMesh.add(playerModel.clone());

        // Scale/position adjustment if needed
        this.playerMesh.scale.set(1, 1, 1);

        this.scene.add(this.playerMesh);
    }

    getPosition() {
        return new THREE.Vector3().copy(this.pBody.position);
    }

    getRotation() {
        const up = this.getPosition().clone().normalize();
        return up;
    }

    applyMovement(moveDir) {
        if (moveDir.length() > 0) {
            moveDir.normalize();
            this.pBody.velocity.set(
                moveDir.x * 18,
                moveDir.y * 18,
                moveDir.z * 18
            );
        }
    }

    update(deltaTime = 1 / 60) {
        // Apply gravity (towards planet center)
        const pPos = this.getPosition();
        const up = pPos.clone().normalize();
        this.pBody.applyForce(up.clone().multiplyScalar(-75), this.pBody.position);

        // Ground check for jump
        if (pPos.length() < this.planetR + 1.6) {
            this.canJump = true;
        }

        // Sync mesh to physics body
        this.playerMesh.position.copy(pPos);
        this.playerMesh.up.copy(up);
        this.playerMesh.lookAt(
            pPos.clone().add(this.camHeading.clone().projectOnPlane(up).normalize())
        );
    }

    jump() {
        if (this.canJump) {
            const up = this.getPosition().clone().normalize();
            this.pBody.applyImpulse(
                new CANNON.Vec3(up.x * 12, up.y * 12, up.z * 12),
                this.pBody.position
            );
            this.canJump = false;
            return true;
        }
        return false;
    }

    sleep() {
        this.pBody.sleep();
    }

    wakeUp() {
        this.pBody.wakeUp();
        this.pBody.velocity.set(0, 0, 0);
    }

    resetTarget() {
        this.pBody.velocity.set(0, 0, 0);
    }
}
