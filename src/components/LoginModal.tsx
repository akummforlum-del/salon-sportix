import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, ShieldAlert, CheckCircle, RefreshCcw, ShieldCheck } from 'lucide-react';
import { User } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Identifiants invalides');
      }

      setSuccessMsg(`Connexion réussie ! Bienvenue ${data.user.name}`);
      setTimeout(() => {
        onLoginSuccess(data.user);
        onClose();
        // clear fields
        setEmail('');
        setPassword('');
        setSuccessMsg(null);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Une erreur de connexion est survenue. Prévoyez plus de 4 caractères.');
    } finally {
      setIsLoading(false);
    }
  };

  // Preset fill-ins for easy testing
  const handleQuickFill = (presetEmail: string, presetPass: string) => {
    setEmail(presetEmail);
    setPassword(presetPass);
    setError(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Glass backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-[#0d0e12] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Top accent ray */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500" />

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-white tracking-wide">Accès Partenaire & Visiteur</h4>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">Connexion Authentifiée</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            {/* Notification messages */}
            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-[11px] text-red-400 flex items-start gap-2 animate-bounce-once">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-snug">{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-3 text-[11px] text-emerald-400 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 animate-pulse" />
                <span className="leading-snug">{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1.5">
                  Adresse de messagerie
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre-email@example.com"
                  className="w-full bg-black/40 border border-white/10 focus:border-amber-500/50 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-0 transition-all"
                  disabled={isLoading}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
                    Mot de passe
                  </label>
                  <span className="text-[9px] text-gray-600 font-mono">Min. 4 cars.</span>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black/40 border border-white/10 focus:border-amber-500/50 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-0 transition-all"
                  disabled={isLoading}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black py-3 rounded-xl font-bold text-xs select-none shadow-lg shadow-amber-950/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  {isLoading ? 'Identification en cours...' : 'S\'authentifier maintenant'}
                </button>
              </div>
            </form>

            {/* Quick Presets for Demo */}
            <div className="mt-5 pt-4 border-t border-white/5 space-y-2 text-left">
              <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500 block">
                Comptes De Test Officiels (Cliquez pour remplir)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => handleQuickFill('orange@sportix.com', 'orange123')}
                  className="p-2 text-left text-gray-300 hover:text-white border border-white/5 hover:border-amber-500/30 bg-black/30 hover:bg-amber-500/5 rounded-lg transition-all text-xs"
                >
                  <p className="font-bold text-white">Partenaire</p>
                  <p className="text-[9px] text-gray-500">orange@sportix.com</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('mountain_consulting@yahoo.fr', 'mountain123')}
                  className="p-2 text-left text-gray-300 hover:text-white border border-white/5 hover:border-amber-500/30 bg-black/30 hover:bg-amber-550/5 rounded-lg transition-all text-xs"
                >
                  <p className="font-bold text-[#f26d21]">Mountain</p>
                  <p className="text-[9px] text-gray-500">mountain_consulting@yahoo.fr</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('admin@sportix.com', 'admin123')}
                  className="p-2 text-left text-gray-300 hover:text-white border border-white/5 hover:border-amber-500/30 bg-black/30 hover:bg-amber-500/5 rounded-lg transition-all text-xs"
                >
                  <p className="font-bold text-amber-400">Organisateur</p>
                  <p className="text-[9px] text-gray-500">admin@sportix.com</p>
                </button>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5 mt-2.5 text-[9px] text-gray-500 leading-normal font-sans">
                💡 <span className="font-semibold text-gray-400">Créez votre propre compte :</span> Saisissez simplement n'importe quel e-mail et un mot de passe de votre choix pour vous inscrire instantanément en tant que visiteur !
              </div>
            </div>

            <footer className="mt-4 text-[9px] font-mono text-gray-600 text-center flex items-center justify-center gap-1 select-none">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>SYSTÈME ENTIÈREMENT SÉCURISÉ</span>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
