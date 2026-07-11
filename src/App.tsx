import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Calendar, Sparkles } from 'lucide-react';
import Envelope from './components/Envelope';
import Soundtrack from './components/Soundtrack';
import Countdown from './components/Countdown';
import Couple from './components/Couple';
import Venue from './components/Venue';
import AcceptCard from './components/AcceptCard';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [petals, setPetals] = useState<{ id: number; left: string; delay: string; duration: string; size: string }[]>([]);

  // Generate falling rose petals on load
  useEffect(() => {
    const generatedPetals = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${8 + Math.random() * 12}s`,
      size: `${8 + Math.random() * 12}px`,
    }));
    setPetals(generatedPetals);
  }, []);

  return (
    <div className="min-h-screen bg-pattern-wedding text-stone-800 font-sans relative overflow-x-hidden" id="wedding-app-root">
      
      {/* 1. Envelope Gatekeeper */}
      <AnimatePresence mode="wait">
        {!isEnvelopeOpen && (
          <Envelope onOpen={() => setIsEnvelopeOpen(true)} />
        )}
      </AnimatePresence>

      {/* 2. Main Wedding Website Content (Unfolds after envelope opens) */}
      {isEnvelopeOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative min-h-screen animate-fade-in"
        >
          {/* Ambient Luxury Page Background Glow Layer */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold-500/10 rounded-full filter blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-rose-900/15 rounded-full filter blur-[140px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            <div className="absolute top-2/3 left-1/3 w-[30rem] h-[30rem] bg-gold-400/5 rounded-full filter blur-[150px]" />
          </div>

          {/* Floating Sound Controller */}
          <Soundtrack autoPlayTrigger={isEnvelopeOpen} />

          {/* Falling Organic Rose Petals */}
          <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" id="rose-petals-layer">
            {petals.map((petal) => (
              <div
                key={petal.id}
                className="absolute bg-rose-400 opacity-30 animate-petal-fall"
                style={{
                  left: petal.left,
                  width: petal.size,
                  height: petal.size,
                  animationDelay: petal.delay,
                  animationDuration: petal.duration,
                  borderRadius: '50% 0 50% 50%', // Perfect organic petal shape
                  background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
                }}
              />
            ))}
          </div>

          {/* Elegant Top Header Navigation (Simplified without removed sections) */}
          <header className="sticky top-0 z-40 bg-stone-50/80 backdrop-blur-md border-b border-gold-500/10 py-5 px-6 shadow-xs select-none">
            <div className="max-w-6xl mx-auto flex items-center justify-center">
              {/* Branding Monogram initials logo */}
              <a href="#hero" className="font-serif font-black text-gold-600 tracking-wider text-2xl hover:scale-105 transition-transform flex items-center gap-2">
                F ⚭ S
              </a>
            </div>
          </header>

          {/* 3. Hero Section */}
          <section id="hero" className="min-h-[85vh] flex flex-col justify-center items-center py-20 px-4 relative select-none overflow-hidden">
            {/* Background Video Layer */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-40 mix-blend-lighten">
              <iframe
                loading="lazy"
                title="Gumlet video player"
                src="https://play.gumlet.io/embed/6a2a293ee9db499e93efe325?background=true&autoplay=true&loop=true&disable_player_controls=true"
                className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-full min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 scale-105 border-0"
                referrerPolicy="origin"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
              />
              <div className="absolute inset-0 bg-[#0a0a0a]/40" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
            </div>

            <div className="absolute top-8 inset-x-0 flex justify-center opacity-35">
              <Heart className="h-6 w-6 text-rose-500 fill-rose-500/85 animate-pulse" />
            </div>

            <div className="text-center max-w-4xl relative z-10 flex flex-col items-center px-4">
              <span className="text-gold-400 font-mono text-[10px] uppercase tracking-[0.4em] block mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                The Nikkah Of
              </span>
              
              {/* Bride & Groom Main Callout - High-end Luxury Layout */}
              <h1 className="font-cinzel-dec text-3xl sm:text-4xl md:text-5.5xl font-normal tracking-[0.18em] uppercase leading-relaxed max-w-lg md:max-w-4xl mx-auto select-none transition-all duration-1000 hover:scale-[1.01] mb-6 drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
                <span className="inline-block font-cinzel-dec text-transparent bg-clip-text bg-gradient-to-b from-white via-stone-100 to-gold-200 font-normal">
                  Fathima Lena
                </span>
                <span className="block md:inline-block font-pinyon text-5xl sm:text-6xl md:text-7xl text-gold-300 normal-case tracking-normal my-2 md:my-0 md:mx-5 drop-shadow-[0_2px_15px_rgba(235,216,170,0.6)] align-middle">
                  &amp;
                </span>
                <span className="inline-block font-cinzel-dec text-transparent bg-clip-text bg-gradient-to-b from-white via-stone-100 to-gold-200 font-normal">
                  Sharuq
                </span>
              </h1>

              {/* Delicate line divider */}
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold-400/60 to-transparent mb-6" />

              {/* Elegant Date specification */}
              <div className="mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] flex flex-col items-center gap-2">
                <span className="font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase text-gold-200 font-light text-center">
                  Thursday <span className="text-gold-400/60 mx-1.5">•</span> 6th August, 2026 <span className="text-gold-400/60 mx-1.5">•</span> 11:00 AM - 3:00 PM
                </span>
                <span className="font-serif italic text-xs tracking-[0.2em] text-gold-300/80">
                  [23 Safar 1448 Hijri]
                </span>
              </div>

              {/* Real ticking Countdown board with cinematic shadow */}
              <div className="w-full drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)]">
                <Countdown />
              </div>
            </div>
          </section>

          {/* Divider with elegant line and heart medallion */}
          <div className="relative flex items-center justify-center my-12" id="divider-1">
            <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-gold-550/20 to-transparent" />
            <Heart className="h-4 w-4 text-rose-500/40 absolute fill-rose-500/5 rotate-12" />
          </div>

          {/* 4. Meet the Couple Section */}
          <Couple />

          {/* Divider with elegant line and heart medallion */}
          <div className="relative flex items-center justify-center my-12" id="divider-couple-venue">
            <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-gold-550/20 to-transparent" />
            <Heart className="h-4 w-4 text-rose-500/40 absolute fill-rose-500/5 rotate-45" />
          </div>

          {/* 5. Wedding Venue Section */}
          <Venue />

          {/* Divider with elegant line and heart medallion */}
          <div className="relative flex items-center justify-center my-12" id="divider-2">
            <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-gold-550/20 to-transparent" />
            <Heart className="h-4 w-4 text-rose-500/40 absolute fill-rose-500/5 -rotate-12" />
          </div>

          {/* 6. Accept Card Section */}
          <AcceptCard />

          {/* Divider with elegant line and heart medallion */}
          <div className="relative flex items-center justify-center my-12" id="divider-accept-footer">
            <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-gold-550/20 to-transparent" />
            <Heart className="h-4 w-4 text-rose-500/40 absolute fill-rose-500/5 rotate-12" />
          </div>

          {/* Elegant Footer */}
          <footer className="bg-gradient-to-b from-[#131115] via-[#0b0a0d] to-[#060507] text-stone-400 font-sans text-xs py-16 px-6 border-t border-gold-400/30 select-none relative overflow-hidden">
            {/* Subtle background radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />
            
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 relative z-10">
              
              {/* Golden script final greeting */}
              <h3 className="font-script text-4xl text-gold-300 font-normal">
                Thank You
              </h3>
              
              <p className="text-gold-200/70 font-serif italic text-sm mt-1 max-w-md">
                "We thank you with all of our souls for your prayers, warmth, and supportive love in launching this chapter of our lives together."
              </p>
            </div>
          </footer>

        </motion.div>
      )}

    </div>
  );
}
