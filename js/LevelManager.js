// LevelManager.js
import { levels } from './levels.js';

export class LevelManager {
    constructor(mainApp) {
        this.app = mainApp; // Keep a reference to main.js variables/systems
        this.currentLevelIndex = 0;
        this.elWipeOverlay = document.getElementById('wipe-overlay');
    }

    getCurrentLevel() {
        return levels[this.currentLevelIndex];
    }

    /**
     * Advances the game to the next loop level with a visual transition
     */
    nextLevel() {
        if (this.currentLevelIndex >= levels.length - 1) {
            this.app.showGameWinScreen(); // Final conclusion reached
            return;
        }

        // 1. Trigger wipe/fade animation
        this.elWipeOverlay.classList.add('active'); // CSS should transition opacity to 1

        setTimeout(() => {
            this.currentLevelIndex++;
            this.loadLevel(this.getCurrentLevel());
        }, 1000); // Sync timing with CSS fade transition duration
    }

    /**
     * Unloads current level data and populates systems with the new level data
     */
    loadLevel(levelData) {
        console.log(`Loading Level: ${levelData.name}`);

        // 1. Clear old 3D Environment and Physics Bodies
        this.app.worldMgr.clearCurrentWorld();

        // 2. Set up new Level Environment (.glb model loading)
        this.app.worldMgr.setupLevelEnvironment(levelData.modelPath);

        // 3. Teleport Player to level spawn point
        this.app.player.pBody.position.copy(levelData.spawnPoint);
        this.app.player.pBody.velocity.set(0, 0, 0);

        // 4. Overwrite global active quests and NPCs for the current framework
        this.app.updateActiveLevelData(levelData.quests, levelData.npcs);

        // 5. Spawn Pickups/Evidence and rebuild NPC meshes into the scene
        this.app.worldMgr.spawnLevelAssets(levelData);

        // 6. Rebuild NPC meshes from the freshly populated activeNpcs
        if (this.app.npcSystem) {
            this.app.npcSystem.rebuildFromData();
        }

        // 7. Update UI headers & panels
        document.getElementById('loc-name').textContent = levelData.name;
        this.app.updateUI();

        // 8. Remove visual screen wipe
        setTimeout(() => {
            this.elWipeOverlay.classList.remove('active');
        }, 500);
    }
}