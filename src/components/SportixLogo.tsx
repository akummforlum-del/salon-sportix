import React from 'react';

interface SportixLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export default function SportixLogo({ className = '', showSubtitle = true }: SportixLogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Subtitle "SALON" on top with wide letter-spacing */}
      {showSubtitle && (
        <span className="text-[10px] font-mono tracking-[0.6em] text-gray-400 mb-2 uppercase pl-[0.6em]">
          S A L O N
        </span>
      )}

      {/* Logo Icon and Mark combined */}
      <div className="flex items-center gap-2">
        {/* Customized Lightning Bolt SVG */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          >
            {/* Outlined glow rings */}
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-30" />
            {/* The bold geometric lightning symbol */}
            <path
              d="M60 12 L30 52 L50 52 L36 88 L74 44 L52 44 Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="bevel"
            />
          </svg>
        </div>
        
        {/* Brand Name "sportix" with custom modern treatment */}
        <span className="text-3xl font-display font-medium tracking-tight text-white italic">
          sportix
        </span>
      </div>
    </div>
  );
}
