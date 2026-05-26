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
      <svg 
        viewBox="0 0 160 55" 
        className="w-full h-full text-yellow-400" 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dynamic hand-drawn vibe for "felin" */}
        <g transform="translate(10, 5)">
          {/* Custom Bezier Curve Path approximating the retro yellow script text 'felin' */}
          <path 
            d="M 12 42 C 5 44 -2 38 1 29 C 3 23 11 20 18 20 C 19 20 22 21 21 21 L 28 8 C 29 5 31 1 35 1 C 38 1 38 5 37 9 L 32 23 C 37 23 41 26 43 30 C 45 35 42 41 36 41 C 32 41 29 38 29 34 L 27 41 L 6 41 M 49 32 C 49 25 54 20 61 20 C 67 20 71 24 71 29 C 71 31 70 32 68 32 L 54 32 C 54 36 57 39 62 39 C 66 39 69 37 70 34 L 74 37 C 72 41 68 43 62 43 C 54 43 49 37 49 32 M 79 4 L 83 4 L 83 41 L 79 41 Z M 91 16 L 95 16 L 95 41 L 91 41 Z M 102 21 L 105 21 L 105 25 C 108 21 113 20 117 20 C 124 20 128 24 128 31 L 128 41 L 124 41 L 124 31 C 124 26 121 24 116 24 C 112 24 108 27 106 31 L 106 41 L 102 41 Z" 
            fill="#eab308" 
          />
          {/* Custom feline accents (two cute smiles/curves over 'e' and 'i') */}
          <path 
            d="M 54 13 C 58 17 64 17 68 13 C 65 15 60 15 54 13" 
            stroke="#eab308" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            fill="none" 
          />
          <path 
            d="M 88 12 C 92 16 97 16 101 12 C 97 14 93 14 88 12" 
            stroke="#eab308" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            fill="none" 
          />
          {/* The trademark/registered symbol dot */}
          <circle cx="134" cy="38" r="2.5" stroke="#eab308" strokeWidth="1" fill="none" />
          <text x="132.5" y="40.2" fontSize="5" fill="#eab308" fontWeight="bold">R</text>
        </g>
      </svg>
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
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Dynamic Miniature Silhouettes */}
      <div className="flex -space-x-1 items-center bg-teal-950/20 px-2 py-1 rounded-lg border border-teal-500/10 shrink-0">
        <svg 
          viewBox="0 0 100 35" 
          className="w-12 h-6 text-[#14b8a6]" 
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bicycle silhouette */}
          <circle cx="15" cy="22" r="6" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <circle cx="33" cy="22" r="6" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <path d="M 15 22 L 21 14 L 30 14 L 33 22 M 21 14 L 26 22 M 25 10 L 22 14" stroke="currentColor" strokeWidth="1.2" fill="none" />
          {/* Runner silhouette */}
          <circle cx="55" cy="8" r="2.5" />
          <path d="M 54 10.5 L 50 16 L 47 21 M 54 10.5 L 58 14 L 56 22 M 54 10.5 Q 52 13 49 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Basketball silhouette */}
          <circle cx="75" cy="14" r="3" />
          <path d="M 75 17 L 76 25 L 72 31 M 75 17 Q 79 17 80 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Small ball dot */}
          <circle cx="85" cy="8" r="1" />
        </svg>
      </div>

      {/* Typography Panel */}
      <div className="flex flex-col text-left font-display">
        <div className="flex items-baseline gap-0.5 leading-none">
          <span className="text-white font-black text-xs uppercase italic tracking-tight">Sport</span>
          <span className="text-[#14b8a6] font-bold text-xs">-theque</span>
        </div>
        <span className="text-[7.5px] font-mono text-gray-400 uppercase tracking-widest leading-none mt-0.5 whitespace-nowrap">
          Bibliothèque Sportive
        </span>
      </div>
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
