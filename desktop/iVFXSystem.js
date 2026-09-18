import * as THREE from 'three';

export class iVFXSystem {
  constructor(scene, planetR = 500) {
    this.scene = scene;
    this.planetR = planetR;
    this.trailParticles = [];
    this.sparkParticles = [];
    this.ambientParticles = null;
    this.fog = null;
    this._isNight = false;
    this._trailGeometry = new THREE.SphereGeometry(0.15, 4, 4);
    this._sparkGeometry = new THREE.SphereGeometry(0.08, 4, 4);
    this._freeTrails = [];
    this._freeSparks = [];
    this._up = new THREE.Vector3();
    // Prewarm enough for normal play; grow only on an unusually large burst.
    this._growPool(this._freeTrails, this._trailGeometry, 128);
    this._growPool(this._freeSparks, this._sparkGeometry, 128);

    this._initAmbientParticles();
    this._initFog();
  }

  _initAmbientParticles() {
    const geo = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 1500; i++) {
      vertices.push(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400
      );
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    this.ambientParticles = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.4,
        transparent: true,
        opacity: 0.3,
      })
    );
    this.scene.add(this.ambientParticles);
  }

  _initFog() {
    this.fog = new THREE.FogExp2(0xadd8e6, 0.004);
    this.scene.fog = this.fog;
  }

  setFogColor(color, density = 0.004) {
    if (this.fog) {
      this.fog.color.set(color);
      this.fog.density = density;
    }
  }

  setFogDensity(density) {
    if (this.fog) {
      this.fog.density = density;
    }
  }

  _growPool(pool, geometry, count) {
    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ transparent: true }));
      pool.push({ mesh, life: 0, maxLife: 0, vel: new THREE.Vector3() });
    }
  }

  spawnTrail(pos, up = null) {
    if (!this._freeTrails.length) this._growPool(this._freeTrails, this._trailGeometry, 64);
    const particle = this._freeTrails.pop();
    particle.life = particle.maxLife = 1;
    particle.mesh.position.copy(pos);
    if (up) particle.mesh.position.addScaledVector(up, -0.8);
    particle.mesh.scale.setScalar(1);
    particle.mesh.material.color.set(this._isNight ? 0x00f2ff : 0x443322);
    particle.mesh.material.opacity = 0.5;
    this.scene.add(particle.mesh);
    this.trailParticles.push(particle);
  }

  spawnSpark(pos, color = 0x00f2ff) {
    if (!this._freeSparks.length) this._growPool(this._freeSparks, this._sparkGeometry, 64);
    const particle = this._freeSparks.pop();
    particle.life = particle.maxLife = 0.6;
    particle.mesh.position.copy(pos);
    particle.mesh.scale.setScalar(1);
    particle.mesh.material.color.set(color);
    particle.mesh.material.opacity = 0.9;
    particle.vel.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(2);
    this.scene.add(particle.mesh);
    this.sparkParticles.push(particle);
  }

  emitTrail(pos, up) {
    if (Math.random() > 0.7) return;
    this.spawnTrail(pos, up);
  }

  emitSparks(pos, count = 8) {
    for (let i = 0; i < count; i++) {
      this.spawnSpark(pos);
    }
  }

  update(dt, playerPos, playerVel, isGrounded) {
    if (this.ambientParticles) {
      this.ambientParticles.position.copy(playerPos);
    }

    if (playerPos && playerVel && isGrounded && playerVel.lengthSq() > 10) {
      const up = this._up.copy(playerPos).normalize();
      this.emitTrail(playerPos, up);
    }

    for (let i = this.trailParticles.length - 1; i >= 0; i--) {
      const t = this.trailParticles[i];
      t.life -= dt * 1.5;
      const scale = Math.max(0.1, t.life);
      t.mesh.scale.setScalar(scale);
      t.mesh.material.opacity = Math.max(0, t.life / t.maxLife);
      if (t.life <= 0) {
        this.scene.remove(t.mesh);
        this._freeTrails.push(t);
        this.trailParticles.splice(i, 1);
      }
    }

    for (let i = this.sparkParticles.length - 1; i >= 0; i--) {
      const s = this.sparkParticles[i];
      s.life -= dt;
      s.vel.y += -9.8 * dt;
      s.mesh.position.addScaledVector(s.vel, dt);
      s.mesh.material.opacity = Math.max(0, s.life / s.maxLife);
      const scale = Math.max(0.1, s.life / s.maxLife);
      s.mesh.scale.setScalar(scale);
      if (s.life <= 0) {
        this.scene.remove(s.mesh);
        this._freeSparks.push(s);
        this.sparkParticles.splice(i, 1);
      }
    }
  }

  setNightMode(isNight) {
    this._isNight = isNight;
    if (isNight) {
      this.setFogColor(0x1a233a, 0.0055);
    } else {
      this.setFogColor(0xadd8e6, 0.004);
    }
  }

  dispose() {
    for (const pool of [this.trailParticles, this.sparkParticles, this._freeTrails, this._freeSparks]) {
      for (const particle of pool) {
        this.scene.remove(particle.mesh);
        particle.mesh.material.dispose();
      }
      pool.length = 0;
    }
    this._trailGeometry.dispose();
    this._sparkGeometry.dispose();
    if (this.ambientParticles) {
      this.scene.remove(this.ambientParticles);
      this.ambientParticles.geometry.dispose();
      this.ambientParticles.material.dispose();
    }
  }
}
