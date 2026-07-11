import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface WaxSeal {
  id: number;
  type: 'accept' | 'decline';
  label: string;
  subLabel: string;
  x: number; // percentage width
  y: number; // percentage height
  rotate: number;
  scale: number;
}

export default function AcceptCard() {
  const [status, setStatus] = useState<'accept' | 'decline'>('accept');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [seals, setSeals] = useState<WaxSeal[]>([]);

  // Joyful elegant phrases for romantic wax seals
  const acceptPhrases = [
    { label: "YES!", subLabel: "With Love" },
    { label: "YAY!", subLabel: "So Thrilled" },
    { label: "JOY!", subLabel: "Counting Days" },
    { label: "IN!", subLabel: "Celebration" },
    { label: "YES!", subLabel: "See You There" },
    { label: "LOVE!", subLabel: "Pure Joy" }
  ];

  // Soft elegant regret phrases for calming wax seals
  const declinePhrases = [
    { label: "SADLY", subLabel: "Miss It" },
    { label: "PEACE", subLabel: "Blessings" },
    { label: "WARMTH", subLabel: "In Heart" },
    { label: "SADLY", subLabel: "Sending Love" },
    { label: "PEACE", subLabel: "With You" }
  ];

  const handleOptionClick = (type: 'accept' | 'decline') => {
    if (isSubmitting) return;
    setStatus(type);

    // Pick a phrase randomly
    const phrases = type === 'accept' ? acceptPhrases : declinePhrases;
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    // Generate coordinates safely within the interactive card boundaries
    const randomX = 15 + Math.random() * 70;
    const randomY = 12 + Math.random() * 55;
    const randomRotate = (Math.random() - 0.5) * 36; // -18 to +18 deg
    const randomScale = 0.9 + Math.random() * 0.25;

    const newId = Date.now() + Math.random();
    const newSeal: WaxSeal = {
      id: newId,
      type,
      label: randomPhrase.label,
      subLabel: randomPhrase.subLabel,
      x: randomX,
      y: randomY,
      rotate: randomRotate,
      scale: randomScale
    };

    setSeals(prev => [...prev, newSeal]);

    // Automatically dismiss the seal after 2 seconds
    setTimeout(() => {
      setSeals(prev => prev.filter(s => s.id !== newId));
    }, 2000);

    // Auto RSVP directly on tap! Delightful, simple, and sleek.
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1300);
  };

  const handleReset = () => {
    setStatus('accept');
    setIsSubmitted(false);
    setSeals([]);
  };

  return (
    <section id="accept-card" className="py-20 px-4 max-w-2xl mx-auto select-none font-sans">
      {/* Structural Title Section */}
      <div className="text-center mb-10">
        <span className="text-gold-700 font-mono text-[9px] uppercase tracking-[0.3em] font-semibold block mb-2">
          GUEST PRESENCE
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-extralight tracking-wide">
          Join the Celebration
        </h2>
        <div className="h-[1.5px] w-12 bg-gold-400 mx-auto mt-4" />
      </div>

      <div className="relative min-h-[380px] flex items-center justify-center">
        {/* Dynamic Spawned Wax Seals Canvas */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          <AnimatePresence>
            {seals.map((seal) => (
              <motion.div
                key={seal.id}
                initial={{ scale: 0, rotate: seal.rotate * 1.8, opacity: 0 }}
                animate={{ scale: seal.scale, rotate: seal.rotate, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, y: -20 }}
                transition={{ type: 'spring', damping: 12, stiffness: 190 }}
                style={{
                  position: 'absolute',
                  left: `${seal.x}%`,
                  top: `${seal.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="pointer-events-auto cursor-pointer group"
                onClick={() => {
                  setSeals(prev => prev.filter(s => s.id !== seal.id));
                }}
              >
                {seal.type === 'accept' ? (
                  /* Red/Rose Burgundy Royal Wax Seal */
                  <div className="relative w-24 h-24 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95">
                    {/* Outer melting shape */}
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-rose-600 to-rose-800 rounded-full opacity-90 shadow-md border border-rose-400/20" />
                    {/* Inner gold/crimson highlight border */}
                    <div className="absolute inset-2 rounded-full border border-dashed border-rose-300/30 flex flex-col items-center justify-center p-2 text-center select-none bg-rose-700/60 shadow-inner">
                      <Sparkles className="h-2.5 w-2.5 text-gold-300 mb-0.5 opacity-85" />
                      <span className="text-[10px] font-serif font-bold text-rose-50 uppercase tracking-widest leading-none">
                        {seal.label}
                      </span>
                      <span className="text-[7px] font-mono uppercase tracking-[0.15em] text-gold-200/90 mt-1 scale-90">
                        {seal.subLabel}
                      </span>
                      <div className="text-[6px] text-rose-200 font-serif mt-1">❤</div>
                    </div>
                  </div>
                ) : (
                  /* Sage Teal/Gold Quiet Wax Seal */
                  <div className="relative w-24 h-24 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95">
                    {/* Outer melting shape */}
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-600 via-stone-700 to-stone-850 rounded-full opacity-90 shadow-md border border-stone-500/20" />
                    {/* Inner pale-gold highlight border */}
                    <div className="absolute inset-2 rounded-full border border-dashed border-stone-500/30 flex flex-col items-center justify-center p-2 text-center select-none bg-stone-850/80 shadow-inner">
                      <span className="text-xs mb-0.5 opacity-85">🕊️</span>
                      <span className="text-[10px] font-serif font-bold text-stone-100 uppercase tracking-widest leading-none">
                        {seal.label}
                      </span>
                      <span className="text-[7px] font-mono uppercase tracking-[0.1em] text-gold-300/80 mt-1 scale-90">
                        {seal.subLabel}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="rsvp-clean-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5 }}
              className="w-full bg-gradient-to-b from-stone-900/95 via-stone-950/95 to-black/95 backdrop-blur-xl border border-gold-400/40 rounded-3xl p-7 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden group"
            >
              {/* Top & Bottom Glowing Golden Lines */}
              <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-gold-300/80 to-transparent" />
              <div className="absolute bottom-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

              {/* Ambient Radial Background Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gold-500/15 via-transparent to-transparent opacity-70 pointer-events-none" />

              {/* Decorative Corner Borders */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-gold-400/40 rounded-tl-3xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-gold-400/40 rounded-tr-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-gold-400/40 rounded-bl-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-gold-400/40 rounded-br-3xl pointer-events-none" />

              <div className="space-y-8 relative z-10">
                {/* Instant Action Header */}
                <div className="text-center space-y-2">
                  <span className="inline-block text-gold-300 font-serif text-xs uppercase tracking-[0.3em] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Kindly Respond
                  </span>
                  <p className="text-[11px] text-stone-400/90 font-mono uppercase tracking-[0.2em]">
                    Tap an option below to stamp your wax seal 👇
                  </p>
                </div>
                  
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* JOYFUL ACCEPT BUTTON - Rich Rose Gold Variety */}
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleOptionClick('accept')}
                    className={`group/btn flex flex-col items-center justify-center text-center p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                      status === 'accept' && isSubmitting
                        ? 'bg-rose-950/40 border-rose-400 text-rose-200 scale-95 shadow-[0_0_30px_rgba(244,63,94,0.3)]'
                        : 'bg-gradient-to-b from-rose-950/30 via-stone-900/80 to-stone-950/90 border-rose-500/30 hover:border-rose-400/70 hover:shadow-[0_10px_35px_rgba(244,63,94,0.18)] hover:-translate-y-1'
                    }`}
                  >
                    <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-rose-400/40 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      className={`w-14 h-14 rounded-full mb-4 flex items-center justify-center border shadow-lg transition-all ${
                        status === 'accept' && isSubmitting
                          ? 'bg-rose-500/30 border-rose-300 text-rose-300 animate-pulse'
                          : 'bg-gradient-to-br from-rose-900/60 to-stone-900 border-rose-400/50 text-rose-400 group-hover/btn:border-rose-300 group-hover/btn:text-rose-300'
                      }`}
                    >
                      <Heart className="h-6 w-6 fill-current drop-shadow-[0_2px_8px_rgba(244,63,94,0.5)]" />
                    </motion.div>
                    
                    <span className="font-serif text-lg font-medium tracking-wide text-white text-center block w-full group-hover/btn:text-rose-100 transition-colors">
                      {isSubmitting && status === 'accept' ? 'Sealing Presence...' : 'Joyfully Accepts'}
                    </span>
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-rose-300/80 mt-2 text-center block w-full">
                      Looking Forward! ♥
                    </span>
                  </button>

                  {/* DECLINES WITH REGRETS BUTTON - Elegant Pearl Stone Variety */}
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleOptionClick('decline')}
                    className={`group/btn flex flex-col items-center justify-center text-center p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                      status === 'decline' && isSubmitting
                        ? 'bg-stone-900/90 border-gold-400/50 text-stone-200 scale-95 shadow-[0_0_30px_rgba(235,216,170,0.15)]'
                        : 'bg-gradient-to-b from-stone-900/80 via-stone-950/90 to-black/90 border-gold-500/25 hover:border-gold-300/60 hover:shadow-[0_10px_35px_rgba(235,216,170,0.1)] hover:-translate-y-1'
                    }`}
                  >
                    <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-gold-300/40 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: -6 }}
                      className={`w-14 h-14 rounded-full mb-4 flex items-center justify-center border shadow-lg transition-all ${
                        status === 'decline' && isSubmitting
                          ? 'bg-stone-800 border-gold-400 text-gold-300'
                          : 'bg-gradient-to-br from-stone-850 to-stone-950 border-gold-400/40 text-gold-300 group-hover/btn:border-gold-300'
                      }`}
                    >
                      <span className="text-xl leading-none drop-shadow">🕊️</span>
                    </motion.div>
                    
                    <span className="font-serif text-lg font-medium tracking-wide text-white text-center block w-full group-hover/btn:text-gold-100 transition-colors">
                      {isSubmitting && status === 'decline' ? 'Sending Regrets...' : 'Declines with Regrets'}
                    </span>
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gold-400/80 mt-2 text-center block w-full">
                      Respectfully Absent 🕊️
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Elegant Response Confirmed Screen */
            <motion.div
              key="rsvp-receipt-card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 180 }}
              className="w-full bg-gradient-to-b from-stone-900/95 via-stone-950/95 to-black/95 backdrop-blur-xl border border-gold-400/40 rounded-3xl p-8 md:p-14 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative text-center overflow-hidden"
            >
              {/* Confetti & Particle Effects for Joyful accepts */}
              {status === 'accept' && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={`gold-dust-${i}`}
                      initial={{
                        opacity: 0,
                        x: `${12 + Math.random() * 76}%`,
                        y: '105%',
                        scale: 0.3 + Math.random() * 0.6,
                      }}
                      animate={{
                        opacity: [0, 0.9, 0.9, 0],
                        y: ['105%', '-10%'],
                      }}
                      transition={{
                        duration: 3.5 + Math.random() * 3,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: 'easeInOut',
                      }}
                      className="absolute text-gold-400"
                    >
                      {i % 3 === 0 ? '✨' : i % 3 === 1 ? '🌸' : '♥'}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Serene quiet particle waves for decline */}
              {status === 'decline' && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={`decline-particle-${i}`}
                      initial={{
                        opacity: 0,
                        x: `${15 + Math.random() * 70}%`,
                        y: '100%',
                        scale: 0.5 + Math.random() * 0.5,
                      }}
                      animate={{
                        opacity: [0, 0.6, 0.6, 0],
                        y: ['100%', '5%'],
                      }}
                      transition={{
                        duration: 5 + Math.random() * 3,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: 'easeInOut',
                      }}
                      className="absolute text-stone-500"
                    >
                      🕊️
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Receipt Content container */}
              <div className="relative z-10 flex flex-col items-center">
                {status === 'accept' ? (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 1.08, 1],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-20 h-20 bg-rose-500/10 border border-rose-450/30 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Heart className="h-9 w-9 text-rose-500 fill-rose-500/80" />
                    </motion.div>

                    <span className="text-gold-500 font-mono text-[9px] uppercase tracking-[0.3em] font-bold block mb-2 mt-6">
                      SEALED WITH LOVE
                    </span>
                    <h3 className="font-serif text-3xl text-gold-300 font-extralight tracking-wide mb-3">
                      Thrilled to have you!
                    </h3>

                    <p className="text-stone-300 font-serif leading-relaxed text-sm antialiased max-w-sm mx-auto mb-8">
                      "We copy that joyful 'YES'! We are absolutely delighted to celebrate this memorable day with you. Your presence will warm our hearts!"
                    </p>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-20 h-20 bg-stone-900/40 border border-stone-850 rounded-full flex items-center justify-center shadow-lg text-3xl"
                    >
                      🕊️
                    </motion.div>

                    <span className="text-gold-500 font-mono text-[9px] uppercase tracking-[0.3em] font-bold block mb-2 mt-6">
                      PEACE & LOVE ALWAYS
                    </span>
                    <h3 className="font-serif text-3xl text-gold-300 font-extralight tracking-wide mb-3">
                      Thank you!
                    </h3>

                    <p className="text-stone-300 font-serif leading-relaxed text-sm antialiased max-w-sm mx-auto mb-8">
                      "Your sweet blessings are gracefully received. Though we will miss your face, we deeply feel your warm wishes of pure peace and love."
                    </p>
                  </>
                )}

                <div className="h-[1px] w-12 bg-gold-400/30 my-4" />

                <button
                  onClick={handleReset}
                  className="bg-gold-500 hover:bg-gold-400 text-stone-950 font-serif text-[10px] uppercase tracking-[0.2em] py-3 px-6 rounded-full border border-gold-500/15 transition-all duration-300 shadow-md font-bold"
                >
                  Change Response
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
