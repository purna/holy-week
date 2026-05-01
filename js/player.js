import * as THREE from 'three';
import * as CANNON from 'cannon';
import { SCENE, MODEL_SYSTEM } from './config.js';

export class Player {
    constructor(world, scene, modelMgr, toonShader = null) {
        this.world = world;
        this.scene = scene;
        this.modelMgr = modelMgr;
        this.toonShader = toonShader;
        this.planetR = 50;
        this.canJump = true;
        this.wasGrounded = false; // Track previous grounded state for landing detection
        this.camHeading = new THREE.Vector3(0, 0, 1);

        this.setupPhysics();
        this.setupMesh();
        this.setupTorch();

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
        this.playerMesh = new THREE.Group();

        if (this.modelMgr && this.modelMgr.system === 'glb') {
            // Use GLB model with toon materials
            const playerModel = this.modelMgr.getModel('player');
            if (playerModel) {
                const clonedModel = playerModel.clone();
                // Update materials to toon
                clonedModel.traverse((child) => {
                    if (child.isMesh && child.material) {
                        child.material = this.toonShader.createToonMaterial(0xff3333);
                        // Store reference to main body material for VFX
                        if (!this.bodyMaterial) {
                            this.bodyMaterial = child.material;
                        }
                    }
                });
                this.playerMesh.add(clonedModel);
            } else {
                // Fallback to toon group
                const playerToon = this.toonShader.createToonGroup(
                    new THREE.BoxGeometry(1.2, 2, 1.2),
                    0xff3333,
                    0.1
                );
                this.playerMesh.add(playerToon.group);
                // Store reference to main body material for VFX
                this.bodyMaterial = playerToon.mainMesh.material;
            }
        } else {
            // Use toon shader for primitive models
            const playerToon = this.toonShader.createToonGroup(
                new THREE.BoxGeometry(1.2, 2, 1.2),
                0xff3333,
                0.1
            );
            this.playerMesh.add(playerToon.group);
            // Store reference to main body material for VFX
            this.bodyMaterial = playerToon.mainMesh.material;
        }

        // Scale/position adjustment if needed
        this.playerMesh.scale.set(1, 1, 1);

        // Ensure player casts shadows
        this.playerMesh.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        this.scene.add(this.playerMesh);
    }

    setupTorch() {
        // Adjust torch intensity based on model system
        const baseIntensity = MODEL_SYSTEM === 'glb' ? 300 : 600; // Lower for GLB, higher for primitives

        // Create torch light with proper range for area lighting
        this.torch = new THREE.PointLight(
            SCENE.torchColor,
            0, // Start at 0 (day mode)
            SCENE.torchDistance,
            SCENE.torchDecay
        );
        this.torch.position.set(0, 1.5, 1); // Position in front of player
        this.torch.castShadow = true;
        // Configure shadow properties for better quality
        this.torch.shadow.mapSize.width = 512;
        this.torch.shadow.mapSize.height = 512;
        this.torch.shadow.camera.near = 0.1;
        this.torch.shadow.camera.far = SCENE.torchDistance;
        this.playerMesh.add(this.torch);

        // Store the target intensity for night mode on the torch object
        this.torch.targetIntensity = baseIntensity;

        // Also add a subtle emissive effect to the player material for torch visibility
        if (this.bodyMaterial) {
            // Store original emissive for restoration
            this.originalEmissive = this.bodyMaterial.emissive ? this.bodyMaterial.emissive.clone() : new THREE.Color(0x000000);
        }

        // Debug: Confirm torch creation
        console.log('Torch created for', MODEL_SYSTEM, 'mode:', {
            targetIntensity: this.torchTargetIntensity,
            distance: this.torch.distance,
            decay: this.torch.decay,
            color: this.torch.color.getHex()
        });
    }

    getPosition() {
        return new THREE.Vector3().copy(this.pBody.position);
    }

    getVelocity() {
        return new THREE.Vector3().copy(this.pBody.velocity);
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

        // Ground check for jump and landing detection
        const isGrounded = pPos.length() < this.planetR + 1.6;
        if (isGrounded && !this.wasGrounded) {
            // Just landed - emit event for decal system
            window.dispatchEvent(new CustomEvent('playerLand', {
                detail: { position: pPos.clone(), up: up.clone() }
            }));
        }
        this.wasGrounded = isGrounded;
        this.canJump = isGrounded;

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






    updateTrail(dt = 1/60) {
        // Update trail particles (fade and remove)
        for (let i = this.trailParticles.length - 1; i >= 0; i--) {
            const p = this.trailParticles[i];
            p.life -= dt * 0.015; // Slow fade rate
            const scale = Math.max(0.1, p.life); // Prevent negative scaling
            p.mesh.scale.setScalar(scale);
            p.mesh.material.opacity = Math.max(0, p.life);

            if (p.life <= 0) {
                this.scene.remove(p.mesh);
                // Dispose of geometry and material to free memory
                if (p.mesh.geometry) p.mesh.geometry.dispose();
                if (p.mesh.material) p.mesh.material.dispose();
                this.trailParticles.splice(i, 1);
            }
        }
    }

    updateEmissiveGlow() {
        // Update player emissive glow based on day/night mode
        if (this.playerMesh) {
            this.playerMesh.traverse((child) => {
                if (child.isMesh && child.material) {
                    const targetGlow = this.isNight ? new THREE.Color(0xff0000) : new THREE.Color(0x000000);
                    if (child.material.emissive) {
                        child.material.emissive.lerp(targetGlow, 0.02);
                    }
                }
            });
        }

        // Update torch light intensity
        if (this.torch) {
            const targetIntensity = this.isNight ? 600 : 0;
            this.torch.intensity = THREE.MathUtils.lerp(this.torch.intensity, targetIntensity, 0.02);
        }
    }
}
