import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Menu, Bell, Calendar, Sparkles, Instagram, Facebook, Twitter, Youtube, CheckCircle, X, Phone, Globe
} from 'lucide-react';
import { Destination } from '../types';
import { DESTINATIONS } from '../data';
import SportixLogo from './SportixLogo';
import NotifyModal from './NotifyModal';
import bgImg from '../assets/images/sportix_diverse_leaders_1779746487360.png';
import { InsideSportsLogo, FelinLogo, SportThequeLogo } from './CollaboratorsLogos';

interface DestinationDetailProps {
  currentDestination: Destination;
  onBackToOrbit: () => void;
  onNavigateToDestination: (destination: Destination) => void;
  onOpenAiHelp?: () => void;
  activeCount: number;
  totalVisits: number;
}

export default function DestinationDetail({ 
  currentDestination, 
  onBackToOrbit, 
  onNavigateToDestination,
  onOpenAiHelp,
  activeCount,
  totalVisits
}: DestinationDetailProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 112, hours: 14, minutes: 36, seconds: 52 });
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Cumulative live counter ticking up continuously in real-time
  const [cumulativeInscriptions, setCumulativeInscriptions] = useState(0);

  useEffect(() => {
    // Generate a beautiful base count depending on city
    let baseCount = 3450;
    if (currentDestination.id === 'douala') baseCount = 5820;
    else if (currentDestination.id === 'yaounde') baseCount = 3120;
    else if (currentDestination.id === 'abidjan') baseCount = 7430;
    else if (currentDestination.id === 'cotonou') baseCount = 2190;
    else if (currentDestination.id === 'nairobi') baseCount = 6880;
    else if (currentDestination.id === 'casablanca') baseCount = 3760;

    setCumulativeInscriptions(baseCount);

    const interval = setInterval(() => {
      setCumulativeInscriptions(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [currentDestination.id]);

  // Active live ticking countdown
  useEffect(() => {
    const calculateTime = () => {
      const difference = currentDestination.targetDate.getTime() - Date.now();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculateTime());
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [currentDestination]);

  // Download functional .ics file for calendar integration
  const handleAddToCalendar = () => {
    // Format dates nicely
    const dateFormatted = currentDestination.targetDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sportix//Salon//FR
BEGIN:VEVENT
UID:sportix-${currentDestination.id}-${Date.now()}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}
DTSTART:${dateFormatted}
DTEND:${dateFormatted}
SUMMARY:Sportix Salon ${currentDestination.name}
DESCRIPTION:Le grand rendez-vous de l'innovation et de l'économie sportive en Afrique. Rejoignez-nous !
LOCATION:${currentDestination.name}, ${currentDestination.subtext}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sportix_salon_${currentDestination.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Provide visual feedback
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleScrollDown = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full flex bg-[#0c0d10] text-[#f1f5f9] overflow-hidden">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-[84px] md:w-[280px] shrink-0 border-r border-white/5 bg-[#090a0d] flex flex-col justify-between items-center md:items-stretch py-8 z-20">
        
        {/* Top Logo */}
        <div className="px-2 md:px-6 mb-8 cursor-pointer" onClick={onBackToOrbit}>
          <SportixLogo className="scale-85 md:scale-100" showSubtitle={true} />
        </div>

        {/* Medium Nav List */}
        <nav className="flex-1 w-full px-2 md:px-4 space-y-2.5 flex flex-col justify-center">
          {DESTINATIONS.map((dest) => {
            const isSelected = dest.id === currentDestination.id;
            return (
              <button
                key={dest.id}
                onClick={() => onNavigateToDestination(dest)}
                className={`w-full group relative flex items-center gap-3.5 py-3.5 px-3 rounded-xl text-left transition-all overflow-hidden ${
                  isSelected 
                    ? 'bg-gradient-to-r from-white/5 to-white/[0.01] text-white border border-white/10' 
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.02] border border-transparent'
                }`}
              >
                {/* Active Indicator Pills */}
                {isSelected && (
                  <motion.div 
                    layoutId="activePill"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-rose-500 rounded-r-full"
                  />
                )}

                {/* Circular indicator light */}
                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  isSelected ? 'border-rose-400' : 'border-gray-600 group-hover:border-gray-400'
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />}
                </div>

                {/* City Information */}
                <div className="hidden md:flex flex-col">
                  <span className="text-xs font-display font-bold tracking-wider leading-none">
                    {dest.name}
                  </span>
                  <span className="text-[9px] font-mono text-gray-500 mt-0.5 uppercase tracking-tighter">
                    {dest.subtext?.split(',')[0]}
                  </span>
                </div>

                {/* Tooltip for small sizes */}
                <div className="md:hidden absolute left-full ml-4 bg-[#12131a] border border-white/10 text-[10px] py-1.5 px-3 rounded-md font-mono tracking-wider uppercase opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-xl whitespace-nowrap">
                  {dest.name} ({dest.dateText.split(' ')[0]})
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom Social Links & Footer */}
        <div className="w-full px-2 md:px-6 space-y-6">
          {/* Social icons row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors" title="X (Twitter)">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors" title="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright description */}
          <p className="hidden md:block text-[8px] font-mono tracking-widest text-center text-gray-600 leading-relaxed uppercase">
            © SPORTIX SALON<br />TOUS DROITS RÉSERVÉS
          </p>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD AREA */}
      <section className="flex-1 min-h-screen overflow-y-auto flex flex-col justify-between scroll-smooth relative">
        
        {/* Top Header Deck - Sticky & Transparent with glassmorphism */}
        <header className="sticky top-0 z-30 w-full flex justify-between items-center px-6 py-4 md:px-12 md:py-6 bg-[#0c0d10]/70 backdrop-blur-md border-b border-white/5 shrink-0">
          {/* Back Button */}
          <motion.button
            onClick={onBackToOrbit}
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center justify-center w-11 h-11 rounded-xl bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-colors cursor-pointer"
            title="Retour à la constellation"
          >
            <ChevronLeft className="w-5 h-5 group-hover:text-rose-400 transition-colors" />
          </motion.button>

          <div className="flex items-center gap-3">
            {/* Live Visitors Stats */}
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-emerald-450 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-2.5 py-1.5 h-11">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-450 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>{activeCount} en ligne</span>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-xl px-2.5 py-1.5 h-11" title="Visiteurs uniques sur ce salon">
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>{(currentDestination.reachedCount || 2350).toLocaleString()} consultés</span>
            </div>
            
            <div className="hidden select-none md:flex items-center text-[10px] sm:text-xs font-mono text-slate-400 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 h-11">
              <span>{totalVisits} visites</span>
            </div>

            {onOpenAiHelp && (
              <motion.button
                onClick={onOpenAiHelp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-all text-xs font-semibold cursor-pointer select-none"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span className="hidden sm:inline">Aide IA</span>
              </motion.button>
            )}

            {/* Main Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-black/40 border border-white/10 text-white hover:bg-[#12131a] transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
        </header>

        {/* Core Detail Banner Screen */}
        <div 
          className="relative flex-1 w-full flex flex-col justify-center items-center md:items-start p-6 md:p-12"
          style={{
            backgroundImage: `radial-gradient(circle at top left, rgba(16, 17, 24, 0.45) 0%, rgba(12, 13, 16, 0.99) 100%), url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Inner Content Block */}
          <main className="w-full max-w-4xl z-10 space-y-6 py-12 flex flex-col items-center md:items-start justify-center">
            


            {/* Giant Title of City */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-white mb-2 leading-none uppercase select-none text-center md:text-left">
              SALON SPORTIX {currentDestination.name}
            </h1>

            {/* Date subtitle */}
            <p className="text-base md:text-lg font-display text-gray-400 tracking-wider font-light uppercase select-none text-center md:text-left">
              {currentDestination.dateText}
            </p>

            {/* Countdown metrics */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm w-full select-none">
              {/* DAYS */}
              <div className="relative flex flex-col items-center justify-center border border-white/10 rounded-xl bg-black/50 backdrop-blur-md py-4 min-w-[70px]">
                <span className="text-2xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-gray-500 mt-1 uppercase">
                  JOURS
                </span>
              </div>

              {/* HOURS */}
              <div className="relative flex flex-col items-center justify-center border border-white/10 rounded-xl bg-black/50 backdrop-blur-md py-4 min-w-[70px]">
                <span className="text-2xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-gray-500 mt-1 uppercase">
                  HEURES
                </span>
              </div>

              {/* MINUTES */}
              <div className="relative flex flex-col items-center justify-center border border-white/10 rounded-xl bg-black/50 backdrop-blur-md py-4 min-w-[70px]">
                <span className="text-2xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-gray-500 mt-1 uppercase">
                  MINUTES
                </span>
              </div>

              {/* SECONDS */}
              <div className="relative flex flex-col items-center justify-center border border-rose-500/20 rounded-xl bg-[#1a0f12]/45 backdrop-blur-md py-4 min-w-[70px]">
                <span className="text-2xl sm:text-4xl font-mono font-bold text-rose-450 tracking-tight animate-pulse-slow">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-[#f43f5e]/60 mt-1 uppercase">
                  SECONDES
                </span>
              </div>
            </div>

            {/* Cumulative Live Counter System - Continuous addition without arrival */}
            <div className="w-full max-w-sm flex flex-col bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 select-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400 animate-spin-slow" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Système cumulé en direct (Inscriptions)</span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1.5">
                <span className="text-2xl font-mono font-bold text-white tracking-tight">
                  {cumulativeInscriptions.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400 font-light font-sans">participants cumulés</span>
                <span className="flex h-1.5 w-1.5 relative ml-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-[9px] font-mono text-gray-500 mt-1">
                Mise à jour en continu sans interruption • Réseau Sportix Salon
              </p>
            </div>

            {/* Direct Information Details */}
            <div className="flex flex-col gap-3.5 py-1 w-full max-w-md items-center md:items-start text-left">
              {currentDestination.phones && currentDestination.phones.length > 0 && (
                <div className="w-full flex items-start gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl p-3.5">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="text-[10px] font-mono uppercase text-amber-500 tracking-wider">Secrétariat & Liaison Directe</h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-1.5">
                      {currentDestination.phones.map((phone, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 font-mono text-sm animate-fade-in">
                          <span className="w-1 h-1 rounded-full bg-amber-500" />
                          <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-bold text-slate-100 hover:text-amber-400 transition-colors">
                            {phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Collaborators Panel inside the Direct Info area */}
              <div className="w-full bg-[#13141b]/95 border border-white/5 rounded-xl p-3.5 flex flex-col gap-2.5">
                <div className="text-left">
                  <span className="text-[9px] font-mono text-[#d4af37] tracking-[0.2em] uppercase block">ESPACE COLLABORATEURS</span>
                  <p className="text-[10px] font-bold text-gray-300">Partenaires Officiels de Liaison :</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4.5 mt-1">
                  <div className="hover:scale-105 transition-transform duration-300 bg-neutral-900 border border-white/5 rounded p-1 flex items-center justify-center">
                    <InsideSportsLogo className="h-6" />
                  </div>
                  <div className="w-px h-5 bg-white/10" />
                  <div className="hover:scale-105 transition-transform duration-300 w-[60px] flex items-center justify-center bg-neutral-900 border border-white/5 rounded p-1">
                    <FelinLogo className="h-4.5" />
                  </div>
                  <div className="w-px h-5 bg-white/10" />
                  <div className="hover:scale-105 transition-transform duration-300 bg-neutral-900 border border-white/5 rounded p-1 flex items-center justify-center">
                    <SportThequeLogo className="h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons array */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-2">
              <motion.button
                onClick={() => setIsNotifyOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto relative flex items-center justify-center gap-2 rounded-xl bg-white text-black font-semibold py-3 px-5 text-xs hover:bg-rose-100 transition-all cursor-pointer shadow-xl shadow-rose-950/5"
              >
                <Bell className="w-4 h-4 text-black animate-swing" />
                <span>S'abonner aux alertes (SMS & Email)</span>
              </motion.button>

              <motion.button
                onClick={handleAddToCalendar}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#14151b]/90 border border-white/10 text-white font-semibold hover:border-white/20 py-3 px-5 text-xs transition-all cursor-pointer animate-fade-in"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400 animate-bounce" />
                    <span>Ajouté au calendrier !</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Ajouter au calendrier</span>
                  </>
                )}
              </motion.button>
            </div>
          </main>
        </div>
      </section>

      {/* 5. FLOATING HAMBURGER MENU DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative z-10 w-full max-w-sm bg-[#0e0f14] border-l border-white/10 p-8 flex flex-col justify-between"
            >
              {/* Top Drawer Controls */}
              <div>
                <div className="flex justify-between items-center mb-10">
                  <SportixLogo className="scale-90" showSubtitle={false} />
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-mono tracking-[0.4em] text-[#d4af37] uppercase">À PROPOS DE SPORTIX</h4>
                  
                  <ul className="space-y-4 font-display text-base">
                    {onOpenAiHelp && (
                      <li>
                        <button 
                          onClick={() => {
                            setIsMenuOpen(false);
                            onOpenAiHelp();
                          }} 
                          className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-2 cursor-pointer w-full text-left"
                        >
                          ✨ Sportix Guide IA
                        </button>
                      </li>
                    )}
                    <li>
                      <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white font-medium block">
                        📢 Le Salon
                      </a>
                    </li>
                    <li>
                      <a href="#programme" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white font-medium block">
                        🗓️ Programme Général
                      </a>
                    </li>
                    <li>
                      <a href="#speakers" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white font-medium block">
                        🎙️ Devenir Intervenant
                      </a>
                    </li>
                    <li>
                      <a href="#partners" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white font-medium block">
                        🤝 Sponsoring & Presse
                      </a>
                    </li>
                  </ul>

                  <p className="text-xs text-gray-500 leading-relaxed font-light mt-6">
                    Sportix Salon est le premier roadshow d'affaires du sport en Afrique, connectant technologies, infrastructures innovantes, sport-business et décideurs étatiques.
                  </p>
                </div>
              </div>

              {/* Bottom Info inside Drawer */}
              <div className="space-y-4">
                <div className="rounded-xl bg-[#13141b] border border-white/5 p-4 text-xs space-y-2">
                  <span className="font-mono text-[9px] text-[#d4af37] uppercase tracking-wider block">CONTACT GENERAL</span>
                  <p className="text-gray-300">📧 salon-sportix@yahoo.com</p>
                  <p className="text-gray-300">📞 +237 600 000 000</p>
                </div>

                <span className="text-[9px] font-mono text-gray-650 tracking-widest text-center block uppercase">
                  Sportix Roadshow &copy; 2026
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Register alert modal */}
      <NotifyModal 
        isOpen={isNotifyOpen} 
        onClose={() => setIsNotifyOpen(false)} 
        destination={currentDestination} 
      />

    </div>
  );
}
