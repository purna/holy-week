import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MODEL_SYSTEM, MODELS, PRIMITIVE_CONFIG, MODEL_SCALES } from './config.js';

/**
 * ModelManager - Loads and caches 3D models (GLB or primitives)
 * Provides a unified interface to get models by type
 *
 * Usage:
 *   const modelMgr = new ModelManager();
 *   await modelMgr.init();
 *   const playerMesh = modelMgr.getModel('player');
 */
export class ModelManager {
    constructor() {
        this.system = MODEL_SYSTEM;
        this.modelCache = {};
        this.loaded = false;
    }

    async init() {
        if (this.system === 'glb') {
            // Pre-load all GLB models
            const modelKeys = Object.values(MODELS);
            const uniquePaths = [...new Set(modelKeys)];
            await Promise.all(uniquePaths.map(path => this.loadGLB(path)));
        }
        this.loaded = true;
        console.log(`ModelManager: ${this.system} model system ready`);
    }

    /**
     * Load a GLB file and cache it (Promise-wrapped for async/await)
     */
    async loadGLB(path) {
        return new Promise((resolve) => {
            fetch(path)
                .then(resp => {
                    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                    return resp.arrayBuffer();
                })
                .then(arrayBuffer => {
                    const loader = new GLTFLoader();
                    const resourcePath = path.substring(0, path.lastIndexOf('/') + 1);

                    loader.parse(
                        arrayBuffer,
                        resourcePath,
                        (gltf) => {
                            this.modelCache[path] = gltf.scene;
                            console.log(`Loaded GLB: ${path}`);
                            resolve();
                        },
                        (error) => {
                            console.error(`Failed to parse GLB: ${path}`, error);
                            const fallbackKey = Object.keys(MODELS).find(k => MODELS[k] === path);
                            this.modelCache[path] = this.createPrimitiveFromConfig(fallbackKey || 'player');
                            resolve();
                        }
                    );
                })
                .catch(e => {
                    console.error(`Failed to fetch GLB: ${path}`, e);
                    const fallbackKey = Object.keys(MODELS).find(k => MODELS[k] === path);
                    this.modelCache[path] = this.createPrimitiveFromConfig(fallbackKey || 'player');
                    resolve();
                });
        });
    }

    /**
     * Create primitive fallback if GLB fails to load
     */
    createPrimitiveFallback(path) {
        const key = Object.keys(MODELS).find(k => MODELS[k] === path);
        if (!key) return new THREE.Group();
        return this.createPrimitiveFromConfig(key);
    }

    /**
     * Create primitive geometry from config
     */
    createPrimitive(cfg) {
        const group = new THREE.Group();

        switch (cfg.type) {
            case 'box':
                const box = new THREE.Mesh(
                    new THREE.BoxGeometry(...cfg.size),
                    new THREE.MeshToonMaterial({ color: cfg.color })
                );
                group.add(box);
                break;

            case 'sphere':
                const sphere = new THREE.Mesh(
                    new THREE.SphereGeometry(cfg.radius, 16, 16),
                    new THREE.MeshToonMaterial({ color: cfg.color })
                );
                group.add(sphere);
                break;

            case 'capsule':
                const capsule = new THREE.Mesh(
                    new THREE.CapsuleGeometry(cfg.radius, cfg.length, 8, 16),
                    new THREE.MeshToonMaterial({ color: cfg.color })
                );
                capsule.position.y = cfg.length / 2 + cfg.radius;
                group.add(capsule);
                break;

            case 'octahedron':
                const oct = new THREE.Mesh(
                    new THREE.OctahedronGeometry(cfg.radius),
                    new THREE.MeshStandardMaterial({
                        color: cfg.color,
                        emissive: cfg.emissive || 0x000000,
                        transparent: !!cfg.emissive,
                        opacity: cfg.emissive ? 0.9 : 1.0
                    })
                );
                group.add(oct);
                break;

            case 'icosahedron':
                const ico = new THREE.Mesh(
                    new THREE.IcosahedronGeometry(cfg.radius, cfg.segments || 0),
                    new THREE.MeshToonMaterial({ color: cfg.color })
                );
                group.add(ico);
                break;
        }

        return group;
    }

    /**
     * Get a model by key (player, npcEcho, pickupCell, etc.)
     * Returns a THREE.Group (cloned from cache)
     */
    getModel(key) {
        if (this.system === 'primitives') {
            return this.createPrimitiveFromConfig(key);
        }

        // GLB system: try exact key, then lowercase
        let path = MODELS[key];
        if (!path) path = MODELS[key.toLowerCase()];
        if (!path) {
            console.warn(`Model not found: ${key}`);
            return new THREE.Group();
        }

        const cached = this.modelCache[path];
        if (!cached) {
            console.warn(`Model not loaded: ${key}`);
            return new THREE.Group();
        }

        const cloned = cached.clone(true);
        const scale = MODEL_SCALES[key] || MODEL_SCALES[key.toLowerCase()] || 1;
        if (scale !== 1) {
            cloned.scale.setScalar(scale);
        }
        return cloned;
    }

    /**
     * Create primitive from config (case-insensitive key)
     */
    createPrimitiveFromConfig(key) {
        let cfg = PRIMITIVE_CONFIG[key];
        if (!cfg) cfg = PRIMITIVE_CONFIG[key.toLowerCase()];
        if (!cfg) {
            console.warn(`Primitive config not found: ${key}`);
            return new THREE.Group();
        }
        return this.createPrimitive(cfg);
    }

    /**
     * Get raw cached model (for special cases where cloning not needed)
     */
    getCachedModel(key) {
        let path = MODELS[key];
        if (!path) path = MODELS[key.toLowerCase()];
        return this.modelCache[path] || null;
    }
}
