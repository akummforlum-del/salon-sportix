import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Trophy, Play, Pause, Compass, HelpCircle, LogIn, Users, Phone, Mail, Globe, Lock, ShieldAlert } from 'lucide-react';
import SportixLogo from './SportixLogo';
import { Destination } from '../types';
import { DESTINATIONS } from '../data';
import bgImg from '../assets/images/sportix_diverse_leaders_1779746487360.png';
import { InsideSportsLogo, FelinLogo, SportThequeLogo } from './CollaboratorsLogos';

interface DestinationOrbitProps {
  onSelectDestination: (destination: Destination) => void;
  onOpenAiHelp?: () => void;
  activeCount: number;
  totalVisits: number;
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

export default function DestinationOrbit({ onSelectDestination, onOpenAiHelp, activeCount, totalVisits }: DestinationOrbitProps) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Veuillez remplir tous les champs.');
      return;
    }
    // Simulate highly professional feedback login success
    setLoginError(null);
    setLoginSuccess('Connexion réussie ! Chargement de votre espace partenaire...');
    setTimeout(() => {
      setIsLoginOpen(false);
      setLoginSuccess(null);
      setLoginEmail('');
      setLoginPassword('');
    }, 2000);
  };

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-x-hidden bg-[#07080b] py-12 px-4 select-none"
      style={{
        backgroundImage: `radial-gradient(circle at center, rgba(10, 11, 16, 0.45) 0%, rgba(7, 8, 11, 0.99) 100%), url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Top Floating Glow FX */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-rose-500/15 to-transparent pointer-events-none blur-3xl opacity-35" />
      
      {/* Official domain display styled neatly at the very top */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <span className="text-[9px] font-mono tracking-[0.4em] text-white/30 hover:text-white/50 transition-colors uppercase">
          OFFICIEL : www.sportix-com.com
        </span>
      </div>

      {/* Header Info */}
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          {/* Subtle logo inside top header */}
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center p-1.5 bg-black/40 backdrop-blur-sm">
            <svg viewBox="0 0 100 100" fill="currentColor" className="text-white w-full h-full">
              <path d="M60 12 L30 52 L50 52 L36 88 L74 44 L52 44 Z" />
            </svg>
          </div>
          <span className="font-display text-xs sm:text-sm tracking-widest text-slate-300 font-medium">SPORTIX SALON</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Visitors Counter System */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-emerald-450 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">
            <Globe className="w-3 h-3 text-emerald-400" />
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>{activeCount} en ligne</span>
          </div>

          <div className="hidden xs:flex items-center gap-1 text-[10px] sm:text-xs font-mono text-slate-400 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
            <span>{totalVisits} visites</span>
          </div>

          {/* AI Helper tool */}
          {onOpenAiHelp && (
            <button
              onClick={onOpenAiHelp}
              className="flex items-center gap-1 text-[10px] sm:text-xs text-rose-450 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 px-3 py-1 rounded-full transition-all cursor-pointer font-medium"
            >
              <HelpCircle className="w-3 h-3 text-rose-400" />
              <span>Aide IA</span>
            </button>
          )}

          {/* Login Option */}
          <button
            onClick={() => setIsLoginOpen(true)}
            className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-200 bg-white/5 border border-white/10 hover:bg-white/15 px-3 py-1 rounded-full transition-all cursor-pointer font-medium"
          >
            <LogIn className="w-3 h-3 text-slate-300" />
            <span>Connexion</span>
          </button>
        </div>
      </header>

      {/* Core Interactive Ring Zone */}
      <main className="relative flex-1 w-full max-w-4xl mx-auto flex items-center justify-center py-6">
        
        {/* Glowing Central Web Orbits */}
        <div className="absolute w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full border border-white/[0.03] pointer-events-none" />
        <div className="absolute w-[380px] h-[380px] sm:w-[580px] sm:h-[580px] rounded-full border border-white/[0.02] pointer-events-none border-dashed animate-spin-slow" />
        
        {/* Subtle glowing ring connecting destinations */}
        <div className="absolute w-[280px] h-[280px] sm:w-[460px] sm:h-[460px] rounded-full border border-white/[0.07] pointer-events-none shadow-[0_0_50px_rgba(255,255,255,0.01)]" />

        {/* Central Logo */}
        <div className="absolute z-10 bg-[#07080b]/90 p-8 sm:p-9 rounded-full backdrop-blur-md border border-white/[0.04] shadow-2xl pointer-events-none max-w-[200px] sm:max-w-none">
          <SportixLogo className="scale-100 sm:scale-125" showSubtitle={true} />
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
                      ? 'bg-[#181510]/95 border-2 border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.5)] group-hover:border-amber-400 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.7)]'
                      : 'bg-[#111218]/95 border border-white/15 group-hover:border-rose-500/50 shadow-lg group-hover:shadow-[0_0_25px_rgba(244,63,94,0.3)]'
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
                  <span className={`text-[7px] sm:text-[8px] font-mono text-center tracking-tight mt-0.5 uppercase line-clamp-1 ${
                    isDouala ? 'text-amber-500/80' : 'text-gray-400'
                  }`}>
                    {dest.dateText.split(' ')[0]} {dest.dateText.split(' ')[1] || ''}
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

      </main>

      {/* Front Contact, Support & Collaborator Desk */}
      <section className="w-full max-w-4xl mx-auto mb-6 bg-black/45 border border-white/5 p-5 rounded-2xl backdrop-blur-md flex flex-col lg:flex-row items-stretch gap-6 text-xs">
        {/* Left Side: Support Phone Numbers */}
        <div className="flex-1 flex flex-col justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Phone className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono text-gray-500 block">SUPPORT ACCUEIL DE PIQUET</span>
              <span className="text-gray-300 font-medium">Assistance Téléphonique Immédiate :</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Orange Cameroun */}
            <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-lg" title="Support Orange Cameroun">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="font-mono text-[10px] text-gray-400">Orange:</span>
              <a href="tel:+237694885086" className="font-mono font-bold text-white hover:text-orange-400 transition-colors">
                +237 694 88 50 86
              </a>
            </div>

            {/* MTN Support */}
            <div className="flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-lg" title="Support MTN Cameroun">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="font-mono text-[10px] text-gray-400">MTN:</span>
              <a href="tel:+237654152499" className="font-mono font-bold text-white hover:text-amber-400 transition-colors">
                +237 654 15 24 99
              </a>
            </div>

            {/* General Consulting Email */}
            <div className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg" title="Consulting Email">
              <Mail className="w-3.5 h-3.5 text-rose-450" />
              <a href="mailto:salon-sportix@yahoo.com" className="font-mono text-[10px] text-white hover:text-rose-450 transition-colors font-semibold">
                salon-sportix@yahoo.com
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Vertical Separator */}
        <div className="hidden lg:block w-px bg-white/10" />
        <div className="block lg:hidden h-px bg-white/10 w-full" />

        {/* Right Side: Collaborators Group Code */}
        <div className="flex flex-col justify-center gap-2.5 shrink-0">
          <div className="text-center lg:text-left">
            <span className="text-[9px] font-mono text-[#d4af37] tracking-[0.3em] uppercase block">ESPACE COLLABORATEURS</span>
            <span className="text-[10px] font-sans font-bold text-gray-300">Partenaires Officiels de Liaison :</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5">
            {/* Inside Sports */}
            <div className="hover:scale-105 transition-transform duration-300">
              <InsideSportsLogo className="h-7" />
            </div>

            {/* Felin */}
            <div className="hover:scale-105 transition-transform duration-300 w-[65px] flex items-center justify-center">
              <FelinLogo className="h-5" />
            </div>

            {/* Sport-theque */}
            <div className="hover:scale-105 transition-transform duration-300">
              <SportThequeLogo className="h-7" />
            </div>
          </div>
        </div>
      </section>

      {/* Orbit Controls & Footer Instructions */}
      <footer className="w-full flex flex-col items-center gap-4 z-10">
        
        {/* Live and Visite indicators badge */}
        <div className="flex items-center gap-4 bg-black/40 border border-white/5 rounded-full px-5 py-2.5 backdrop-blur-md select-none shrink-0 shadow-lg">
          {/* Live indicator */}
          <div className="flex items-center gap-1.5 text-emerald-450 font-mono text-xs">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold">{activeCount}</span>
            <span className="text-gray-400 font-light text-[10px]">EN LIGNE</span>
          </div>

          <span className="h-4 w-[1px] bg-white/10" />

          {/* Visite indicator */}
          <div className="flex items-center gap-1.5 text-amber-500 font-mono text-xs">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-amber-400/30 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
            </span>
            <span className="font-bold">{totalVisits.toLocaleString()}</span>
            <span className="text-gray-400 font-light text-[10px]">VISITES</span>
          </div>

          <span className="h-4 w-[1px] bg-white/10" />

          <span className="text-[9px] font-mono text-gray-500 tracking-wide">
            {isHovered ? '🔒 FIGÉ (SURVOL)' : '⚙️ SYSTÈME ACTIF'}
          </span>
        </div>

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
        
        <p className="text-[10px] font-mono tracking-[0.3em] text-gray-400 uppercase text-center">
          Sélectionnez une destination
        </p>
      </footer>

      {/* LOGIN MODAL (SIMULATED DOCK FOR ACCÈS PARTENAIRES) */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Glass Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-[#0f1016] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
            >
              {/* Top lock decoration */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-semibold text-white tracking-wide">Accès Partenaire</h4>
                    <p className="text-[9px] font-mono text-gray-500">CONNEXION SÉCURISÉE SSL</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsLoginOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-sm"
                >
                  ✕
                </button>
              </div>

              {loginError && (
                <div className="mb-4 bg-red-500/10 border border-red-500/25 rounded-xl p-3 text-[11px] text-red-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {loginSuccess && (
                <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-[11px] text-emerald-400">
                  {loginSuccess}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1.5">Identifiant ou Adresse E-mail</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="partenaire@sportix-com.com"
                    className="w-full bg-black/40 border border-white/10 focus:border-amber-500/50 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Mot de Passe</label>
                    <a href="#reset" onClick={(e) => { e.preventDefault(); alert("Un e-mail de réinitialisation a été envoyé à l'administrateur Michel."); }} className="text-[9px] font-mono text-gray-600 hover:text-gray-400">Perdu ?</a>
                  </div>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-black/40 border border-white/10 focus:border-amber-500/50 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 focus:outline-none transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black py-3 rounded-xl font-semibold text-xs active:scale-95 transition-all cursor-pointer shadow-lg shadow-amber-950/20"
                  >
                    S'authentifier
                  </button>
                </div>
              </form>

              <div className="mt-6 border-t border-white/5 pt-4 text-[9px] font-mono text-gray-600 text-center">
                Portail réservé aux organisateurs, sponsors et exposants officiels du Roadshow Sportix.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
