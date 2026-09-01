/**
 * A lazy ambient wildlife layer. Short recordings are selected only when
 * needed instead of downloading and looping a large ambience file.
 */
export class WildlifeSoundscape {
  constructor({ volume = 0.12 } = {}) {
    this.volume = volume;
    this.enabled = true;
    this.phase = null;
    this.context = null;
    this.timer = null;
    this.lastCall = null;
    this.lastRecordingIndex = {};
    this.activeAudio = new Set();
    this.generation = 0;

    this.recordingPools = {
      bird: Array.from({ length: 12 }, (_, index) => (
        new URL(`../../assets/audio/birds/bird_sound_${String(index + 1).padStart(2, '0')}.mp3`, import.meta.url).href
      )),
      cricket: [new URL('../../assets/audio/animals/cricket_01.mp3', import.meta.url).href],
      owl: Array.from({ length: 4 }, (_, index) => (
        new URL(`../../assets/audio/animals/owl_${String(index + 1).padStart(2, '0')}.mp3`, import.meta.url).href
      ))
    };

    this._wake = this._wake.bind(this);
    document.addEventListener('pointerdown', this._wake, { passive: true });
    document.addEventListener('keydown', this._wake);
  }

  start(timeOfDay = 'day') {
    const phase = this._normalisePhase(timeOfDay);
    if (this.phase === phase && this.timer) return;
    this.stop();
    this.phase = phase;
    this.generation += 1;
    if (this.enabled) this._schedule(350, this.generation);
  }

  stop() {
    this.generation += 1;
    clearTimeout(this.timer);
    this.timer = null;
    this.phase = null;
    this._stopRecordings();
  }

  pause() {
    clearTimeout(this.timer);
    this.timer = null;
    this._stopRecordings();
    if (this.context?.state === 'running') this.context.suspend();
  }

  resume() {
    if (!this.enabled || !this.phase) return;
    this.context?.resume();
    if (!this.timer) this._schedule(300, this.generation);
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    if (enabled) this.resume();
    else this.pause();
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  _normalisePhase(value) {
    const time = String(value || '').toLowerCase();
    if (time.includes('dawn') || time.includes('morning')) return 'dawn';
    if (time.includes('dusk') || time.includes('evening')) return 'dusk';
    if (time.includes('night') || time.includes('midnight')) return 'night';
    return 'day';
  }

  _wake() {
    if (!this.enabled || !this.phase) return;
    const context = this._getContext();
    if (context?.state === 'suspended') context.resume();
    if (!this.timer) this._schedule(100, this.generation);
  }

  _getContext() {
    if (!this.context) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      this.context = new AudioContextClass();
    }
    return this.context;
  }

  _schedule(delay, generation) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this._playNext(generation), delay);
  }

  _playNext(generation) {
    this.timer = null;
    if (!this.enabled || !this.phase || generation !== this.generation || document.hidden) return;

    const context = this._getContext();
    if (!context || context.state !== 'running') {
      this._schedule(1000, generation);
      return;
    }

    const pools = {
      dawn: ['bird', 'bird', 'bird', 'bird'],
      day: ['bird', 'bird', 'bird', 'cricket'],
      dusk: ['dove', 'cricket', 'cricket', 'owl'],
      night: ['cricket', 'cricket', 'cricket', 'owl']
    };
    const intervals = {
      dawn: [3000, 9000],
      day: [5000, 14000],
      dusk: [5000, 15000],
      night: [7000, 19000]
    };
    const choices = pools[this.phase];
    const alternatives = choices.filter(call => call !== this.lastCall);
    const call = alternatives[Math.floor(Math.random() * alternatives.length)] || choices[0];
    this.lastCall = call;
    const [minimum, maximum] = intervals[this.phase];
    const scheduleNext = () => {
      if (generation !== this.generation || !this.phase) return;
      this._schedule(minimum + Math.random() * (maximum - minimum), generation);
    };

    if (this.recordingPools[call]) {
      this._playRecording(call, scheduleNext);
    } else {
      this[`_${call}`](context.currentTime + 0.02);
      scheduleNext();
    }
  }

  _playRecording(kind, onFinished) {
    const clips = this.recordingPools[kind];
    let index;
    do {
      index = Math.floor(Math.random() * clips.length);
    } while (index === this.lastRecordingIndex[kind] && clips.length > 1);
    this.lastRecordingIndex[kind] = index;

    const recording = new Audio(clips[index]);
    recording.preload = 'none';
    const volumeScale = kind === 'cricket' ? 0.65 : 1;
    recording.volume = Math.min(1, this.volume * volumeScale * (0.8 + Math.random() * 0.35));
    recording.playbackRate = 0.96 + Math.random() * 0.08;
    this.activeAudio.add(recording);

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      this.activeAudio.delete(recording);
      onFinished();
    };
    recording.addEventListener('ended', finish, { once: true });
    recording.addEventListener('error', finish, { once: true });
    const playPromise = recording.play();
    if (playPromise) playPromise.catch(finish);
  }

  _stopRecordings() {
    this.activeAudio.forEach(recording => {
      recording.pause();
      recording.removeAttribute('src');
      recording.load();
    });
    this.activeAudio.clear();
  }

  _voice({ start, frequency, endFrequency = frequency, duration, gain, type = 'sine', pan = 0 }) {
    const context = this.context;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const panner = typeof context.createStereoPanner === 'function' ? context.createStereoPanner() : null;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), start + duration);
    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain * this.volume), start + 0.025);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(envelope);
    if (panner) {
      panner.pan.value = pan;
      envelope.connect(panner);
      panner.connect(context.destination);
    } else {
      envelope.connect(context.destination);
    }
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  }

  _songbird(start) {
    const pan = Math.random() * 1.6 - 0.8;
    const base = 1500 + Math.random() * 700;
    const notes = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < notes; i += 1) {
      this._voice({ start: start + i * 0.16, frequency: base * (0.9 + Math.random() * 0.25), endFrequency: base * 1.45, duration: 0.13, gain: 0.65, pan });
    }
  }

  _warbler(start) {
    const pan = Math.random() * 1.6 - 0.8;
    for (let i = 0; i < 6; i += 1) {
      const high = i % 2 === 0;
      this._voice({ start: start + i * 0.085, frequency: high ? 2350 : 1750, endFrequency: high ? 1850 : 2500, duration: 0.075, gain: 0.42, type: 'triangle', pan });
    }
  }

  _dove(start) {
    const pan = Math.random() * 1.2 - 0.6;
    [0, 0.38, 0.72].forEach((offset, index) => {
      this._voice({ start: start + offset, frequency: index ? 380 : 330, endFrequency: 285, duration: 0.31, gain: 0.48, pan });
    });
  }

  _cricket(start) {
    const pan = Math.random() * 1.8 - 0.9;
    const pulses = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < pulses; i += 1) {
      this._voice({ start: start + i * 0.055, frequency: 4100 + Math.random() * 500, duration: 0.035, gain: 0.22, type: 'square', pan });
    }
  }

  _owl(start) {
    const pan = Math.random() * 1.4 - 0.7;
    [0, 0.78].forEach((offset, index) => {
      this._voice({ start: start + offset, frequency: index ? 410 : 360, endFrequency: 245, duration: 0.58, gain: 0.7, pan });
      this._voice({ start: start + offset, frequency: index ? 615 : 540, endFrequency: 370, duration: 0.52, gain: 0.22, type: 'triangle', pan });
    });
  }
}
