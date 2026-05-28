/* ==========================================================================
   1. VARIABLES & CORE CONFIGURATION
   ========================================================================== */

:root {
    /* Theme Backgrounds */
    --bg-main: #020c1b;
    --panel-bg: rgba(10, 25, 47, 0.92);

    /* Accents & Status Colors */
    --accent-primary: #64ffda;
    --accent-secondary: #ffcc44;
    --accent-success: #00ff88;
    --accent-error: #ff4444;
    --accent-blue: #00bfff;
    --accent: #3b82f6;
    --gold: #ffb74d;
    --red: #ff6b6b;
    --dim: #8696a0;

    /* Text & Typography */
    --text-main: #e6f1ff;
    --text-muted: #8892b0;
    --font-stack: "Fira Code", "Courier New", Courier, Consolas, Monaco, monospace;

    /* Chat Bubbles */
    --bubble-out: rgba(100, 255, 218, 0.12);
    --bubble-in: rgba(255, 255, 255, 0.05);
}

/* Base Resets */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body,
html {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--bg-main);
    font-family: var(--font-stack);
    color: var(--text-main);
    user-select: none;
}

/* Typography Overrides */
h1,
h2,
h3 {
    font-family: 'Cinzel', serif;
}


/* ==========================================================================
   2. GLOBAL INTERFACE COMPONENTS & UTILITIES
   ========================================================================== */

/* Fullscreen Background Canvas */
#canvas-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

/* Global Loading Spinner */
.spinner {
    display: inline-block;
    width: 45px;
    height: 45px;
    border: 4px solid rgba(100, 255, 218, 0.1);
    border-left-color: var(--accent-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 20px auto;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Screen Alerts */
#screen-alert {
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    background: var(--panel-bg);
    border: 1px solid rgba(100, 255, 218, 0.2);
    border-left: 4px solid var(--accent-secondary);
    padding: 12px 24px;
    border-radius: 2px;
    display: none;
    font-size: 0.9rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    font-weight: 600;
    color: #fff;
}

/* Fullscreen Overlay Screens (Loading / Ending) */
.loading-screen,
.end-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    background: var(--bg-main);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: opacity 0.4s ease;
}

.loading-inner,
.end-inner {
    text-align: center;
    max-width: 500px;
    padding: 20px;
}

.end-btn-row {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 30px;
}


/* ==========================================================================
   3. STANDARD BUTTON VARIATIONS
   ========================================================================== */

.btn-primary {
    background: var(--gold);
    margin: 3em;
    padding: 6px 16px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 1rem;
    font-family: inherit;
    color: #000;
    letter-spacing: 2px;
    transition: opacity .2s;
}

.btn-primary:hover {
    opacity: .85;
}

.btn-replay {
    background: var(--accent);
    color: #000;
}

.terminal-btn {
    padding: 6px 14px;
    cursor: pointer;
    align-items: center;
    transition: all 0.2s ease;
    background: var(--accent-primary);
    color: var(--bg-main);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 1px solid var(--text-muted);
}

.terminal-btn:hover:not(:disabled) {
    background: #84ffea;
    transform: translateY(-2px);
}

.terminal-btn:disabled {
    color: var(--text-muted);
    border-color: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
}


/* ==========================================================================
   4. SCENE TRANSITION EFFECTS
   ========================================================================== */

#wipe-overlay {
    position: fixed;
    inset: 0;
    background: var(--bg);
    z-index: 9000;
    pointer-events: none;
    transform: translateX(-100%);
}

#wipe-overlay.active {
    animation: wipeIn 1s ease-in-out forwards;
}

@keyframes wipeIn {
    0% {
        transform: translateX(-100%);
    }

    50% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(100%);
    }
}


/* ==========================================================================
   5. HEADS-UP DISPLAY (HUD) GRID & LAYOUT
   ========================================================================== */

.hud-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    pointer-events: none;
    display: grid;
    grid-template-columns: 320px 1fr 340px;
    grid-template-rows: 65px 1fr 140px;
    padding: 20px;
    gap: 20px;
}

/* Re-enable pointer events for HUD UI components */
.hud-layer * {
    pointer-events: auto;
}

.hud-panel {
    background: var(--panel-bg);
    border: 1px solid rgba(100, 255, 218, 0.15);
    border-radius: 4px;
    padding: 15px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* Top Navigation / Status Bar */
#top-bar {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top: 3px solid var(--accent-primary);
}

.loc-tag {
    font-size: 1.1rem;
    color: #fff;
    font-weight: 700;
}

.act-tag {
    font-size: 0.8rem;
    color: var(--accent-secondary);
    text-transform: uppercase;
    font-weight: 700;
    margin-left: 10px;
}

/* Sidebars Base Positioning */
#left-sidebar {
    grid-column: 1;
    grid-row: 2;
    display: flex;
    flex-direction: column;
    gap: 15px;
    transition: opacity 0.25s ease, transform 0.25s ease;
}

#right-sidebar {
    grid-column: 3;
    grid-row: 2;
    display: flex;
    flex-direction: column;
    gap: 15px;
    transition: opacity 0.25s ease, transform 0.25s ease;
}

/* Sidebar Toggle Controls */
.panel-toggle-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    background: var(--panel-bg);
    border: 1px solid rgba(100, 255, 218, 0.3);
    color: var(--accent-primary);
    width: 22px;
    height: 52px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.panel-toggle-btn:hover {
    background: rgba(100, 255, 218, 0.15);
    border-color: var(--accent-primary);
    color: #fff;
}

#toggle-left-btn {
    left: calc(320px + 20px + 4px);
}

#toggle-right-btn {
    right: calc(340px + 20px + 4px);
}

/* Hidden Sidebar States */
#left-sidebar.panel-hidden {
    opacity: 0;
    pointer-events: none;
    transform: translateX(-18px);
}

#right-sidebar.panel-hidden {
    opacity: 0;
    pointer-events: none;
    transform: translateX(18px);
}

/* Bottom Controls Layout */
#bottom-bar {
    grid-column: 1 / -1;
    grid-row: 3;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}


.control-group-right {
    display: flex;
    gap: 12px;
    align-items: center;
}


.hud-row-btn {
    background: rgba(255, 255, 255, 0.03);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 46px;
    height: 46px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.hud-row-btn:hover {
    background: rgba(100, 255, 218, 0.1);
    color: var(--accent-primary);
    border-color: var(--accent-primary);
}

.hud-row-btn.active {
    color: var(--accent-secondary);
    border-color: var(--accent-secondary);
    background: rgba(255, 204, 68, 0.08);
}


/* ==========================================================================
   6. HUD SUB-PANELS & SYSTEM ELEMENTS (Quests, Actions, Predictions)
   ========================================================================== */

.panel-header {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--accent-primary);
    margin-bottom: 12px;
    border-bottom: 1px solid rgba(100, 255, 218, 0.2);
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 6px;
}

/* Quest Matrix */
.quest-item {
    background: rgba(255, 255, 255, 0.03);
    padding: 12px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-left: 4px solid var(--accent-secondary);
    margin-bottom: 10px;
}

.quest-title {
    font-weight: 600;
    color: #fff;
    margin-bottom: 4px;
    font-size: 0.9rem;
}

.quest-task {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-bottom: 8px;
}

.progress-bar-wrap {
    background: rgba(255, 255, 255, 0.08);
    height: 6px;
    border-radius: 2px;
    overflow: hidden;
}

.progress-fill {
    background: var(--accent-secondary);
    height: 100%;
    width: 0%;
    transition: width 0.3s ease;
}

/* Prophecy Window */
.prophecy-item {
    font-size: 0.8rem;
    padding: 8px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    margin-bottom: 6px;
    color: var(--accent-success);
    border-left: 3px solid var(--accent-primary);
}

/* Action Inputs & Prompts */
.action-btn {
    width: 100%;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #fff;
    padding: 10px 14px;
    text-align: left;
    margin-bottom: 8px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.85rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s;
}

.action-btn:hover {
    background: rgba(100, 255, 218, 0.08);
    border-color: var(--accent-primary);
}

.action-btn.talk-prompt-highlight {
    border: 1px solid var(--accent-success);
    background: rgba(0, 255, 136, 0.08);
    animation: pulse-border 1.5s infinite ease-in-out;
    font-weight: 700;
}

@keyframes pulse-border {

    0%,
    100% {
        border-color: rgba(0, 255, 136, 0.4);
    }

    50% {
        border-color: rgba(0, 255, 136, 1.0);
        box-shadow: 0 0 10px rgba(0, 255, 136, 0.15);
    }
}


/* ==========================================================================
   7. FLOATING IN-WORLD UI ELEMENTS
   ========================================================================== */

.inworld-tag {
    position: absolute;
    z-index: 450;
    transform: translate(-50%, -100%);
    pointer-events: none;
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    animation: tagPop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes tagPop {
    from {
        transform: translate(-50%, -80%) scale(0.8);
        opacity: 0;
    }

    to {
        transform: translate(-50%, -100%) scale(1);
        opacity: 1;
    }
}

.inworld-btn {
    pointer-events: auto;
    background: var(--bg-main);
    border: 2px solid var(--accent-success);
    color: #fff;
    padding: 6px 14px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(0, 255, 136, 0.25);
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.15s ease;
}

.inworld-btn:hover {
    background: var(--accent-success);
    color: var(--bg-main);
    transform: scale(1.05);
}

.inworld-msg {
    background: rgba(255, 204, 68, 0.95);
    border: 1px solid #fff;
    color: #020c1b;
    padding: 5px 12px;
    border-radius: 2px;
    font-size: 0.75rem;
    font-weight: 700;
    box-shadow: 0 4px 12px rgba(255, 204, 68, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
}

.inworld-arrow {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--bg-main);
}

.inworld-arrow.collectable-arrow {
    border-top-color: rgba(255, 204, 68, 0.95);
}


/* ==========================================================================
   8. MINI-RADAR / HUD MAP SYSTEM
   ========================================================================== */

.minimap-panel {
    width: 110px;
    height: 110px;
    background: rgba(2, 12, 27, 0.9);
    border: 2px solid var(--accent-primary);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
}

.minimap-radar-line {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: conic-gradient(from 0deg, rgba(100, 255, 218, 0.15) 0deg, transparent 90deg);
    transform-origin: center;
    animation: radar-sweep 2.5s linear infinite;
    pointer-events: none;
    z-index: 2;
}

@keyframes radar-sweep {
    to {
        transform: rotate(360deg);
    }
}

.minimap-grid-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px dashed rgba(100, 255, 218, 0.25);
    border-radius: 4px;
    pointer-events: none;
}

/* Radar Tracking Targets */
.minimap-blip {
    position: absolute;
    width: 6px;
    height: 6px;
    margin-left: -3px;
    margin-top: -3px;
    border-radius: 1px;
    z-index: 5;
    background: #fff;
    box-shadow: 0 0 6px currentColor;
}

.minimap-blip.player {
    background: var(--accent-success);
    width: 8px;
    height: 8px;
    margin-left: -4px;
    margin-top: -4px;
    z-index: 6;
}

.minimap-blip.npc {
    background: var(--accent-secondary);
}

.minimap-blip.collectable {
    background: #ffff00;
}

/* Expanded Map Trigger */
.btn-map-trigger {
    background: var(--accent-primary);
    color: var(--bg-main);
    border: none;
    font-weight: 700;
    padding: 14px 36px;
    border-radius: 4px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 6px 20px rgba(100, 255, 218, 0.2);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
}

.btn-map-trigger:hover {
    transform: translateY(-2px);
    background: #84ffea;
    box-shadow: 0 8px 24px rgba(100, 255, 218, 0.35);
}


/* ==========================================================================
   9. VISUAL NOVEL & DIALOGUE MATRIX SYSTEM
   ========================================================================== */

#vn-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    pointer-events: none;
    display: none;
    background: rgba(2, 12, 27, 0.6);
    opacity: 0;
    transition: opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1);
}

#vn-overlay.active {
    display: block;
}

#vn-overlay.fade-in-complete {
    opacity: 1;
    pointer-events: auto;
}

#vn-container {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 750px;
    background: var(--panel-bg);
    border-radius: 4px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgba(100, 255, 218, 0.15);
}

/* Speakers Header */
#vn-header {
    background: rgba(255, 255, 255, 0.04);
    padding: 14px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(100, 255, 218, 0.15);
}

#vn-avatar {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    background: var(--accent-primary);
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: var(--bg-main);
}

#vn-speaker-name {
    font-weight: 600;
    color: #fff;
    font-size: 0.95rem;
}

/* Chat Stream / Scrolling History Container */
#bub-scroll {
    padding: 20px;
    max-height: 240px;
    overflow-y: auto;
    background-color: transparent;
    background-image: radial-gradient(rgba(100, 255, 218, 0.04) 1px, transparent 0);
    background-size: 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.chat-bubble {
    max-width: 85%;
    padding: 10px 14px;
    border-radius: 4px;
    font-size: 0.9rem;
    line-height: 1.4;
    position: relative;
    word-wrap: break-word;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.chat-bubble.incoming {
    background: var(--bubble-in);
    color: var(--text-main);
    align-self: flex-start;
    border-left: 3px solid var(--accent-secondary);
}

.chat-bubble.outgoing {
    background: var(--bubble-out);
    color: #fff;
    align-self: flex-end;
    border-right: 3px solid var(--accent-primary);
}

/* Dialogue Interactivity Choices */
#bar-choices {
    background: rgba(0, 0, 0, 0.2);
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top: 1px solid rgba(100, 255, 218, 0.15);
}

.choice-btn {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(100, 255, 218, 0.15);
    color: var(--accent-primary);
    padding: 10px 16px;
    border-radius: 4px;
    cursor: pointer;
    text-align: left;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.2s;
}

.choice-btn:hover {
    background: rgba(100, 255, 218, 0.1);
    color: #00f2ff;
    padding-left: 22px;
}


/* ==========================================================================
   10. POPUPS & EVIDENCE FILE SYSTEM
   ========================================================================== */

#evidence-popup-card {
    background: rgba(2, 12, 27, 0.95);
    border: 1px solid var(--accent-success);
    border-radius: 4px;
    padding: 12px;
    display: none;
    margin-bottom: 10px;
    animation: slideInDown 0.3s ease-out;
}

@keyframes slideInDown {
    from {
        transform: translateY(-10px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
}

.popup-title {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--accent-success);
    display: flex;
    align-items: center;
    gap: 6px;
}

.popup-close {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 0.8rem;
}

.popup-close:hover {
    color: #fff;
}

.popup-body {
    font-size: 0.78rem;
    color: var(--text-main);
    line-height: 1.4;
}

/* Grid Vault */
.evidence-folder-container {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    border: 1px solid rgba(100, 255, 218, 0.1);
    padding: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.evidence-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    overflow-y: auto;
    padding-top: 4px;
}

.evidence-slot-btn {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
    font-size: 1.5rem;
}

.evidence-slot-btn i {
    font-size: 1.3rem;
    color: var(--accent-secondary);
}

.evidence-slot-btn:hover {
    background: rgba(100, 255, 218, 0.08);
    color: var(--accent-success);
    border-color: var(--accent-success);
}

.evidence-slot-btn.filled {
    color: var(--accent-secondary);
    background: rgba(100, 255, 218, 0.1);
    border-color: var(--accent-primary);
}

.evidence-slot-btn.filled:hover {
    color: var(--accent-success);
    box-shadow: 0 0 8px rgba(100, 255, 218, 0.3);
}


/* ==========================================================================
   11. EXPANDED WORLD MAP MODAL OVERLAY
   ========================================================================== */

#modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 500;
    background: #010409;
    display: none;
    flex-direction: column;
}

#modal-overlay.active {
    display: flex;
}

#modal-header {
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.02);
    border-bottom: 1px solid rgba(100, 255, 218, 0.15);
    z-index: 510;
}

#modal-canvas-wrap {
    flex: 1;
    position: relative;
    overflow: hidden;
}

.close-modal-btn {
    background: transparent;
    border: 1px solid var(--accent-error);
    color: var(--accent-error);
    padding: 8px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.2s;
    z-index: 510;
}

.close-modal-btn:hover {
    background: var(--accent-error);
    color: #000;
}

/* Map Nodes & Anchors */
.map-node-dot {
    position: absolute;
    width: 16px;
    height: 16px;
    margin-left: -8px;
    margin-top: -8px;
    border-radius: 2px;
    z-index: 550;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: 0 0 16px currentColor;
    border: 2px solid #fff;
    transition: transform 0.2s;
    left: 50%;
    top: 50%;
}

.map-node-dot:hover {
    transform: scale(1.4);
}

.map-node-dot.locked {
    cursor: not-allowed;
    border: 1px solid #444 !important;
    background: #1c1c1c !important;
    color: #444 !important;
    box-shadow: none;
}

.map-node-dot.completed::after {
    content: '\f00c';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--accent-success);
    font-size: 11px;
}

.map-node-label {
    position: absolute;
    z-index: 551;
    pointer-events: none;
    font-size: 0.75rem;
    white-space: nowrap;
    color: #fff;
    background: rgba(2, 12, 27, 0.95);
    padding: 4px 8px;
    border-radius: 2px;
    border: 1px solid rgba(100, 255, 218, 0.15);
    transform: translate(-50%, -32px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}


/* ==========================================================================
   12. MISSION ACT & PHASE TREE CONTROLS (Inside Map Modal)
   ========================================================================== */

#lsm-tree {
    width: 240px;
    flex-shrink: 0;
    background: rgba(0, 0, 0, .4);
    border-right: 1px solid rgba(100, 255, 218, .08);
    overflow-y: auto;
    padding: 16px 0;
}

#lsm-tree::-webkit-scrollbar {
    width: 4px;
}

#lsm-tree::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, .07);
}

.tree-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 16px;
    cursor: pointer;
    border-left: 3px solid transparent;
    transition: all .2s;
}

.tree-item:hover {
    background: rgba(100, 255, 218, .06);
}

/* Structural States */
.tree-item.active-phase {
    border-left-color: var(--accent-primary);
    background: rgba(100, 255, 218, .08);
}

.tree-item.complete {
    border-left-color: #ffcc44;
}

.tree-item.locked {
    opacity: .35;
    cursor: not-allowed;
}

/* Status Node Dot Colors */
.tree-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    flex-shrink: 0;
    background: #8696a0;
}

.tree-item.complete .tree-dot {
    background: #ffcc44;
}

.tree-item.available .tree-dot {
    background: var(--accent-primary);
}

.tree-item.active-phase .tree-dot {
    background: var(--accent-primary);
    box-shadow: 0 0 8px var(--accent-primary);
}

/* Copywriting Components Inside Tree Row */
.tree-info {
    flex: 1;
    min-width: 0;
}

.tree-act {
    color: var(--text-muted);
    font-size: .55rem;
    letter-spacing: 2px;
}

.tree-title {
    color: var(--text-main);
    font-size: .7rem;
    letter-spacing: .5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Structural Connective Lines */
.tree-connector {
    width: 2px;
    height: 14px;
    background: rgba(100, 255, 218, .12);
    margin-left: 23px;
}


/* ==========================================================================
   13. BLUR MASK & BIBLE TEXT READER SUBMODAL
   ========================================================================== */

.overlay-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-panel {
    background: var(--panel-bg);
    border: 1px solid rgba(100, 255, 218, 0.2);
    border-radius: 4px;
    width: 90%;
    max-width: 550px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
    animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes modalSlideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.modal-header {
    padding: 16px 20px;
    border-bottom: 1px solid rgba(100, 255, 218, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
}

.badge {
    background: rgba(100, 255, 218, 0.1);
    color: var(--accent-primary);
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 2px;
    font-weight: bold;
    margin-left: 8px;
    border: 1px solid rgba(100, 255, 218, 0.15);
}

.close-icon-btn {
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 4px;
    transition: color 0.2s;
}

.close-icon-btn:hover {
    color: var(--accent-error);
}

.modal-body {
    padding: 20px;
    overflow-y: auto;
    flex-grow: 1;
}

/* Verse Streaming & Context Formats */
.current-v {
    font-size: 1.05rem;
    line-height: 1.6;
    margin: 0 0 16px 0;
    color: var(--accent-success);
}

.context-v {
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--text-muted);
    border-left: 2px solid var(--accent-success);
    padding-left: 12px;
    margin: 0 0 12px 0;
    animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(-4px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}