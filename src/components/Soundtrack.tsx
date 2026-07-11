import { useState, useEffect, useRef } from 'react';

// Static variables outside component to manage the YouTube API loading state gracefully across renders
let apiLoaded = false;
let apiCallbacks: (() => void)[] = [];

function loadYoutubeAPI(callback: () => void) {
  const win = window as any;
  if (win.YT && win.YT.Player) {
    callback();
    return;
  }
  
  apiCallbacks.push(callback);
  
  if (!apiLoaded) {
    apiLoaded = true;
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    
    win.onYouTubeIframeAPIReady = () => {
      apiCallbacks.forEach(cb => cb());
      apiCallbacks = [];
    };
  }
}

interface SoundtrackProps {
  autoPlayTrigger: boolean;
}

export default function Soundtrack({ autoPlayTrigger }: SoundtrackProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.20);
  const [errorPlaying, setErrorPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);

  // Synchronize player setup and event listening
  useEffect(() => {
    let player: any = null;
    const win = window as any;

    loadYoutubeAPI(() => {
      player = new win.YT.Player('youtube-soundtrack-player', {
        height: '1',
        width: '1',
        videoId: 'VpNHCKYm4GM',
        playerVars: {
          autoplay: autoPlayTrigger ? 1 : 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          loop: 1,
          playlist: 'VpNHCKYm4GM', // Required by YouTube to enable loop functionality
          mute: 0,
          origin: win.location.origin
        },
        events: {
          onReady: (event: any) => {
            playerRef.current = event.target;
            setIsPlayerReady(true);
            event.target.setVolume(volume * 100);
            
            // If envelope is already opened when player gets ready, autoPlay action begins
            if (autoPlayTrigger) {
              const playPromise = event.target.playVideo();
              if (playPromise !== undefined && typeof playPromise.catch === 'function') {
                playPromise.catch((err: any) => {
                  console.log("Autoplay blocked:", err);
                  setErrorPlaying(true);
                });
              } else {
                setIsPlaying(true);
              }
            }
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING corresponds to 1
            if (event.data === 1) {
              setIsPlaying(true);
              setErrorPlaying(false);
            } else if (event.data === 2) {
              // YT.PlayerState.PAUSED corresponds to 2
              setIsPlaying(false);
            }
          },
          onError: (event: any) => {
            console.error("YouTube Player error:", event);
            setErrorPlaying(true);
          }
        }
      });
    });

    return () => {
      if (player && typeof player.destroy === 'function') {
        player.destroy();
      }
      playerRef.current = null;
    };
  }, []);

  // Sync volume state changes to the YouTube player
  useEffect(() => {
    if (playerRef.current && isPlayerReady && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.setVolume(volume * 100);
    }
  }, [volume, isPlayerReady]);

  // Handle autoPlay activation once high-level envelope triggers open
  useEffect(() => {
    if (autoPlayTrigger && playerRef.current && isPlayerReady) {
      try {
        playerRef.current.playVideo();
        setIsPlaying(true);
        setErrorPlaying(false);
      } catch (err) {
        console.warn("Autoplay was prevented by browser window frame constraints:", err);
        setErrorPlaying(true);
      }
    }
  }, [autoPlayTrigger, isPlayerReady]);

  const togglePlay = () => {
    if (!playerRef.current || !isPlayerReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      try {
        playerRef.current.playVideo();
        setIsPlaying(true);
        setErrorPlaying(false);
      } catch (err) {
        console.error("Playback failed:", err);
        setErrorPlaying(true);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 drop-shadow-xl font-sans" id="music-player-container">
      
      {/* Hidden iframe container targeted by YouTube library */}
      <div 
        id="youtube-soundtrack-player" 
        style={{ 
          position: 'absolute', 
          width: '0px', 
          height: '0px', 
          overflow: 'hidden',
          opacity: 0, 
          pointerEvents: 'none',
          bottom: 0,
          right: 0
        }} 
      />

      {errorPlaying && !isPlaying && (
        <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] px-3 py-1 rounded-md animate-bounce">
          Tap the music button to play!
        </span>
      )}

      <button
        id="soundtrack-toggle-btn"
        onClick={togglePlay}
        className={`flex items-center justify-center py-1.5 px-3 rounded-full border border-gold-500/30 backdrop-blur-md shadow-lg transition-all duration-300 active:scale-95 text-[8.5px] font-mono tracking-[0.15em] font-extrabold uppercase ${
          isPlaying
            ? 'bg-gold-500 text-stone-950 shadow-gold-500/20'
            : 'bg-stone-950/95 text-gold-300 hover:text-gold-100'
        }`}
        title={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        <span>{isPlaying ? "MUSIC ON" : "MUSIC OFF"}</span>
      </button>
    </div>
  );
}
