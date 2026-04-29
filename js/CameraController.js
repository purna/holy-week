import * as THREE from 'three';

export class CameraController {
    constructor(camera) {
        this.camera = camera;
    }

    follow(playerPosition, camHeading, up) {
        this.camera.up.copy(up);
        const targetCamPos = playerPosition.clone()
            .add(camHeading.clone().multiplyScalar(-30))
            .add(up.clone().multiplyScalar(16))
            .add(new THREE.Vector3().crossVectors(up, camHeading).multiplyScalar(8));
        this.camera.position.lerp(targetCamPos, 0.05);
        this.camera.lookAt(playerPosition.clone().add(camHeading.clone().multiplyScalar(5)));
    }
}
