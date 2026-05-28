// environment.js
import * as THREE from 'three';

export class EnvironmentManager {
    constructor(scene, sunLight, moonLight, torchLight) {
        this.scene = scene;
        this.sunLight = sunLight;
        this.moonLight = moonLight;
        this.torchLight = torchLight;
        this.timeProgress = 0.25;
    }

    update(autoCycle) {
        if (autoCycle) this.timeProgress = (this.timeProgress + 0.00027) % 1;

        const rad = this.timeProgress * Math.PI * 2;
        this.sunLight.position.set(Math.cos(rad) * 400, Math.sin(rad) * 400, 0);
        this.moonLight.position.set(Math.cos(rad + Math.PI) * 400, Math.sin(rad + Math.PI) * 400, 0);

        const dayMix = Math.max(0, Math.min(1, (Math.sin(rad) + 0.2) / 0.4));
        const dayColor = new THREE.Color(0x87ceeb);
        const nightColor = new THREE.Color(0x020205);

        this.scene.background.copy(nightColor.lerp(dayColor, dayMix));
        this.torchLight.intensity = (1 - dayMix) * 4;
    }
}