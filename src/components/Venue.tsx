import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Map, Copy, Check, Compass } from 'lucide-react';

export default function Venue() {
  const [copied, setCopied] = useState(false);
  const [bgImg, setBgImg] = useState('https://i.ibb.co/XZHzDWwJ/454545.png');

  const addressText = `Rose Lounge Convention Centre
Nooradi, Tirur Road, Kodur
Malappuram, Kerala, India 676504`;

  const mapUrl = `https://maps.google.com/?q=Rose+Lounge+Convention+Centre+Nooradi+Tirur+Road+Kodur+Malappuram+676504`;

  const handleCopy = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="venue" className="py-20 px-4 max-w-4xl mx-auto select-none">
      <div className="text-center mb-12">
        <span className="text-gold-700 font-mono text-[9px] uppercase tracking-[0.3em] font-semibold block mb-2">CELEBRATION PLACE</span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-extralight tracking-wide">
          The Ceremony Space
        </h2>
        <div className="h-[1.5px] w-12 bg-gold-400 mx-auto mt-4" />
      </div>

      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative rounded-3xl border border-gold-400/30 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden max-w-2xl mx-auto bg-stone-950/90 will-change-transform"
      >
        {/* Background Image with Elegant Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImg}
            onError={() => setBgImg('https://i.ibb.co/6RQ48yds/454545.png')}
            alt="Venue background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-45 scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/75 via-stone-900/60 to-stone-950/90 backdrop-blur-[1px]" />
        </div>

        {/* Decorative corner borders */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold-400/40 rounded-tl-3xl pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold-400/40 rounded-tr-3xl pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold-400/40 rounded-bl-3xl pointer-events-none z-10" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold-400/40 rounded-br-3xl pointer-events-none z-10" />

        {/* Address Card */}
        <div className="w-full flex flex-col justify-center items-center text-center relative z-10">
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="p-3 bg-gold-900/40 border border-gold-500/20 rounded-full">
              <MapPin className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <h3 className="font-serif text-xl tracking-wide text-gold-300">Rose Lounge Convention Centre</h3>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">Kodur, Malappuram</p>
            </div>
          </div>

          <div className="bg-stone-950/60 p-6 rounded-2xl border border-gold-500/5 mb-8 w-full max-w-md">
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-gold-500/60 mb-2">Date &amp; Schedule</h4>
            <span className="block font-serif text-base text-gold-300 font-medium">August 6 (Thursday), 2026</span>
            <span className="block font-serif text-xs italic text-gold-400/80 mb-1">[23 Safar 1448 Hijri]</span>
            <span className="block font-mono text-xs text-stone-300 mb-5">Time: 11:00 AM to 3:00 PM</span>
            
            <div className="h-[1px] w-full bg-gold-500/5 mb-4" />
            
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-gold-500/60 mb-2">Venue Address</h4>
            <p className="text-stone-300 font-serif leading-relaxed text-sm whitespace-pre-line antialiased">
              {addressText}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 w-full max-w-md">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[160px] bg-gold-600 hover:bg-gold-500 text-stone-950 font-serif font-semibold text-xs uppercase tracking-widest py-3.5 px-6 rounded-full border border-gold-500/20 shadow-lg text-center transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Compass className="h-4 w-4 animate-spin" style={{ animationDuration: '10s' }} />
              Navigate Map
            </a>
            <button
              onClick={handleCopy}
              className="flex-1 min-w-[160px] bg-stone-900 hover:bg-stone-850 text-gold-300 font-serif text-xs uppercase tracking-widest py-3.5 px-6 rounded-full border border-gold-500/15 shadow-md flex items-center justify-center gap-2 transition-all duration-300"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-gold-500" />
                  Copy Address
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
