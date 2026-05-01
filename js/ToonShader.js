import * as THREE from 'three';

export class ToonShader {
    constructor() {
        // Create gradient map for toon shading (3-step: dark, mid, light)
        this.gradientMap = this.createGradientMap();
    }

    createGradientMap() {
        // Use LuminanceFormat as fallback - works across WebGL versions
        const format = THREE.LuminanceFormat;
        const colors = new Uint8Array([32, 160, 255]); // 3-step gradient: dark gray, light gray, white (brighter)
        const gradientMap = new THREE.DataTexture(colors, colors.length, 1, format);
        gradientMap.needsUpdate = true;
        return gradientMap;
    }

    /**
     * Creates a toon material with gradient mapping
     * @param {number} color - Hex color value
     * @param {Object} options - Additional material options
     * @returns {THREE.MeshToonMaterial}
     */
    createToonMaterial(color, options = {}) {
        return new THREE.MeshToonMaterial({
            color: color,
            gradientMap: this.gradientMap,
            ...options
        });
    }

    /**
     * Creates a toon mesh group with main mesh and black outline
     * @param {THREE.Geometry} geometry - The geometry for the mesh
     * @param {number} color - Hex color value for the main mesh
     * @param {number} outlineSize - Size multiplier for the outline (default: 0.08)
     * @param {Object} options - Additional material options
     * @returns {Object} {group, mainMesh, outlineMesh}
     */
    createToonGroup(geometry, color, outlineSize = 0.08, options = {}) {
        const group = new THREE.Group();

        // Main toon mesh
        const toonMat = this.createToonMaterial(color, options);
        const mainMesh = new THREE.Mesh(geometry, toonMat);
        mainMesh.castShadow = true;
        mainMesh.receiveShadow = true;
        group.add(mainMesh);

        // Black outline hull (backsided geometry)
        const outlineMat = new THREE.MeshBasicMaterial({
            color: 0x000000,
            side: THREE.BackSide
        });
        const outlineMesh = new THREE.Mesh(geometry.clone(), outlineMat);
        outlineMesh.scale.multiplyScalar(1 + outlineSize);
        group.add(outlineMesh);

        return { group, mainMesh, outlineMesh };
    }

    /**
     * Updates shadow settings for toon materials
     * @param {boolean} castShadow - Whether meshes should cast shadows
     * @param {boolean} receiveShadow - Whether meshes should receive shadows
     */
    updateShadowSettings(group, castShadow = true, receiveShadow = true) {
        group.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = castShadow;
                child.receiveShadow = receiveShadow;
            }
        });
    }

    /**
     * Disposes of the gradient map texture
     */
    dispose() {
        if (this.gradientMap) {
            this.gradientMap.dispose();
        }
    }
}