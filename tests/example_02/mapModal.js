// mapModal.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/loaders/GLTFLoader';

export class OrbitalSelectMatrixModal {
    constructor(caseManager, locationSystem, loadCaseCallback, globeScale = 11) {
        this.cm = caseManager;
        this.ls = locationSystem;
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
        this.globeScale = globeScale;

        this.init();
        this.bind();
    }

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x05070b);

        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.wrapper.appendChild(this.renderer.domElement);

        const sun = new THREE.DirectionalLight(0xffffff, 1.2);
        sun.position.set(5, 3, 5);
        this.scene.add(sun);
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.4));

        // Add a secondary teal fill light to give the satellite view a high-tech "rim" glow
        this.rimLight = new THREE.PointLight(0x00ffaa, 0.8, 100);
        this.rimLight.position.set(-10, 5, -10);
        this.scene.add(this.rimLight);

        // Initialize core group (this will hold the earth and markers)
        this.core = new THREE.Group();
        this.scene.add(this.core);

        // Load Earth Model
        const loader = new GLTFLoader();
        loader.load('models/earth.glb', (gltf) => {
            const model = gltf.scene;

            // Auto-scale normalization to ensure earth is solid and visible
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = this.globeScale / maxDim; 
            model.scale.set(scale, scale, scale);

            // Apply Toon Shader adjustment to reduce reflections
            model.traverse((node) => {
                if (node.isMesh) {
                    const oldMat = node.material;
                    node.material = new THREE.MeshToonMaterial({
                        color: oldMat.color,
                        map: oldMat.map,
                        gradientMap: null // Can be set for stepped shading
                    });
                }
            });
            
            this.core.add(model);
        }, undefined, (error) => {
            console.error("Error loading earth.glb, falling back to wireframe.", error);
            const fallback = new THREE.Mesh(
                new THREE.SphereGeometry(6.5, 32, 32),
                new THREE.MeshStandardMaterial({ color: 0x00a884, wireframe: true, transparent: true, opacity: 0.2 })
            );
            this.core.add(fallback);
        });

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
        tree.className = 'lsm-tree';
        const panel = this.overlay.querySelector('.modal-panel');
        if (panel) {
            panel.appendChild(tree);
        } else {
            this.overlay.appendChild(tree);
        }
        this.treeEl = tree;

        const hdr = document.createElement('div');
        hdr.className = 'lsm-tree-header';
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
            caseList.style.display = 'none';

            cases.forEach((c, i) => {
                const progress = this.cm.getCaseProgress(c.id);
                const solved = progress?.solved;
                const locked = c.isLocked || c.requires && !this.cm.getCaseProgress(c.requires)?.solved;

                const item = document.createElement('div');
                item.className = 'tree-item';
                item.dataset.case = c.id;
                if (locked) {
                    item.classList.add('locked');
                } else {
                    item.classList.add('available');
                }

                const dot = document.createElement('div');
                dot.className = `tree-dot ${locked ? 'locked' : solved ? 'solved' : 'available'}`;

                const info = document.createElement('div');
                info.className = 'tree-info';

                const title = document.createElement('div');
                title.className = 'tree-title';
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
        const allCases = this.cm.getAllCases();
        allCases.forEach((c, index) => {
            this._renderMarkerForCase(c, index, allCases.length);
        });
    }

    showActCasesOnGlobe(actLabel) {
        this.hideAllMarkers();
        const actCases = this.actGroups[actLabel] || [];
        actCases.forEach((c, index) => {
            const locked = c.isLocked || (c.requires && !this.cm.getCaseProgress(c.requires)?.solved);
            if (!locked) {
                this._renderMarkerForCase(c, index, actCases.length);
            }
        });
    }

    _renderMarkerForCase(c, index, total) {
        // Distribute markers somewhat realistically around the sphere
        const p = (index / total) * Math.PI * 2;
        const t = (index % 2 === 0 ? 0.3 : -0.3) + Math.PI / 2;

        const marker = new THREE.Mesh(
            new THREE.SphereGeometry(0.45, 16, 16),
            new THREE.MeshStandardMaterial({
                color: c.color || 0x00ffaa,
                emissive: c.color,
                emissiveIntensity: 2.0
            })
        );
        marker.position.setFromSphericalCoords(7.2, t, p);
        
        this.core.add(marker);
        this.markers.push(marker);

        const dot = document.createElement('div');
        dot.className = 'map-node-dot';
        dot.style.backgroundColor = c.color ? `#${c.color.toString(16).padStart(6, '0')}` : '#60a5fa';

        const label = document.createElement('div');
        label.className = 'map-node-label';

        // Lookup location metadata from the system
        const loc = this.ls ? this.ls.getLocation(c.location) : null;
        const locDisplay = loc ? loc.name.replace(/^[^a-zA-Z0-9]*/, '') : (c.location || 'Unknown');

        label.innerHTML = `
            <div class="map-node-loc">${locDisplay}</div>
            <div class="map-node-title">${c.title}</div>
        `;

        this.wrapper.appendChild(dot);
        this.wrapper.appendChild(label);
        this.labels.push({ dot, label, marker });

        const select = () => {
            this.updateSidebarDetails(c);
        };

        dot.onclick = select;
        marker.callback = select; // Optional: for raycasting if added later
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

    updateSidebarDetails(c) {
        const title = document.getElementById('map-node-title');
        const emoji = document.getElementById('map-node-emoji');
        const desc = document.getElementById('map-node-description');
        const loc = document.getElementById('map-node-location');
        const actDesc = document.getElementById('map-act-description');

        if (title) title.textContent = c.title;
        if (emoji) emoji.textContent = c.emoji || '📍';
        if (desc) desc.textContent = c.description || 'No detailed intel available for this sector.';
        if (loc) loc.textContent = c.location || 'Unknown Coordinates';
        if (actDesc) actDesc.textContent = `ACT_OBJECTIVE: ${c.actLabel || 'Phase I'} - investigation parameters synchronized.`;
    }

    updateResolvedArchives() {
        const list = document.getElementById('completed-cases-list');
        if (!list) return;
        
        const solved = this.cm.getAllCases().filter(c => this.cm.getCaseProgress(c.id)?.solved);
        if (solved.length === 0) {
            list.innerHTML = `<span style="opacity: 0.4; font-style: italic;">NO_RESOLVED_DATA</span>`;
            return;
        }
        list.innerHTML = solved.map(c => `<div><i class="fa-solid fa-circle-check"></i> ${c.title}</div>`).join('');
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
        
        // Small delay to ensure the DOM has rendered the modal dimensions
        setTimeout(() => {
            const width = this.wrapper.clientWidth;
            const height = this.wrapper.clientHeight;
            if (width > 0 && height > 0) {
                this.renderer.setSize(width, height);
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
            }
        }, 50);

        const panel = this.overlay.querySelector('.modal-panel');
        if (this.treeEl && panel) {
            panel.appendChild(this.treeEl);
        }
        
        this.hideAllMarkers(); // Start with a clean globe
        this.updateResolvedArchives();
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
        
        // Significantly slowed rotation for cinematic effect
        if (!this.dragging && this.core) this.core.rotation.y += 0.0005;
        
        this.renderer.render(this.scene, this.camera);

        const w = this.wrapper.offsetWidth;
        const h = this.wrapper.offsetHeight;

        this.labels.forEach((item) => {
            // Create a vector from the marker's local position to world position
            const vector = new THREE.Vector3();
            item.marker.getWorldPosition(vector);
            
            // Project to 2D
            vector.project(this.camera);

            const x = (vector.x * 0.5 + 0.5) * w;
            const y = (vector.y * -0.5 + 0.5) * h;

            item.dot.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
            item.label.style.transform = `translate(-50%, -100%) translate(${x}px, ${y - 20}px)`;
            
            // Hide if behind the globe
            const isBehind = vector.z > 1;
            item.dot.style.opacity = isBehind ? '0' : '1';
            item.label.style.opacity = isBehind ? '0' : '1';
        });
    }
}