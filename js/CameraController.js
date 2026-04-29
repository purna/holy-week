import * as THREE from 'three';

export class CameraController {
    constructor(camera) {
        this.camera = camera;
        this.camPivot = new THREE.Vector3();
    }

    follow(playerPosition, camHeading, up) {
        this.camera.up.copy(up);

        // Stabilize pivot
        this.camPivot.lerp(playerPosition, 0.04);

        // Use projected horizontal vectors from stabilized pivot
        const camFwd = camHeading.clone().projectOnPlane(up).normalize();
        const camRgt = new THREE.Vector3().crossVectors(up, camFwd).normalize();

        const targetCamPos = this.camPivot.clone()
            .add(camFwd.clone().multiplyScalar(-30))
            .add(up.clone().multiplyScalar(16))
            .add(camRgt.clone().multiplyScalar(8));

        this.camera.position.lerp(targetCamPos, 0.05);

        const lookTarget = this.camPivot.clone()
            .add(camFwd.clone().multiplyScalar(5))
            .add(camRgt.clone().multiplyScalar(3))
            .sub(up.clone().multiplyScalar(2));

        this.camera.lookAt(lookTarget);
    }
}
