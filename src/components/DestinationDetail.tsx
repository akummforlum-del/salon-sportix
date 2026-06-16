import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Menu, Bell, Calendar, Sparkles, Instagram, Facebook, Twitter, Youtube, CheckCircle, X, Phone, Globe, LogIn
} from 'lucide-react';
import { Destination, User } from '../types';
import { DESTINATIONS } from '../data';
import SportixLogo from './SportixLogo';
import NotifyModal from './NotifyModal';
import bgImg from '../assets/images/diverse_stadium_suite_1780564197298.png';
import exactPeopleImg from '../assets/images/sportix_exact_people_1780550707928.png';


interface DestinationDetailProps {
  currentDestination: Destination;
  onBackToOrbit: () => void;
  onNavigateToDestination: (destination: Destination) => void;
  onOpenAiHelp?: () => void;
  activeCount: number;
  totalVisits: number;
  user: User | null;
  onLogout: () => void;
  onOpenLogin: () => void;
  onOpenRadar: () => void;
}

export default function DestinationDetail({ 
  currentDestination, 
  onBackToOrbit, 
  onNavigateToDestination,
  onOpenAiHelp,
  activeCount,
  totalVisits,
  user,
  onLogout,
  onOpenLogin,
  onOpenRadar
}: DestinationDetailProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 112, hours: 14, minutes: 36, seconds: 52 });
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [selectedRequest, setSelectedRequest] = useState<'visiteur' | 'exposant' | 'sponsor' | 'media'>('visiteur');

  const getWhatsappLink = (phone: string, requestType: 'visiteur' | 'exposant' | 'sponsor' | 'media') => {
    const rawNumber = phone.replace(/[^\d]/g, '');
    let text = '';
    
    switch (requestType) {
      case 'exposant':
        text = `Bonjour Salon Sportix, je vous écris depuis la plateforme web. Je m'intéresse au Salon Sportix de ${currentDestination.name} et je souhaite obtenir des informations pour réserver un stand (Exposant). Merci de m'envoyer les modalités !`;
        break;
      case 'sponsor':
        text = `Bonjour Salon Sportix, je vous écris suite à ma visite sur le site web. Je suis intéressé(e) par les opportunités de partenariat et sponsoring pour le Salon Sportix de ${currentDestination.name}. J'aimerais recevoir votre dossier de sponsoring.`;
        break;
      case 'media':
        text = `Bonjour Salon Sportix, je vous contacte depuis le site internet. Je souhaite formuler une demande d'accréditation média / presse pour couvrir le Salon Sportix de ${currentDestination.name}.`;
        break;
      case 'visiteur':
      default:
        text = `Bonjour Salon Sportix, je viens de visiter votre site internet concernant le Salon Sportix de ${currentDestination.name}. Je souhaiterais avoir plus d'informations générales sur l'événement en tant que visiteur.`;
        break;
    }
    
    return `https://api.whatsapp.com/send?phone=${rawNumber}&text=${encodeURIComponent(text)}`;
  };

  // Cumulative live counter ticking up continuously in real-time
  const [cumulativeInscriptions, setCumulativeInscriptions] = useState(0);

  // Real live system helper to record page views and fetch current statistics
  useEffect(() => {
    let id = sessionStorage.getItem('sportix_session_id');
    if (!id) {
      id = 'sp_sess_' + Math.random().toString(36).substring(2, 10);
      sessionStorage.setItem('sportix_session_id', id);
    }
    const sessionId = id;

    const recordEntryAndSync = async () => {
      try {
        const res = await fetch('/api/visitors/enter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ destinationId: currentDestination.id, sessionId })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.currentCount === 'number') {
            setCumulativeInscriptions(data.currentCount);
            return;
          }
        }
      } catch (err) {
        console.warn("Real live entry register error, using offline default:", err);
      }

      // Offline seed fallbacks if connection is lost
      let baseCount = 3450;
      if (currentDestination.id === 'douala') baseCount = 5820;
      else if (currentDestination.id === 'yaounde') baseCount = 3120;
      else if (currentDestination.id === 'abidjan') baseCount = 7430;
      else if (currentDestination.id === 'cotonou') baseCount = 2190;
      else if (currentDestination.id === 'nairobi') baseCount = 6880;
      else if (currentDestination.id === 'casablanca') baseCount = 3760;
      setCumulativeInscriptions(baseCount);
    };

    recordEntryAndSync();

    // Setup live continuous polling to aggregate views as other people enter the site
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/visitors/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            currentPath: `Salon ${currentDestination.name}`
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.destinationVisits && typeof data.destinationVisits[currentDestination.id] === 'number') {
            setCumulativeInscriptions(data.destinationVisits[currentDestination.id]);
          }
        }
      } catch (e) {
        // Fallback local visual addition to represent traffic continuous simulation
        setCumulativeInscriptions(prev => prev + Math.floor(Math.random() * 2) + 1);
      }
    }, 3500);

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
SUMMARY:Salon Sportix ${currentDestination.name}
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
          <SportixLogo className="scale-85 md:scale-100" showSubtitle={true} placeName={currentDestination.name} />
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
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#f26d21] rounded-r-full"
                  />
                )}

                {/* Circular indicator light */}
                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  isSelected ? 'border-[#f26d21]' : 'border-gray-600 group-hover:border-gray-400'
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#f26d21]" />}
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
            © SALON SPORTIX<br />TOUS DROITS RÉSERVÉS
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
            <ChevronLeft className="w-5 h-5 group-hover:text-[#f26d21] transition-colors" />
          </motion.button>

          <div className="flex items-center gap-3">
            {onOpenAiHelp && (
              <motion.button
                onClick={onOpenAiHelp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 h-11 rounded-xl bg-[#f26d21]/15 border border-[#f26d21]/35 text-[#f26d21] hover:bg-[#f26d21]/25 transition-all text-xs font-semibold cursor-pointer select-none"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#f26d21] animate-pulse" />
                <span className="hidden sm:inline">Aide IA</span>
              </motion.button>
            )}

            {/* Log-In Options Space */}
            {user ? (
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl pl-2.5 pr-3 h-11 text-[11px] font-sans hover:bg-white/8 transition-colors select-none">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-5 h-5 rounded-full object-cover border border-white/20"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left leading-none hidden xs:block">
                  <span className="text-white font-bold block max-w-[85px] truncate">{user.name}</span>
                  <span className="text-[7.5px] font-mono text-amber-500 font-bold tracking-wider block mt-0.5">{user.role}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-[9.5px] font-mono text-gray-500 hover:text-[#f26d21] pl-1.5 border-l border-white/10 hover:underline transition-colors cursor-pointer"
                >
                  Sortir
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-200 bg-white/5 border border-white/10 hover:bg-white/15 px-3 h-11 rounded-xl transition-all cursor-pointer font-medium"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-300" />
                <span className="hidden xs:inline">Connexion</span>
              </button>
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

        {/* Core Detail Banner Screen - Image is 100% clear with zero dark overlays */}
        <div 
          className="relative flex-1 w-full flex flex-col justify-center items-center md:items-start p-6 md:p-12"
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Inner Content Block */}
          <main className="w-full max-w-6xl z-10 py-8 px-2 sm:px-6">
            {currentDestination.id === 'douala' ? (
              <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-6">
                
                {/* Titles */}
                <div className="flex flex-col items-center text-center select-none">
                  <h1 className="text-3.5xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white flex flex-col sm:flex-row items-center justify-center gap-x-2.5 gap-y-1 mt-1">
                    <span>SALON SPORTIX</span>
                    <span className="text-white uppercase font-black">
                      {currentDestination.name}
                    </span>
                  </h1>
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mt-1">
                    📍 {currentDestination.subtext}
                  </p>
                </div>

                {/* Countdown Metrics Row (Contour Time) */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
                  <div className="grid grid-cols-4 gap-2.5 w-full select-none">
                    {/* DAYS */}
                    <div className="relative flex flex-col items-center justify-center border border-white/5 rounded-xl bg-black/40 backdrop-blur-md py-3 min-w-[65px]">
                      <span className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                        {String(timeLeft.days).padStart(2, '0')}
                      </span>
                      <span className="text-[7.5px] font-mono tracking-widest text-gray-500 mt-1 uppercase">
                        JOURS
                      </span>
                    </div>

                    {/* HOURS */}
                    <div className="relative flex flex-col items-center justify-center border border-white/5 rounded-xl bg-black/40 backdrop-blur-md py-3 min-w-[65px]">
                      <span className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </span>
                      <span className="text-[7.5px] font-mono tracking-widest text-gray-500 mt-1 uppercase">
                        HEURES
                      </span>
                    </div>

                    {/* MINUTES */}
                    <div className="relative flex flex-col items-center justify-center border border-white/5 rounded-xl bg-black/40 backdrop-blur-md py-3 min-w-[65px]">
                      <span className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </span>
                      <span className="text-[7.5px] font-mono tracking-widest text-gray-500 mt-1 uppercase">
                        MINUTES
                      </span>
                    </div>

                    {/* SECONDS */}
                    <div className="relative flex flex-col items-center justify-center border border-[#f26d21]/20 rounded-xl bg-[#1c110f]/45 backdrop-blur-md py-3 min-w-[65px]">
                      <span className="text-xl sm:text-2xl font-mono font-bold text-[#f26d21] tracking-tight animate-pulse-slow">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </span>
                      <span className="text-[7.5px] font-mono tracking-widest text-[#f26d21]/60 mt-1 uppercase">
                        SECONDES
                      </span>
                    </div>
                  </div>
                </div>

                {/* Two Visual Cards (Viseul) just below Contour Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-2 px-1">
                  {/* Visual 1: Premium Blue Poster fitted perfectly inside */}
                  <div className="w-full bg-[#20318A] rounded-[2.5rem] pb-0 text-center border-4 border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.35)] relative overflow-hidden flex flex-col items-center justify-between min-h-[500px] sm:min-h-[560px] select-none text-white">
                    {/* Miniature Sportix Logo in its own isolated white banner to prevent touching the blue background */}
                    <div className="w-full bg-white py-4 flex justify-center border-b border-slate-200/50 shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-t-[2.2rem]">
                      <div className="transform scale-90">
                        <SportixLogo showSubtitle={false} />
                      </div>
                    </div>
                    
                    <div className="px-4 flex-1 flex flex-col items-center justify-center space-y-3.5 mt-5">
                      <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-none font-display">
                        SALON SPORTIX
                      </h2>
                      
                      <p className="text-[10px] sm:text-xs font-black text-slate-200 tracking-normal uppercase max-w-[280px] leading-relaxed font-sans px-1 text-center font-display">
                        {currentDestination.fullTitle}
                      </p>
                      
                      <div className="text-sm sm:text-base font-bold tracking-[0.2em] font-sans text-white uppercase">
                        {currentDestination.name}
                      </div>
                      
                      <div className="bg-white/10 text-white text-xs sm:text-sm font-black tracking-normal px-4 py-2 rounded-2xl border border-white/10 shadow-md flex items-center gap-2 mt-0.5">
                        <span>🗓️</span>
                        <span>{currentDestination.dateText}</span>
                      </div>
                      
                      <div className="bg-[#f26d21] text-white text-[9px] font-bold uppercase py-0.5 px-3.5 rounded mt-1.5 inline-block font-sans">
                        Prix d'entrée
                      </div>
                      
                      <div className="text-base sm:text-lg font-black text-white font-mono">
                        {currentDestination.entrancePrice}
                      </div>
                    </div>

                    {/* Integrated dynamic image blending beautifully at bottom */}
                    <div className="relative w-full overflow-hidden mt-6">
                      <img 
                        src={exactPeopleImg} 
                        alt="Audience & Athletes" 
                        className="w-full h-auto object-cover transform translate-y-1 scale-105 animate-fade-in"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#20318A]/40 to-transparent" />
                    </div>

                    {/* Integrated WhatsApp numbers section below the image */}
                    <div className="py-3.5 px-5 w-full bg-black/20 border-t border-b border-white/10 flex flex-col items-center justify-center space-y-1.5 z-10 relative">
                      <span className="text-[9px] font-mono tracking-widest text-[#22c55e] font-extrabold uppercase">CLIQUEZ POUR CHATTER WHATSAPP</span>
                      <div className="flex flex-col items-center gap-1.5 w-full">
                        {currentDestination.phones.map((phone, idx) => (
                          <a 
                            key={idx}
                            href={getWhatsappLink(phone, selectedRequest)}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full flex items-center justify-center gap-1 py-1.5 px-3 bg-[#22c55e]/15 border border-[#22c55e]/20 hover:bg-[#22c55e]/30 text-[#22c55e] font-bold font-mono text-[10.5px] rounded-xl transition-all cursor-pointer shadow-md shadow-black/10"
                          >
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse shrink-0" />
                            {phone}
                          </a>
                        ))}
                        {/* Beside/below the phones of different places, add this email */}
                        <a 
                          href="mailto:contact@salon-sportix.com"
                          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/25 text-blue-450 font-bold font-mono text-[10.5px] rounded-xl transition-all cursor-pointer shadow-md shadow-black/10 mt-1"
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                          contact@salon-sportix.com
                        </a>
                      </div>
                    </div>
                    
                    {/* Orange Bottom Band */}
                    <div className="w-full h-3.5 bg-[#f26d21]" />

                    {/* Visual glowing backdrops */}
                    <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#f26d21]/15 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                    {/* Futuristic Glass & Holographic Overlay Filter for Visual 1 */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/10 to-white/0 mix-blend-overlay opacity-80 z-20 transition-all duration-700 group-hover/v1:rotate-12 group-hover/v1:scale-150" />
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent mix-blend-color-dodge z-10" />
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#f26d21]/15 via-transparent to-transparent mix-blend-plus-lighter z-10" />
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%)] bg-[size:100%_4px] opacity-25 z-10" />
                  </div>

                  {/* Visual 2: Recreated High-Fidelity physical flyer from the uploaded image */}
                  <div className="rounded-[2.5rem] border-4 border-white/20 bg-[#f8fafc] flex flex-col justify-between items-center relative overflow-hidden group/v2 select-none min-h-[500px] sm:min-h-[560px] text-center shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-slate-900">
                    
                    {/* Abstract high-rise background pattern like skyscraper blueprint */}
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0">
                      <svg className="w-full h-full" viewBox="0 0 400 600" fill="currentColor">
                        <rect x="25" y="180" width="45" height="420" />
                        <rect x="80" y="120" width="55" height="480" />
                        <rect x="145" y="70" width="65" height="530" />
                        <rect x="220" y="220" width="50" height="380" />
                        <rect x="280" y="140" width="60" height="460" />
                        <rect x="350" y="90" width="45" height="510" />
                        <line x1="0" y1="250" x2="400" y2="250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6,6" />
                        <line x1="0" y1="380" x2="400" y2="380" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6,6" />
                        <line x1="0" y1="480" x2="400" y2="480" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6,6" />
                      </svg>
                    </div>

                    {/* Logo Section */}
                    <div className="pt-6 sm:pt-7 w-full flex items-center justify-center z-10 transition-transform group-hover/v2:scale-102 duration-300">
                      <SportixLogo showSubtitle={false} variant="light" />
                    </div>

                    {/* Header Title Match */}
                    <div className="px-5 mt-2.5 z-10">
                      <h3 className="text-xs sm:text-[14px]/tight font-sans font-black tracking-tight text-[#20318A] uppercase">
                        SALON DES MÉTIERS, ACTEURS ET<br />
                        <span className="text-[#f26d21]">PROFESSIONNELS DU SPORT</span>
                      </h3>
                    </div>

                    {/* "C'est" Pill Wrapper */}
                    <div className="my-2 z-10">
                      <span className="bg-[#f26d21] text-white font-sans font-black text-[11px] sm:text-xs px-6 py-1 rounded-lg uppercase tracking-wider inline-block shadow-md">
                        C'est
                      </span>
                    </div>

                    {/* Bullet Points of Activities */}
                    <div className="w-full px-5 flex flex-col items-center space-y-1.5 z-10 text-slate-800">
                      {/* Dominant Highlight Centered */}
                      <div className="flex items-center gap-1.5 justify-center py-0.5 px-3 bg-orange-500/5 rounded-full border border-orange-500/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f26d21] shrink-0 animate-ping" />
                        <span className="text-[10px] sm:text-[11px] font-black text-slate-850 uppercase tracking-tight">Visite des stands des exposants</span>
                      </div>

                      {/* Columns Grid */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full text-left max-w-[290px] sm:max-w-md mx-auto pt-1 pb-3 px-1">
                        {/* Left Column Activities */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f26d21] shrink-0" />
                            <span className="text-[9.5px] sm:text-[10.5px] font-extrabold text-slate-800">Masterclass</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f26d21] shrink-0" />
                            <span className="text-[9.5px] sm:text-[10.5px] font-extrabold text-slate-800">Causerie débats</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f26d21] shrink-0" />
                            <span className="text-[9.5px] sm:text-[10.5px] font-extrabold text-slate-800">Afterworks</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f26d21] shrink-0" />
                            <span className="text-[9.5px] sm:text-[10.5px] font-extrabold text-slate-800">Jeux / Tombola</span>
                          </div>
                        </div>

                        {/* Right Column Activities */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f26d21] shrink-0" />
                            <span className="text-[9.5px] sm:text-[10.5px] font-extrabold text-slate-800">Séminaires</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f26d21] shrink-0" />
                            <span className="text-[9.5px] sm:text-[10.5px] font-extrabold text-slate-800">Meet & Greet Legends</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f26d21] shrink-0" />
                            <span className="text-[9.5px] sm:text-[10.5px] font-extrabold text-slate-800">Biopic</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f26d21] shrink-0" />
                            <span className="text-[9.5px] sm:text-[10.5px] font-extrabold text-slate-800">Couverture Média</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dual Pricing Tables Option layout */}
                    <div className="grid grid-cols-2 gap-2 w-full px-3.5 mb-2.5 z-10 text-left">
                      {/* Option 500 CFA */}
                      <div className="bg-[#108c44] rounded-2xl p-2.5 text-white flex flex-col justify-between h-full shadow-[0_4px_12px_rgba(16,140,68,0.25)] hover:scale-102 transition-transform duration-300">
                        <div>
                          <div className="border-b border-white/20 pb-1 mb-1.5">
                            <p className="text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold opacity-85">Ticket / jour</p>
                            <p className="text-xs sm:text-[13px] font-mono font-black text-yellow-300 mt-0.5">500 F CFA</p>
                          </div>
                          <ul className="space-y-1 text-[8px] sm:text-[8.5px]/tight font-medium opacity-95">
                            <li className="flex items-start gap-1">
                              <span className="opacity-95">•</span>
                              <span>1 ticket d'entrée pour visiter les stands</span>
                            </li>
                            <li className="flex items-start gap-1">
                              <span className="opacity-95">•</span>
                              <span>1 ticket tombola pour de nombreux lots</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Option 1000 CFA */}
                      <div className="bg-[#e0560b] rounded-2xl p-2.5 text-white flex flex-col justify-between h-full shadow-[0_4px_12px_rgba(224,86,11,0.25)] hover:scale-102 transition-transform duration-300">
                        <div>
                          <div className="border-b border-white/20 pb-1 mb-1.5">
                            <p className="text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold opacity-85">Ticket / jour</p>
                            <p className="text-xs sm:text-[13px] font-mono font-black text-yellow-200 mt-0.5">1 000 F CFA</p>
                          </div>
                          <ul className="space-y-1 text-[7.5px] sm:text-[8px]/tight font-medium opacity-95">
                            <li className="flex items-start gap-0.5">
                              <span>•</span>
                              <span>1 ticket d'entrée</span>
                            </li>
                            <li className="flex items-start gap-0.5">
                              <span>•</span>
                              <span>1 petite bouteille d'eau</span>
                            </li>
                            <li className="flex items-start gap-0.5">
                              <span>•</span>
                              <span>1 ticket tombola (super lots)</span>
                            </li>
                            <li className="flex items-start gap-0.5">
                              <span>•</span>
                              <span>Accès aux stands + séminaires</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Branded Contact & Web bar */}
                    <div className="w-full bg-[#20318A] py-2.5 px-4 flex items-center justify-between text-white text-[9px] font-mono border-t border-slate-200/5 z-10">
                      <a href="https://www.salon-sportix.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-orange-400 transition-colors">
                        <Globe className="w-3 text-orange-400" />
                        <span>www.salon-sportix.com</span>
                      </a>
                      
                      <div className="flex items-center gap-1 text-white/95 font-bold">
                        <Phone className="w-3 text-orange-400" />
                        <a href="tel:+237694885086" className="hover:text-orange-450 transition-colors">694 88 50 86</a>
                        <span>/</span>
                        <a href="tel:+237695711582" className="hover:text-orange-450 transition-colors">695 71 15 82</a>
                      </div>
                    </div>

                    {/* Futuristic Glass & Luminous Overlay Filter for Visual 2 */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/10 to-white/0 mix-blend-overlay opacity-60 z-20 transition-all duration-700 group-hover/v2:rotate-12 group-hover/v2:scale-150" />
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent mix-blend-color-dodge z-10" />
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#20318A]/5 via-transparent to-transparent mix-blend-plus-lighter z-10" />
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.03)_50%)] bg-[size:100%_4px] opacity-10 z-10" />
                  </div>
                </div>

                {/* Below the visuals: other controls */}
                <div className="w-full max-w-2xl flex flex-col items-center space-y-6 pt-4">

                  {/* Segmented control for user request */}
                  <div className="w-full max-w-md bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 text-left select-none space-y-3.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#f26d21] animate-pulse" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold">Sélectionnez l'objet de votre contact :</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {(['visiteur', 'exposant', 'sponsor', 'media'] as const).map((type) => {
                        const labels: Record<string, string> = {
                          visiteur: '🎟️ Accès Visiteur',
                          exposant: '🎪 Réserver un Stand',
                          sponsor: '✨ Devenir Sponsor',
                          media: '🎤 Médias & Presse'
                        };
                        const isActive = selectedRequest === type;
                        return (
                          <button
                            key={type}
                            onClick={() => {
                              setSelectedRequest(type);
                              setIsNotifyOpen(true);
                            }}
                            type="button"
                            className={`py-2 px-3 rounded-xl text-[10.5px] font-semibold text-left transition-all flex items-center justify-between border cursor-pointer ${
                              isActive 
                                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 font-bold' 
                                : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                            }`}
                          >
                            <span>{labels[type]}</span>
                            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons row */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md pt-2">
                    <motion.button
                      onClick={handleAddToCalendar}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full relative flex items-center justify-center gap-2 rounded-xl bg-white text-black hover:bg-orange-50 font-semibold py-3 px-5 text-xs transition-all cursor-pointer shadow-xl shadow-orange-950/5 text-center font-sans"
                    >
                      {copiedLink ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-600 animate-bounce" />
                          <span>Ajouté !</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <span>Ajouter au calendrier</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                {/* Titles */}
                <div className="flex flex-col items-center lg:items-start select-none">
                  <h1 className="text-3.5xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white flex flex-col lg:flex-row lg:items-baseline gap-x-2.5 gap-y-1 mt-1">
                    <span>SALON SPORTIX</span>
                    <span className="text-white uppercase font-black">
                      {currentDestination.name}
                    </span>
                  </h1>
                  <p className="text-sm font-sans font-black text-white uppercase tracking-wider mt-2.5">
                    📅 {currentDestination.dateText}
                  </p>
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mt-1">
                    📍 {currentDestination.subtext}
                  </p>
                </div>

                {/* Countdown Metrics Row */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                  <div className="grid grid-cols-4 gap-2.5 w-full select-none">
                    {/* DAYS */}
                    <div className="relative flex flex-col items-center justify-center border border-white/5 rounded-xl bg-black/40 backdrop-blur-md py-3 min-w-[65px]">
                      <span className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                        {String(timeLeft.days).padStart(2, '0')}
                      </span>
                      <span className="text-[7.5px] font-mono tracking-widest text-gray-500 mt-1 uppercase">
                        JOURS
                      </span>
                    </div>

                    {/* HOURS */}
                    <div className="relative flex flex-col items-center justify-center border border-white/5 rounded-xl bg-black/40 backdrop-blur-md py-3 min-w-[65px]">
                      <span className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </span>
                      <span className="text-[7.5px] font-mono tracking-widest text-gray-500 mt-1 uppercase">
                        HEURES
                      </span>
                    </div>

                    {/* MINUTES */}
                    <div className="relative flex flex-col items-center justify-center border border-white/5 rounded-xl bg-black/40 backdrop-blur-md py-3 min-w-[65px]">
                      <span className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </span>
                      <span className="text-[7.5px] font-mono tracking-widest text-gray-500 mt-1 uppercase">
                        MINUTES
                      </span>
                    </div>

                    {/* SECONDS */}
                    <div className="relative flex flex-col items-center justify-center border border-[#f26d21]/20 rounded-xl bg-[#1c110f]/45 backdrop-blur-md py-3 min-w-[65px]">
                      <span className="text-xl sm:text-2xl font-mono font-bold text-[#f26d21] tracking-tight animate-pulse-slow">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </span>
                      <span className="text-[7.5px] font-mono tracking-widest text-[#f26d21]/60 mt-1 uppercase">
                        SECONDES
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cumulative Live Counter System */}
                 {/* Segmented control for user request */}
                <div className="w-full max-w-md bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 text-left select-none space-y-3.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#f26d21] animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold">Sélectionnez l'objet de votre contact :</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {(['visiteur', 'exposant', 'sponsor', 'media'] as const).map((type) => {
                      const labels: Record<string, string> = {
                        visiteur: '🎟️ Accès Visiteur',
                        exposant: '🎪 Réserver un Stand',
                        sponsor: '✨ Devenir Sponsor',
                        media: '🎤 Médias & Presse'
                      };
                      const isActive = selectedRequest === type;
                      return (
                        <button
                          key={type}
                          onClick={() => {
                            setSelectedRequest(type);
                            setIsNotifyOpen(true);
                          }}
                          type="button"
                          className={`py-2 px-3 rounded-xl text-[10.5px] font-semibold text-left transition-all flex items-center justify-between border cursor-pointer ${
                            isActive 
                              ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 font-bold' 
                              : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                          }`}
                        >
                          <span>{labels[type]}</span>
                          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Information Details & Phone numbers */}
                {currentDestination.phones && currentDestination.phones.length > 0 && (
                  <div className="w-full max-w-md flex flex-col gap-2.5 bg-emerald-500/10 border border-emerald-500/15 rounded-xl p-3.5 text-left">
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <div className="flex flex-col gap-1.5">
                          {currentDestination.phones.map((phone, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 font-mono text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                              <a 
                                href={getWhatsappLink(phone, selectedRequest)} 
                                target="_blank"
                                rel="noreferrer"
                                className="font-bold text-slate-100 hover:text-emerald-400 transition-colors cursor-pointer"
                              >
                                {phone}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Beside/below the phone numbers, display the email contact@salon-sportix.com */}
                    <div className="flex items-center gap-1.5 pt-2 border-t border-white/5 font-mono text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      <a 
                        href="mailto:contact@salon-sportix.com"
                        className="font-bold text-slate-100 hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        contact@salon-sportix.com
                      </a>
                    </div>
                  </div>
                )}

                {/* Action Buttons row */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md pt-2">
                  <motion.button
                    onClick={handleAddToCalendar}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative flex items-center justify-center gap-2 rounded-xl bg-white text-black hover:bg-orange-50 font-semibold py-3 px-5 text-xs transition-all cursor-pointer shadow-xl shadow-orange-950/5 text-center flex-1 font-sans"
                  >
                    {copiedLink ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600 animate-bounce" />
                        <span>Ajouté !</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 text-gray-650" />
                        <span>Ajouter au calendrier</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            )}
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
                  <SportixLogo className="scale-90" showSubtitle={true} placeName={currentDestination.name} />
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
                    Salon Sportix est le premier roadshow d'affaires du sport en Afrique, connectant technologies, infrastructures innovantes, sport-business et décideurs étatiques.
                  </p>
                </div>
              </div>

              {/* Bottom Info inside Drawer */}
              <div className="space-y-4">
                <div className="rounded-xl bg-[#13141b] border border-white/5 p-4 text-xs space-y-2">
                  <span className="font-mono text-[9px] text-[#d4af37] uppercase tracking-wider block">CONTACT GENERAL</span>
                  <p className="text-gray-300">📧 mountain_consulting@yahoo.fr</p>
                  <p className="text-gray-300 font-bold">📧 contact@salon-sportix.com</p>
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
