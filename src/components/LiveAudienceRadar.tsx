import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Activity, Radio, MapPin, Eye, Terminal, Crown, Star, Laptop, ShieldCheck } from 'lucide-react';
import { LiveVisitor } from '../types';

interface LiveAudienceRadarProps {
  isOpen: boolean;
  onClose: () => void;
  liveFeed: LiveVisitor[];
  activeCount: number;
  totalVisits: number;
}

export default function LiveAudienceRadar({
  isOpen,
  onClose,
  liveFeed,
  activeCount,
  totalVisits
}: LiveAudienceRadarProps) {
  const [pulse, setPulse] = useState(true);

  // Subtle heartbeat radar animations
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
          {/* Glass backdrop overlay to dismiss */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs pointer-events-auto cursor-pointer" 
            onClick={onClose} 
          />

          {/* Side Drawer Console */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-[#0b0c10]/98 border-l border-white/10 shadow-2xl h-full flex flex-col pointer-events-auto"
          >
            {/* Header Area */}
            <header className="p-5 border-b border-white/5 bg-black/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Radio className={`w-4 h-4 ${pulse ? 'animate-pulse scale-110' : ''}`} />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-white tracking-wide">
                    Console d'Audience Live
                  </h3>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">
                    Suivi Pulsé des Téléspectateurs
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono font-bold animate-pulse">
                  SYNC LIVE
                </span>
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-sm"
                  title="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Micro Dashboard Grid */}
            <section className="p-4 grid grid-cols-2 gap-3.5 border-b border-white/5 bg-black/10">
              <div className="bg-[#12141c]/80 border border-white/5 rounded-xl p-3 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-gray-500 uppercase">Téléspectateurs Actifs</span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-2xl font-mono font-extrabold text-emerald-400 leading-none">
                    {activeCount}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-500/80">session(s)</span>
                </div>
                <div className="text-[9px] text-gray-400 font-sans mt-0.5 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                  Réseau Sportix d'Afrique
                </div>
              </div>

              <div className="bg-[#12141c]/80 border border-white/5 rounded-xl p-3 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-gray-500 uppercase">Visites Totales</span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-2xl font-mono font-extrabold text-slate-300 leading-none">
                    {totalVisits}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">connexions</span>
                </div>
                <div className="text-[9px] text-gray-500 font-sans mt-0.5">
                  Cumulé du Roadshow 2026
                </div>
              </div>
            </section>

            {/* List Header */}
            <div className="px-5 py-2.5 bg-black/25 border-b border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              <span>UTILISATEUR & ORIGINE</span>
              <span>COMMUNICATION ACTIVE</span>
            </div>

            {/* Traffic feed container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 bg-black/5 scrollbar-thin">
              {liveFeed.map((vis, idx) => {
                const isSpecial = vis.role.toLowerCase().includes('organisateur') || vis.role.toLowerCase().includes('partenaire');
                return (
                  <motion.div
                    key={vis.sessionId + '_' + idx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                    className={`p-3 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all duration-300 ${
                      vis.isYou
                        ? 'bg-[#1a1216]/90 border-rose-500/20 shadow-md shadow-rose-950/10'
                        : 'bg-[#12131a]/85 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {/* Avatar/Badge representation */}
                      <div className="mt-0.5 font-mono">
                        {vis.isYou ? (
                          <div className="w-7 h-7 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400" title="Vous">
                            <Star className="w-3.5 h-3.5 fill-rose-450" />
                          </div>
                        ) : isSpecial ? (
                          <div className="w-7 h-7 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]" title={vis.role}>
                            <Crown className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-slate-500/10 border border-slate-500/30 flex items-center justify-center text-slate-400" title="Délégué anonyme">
                            <Laptop className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <div className="text-left leading-snug">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-gray-200">
                            {vis.isYou ? 'Vous (Session active)' : vis.role.split('(')[0].trim()}
                          </span>
                          {vis.isYou && (
                            <span className="text-[8px] bg-rose-500/20 text-rose-400 px-1.5 py-0.2 rounded font-mono scale-90">ME</span>
                          )}
                        </div>
                        <p className="text-[10px] font-mono text-gray-500 flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                          {vis.location}
                        </p>
                      </div>
                    </div>

                    <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 font-mono text-[10px] shrink-0">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Eye className="w-3 h-3 text-slate-500" />
                        <span>{vis.currentPath}</span>
                      </span>
                      <span className="text-[9px] text-gray-600 block">
                        ID: {vis.sessionId}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer Control Info */}
            <footer className="p-4 border-t border-white/5 bg-black/40 text-center leading-normal">
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-gray-500">
                <Terminal className="w-3.5 h-3.5 text-rose-500" />
                <span>MONITEUR AUDIENCE SALON SPORTIX AFFICHÉ</span>
              </div>
              <p className="text-[9px] text-gray-600 font-sans mt-1">
                La console agrège anonymement les pings d'activité locale et de routage d'IP régionaux pour illustrer la connectivité d'élite.
              </p>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
