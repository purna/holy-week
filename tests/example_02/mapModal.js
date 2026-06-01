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
        this.activeAct = null;
        this.actGroups = {};
        this.markers = [];
        this.labels = [];

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

        // Group cases by act
        this.cm.getAllCases().forEach(c => {
            const act = c.actLabel || 'Act I';
            if (!this.actGroups[act]) this.actGroups[act] = [];
            this.actGroups[act].push(c);
        });

        this.renderActTree();
    }

    renderActTree() {
        // Clear existing tree
        if (this.treeEl) this.treeEl.remove();

        const tree = document.createElement('div');
        tree.id = 'lsm-tree';
        tree.style.cssText = 'position:absolute;top:65px;left:0;bottom:0;width:240px;background:rgba(0,0,0,.4);border-right:1px solid rgba(100,255,218,.08);overflow-y:auto;padding:16px 0;z-index:10;';
        this.overlay.appendChild(tree);
        this.treeEl = tree;

        const hdr = document.createElement('div');
        hdr.style.cssText = 'padding:16px 16px 8px;color:#64ffda;font-size:.58rem;letter-spacing:3px;';
        hdr.textContent = 'INVESTIGATION ACTS';
        this.treeEl.appendChild(hdr);

        Object.entries(this.actGroups).forEach(([actLabel, cases]) => {
            const actContainer = document.createElement('div');
            actContainer.className = 'act-container';

            const actHeader = document.createElement('div');
            actHeader.className = 'act-tree-header';
            actHeader.dataset.act = actLabel;

            const actIcon = document.createElement('span');
            actIcon.className = 'act-tree-icon';

            const actName = document.createElement('span');
            actName.className = 'act-tree-name';
            actName.textContent = actLabel;

            const actChevron = document.createElement('span');
            actChevron.className = 'act-tree-chevron';
            actChevron.textContent = '▶';

            actHeader.appendChild(actIcon);
            actHeader.appendChild(actName);
            actHeader.appendChild(actChevron);
            actContainer.appendChild(actHeader);

            // Cases list (hidden initially)
            const caseList = document.createElement('div');
            caseList.className = 'act-cases-list';
            caseList.style.cssText = 'display:none;';

            cases.forEach((c, i) => {
                const progress = this.cm.getCaseProgress(c.id);
                const solved = progress?.solved;
                const locked = c.isLocked || c.requires && !this.cm.getCaseProgress(c.requires)?.solved;

                const item = document.createElement('div');
                item.className = 'tree-item';
                item.dataset.case = c.id;
                item.style.opacity = locked ? '0.35' : '1';
                item.style.cursor = locked ? 'not-allowed' : 'pointer';

                const dot = document.createElement('div');
                dot.className = `tree-dot ${locked ? 'locked' : solved ? 'solved' : 'available'}`;

                const info = document.createElement('div');
                info.className = 'tree-info';

                const title = document.createElement('div');
                title.className = 'tree-title';
                title.style.cssText = 'color:#e6f1ff;';
                title.textContent = c.title;

                info.appendChild(title);
                item.appendChild(dot);
                item.appendChild(info);

                if (!locked) {
                    item.onclick = () => this.selectCase(c.id);
                }
                caseList.appendChild(item);
            });

            actContainer.appendChild(caseList);
            this.treeEl.appendChild(actContainer);
        });

        // Bind act header clicks
        this.treeEl.querySelectorAll('.act-tree-header').forEach(header => {
            header.onclick = (e) => {
                const act = header.dataset.act;
                const list = header.nextElementSibling;
                const chevron = header.querySelector('.act-tree-chevron');

                if (this.activeAct === act) {
                    this.activeAct = null;
                    list.style.display = 'none';
                    chevron.textContent = '▶';
                } else {
                    this.activeAct = act;
                    list.style.display = 'block';
                    chevron.textContent = '▼';
                    this.showActCasesOnGlobe(act);
                }
            };
        });
    }

    showAllCasesOnGlobe() {
        this.hideAllMarkers();
        this.cm.getAllCases().forEach((c, index) => {
            const total = this.cm.getAllCases().length;
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
            this.markers.push(marker);

            const dot = document.createElement('div');
            dot.className = 'map-node-dot';
            dot.style.backgroundColor = c.color ? `#${c.color.toString(16).padStart(6, '0')}` : '#60a5fa';

            const label = document.createElement('div');
            label.className = 'map-node-label';
            label.innerText = c.title;

            this.wrapper.appendChild(dot);
            this.wrapper.appendChild(label);
            this.labels.push({ dot, label });

            dot.onclick = () => {
                this.close();
                this.loadCase(c.id);
            };
        });
    }

    showActCasesOnGlobe(actLabel) {
        this.hideAllMarkers();
        const actCases = this.actGroups[actLabel] || [];
        actCases.forEach((c, index) => {
            const total = actCases.length;
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
            this.markers.push(marker);

            const dot = document.createElement('div');
            dot.className = 'map-node-dot';
            dot.style.backgroundColor = c.color ? `#${c.color.toString(16).padStart(6, '0')}` : '#60a5fa';

            const label = document.createElement('div');
            label.className = 'map-node-label';
            label.innerText = c.title;

            this.wrapper.appendChild(dot);
            this.wrapper.appendChild(label);
            this.labels.push({ dot, label });

            dot.onclick = () => {
                this.close();
                this.loadCase(c.id);
            };
        });
    }

    hideAllMarkers() {
        this.markers.forEach(m => this.core.remove(m));
        this.labels.forEach(l => {
            if (l.dot.parentNode) l.dot.remove();
            if (l.label.parentNode) l.label.remove();
        });
        this.markers = [];
        this.labels = [];
    }

    selectCase(caseId) {
        this.close();
        this.loadCase(caseId);
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

    open() {
        this.overlay.classList.add('active');
        // Position tree inside overlay
        if (this.treeEl && !this.treeEl.parentElement) {
            this.overlay.appendChild(this.treeEl);
        }
        this.showAllCasesOnGlobe();
        this.loop();
    }

    close() {
        this.overlay.classList.remove('active');
        this.hideAllMarkers();
        cancelAnimationFrame(this.raf);
        this.activeAct = null;
    }

    loop() {
        this.raf = requestAnimationFrame(() => this.loop());
        this.camera.position.setFromSphericalCoords(24, this.phi, this.theta);
        this.camera.lookAt(0, 0, 0);
        if (!this.dragging && this.core) this.core.rotation.y += 0.003;
        this.renderer.render(this.scene, this.camera);

        const total = this.activeAct
            ? this.actGroups[this.activeAct]?.length || 1
            : this.cm.getAllCases().length || 1;
        const w = this.wrapper.offsetWidth;
        const h = this.wrapper.offsetHeight;
        const cx = w / 2;
        const cy = h / 2;

        this.labels.forEach((item, i) => {
            const angle = (i / total) * Math.PI * 2;
            const x = cx + Math.sin(angle) * 100;
            const y = cy + Math.cos(angle) * 100;
            item.dot.style.left = x + 'px';
            item.dot.style.top = y + 'px';
            item.label.style.left = x + 'px';
            item.label.style.top = (y - 32) + 'px';
        });
    }
}