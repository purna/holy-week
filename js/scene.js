import * as THREE from 'three';
import * as CANNON from 'cannon';

export class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x020205);
        this.scene.fog = new THREE.FogExp2(0x020205, 0.008);

        this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 5000);
        this.camera.position.set(0, 80, 150);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);

        // Physics world
        this.world = new CANNON.World();
        this.world.solver.iterations = 15;

        this.setupLights();
        this.setupStarField();
    }

    setupLights() {
        const sun = new THREE.DirectionalLight(0xffffff, 2.5);
        sun.position.set(100, 200, 100);
        sun.castShadow = true;
        sun.shadow.camera.left = -100;
        sun.shadow.camera.right = 100;
        sun.shadow.camera.top = 100;
        sun.shadow.camera.bottom = -100;
        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 500;
        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;
        this.scene.add(sun);
        this.scene.add(new THREE.AmbientLight(0x404040, 1.5));
        this.sun = sun;
    }

    setupStarField() {
        const starGeo = new THREE.BufferGeometry();
        const starPos = [];
        for (let i = 0; i < 1500; i++) {
            const v = new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 2000 + 100);
            starPos.push(v.x, v.y, v.z);
        }
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
        const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
            color: 0x88ccff,
            size: 1.5,
            transparent: true,
            opacity: 0.8
        }));
        this.scene.add(stars);
        this.stars = stars;
    }

    handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
