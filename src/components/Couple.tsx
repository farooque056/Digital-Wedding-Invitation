import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function Couple() {
  const [imgSrc, setImgSrc] = useState('https://i.ibb.co/WN1JpSRn/add001.jpg');
  const fallbacks = [
    'https://i.ibb.co/Q7Gwjsx9/add001.jpg',
    'https://i.ibb.co/mr7WFQPJ/add001.jpg'
  ];
  const [fallbackIdx, setFallbackIdx] = useState(0);

  const handleImgError = () => {
    if (fallbackIdx < fallbacks.length) {
      setImgSrc(fallbacks[fallbackIdx]);
      setFallbackIdx(fallbackIdx + 1);
    }
  };

  return (
    <section id="couple" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto select-none font-sans">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-12 md:gap-16">
        
        {/* Left Column: Portrait Frame with Elevated Offsets */}
        <div className="md:col-span-6 flex justify-center md:justify-end relative">
          {/* Decorative Backing Frame */}
          <div className="absolute w-72 h-80 sm:w-80 sm:h-96 rounded-t-[160px] rounded-b-3xl border border-gold-400/40 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 -z-10" />
          
          <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-t-[160px] rounded-b-3xl border-2 border-gold-300/60 shadow-[0_20px_50px_rgba(0,0,0,0.12)] bg-stone-50 overflow-hidden group">
            <div className="w-full h-full rounded-t-[156px] rounded-b-[28px] overflow-hidden relative">
              <img
                src={imgSrc}
                onError={handleImgError}
                alt="Fathima Lena & Sharuq - Soulmates"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right Column: Title, Names & Story Re-arranged */}
        <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-gold-600 font-sans text-xs uppercase tracking-[0.35em] font-medium block mb-2.5">
            OUR STORY
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 font-light tracking-wide leading-tight">
            Meet the Couple
          </h2>
          
          <div className="h-[2px] w-16 bg-gradient-to-r from-gold-400 to-gold-200 my-5 md:ml-0 mx-auto" />
          
          <div className="mb-6">
            <h3 className="font-pinyon text-3xl sm:text-4xl text-gold-700 font-normal">
              Fathima Lena &amp; Sharuq
            </h3>
          </div>

          <div className="relative bg-gold-50/40 border-l-2 border-gold-400/60 pl-5 pr-4 py-4 rounded-r-2xl max-w-lg">
            <p className="text-stone-700 font-serif text-sm sm:text-base tracking-wide leading-relaxed italic whitespace-pre-line">
              Meet Fathima Lena and Sharuq, they are shining bright,
              In each other's arms, their future looks so right.
              Bound by love and promises to keep,
              Their happiness and bond are incredibly deep.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-8 text-stone-400">
            <Heart className="h-4 w-4 text-rose-400 fill-rose-400/20" />
            <span className="font-serif text-xs tracking-widest uppercase text-stone-500">Two Hearts, One Destiny</span>
          </div>
        </div>

      </div>
    </section>
  );
}

