import { GameEngine } from "./gameEngine.js";
import { LabUI } from "./labUI.js";


// ── Configuration ──────────────────────────────────────────
const CONFIG = {
  unlockAllCases: true // Set to true to bypass case requirements for testing
};


const game = new GameEngine(CONFIG); // Pass the CONFIG object to the GameEngine
window.gameEngine = game;
window.a11y = game.a11y;
window.audio = game.audio;

// Set up inkjs library for dialogue system
if (typeof inkjs !== 'undefined') {
  game.dm.setInkLib(inkjs);
}

(function domInit() {
  const settingsOverlay = document.getElementById('settings-overlay');
  const hamburgerBtn = document.getElementById('btn-header-hamburger');
  const headerDropdown = document.getElementById('header-dropdown');
  const menuAudioBtn = document.getElementById('btn-toggle-audio');

  // Get references to settings toggles
  const audioToggle = document.getElementById('settings-audio-toggle');

  function buildA11yList() {
    const list = document.getElementById('a11y-settings-list');
    if (!list) return;
    const settings = game.a11y.getAll();
    const rows = [
      { key: 'high_contrast', label: '👁 High Contrast', desc: 'Stronger borders, brighter text' },
      { key: 'large_text', label: '🔠 Large Text', desc: 'Increase text size throughout' },
      { key: 'tts', label: '🔊 Read Aloud (TTS)', desc: 'Speaks dialogue and results' },
      { key: 'slow_speech', label: '🐢 Slow Speech', desc: 'Slower reading speed' },
      { key: 'simple_mode', label: '📖 Simple Language', desc: 'Uses easier, shorter words' },
      { key: 'reduce_motion', label: '⏸ Reduce Motion', desc: 'Removes animations' },
    ];

    list.innerHTML = rows.map(r => {
      const enabled = !!settings[r.key];
      const pressed = enabled ? 'true' : 'false';
      return `<label class="a11y-setting-row">
        <span>
          <span class="a11y-label-main">${r.label}</span>
          <span class="a11y-label-desc">${r.desc}</span>
        </span>
        <button type="button" class="toggle-btn ${enabled ? 'active' : ''}" 
                role="switch" aria-checked="${pressed}" 
                data-feature="${r.key}" aria-label="Toggle ${r.label}"></button>
      </label>`;
    }).join('');

    Array.from(list.querySelectorAll('.toggle-btn')).forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const feature = btn.dataset.feature;
        const state = game.a11y.toggle(feature);
        btn.classList.toggle('active', state);
        btn.setAttribute('aria-checked', state ? 'true' : 'false');
      });
    });
  }

  const updateMenuAudioLabel = () => {
    if (!menuAudioBtn) return;
    const isEnabled = game.a11y.soundEnabled;
    menuAudioBtn.querySelector('span').textContent = `Audio: ${isEnabled ? 'On' : 'Off'}`;
    const icon = menuAudioBtn.querySelector('i');
    if (icon) icon.className = isEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
  };

  if (hamburgerBtn && headerDropdown) {
    hamburgerBtn.onclick = (e) => {
      e.stopPropagation();
      const container = hamburgerBtn.parentElement;
      container.classList.toggle('is-open');
      headerDropdown.classList.toggle('active');
      if (headerDropdown.classList.contains('active')) updateMenuAudioLabel();
    };
    window.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target)) {
        headerDropdown.classList.remove('active');
        hamburgerBtn.parentElement.classList.remove('is-open');
      }
    });
  }

  if (menuAudioBtn) {
    menuAudioBtn.onclick = (e) => {
      e.stopPropagation();
      const state = game.a11y.toggle('sound');
      game.audio.setEnabled(state);
      updateMenuAudioLabel();
      game.audio.playUI();

      // Sync audio toggle in settings modal if built
      if (audioToggle) {
        audioToggle.classList.toggle('active', state);
        audioToggle.setAttribute('aria-checked', state ? 'true' : 'false');
      }
    };
  }

  if (document.getElementById('btn-open-settings')) {
    document.getElementById('btn-open-settings').onclick = () => {
      game.audio.playUI();
      buildA11yList();

      // Sync day/night toggle state
      const dayNightToggle = document.getElementById('toggle-day-night');
      if (dayNightToggle) {
        dayNightToggle.classList.toggle('active', game.controls.autoCycle);
      }
      // Sync audio toggle visual state with actual engine state when opening
      if (audioToggle) {
        const isEnabled = game.a11y.soundEnabled;
        audioToggle.classList.toggle('active', isEnabled);
        audioToggle.setAttribute('aria-checked', isEnabled ? 'true' : 'false');
      }

      settingsOverlay.classList.add('active');
    };
  }

  const closeSettings = () => {
    settingsOverlay.classList.remove('active');
  };

  if (document.getElementById('btn-close-settings')) document.getElementById('btn-close-settings').onclick = closeSettings;
  if (document.getElementById('btn-close-settings-x')) document.getElementById('btn-close-settings-x').onclick = closeSettings;

  window.openAnalysis = () => {
    game.audio.playUI();
    const el = document.getElementById('inv-board-overlay');
    el.classList.add('active');
    setTimeout(() => el.classList.add('fade-in-complete'), 50);
    window.renderInvestigationBoard();
  };

  if (document.getElementById('btn-close-inv-board')) {
    document.getElementById('btn-close-inv-board').onclick = () => {
      game.audio.playUI();
      const el = document.getElementById('inv-board-overlay');
      el.classList.remove('fade-in-complete');
      setTimeout(() => el.classList.remove('active'), 350);
    };
  }

  window.renderInvestigationBoard = function () {
    const invBoardContent = document.getElementById('inv-board-content');
    if (!invBoardContent) return;
    const labUI = new LabUI(game.de, game.es, game.a11y, (result) => {
      if (result && result.type === 'selection') window.renderInvestigationBoard();

      if (result && result.revealsSuspect) {
        game.cm.unlockSuspect(result.revealsSuspect);
      }
    });
    invBoardContent.innerHTML = labUI.render();
    labUI.bindEvents(invBoardContent);
  };

  window.showInstructionsModal = () => {
    document.getElementById('instructions-modal').classList.add('active');
    game.audio.playUI();
  };

  window.closeInstructionsModal = () => {
    document.getElementById('instructions-modal').classList.remove('active');
    if (game.controls) {
      game.controls.displayAlert(`Case: ${game.activeCaseId ? game.cm.cases[game.activeCaseId].title : ''}`);
    }
  };

  window.showResetModal = () => {
    document.getElementById('reset-modal').classList.add('active');
    game.audio.playUI();
  };

  window.closeResetModal = () => {
    document.getElementById('reset-modal').classList.remove('active');
  };

  window.resetProgress = () => { game.cm.resetProgress(); window.location.reload(); };
  window.BibleReader = window.BibleReader || { displayPassage() { }, updateTranslation() { }, closeOverlay() { } };
})();

game.init();
// Show start button when game is loaded
document.getElementById('loading-screen').classList.add('ready');