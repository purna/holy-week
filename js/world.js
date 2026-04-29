import * as THREE from 'three';
import * as CANNON from 'cannon';

export class WorldManager {
    constructor(scene, world) {
        this.scene = scene;
        this.world = world;
        this.planetR = 50;
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
        this.planet = new THREE.Mesh(
            new THREE.IcosahedronGeometry(this.planetR, 5),
            new THREE.MeshToonMaterial({ color: 0x1a251a })
        );
        this.planet.receiveShadow = true;
        this.scene.add(this.planet);

        this.world.addBody(new CANNON.Body({
            mass: 0,
            shape: new CANNON.Sphere(this.planetR)
        }));
    }

    setupPickups() {
        // Data Cells (orange spheres) - 4
        for (let i = 0; i < 4; i++) {
            const m = new THREE.Mesh(
                new THREE.SphereGeometry(1),
                new THREE.MeshToonMaterial({ color: 0xffaa00 })
            );
            m.name = `CELL_${i + 1}`;
            m.position.setFromSphericalCoords(this.planetR + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
            m.castShadow = true;
            this.scene.add(m);
            this.pickups.push(m);
        }

        // Signal Shards (purple octahedrons) - 4
        for (let i = 0; i < 4; i++) {
            const m = new THREE.Mesh(
                new THREE.OctahedronGeometry(0.9),
                new THREE.MeshStandardMaterial({ color: 0xa020f0, emissive: 0x4a0080 })
            );
            m.name = `SHARD_${i + 1}`;
            m.position.setFromSphericalCoords(this.planetR + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
            m.castShadow = true;
            this.scene.add(m);
            this.pickups.push(m);
        }
    }

    setupBuildings() {
        for (let i = 0; i < 8; i++) {
            const h = Math.random() * 6 + 2;
            const m = new THREE.Mesh(
                new THREE.BoxGeometry(3, h, 3),
                new THREE.MeshToonMaterial({ color: 0x333344 })
            );
            const pos = new THREE.Vector3().setFromSphericalCoords(this.planetR + h / 2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
            m.position.copy(pos);
            m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
            m.castShadow = true;
            m.receiveShadow = true;
            this.scene.add(m);

            const body = new CANNON.Body({
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(1.5, h / 2, 1.5))
            });
            body.position.copy(pos);
            body.quaternion.copy(m.quaternion);
            this.world.addBody(body);

            this.buildings.push(m);
        }
    }

    setupCrystalClusters() {
        for (let i = 0; i < 15; i++) {
            const pos = new THREE.Vector3().setFromSphericalCoords(this.planetR, Math.random() * Math.PI, Math.random() * Math.PI * 2);
            const cluster = new THREE.Group();
            const count = Math.floor(Math.random() * 4) + 2;

            for (let j = 0; j < count; j++) {
                const crys = new THREE.Mesh(
                    new THREE.ConeGeometry(0.8, 4 + Math.random() * 3, 5),
                    new THREE.MeshStandardMaterial({ color: 0x00f2ff, emissive: 0x004444, transparent: true, opacity: 0.9 })
                );
                crys.position.set((Math.random() - 0.5) * 2, 2, (Math.random() - 0.5) * 2);
                crys.rotation.set((Math.random() - 0.5) * 0.6, Math.random() * Math.PI, (Math.random() - 0.5) * 0.6);
                crys.castShadow = true;
                crys.receiveShadow = true;
                cluster.add(crys);
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

            const base = new THREE.Mesh(
                new THREE.CylinderGeometry(1.5, 2, 10, 8),
                new THREE.MeshStandardMaterial({ color: 0x333344 })
            );
            base.position.y = 5;
            base.castShadow = true;
            base.receiveShadow = true;

            const orb = new THREE.Mesh(
                new THREE.SphereGeometry(1.5),
                new THREE.MeshStandardMaterial({ color: 0xffaa00, emissive: 0x663300 })
            );
            orb.position.y = 11;

            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(3.5, 0.2, 8, 24),
                new THREE.MeshBasicMaterial({ color: 0xffaa00 })
            );
            ring.position.y = 8;
            ring.rotation.x = Math.PI / 2;

            tower.add(base, orb, ring);
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
        // This is actually handled by NPCSystem now, but keep for compatibility (not used)
        return null;
    }
}
