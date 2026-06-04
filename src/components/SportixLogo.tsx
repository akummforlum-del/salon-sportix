import React from 'react';

interface SportixLogoProps {
  className?: string;
  showSubtitle?: boolean;
  placeName?: string;
  variant?: 'dark' | 'light';
}

export default function SportixLogo({ className = '', showSubtitle = true, placeName, variant = 'dark' }: SportixLogoProps) {
  // Always use the high-fidelity brand blue color (#20318A) from the official Sportix logo
  const textColor = '#20318A';
  
  return (
    <div className={`flex flex-col items-center justify-center select-none text-center ${className}`}>
      {/* Dynamic transparent high-contrast presentation: Clean vector wordmark matching the brand logo-sportix perfectly */}
      <div className="flex items-center justify-center transition-all hover:scale-102 duration-300">
        <svg
          viewBox="0 0 150 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 sm:h-12 w-auto"
        >
          {/* Slanted brush-stroke 'S' outline: sharp, dynamic, and lightning-bolt-like matching the brand logo-sportix perfectly */}
          <path
            d="M 33 2 C 24 8, 11 16, 5 24 C 1 29, 7 31, 15 30 C 23 29, 30 33, 28 38 C 25 44, 13 51, 2 57 C 9 50, 23 43, 24 36 C 25 31, 17 31, 9 32 C 3 33, 9 21, 17 15 C 23 10, 29 6, 33 2 Z"
            fill="#F16E22"
            transform="translate(21, 0) scale(0.95)"
          />
          
          {/* Letters "port" in matching italic bold style with absolute spacing */}
          <text
            y="42"
            fill={textColor}
            fontFamily="'Inter', 'Arial Black', system-ui, -apple-system, sans-serif"
            fontWeight="950"
            fontSize="36"
            fontStyle="italic"
            className="font-black"
          >
            <tspan x="42">p</tspan>
            <tspan x="60">o</tspan>
            <tspan x="78">r</tspan>
            <tspan x="92">t</tspan>
          </text>

          {/* Precision custom slanted stem 'i' to match the "port" style exactly */}
          <path
            d="M 106 42 L 111.5 17 L 119.5 17 L 114 42 Z"
            fill={textColor}
          />

          {/* Custom high-contrast orange dot exactly above the stem */}
          <circle 
            cx="115.5" 
            cy="10" 
            r="4.5" 
            fill="#f26d21" 
          />

          {/* Letter "x" completing the brand wordmark with absolute tracking */}
          <text
            y="42"
            fill={textColor}
            fontFamily="'Inter', 'Arial Black', system-ui, -apple-system, sans-serif"
            fontWeight="950"
            fontSize="36"
            fontStyle="italic"
            className="font-black"
          >
            <tspan x="114">x</tspan>
          </text>
        </svg>
      </div>

      {/* 3. Name of the place displayed directly down of it */}
      {placeName && (
        <span className="text-[10px] sm:text-[12px] font-mono tracking-[0.45em] text-[#f26d21] mt-2 uppercase font-black pl-[0.45em] drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.9)] animate-pulse">
          {placeName}
        </span>
      )}
    </div>
  );
}
