import React from 'react';

interface SportixLogoProps {
  className?: string;
  showSubtitle?: boolean;
  placeName?: string;
}

export default function SportixLogo({ className = '', showSubtitle = true, placeName }: SportixLogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center select-none text-center ${className}`}>
      {/* Dynamic transparent high-contrast presentation: Clean vector wordmark with thick white outline & high-opacity drop shadow */}
      <div className="flex items-center justify-center filter drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)] transition-all hover:scale-102 duration-300">
        <svg
          viewBox="0 0 150 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 sm:h-12 w-auto"
        >
          {/* Slanted brush-stroke 'S' outline matching the logo-sportix image perfectly (with clear white stroke) */}
          <path
            d="M 68 2 C 45 17, 10 34, 6 44 C 3.5 50, 14 45, 28 42 C 44 38.5, 54 37.5, 55.5 42 C 57 47, 44 57, 32 67 L 0 100 C 12 88, 38 68, 48 64 C 55 61, 56.5 50, 48 45 C 38 40.5, 20 42.5, 12 43.5 C 24 35, 50 19, 68 2 Z"
            fill="#f26d21"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinejoin="round"
            transform="translate(4, -2) scale(0.56)"
          />
          
          {/* Letters "port" in matching italic bold style with absolute spacing and protective white outlines */}
          <text
            y="42"
            fill="#232b85"
            fontFamily="'Inter', 'Arial Black', system-ui, -apple-system, sans-serif"
            fontWeight="950"
            fontSize="36"
            fontStyle="italic"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinejoin="round"
            className="font-black"
          >
            <tspan x="42">p</tspan>
            <tspan x="60">o</tspan>
            <tspan x="78">r</tspan>
            <tspan x="92">t</tspan>
          </text>

          {/* Precision custom slanted stem 'i' in blue to match the "port" style exactly */}
          <path
            d="M 106 42 L 111.5 17 L 119.5 17 L 114 42 Z"
            fill="#232b85"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Custom high-contrast orange dot exactly above the blue stem */}
          <circle 
            cx="115.5" 
            cy="10" 
            r="4.5" 
            fill="#f26d21" 
            stroke="#ffffff"
            strokeWidth="0.8"
          />

          {/* Letter "x" completing the brand wordmark with absolute tracking (placed snuggly closer to current i) */}
          <text
            y="42"
            fill="#232b85"
            fontFamily="'Inter', 'Arial Black', system-ui, -apple-system, sans-serif"
            fontWeight="950"
            fontSize="36"
            fontStyle="italic"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinejoin="round"
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
