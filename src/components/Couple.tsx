import { Heart } from 'lucide-react';

export default function Couple() {
  return (
    <section id="couple" className="py-20 px-4 max-w-3xl mx-auto select-none font-sans text-center">
      <div className="mb-12">
        <span className="text-gold-700 font-mono text-[9px] uppercase tracking-[0.3em] font-semibold block mb-2">
          OUR STORY
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-extralight tracking-wide">
          Meet the Couple
        </h2>
        <div className="h-[1.5px] w-12 bg-gold-400 mx-auto mt-4" />
      </div>

      <div className="flex flex-col items-center gap-10">
        {/* Unified Framed Couple Art Portrait */}
        <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-t-[160px] rounded-b-3xl border-4 border-gold-500/20 shadow-2xl bg-transparent overflow-hidden group">
          {/* Elegant corner details */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold-500/40 pointer-events-none" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold-500/40 pointer-events-none" />
          
          <div className="w-full h-full rounded-t-[156px] rounded-b-[28px] overflow-hidden relative">
            <img
              src="https://i.ibb.co/v9CsqMx/v1vv1v.jpg"
              alt="Sinan & Fahmida - Soulmates"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* 3-4 lines of elegant description */}
        <div className="max-w-2xl px-4 flex flex-col gap-3.5 antialiased">
          <p className="text-stone-700 font-serif text-sm sm:text-base tracking-wide leading-relaxed max-w-xl mx-auto italic whitespace-pre-line">
            Meet Sinan and Fahmida, they are shining bright,
            In each other's arms, their future looks so right.
            Bound by love and promises to keep,
            Their happiness and bond are incredibly deep.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-16">
        <div className="h-[1px] w-12 bg-gold-400/30" />
        <Heart className="h-4 w-4 text-rose-500/50 fill-rose-500/10" />
        <span className="font-serif text-stone-500 text-xs tracking-wider italic">Two Hearts, One Journey</span>
        <Heart className="h-4 w-4 text-rose-500/50 fill-rose-500/10" />
        <div className="h-[1px] w-12 bg-gold-400/30" />
      </div>
    </section>
  );
}

