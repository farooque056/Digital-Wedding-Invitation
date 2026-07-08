import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  onSealClick?: () => void;
}

export default function Envelope({ onOpen, onSealClick }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isLetterEmerging, setIsLetterEmerging] = useState(false);
  const [isLetterFloatingForward, setIsLetterFloatingForward] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    
    // Trigger any external sound/music on seal click
    if (onSealClick) {
      onSealClick();
    }
    
    // Stage 1: Card emerges smoothly vertically out of envelope pocket
    setTimeout(() => {
      setIsLetterEmerging(true);
    }, 700);

    // Stage 2: Card pops out along Z-axis floating directly towards the viewer's eyes
    setTimeout(() => {
      setIsLetterFloatingForward(true);
    }, 1450);

    // Stage 3: Transition to main wedding celebration screen after admiring the 3D pop-out
    setTimeout(() => {
      onOpen();
    }, 3900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900 overflow-hidden font-sans select-none" id="wedding-envelope-screen">
      {/* Elegantly floating candle light / bokeh rings on background (Only opacity pulse to avoid GPU transform recalculations) */}
      <motion.div
        animate={{
          opacity: [0.75, 0.9, 0.75]
        }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#4c0f20,transparent_70%)] opacity-80"
      />
      <div className="absolute top-24 left-24 w-72 h-72 bg-gold-500/5 rounded-full filter blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-24 right-24 w-72 h-72 bg-rose-500/5 rounded-full filter blur-[100px] animate-shimmer" style={{ animationDuration: '10s' }} />

      {/* Golden Aura Glow during 3D Pop-Out */}
      <AnimatePresence>
        {isLetterFloatingForward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center z-20"
          >
            <div className="w-[30rem] h-[30rem] rounded-full bg-gradient-to-r from-gold-500/15 via-rose-500/10 to-amber-400/15 filter blur-[90px]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative floral elements on corners (Simplified to static border overlays for smooth mobile performance) */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-gold-500/20 m-4 rounded-tl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-gold-500/20 m-4 rounded-br-2xl pointer-events-none" />

      {/* Main Container with 3D Perspective */}
      <motion.div
        initial={{ scale: 0.82, opacity: 0, y: 35, rotateX: 6 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 1.18, opacity: 0, filter: 'blur(12px)' }}
        transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 1600 }}
        className="relative w-full max-w-lg px-4 flex flex-col items-center justify-center"
      >
        {/* Gentle, lightweight floating animation on main envelope container for fluid mobile rendering */}
        <motion.div
          animate={
            isOpening 
              ? { y: 0, scale: 1 } 
              : { 
                  y: [0, -6, 0]
                }
          }
          transition={{ repeat: isOpening ? 0 : Infinity, duration: 4, ease: "easeInOut" }}
          className="w-full flex flex-col items-center justify-center"
        >
          {/* Top greeting above envelope */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isOpening ? { opacity: 0, y: -50, scale: 0.92 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-8"
          >
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 0.9, letterSpacing: "0.25em" }}
              transition={{ delay: 0.3, duration: 1.2 }}
              className="text-gold-400 font-mono text-[10px] uppercase block mb-2 font-semibold tracking-widest"
            >
              YOU ARE CORDIALLY INVITED TO THE CELEBRATION
            </motion.span>
            <h2 className="text-3xl md:text-4.5xl font-serif text-gold-100 font-extralight tracking-wider leading-relaxed">
              The Wedding of
              <span className="block gold-text font-serif font-normal mt-1 italic tracking-wide drop-shadow-[0_2px_10px_rgba(197,160,89,0.3)]">
                Fathima Lena & Sharuq
              </span>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="h-[1px] w-14 bg-gradient-to-r from-transparent via-gold-400/50 to-gold-500/30" />
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <Heart className="h-3.5 w-3.5 text-rose-400/80 fill-rose-500/40" />
              </motion.div>
              <span className="h-[1px] w-14 bg-gradient-to-l from-transparent via-gold-400/50 to-gold-500/30" />
            </div>
          </motion.div>

          {/* The Envelope Box */}
          <motion.div 
            className="relative w-full aspect-[4/3] bg-stone-900 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-gold-400/30 overflow-visible"
            whileHover={!isOpening ? { y: -6, scale: 1.02, boxShadow: "0 30px 70px rgba(197,160,89,0.18)" } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Back side of envelope / Deep Burgundy cavity */}
            <motion.div 
              animate={isLetterFloatingForward ? { opacity: 0.3, scale: 0.9, filter: 'blur(4px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-burgundy-900 rounded-2xl overflow-hidden border border-gold-500/20"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#5c132b_0%,#28030f_100%)]" />
            </motion.div>

             {/* Invitation letter (Emerges vertically out of pocket, then pops forward along Z-axis toward viewer - extremely springy and cartoon-like) */}
            <motion.div
              initial={{ y: 0, rotateX: 0, rotateY: 0, scale: 0.96 }}
              animate={
                isLetterFloatingForward 
                  ? { 
                      y: '-16%', 
                      rotateX: 4, 
                      rotateY: -2, 
                      rotateZ: -5,
                      scale: 1.48, 
                      boxShadow: '0 40px 100px rgba(0,0,0,0.95), 0 0 70px rgba(197,160,89,0.5)' 
                    } 
                  : isLetterEmerging 
                  ? { 
                      y: '-104%', 
                      rotateX: 6, 
                      rotateY: -1, 
                      rotateZ: 10,
                      scale: 1.04, 
                      boxShadow: '0 25px 60px rgba(0,0,0,0.65)' 
                    }
                  : isOpening 
                  ? { y: '-14%', rotateX: 0, rotateY: 0, rotateZ: 0, scale: 0.98 } 
                  : { y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 0.96 }
              }
              transition={{ 
                type: "spring",
                stiffness: 160,
                damping: 7, // Very low damping for funny cartoonish rubber wobble!
                mass: 1.1
              }}
              style={{ 
                zIndex: isLetterFloatingForward || isLetterEmerging ? 50 : 10,
                transformStyle: 'preserve-3d'
              }}
              className="absolute inset-[7%] bg-white rounded-xl flex flex-col items-center justify-between p-6 sm:p-7 overflow-hidden border border-stone-200"
            >
              {/* Elegant Floral watermark background inside paper */}
              <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle,#c5a059_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              {/* Elegant golden frame inside card */}
              <div className="absolute inset-2.5 border border-gold-500/30 rounded-lg pointer-events-none" />
              <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-gold-500/60 pointer-events-none" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-gold-500/60 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-gold-500/60 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-gold-500/60 pointer-events-none" />

              {/* Content of invite card */}
              <div className="flex flex-col items-center text-center mt-3 w-full relative z-10">
                <span className="text-[10px] font-mono tracking-[0.25em] text-stone-500 uppercase font-medium">Save the Date</span>
                <div className="h-[1.5px] w-10 bg-gradient-to-r from-transparent via-gold-500 to-transparent my-2" />
                <p className="text-[13px] font-serif italic text-gold-700">Together with their families</p>
                
                <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal tracking-tight mt-3">
                  Fathima Lena & Sharuq
                </h3>
                
                <p className="text-[10px] sm:text-[11px] text-stone-600 font-sans tracking-widest mt-2.5 max-w-[85%] uppercase text-center font-light leading-relaxed">
                  Nikah Ceremony & Wedding Feast
                </p>
              </div>

              <div className="flex flex-col items-center text-center w-full mb-2 relative z-10">
                <span className="text-xs sm:text-sm font-serif text-gold-700 tracking-widest font-semibold">6th AUGUST, 2026</span>
                <span className="text-[10px] font-sans text-stone-500 uppercase tracking-widest mt-1">Kodur, Malappuram</span>
                <div className="h-[1px] w-10 bg-gold-500/40 my-2" />
                <motion.span 
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-[10px] font-mono tracking-[0.2em] text-[#b33951] font-medium uppercase flex items-center gap-1.5"
                >
                  <Sparkles className="h-3 w-3 text-gold-600 animate-spin" style={{ animationDuration: '8s' }} /> Invitation Card Inside
                </motion.span>
              </div>
            </motion.div>

            {/* Envelope lower triangular folds / overlay with embossed gold trim */}
            <motion.div 
              animate={isLetterFloatingForward ? { opacity: 0.3, scale: 0.9, filter: 'blur(4px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-20"
            >
              {/* Bottom triangular card fold with velvet gradient & gold foil border */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#26040e] via-[#450b1b] to-[#591024] border-t border-gold-400/40 shadow-[0_-12px_25px_rgba(0,0,0,0.5)]"
                style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}
              />
              {/* Double embossed gold line along bottom fold seams */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1/2 border-t border-gold-300/20 translate-y-[2px]"
                style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}
              />

              {/* Left triangular card fold */}
              <div 
                className="absolute left-0 bottom-0 top-0 w-1/2 bg-gradient-to-r from-[#2c0511] via-[#480c1d] to-[#591024] border-r border-gold-400/40"
                style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }}
              />
              {/* Right triangular card fold */}
              <div 
                className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-[#2c0511] via-[#480c1d] to-[#591024] border-l border-gold-400/40"
                style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)' }}
              />

              {/* Delicate ornamental gold corner flourishes on cover */}
              <div className="absolute bottom-3 left-4 flex items-center gap-1.5 opacity-60">
                <div className="w-6 h-[1px] bg-gradient-to-r from-gold-300 to-transparent" />
                <span className="text-[10px] text-gold-300 font-serif">❧</span>
              </div>
              <div className="absolute bottom-3 right-4 flex items-center gap-1.5 opacity-60 flex-row-reverse">
                <div className="w-6 h-[1px] bg-gradient-to-l from-gold-300 to-transparent" />
                <span className="text-[10px] text-gold-300 font-serif">☙</span>
              </div>
            </motion.div>

            {/* Top flap (folds upwards smoothly in 3D perspective - bouncy flap effect) */}
            <motion.div
              style={{ 
                originY: 0,
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                perspective: 1000
              }}
              animate={
                isLetterFloatingForward 
                  ? { rotateX: 180, zIndex: 0, filter: 'brightness(0.3) blur(4px)', opacity: 0.3 } 
                  : isOpening 
                  ? { rotateX: 180, zIndex: 0, filter: 'brightness(0.5) blur(0px)', opacity: 1 } 
                  : { rotateX: 0, zIndex: 25, filter: 'brightness(1) blur(0px)', opacity: 1 }
              }
              transition={{ 
                type: "spring",
                stiffness: 160,
                damping: 8,
                mass: 1
              }}
              className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#5c132b] via-[#4d0e23] to-[#3b0819] border-b border-gold-400/50 shadow-xl flex flex-col items-center justify-start pt-5 select-none rounded-t-2xl overflow-hidden"
            >
              {/* Gold foil subtle damask / floral cover texture */}
              <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle,#e6c887_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
              
              {/* Inner embossed trim line */}
              <div className="w-3/5 h-[1px] bg-gradient-to-r from-transparent via-gold-300/40 to-transparent mt-1" />
              
              <div className="text-center flex flex-col items-center gap-1 opacity-75 mt-1">
                <span className="text-[10px] font-serif tracking-[0.3em] uppercase text-gold-300/90 font-light">ROYAL NIKAH</span>
                <div className="w-8 h-[1px] bg-gold-400/50" />
              </div>
            </motion.div>

            {/* Wax Seal (Sleek, high-performance interactions suited for mobile devices) */}
            <AnimatePresence>
              {!isOpening && (
                <motion.button
                  id="envelope-seal-btn"
                  exit={{ 
                    scale: 0.5,
                    opacity: 0
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onClick={handleOpenClick}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
                  whileHover={{ 
                    scale: 1.12, 
                    rotate: 3,
                    transition: { type: "spring", stiffness: 300, damping: 15 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    {/* Pulsing golden ring around seal */}
                    <motion.div 
                      className="absolute -inset-4 rounded-full border border-gold-300/40"
                      animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    />
                    <div className="absolute -inset-3 rounded-full bg-amber-400/10 filter blur-md group-hover:bg-amber-400/25 transition-all duration-300" />

                    {/* 3D Wax stamp rendering */}
                    <div className="w-20 h-20 bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 group-hover:from-rose-500 group-hover:to-rose-800 rounded-full border-4 border-gold-400/70 shadow-[0_8px_25px_rgba(0,0,0,0.7)] flex items-center justify-center p-1.5 transition-all duration-300 relative select-none">
                      {/* Ring inside seal */}
                      <div className="w-full h-full rounded-full border border-dashed border-gold-200/60 flex flex-col items-center justify-center bg-rose-950/20">
                        <span className="text-[14px] font-serif font-black tracking-widest text-gold-100 mt-0.5 drop-shadow">F ⚭ S</span>
                        <span className="text-[7px] font-mono text-gold-300 uppercase tracking-[0.25em] leading-none mt-0.5">OPEN ME</span>
                      </div>

                      {/* Wax Stamp highlights */}
                      <div className="absolute inset-0 rounded-full opacity-40 bg-[radial-gradient(circle_at_35%_30%,white,transparent_60%)] pointer-events-none" />
                    </div>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Small interaction suggestion text */}
          <motion.p
            animate={isOpening ? { opacity: 0, y: 15 } : { opacity: 0.85, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gold-200/80 text-xs sm:text-sm font-serif italic tracking-wide mt-8 text-center drop-shadow"
          >
            Click the Golden Wax Seal to open invitation ✨
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
