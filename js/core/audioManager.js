import { SOUND } from './../config.js';

export class AudioManager {
    constructor() {
        this.uiSounds = {};
        this.ambientSounds = {};
        this.npcInteractionSounds = {};
        this.bgMusic = null;
        this.soundEnabled = true; // Master sound toggle (affects all audio)

        this.initAudio();
    }

    initAudio() {
        if (typeof Howler === 'undefined') {
            console.warn('Howler not available');
            return;
        }

        this.uiSounds = {
            open:   new Howl({ src: [SOUND.panelOpen],   volume: 0.4 }),
            close:  new Howl({ src: [SOUND.panelClose],  volume: 0.3 }),
            click:  new Howl({ src: [SOUND.buttonClick], volume: 0.5 }),
            questComplete: new Howl({ src: [SOUND.questDone],  volume: 0.7 }),
            victory: new Howl({ src: [SOUND.victory],    volume: 0.8 }),
            pickup: new Howl({ src: [SOUND.pickup],     volume: 0.5 })
        };

        this.ambientSounds = {
            birds: new Howl({ src: [SOUND.birds], loop: true, volume: 0, autoplay: false })
        };

        this.bgMusic = new Howl({
            src: [SOUND.bgMusic],
            loop: true,
            volume: 0.35,
            autoplay: false
        });
    }

    playNpcSound(npcId, type) {
        if (!this.soundEnabled) return;
        if (typeof Howler === 'undefined') return;
        const npcCfg = SOUND.npc[npcId];
        if (!npcCfg || !npcCfg[type]) return;

        const key = `${npcId}_${type}`;
        if (!this.npcInteractionSounds[key]) {
            this.npcInteractionSounds[key] = new Howl({ src: [npcCfg[type]], volume: 0.6 });
        }
        this.npcInteractionSounds[key].play();
    }

    playUI(key) {
        if (!this.soundEnabled) return;
        if (this.uiSounds[key]) this.uiSounds[key].play();
    }

    playPickup() {
        if (!this.soundEnabled) return;
        if (this.uiSounds.pickup) this.uiSounds.pickup.play();
    }

    playQuestComplete() {
        if (!this.soundEnabled) return;
        if (this.uiSounds.questComplete) this.uiSounds.questComplete.play();
    }

    playVictory() {
        if (!this.soundEnabled) return;
        if (this.uiSounds.victory) this.uiSounds.victory.play();
    }

    startMusic() {
        if (this.bgMusic && this.soundEnabled) {
            this.bgMusic.play();
        }
    }

    pauseMusic() {
        if (this.bgMusic) this.bgMusic.pause();
    }

    toggleMusic() {
        this.soundEnabled = !this.soundEnabled;
        // Mute/unmute all Howler sounds globally
        if (typeof Howler !== 'undefined') {
            Howler.mute(!this.soundEnabled);
        }
        return this.soundEnabled;
    }

    startAmbient() {
        if (this.soundEnabled && this.ambientSounds.birds) {
            this.ambientSounds.birds.play();
            this.ambientSounds.birds.fade(0, 0.15, 3000);
        }
    }

    resumeAudioContext(audioCtx) {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }
}
