import { useState } from 'react';
import { MapPin, Map, Copy, Check, Compass } from 'lucide-react';

export default function Venue() {
  const [copied, setCopied] = useState(false);

  const addressText = `Abdul bari. P
Parakkal house kuttasseri
Elankur post 676122
Manjeri, Malappuram, Kerala`;

  const mapUrl = `https://maps.app.goo.gl/pL1yGsGfivLbkViv6`;

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

      <div className="bg-stone-50/40 backdrop-blur-md rounded-3xl border border-gold-500/10 p-8 md:p-12 shadow-2xl relative overflow-hidden max-w-2xl mx-auto">
        {/* Decorative corner borders */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold-500/20 rounded-tl-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold-500/20 rounded-tr-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold-500/20 rounded-bl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold-500/20 rounded-br-3xl pointer-events-none" />

        {/* Address Card */}
        <div className="w-full flex flex-col justify-center items-center text-center">
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="p-3 bg-gold-900/40 border border-gold-500/20 rounded-full">
              <MapPin className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <h3 className="font-serif text-xl tracking-wide text-gold-300">Parakkal House</h3>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">Manjeri, Kerala</p>
            </div>
          </div>

          <div className="bg-stone-950/60 p-6 rounded-2xl border border-gold-500/5 mb-8 w-full max-w-md">
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-gold-500/60 mb-3">Residence of</h4>
            <span className="block font-serif text-lg text-gold-300 font-medium mb-4">Abdul bari. P</span>
            
            <div className="h-[1px] w-full bg-gold-500/5 mb-4" />
            
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-gold-500/60 mb-2">Location Address</h4>
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
      </div>
    </section>
  );
}
