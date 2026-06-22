// GameLevelManager.js
import { levels } from './levels.js';

export class GameLevelManager {
    constructor(mainApp) {
        this.app = mainApp;
        this.currentLevelIndex = 0;
        this.elWipeOverlay = document.getElementById('wipe-overlay');
    }

    getCurrentLevel() {
        return levels[this.currentLevelIndex];
    }

    nextLevel() {
        if (this.currentLevelIndex >= levels.length - 1) {
            this.app.triggerWinSequence();
            return;
        }

        this.elWipeOverlay.classList.add('active');

        setTimeout(() => {
            this.currentLevelIndex++;
            this.loadLevel(this.getCurrentLevel());
        }, 1000);
    }

    /**
     * Unloads current level data and populates systems with the new level data
     */
    loadLevel(levelData) {
        console.log(`Loading Level: ${levelData.name}`);

        // 1. Purge asset trees
        this.app.worldMgr.clearCurrentWorld();

        // 3. Set up new Level Environment (.glb model loading)
        this.app.worldMgr.setupLevelEnvironment(levelData.modelPath);

        // 4. Teleport Player to level spawn point
        this.app.player.pBody.position.set(levelData.spawnPoint.x, levelData.spawnPoint.y, levelData.spawnPoint.z);
        this.app.player.pBody.velocity.set(0, 0, 0);

        // 5. Overwrite global active quests and NPCs for the current framework
        this.app.updateActiveLevelData(levelData.quests, levelData.npcs);

        // 6. Spawn Pickups/Evidence
        this.app.worldMgr.spawnLevelAssets(levelData);

        // 7. Build NPC meshes from the freshly populated activeNpcs
        if (this.app.npcSystem && levelData.npcs) {
            this.app.npcSystem.rebuildFromData(levelData.npcs);
        }

        // 8. Update UI headers & panels
        document.getElementById('loc-name').textContent = levelData.name;
        this.app.updateUI();

        // 9. Remove visual screen wipe
        setTimeout(() => {
            this.elWipeOverlay.classList.remove('active');
        }, 500);
    }
}