// audioManager.js — handles sound effects and ambience using Howler.js
export class AudioManager {
  constructor() {
    this.enabled = true;
    this.volume = 0.5;
    this.sounds = {
      collect: 'https://threejs.org/examples/sounds/ping_pong.mp3',
      clue: 'https://threejs.org/examples/sounds/376737__re_build__sfx-magic.mp3',
      complete: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
      talk: 'https://assets.mixkit.co/active_storage/sfx/2358/2561-preview.mp3',
      error: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
      ui: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
      morning: 'https://assets.mixkit.co/active_storage/sfx/15/15-preview.mp3',
      outdoor: 'https://assets.mixkit.co/active_storage/sfx/29/29-preview.mp3'
    };
    this._howls = {};
    this.currentAmbient = null;

    // Sync Howler global state with initial manager settings immediately
    if (typeof Howler !== 'undefined') {
      Howler.volume(this.volume);
      Howler.mute(!this.enabled);
    }
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    if (typeof Howler !== 'undefined') {
      Howler.mute(!enabled);
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
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
        // Use a fixed baseline volume (1.0 for SFX, 0.6 for Ambience).
        // The global Howler.volume() acts as the master slider, ensuring all 
        // sounds scale proportionally and consistently regardless of when they were first played.
        volume: loop ? 0.6 : 1.0,
        html5: loop
      });
    }
    if (loop && this._howls[event].playing()) return;
    this._howls[event].play();
  }

  playCollect() { this.play('collect'); }
  playClue() { this.play('clue'); }
  playComplete() { this.play('complete'); }
  playTalk() { this.play('talk'); }
  playError() { this.play('error'); }
  playUI() { this.play('ui'); }

  playMorningAmbience() {
    this.stopAllAmbience();
    this.currentAmbient = 'morning';
    this.play('morning', true);
  }

  playOutdoorAmbience() {
    this.stopAllAmbience();
    this.currentAmbient = 'outdoor';
    this.play('outdoor', true);
  }

  stopAllAmbience() {
    if (this.currentAmbient && this._howls[this.currentAmbient]) {
      this._howls[this.currentAmbient].stop();
    }
    this.currentAmbient = null;
  }
}