import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { Destination, ViewMode } from './types';
import { DESTINATIONS } from './data';
import DestinationOrbit from './components/DestinationOrbit';
import DestinationDetail from './components/DestinationDetail';
import AiHelpWidget from './components/AiHelpWidget';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('orbit');
  const [selectedDestination, setSelectedDestination] = useState<Destination>(DESTINATIONS[0]);
  const [isAiHelpOpen, setIsAiHelpOpen] = useState(false);

  // Real-time server-synced visitor counts
  const [activeCount, setActiveCount] = useState(33);
  const [totalVisits, setTotalVisits] = useState(412);

  // Synchronize live visitors with backend
  useEffect(() => {
    let id = sessionStorage.getItem('sportix_session_id');
    if (!id) {
      id = 'sp_sess_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36).substring(4);
      sessionStorage.setItem('sportix_session_id', id);
    }
    const sessionId = id;

    const sendHeartbeat = async () => {
      try {
        const res = await fetch('/api/visitors/heartbeat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sessionId })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.activeCount === 'number') {
            setActiveCount(data.activeCount);
          }
          if (data && typeof data.totalVisits === 'number') {
            setTotalVisits(data.totalVisits);
          }
        }
      } catch (err) {
        console.warn('Real live heartbeat tracker error:', err);
      }
    };

    sendHeartbeat();
    const intervalId = setInterval(sendHeartbeat, 4000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSelectDestination = (destination: Destination) => {
    setSelectedDestination(destination);
    setViewMode('detail');
  };

  const handleBackToOrbit = () => {
    setViewMode('orbit');
  };

  const handleNavigateDestination = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#f1f5f9] select-none font-sans overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        {viewMode === 'orbit' ? (
          <motion.div
            key="orbit-view"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <DestinationOrbit 
              onSelectDestination={handleSelectDestination} 
              onOpenAiHelp={() => setIsAiHelpOpen(true)}
              activeCount={activeCount}
              totalVisits={totalVisits}
            />
          </motion.div>
        ) : (
          <motion.div
            key="detail-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <DestinationDetail
              currentDestination={selectedDestination}
              onBackToOrbit={handleBackToOrbit}
              onNavigateToDestination={handleNavigateDestination}
              onOpenAiHelp={() => setIsAiHelpOpen(true)}
              activeCount={activeCount}
              totalVisits={totalVisits}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Floating AI Trigger Button */}
      <motion.button
        onClick={() => setIsAiHelpOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-rose-500 hover:bg-rose-400 text-white font-medium py-3 px-4.5 rounded-full shadow-lg shadow-rose-950/40 cursor-pointer border border-rose-400/20 active:scale-95 group transition-colors select-none"
        title="Guide IA Sportix"
      >
        <div className="relative">
          <MessageSquare className="w-4 h-4 text-white" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-ping" />
        </div>
        <span className="text-xs tracking-wide">Assistant IA</span>
      </motion.button>

      {/* AI Assistant Drawer Widget */}
      <AiHelpWidget isOpen={isAiHelpOpen} onClose={() => setIsAiHelpOpen(false)} />
    </div>
  );
}
