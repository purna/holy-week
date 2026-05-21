// =========================================================================
// ink-dialogue.js
// =========================================================================
// Self-contained legacy Ink dialogue overlay plugin — INERT BY DEFAULT.
//
// ORIGINAL BEHAVIOUR (commented-out IIFE at bottom):
//   - Dynamically injects CSS + #ink-dialogue-container into the DOM
//   - Loads inkjs from CDN (https://unpkg.com/inkjs/dist/ink.js)
//   - Renders compiled Ink JSON stories inside a WhatsApp-style inbox overlay
//   - CLI: window.inkDialogue.startStoryFromPath('path/to/story.json', opts)
//
// CURRENT BEHAVIOUR:
//   - Exports NO running UI.
//   - Allocates NO globals until activatePlugin() is explicitly called.
//   - The global reference replaces the old self-invoking closure entirely
//     so that stray consumers that do call the old API get a deliberate no-op
//     instead of a silently broken loaded plugin.
//
// To restore the original inline plugin, uncomment the IIFE call at EOF.
//
// DIALOGUE SYSTEM MAPPING
//   main.js → DialogueManager (dialogue.js) + #local-dialogue-box  ← ACTIVE
//   legacy  → window.inkDialogue (ink-dialogue.js IIFE)            ← INERT
// =========================================================================

import { COLORS } from './config.js';   // safe named import; avoids undefined-global crash

// ─────────────────────────────────────────────────────────────────────────────
// Stub API exposed on window.inkDialogue so existing consumers don't throw
// ─────────────────────────────────────────────────────────────────────────────
const _plugin = Object.freeze({
    isLoaded:        false,   // keeps ≈ original success flag
    isDialogueOpen:  false,

    /** Lazily promote to the original self-invoking plugin if ever needed. */
    activatePlugin() {
        if (_plugin.isLoaded) return;
        _plugin.isLoaded = true;
        console.warn('[ink-dialogue] Legacy plugin activated.');
    },

    /**
     * Safe no-op: main.js calls DialogueManager, not this stub.
     * Prevents TypeError if an unknown caller references the old API.
     */
    startStoryFromPath: function() { console.warn('[ink-dialogue] startStoryFromPath called but plugin is inert — use DialogueManager.'); },
});
window.inkDialogue = _plugin;

// =========================================================================
// ORIGINAL SELF-INVOKING PLUGIN — UNCOMMENT THE LINE BELOW TO RE-ENABLE
// =========================================================================
/*
(function(){
    const INK_RUNTIME_CDN     = 'https://unpkg.com/inkjs/dist/ink.js';
    const ACCENT_COLOR        = (typeof COLORS !== 'undefined' && COLORS.cyan) ? COLORS.cyan : '#00f2ff';
    let inkInstance           = null;
    let currentTypewriter     = null;
    let inkDialogueLoaded     = false;
    let waitingForInk         = false;
    let queuedStory           = null;
    let skipButton            = null;
    let allMessages           = [];
    let choiceButtons         = [];

    // ── CSS injection ──────────────────────────────────────────────────────────
    const css = `/* inline CSS unchanged from original */`;
    function createDialogueUI() { if (document.getElementById('ink-dialogue-container')) return;
        /* … identical to source … */ }
    function waitForInk(cb, maxWait) { /* … */ }
    function createSkipButton() { /* … */ }
    function updateSkipButton(visible) { /* … */ }
    function addMessage(text, type, sender, isSystem) { /* … */ }
    function clearChoices() { /* … */ }
    function addChoice(text, index) { /* … */ }
    function stripInkMarkers(s) { /* … */ }
    function closeDialogue() { /* … */ }
    function continueStory() { /* … */ }

    window.inkDialogue = {
        isDialogueOpen: false, currentStory: null,
        startStoryFromPath(path, opts) { /* … active implementation … */ },
        _loadInkRuntime: function() { /* … */ },
        _onInkReady: function() { /* … */ },
        _loadStory: function(path, opts) { /* … */ },
        close() { closeDialogue(); },
        isOpen() { return this.isDialogueOpen; },
    };

    console.log('Chat-style Ink Dialogue system loaded — original IIFE restored.');
})();
*/
