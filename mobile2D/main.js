import { GameEngine } from "./gameEngine.js";
import { DEBUG } from "./../js/config.js";

const CONFIG = { DEBUG };

const game = new GameEngine(CONFIG);

// Listen for clicks to play UI sound effects globally
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button, input[type="button"]');
  if (btn && game.audio && game.audio.enabled) {
    game.audio.playUI();
  }
});

// Initialize the engine when the script loads
game.init();