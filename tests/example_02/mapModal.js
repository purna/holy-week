// mapModal.js
import * as THREE from 'three';

export class OrbitalSelectMatrixModal {
    constructor(caseManager, loadCaseCallback) {
        this.cm = caseManager;
        this.loadCase = loadCaseCallback;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.core = null;
        this.overlay = document.getElementById('modal-overlay');
        this.wrapper = document.getElementById('modal-canvas-wrap');
        this.theta = 0;
        this.phi = Math.PI / 3;
        this.dragging = false;
        this.prev = { x: 0, y: 0 };
        this.treeEl = null;
        this.caseList = [
            { id: 'triumphal_entry', phase: 1, title: 'The Missing Donkey', actLabel: 'Act I', color: 0x60a5fa },
            { id: 'last_supper', phase: 2, title: 'The Broken Cup', actLabel: 'Act II', color: 0x34d399 },
            { id: 'authority_challenged', phase: 3, title: 'The Silenced Teacher', actLabel: 'Act III', color: 0xf59e0b },
            { id: 'resurrection', phase: 4, title: 'The Empty Tomb', actLabel: 'Act IV', color: 0xa78bfa }
        ];

        this.init();
        this.bind();
    }

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x05070b);

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.wrapper.appendChild(this.renderer.domElement);

        const light = new THREE.PointLight(0x00ffaa, 1.5, 80);
        light.position.set(0, 20, 10);
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.35));

        this.core = new THREE.Mesh(
            new THREE.SphereGeometry(6.5, 30, 30),
            new THREE.MeshStandardMaterial({ color: 0x00a884, wireframe: true, transparent: true, opacity: 0.4 })
        );
        this.scene.add(this.core);

        const body = this.wrapper.parentElement || this.wrapper;
        this.wrapper.style.marginLeft = '240px';

        const tree = document.createElement('div');
        tree.id = 'lsm-tree';
        tree.style.cssText = 'width:240px;flex-shrink:0;background:rgba(0,0,0,.4);border-right:1px solid rgba(100,255,218,.08);overflow-y:auto;padding:16px 0;';
        body.insertBefore(tree, this.wrapper);
        this.treeEl = tree;

        const hdr = document.createElement('div');
        hdr.style.cssText = 'padding:16px 16px 8px;color:#64ffda;font-size:.58rem;letter-spacing:3px;';
        hdr.textContent = 'INVESTIGATION PHASES';
        tree.appendChild(hdr);

        this.caseList.forEach((c, i) => {
            if (i > 0) {
                const cn = document.createElement('div');
                cn.className = 'tree-connector';
                cn.style.cssText = 'width:2px;height:14px;background:rgba(100,255,218,.12);margin-left:23px;';
                tree.appendChild(cn);
            }
            const item = document.createElement('div');
            item.className = 'tree-item';
            item.dataset.case = c.id;
            const dot = document.createElement('div');
            dot.className = 'tree-dot';
            const info = document.createElement('div');
            info.className = 'tree-info';
            const act = document.createElement('div');
            act.className = 'tree-act';
            act.textContent = c.actLabel;
            const title = document.createElement('div');
            title.className = 'tree-title';
            title.textContent = c.title;
            info.appendChild(act);
            info.appendChild(title);
            item.appendChild(dot);
            item.appendChild(info);
            item.style.cssText = 'display:flex;align-items:center;gap:10px;padding:9px 16px;cursor:pointer;border-left:3px solid transparent;transition:all .2s;';
            tree.appendChild(item);
        });

        const total = Object.keys(this.cm.cases).length || 1;
        Object.entries(this.cm.cases).forEach(([id, c], index) => {
            const phi = Math.PI / 2;
            const theta = (index / total) * Math.PI * 2;
            const marker = new THREE.Mesh(
                new THREE.SphereGeometry(0.45, 16, 16),
                new THREE.MeshStandardMaterial({ color: c.color, emissive: c.color, emissiveIntensity: 1.8 })
            );
            marker.position.set(
                Math.sin(phi) * Math.cos(theta) * 7,
                Math.sin(phi) * Math.sin(theta) * 7,
                Math.cos(phi) * 7
            );
            this.core.add(marker);

            const dot = document.createElement('div');
            dot.className = 'map-node-dot';
            dot.style.backgroundColor = c.color ? `#${c.color.toString(16).padStart(6, '0')}` : '#60a5fa';

            const label = document.createElement('div');
            label.className = 'map-node-label';
            label.innerText = c.title;

            this.wrapper.appendChild(dot);
            this.wrapper.appendChild(label);

            dot.onclick = () => {
                this.close();
                this.loadCase(id);
            };
        });
    }

    bind() {
        document.getElementById('btn-close-map').onclick = () => this.close();

        this.wrapper.addEventListener('mousedown', (e) => {
            this.dragging = true;
            this.prev = { x: e.clientX, y: e.clientY };
        });

        this.wrapper.addEventListener('mousemove', (e) => {
            if (!this.dragging) return;
            const dx = e.clientX - this.prev.x;
            const dy = e.clientY - this.prev.y;
            this.theta -= dx * 0.006;
            this.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.phi - dy * 0.006));
            this.prev = { x: e.clientX, y: e.clientY };
        });

        this.wrapper.addEventListener('mouseup', () => this.dragging = false);
        this.wrapper.addEventListener('mouseleave', () => this.dragging = false);
    }

    open() { this.overlay.classList.add('active'); this.loop(); }
    close() { this.overlay.classList.remove('active'); cancelAnimationFrame(this.raf); }

    loop() {
        this.raf = requestAnimationFrame(() => this.loop());
        this.camera.position.setFromSphericalCoords(24, this.phi, this.theta);
        this.camera.lookAt(0, 0, 0);
        if (!this.dragging && this.core) this.core.rotation.y += 0.003;
        this.renderer.render(this.scene, this.camera);

        const total = Object.keys(this.cm.cases).length || 1;
        const w = this.wrapper.offsetWidth;
        const h = this.wrapper.offsetHeight;
        const cx = w / 2;
        const cy = h / 2;
        Object.entries(this.cm.cases).forEach(([id, c], index) => {
            const theta = (index / total) * Math.PI * 2;
            const x = cx + Math.sin(theta) * 100;
            const y = cy + Math.cos(theta) * 100;
            const dots = this.wrapper.querySelectorAll('.map-node-dot');
            const labels = this.wrapper.querySelectorAll('.map-node-label');
            if (dots[index]) {
                dots[index].style.left = x + 'px';
                dots[index].style.top = y + 'px';
            }
            if (labels[index]) {
                labels[index].style.left = x + 'px';
                labels[index].style.top = (y - 32) + 'px';
            }
        });
    }
}