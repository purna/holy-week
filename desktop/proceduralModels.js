import * as THREE from 'three';

export function createPalmTree() {
  const group = new THREE.Group();

  const trunkGeo = new THREE.CylinderGeometry(0.15, 0.25, 3.5, 8);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.9 });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = 1.75;
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  group.add(trunk);

  const frondMat = new THREE.MeshStandardMaterial({ color: 0x2d5a27, roughness: 0.8, side: THREE.DoubleSide });
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2;
    const frondGeo = new THREE.PlaneGeometry(1.8, 0.6, 4, 1);
    const frond = new THREE.Mesh(frondGeo, frondMat);
    frond.position.set(Math.cos(angle) * 0.3, 3.4, Math.sin(angle) * 0.3);
    frond.rotation.y = angle;
    frond.rotation.x = -0.5;
    frond.castShadow = true;
    group.add(frond);
  }

  group.userData.collisionRadius = 0.6;
  return group;
}

export function createBush() {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x3a6b34, roughness: 0.9 });

  const positions = [
    [0, 0.5, 0],
    [0.4, 0.3, 0.3],
    [-0.35, 0.35, -0.25],
    [0.2, 0.2, -0.4],
    [-0.3, 0.25, 0.35],
  ];

  positions.forEach(([x, y, z]) => {
    const r = 0.35 + Math.random() * 0.25;
    const geo = new THREE.SphereGeometry(r, 8, 6);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  });

  group.userData.collisionRadius = 0.8;
  return group;
}

export function createJar() {
  const group = new THREE.Group();

  const bodyGeo = new THREE.CylinderGeometry(0.25, 0.3, 0.9, 12);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xc2b280, roughness: 0.6, metalness: 0.1 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.45;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  const rimGeo = new THREE.TorusGeometry(0.26, 0.06, 8, 12);
  const rim = new THREE.Mesh(rimGeo, bodyMat);
  rim.position.y = 0.9;
  rim.rotation.x = Math.PI / 2;
  rim.castShadow = true;
  group.add(rim);

  group.userData.collisionRadius = 0.35;
  return group;
}
