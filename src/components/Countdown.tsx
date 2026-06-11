import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function Countdown() {
  const targetDate = new Date('2026-06-14T09:30:00+05:30').getTime(); // 09:30 AM IST Calicut Kerala

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
          🎉 Today is the Big Day! Celebrating Sinan & Fahmida 🎉
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-4 w-full" id="countdown-block-wrapper">
      <div className="flex items-center gap-2 text-stone-500 font-sans text-[11px] uppercase tracking-widest mb-1.5">
        <Clock className="h-3.5 w-3.5 text-gold-600 animate-pulse" />
        <span>Countdown to the Nikah</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-sm sm:max-w-md w-full justify-center">
        {timeBlocks.map((block) => (
          <div
            key={block.label}
            className="flex flex-col items-center bg-white/75 backdrop-blur-sm p-2 sm:p-4 rounded-xl border border-gold-500/15 shadow-[0_4px_12px_rgba(197,160,89,0.06)] relative overflow-hidden"
          >
            {/* Soft inner floral design hint */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />
            
            <div className="text-xl sm:text-3xl font-serif font-black text-stone-850 tracking-tight leading-none">
              {String(block.value).padStart(2, '0')}
            </div>
            
            <div className="text-[9px] sm:text-[10px] font-sans uppercase tracking-widest text-gold-700 font-medium mt-1">
              {block.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
