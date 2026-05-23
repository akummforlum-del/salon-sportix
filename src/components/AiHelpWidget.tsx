import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, MessageSquare, Sparkles, Loader2, RefreshCw } from 'lucide-react';

interface AiHelpWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  "Qu'est-ce que Sportix Salon ?",
  "Comment m'abonner aux alertes ?",
  "Quels sont les thèmes du roadshow ?",
  "Comment ajouter une date à mon agenda ?",
];

export default function AiHelpWidget({ isOpen, onClose }: AiHelpWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Bonjour ! Je suis l'assistant intelligent officiel de **Sportix Salon**. Je suis là pour vous aider à explorer notre roadshow d'élite sur le continent africain (Douala, Yaoundé, Cotonou, Nairobi & Abidjan). Posez-moi vos questions !",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/support/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur réseau server API');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.text || "Pardon, je n'ai pas pu formuler ma réponse instantanément." },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Désolé, j'ai rencontré un problème temporaire pour joindre le serveur de Sportix. Veuillez réessayer !" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Historique réinitialisé. Je suis de nouveau à votre écoute pour vous guider à travers les 5 destinations Sportix Salon !",
      },
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
          {/* Invisible background overlay to trigger click-outside but allow other pointer clicks */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs pointer-events-auto" onClick={onClose} />

          {/* Chat Slide-In Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-[#0f1016]/95 border-l border-white/10 shadow-2xl h-full flex flex-col pointer-events-auto"
          >
            {/* Drawer Header */}
            <header className="p-5 border-b border-white/5 bg-black/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-white tracking-wide">
                    Guide Sportix IA
                  </h3>
                  <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 uppercase tracking-tight">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Assistant Live En Ligne
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Clear Session history button */}
                <button
                  onClick={handleClearHistory}
                  className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  title="Effacer le chat"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                {/* Close Drawer button */}
                <button
                  onClick={onClose}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  title="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Chat Body Scrollable Space */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/5"
            >
              {messages.map((msg, index) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div
                    key={index}
                    className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} fade-in`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        isAssistant
                          ? 'bg-[#151620] border border-white/5 text-gray-300 rounded-tl-sm'
                          : 'bg-rose-500 text-white rounded-tr-sm font-medium shadow-md shadow-rose-950/20'
                      }`}
                    >
                      {/* Simple custom markdown style text formatting */}
                      <p className="whitespace-pre-line">
                        {msg.content.split('**').map((part, i) => (
                          i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
                        ))}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Loader */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#151620] border border-white/5 text-gray-400 rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-2 text-xs">
                    <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                    <span>L'IA analyse le salon...</span>
                  </div>
                </div>
              )}
            </div>

            {/* suggestion chips selection container */}
            <div className="p-4 bg-black/10 border-t border-white/[0.03] space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500 block">Suggestions de questions</span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(s)}
                    disabled={isLoading}
                    className="text-[10px] text-left text-gray-400 hover:text-white border border-white/5 hover:border-rose-500/20 bg-black/30 hover:bg-rose-500/5 rounded-lg py-1.5 px-3.5 transition-all cursor-pointer disabled:opacity-40"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input deck */}
            <div className="p-4 border-t border-white/5 bg-[#12131a]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputText);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Posez votre question sur Sportix..."
                  className="flex-1 bg-[#090a0d] border border-white/10 focus:border-rose-500/50 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-0 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="bg-white hover:bg-rose-100 disabled:opacity-40 text-black rounded-xl w-11 h-11 flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
