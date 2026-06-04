import React from 'react';

/**
 * Inside Sports Logo:
 * Classic sports media branding in Cameroon. Includes "INSIDE" in bold italic,
 * a cyan-teal block for "SPORTS", and a mini Cameroon flag centered below.
 */
export function InsideSportsLogo({ className = 'h-8' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Branding Plate */}
      <div className="flex items-center font-display font-black italic tracking-tighter text-sm">
        <span className="text-white px-2 py-0.5 rounded-l bg-neutral-900 border border-white/10 uppercase">
          Inside
        </span>
        <span className="bg-[#12b3ca] text-black px-2 py-0.5 rounded-r font-bold uppercase shadow-sm shadow-[#12b3ca]/20">
          Sports
        </span>
      </div>
      
      {/* Cameroon Flag Pill */}
      <div className="flex items-center gap-0.5 mt-1 bg-black/40 border border-white/10 rounded-full p-0.5 px-1.5 shadow">
        <div className="flex h-2.5 w-4 rounded-sm overflow-hidden border border-white/5">
          {/* Green band */}
          <div className="w-1/3 bg-[#007a5e]" />
          {/* Red band with gold star */}
          <div className="w-1/3 bg-[#ce1126] flex items-center justify-center relative">
            <span className="text-[5px] text-[#fcd116] leading-none absolute">★</span>
          </div>
          {/* Yellow band */}
          <div className="w-1/3 bg-[#fcd116]" />
        </div>
        <span className="text-[7px] font-mono font-bold text-gray-400 tracking-wide uppercase scale-90">CMR</span>
      </div>
    </div>
  );
}

/**
 * Felin Logo:
 * A customized stylized gold/yellow script matching "felin" with its iconic curved accents over the letters.
 */
export function FelinLogo({ className = 'h-8' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <img
        src="/src/assets/images/felin_exact_replica_logo_1780530898304.png"
        alt="Felin Logo"
        className="h-full object-contain rounded border border-white/10"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

/**
 * Sport-theque Logo:
 * Athletic figures silhouette overlay representing cycling, tennis, basketball, 
 * football, and running; paired with the professional "Sport-theque Bibliothèque sportive" mark.
 */
export function SportThequeLogo({ className = 'h-10' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <img
        src="/src/assets/images/sport_theque_logo_1780530412430.png"
        alt="Sport-theque Logo"
        className="h-full object-contain rounded bg-white px-2 py-0.5 border border-white/15"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

/**
 * Collaborators Banner Group Component:
 * Perfectly grids the three logos side-by-side with nice gap, alignment and hover state.
 */
export default function CollaboratorsGroup() {
  return (
    <div className="flex flex-wrap items-center gap-5 md:gap-7 bg-white/[0.02] border border-white/5 rounded-2xl p-3.5 px-5 shadow-inner">
      <div className="flex flex-col text-left shrink-0">
        <span className="text-[8px] font-mono text-[#d4af37] tracking-[0.3em] uppercase">COLLABORATION SPÉCIALE</span>
        <span className="text-[10px] font-sans font-bold text-gray-300">Nos Collaborateurs :</span>
      </div>
      
      <div className="flex flex-wrap items-center gap-5 sm:gap-6">
        {/* Inside Sports */}
        <div className="hover:scale-105 transition-transform duration-300">
          <InsideSportsLogo className="h-8" />
        </div>
        
        {/* Divider */}
        <div className="h-6 w-px bg-white/10 hidden sm:block" />

        {/* Felin */}
        <div className="hover:scale-105 transition-transform duration-300 w-[70px] sm:w-[85px] flex items-center justify-center">
          <FelinLogo className="h-6" />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-white/10 hidden sm:block" />

        {/* Sport-theque */}
        <div className="hover:scale-105 transition-transform duration-300">
          <SportThequeLogo className="h-8" />
        </div>
      </div>
    </div>
  );
}
