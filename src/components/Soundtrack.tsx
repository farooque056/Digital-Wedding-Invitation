import { useState, useEffect } from 'react';
import { Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';
import { audioManager } from '../lib/audioManager';

interface SoundtrackProps {
  autoPlayTrigger: boolean;
}

export default function Soundtrack({ autoPlayTrigger }: SoundtrackProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Subscribe to audioManager state changes to keep the UI in sync
  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing, trackIdx) => {
      setIsPlaying(playing);
      setCurrentTrackIndex(trackIdx);
      if (playing) {
        setHasInteracted(true);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle autoPlay trigger when the invitation envelope opens
  useEffect(() => {
    if (autoPlayTrigger && !audioManager.getIsPlaying()) {
      audioManager.unlockAndPlay().catch((err) => {
        console.warn("Autoplay trigger blocked by browser. User interaction needed:", err);
      });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    audioManager.togglePlay();
    setHasInteracted(true);
  };

  const handleNextTrack = () => {
    audioManager.nextTrack();
    setHasInteracted(true);
  };

  const handlePrevTrack = () => {
    audioManager.prevTrack();
    setHasInteracted(true);
  };

  const currentTrack = audioManager.tracks[currentTrackIndex] || { title: 'Wedding Special', artist: 'Chosen Instrumental' };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 drop-shadow-2xl font-sans" id="music-player-container">
      
      {/* Tap prompt if user might need to click to start audio (due to browser autoplay restrictions) */}
      {!isPlaying && hasInteracted && (
        <span className="bg-stone-900/90 backdrop-blur-sm text-gold-300 border border-gold-500/30 text-[10px] px-3 py-1 rounded-md animate-bounce shadow-md tracking-wider">
          Tap the music button to play music!
        </span>
      )}

      {/* Main Controls Pill */}
      <div className="flex items-center gap-1.5 bg-stone-950/95 backdrop-blur-md border border-gold-500/30 rounded-full p-1.5 shadow-[0_4px_25px_rgba(212,175,55,0.15)] hover:border-gold-400/50 transition-all duration-300">
        
        {/* Previous Song button */}
        <button
          onClick={handlePrevTrack}
          className="flex items-center justify-center p-2 rounded-full bg-stone-900/60 text-gold-300 hover:text-gold-100 hover:bg-stone-900 transition-all duration-300 active:scale-95"
          title="Previous Track"
        >
          <SkipBack size={13} />
        </button>

        {/* Play / Pause button */}
        <button
          onClick={togglePlay}
          className={`flex items-center justify-center p-2.5 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 ${
            isPlaying
              ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-stone-950 shadow-md shadow-gold-500/20'
              : 'bg-stone-900 text-gold-300 hover:text-gold-100'
          }`}
          title={isPlaying ? "Mute Background Music" : "Play Background Music"}
        >
          {isPlaying ? <Volume2 size={14} className="animate-pulse" /> : <VolumeX size={14} />}
        </button>

        {/* Next Song button */}
        <button
          onClick={handleNextTrack}
          className="flex items-center justify-center p-2 rounded-full bg-stone-900/60 text-gold-300 hover:text-gold-100 hover:bg-stone-900 transition-all duration-300 active:scale-95"
          title="Next Track"
        >
          <SkipForward size={13} />
        </button>

        {/* Current Song Title */}
        <div className="px-2 py-0.5 pr-3 text-left select-none max-w-[150px]">
          <p className="text-[7.5px] font-mono tracking-[0.2em] text-gold-400 font-extrabold uppercase leading-none">
            {isPlaying ? "NOW PLAYING" : "MUSIC PAUSED"}
          </p>
          <p className="text-[10px] font-serif text-white truncate mt-0.5 font-semibold leading-tight">
            {currentTrack.title}
          </p>
          <p className="text-[8px] font-sans text-stone-400 truncate leading-none mt-0.5">
            {currentTrack.artist}
          </p>
        </div>

        {/* Animated wave visualizer bars when music is active */}
        {isPlaying && (
          <div className="flex items-end gap-[1.5px] h-3.5 pr-2.5">
            <span className="w-[1.2px] h-2 bg-gold-400 animate-pulse rounded-full" style={{ animationDelay: '0s' }} />
            <span className="w-[1.2px] h-3.5 bg-gold-400 animate-pulse rounded-full" style={{ animationDelay: '0.15s' }} />
            <span className="w-[1.2px] h-1.5 bg-gold-400 animate-pulse rounded-full" style={{ animationDelay: '0.3s' }} />
          </div>
        )}
      </div>

    </div>
  );
}
