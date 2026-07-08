type AudioStateListener = (isPlaying: boolean, currentTrackIndex: number) => void;

export interface Track {
  title: string;
  artist: string;
}

/**
 * A beautiful, soft Web Audio API synthesizer for Pachelbel's Canon in D.
 * Acts as a 100% reliable fallback when external audio sources fail to load
 * due to network, sandbox, iframe security policies, or CORS.
 */
class CanonSynth {
  private ctx: AudioContext;
  private isPlaying = false;
  private timerId: any = null;
  private nextNoteTime = 0.0;
  private beatCount = 0;
  private tempo = 72; // BPM
  private secondsPerBeat = 60.0 / 72;

  // Roots of the Pachelbel Canon progression (D - A - Bm - F#m - G - D - G - A)
  private roots = [50, 45, 47, 42, 43, 38, 43, 45]; // MIDI Notes (D3, A2, B2, F#2, G2, D2, G2, A2)

  // Arpeggiation notes (root, 3rd, 5th, octave)
  private chords = [
    [62, 66, 69, 74], // D Major (D4, F#4, A4, D5)
    [61, 64, 69, 73], // A Major (C#4, E4, A4, C#5)
    [59, 62, 66, 71], // B Minor (B3, D4, F#4, B4)
    [57, 61, 66, 69], // F# Minor (A3, C#4, F#4, A4)
    [59, 62, 67, 71], // G Major (B3, D4, G4, B4)
    [57, 62, 66, 74], // D Major (A3, D4, F#4, D5)
    [59, 62, 67, 71], // G Major (B3, D4, G4, B4)
    [61, 64, 69, 73], // A Major (C#4, E4, A4, C#5)
  ];

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
  }

  public start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.nextNoteTime = this.ctx.currentTime + 0.1;
    this.beatCount = 0;
    this.scheduler();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private scheduler() {
    if (!this.isPlaying) return;
    while (this.nextNoteTime < this.ctx.currentTime + 0.2) {
      this.scheduleBeat(this.beatCount, this.nextNoteTime);
      this.advanceBeat();
    }
    this.timerId = setTimeout(() => this.scheduler(), 50);
  }

  private advanceBeat() {
    this.nextNoteTime += this.secondsPerBeat;
    this.beatCount = (this.beatCount + 1) % 32; // 8 chords * 4 beats = 32 beats
  }

  /**
   * Synthesizes a beautiful plucking sound (like a music box or soft organ).
   */
  private playPluck(midiNote: number, time: number, volume = 0.15, type: OscillatorType = 'triangle', decay = 1.5) {
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    // Warm low-pass filter to remove harsh high frequencies
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, time);
    
    osc.type = type;
    osc.frequency.setValueAtTime(this.midiToFreq(midiNote), time);
    
    // Volume envelope
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + decay);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(time);
    osc.stop(time + decay + 0.1);
  }

  private midiToFreq(note: number): number {
    return 440.0 * Math.pow(2.0, (note - 69.0) / 12.0);
  }

  private scheduleBeat(beat: number, time: number) {
    const chordIndex = Math.floor(beat / 4) % 8;
    const chordBeat = beat % 4;

    // 1. Play soft deep bass note on the first beat of each chord
    if (chordBeat === 0) {
      this.playPluck(this.roots[chordIndex], time, 0.25, 'triangle', 2.5);
    }

    // 2. Play beautiful arpeggiated bells/music box chords
    if (chordBeat === 0) {
      // Root triad note
      this.playPluck(this.chords[chordIndex][0], time, 0.10, 'sine', 1.8);
    } else if (chordBeat === 1) {
      // Third note
      this.playPluck(this.chords[chordIndex][1], time, 0.08, 'sine', 1.5);
    } else if (chordBeat === 2) {
      // Fifth note
      this.playPluck(this.chords[chordIndex][2], time, 0.08, 'sine', 1.5);
    } else if (chordBeat === 3) {
      // Octave or passing notes for melody variation
      const passNotes = [74, 73, 71, 69, 67, 66, 67, 69]; // Sweet passing melody notes
      this.playPluck(passNotes[chordIndex], time, 0.08, 'sine', 1.2);
    }
  }
}

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  private isPlaying = false;
  private listeners: Set<AudioStateListener> = new Set();
  private synth: CanonSynth | null = null;

  public readonly tracks: Track[] = [
    { title: 'Canon in D', artist: 'Kevin MacLeod' },
    { title: 'Canon in D (Orch.)', artist: 'Classical Orchestra' },
    { title: 'Canon in D Major', artist: 'Johann Pachelbel' },
    { title: 'Wedding Special', artist: 'Chosen Instrumental' }
  ];

  // High-availability, diverse, CORS-friendly media sources
  private sources = [
    'https://upload.wikimedia.org/wikipedia/commons/transcoded/2/22/Kevin_MacLeod_-_Canon_in_D_Major.ogg/Kevin_MacLeod_-_Canon_in_D_Major.ogg.mp3',
    'https://upload.wikimedia.org/wikipedia/commons/transcoded/d/da/Pachelbel%27s_Canon.ogg/Pachelbel%27s_Canon.ogg.mp3',
    'https://archive.org/download/PachelbelCanonInD_201610/Pachelbel%20Canon%20in%20D.mp3',
    'https://jumpshare.com/s/HBuzuXJ6F1FwGpINLWk1/download'
  ];
  private currentSourceIndex = 0;
  private isHandlingError = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.audio) return;

    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.preload = 'auto';

    // Set initial source
    this.audio.src = this.sources[this.currentSourceIndex];

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.notifyListeners();
    });

    // Handle loading or playback errors by falling back gracefully
    this.audio.addEventListener('error', (e) => {
      console.warn(`Audio error on source ${this.sources[this.currentSourceIndex]}. Trying next fallback.`, e);
      this.handleSourceError();
    });
  }

  private initAudioContext() {
    if (this.audioContext) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
      }
    } catch (e) {
      console.warn("Could not initialize AudioContext:", e);
    }
  }

  private handleSourceError() {
    if (!this.audio || this.isHandlingError) return;
    
    this.isHandlingError = true;
    this.currentSourceIndex++;
    
    if (this.currentSourceIndex < this.sources.length) {
      const wasPlaying = this.isPlaying;
      this.audio.src = this.sources[this.currentSourceIndex];
      this.notifyListeners(); // Notify UI to update song title
      this.audio.load();
      
      if (wasPlaying) {
        this.audio.play()
          .then(() => {
            this.isHandlingError = false;
          })
          .catch(err => {
            console.warn("Playback failed on fallback source:", err.message || err);
            this.isHandlingError = false;
            // The catch could be because of an interruption or genuine playback issue.
            // If it failed because of unsupported format/load error, the error event listener will trigger handleSourceError again anyway.
          });
      } else {
        this.isHandlingError = false;
      }
    } else {
      console.warn("All network audio sources failed to load. Activating offline Web Audio API Synthesizer fallback.");
      this.startSynth();
      this.isHandlingError = false;
    }
  }

  private startSynth() {
    this.initAudioContext();
    if (!this.audioContext) return;

    try {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      if (!this.synth) {
        this.synth = new CanonSynth(this.audioContext);
      }
      this.synth.start();
      this.isPlaying = true;
      this.notifyListeners();
    } catch (e) {
      console.error("Failed to start synthesizer fallback:", e);
    }
  }

  private stopSynth() {
    if (this.synth) {
      this.synth.stop();
    }
  }

  /**
   * Initializes or resumes the AudioContext and starts playback.
   * This must be called directly within a user-triggered gesture (like a click event).
   */
  public async unlockAndPlay(): Promise<void> {
    this.initAudio();
    this.initAudioContext();

    if (this.audioContext && this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch (e) {
        console.warn("Could not resume AudioContext:", e);
      }
    }

    if (this.currentSourceIndex >= this.sources.length) {
      // Network sources already exhausted, run the synth directly
      this.startSynth();
      return;
    }

    // Play the HTML5 Audio
    try {
      this.isPlaying = true;
      this.notifyListeners();
      if (this.audio) {
        await this.audio.play();
        console.log("Audio started playing successfully via user gesture!");
      }
    } catch (err) {
      console.warn("HTML5 audio playback blocked. Retrying or shifting to fallback.", err);
      this.handleSourceError();
    }
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
    this.stopSynth();
    this.isPlaying = false;
    this.notifyListeners();
  }

  public togglePlay(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.unlockAndPlay().catch(err => {
        console.error("Failed to play on toggle:", err);
      });
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrackIndex(): number {
    return this.currentSourceIndex;
  }

  public nextTrack(): void {
    if (!this.audio) return;
    const wasPlaying = this.isPlaying;
    this.currentSourceIndex = (this.currentSourceIndex + 1) % this.sources.length;
    
    // If synth was active, stop it
    this.stopSynth();
    
    this.audio.src = this.sources[this.currentSourceIndex];
    this.notifyListeners(); // Notify instantly so UI updates track metadata
    this.audio.load();
    
    if (wasPlaying) {
      this.audio.play().catch(err => {
        console.warn("Next track playback failed, falling back:", err);
        this.handleSourceError();
      });
    }
  }

  public prevTrack(): void {
    if (!this.audio) return;
    const wasPlaying = this.isPlaying;
    this.currentSourceIndex = (this.currentSourceIndex - 1 + this.sources.length) % this.sources.length;
    
    // If synth was active, stop it
    this.stopSynth();
    
    this.audio.src = this.sources[this.currentSourceIndex];
    this.notifyListeners(); // Notify instantly so UI updates track metadata
    this.audio.load();
    
    if (wasPlaying) {
      this.audio.play().catch(err => {
        console.warn("Previous track playback failed, falling back:", err);
        this.handleSourceError();
      });
    }
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying, this.currentSourceIndex);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.isPlaying, this.currentSourceIndex));
  }
}

export const audioManager = new AudioManager();
