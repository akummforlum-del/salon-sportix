import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Trophy, Play, Pause, Compass, HelpCircle, LogIn, Users, Globe, Lock, ShieldAlert, Phone, Mail } from 'lucide-react';
import SportixLogo from './SportixLogo';
import { Destination, User } from '../types';
import { DESTINATIONS } from '../data';
import bgImg from '../assets/images/diverse_stadium_suite_1780564197298.png';


interface DestinationOrbitProps {
  onSelectDestination: (destination: Destination) => void;
  onOpenAiHelp?: () => void;
  activeCount: number;
  totalVisits: number;
  user: User | null;
  onLogout: () => void;
  onOpenLogin: () => void;
  onOpenRadar: () => void;
}

// Starting angles corresponding to 6-node hexagon layout
const STARTING_ANGLES: Record<string, number> = {
  douala: -90,      // Top (Active)
  abidjan: -30,     // Top-Right
  nairobi: 30,      // Bottom-Right
  casablanca: 90,   // Bottom
  cotonou: 150,     // Bottom-Left
  yaounde: 210,     // Top-Left
};

export default function DestinationOrbit({
  onSelectDestination,
  onOpenAiHelp,
  activeCount,
  totalVisits,
  user,
  onLogout,
  onOpenLogin,
  onOpenRadar
}: DestinationOrbitProps) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameId = useRef<number | null>(null);

  // Rotation engine using high-performance requestAnimationFrame
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (isRotating && !isHovered) {
        // Precise frame-rate independent rotation
        setRotationAngle((prev) => (prev + delta * 0.012) % 360);
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isRotating, isHovered]);

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-x-hidden py-12 px-4 select-none"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Top Floating Glow FX */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-rose-500/15 to-transparent pointer-events-none blur-3xl opacity-35" />
      
      {/* Header Info */}
      <header className="menu w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 z-20">
        <div className="logo flex justify-center md:justify-start w-full md:w-auto max-w-[180px]">
          {/* Real-time brand logo in top header representing Salon Sportix */}
          <SportixLogo className="scale-75 md:scale-95 origin-center md:origin-left" showSubtitle={true} />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full md:w-auto">
          {/* AI Helper tool */}
          {onOpenAiHelp && (
            <button
              onClick={onOpenAiHelp}
              className="flex items-center gap-1 text-[10px] sm:text-xs text-rose-450 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 px-3 py-1.5 rounded-full transition-all cursor-pointer font-medium"
            >
              <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>Aide IA</span>
            </button>
          )}

          {/* Log-In Options Space */}
          {user ? (
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full pl-2 pr-3 py-1 text-[11px] font-sans hover:bg-white/8 transition-colors select-none">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-5 h-5 rounded-full object-cover border border-white/25 animate-fade-in"
                referrerPolicy="no-referrer"
              />
              <div className="text-left leading-none hidden xs:block">
                <span className="text-white font-bold block max-w-[80px] truncate">{user.name}</span>
                <span className="text-[7.5px] font-mono text-amber-500 font-bold tracking-wider block mt-0.5">{user.role}</span>
              </div>
              <button 
                onClick={onLogout}
                className="text-[9.5px] font-mono text-gray-500 hover:text-rose-400 pl-1 border-l border-white/10 hover:underline transition-colors cursor-pointer"
              >
                Sortir
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-200 bg-white/5 border border-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full transition-all cursor-pointer font-medium"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-300" />
              <span>Connexion</span>
            </button>
          )}
        </div>
      </header>

      {/* Core Interactive Ring Zone */}
      <main className="relative flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-6">
        
        {/* Mobile Destination Menu (md:hidden) - Stacks beautifully, is 100% wide, and handles Google Translate elegantly */}
        <div className="md:hidden w-full max-w-sm mx-auto flex flex-col gap-3 px-3 mt-4 select-none">
          <div className="text-center mb-1">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#f26d21] font-bold">Sélectionnez votre salon</p>
          </div>
          {DESTINATIONS.map((dest) => {
            const isDouala = dest.id === 'douala';
            return (
              <motion.button
                key={dest.id}
                onClick={() => onSelectDestination(dest)}
                whileTap={{ scale: 0.98 }}
                className="date-box notranslate text-left rounded-2xl p-4 border relative overflow-hidden flex items-center justify-between transition-all cursor-pointer bg-[#111218]/90 border-white/10 shadow-lg"
                style={{
                  borderColor: isDouala ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255, 255, 255, 0.1)'
                }}
                translate="no"
              >
                {/* Accent Line */}
                <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                  isDouala ? 'bg-amber-500' : 'bg-rose-500/60'
                }`} />

                <div className="pl-2 flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <MapPin className={`w-3.5 h-3.5 ${isDouala ? 'text-amber-500' : 'text-rose-450'}`} />
                    <span className={`text-sm font-display font-black tracking-wide ${isDouala ? 'text-amber-100' : 'text-white'}`}>
                      {dest.name}
                    </span>
                    {isDouala && (
                      <span className="bg-amber-500 text-black text-[7px] font-black tracking-widest px-1.5 py-0.5 rounded-full uppercase flex items-center gap-0.5">
                        Next
                      </span>
                    )}
                  </div>
                  <span className="text-[9.5px] font-mono text-gray-450 font-semibold tracking-wider">
                    {dest.subtext}
                  </span>
                </div>

                <div className={`flex items-center justify-center px-3.5 py-2 rounded-xl text-[9.5px] font-mono font-bold border ${
                  isDouala
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-white/5 text-rose-350 border-white/10'
                }`}>
                  {dest.dateText}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Desktop Circular Orbit (md and up only) */}
        <div className="hidden md:flex relative w-full items-center justify-center h-[520px]">
          {/* Glowing Central Web Orbits */}
          <div className="absolute w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full border border-white/[0.03] pointer-events-none" />
          <div className="absolute w-[380px] h-[380px] sm:w-[580px] sm:h-[580px] rounded-full border border-white/[0.02] pointer-events-none border-dashed animate-spin-slow" />
          
          {/* Subtle glowing ring connecting destinations */}
          <div className="absolute w-[280px] h-[280px] sm:w-[460px] sm:h-[460px] rounded-full border border-white/[0.07] pointer-events-none shadow-[0_0_50px_rgba(255,255,255,0.01)]" />

          {/* Central Logo */}
          <div className="absolute z-10 p-6 pointer-events-none max-w-[200px] sm:max-w-none filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            <SportixLogo className="scale-100 sm:scale-115" showSubtitle={true} />
          </div>

          {/* 6 Destination Nodes forming a majestic hexagon */}
          <div 
            className="relative w-[300px] h-[300px] sm:w-[480px] sm:h-[480px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {DESTINATIONS.map((dest) => {
              const isCAN = dest.id === 'nairobi';
              const isDouala = dest.id === 'douala';

              // Math for revolving node positioning
              const angleOffset = STARTING_ANGLES[dest.id] || 0;
              const finalAngle = angleOffset + rotationAngle;
              const rad = (finalAngle * Math.PI) / 180;
              const topPct = 50 + 41 * Math.sin(rad); 
              const leftPct = 50 + 41 * Math.cos(rad);

              return (
                <motion.button
                  key={dest.id}
                  onClick={() => onSelectDestination(dest)}
                  className="absolute flex flex-col items-center justify-center cursor-pointer group outline-none z-20"
                  style={{
                    top: `${topPct}%`,
                    left: `${leftPct}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                >
                  {/* Node Outer Ring & Glow. Douala is shining with majestic golden theme */}
                  <div 
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-3 flex flex-col items-center justify-center transition-all duration-300 ${
                      isDouala 
                        ? 'notranslate bg-[#181510]/95 border-2 border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.5)] group-hover:border-amber-400 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.7)]'
                        : 'notranslate bg-[#111218]/95 border border-white/15 group-hover:border-rose-500/50 shadow-lg group-hover:shadow-[0_0_25px_rgba(244,63,94,0.3)]'
                    }`}
                  >
                    
                    {/* Glowing inner ripple */}
                    {isDouala ? (
                      <div className="absolute inset-0 rounded-full border border-amber-500/30 animate-pulse pointer-events-none scale-105" />
                    ) : (
                      <div className="absolute inset-0 rounded-full border border-white/5 group-hover:border-rose-500/20 group-hover:scale-110 transition-all duration-300 pointer-events-none" />
                    )}

                    {/* Highlight active identifier only for Douala */}
                    {isDouala && (
                      <span className="absolute -top-3.5 bg-amber-500 text-black text-[7px] font-bold tracking-widest px-1.5 py-0.5 rounded-full shadow-lg border border-amber-300/40 uppercase scale-90 sm:scale-100 flex items-center gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-black animate-ping" />
                        Next
                      </span>
                    )}
                    
                    {/* Pin or Trophy Icon */}
                    {isCAN ? (
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-rose-450 mb-0.5 group-hover:text-rose-300 transition-colors" />
                    ) : (
                      <MapPin className={`w-4 h-4 sm:w-5 sm:h-5 mb-0.5 transition-colors ${
                        isDouala 
                          ? 'text-amber-500' 
                          : 'text-gray-400 group-hover:text-rose-400'
                      }`} />
                    )}

                    {/* Destination Name */}
                    <span className={`text-[10px] sm:text-[11px] font-display font-bold tracking-wider text-center line-clamp-1 transition-colors ${
                      isDouala 
                        ? 'text-amber-100' 
                        : 'text-white group-hover:text-rose-300'
                    }`}>
                      {dest.name}
                    </span>

                    {/* Destination Date */}
                    <span className="text-[7.5px] sm:text-[8.5px] font-mono font-bold text-center tracking-tight mt-0.5 uppercase line-clamp-1 text-white">
                      {isDouala ? '24 SEPT' : `${dest.dateText.split(' ')[0]} ${dest.dateText.split(' ')[1] || ''}`}
                    </span>
                  </div>

                  {/* Vertical node selector guideline when hovering */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-20 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom pointer-events-none ${
                    isDouala ? 'bg-gradient-to-b from-amber-500/40 to-transparent' : 'bg-gradient-to-b from-rose-500/30 to-transparent'
                  }`} />
                </motion.button>
              );
            })}
          </div>
        </div>

      </main>

      {/* Contact & Support Deck with numbers restored and no title label */}
      <div className="w-full max-w-4xl mx-auto mb-6 bg-black/45 border border-white/5 p-4 rounded-xl backdrop-blur-md flex flex-col justify-center gap-3 text-xs z-15 text-center">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full">
          {/* Orange Cameroun phone */}
          <div className="flex items-center justify-center gap-2 bg-orange-500/10 border border-orange-500/20 p-2.5 rounded-xl hover:bg-orange-500/15 transition-all" title="Support Orange Cameroun">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shrink-0" />
            <a href="tel:+237694885086" className="font-mono font-bold text-white hover:text-orange-400 transition-colors text-xs">
              +237 694 88 50 86
            </a>
          </div>

          {/* MTN Support phone */}
          <div className="flex items-center justify-center gap-2 bg-amber-400/10 border border-amber-400/20 p-2.5 rounded-xl hover:bg-amber-400/15 transition-all" title="Support MTN Cameroun">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <a href="tel:+237654152499" className="font-mono font-bold text-white hover:text-amber-400 transition-colors text-xs">
              +237 654 15 24 99
            </a>
          </div>

          {/* General Consulting Email */}
          <div className="flex items-center justify-center gap-2 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl hover:bg-rose-500/15 transition-all" title="Email Mountain Consulting">
            <span className="text-rose-450 text-xs">📧</span>
            <a href="mailto:mountain_consulting@yahoo.fr" className="font-mono font-medium text-white hover:text-rose-450 transition-colors text-[11px] truncate">
              mountain_consulting@yahoo.fr
            </a>
          </div>

          {/* Brand Contact Email */}
          <div className="flex items-center justify-center gap-2 bg-blue-500/10 border border-blue-500/20 p-2.5 rounded-xl hover:bg-blue-500/15 transition-all" title="Email Salon Sportix">
            <span className="text-blue-400 text-xs">📧</span>
            <a href="mailto:contact@salon-sportix.com" className="font-mono font-bold text-white hover:text-blue-400 transition-colors text-[11px] truncate">
              contact@salon-sportix.com
            </a>
          </div>
        </div>
      </div>

      {/* Orbit Controls & Footer Instructions */}
      <footer className="w-full flex flex-col items-center gap-4 z-10">
        
        {/* Animated indicators */}
        <motion.div 
          className="flex flex-col items-center gap-1.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          {/* Custom Mouse Scroll Icon */}
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center p-1 bg-black/10 backdrop-blur-sm">
            <div className="w-1 h-2 bg-rose-400 rounded-full animate-bounce" />
          </div>
        </motion.div>
        
      </footer>
    </div>
  );
}

