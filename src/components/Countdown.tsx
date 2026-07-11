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
            className="flex flex-col items-center justify-center bg-stone-900/30 backdrop-blur-xs py-4 px-2 rounded-lg border border-white/10"
          >
            <div className="text-2xl sm:text-4xl font-serif font-light text-white tracking-tight leading-none">
              {String(block.value).padStart(2, '0')}
            </div>
            
            <div className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.2em] text-gold-300/80 mt-2">
              {block.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
