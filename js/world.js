import * as THREE from 'three';
import * as CANNON from 'cannon';
import { MODEL_SCALES } from './config.js';

export class WorldManager {
    constructor(scene, world, modelMgr = null, toonShader = null) {
        this.scene = scene;
        this.world = world;
        this.modelMgr = modelMgr;
        this.toonShader = toonShader;
        this.planetR = 50;
        this.planet = null;
        this.planetMesh = null; // The actual mesh for decal operations
        this.pickups = [];
        this.buildings = [];
        this.crystalClusters = [];
        this.relayTowers = [];

        this.setupPlanet();
        this.setupPickups();
        this.setupBuildings();
        this.setupCrystalClusters();
        this.setupRelayTowers();
    }

    setupPlanet() {
        if (this.modelMgr && this.modelMgr.system === 'glb') {
            const planetModel = this.modelMgr.getModel('planet');
            if (planetModel) {
                // Clone the model to avoid modifying the cached version
                const clonedPlanet = planetModel.clone();

                // Ensure materials can receive lighting
                clonedPlanet.traverse((child) => {
                    if (child.isMesh) {
                        // Store the mesh for decal operations
                        if (!this.planetMesh) {
                            this.planetMesh = child;
                        }

                        // Ensure material can receive shadows and lighting
                        if (child.material) {
                            child.material.needsUpdate = true;
                            child.receiveShadow = true;
                            child.castShadow = true; // Planet can also cast shadows in some cases

                            // For GLB materials, ensure they work with our lights
                            if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial) {
                                // These materials should work with lighting by default
                            }
                        }
                    }
                });

                // Apply scale if specified
                const scale = MODEL_SCALES.planet || 1;
                clonedPlanet.scale.setScalar(scale);

                this.planet = clonedPlanet;
                this.scene.add(clonedPlanet);

                // Ensure planet receives shadows
                clonedPlanet.traverse((child) => {
                    if (child.isMesh) {
                        child.receiveShadow = true;
                    }
                });
                console.log('Planet GLB loaded:', clonedPlanet);
            } else {
                console.warn('Planet GLB model not found, falling back to primitive');
                // Fallback to primitive
                const planetToon = this.toonShader.createToonGroup(
                    new THREE.IcosahedronGeometry(this.planetR, 5),
                    0x2a552a,
                    0.005
                );
                this.planet = planetToon.mainMesh;
                this.planetMesh = planetToon.mainMesh;
                this.scene.add(planetToon.group);
            }
        } else {
            // Use toon shader for planet
            const planetToon = this.toonShader.createToonGroup(
                new THREE.IcosahedronGeometry(this.planetR, 5),
                0x2a552a,
                0.005 // Small outline for planet
            );
            this.planet = planetToon.mainMesh;
            this.planetMesh = planetToon.mainMesh; // Store for decals
            this.scene.add(planetToon.group);

            // Ensure toon planet receives shadows
            planetToon.mainMesh.receiveShadow = true;
        }

        this.world.addBody(new CANNON.Body({
            mass: 0,
            shape: new CANNON.Sphere(this.planetR)
        }));
    }

    setupPickups() {
        // Data Cells (orange spheres) - 4
        for (let i = 0; i < 4; i++) {
            let pickupGroup;
            if (this.modelMgr && this.modelMgr.system === 'glb') {
                const model = this.modelMgr.getModel('pickupCell');
                if (model && model.children.length > 0) {
                    const m = model.children[0].clone();
                    m.material = this.toonShader.createToonMaterial(0xffaa00);
                    m.name = `CELL_${i + 1}`;
                    m.position.setFromSphericalCoords(this.planetR + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
                    this.toonShader.updateShadowSettings(m);
                    this.scene.add(m);
                    this.pickups.push(m);
                } else {
                    pickupGroup = this.toonShader.createToonGroup(
                        new THREE.SphereGeometry(1),
                        0xffaa00,
                        0.12
                    );
                    pickupGroup.group.name = `CELL_${i + 1}`;
                    pickupGroup.group.position.setFromSphericalCoords(this.planetR + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
                    this.scene.add(pickupGroup.group);
                    this.pickups.push(pickupGroup.group);
                }
            } else {
                pickupGroup = this.toonShader.createToonGroup(
                    new THREE.SphereGeometry(1),
                    0xffaa00,
                    0.12
                );
                pickupGroup.group.name = `CELL_${i + 1}`;
                pickupGroup.group.position.setFromSphericalCoords(this.planetR + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
                this.scene.add(pickupGroup.group);
                this.pickups.push(pickupGroup.group);
            }
        }

        // Signal Shards (purple octahedrons) - 4
        for (let i = 0; i < 4; i++) {
            let pickupGroup;
            if (this.modelMgr && this.modelMgr.system === 'glb') {
                const model = this.modelMgr.getModel('pickupShard');
                if (model && model.children.length > 0) {
                    const m = model.children[0].clone();
                    m.material = this.toonShader.createToonMaterial(0xa020f0, { emissive: 0x4a0080 });
                    m.name = `SHARD_${i + 1}`;
                    m.position.setFromSphericalCoords(this.planetR + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
                    this.toonShader.updateShadowSettings(m);
                    this.scene.add(m);
                    this.pickups.push(m);
                } else {
                    pickupGroup = this.toonShader.createToonGroup(
                        new THREE.OctahedronGeometry(0.9),
                        0xa020f0,
                        0.12,
                        { emissive: 0x4a0080 }
                    );
                    pickupGroup.group.name = `SHARD_${i + 1}`;
                    pickupGroup.group.position.setFromSphericalCoords(this.planetR + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
                    this.scene.add(pickupGroup.group);
                    this.pickups.push(pickupGroup.group);
                }
            } else {
                pickupGroup = this.toonShader.createToonGroup(
                    new THREE.OctahedronGeometry(0.9),
                    0xa020f0,
                    0.12,
                    { emissive: 0x4a0080 }
                );
                pickupGroup.group.name = `SHARD_${i + 1}`;
                pickupGroup.group.position.setFromSphericalCoords(this.planetR + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
                this.scene.add(pickupGroup.group);
                this.pickups.push(pickupGroup.group);
            }
        }
    }

    setupBuildings() {
        for (let i = 0; i < 8; i++) {
            const h = Math.random() * 6 + 2;
            let buildingGroup;
            if (this.modelMgr && this.modelMgr.system === 'glb') {
                const model = this.modelMgr.getModel('tower');
                if (model && model.children.length > 0) {
                    const m = model.clone();
                    // Update materials to toon and enable shadows
                    m.traverse((child) => {
                        if (child.isMesh && child.material) {
                            child.material = this.toonShader.createToonMaterial(0x333344);
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });
                    buildingGroup = m;
                } else {
                    buildingGroup = this.toonShader.createToonGroup(
                        new THREE.BoxGeometry(3, h, 3),
                        0x333344,
                        0.05
                    ).group;
                }
            } else {
                buildingGroup = this.toonShader.createToonGroup(
                    new THREE.BoxGeometry(3, h, 3),
                    0x333344,
                    0.05
                ).group;
            }
            const pos = new THREE.Vector3().setFromSphericalCoords(this.planetR + h / 2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
            buildingGroup.position.copy(pos);
            buildingGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
            this.scene.add(buildingGroup);

            const body = new CANNON.Body({
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(1.5, h / 2, 1.5))
            });
            body.position.copy(pos);
            body.quaternion.copy(buildingGroup.quaternion);
            this.world.addBody(body);

            this.buildings.push(buildingGroup);
        }
    }

    setupCrystalClusters() {
        for (let i = 0; i < 15; i++) {
            const pos = new THREE.Vector3().setFromSphericalCoords(this.planetR, Math.random() * Math.PI, Math.random() * Math.PI * 2);
            const cluster = new THREE.Group();
            const count = Math.floor(Math.random() * 4) + 2;

            for (let j = 0; j < count; j++) {
                const crystalToon = this.toonShader.createToonGroup(
                    new THREE.ConeGeometry(0.8, 4 + Math.random() * 3, 5),
                    0x00f2ff,
                    0.08,
                    { emissive: 0x004444, transparent: true, opacity: 0.9 }
                );
                crystalToon.group.position.set((Math.random() - 0.5) * 2, 2, (Math.random() - 0.5) * 2);
                crystalToon.group.rotation.set((Math.random() - 0.5) * 0.6, Math.random() * Math.PI, (Math.random() - 0.5) * 0.6);
                cluster.add(crystalToon.group);
            }

            cluster.position.copy(pos);
            cluster.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
            this.scene.add(cluster);
            this.crystalClusters.push(cluster);
        }
    }

    setupRelayTowers() {
        for (let i = 0; i < 6; i++) {
            const pos = new THREE.Vector3().setFromSphericalCoords(this.planetR, Math.random() * Math.PI, Math.random() * Math.PI * 2);
            const tower = new THREE.Group();

            // Base with toon shader
            const baseToon = this.toonShader.createToonGroup(
                new THREE.CylinderGeometry(1.5, 2, 10, 8),
                0x333344,
                0.05
            );
            baseToon.group.position.y = 5;
            tower.add(baseToon.group);

            // Orb (use basic material for glow effect)
            const orb = new THREE.Mesh(
                new THREE.SphereGeometry(1.5),
                new THREE.MeshStandardMaterial({ color: 0xffaa00, emissive: 0x663300 })
            );
            orb.position.y = 11;
            orb.castShadow = true;
            tower.add(orb);

            // Ring (keep basic material for visibility)
            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(3.5, 0.2, 8, 24),
                new THREE.MeshBasicMaterial({ color: 0xffaa00 })
            );
            ring.position.y = 8;
            ring.rotation.x = Math.PI / 2;
            tower.add(ring);

            tower.position.copy(pos);
            tower.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
            this.scene.add(tower);

            const body = new CANNON.Body({
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(1.5, 5, 1.5))
            });
            body.position.copy(pos);
            body.quaternion.copy(tower.quaternion);
            this.world.addBody(body);

            this.relayTowers.push(tower);
        }
    }

    updatePickupCollection(playerPosition, onPickup) {
        for (let i = this.pickups.length - 1; i >= 0; i--) {
            if (playerPosition.distanceTo(this.pickups[i].position) < 3) {
                const itemName = this.pickups[i].name;
                this.scene.remove(this.pickups[i]);
                this.pickups.splice(i, 1);
                if (onPickup) onPickup(itemName);
            }
        }
    }

    getClosestNonDialogueNPC(playerPosition) {
        return null;
    }
}
