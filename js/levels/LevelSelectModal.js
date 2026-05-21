/**
 * LevelSelectModal.js
 *
 * Self-contained modal overlay showing all 10 levels as glowing location
 * points orbiting a 3D Jerusalem city model. The player can orbit the city
 * with mouse/touch drag (day_night.html camera pattern) and click any
 * unlocked level node to load it.
 *
 * Dependencies: Three.js (imported via importmap in index.html)
 *
 * Usage:
 *   import { LevelSelectModal } from './LevelSelectModal.js';
 *   const modal = new LevelSelectModal(levelManager);
 *   modal.open();
 */

import * as THREE from 'three';

// ── Level tree data ─────────────────────────────────────────────────────────
// Each entry mirrors the LevelData schema but adds:
//   unlockAfter: [ ...phaseNumbers ]  — phases that must be complete first
//   theta/phi: spherical position on the city sphere (radians)
//   landmark: short location label shown on the node

export const LEVEL_TREE = [
  {
    phase: 1,
    title: 'The Donkey King',
    actLabel: 'ACT 1',
    location: 'Jerusalem Gate',
    landmark: 'GATE',
    color: 0xffcc44,
    theta: Math.PI * 0.18,
    phi: Math.PI * 0.05,
    unlockAfter: [],           // always available
    prophecies: [
      'Zechariah 9:9 — "Your king comes to you, riding on a donkey."',
    ],
  },
  {
    phase: 2,
    title: 'Rumours in the Marketplace',
    actLabel: 'ACT 1',
    location: 'Marketplace',
    landmark: 'MARKET',
    color: 0xff9944,
    theta: Math.PI * 0.30,
    phi: Math.PI * 0.35,
    unlockAfter: [1],
    prophecies: [
      'Isaiah 61:1 — "To proclaim good news to the poor."',
    ],
  },
  {
    phase: 3,
    title: 'The Man Born Blind',
    actLabel: 'ACT 2',
    location: 'Temple Courts',
    landmark: 'TEMPLE',
    color: 0xaaddff,
    theta: Math.PI * 0.50,
    phi: Math.PI * 0.60,
    unlockAfter: [1, 2],
    prophecies: [
      'Isaiah 35:5 — "Then the eyes of the blind shall be opened."',
    ],
  },
  {
    phase: 4,
    title: 'The Cleansed Temple',
    actLabel: 'ACT 2',
    location: 'The Temple',
    landmark: 'TEMPLE',
    color: 0xff6644,
    theta: Math.PI * 0.62,
    phi: Math.PI * 0.90,
    unlockAfter: [3],
    prophecies: [
      'Malachi 3:1 — "The Lord you are seeking will come to his temple."',
      'Psalm 69:9 — "Zeal for your house consumes me."',
    ],
  },
  {
    phase: 5,
    title: 'Whispers About Lazarus',
    actLabel: 'ACT 2',
    location: 'Bethany',
    landmark: 'BETHANY',
    color: 0xddddff,
    theta: Math.PI * 0.78,
    phi: Math.PI * 1.15,
    unlockAfter: [3, 4],
    prophecies: [
      'Isaiah 26:19 — "Your dead shall live; their bodies shall rise."',
    ],
  },
  {
    phase: 6,
    title: 'Dinner in Bethany',
    actLabel: 'ACT 3',
    location: 'Private Home, Bethany',
    landmark: 'BETHANY',
    color: 0xee99cc,
    theta: Math.PI * 0.88,
    phi: Math.PI * 1.40,
    unlockAfter: [5],
    prophecies: [
      'Psalm 22:18 — "They divide my garments among them." (Anointing foreshadows burial)',
    ],
  },
  {
    phase: 7,
    title: 'The Teacher Speaks',
    actLabel: 'ACT 3',
    location: 'Mount of Olives',
    landmark: 'MT OLIVES',
    color: 0x88ccaa,
    theta: Math.PI * 1.05,
    phi: Math.PI * 1.70,
    unlockAfter: [6],
    prophecies: [
      'Zechariah 14:4 — "His feet will stand on the Mount of Olives."',
      'Micah 5:2 — wisdom coming from humble origins.',
    ],
  },
  {
    phase: 8,
    title: 'Stories With Hidden Meanings',
    actLabel: 'ACT 3',
    location: 'Streets & Gardens',
    landmark: 'GARDENS',
    color: 0xaaddcc,
    theta: Math.PI * 1.22,
    phi: Math.PI * 1.95,
    unlockAfter: [7],
    prophecies: [
      'Psalm 78:2 — "I will open my mouth in parables."',
    ],
  },
  {
    phase: 9,
    title: 'The Last Supper',
    actLabel: 'ACT 4',
    location: 'Upper Room',
    landmark: 'UPPER RM',
    color: 0xffddaa,
    theta: Math.PI * 1.40,
    phi: Math.PI * 0.20,
    unlockAfter: [8],
    prophecies: [
      'Psalm 41:9 — "Even my close friend has lifted his heel against me."',
      'Exodus 12 — The Passover lamb (bread and wine covenant).',
    ],
  },
  {
    phase: 10,
    title: 'The Garden & The Trial',
    actLabel: 'ACT 5',
    location: 'Gethsemane',
    landmark: 'GETHSEMANE',
    color: 0x9999cc,
    theta: Math.PI * 1.65,
    phi: Math.PI * 0.55,
    unlockAfter: [9],
    prophecies: [
      'Isaiah 53:7 — "He was led like a lamb to the slaughter."',
      'Zechariah 13:7 — "Strike the shepherd, and the sheep will be scattered."',
      'Psalm 22:1 — "My God, my God, why have you forsaken me?"',
    ],
  },
];

// ── Modal class ──────────────────────────────────────────────────────────────

export class LevelSelectModal {
  /**
   * @param {import('./LevelManager.js').LevelManager} levelManager
   */
  constructor(levelManager) {
    this.lm        = levelManager;
    this.overlay   = null;
    this.renderer  = null;
    this.scene     = null;
    this.camera    = null;
    this._raf      = null;
    this._nodes    = [];  // { mesh, ring, label, data, screenPos }
    this._dragging = false;
    this._lastMouse = { x: 0, y: 0 };
    this._spherical = { theta: 0.3, phi: Math.PI / 4, radius: 200 };
    this._targetSpherical = { ...this._spherical };
    this._hovered  = null;
    this._tooltip  = null;
    this._built    = false;
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  open() {
    if (!this._built) this._build();
    this.overlay.style.display = 'flex';
    this._startRender();
    this._syncNodeStates();
  }

  close() {
    this.overlay.style.display = 'none';
    this._stopRender();
  }

  /** Call after a level completes to refresh node states */
  refresh() {
    if (this._built) this._syncNodeStates();
  }

  // ── Build DOM + Three.js scene ────────────────────────────────────────────

  _build() {
    this._built = true;

    // ── Overlay shell ───────────────────────────────────────────────────────
    this.overlay = document.createElement('div');
    this.overlay.id = 'level-select-overlay';
    this.overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 5000; display: none;
      flex-direction: column; align-items: stretch; justify-content: stretch;
      background: #010105; font-family: 'Courier New', monospace;
    `;

    // Header bar
    const hdr = document.createElement('div');
    hdr.style.cssText = `
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 28px; background: rgba(0,0,0,0.7);
      border-bottom: 1px solid rgba(100,255,218,0.15); z-index: 10; flex-shrink: 0;
    `;
    hdr.innerHTML = `
      <div>
        <div style="color:#64ffda;font-size:.7rem;letter-spacing:3px;text-transform:uppercase;margin-bottom:4px">
          Jerusalem — Investigation Map
        </div>
        <div style="color:#e9edef;font-size:1.1rem;font-weight:700;letter-spacing:2px">
          SELECT A LOCATION
        </div>
      </div>
      <div style="display:flex;gap:12px;align-items:center">
        <div id="lsm-legend" style="display:flex;gap:16px;font-size:.68rem;color:#8696a0;letter-spacing:1px"></div>
        <button id="lsm-close" style="
          background:rgba(255,107,107,0.15);border:1px solid rgba(255,107,107,0.4);
          color:#ff6b6b;padding:8px 20px;border-radius:24px;cursor:pointer;
          font-family:inherit;font-size:.78rem;letter-spacing:1px;transition:all .2s
        ">✕ CLOSE</button>
      </div>
    `;
    this.overlay.appendChild(hdr);

    // Legend
    const legend = hdr.querySelector('#lsm-legend');
    [
      { color: '#64ffda', label: 'AVAILABLE' },
      { color: '#8696a0', label: 'LOCKED' },
      { color: '#ffcc44', label: 'COMPLETE' },
    ].forEach(({ color, label }) => {
      const item = document.createElement('div');
      item.style.cssText = `display:flex;align-items:center;gap:6px`;
      item.innerHTML = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${color}"></span>${label}`;
      legend.appendChild(item);
    });

    // Three.js canvas container
    const canvasWrap = document.createElement('div');
    canvasWrap.style.cssText = `flex:1;position:relative;overflow:hidden`;
    this.overlay.appendChild(canvasWrap);

    // Tooltip
    this._tooltip = document.createElement('div');
    this._tooltip.id = 'lsm-tooltip';
    this._tooltip.style.cssText = `
      position:absolute;pointer-events:none;z-index:20;
      background:rgba(11,20,26,0.95);border:1px solid rgba(100,255,218,0.25);
      border-radius:10px;padding:14px 18px;max-width:300px;opacity:0;
      transition:opacity .2s;box-shadow:0 8px 30px rgba(0,0,0,0.6);
    `;
    canvasWrap.appendChild(this._tooltip);

    // Bottom progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'lsm-progress';
    progressBar.style.cssText = `
      padding:14px 28px;background:rgba(0,0,0,0.6);
      border-top:1px solid rgba(100,255,218,0.08);
      display:flex;gap:6px;align-items:center;flex-shrink:0;
    `;
    this.overlay.appendChild(progressBar);
    this._progressBar = progressBar;

    // Drag hint
    const hint = document.createElement('div');
    hint.style.cssText = `
      position:absolute;bottom:64px;left:50%;transform:translateX(-50%);
      color:#8696a0;font-size:.65rem;letter-spacing:2px;pointer-events:none;
      animation:hintFade 4s ease forwards;
    `;
    hint.textContent = 'DRAG TO ORBIT  ·  CLICK A NODE TO ENTER';
    canvasWrap.appendChild(hint);

    // Inject keyframes
    if (!document.getElementById('lsm-styles')) {
      const st = document.createElement('style');
      st.id = 'lsm-styles';
      st.textContent = `
        @keyframes hintFade { 0%,60%{opacity:.6} 100%{opacity:0} }
        @keyframes nodePulse {
          0%,100%{transform:scale(1);opacity:.8}
          50%{transform:scale(1.4);opacity:1}
        }
        #lsm-close:hover{ background:rgba(255,107,107,0.35)!important }
        .lsm-node-label {
          position:absolute;pointer-events:none;z-index:15;
          transform:translate(-50%,-100%);
          background:rgba(11,20,26,0.85);
          border:1px solid rgba(100,255,218,0.2);
          border-radius:4px;padding:3px 8px;
          font-family:'Courier New',monospace;font-size:.6rem;
          letter-spacing:1px;white-space:nowrap;color:#e9edef;
          transition:opacity .2s;
        }
        .lsm-node-dot {
          position:absolute;pointer-events:none;z-index:14;
          transform:translate(-50%,-50%);border-radius:50%;
          transition:box-shadow .3s;
        }
        .lsm-node-dot.pulse { animation: nodePulse 1.8s ease-in-out infinite; }
      `;
      document.head.appendChild(st);
    }

    document.body.appendChild(this.overlay);

    // Close btn
    document.getElementById('lsm-close').onclick = () => this.close();

    // ── Three.js renderer ───────────────────────────────────────────────────
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvasWrap.offsetWidth || window.innerWidth,
                          canvasWrap.offsetHeight || (window.innerHeight - 120));
    this.renderer.shadowMap.enabled = true;
    canvasWrap.insertBefore(this.renderer.domElement, this._tooltip);

    this._canvasWrap = canvasWrap;

    // ── Scene ───────────────────────────────────────────────────────────────
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x010105);
    this.scene.fog = new THREE.FogExp2(0x010105, 0.0012);

    this.camera = new THREE.PerspectiveCamera(
      55,
      (canvasWrap.offsetWidth || window.innerWidth) /
      (canvasWrap.offsetHeight || window.innerHeight - 120),
      1, 2000
    );
    this._updateCameraFromSpherical(true);

    // Ambient + rim lights
    this.scene.add(new THREE.AmbientLight(0x334455, 0.8));
    const rim = new THREE.DirectionalLight(0x64ffda, 0.6);
    rim.position.set(100, 150, 80);
    this.scene.add(rim);
    const warm = new THREE.DirectionalLight(0xffaa44, 0.4);
    warm.position.set(-80, 60, -100);
    this.scene.add(warm);

    // Stars
    this._buildStars();

    // City ground sphere
    this._buildCity();

    // Level node meshes
    this._buildNodes();

    // HTML labels & dots on top of canvas
    this._buildHTMLNodes();

    // Orbit controls via mouse/touch
    this._bindControls(canvasWrap);

    // Resize
    window.addEventListener('resize', () => this._onResize());
  }

  // ── Scene builders ─────────────────────────────────────────────────────────

  _buildStars() {
    const geo = new THREE.BufferGeometry();
    const pos = [];
    for (let i = 0; i < 1800; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(800 + Math.random() * 400);
      pos.push(v.x, v.y, v.z);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    this.scene.add(new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0x88aacc, size: 1.2, transparent: true, opacity: 0.7
    })));
  }

  _buildCity() {
    const R = 80;
    this._cityR = R;

    // Base planet / ground
    const planet = new THREE.Mesh(
      new THREE.IcosahedronGeometry(R, 4),
      new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.95, metalness: 0.0 })
    );
    planet.receiveShadow = true;
    this.scene.add(planet);
    this._planet = planet;

    // City buildings — cluster near "top"
    const buildingColors = [0xc4a882, 0xb8956a, 0xd4b896, 0xa08060, 0xc8aa78];
    const rng = () => Math.random();

    for (let i = 0; i < 55; i++) {
      // Bias toward top hemisphere (Jerusalem on a hill)
      const thetaB = rng() * Math.PI * 0.55;
      const phiB   = rng() * Math.PI * 2;
      const h = 3 + rng() * 12;
      const w = 2 + rng() * 3;

      const m = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, w),
        new THREE.MeshStandardMaterial({
          color: buildingColors[Math.floor(rng() * buildingColors.length)],
          roughness: 0.9
        })
      );
      const pos = new THREE.Vector3().setFromSphericalCoords(R, thetaB, phiB);
      m.position.copy(pos);
      m.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0), pos.clone().normalize()
      );
      m.castShadow = true;
      m.receiveShadow = true;
      this.scene.add(m);
    }

    // Temple Mount — tall landmark
    const temple = new THREE.Mesh(
      new THREE.BoxGeometry(10, 20, 10),
      new THREE.MeshStandardMaterial({ color: 0xf0e0c0, roughness: 0.7 })
    );
    const tPos = new THREE.Vector3().setFromSphericalCoords(R, 0.25, 0.6);
    temple.position.copy(tPos);
    temple.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tPos.clone().normalize());
    temple.castShadow = true;
    this.scene.add(temple);

    // Glow underneath city
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.02, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x221100, transparent: true, opacity: 0.3, side: THREE.BackSide })
    );
    this.scene.add(glow);
  }

  _buildNodes() {
    this._nodes3D = [];
    const R = this._cityR;

    LEVEL_TREE.forEach(data => {
      const pos = new THREE.Vector3().setFromSphericalCoords(R + 14, data.theta, data.phi);

      // Outer glow ring
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(3.5, 0.3, 8, 32),
        new THREE.MeshBasicMaterial({ color: data.color, transparent: true, opacity: 0.5 })
      );
      ring.position.copy(pos);
      ring.lookAt(0, 0, 0);
      this.scene.add(ring);

      // Inner orb
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(1.8, 16, 16),
        new THREE.MeshBasicMaterial({ color: data.color })
      );
      orb.position.copy(pos);
      this.scene.add(orb);

      // Connecting line to surface
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        pos.clone().multiplyScalar(R / pos.length()),
        pos
      ]);
      const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({
        color: data.color, transparent: true, opacity: 0.3
      }));
      this.scene.add(line);

      this._nodes3D.push({ orb, ring, line, data, pos });
    });
  }

  _buildHTMLNodes() {
    // HTML dots + labels layered over canvas (same pattern as vn.html world-prompt)
    this._htmlNodes = LEVEL_TREE.map((data, i) => {
      const dot = document.createElement('div');
      dot.className = 'lsm-node-dot';
      dot.dataset.phase = data.phase;
      dot.style.cssText = `width:14px;height:14px;background:${this._hexColor(data.color)}`;
      this._canvasWrap.appendChild(dot);

      const label = document.createElement('div');
      label.className = 'lsm-node-label';
      label.textContent = `${data.phase}. ${data.landmark}`;
      this._canvasWrap.appendChild(label);

      dot.addEventListener('mouseenter', () => this._onNodeHover(data, dot));
      dot.addEventListener('mouseleave', () => this._onNodeLeave());
      dot.addEventListener('click', () => this._onNodeClick(data));

      return { dot, label, data, node3d: this._nodes3D[i] };
    });
  }

  _buildProgressBar() {
    const completed = LEVEL_TREE.filter(d => this._isComplete(d.phase)).length;
    const total = LEVEL_TREE.length;
    this._progressBar.innerHTML = '';

    const txt = document.createElement('div');
    txt.style.cssText = `color:#8696a0;font-size:.65rem;letter-spacing:2px;margin-right:12px;white-space:nowrap`;
    txt.textContent = `${completed}/${total} COMPLETE`;
    this._progressBar.appendChild(txt);

    LEVEL_TREE.forEach(data => {
      const pip = document.createElement('div');
      const complete  = this._isComplete(data.phase);
      const unlocked  = this._isUnlocked(data);
      const color = complete ? '#ffcc44' : unlocked ? '#64ffda' : '#2a3942';
      pip.style.cssText = `
        width:22px;height:6px;border-radius:3px;background:${color};
        transition:background .4s;cursor:${unlocked ? 'pointer' : 'default'};
        title:"Phase ${data.phase}";
      `;
      pip.title = `Phase ${data.phase}: ${data.title}`;
      if (unlocked) pip.onclick = () => this._onNodeClick(data);
      this._progressBar.appendChild(pip);
    });
  }

  // ── State helpers ─────────────────────────────────────────────────────────

  _isComplete(phase) {
    return this.lm?.getCurrentData?.()
      ? this.lm._phaseComplete?.[phase] === true
      : false;
  }

  _isUnlocked(data) {
    if (!data.unlockAfter || data.unlockAfter.length === 0) return true;
    return data.unlockAfter.every(p => this._isComplete(p));
  }

  _syncNodeStates() {
    this._htmlNodes?.forEach(({ dot, label, data }) => {
      const complete  = this._isComplete(data.phase);
      const unlocked  = this._isUnlocked(data);

      const color = complete ? '#ffcc44' : unlocked ? '#64ffda' : '#8696a0';
      dot.style.background = color;
      dot.style.cursor = unlocked ? 'pointer' : 'not-allowed';
      dot.style.boxShadow = unlocked
        ? `0 0 10px ${color}, 0 0 20px ${color}40`
        : 'none';
      dot.classList.toggle('pulse', unlocked && !complete);
      label.style.opacity = unlocked ? '1' : '0.35';
      label.style.color = complete ? '#ffcc44' : unlocked ? '#e9edef' : '#556877';

      // 3D orb color
      const node3d = this._nodes3D.find(n => n.data.phase === data.phase);
      if (node3d) {
        const c = complete ? 0xffcc44 : unlocked ? data.color : 0x334455;
        node3d.orb.material.color.setHex(c);
        node3d.ring.material.color.setHex(c);
        node3d.ring.material.opacity = unlocked ? 0.6 : 0.15;
        node3d.line.material.opacity = unlocked ? 0.4 : 0.08;
      }
    });

    this._buildProgressBar();
  }

  // ── Interaction ───────────────────────────────────────────────────────────

  _onNodeHover(data, dot) {
    const complete  = this._isComplete(data.phase);
    const unlocked  = this._isUnlocked(data);
    this._hovered = data;

    const rect = dot.getBoundingClientRect();
    const wRect = this._canvasWrap.getBoundingClientRect();

    this._tooltip.style.opacity = '1';
    this._tooltip.style.left = (rect.left - wRect.left + 20) + 'px';
    this._tooltip.style.top  = (rect.top  - wRect.top  - 10) + 'px';

    const statusColor = complete ? '#ffcc44' : unlocked ? '#64ffda' : '#ff6b6b';
    const statusText  = complete ? '✓ COMPLETE' : unlocked ? '● AVAILABLE' : '🔒 LOCKED';
    const unlockText  = !unlocked
      ? `<div style="color:#ff6b6b;font-size:.68rem;margin-top:8px">
           Requires: ${data.unlockAfter.map(p => `Phase ${p}`).join(', ')}
         </div>`
      : '';

    const propheciesHtml = data.prophecies?.length
      ? `<div style="margin-top:10px;border-top:1px solid rgba(100,255,218,0.1);padding-top:8px">
          <div style="color:#8696a0;font-size:.6rem;letter-spacing:2px;margin-bottom:6px">PROPHECY</div>
          ${data.prophecies.map(p => `<div style="color:#ffb74d;font-size:.72rem;font-style:italic;margin-bottom:4px">${p}</div>`).join('')}
        </div>`
      : '';

    this._tooltip.innerHTML = `
      <div style="color:${statusColor};font-size:.65rem;letter-spacing:2px;margin-bottom:6px">${data.actLabel} · ${statusText}</div>
      <div style="color:#e9edef;font-size:.95rem;font-weight:700;margin-bottom:4px">${data.title}</div>
      <div style="color:#8696a0;font-size:.72rem">📍 ${data.location}</div>
      ${unlockText}
      ${propheciesHtml}
      ${unlocked && !complete ? '<div style="color:#64ffda;font-size:.68rem;margin-top:10px;letter-spacing:1px">CLICK TO ENTER →</div>' : ''}
    `;
  }

  _onNodeLeave() {
    this._hovered = null;
    this._tooltip.style.opacity = '0';
  }

  _onNodeClick(data) {
    if (!this._isUnlocked(data)) return;

    this.close();

    // Small wipe transition then load phase
    const wipe = document.getElementById('wipe-overlay');
    if (wipe) {
      wipe.classList.add('active');
      setTimeout(() => {
        this.lm?.loadPhase?.(data.phase);
      }, 500);
    } else {
      this.lm?.loadPhase?.(data.phase);
    }
  }

  // ── Camera orbit (day_night.html pattern) ─────────────────────────────────

  _bindControls(el) {
    el.addEventListener('mousedown', e => {
      this._dragging = true;
      this._lastMouse = { x: e.clientX, y: e.clientY };
    });
    el.addEventListener('mousemove', e => {
      if (!this._dragging) return;
      const dx = e.clientX - this._lastMouse.x;
      const dy = e.clientY - this._lastMouse.y;
      this._lastMouse = { x: e.clientX, y: e.clientY };
      this._targetSpherical.theta -= dx * 0.006;
      this._targetSpherical.phi   += dy * 0.006;
      this._targetSpherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this._targetSpherical.phi));
    });
    el.addEventListener('mouseup',   () => this._dragging = false);
    el.addEventListener('mouseleave',() => this._dragging = false);

    // Wheel zoom
    el.addEventListener('wheel', e => {
      this._targetSpherical.radius = Math.max(140, Math.min(350,
        this._targetSpherical.radius + e.deltaY * 0.3
      ));
    });

    // Touch
    let lastTouch = null;
    el.addEventListener('touchstart', e => {
      if (e.touches.length === 1) lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });
    el.addEventListener('touchmove', e => {
      if (e.touches.length === 1 && lastTouch) {
        const dx = e.touches[0].clientX - lastTouch.x;
        const dy = e.touches[0].clientY - lastTouch.y;
        lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        this._targetSpherical.theta -= dx * 0.008;
        this._targetSpherical.phi   += dy * 0.008;
        this._targetSpherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this._targetSpherical.phi));
      }
    });
    el.addEventListener('touchend', () => lastTouch = null);
  }

  _updateCameraFromSpherical(instant = false) {
    const s = this._spherical;
    const t = this._targetSpherical;

    if (!instant) {
      const lf = 0.07;
      s.theta  += (t.theta  - s.theta)  * lf;
      s.phi    += (t.phi    - s.phi)    * lf;
      s.radius += (t.radius - s.radius) * lf;
    } else {
      s.theta  = t.theta;
      s.phi    = t.phi;
      s.radius = t.radius;
    }

    const sinPhi = Math.sin(s.phi);
    this.camera.position.set(
      s.radius * sinPhi * Math.sin(s.theta),
      s.radius * Math.cos(s.phi),
      s.radius * sinPhi * Math.cos(s.theta)
    );
    this.camera.lookAt(0, 0, 0);
  }

  // ── Render loop ───────────────────────────────────────────────────────────

  _startRender() {
    const loop = () => {
      this._raf = requestAnimationFrame(loop);
      if (this.overlay.style.display === 'none') return;

      // Slow auto-rotate when not dragging
      if (!this._dragging) {
        this._targetSpherical.theta += 0.0008;
      }

      this._updateCameraFromSpherical();

      // Pulse rings
      const t = Date.now() * 0.001;
      this._nodes3D?.forEach(({ ring, data }, i) => {
        ring.rotation.z = t * 0.4 + i * 0.6;
        ring.scale.setScalar(1 + 0.08 * Math.sin(t * 1.5 + i));
      });

      this.renderer.render(this.scene, this.camera);

      // Project 3D node positions to screen for HTML overlay
      this._htmlNodes?.forEach(({ dot, label, node3d }) => {
        const projected = node3d.pos.clone().project(this.camera);
        const rect = this._canvasWrap.getBoundingClientRect();
        const px = (projected.x * 0.5 + 0.5) * rect.width;
        const py = (projected.y * -0.5 + 0.5) * rect.height;

        // Only show if in front of camera (z < 1)
        const visible = projected.z < 1;
        dot.style.display   = visible ? 'block' : 'none';
        label.style.display = visible ? 'block' : 'none';
        dot.style.left   = px + 'px';
        dot.style.top    = py + 'px';
        label.style.left = px + 'px';
        label.style.top  = (py - 12) + 'px';
      });
    };
    loop();
  }

  _stopRender() {
    if (this._raf) {
      cancelAnimationFrame(this._raf);
      this._raf = null;
    }
  }

  _onResize() {
    if (!this.renderer || this.overlay.style.display === 'none') return;
    const rect = this._canvasWrap.getBoundingClientRect();
    this.renderer.setSize(rect.width, rect.height);
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  _hexColor(hex) {
    return '#' + hex.toString(16).padStart(6, '0');
  }
}
