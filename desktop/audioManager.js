// audioManager.js — handles sound effects and ambience using Howler.js
import { WildlifeSoundscape } from '../js/audio/WildlifeSoundscape.js';

export class AudioManager {
  constructor() {
    this.enabled = true;
    this.volume = 0.3;

    const basePath = './../assets/audio/';
    const musicPath = './../assets/music/';
    this.sounds = {
      collect: basePath + 'collectable.mp3',
      clue: basePath + 'ping_pong.mp3',
      complete: basePath + 'quest_complete.mp3',
      talk: basePath + 'npc.mp3',
      error: basePath + 'clang_and_wobble.mp3',
      ui: basePath + 'button_click.mp3',
      pickup: basePath + 'pickup.mp3',
      victory: basePath + 'victory_fanfare.mp3'
    };

    // Background music tracks for each act. .ogg first for its seamless loop point; Howler falls
    // back to .mp3 if the browser can't play ogg/vorbis.
    this.actMusicMap = {
      'Act I - The Triumphal Entry': [musicPath + 'act1_sunlight_on_marble.ogg', musicPath + 'act1_sunlight_on_marble.mp3'],
      'Act II - The Temple Courts': [musicPath + 'act2_shackles_on_the_stone.ogg', musicPath + 'act2_shackles_on_the_stone.mp3'],
      'Act III - The Last Supper': [musicPath + 'act3_laurel_and_iron.ogg', musicPath + 'act3_laurel_and_iron.mp3'],
      'Act IV - The Resurrection': [musicPath + 'act4_victory_at_the_sunlit_gate.ogg', musicPath + 'act4_victory_at_the_sunlit_gate.mp3']
    };

    this._howls = {};
    this.bgMusic = null;
    this.currentActLabel = null;
    this.currentAmbient = null;
    this._pausedByVisibility = false;
    this._ambiencePaused = false;
    this.wildlife = new WildlifeSoundscape({ volume: this.volume * 0.35 });

    // Pause all sound when the tab/app is backgrounded, resume when it returns to the foreground
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.pauseAll();
      else this.resumeAll();
    });

    // Sync Howler global state with initial manager settings immediately
    if (typeof Howler !== 'undefined') {
      Howler.volume(this.volume);
      Howler.mute(!this.enabled);
    }
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    this.wildlife.setEnabled(enabled);
    if (typeof Howler !== 'undefined') {
      Howler.mute(!enabled);
      if (this.bgMusic) {
        if (enabled) {
          if (!this.bgMusic.playing()) this.bgMusic.play();
          this.bgMusic.fade(0, 0.3, 1000);
        } else {
          this.bgMusic.fade(this.bgMusic.volume() || 0, 0, 1000);
          setTimeout(() => { if (this.bgMusic) this.bgMusic.pause(); }, 1000);
        }
      }
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.wildlife.setVolume(this.volume * 0.35);
    if (typeof Howler !== 'undefined') {
      Howler.volume(this.volume);
    }
  }

  play(event, loop = false) {
    if (!this.enabled || typeof Howl === 'undefined') return;

    if (!this._howls[event]) {
      const src = this.sounds[event];
      if (!src) {
        console.warn(`No sound source for event: ${event}`);
        return;
      }
      this._howls[event] = new Howl({
        src: [src],
        loop: loop,
        volume: loop ? 0.6 : 1.0,
        html5: true, // Required for file:// protocol compatibility and reliable loading
        onloaderror: () => {
          console.warn(`[Audio] Failed to load sound: ${event} (${src})`);
          delete this._howls[event];
        }
      });
    }
    if (loop && this._howls[event].playing()) return;
    this._howls[event].play();
  }

  updateActMusic(actLabel) {
    if (this.currentActLabel === actLabel) return;
    this.currentActLabel = actLabel;

    const nextTrackPath = this.actMusicMap[actLabel];
    const fadeTime = 4000;

    const startNext = () => {
      if (!nextTrackPath) {
        this.bgMusic = null;
        return;
      }
      this.bgMusic = new Howl({
        src: nextTrackPath,
        loop: true,
        volume: 0,
        html5: true,
        onloaderror: (id, err) => console.error(`[Audio] Failed to load ${nextTrackPath}.`, err)
      });
      if (this.enabled) {
        this.bgMusic.play();
        this.bgMusic.fade(0, 0.3, fadeTime);
      }
    };

    if (this.bgMusic) {
      this.bgMusic.fade(this.bgMusic.volume() || 0, 0, fadeTime);
      const old = this.bgMusic;
      setTimeout(() => {
        old.stop();
        startNext();
      }, fadeTime);
    } else {
      startNext();
    }
  }

  playCollect() { this.play('collect'); }
  playClue() { this.play('clue'); }
  playComplete() { this.play('complete'); }
  playTalk() { this.play('talk'); }
  playError() { this.play('error'); }
  playUI() { this.play('ui'); }
  playJump() { this.play('ui'); }

  playMorningAmbience() {
    this.wildlife.start('dawn');
  }

  playOutdoorAmbience() {
    this.wildlife.start('night');
  }

  stopAllAmbience() {
    this.wildlife.stop();
    if (this.currentAmbient && this._howls[this.currentAmbient]) {
      this._howls[this.currentAmbient].stop();
    }
    this.currentAmbient = null;
  }

  /** Pauses all playing sound so the game can be safely backgrounded (tab hidden, app minimized). */
  pauseAll() {
    this.wildlife.pause();
    if (this.bgMusic && this.bgMusic.playing()) {
      this._pausedByVisibility = true;
      this.bgMusic.pause();
    }
    const ambientHowl = this.currentAmbient && this._howls[this.currentAmbient];
    if (ambientHowl && ambientHowl.playing()) {
      this._ambiencePaused = true;
      ambientHowl.pause();
    }
  }

  /** Resumes sound that was paused by pauseAll() once the game returns to the foreground. */
  resumeAll() {
    if (!this.enabled) return;
    this.wildlife.resume();
    if (this._pausedByVisibility && this.bgMusic) {
      this.bgMusic.play();
      this._pausedByVisibility = false;
    }
    const ambientHowl = this.currentAmbient && this._howls[this.currentAmbient];
    if (this._ambiencePaused && ambientHowl) {
      ambientHowl.play();
      this._ambiencePaused = false;
    }
  }
}
