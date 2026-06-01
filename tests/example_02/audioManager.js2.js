// audioManager.js — handles sound effects for game events
export class AudioManager {
  constructor() {
    this.enabled = true;
    this.volume = 0.5;
    this.ambientVolume = 0.35;
    // Map event names to sound URLs (Google Sound Library)
    this.sounds = {
      collect: 'https://actions.google.com/sounds/v1/impacts/coin_2.ogg',
      clue: 'https://actions.google.com/sounds/v1/fx/magic_wand.ogg',
      complete: 'https://actions.google.com/sounds/v1/sports/cheering.ogg',
      talk: 'https://actions.google.com/sounds/v1/fx/chat.ogg',
      error: 'https://actions.google.com/sounds/v1/fx/error.ogg',
      ambientMorningFarm: 'https://actions.google.com/sounds/v1/ambiences/morning_birds.ogg',
      ambientOutdoorFarm: 'https://actions.google.com/sounds/v1/ambiences/outdoor_farm.ogg'
    };
    this.audioCache = new Map(); // cache Audio objects
    this.audioContext = null;
    
    // Initialize audio context on first user interaction (required by browsers)
    this._initAudioContext = this._initAudioContext.bind(this);
    
    this.currentAmbient = null;
  }
  
  _initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Remove the listener after first use
      document.removeEventListener('click', this._initAudioContext);
      document.removeEventListener('keydown', this._initAudioContext);
    }
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) {
      this.audioCache.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.audioCache.forEach(audio => {
      audio.volume = this.volume;
    });
  }

  play(event, isAmbient = false) {
    // Initialize audio context on first interaction if needed
    if (!this.audioContext) {
      this._initAudioContext();
    }
    
    if (!this.enabled) return;
    const url = this.sounds[event];
    if (!url) {
      console.warn(`No sound configured for event: ${event}`);
      return;
    }
    let audio = this.audioCache.get(event);
    if (!audio) {
      audio = isAmbient ? new Howl({ src: [url], html5: true, loop: true, volume: this.ambientVolume })
                        : new Audio(url);
      if (!isAmbient) audio.volume = this.volume;
      this.audioCache.set(event, audio);
    }
    if (isAmbient && audio.playing()) return;
    if (!isAmbient) audio.currentTime = 0;
    if (!isAmbient) {
      // Initialize audio context on first interaction if needed
      if (!this.audioContext) {
        this._initAudioContext();
      }
      audio.play().catch(err => {
        console.debug(`Audio play failed for ${event}:`, err);
      });
    } else {
      audio.play();
    }
  }

  stopAmbient() {
    if (this.currentAmbient) {
      const audio = this.audioCache.get(this.currentAmbient);
      if (audio && audio.playing) audio.stop();
      this.currentAmbient = null;
    }
  }

  // Convenience methods for specific events
  playCollect() { this.play('collect'); }
  playClue() { this.play('clue'); }
  playComplete() { this.play('complete'); }
  playTalk() { this.play('talk'); }
  playError() { this.play('error'); }
  playAmbientMorningFarm() { this.stopAmbient(); this.currentAmbient = 'ambientMorningFarm'; this.play('ambientMorningFarm', true); }
  playAmbientOutdoorFarm() { this.stopAmbient(); this.currentAmbient = 'ambientOutdoorFarm'; this.play('ambientOutdoorFarm', true); }
}