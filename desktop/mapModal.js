// mapModal.js
import * as THREE from 'three';
import { MODELS } from '../js/config.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class OrbitalSelectMatrixModal {
    constructor(caseManager, locationSystem, audio, loadCaseCallback, globeScale = 11) {
        this.cm = caseManager;
        this.ls = locationSystem;
        this.audio = audio;
        this.loadCase = loadCaseCallback;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.core = null;
        this.overlay = document.getElementById('modal-overlay');
        this.wrapper = document.getElementById('menu-modal-canvas-wrap');
        this.theta = 0;
        this.phi = Math.PI / 3;
        this.dragging = false;
        this.prev = { x: 0, y: 0 };
        this.treeEl = null;
        this.activeAct = null;
        this.actSelected = false;
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
        this.scene.fog = new THREE.FogExp2(0x05070b, 0.003);

        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.wrapper.appendChild(this.renderer.domElement);

        const sun = new THREE.DirectionalLight(0xffffff, 1.2);
        sun.position.set(5, 3, 5);
        this.scene.add(sun);
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        this.scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.8));

        // Initialize core group (this will hold the earth and markers)
        this.core = new THREE.Group();
        this.scene.add(this.core);

        // Load Earth Model
        const loader = new GLTFLoader();
        loader.load(MODELS.planet, (gltf) => {
            const model = gltf.scene;

            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = this.globeScale / maxDim;

            model.traverse((node) => {
                if (node.isMesh) {
                    node.position.sub(center);
                }
            });
            model.scale.setScalar(scale);
            model.position.set(0, 0, 0);

            model.traverse((node) => {
                if (node.isMesh && node.material) {
                    const materials = Array.isArray(node.material) ? node.material : [node.material];
                    materials.forEach(mat => {
                        mat.roughness = 1.0;
                        mat.metalness = 0.0;
                    });
                }
            });

            const cityLayer = model.getObjectByName('cities');
            if (cityLayer) {
                cityLayer.visible = true;
            }

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
            const act = c.actLabel || 'Act I - The Triumphal Entry';
            if (!this.actGroups[act]) this.actGroups[act] = [];
            this.actGroups[act].push(c);
        });

        this.renderActTree();
    }

    _renderMarkerForCase(c, index, total) {
        const p = (index / total) * Math.PI * 2;
        const t = (index % 2 === 0 ? 0.3 : -0.3) + Math.PI / 2;

        const marker = new THREE.Mesh(
            new THREE.SphereGeometry(0.6, 24, 24),
            new THREE.MeshStandardMaterial({
                color: c.color || 0x00ffaa,
                emissive: c.color,
                emissiveIntensity: 2.5,
                roughness: 0.3,
                metalness: 0.1
            })
        );
        marker.position.setFromSphericalCoords(7.2, t, p);
        marker.userData.caseId = c.id;

        this.core.add(marker);
        this.markers.push(marker);

        const dot = document.createElement('div');
        dot.className = 'map-node-dot pulse';
        const progress = this.cm.getCaseProgress(c.id);
        const solved = progress?.solved;
        const locked = c.isLocked || (c.requires && !this.cm.getCaseProgress(c.requires)?.solved);
        
        if (solved) {
            dot.classList.add('completed');
        }
        if (locked) {
            dot.classList.add('locked');
            dot.classList.remove('pulse');
            dot.innerHTML = '<i class="fa-solid fa-lock"></i>';
        }
        
        if (!locked && !solved) {
            dot.style.backgroundColor = c.color ? `#${c.color.toString(16).padStart(6, '0')}` : '#00ffaa';
            dot.style.boxShadow = `0 0 6px #${c.color.toString(16).padStart(6, '0') || '00ffaa'}, 0 0 12px rgba(0, 255, 170, 0.15)`;
        }

        const label = document.createElement('div');
        label.className = 'map-node-label';
        label.style.left = '0';
        label.style.top = '0';

        const loc = this.ls ? this.ls.getLocation(c.location) : null;
        const locName = loc ? loc.name.replace(/<[^>]*>/g, '').trim() : (c.location || 'Unknown');

        label.innerHTML = `
            <div class="map-node-loc">${locName}</div>
            <div class="map-node-title">${c.title}</div>
        `;

        this.wrapper.appendChild(dot);
        this.wrapper.appendChild(label);
        this.labels.push({ dot, label, marker });

        const select = () => {
            this.updateSidebarDetails(c);
            this.showInfoPanel();
        };

        dot.onclick = (e) => {
            e.stopPropagation();
            if (!locked) select();
        };
        marker.callback = select;
    }

    renderActTree() {
        // Reuse the real #lsm-tree placeholder that already lives inside
        // .modal-body-flush (next to the map). Previously this created a
        // *second* element with the same id and appended it to .modal-panel
        // directly, which put the populated menu outside the 2-column row
        // entirely (stacked below the map instead of beside it).
        const tree = document.getElementById('lsm-tree');
        if (!tree) return;
        tree.innerHTML = '';
        this.treeEl = tree;

        const hdr = document.createElement('div');
        hdr.id = 'act-tree-title';
        hdr.className = 'lsm-tree-header';
        hdr.textContent = 'INVESTIGATION ACTS';
        this.treeEl.appendChild(hdr);

        Object.entries(this.actGroups).forEach(([actLabel, cases]) => {
            const sanitized = actLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            const actContainer = document.createElement('div');
            actContainer.id = `act-group-${sanitized}`;
            actContainer.className = 'act-container';

            const actHeader = document.createElement('div');
            actHeader.id = `act-header-${sanitized}`;
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
            caseList.id = `act-cases-${sanitized}`;
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
                dot.id = `tree-dot-${c.id}`;
                dot.className = `tree-dot ${locked ? 'locked' : solved ? 'solved' : 'available'}`;

                if (locked) {
                    dot.innerHTML = '<i class="fa-solid fa-lock" style="font-size: 5px; display: block;"></i>';
                    dot.style.display = 'flex';
                    dot.style.alignItems = 'center';
                    dot.style.justifyContent = 'center';
                }

                const info = document.createElement('div');
                info.className = 'tree-info';

                const title = document.createElement('div');
                title.id = `tree-title-${c.id}`;
                title.className = 'tree-title';
                if (locked) {
                    const lock = document.createElement('i');
                    lock.className = 'fa-solid fa-lock';
                    lock.style.marginRight = '6px';
                    lock.style.color = '#e2b13c';
                    title.appendChild(lock);
                }
                const titleText = document.createElement('span');
                titleText.textContent = c.title;
                title.appendChild(titleText);

                info.appendChild(title);
                item.appendChild(dot);
                item.appendChild(info);

                if (!locked) {
                    item.onclick = () => {
                        this.treeEl.querySelectorAll('.tree-item.active-phase').forEach(el => el.classList.remove('active-phase'));
                        item.classList.add('active-phase');
                        this.updateSidebarDetails(c);
                        this.showInfoPanel();
                    };
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
                    // We no longer call showActCasesOnGlobe(act) here so nodes don't disappear
                }

                this.actSelected = true;
                const closeBtn = document.getElementById('btn-close-map');
                if (closeBtn) {
                    closeBtn.style.opacity = '1';
                    closeBtn.style.pointerEvents = 'auto';
                    closeBtn.title = '';
                }
            };
        });
    }

    showInfoPanel() {
        const panel = document.getElementById('map-node-info-panel');
        if (panel) panel.classList.add('active');
    }

    hideInfoPanel() {
        const panel = document.getElementById('map-node-info-panel');
        if (panel) panel.classList.remove('active');
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

    showAllCasesOnGlobe() {
        this.hideAllMarkers();
        const allCases = this.cm.getAllCases();
        allCases.forEach((c, index) => {
            const locked = c.isLocked || (c.requires && !this.cm.getCaseProgress(c.requires)?.solved);
            if (!locked) {
                this._renderMarkerForCase(c, index, allCases.length);
            }
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

    updateSidebarDetails(c) {
        const title = document.getElementById('map-node-title');
        const emoji = document.getElementById('map-node-emoji');
        const desc = document.getElementById('map-node-description');
        const loc = document.getElementById('map-node-location');
        const actDesc = document.getElementById('map-act-description');
        const actionContainer = document.getElementById('map-node-action-container');
        const loadBtn = document.getElementById('btn-load-node-scene');

        if (title) title.textContent = c.title;
        if (emoji) emoji.innerHTML = `<img src='${c.icon}' class='icon-svg' loading='lazy' />`;

        if (desc) desc.textContent = c.description || 'No detailed intel available for this sector.';
        
        const locationData = this.ls ? this.ls.getLocation(c.location) : null;
        const locationName = locationData ? locationData.name.replace(/<[^>]*>/g, '').trim() : (c.location || 'Unknown Coordinates');
        if (loc) loc.textContent = locationName;
        
        if (actDesc) actDesc.textContent = `ACT_OBJECTIVE: ${c.actLabel || 'Phase I'} - investigation parameters synchronized.`;

        if (actionContainer && loadBtn) {
            const locked = c.isLocked || (c.requires && !this.cm.getCaseProgress(c.requires)?.solved);
            if (!locked) {
                actionContainer.style.display = 'block';
                loadBtn.onclick = () => {
                    if (this.audio) this.audio.playUI();
                    this.selectCase(c.id);
                };
            } else {
                actionContainer.style.display = 'none';
            }
        }
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
        this.actSelected = true;
        const closeBtn = document.getElementById('btn-close-map');
        if (closeBtn) {
            closeBtn.style.opacity = '1';
            closeBtn.style.pointerEvents = 'auto';
            closeBtn.title = '';
        }
        this.close();
        this.loadCase(caseId);
    }

    bind() {
        const closeInfoBtn = document.getElementById('btn-close-map-info');
        if (closeInfoBtn) {
            closeInfoBtn.onclick = (e) => {
                e.stopPropagation();
                this.hideInfoPanel();
            };
        }

        const closeBtn = document.getElementById('btn-close-map');
        const originalClose = () => this.close();
        closeBtn.onclick = (e) => {
            if (!this.actSelected) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            originalClose();
        };

        let moveThreshold = 5;
        let startPos = { x: 0, y: 0 };

        this.wrapper.addEventListener('mousedown', (e) => {
            this.dragging = true;
            this.prev = { x: e.clientX, y: e.clientY };
            startPos = { x: e.clientX, y: e.clientY };
        });

        this.wrapper.addEventListener('mousemove', (e) => {
            if (!this.dragging) return;
            const dx = e.clientX - this.prev.x;
            const dy = e.clientY - this.prev.y;
            this.theta -= dx * 0.006;
            this.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.phi - dy * 0.006));
            this.prev = { x: e.clientX, y: e.clientY };
        });

        this.wrapper.addEventListener('mouseup', (e) => {
            this.dragging = false;

            const dist = Math.sqrt(Math.pow(e.clientX - startPos.x, 2) + Math.pow(e.clientY - startPos.y, 2));
            if (dist < moveThreshold) {
                this._handleRaycast(e);
            }
        });

        this.wrapper.addEventListener('mouseleave', () => this.dragging = false);
    }

    _handleRaycast(e) {
        const rect = this.wrapper.getBoundingClientRect();
        const mouse = new THREE.Vector2(
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            -((e.clientY - rect.top) / rect.height) * 2 + 1
        );

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObjects(this.markers);

        if (intersects.length > 0) {
            const m = intersects[0].object;
            if (m.callback) m.callback();
            if (this.audio) this.audio.playUI();
        }
    }

    open() {
        this.overlay.classList.add('active');
        this.actSelected = false;
        this.hideInfoPanel();

        const closeBtn = document.getElementById('btn-close-map');
        if (closeBtn) {
            closeBtn.style.opacity = '0.3';
            closeBtn.style.pointerEvents = 'none';
            closeBtn.title = 'Select an act first';
        }

        const loadBtn = document.getElementById('btn-load-node-scene');
        if (loadBtn) {
            loadBtn.onclick = () => {
                const cases = this.cm.getAllCases();
                const first = cases.find(c => !(c.isLocked || (c.requires && !this.cm.getCaseProgress(c.requires)?.solved)));
                if (first) {
                    if (this.audio) this.audio.playUI();
                    this.selectCase(first.id);
                }
            };
        }

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

        this.hideAllMarkers(); // Start with a clean globe
        this.showAllCasesOnGlobe(); // Automatically show cases on open
        this.updateResolvedArchives();
        this.loop();

        // Default to first available case in Act 1
        this._selectDefaultActCase();
    }

    _selectDefaultActCase() {
        const actLabels = Object.keys(this.actGroups);
        if (actLabels.length === 0) return;

        // Find Act I or fallback to first act
        let defaultAct = actLabels.find(label => label.toLowerCase().startsWith('act i'));
        if (!defaultAct) defaultAct = actLabels[0];

        const cases = this.actGroups[defaultAct];
        const firstUnlocked = cases.find(c => !(c.isLocked || (c.requires && !this.cm.getCaseProgress(c.requires)?.solved)));
        if (!firstUnlocked) return;

        // Expand the act in the tree
        this.activeAct = defaultAct;
        const actHeader = this.treeEl.querySelector(`.act-tree-header[data-act="${defaultAct}"]`);
        const caseList = actHeader?.nextElementSibling;
        const chevron = actHeader?.querySelector('.act-tree-chevron');
        if (caseList) caseList.style.display = 'block';
        if (chevron) chevron.textContent = '▼';

        // Update sidebar with the default case
        this.updateSidebarDetails(firstUnlocked);
        
        // Highlight the case in the tree
        const caseItem = this.treeEl.querySelector(`.tree-item[data-case="${firstUnlocked.id}"]`);
        if (caseItem) {
            caseItem.classList.add('active-phase');
        }

        // Enable close button since a case is now selected
        this.actSelected = true;
        const closeBtn = document.getElementById('btn-close-map');
        if (closeBtn) {
            closeBtn.style.opacity = '1';
            closeBtn.style.pointerEvents = 'auto';
            closeBtn.title = '';
        }
    }

    close() {
        this.overlay.classList.remove('active');
        this.hideInfoPanel();
        this.hideAllMarkers();
        cancelAnimationFrame(this.raf);
        this.activeAct = null;
        this.actSelected = false;
    }

    loop() {
        this.raf = requestAnimationFrame(() => this.loop());
        this.camera.position.setFromSphericalCoords(21, this.phi, this.theta);
        this.camera.lookAt(0, 0, 0);

        // Significantly slowed rotation for cinematic effect
        if (!this.dragging && this.core) this.core.rotation.y += 0.0005;

        this.renderer.render(this.scene, this.camera);

        const w = this.wrapper.clientWidth;
        const h = this.wrapper.clientHeight;

        this.labels.forEach((item) => {
            // Get world position of the marker
            const worldPos = new THREE.Vector3();
            item.marker.getWorldPosition(worldPos);

            // Project world position to screen space
            const vector = worldPos.clone().project(this.camera);

            // Determine occlusion: Node is occluded by the globe when it faces away from the camera
            // Since globe is at origin, worldPos is the normal from center to node.
            const isBehind = worldPos.dot(this.camera.position) < 0;

            const x = (vector.x * 0.5 + 0.5) * w;
            const y = (vector.y * -0.5 + 0.5) * h; // Invert Y for screen coordinates

            // Use left/top for base position so CSS transform is free for animations/hover
            item.dot.style.left = `${x}px`;
            item.dot.style.top = `${y}px`;

            item.label.style.left = `${x}px`;
            item.label.style.top = `${y - 25}px`;

            item.dot.style.opacity = isBehind ? '0' : '1';
            item.label.style.opacity = isBehind ? '0' : '1';
            item.dot.style.pointerEvents = isBehind ? 'none' : 'auto';
        });
    }
}