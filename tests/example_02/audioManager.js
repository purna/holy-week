// audioManager.js — handles sound effects and ambience using Howler.js
export class AudioManager {
  constructor() {
    this.enabled = true;
    this.volume = 0.5;
    this.sounds = {
      collect: 'https://actions.google.com/sounds/v1/impacts/silver_coins_drop.ogg',
      clue: 'https://actions.google.com/sounds/v1/foley/magic_wand.ogg',
      complete: 'https://actions.google.com/sounds/v1/human_voices/applause.ogg',
      talk: 'https://actions.google.com/sounds/v1/foley/notification.ogg',
      error: 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg',
      ui: 'https://actions.google.com/sounds/v1/foley/button_click.ogg',
      morning: 'https://actions.google.com/sounds/v1/ambiences/morning_birds.ogg',
      outdoor: 'https://actions.google.com/sounds/v1/ambiences/farm_animal_sounds.ogg'
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