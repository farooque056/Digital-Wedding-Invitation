import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function Countdown() {
  const targetDate = new Date('2026-08-06T11:00:00+05:30').getTime(); // 11:00 AM IST August 6, 2026

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  if (timeLeft.isOver) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center" id="countdown-completed">
        <div className="bg-gold-50 border border-gold-400 text-gold-800 text-sm font-serif italic py-3 px-6 rounded-full shadow-inner tracking-widest uppercase">
          🎉 Today is the Big Day! Celebrating Fathima Lena & Sharuq 🎉
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 py-4 w-full" id="countdown-block-wrapper">
      <div className="flex items-center gap-2 text-gold-300 font-serif text-xs uppercase tracking-[0.3em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <Clock className="h-3.5 w-3.5 text-gold-400 animate-pulse" />
        <span>Countdown to the Nikkah</span>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-5 max-w-sm sm:max-w-lg w-full justify-center px-2">
        {timeBlocks.map((block) => (
          <div
            key={block.label}
            className="group relative flex flex-col items-center justify-center bg-stone-950/80 backdrop-blur-md p-3 sm:p-5 rounded-2xl border border-gold-400/40 shadow-[0_8px_32px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-gold-300 hover:scale-105 overflow-hidden"
          >
            {/* Elegant glowing top & bottom accents */}
            <div className="absolute top-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-gold-300/80 to-transparent" />
            <div className="absolute bottom-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
            
            {/* Subtle background radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="text-2xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gold-100 to-gold-300 tracking-tight leading-none drop-shadow-[0_2px_10px_rgba(235,216,170,0.3)] relative z-10">
              {String(block.value).padStart(2, '0')}
            </div>
            
            <div className="text-[9px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-gold-400/90 font-medium mt-2 relative z-10">
              {block.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
