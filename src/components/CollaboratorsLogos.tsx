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
 * Fully modeled in vector SVG for maximum clarity and pixel perfection.
 */
export function FelinLogo({ className = 'h-8' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <svg 
        viewBox="0 0 160 55" 
        className="w-full h-full text-[#fedb10]" 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(10, 5)" fill="currentColor">
          {/* Main "felin" typography carefully drafted in flowing SVG paths */}
          <path 
            d="M 28 35 C 24 35 15 37 8 35 C 2 33 0 28 1 24 C 2 17 8 13 14 13 C 15 13 18 13 18 13 L 26 4 C 27.5 2 29.5 0.5 32 0.5 C 34.5 0.5 35 2.5 34.5 5.5 L 30 16 C 35 16 39 18.5 41 22.5 C 43 27 40 32 34 32 C 30 32 27 29.5 27 26.5 L 25 32 L 6 32 C 10 32 15 32 17 32 M 49.5 24.5 C 49.5 18 53.5 13.5 60 13.5 C 65.5 13.5 69 17 69 21.5 C 69 23.5 68 24 66 24 L 54.5 24 C 54.5 28 57 30.5 61.5 30.5 C 65 30.5 67.5 28.5 68.5 26 L 73 29 C 71 32.5 67 34.5 61 34.5 C 54 34.5 49.5 29.5 49.5 24.5 M 78 1 Q 81 1 81.5 7 L 81.5 32 L 77.5 32 L 77.5 7 Q 77 1 78 1 M 90 12 L 94.5 12 L 94.5 32 L 90 32 Z M 102 16 L 105.5 16 L 105.5 19 C 108 16 112.5 15 116.5 15 C 123 15 126.5 18.5 126.5 24.5 L 126.5 32 L 122.5 32 L 122.5 24.5 C 122.5 20.5 119.5 19 115 19 C 111.5 19 107.5 21.5 106 24.5 L 106 32 L 102 32 Z" 
          />
          
          {/* Sweeping custom bold decorative scroll under 'f' tail */}
          <path
            d="M 12 28 C 9 32 3 31.5 1 29 C -3.5 24 1.5 14.5 9.5 12.5 M 9.5 12.5 C 15.5 11 20.5 14 21.5 20 M 21.5 20 C 22.5 25 18.5 28 13.5 28"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Feline custom accents: eyelids & dots over 'e' and 'i' to match yellow branding flier */}
          {/* Over 'e' */}
          <path 
            d="M 52 8 C 55 11 61 11 64 8" 
            stroke="currentColor" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            fill="none" 
          />
          <circle cx="58" cy="3.5" r="2.2" />

          {/* Over 'i' */}
          <path 
            d="M 85 7 C 88 10 94 10 97 7" 
            stroke="currentColor" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            fill="none" 
          />
          <circle cx="91" cy="2.5" r="2.2" />

          {/* Registered trademark indicator ® */}
          <circle cx="134" cy="30" r="2.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <text x="132.3" y="31.8" fontSize="4.8" fill="currentColor" fontWeight="bold" fontFamily="sans-serif">R</text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Sport-theque Logo:
 * Athletic figures silhouette flow representing cycling, tennis, basketball/volleyball, 
 * football/soccer, and sprinting; paired with the professional "Sport-theque Bibliothèque sportive" mark.
 * Reconstructed as high-fidelity inline SVGs to match the original layout in pure code.
 */
export function SportThequeLogo({ className = 'h-10' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 240 100"
        className="w-full h-full text-[#115e59] dark:text-[#2dd4bf]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          {/* 1. Cyclist Silhouette */}
          {/* Rear Wheel */}
          <circle cx="28" cy="48" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="28" cy="48" r="1.5" />
          {/* Front Wheel */}
          <circle cx="58" cy="48" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="58" cy="48" r="1.5" />
          {/* Frame */}
          <path d="M 28 48 L 39 48 L 48 37 M 48 37 L 38 37 L 28 48 M 39 48 L 45 33 M 45 33 L 48 37 L 58 48 M 45 33 L 40 33" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Cyclist leaning posture */}
          <path d="M 34 32 C 32 30 34 24 40 22 C 45 20 49 23 52 29 L 57 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="51" cy="17" r="2.2" />
          {/* Arms to handlebar and foot pedal */}
          <path d="M 50 19 L 55 24 L 58 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 38 37 L 37 43 L 33 46 Z" fill="currentColor" />

          {/* 2. Tennis Player Silhouette */}
          {/* Body, legs, and dynamic racket swing */}
          <path d="M 88 48 L 92 38 L 97 26 C 95 22 92 18 96 13 Q 100 10 99 17 C 98 22 101 27 106 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="94" cy="11" r="2.3" />
          {/* Racket arm reaching upwards */}
          <path d="M 98 14 C 100 11 103 4 100 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 100 1 C 102 -1.5 106 -1 107 2 C 108 5 104 7 102 5 Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <circle cx="112" cy="-2" r="1.5" />

          {/* 3. Basketball / Volleyball Player Silhouette */}
          {/* Leaping upward body */}
          <path d="M 128 46 L 130 32 C 131 28 129 22 132 18 Q 135 15 133 22 L 134 35 L 132 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="131" cy="14" r="2.3" />
          {/* Arms stretched high */}
          <path d="M 130 20 L 136 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 132 20 L 139 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Ball in hand reach */}
          <circle cx="141" cy="4" r="4" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="141" cy="4" r="3" />

          {/* 4. Football / Soccer Player Silhouette */}
          {/* Athlete leaning back executing horizontal kick */}
          <path d="M 158 41 Q 165 31 171 29 C 175 27 179 30 178 35 M 171 29 L 187 31 L 194 28" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M 171 29 L 167 39 L 162 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="175" cy="23" r="2.3" />
          {/* Kicked ball */}
          <circle cx="199" cy="34" r="2.8" />

          {/* 5. Runner Silhouette */}
          {/* Sprinter driving forward in mid-stride */}
          <path d="M 213 43 L 209 33 L 215 23 M 209 33 C 211 29 215 27 219 27 M 215 23 L 225 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 215 23 L 205 19 L 199 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="218" cy="16" r="2.3" />

          {/* Signature cursive loop "S" underlaying bicycle wheels */}
          <path
            d="M 62 55 C 40 58 12 59 3 51 C -4 44 0 34 10 34 C 23 34 37 42 39 51 C 41 61 24 69 8 69 C 1 69 -3 64 2 57"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* Handwriting typeface: "Sport-theque" */}
          {/* 'p' */}
          <path d="M 68 51 L 68 62 M 68 54 C 70 51 73 51 74 54 C 75 57 73 59 70 59 M 68 58 L 74 58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* 'o' */}
          <circle cx="80" cy="55" r="2.8" stroke="currentColor" strokeWidth="2" fill="none" />
          {/* 'r' */}
          <path d="M 87 58 L 87 52 M 87 53 C 88 51 90 51 91 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* 't' */}
          <path d="M 96 49 L 96 58 M 93 52 L 99 52" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* '-' */}
          <line x1="102" y1="54" x2="106" y2="54" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          {/* 't' */}
          <path d="M 111 49 L 111 58 M 108 52 L 114 52" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* 'h' */}
          <path d="M 117 47 L 117 58 M 117 53 C 119 50 123 50 124 53 L 124 58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* 'e' */}
          <path d="M 129 55 L 134 55 C 134 51 129 50 129 54 M 129 54 C 129 58 133 58 134 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* 'q' */}
          <path d="M 142 55 L 142 62 M 142 55 C 142 51 137 51 137 54 C 137 57 141 58 142 58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* 'u' */}
          <path d="M 147 52 L 147 57 C 147 59 151 59 151 57 L 151 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* 'e' */}
          <path d="M 156 55 L 161 55 C 161 51 156 51 156 54 C 156 58 160 58 161 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* Bibliothèque sportive subtext bar */}
        <text
          x="120"
          y="80"
          textAnchor="middle"
          fontSize="8"
          fontWeight="bold"
          fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
          className="tracking-[0.20em] fill-gray-500 dark:fill-gray-400 uppercase"
        >
          Bibliothèque sportive
        </text>
      </svg>
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
