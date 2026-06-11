import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isLetterOut, setIsLetterOut] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    // Sequence: 1s to break seal and fold open, 1.2s to slide card, then complete opening
    setTimeout(() => {
      setIsLetterOut(true);
    }, 1200);

    setTimeout(() => {
      onOpen();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900 overflow-hidden font-sans select-none" id="wedding-envelope-screen">
      {/* Elegantly floating candle light / bokeh rings on background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#4c0f20,transparent_70%)] opacity-80" />
      <div className="absolute top-24 left-24 w-72 h-72 bg-gold-500/5 rounded-full filter blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-24 right-24 w-72 h-72 bg-rose-500/5 rounded-full filter blur-[100px] animate-shimmer" style={{ animationDuration: '10s' }} />

      {/* Decorative floral elements on corners */}
      <div className="absolute top-0 left-0 w-48 h-48 border-t-2 border-l-2 border-gold-500/20 m-6 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 border-b-2 border-r-2 border-gold-500/20 m-6 rounded-br-3xl pointer-events-none" />

      {/* Main Container */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.08, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg px-4 flex flex-col items-center justify-center"
      >
        {/* Top greeting above envelope */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isOpening ? { opacity: 0, y: -45, scale: 0.95 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.15em" }}
            animate={{ opacity: 0.85, letterSpacing: "0.25em" }}
            transition={{ delay: 0.2, duration: 1.2 }}
            className="text-gold-400 font-mono text-[10px] uppercase block mb-2"
          >
            YOU ARE CORDIALLY INVITED TO THE CELEBRATION
          </motion.span>
          <h2 className="text-3xl md:text-4.5xl font-serif text-gold-100 font-extralight tracking-wider leading-relaxed">
            The Wedding of
            <span className="block gold-text font-serif font-normal mt-1 italic tracking-wide">
              Sinan & Fahmida
            </span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-500/30" />
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <Heart className="h-3 w-3 text-rose-500/60 fill-rose-500/30" />
            </motion.div>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-500/30" />
          </div>
        </motion.div>

        {/* The Envelope */}
        <motion.div 
          className="relative w-full aspect-[4/3] bg-stone-900 rounded-xl shadow-2xl border border-gold-500/15 overflow-visible"
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Back side of envelope / Deep Burgundy cavity */}
          <div className="absolute inset-0 bg-burgundy-900 rounded-xl overflow-hidden border border-gold-500/10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#4a1023_0%,#28030f_100%)]" />
          </div>

          {/* Invitation letter (Slides UP on open) */}
          <motion.div
            initial={{ y: 0 }}
            animate={isLetterOut ? { y: '-100%', scale: 1.02 } : isOpening ? { y: '-10%' } : { y: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 55 }}
            className="absolute inset-[8%] bg-white rounded-lg shadow-lg flex flex-col items-center justify-between p-6 overflow-hidden border border-stone-100"
          >
            {/* Elegant Floral watermark background inside paper */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,#c5a059_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            {/* Elegant border inside paper */}
            <div className="absolute inset-2 border border-gold-500/20 rounded-md pointer-events-none" />

            {/* Content of invite card */}
            <div className="flex flex-col items-center text-center mt-2 w-full">
              <span className="text-[9px] font-mono tracking-[0.2em] text-stone-400 uppercase">Save the Date</span>
              <div className="h-[1px] w-8 bg-gold-500/30 my-1.5" />
              <p className="text-[12px] font-serif italic text-gold-600">Together with their families</p>
              
              <h3 className="text-2xl font-serif text-stone-800 font-medium tracking-tight mt-3">
                Sinan & Fahmida
              </h3>
              
              <p className="text-[10px] text-stone-500 font-sans tracking-wide mt-2 max-w-[80%] uppercase text-center font-light leading-relaxed">
                Nikah Ceremony & Wedding Feast
              </p>
            </div>

            <div className="flex flex-col items-center text-center w-full mb-2">
              <span className="text-xs font-serif text-gold-700 tracking-wider font-semibold">14th JUNE, 2026</span>
              <span className="text-[9px] font-sans text-stone-400 uppercase tracking-widest mt-1">Manjeri, Kerala</span>
              <div className="h-[1px] w-8 bg-gold-500/30 my-1.5" />
              <span className="text-[9px] font-mono tracking-widest text-[#b33951] uppercase flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5" /> Invitation Card Inside
              </span>
            </div>
          </motion.div>

          {/* Envelope lower triangular folds / overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            {/* Bottom triangular card fold */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-burgundy-800/95 border-t border-gold-500/10 shadow-[0_-8px_16px_rgba(0,0,0,0.3)]"
              style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}
            />
            {/* Left triangular card fold */}
            <div 
              className="absolute left-0 bottom-0 top-0 w-1/2 bg-burgundy-800/90 border-r border-gold-500/10"
              style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }}
            />
            {/* Right triangular card fold */}
            <div 
              className="absolute right-0 bottom-0 top-0 w-1/2 bg-burgundy-800/90 border-l border-gold-500/10"
              style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)' }}
            />
          </div>

          {/* Top flap (folds upwards) */}
          <motion.div
            style={{ 
              originY: 0,
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            }}
            animate={isOpening ? { rotateX: 180, zIndex: 0, filter: 'brightness(0.6)' } : { rotateX: 0, zIndex: 10 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-burgundy-700 border-b border-gold-500/20 shadow-md flex items-start justify-center pt-2 select-none"
          >
            <div className="text-center opacity-40">
              <Mail className="h-5 w-5 text-gold-200" />
            </div>
          </motion.div>

          {/* Wax Seal (Sits in the middle, breaks / disappears on open) */}
          <AnimatePresence>
            {!isOpening && (
              <motion.button
                id="envelope-seal-btn"
                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                onClick={handleOpenClick}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
              >
                <div className="relative">
                  {/* Subtle pulsing rings around seal */}
                  <motion.div 
                    className="absolute -inset-5 rounded-full border border-gold-400/40"
                    animate={{ scale: [1, 1.22, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                  <div className="absolute -inset-2 rounded-full bg-amber-400/10 filter blur-md group-hover:bg-amber-400/25 transition-all duration-300" />

                  {/* 3D Wax stamp rendering */}
                  <div className="w-18 h-18 bg-rose-700 hover:bg-rose-600 rounded-full border-4 border-gold-500/60 shadow-[0_6px_20px_rgba(0,0,0,0.6)] flex items-center justify-center p-1.5 transition-all duration-300 relative select-none">
                    {/* Ring inside seal */}
                    <div className="w-full h-full rounded-full border-1.5 border-dashed border-gold-200/50 flex flex-col items-center justify-center">
                      <span className="text-[12px] font-serif font-black tracking-widest text-gold-100 mt-0.5">S ⚭ F</span>
                      <span className="text-[6px] font-mono text-gold-300 uppercase tracking-widest leading-none">OPEN ME</span>
                    </div>

                    {/* Wax Stamp details / organic edges */}
                    <div className="absolute inset-0 rounded-full opacity-35 bg-[radial-gradient(circle_at_35%_35%,white,transparent_60%)] pointer-events-none" />
                  </div>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Small interaction suggestion text */}
        <motion.p
          animate={isOpening ? { opacity: 0, y: 10 } : { opacity: 0.75, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gold-300/70 text-xs font-serif italic tracking-wide mt-8 text-center"
        >
          Click the Golden Wax Seal to open invitation
        </motion.p>
      </motion.div>
    </div>
  );
}
