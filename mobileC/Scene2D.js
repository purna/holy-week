import { DIALOGUE_ID_MAP } from "../js/gameplay/dialogueMaps.js";
import { actions } from "../js/config.js";

const TILE_SIZE = 32;
const MAP_SIZE = 64;
const VIEW_WIDTH = 512;
const VIEW_HEIGHT = 512;

const PALETTE = {
    border_brown: '#4a3b2c',
    sand_light:   '#e9c46a',
    sand_dark:    '#dfb24c',
    sand_wave:    '#d4a373',
    clay_wall:    '#cd7f60',
    clay_dark:    '#b06548',
    clay_light:   '#de9678',
    roof_wood:    '#6e463b',
    water_deep:   '#204859',
    water_surf:   '#2e5d72',
    water_shore:  '#688880',
    palm_leaf:    '#3a5a40',
    palm_trunk:   '#a06a42',
    bush_green:   '#588157',
    pattern_brown:'#5c4033',
    sky_blue:     '#00bbf9',
    sprite_white: '#ffffff'
};

const TILE_LEGEND = {
    '.': 0,
    '~': 1,
    '#': 2,
    '=': 3,
    'R': 4,
    'W': 5,
    'B': 6
};

function getStitchNoise(px, py) {
    const value = Math.sin(px * 12.9898 + py * 78.233) * 43758.5453123;
    return value - Math.floor(value);
}

function getTileAt(col, row, levelMap) {
    if (col < 0 || col >= MAP_SIZE || row < 0 || row >= MAP_SIZE) return 2;
    return levelMap[row][col];
}

export class Scene2D {
    constructor(ui) {
        this.ui = ui;
        this.canvas = null;
        this.ctx = null;
        this.levelMap = [];
        this.colliderMap = [];
        this.npcs = [];
        this.particles = [];
        this.MAX_PARTICLES = 40;
        this.running = false;
        this.container = null;
        this.gameKeys = {};
        this._animFrame = null;
        this._lastMoveTime = 0;
        this._moveDelay = 120;
        this.tileCache = [];
    }

    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.container.innerHTML = `
            <div id="game-container">
                <canvas id="gameCanvas" width="512" height="512"></canvas>
                <div id="ui-controls-overlay">
                    <div class="dpad">
                        <div class="btn" id="btn-up">▲</div>
                        <div class="btn" id="btn-down"><img src='../assets/gfx/arrow-down-duotone.svg' class='icon-svg' loading='lazy'></div>
                        <div class="btn" id="btn-left">◀</div>
                        <div class="btn" id="btn-right"><img src='../assets/gfx/play-duotone.svg' class='icon-svg' loading='lazy'></div>
                    </div>
                    <div class="btn-ui">
                        <div id="btn-actions"><img src='../assets/gfx/hand-pointer.svg' class='icon-svg' loading='lazy'></div>
                        <div id="btn-inventory"><img src='../assets/gfx/backpack-duotone.svg' class='icon-svg' loading='lazy'></div>
                        <div id="btn-talk"><img src='../assets/gfx/chat-duotone.svg' class='icon-svg' loading='lazy'></div>
                    </div>
                    <div id="actions-popup" class="actions-popup">
                        <div id="actions-list"></div>
                    </div>
                </div>
            </div>
        `;

        this.canvas = this.container.querySelector('#gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;

        this._bindControls();
        this._setupActionsPanel();
        this._initializeGame();
        this.running = true;
        this._gameLoop();
    }

    _bindControls() {
        const bindBtn = (id, key) => {
            const btn = this.container.querySelector(`#${id}`);
            if (!btn) return;
            const start = (e) => { e.preventDefault(); this.gameKeys[key] = true; };
            const end = (e) => { e.preventDefault(); delete this.gameKeys[key]; };
            btn.addEventListener('pointerdown', start);
            btn.addEventListener('pointerup', end);
            btn.addEventListener('pointercancel', end);
            btn.addEventListener('pointerleave', end);
        };

        bindBtn('btn-up', 'KeyW');
        bindBtn('btn-down', 'KeyS');
        bindBtn('btn-left', 'KeyA');
        bindBtn('btn-right', 'KeyD');

        const actionBtn = this.container.querySelector('#btn-talk');
        if (actionBtn) {
            actionBtn.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                this._handleTalk();
            });
        }

        const inventoryBtn = this.container.querySelector('#btn-inventory');
        if (inventoryBtn) {
            inventoryBtn.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                if (this.ui && typeof this.ui.openInventory === 'function') {
                    this.ui.openInventory();
                }
            });
        }

        this._keyState = {};
        window.addEventListener('keydown', (e) => {
            if (!this._keyState[e.code]) {
                this._keyState[e.code] = true;
                this.gameKeys[e.code] = true;
            }
        });
        window.addEventListener('keyup', (e) => {
            this._keyState[e.code] = false;
            delete this.gameKeys[e.code];
        });
    }

    _setupActionsPanel() {
        const btnActions = this.container.querySelector('#btn-actions');
        const actionsPopup = this.container.querySelector('#actions-popup');
        if (btnActions) {
            btnActions.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                if (!actionsPopup) return;

                if (actionsPopup.classList.contains('open')) {
                    actionsPopup.classList.remove('open');
                    return;
                }

                const parent = btnActions.closest('.btn-ui');
                const containerRect = this.container.getBoundingClientRect();
                if (parent) {
                    const parentRect = parent.getBoundingClientRect();
                    actionsPopup.style.left = (parentRect.left - containerRect.left - 80) + 'px';
                    actionsPopup.style.top = (parentRect.top - containerRect.top) + 'px';
                }
                actionsPopup.classList.add('open');
            });
        }

        const actionsList = this.container.querySelector('#actions-list');
        if (actionsList) {
            actionsList.innerHTML = actions.map(a =>
                `<div class="action-item" data-action-id="${a.id}">${a.icon}</div>`
            ).join('');

            actionsList.querySelectorAll('.action-item').forEach(item => {
                item.addEventListener('pointerdown', (e) => {
                    e.stopPropagation();
                    const action = actions.find(a => a.id === item.dataset.actionId);
                    if (action) {
                        this._showFloatingActionIcon(action.icon);
                    }
                });
            });
        }
    }

    _showFloatingActionIcon(iconText) {
        const icon = document.createElement('div');
        icon.className = 'floating-action-icon';
        icon.textContent = iconText;

        const rect = this.canvas.getBoundingClientRect();
        const startX = rect.left + rect.width * 0.5 + (Math.random() - 0.5) * 60;
        const startY = rect.top + rect.height * 0.7 + (Math.random() - 0.5) * 20;
        icon.style.left = `${startX}px`;
        icon.style.top = `${startY}px`;
        icon.style.transform = 'translate(0, 0) scale(2)';
        icon.style.opacity = '1';

        document.body.appendChild(icon);

        const duration = 3000;
        const travelDistance = 500;
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const scale = 2 - progress;
            const translateY = -travelDistance * progress;
            icon.style.transform = `translate(0, ${translateY}px) scale(${scale})`;

            let opacity;
            if (progress < 0.2) opacity = 1;
            else if (progress < 0.6) opacity = 1 - ((progress - 0.2) / 0.4);
            else opacity = 0;
            icon.style.opacity = opacity;

            if (progress < 1) requestAnimationFrame(animate);
            else icon.remove();
        };

        requestAnimationFrame(animate);
    }

    _initializeGame() {
        // Create a default empty map
        for (let r = 0; r < MAP_SIZE; r++) {
            this.levelMap[r] = [];
            this.colliderMap[r] = [];
            for (let c = 0; c < MAP_SIZE; c++) {
                this.levelMap[r][c] = 0;
                this.colliderMap[r][c] = 0;
            }
        }

        this._preRenderTiles();

        this.player = {
            x: 28,
            y: 35,
            renderX: 28 * TILE_SIZE,
            renderY: 35 * TILE_SIZE,
            facing: 'down',
            isMoving: false
        };

        this.camera = { x: this.player.renderX - VIEW_WIDTH / 2, y: this.player.renderY - VIEW_HEIGHT / 2 };

        for (let i = 0; i < this.MAX_PARTICLES; i++) {
            this.particles.push({
                x: Math.random() * VIEW_WIDTH,
                y: Math.random() * VIEW_HEIGHT,
                speed: 1.5 + Math.random() * 2,
                size: 2 + Math.floor(Math.random() * 2),
                opacity: 0.1 + Math.random() * 0.3
            });
        }
    }

    loadCase(caseId, tilemapData) {
        this.npcs = [];
        const npcDefs = this.ui?.cm?.getActiveCase()?.npcs || [];
        const defaultPositions = [
            { x: 28, y: 33 },
            { x: 42, y: 31 },
            { x: 14, y: 31 }
        ];

        npcDefs.forEach((npc, i) => {
            const pos = defaultPositions[i] || { x: 28 + (i % 3) * 5, y: 33 + Math.floor(i / 3) * 2 };
            this.npcs.push({
                id: npc.id,
                name: npc.name,
                x: pos.x,
                y: pos.y,
                location: npc.location || '',
                animOffset: (Math.PI / 3) * i,
                avatar: npc.avatar || "<img src='../assets/gfx/user-duotone.svg' class='icon-svg' loading='lazy'>"
            });
        });

        if (tilemapData?.background) {
            this.levelMap = tilemapData.background.map(row =>
                row.split('').map(ch => tilemapData.tileLegend?.[ch] ?? TILE_LEGEND[ch] ?? 0)
            );
            if (tilemapData.colliders) {
                this.colliderMap = tilemapData.colliders.map(row =>
                    row.split('').map(ch => (ch && ch !== ' ') ? 1 : 0)
                );
            }

            this._preRenderTiles();
        }
    }

    _preRenderTiles() {
        this.tileCache = [];
        const tileIds = Object.values(TILE_LEGEND);

        for (const id of tileIds) {
            const canvas = document.createElement('canvas');
            canvas.width = TILE_SIZE;
            canvas.height = TILE_SIZE;
            const ctx = canvas.getContext('2d');
            const ts = TILE_SIZE;

            let baseColor = PALETTE.sand_light;
            if (id === 1) baseColor = PALETTE.water_deep;
            if (id === 2) baseColor = PALETTE.palm_trunk;
            if (id === 3) baseColor = PALETTE.sand_wave;
            if (id === 4) baseColor = PALETTE.roof_wood;
            if (id === 5) baseColor = PALETTE.clay_wall;
            if (id === 6) baseColor = PALETTE.bush_green;

            ctx.fillStyle = baseColor;
            ctx.fillRect(0, 0, ts, ts);

            for (let y = 0; y < ts; y += 2) {
                for (let x = 0; x < ts; x += 2) {
                    const seed = getStitchNoise(id * ts + x, y);

                    switch (id) {
                        case 0: // Sand
                            ctx.fillStyle = (seed > 0.88) ? PALETTE.sand_dark : PALETTE.sand_light;
                            ctx.fillRect(x, y, 2, 2);
                            break;

                        case 1: // Water
                            let dynamicWave = Math.sin((x) * 0.08 + (y) * 0.06) * 0.5 + 0.5;
                            if (dynamicWave > 0.40) {
                                if ((x + y) % 4 === 0 || seed > 0.52) {
                                    ctx.fillStyle = PALETTE.water_surf;
                                } else {
                                    ctx.fillStyle = PALETTE.water_deep;
                                }
                            } else {
                                if ((x + y) % 4 === 2 || seed > 0.75) {
                                    ctx.fillStyle = PALETTE.water_surf;
                                } else {
                                    ctx.fillStyle = PALETTE.water_deep;
                                }
                            }
                            ctx.fillRect(x, y, 2, 2);
                            break;

                        case 2: // Palm Trunk / Tree top
                            if ((x - ts / 2) * (x - ts / 2) + (y - ts / 2) * (y - ts / 2) < 180) {
                                ctx.fillStyle = (seed > 0.4) ? PALETTE.palm_leaf : '#2a3f2c';
                                ctx.fillRect(x, y, 2, 2);
                            }
                            break;

                        case 3: // Path
                            if (y % 8 === 0 || (x + (Math.floor(y / 8) % 2) * 8) % 16 === 0) {
                                ctx.fillStyle = PALETTE.roof_wood;
                                ctx.fillRect(x, y, 2, 2);
                            } else if (seed > 0.88) {
                                ctx.fillStyle = PALETTE.clay_light;
                                ctx.fillRect(x, y, 2, 2);
                            }
                            break;

                        case 4: // Roof
                            if (y % 6 === 0) { ctx.fillStyle = '#4a2f27'; ctx.fillRect(x, y, 2, 2); }
                            break;
                        case 5: // Wall
                            if (y % 10 === 0) { ctx.fillStyle = PALETTE.clay_dark; ctx.fillRect(x, y, 2, 2); }
                            else if (seed > 0.7) { ctx.fillStyle = PALETTE.clay_light; ctx.fillRect(x, y, 2, 2); }
                            break;
                        case 6: // Bush
                            if (seed > 0.45) { ctx.fillStyle = '#3a5a40'; ctx.fillRect(x, y, 2, 2); }
                            break;
                    }
                }
            }
            this.tileCache[id] = canvas;
        }
    }

    _getFrontNPC() {
        let lookX = this.player.x;
        let lookY = this.player.y;
        if (this.player.facing === 'up') lookY--;
        if (this.player.facing === 'down') lookY++;
        if (this.player.facing === 'left') lookX--;
        if (this.player.facing === 'right') lookX++;
        return this.npcs.find(n => n.x === lookX && n.y === lookY) || null;
    }

    _isWalkable(gx, gy) {
        if (gx < 0 || gx >= MAP_SIZE || gy < 0 || gy >= MAP_SIZE) return false;
        const backgroundTile = this.levelMap[gy][gx];
        const colliderTile = this.colliderMap[gy]?.[gx] || 0;
        if (colliderTile === 1 || backgroundTile === 1 || backgroundTile === 2 || backgroundTile === 4 || backgroundTile === 5 || backgroundTile === 6) return false;
        if (this.npcs.some(n => n.x === gx && n.y === gy)) return false;
        return true;
    }

    _movePlayer(dx, dy, dir) {
        this.player.facing = dir;
        if (this._isWalkable(this.player.x + dx, this.player.y + dy)) {
            this.player.x += dx;
            this.player.y += dy;
            this.player.isMoving = true;
        }
        this._updateTalkButton();
    }

    _handleTalk() {
        const targetNpc = this._getFrontNPC();
        if (targetNpc && this.ui) {
            this.ui.discoverNPC(targetNpc.id);
            if (typeof this.ui.handleNpcInteraction === "function") {
                this.ui.handleNpcInteraction('talk', targetNpc.id);
            }
        }
    }

    _updateTalkButton() {
        const actionBtn = this.container?.querySelector('#btn-talk');
        if (!actionBtn) return;
        if (this._getFrontNPC()) {
            actionBtn.classList.add('active');
        } else {
            actionBtn.classList.remove('active');
        }
        actionBtn.textContent = "<img src='../assets/gfx/chat-duotone.svg' class='icon-svg' loading='lazy'>";
    }

    // NOTE: previously this method had a corrupted structure where a full,
    // correct switch(id) block was accidentally nested *inside* the
    // `else if (id === 1)` branch of an outer if/else. That meant tiles 2-6
    // (trees, paths, roofs, walls, bushes) never got their per-pixel detail
    // rendering (only a flat fill), and water tiles were rendered through a
    // pointless doubly-nested loop (up to 65,536 iterations per tile per
    // frame instead of 256). There was also a dead `ctx.drawImage(cachedTile...)`
    // call that got immediately painted over by the following fillRect.
    // This version keeps the same visual logic but runs it once, correctly,
    // per tile per frame.
    _renderTile(ctx, id, col, row, time, camX, camY) {
        const ts = TILE_SIZE;
        const tx = col * ts - camX;
        const ty = row * ts - camY;

        let baseColor = PALETTE.sand_light;
        if (id === 1) baseColor = PALETTE.water_deep;
        if (id === 2) baseColor = PALETTE.palm_trunk;
        if (id === 3) baseColor = PALETTE.sand_wave;
        if (id === 4) baseColor = PALETTE.roof_wood;
        if (id === 5) baseColor = PALETTE.clay_wall;
        if (id === 6) baseColor = PALETTE.bush_green;

        ctx.fillStyle = baseColor;
        ctx.fillRect(tx, ty, ts, ts);

        const isOuterEdge = (col === 0 || col === MAP_SIZE - 1 || row === 0 || row === MAP_SIZE - 1);
        const touchesSand = (
            getTileAt(col - 1, row, this.levelMap) === 0 ||
            getTileAt(col + 1, row, this.levelMap) === 0 ||
            getTileAt(col, row - 1, this.levelMap) === 0 ||
            getTileAt(col, row + 1, this.levelMap) === 0
        );

        for (let y = 0; y < ts; y += 2) {
            for (let x = 0; x < ts; x += 2) {
                const seed = getStitchNoise(col * ts + x, row * ts + y);

                switch (id) {
                    case 0: { // Sand, blend toward wet shoreline near water
                        let renderWetShore = false;
                        if (getTileAt(col - 1, row, this.levelMap) === 1 && x < 6) renderWetShore = (seed > (x / 6));
                        if (getTileAt(col + 1, row, this.levelMap) === 1 && x > 26) renderWetShore = (seed > ((ts - x) / 6));
                        if (getTileAt(col, row - 1, this.levelMap) === 1 && y < 6) renderWetShore = (seed > (y / 6));
                        if (getTileAt(col, row + 1, this.levelMap) === 1 && y > 26) renderWetShore = (seed > ((ts - y) / 8));

                        if (renderWetShore) {
                            ctx.fillStyle = PALETTE.water_shore;
                        } else {
                            ctx.fillStyle = (seed > 0.88) ? PALETTE.sand_dark : PALETTE.sand_light;
                        }
                        ctx.fillRect(tx + x, ty + y, 2, 2);
                        break;
                    }

                    case 1: { // Water, animated waves + blend toward sand
                        let renderWaterSand = false;
                        if (getTileAt(col - 1, row, this.levelMap) !== 1 && x < 8) renderWaterSand = (seed > (x / 8));
                        if (getTileAt(col + 1, row, this.levelMap) !== 1 && x > 24) renderWaterSand = (seed > ((ts - x) / 8));
                        if (getTileAt(col, row - 1, this.levelMap) !== 1 && y < 8) renderWaterSand = (seed > (y / 8));
                        if (getTileAt(col, row + 1, this.levelMap) !== 1 && y > 24) renderWaterSand = (seed > ((ts - y) / 8));

                        if (renderWaterSand) {
                            ctx.fillStyle = (seed > 0.4) ? PALETTE.water_shore : PALETTE.sand_light;
                        } else {
                            let dynamicWave = Math.sin((col * ts + x) * 0.08 + (row * ts + y) * 0.06 + (time / 800)) * 0.5 + 0.5;
                            if (dynamicWave > 0.40) {
                                ctx.fillStyle = ((x + y) % 4 === 0 || seed > 0.52) ? PALETTE.water_surf : PALETTE.water_deep;
                            } else {
                                ctx.fillStyle = ((x + y) % 4 === 2 || seed > 0.75) ? PALETTE.water_surf : PALETTE.water_deep;
                            }
                        }
                        ctx.fillRect(tx + x, ty + y, 2, 2);
                        break;
                    }

                    case 2: { // Palm tree / map border
                        let renderBorderBrown = false;
                        if (isOuterEdge) {
                            let distY = Math.min(row * ts + y, (MAP_SIZE * ts) - (row * ts + y));
                            let distX = Math.min(col * ts + x, (MAP_SIZE * ts) - (col * ts + x));
                            renderBorderBrown = (seed > (Math.min(distX, distY) / 18));
                        }
                        if (renderBorderBrown) {
                            ctx.fillStyle = PALETTE.border_brown;
                            ctx.fillRect(tx + x, ty + y, 2, 2);
                        } else if (touchesSand && (y > 24 || x < 8 || x > 24 || y < 8) && seed > 0.6) {
                            ctx.fillStyle = PALETTE.sand_light;
                            ctx.fillRect(tx + x, ty + y, 2, 2);
                        } else if ((x - ts / 2) * (x - ts / 2) + (y - ts / 2) * (y - ts / 2) < 180) {
                            ctx.fillStyle = (seed > 0.4) ? PALETTE.palm_leaf : '#2a3f2c';
                            ctx.fillRect(tx + x, ty + y, 2, 2);
                        }
                        break;
                    }

                    case 3: { // Path, blend toward sand at edges
                        let renderPathSand = false;
                        if (getTileAt(col - 1, row, this.levelMap) === 0 && x < 8) renderPathSand = (seed > (x / 8));
                        if (getTileAt(col + 1, row, this.levelMap) === 0 && x > 22) renderPathSand = (seed > ((ts - x) / 8));
                        if (getTileAt(col, row - 1, this.levelMap) === 0 && y < 8) renderPathSand = (seed > (y / 8));
                        if (getTileAt(col, row + 1, this.levelMap) === 0 && y > 22) renderPathSand = (seed > ((ts - y) / 8));

                        if (renderPathSand) {
                            ctx.fillStyle = (seed > 0.5) ? PALETTE.sand_light : PALETTE.sand_dark;
                            ctx.fillRect(tx + x, ty + y, 2, 2);
                        } else if (y % 8 === 0 || (x + (Math.floor(y / 8) % 2) * 8) % 16 === 0) {
                            ctx.fillStyle = PALETTE.roof_wood;
                            ctx.fillRect(tx + x, ty + y, 2, 2);
                        } else if (seed > 0.88) {
                            ctx.fillStyle = PALETTE.clay_light;
                            ctx.fillRect(tx + x, ty + y, 2, 2);
                        }
                        break;
                    }

                    case 4: // Roof
                        if (y % 6 === 0) {
                            ctx.fillStyle = '#4a2f27';
                            ctx.fillRect(tx + x, ty + y, 2, 2);
                        }
                        break;

                    case 5: // Wall
                        if (y % 10 === 0) {
                            ctx.fillStyle = PALETTE.clay_dark;
                            ctx.fillRect(tx + x, ty + y, 2, 2);
                        } else if (seed > 0.7) {
                            ctx.fillStyle = PALETTE.clay_light;
                            ctx.fillRect(tx + x, ty + y, 2, 2);
                        }
                        break;

                    case 6: // Bush
                        if (seed > 0.45) {
                            ctx.fillStyle = '#3a5a40';
                            ctx.fillRect(tx + x, ty + y, 2, 2);
                        }
                        break;
                }
            }
        }
    }

    _drawCustomPatternSprite(ctx, startX, startY, size, bounce, isPlayer, facing, camX, camY) {
        const q = size / 4;
        const sx = startX - camX;
        const sy = startY - bounce - camY;

        for (let i = 0; i < 4; i++) {
            if (isPlayer) ctx.fillStyle = (i === 1) ? PALETTE.pattern_brown : PALETTE.sky_blue;
            else ctx.fillStyle = (i === 1) ? PALETTE.pattern_brown : PALETTE.sprite_white;
            ctx.fillRect(sx, sy + (i * q), size, q);
        }

        ctx.fillStyle = '#ffffff';
        let eyeY = sy + q + 2;
        let eX1 = sx + 4;
        let eX2 = sx + 14;
        if (facing === 'left')  { eX1 -= 2; eX2 -= 2; }
        if (facing === 'right') { eX1 += 2; eX2 += 2; }
        if (facing === 'up')    eyeY -= 2;

        ctx.fillRect(eX1, eyeY, 4, 4);
        ctx.fillRect(eX2, eyeY, 4, 4);

        ctx.fillStyle = '#000000';
        let pupilX1 = eX1 + 1;
        let pupilX2 = eX2 + 1;
        if (facing === 'right') { pupilX1 += 1; pupilX2 += 1; }
        if (facing === 'left')  { pupilX1 -= 1; pupilX2 -= 1; }
        ctx.fillRect(pupilX1, eyeY + 1, 2, 2);
        ctx.fillRect(pupilX2, eyeY + 1, 2, 2);
    }

    _drawNPCNameTag(ctx, npc, bounce, camX, camY) {
        const nx = npc.x * TILE_SIZE + TILE_SIZE / 2 - camX;
        const ny = npc.y * TILE_SIZE - bounce - camY - 8;

        ctx.font = 'bold 11px monospace';
        const textWidth = ctx.measureText(npc.name).width;
        const padX = 6;
        const padY = 4;

        ctx.fillStyle = 'rgba(26, 20, 16, 0.85)';
        ctx.strokeStyle = '#00f5d4';
        ctx.lineWidth = 1;

        ctx.fillRect(nx - textWidth / 2 - padX, ny - 10 - padY, textWidth + padX * 2, 14 + padY * 2);
        ctx.strokeRect(nx - textWidth / 2 - padX, ny - 10 - padY, textWidth + padX * 2, 14 + padY * 2);

        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(npc.name, nx, ny + 3);
    }

    _drawTrackingMinimap(ctx, time) {
        const mRadius = 48;
        const cx = VIEW_WIDTH - mRadius - 16;
        const cy = mRadius + 16;
        const pSize = (mRadius * 2) / MAP_SIZE;

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, mRadius + 2, 0, Math.PI * 2);
        ctx.fillStyle = '#2c2219';
        ctx.strokeStyle = '#d4a373';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, mRadius, 0, Math.PI * 2);
        ctx.clip();

        ctx.beginPath();
        ctx.arc(cx, cy, mRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#120f0d';
        ctx.fill();

        ctx.strokeStyle = 'rgba(212, 163, 115, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(cx, cy, mRadius * 0.4, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy, mRadius * 0.7, 0, Math.PI * 2); ctx.stroke();

        const startX = cx - mRadius;
        const startY = cy - mRadius;

        for (let r = 0; r < MAP_SIZE; r++) {
            for (let c = 0; c < MAP_SIZE; c++) {
                const id = this.levelMap[r][c];
                if (id === 3) {
                    ctx.fillStyle = 'rgba(233, 196, 106, 0.35)';
                    ctx.fillRect(startX + (c * pSize), startY + (r * pSize), pSize, pSize);
                } else if (id === 1) {
                    ctx.fillStyle = 'rgba(32, 72, 89, 0.6)';
                    ctx.fillRect(startX + (c * pSize), startY + (r * pSize), pSize, pSize);
                } else if (id === 5 || id === 4 || id === 2) {
                    ctx.fillStyle = '#1c1510';
                    ctx.fillRect(startX + (c * pSize), startY + (r * pSize), pSize, pSize);
                }
            }
        }

        this.npcs.forEach(n => {
            ctx.beginPath();
            ctx.arc(startX + (n.x * pSize) + pSize/2, startY + (n.y * pSize) + pSize/2, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ff0055';
            ctx.fill();
        });

        let playerPulse = Math.abs(Math.sin(time / 180)) * 1.5;
        ctx.beginPath();
        ctx.arc(startX + (this.player.x * pSize) + pSize/2, startY + (this.player.y * pSize) + pSize/2, 2.5 + playerPulse, 0, Math.PI * 2);
        ctx.fillStyle = PALETTE.sky_blue;
        ctx.fill();

        let sweepAngle = (time * 0.0025) % (Math.PI * 2);
        let sweepLX = cx + Math.cos(sweepAngle) * mRadius;
        let sweepLY = cy + Math.sin(sweepAngle) * mRadius;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(sweepLX, sweepLY);
        ctx.strokeStyle = 'rgba(0, 245, 212, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
    }

    _gameLoop() {
        if (!this.running) return;

        this._animFrame = requestAnimationFrame(() => this._gameLoop());

        const time = Date.now();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (time - this._lastMoveTime > this._moveDelay) {
            if (this.gameKeys['KeyW'] || this.gameKeys['ArrowUp']) { this._movePlayer(0, -1, 'up'); this._lastMoveTime = time; }
            else if (this.gameKeys['KeyS'] || this.gameKeys['ArrowDown']) { this._movePlayer(0, 1, 'down'); this._lastMoveTime = time; }
            else if (this.gameKeys['KeyA'] || this.gameKeys['ArrowLeft']) { this._movePlayer(-1, 0, 'left'); this._lastMoveTime = time; }
            else if (this.gameKeys['KeyD'] || this.gameKeys['ArrowRight']) { this._movePlayer(1, 0, 'right'); this._lastMoveTime = time; }
        }

        const nearbyNPC = this._getFrontNPC();
        if (nearbyNPC && this.ui) {
            this.ui.discoverNPC(nearbyNPC.id);
        }

        let targetX = this.player.x * TILE_SIZE;
        let targetY = this.player.y * TILE_SIZE;

        this.player.renderX += (targetX - this.player.renderX) * 0.18;
        this.player.renderY += (targetY - this.player.renderY) * 0.18;

        if (Math.abs(targetX - this.player.renderX) < 0.2 && Math.abs(targetY - this.player.renderY) < 0.2) {
            this.player.renderX = targetX;
            this.player.renderY = targetY;
            this.player.isMoving = false;
        }

        let targetCamX = this.player.renderX - VIEW_WIDTH / 2 + TILE_SIZE / 2;
        let targetCamY = this.player.renderY - VIEW_HEIGHT / 2 + TILE_SIZE / 2;

        this.camera.x += (targetCamX - this.camera.x) * 0.1;
        this.camera.y += (targetCamY - this.camera.y) * 0.1;

        this.camera.x = Math.max(0, Math.min(this.camera.x, MAP_SIZE * TILE_SIZE - VIEW_WIDTH));
        this.camera.y = Math.max(0, Math.min(this.camera.y, MAP_SIZE * TILE_SIZE - VIEW_HEIGHT));

        let startCol = Math.floor(this.camera.x / TILE_SIZE);
        let endCol = Math.min(MAP_SIZE - 1, Math.ceil((this.camera.x + VIEW_WIDTH) / TILE_SIZE));
        let startRow = Math.floor(this.camera.y / TILE_SIZE);
        let endRow = Math.min(MAP_SIZE - 1, Math.ceil((this.camera.y + VIEW_HEIGHT) / TILE_SIZE));

        for (let r = startRow; r <= endRow; r++) {
            for (let c = startCol; c <= endCol; c++) {
                this._renderTile(this.ctx, this.levelMap[r][c], c, r, time, this.camera.x, this.camera.y);
            }
        }

        const activeTargetNPC = this._getFrontNPC();

        this.npcs.forEach(n => {
            let bounce = Math.abs(Math.sin((time / 200) + n.animOffset)) * 4;
            let nx = n.x * TILE_SIZE;
            let ny = n.y * TILE_SIZE;

            this.ctx.fillStyle = 'rgba(26, 20, 16, 0.4)';
            this.ctx.fillRect(nx + 4 - this.camera.x, ny + 28 - this.camera.y, TILE_SIZE - 8, 4);
            this._drawCustomPatternSprite(this.ctx, nx + 4, ny + 4, TILE_SIZE - 8, bounce, false, 'down', this.camera.x, this.camera.y);
        });

        let walkBounce = this.player.isMoving ? Math.abs(Math.sin(time * 0.015)) * 5 : 0;
        this._drawCustomPatternSprite(this.ctx, this.player.renderX + 4, this.player.renderY + 4, TILE_SIZE - 8, walkBounce, true, this.player.facing, this.camera.x, this.camera.y);

        if (activeTargetNPC) {
            let bounce = Math.abs(Math.sin((time / 200) + activeTargetNPC.animOffset)) * 4;
            this._drawNPCNameTag(this.ctx, activeTargetNPC, bounce, this.camera.x, this.camera.y);
        }

        this.ctx.fillStyle = '#dfb24c';
        this.particles.forEach(p => {
            p.x -= p.speed;
            p.y += p.speed * 0.5;
            if (p.x < -10) { p.x = VIEW_WIDTH + 10; p.y = Math.random() * VIEW_HEIGHT; }
            if (p.y > VIEW_HEIGHT + 10) { p.y = -10; p.x = Math.random() * VIEW_WIDTH; }
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fillRect(p.x, p.y, p.size * 2, p.size);
        });
        this.ctx.globalAlpha = 1.0;

        this._drawTrackingMinimap(this.ctx, time);
    }

    stop() {
        this.running = false;
        if (this._animFrame) {
            cancelAnimationFrame(this._animFrame);
        }
    }
}