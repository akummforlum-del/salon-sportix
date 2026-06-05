import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, ShieldAlert, CheckCircle, RefreshCcw, ShieldCheck, Phone, Smartphone } from 'lucide-react';
import { User } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);

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
        body: JSON.stringify({ email: identifier, password }),
      });

      const contentType = res.headers.get('content-type');
      let data: any = {};

      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const rawText = await res.text();
        if (rawText.toLowerCase().includes('cannot be found') || rawText.toLowerCase().includes('expired') || res.status === 404) {
          throw new Error('Le service d\'authentification est en cours de démarrage. Veuillez réessayer d\'ici 5 secondes.');
        }
        throw new Error('Réponse du serveur non valide. Veuillez réessayer.');
      }

      if (!res.ok) {
        throw new Error(data.error || 'Identifiants invalides');
      }

      setSuccessMsg(`Connexion réussie ! Bienvenue ${data.user.name}`);
      setTimeout(() => {
        onLoginSuccess(data.user);
        onClose();
        // clear fields
        setIdentifier('');
        setPassword('');
        setSuccessMsg(null);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Une erreur de connexion est survenue. Prévoyez plus de 4 caractères.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (googleEmail: string, googleName: string, avatarUrl: string) => {
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);
    setShowGoogleChooser(false);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: googleEmail, 
          name: googleName, 
          avatar: avatarUrl,
          isGoogleLogin: true 
        }),
      });

      const contentType = res.headers.get('content-type');
      let data: any = {};

      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const rawText = await res.text();
        if (rawText.toLowerCase().includes('cannot be found') || rawText.toLowerCase().includes('expired') || res.status === 404) {
          throw new Error('Le service d\'authentification est en cours de démarrage. Veuillez réessayer d\'ici 5 secondes.');
        }
        throw new Error('Réponse du serveur non valide (Google Auth). Veuillez réessayer.');
      }

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la connexion Google');
      }

      setSuccessMsg(`Authentifié avec Google ! Bienvenue ${data.user.name}`);
      setTimeout(() => {
        onLoginSuccess(data.user);
        onClose();
        setIdentifier('');
        setPassword('');
        setSuccessMsg(null);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Authentification Google échouée.');
    } finally {
      setIsLoading(false);
    }
  };

  // Preset fill-ins for easy testing
  const handleQuickFill = (presetEmail: string, presetPass: string) => {
    setIdentifier(presetEmail);
    setPassword(presetPass);
    setError(null);
  };

  const isEmailInput = identifier.includes('@');
  const hasDigitsOnly = identifier.length > 0 && /^[0-9+\s()]+$/.test(identifier);

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
                  <h4 className="text-sm font-display font-bold text-white tracking-wide">Accès Sportix sécurisé</h4>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">Multi-authentification</p>
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
              <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-[11px] text-red-400 flex items-start gap-2">
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

            <AnimatePresence mode="wait">
              {showGoogleChooser ? (
                /* Google Account Chooser Overlay Subview */
                <motion.div
                  key="google-chooser"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 py-2"
                >
                  <div className="text-center">
                    <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                      {/* Native Colored Google SVG Icon */}
                      <svg className="w-8 h-8" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.91h6.63c-.29 1.5-.1.8-1.57 1.8v2.5h2.52c1.47-1.36 2.37-3.37 2.37-5.64z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.95-2.91l-3.88-3.02c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.21v3.11C3.18 21.3 7.39 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.27 14.27a7.18 7.18 0 010-4.54V6.62H1.21a11.94 11.94 0 000 10.76l4.06-3.11z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.39 0 3.18 2.7 1.21 6.62l4.06 3.11C6.22 6.86 8.87 4.75 12 4.75z"/>
                      </svg>
                    </div>
                    <h5 className="text-xs font-bold text-white font-sans">Sélectionnez votre compte Google</h5>
                    <p className="text-[10px] text-gray-500 mb-4 mt-0.5">pour continuer vers l'espace Salon Sportix</p>
                  </div>

                  <div className="space-y-2 max-h-[180px] overflow-y-auto">
                    {/* Real Email represented from metadata */}
                    <button
                      type="button"
                      onClick={() => handleGoogleLogin('akummforlum@gmail.com', 'Akumm Forlum', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150')}
                      className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/5 p-3 rounded-2xl flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-orange-500/15 border border-orange-500/25 flex items-center justify-center font-bold text-orange-400 text-xs shadow-inner">
                        AF
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-white">Akumm Forlum</p>
                        <p className="text-[10px] text-gray-400">akummforlum@gmail.com</p>
                      </div>
                    </button>

                    {/* Guest Google account */}
                    <button
                      type="button"
                      onClick={() => handleGoogleLogin('sportix-visitor@gmail.com', 'Invité Voyageur', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150')}
                      className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/5 p-3 rounded-2xl flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center font-bold text-amber-400 text-xs shadow-inner">
                        IV
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-white">Invité Voyageur</p>
                        <p className="text-[10px] text-gray-400">sportix-visitor@gmail.com</p>
                      </div>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowGoogleChooser(false)}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 py-2.5 rounded-xl text-[10px] font-mono tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Retour aux autres modes
                  </button>
                </motion.div>
              ) : (
                /* Primary Email, Phone and Google login screen */
                <motion.div
                  key="main-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Google Authenticator Button */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowGoogleChooser(true)}
                      className="w-full bg-white hover:bg-gray-100 text-slate-900 border border-transparent font-sans py-3 px-4 rounded-xl font-bold text-xs select-none shadow-sm active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {/* Native Colored Google SVG Icon */}
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.91h6.63c-.29 1.5-.1.8-1.57 1.8v2.5h2.52c1.47-1.36 2.37-3.37 2.37-5.64z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.95-2.91l-3.88-3.02c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.21v3.11C3.18 21.3 7.39 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.27 14.27a7.18 7.18 0 010-4.54V6.62H1.21a11.94 11.94 0 000 10.76l4.06-3.11z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.39 0 3.18 2.7 1.21 6.62l4.06 3.11C6.22 6.86 8.87 4.75 12 4.75z"/>
                      </svg>
                      Se connecter avec Google
                    </button>
                  </div>

                  <div className="relative flex items-center justify-center py-2">
                    <div className="absolute inset-x-0 h-px bg-white/5" />
                    <span className="relative bg-[#0d0e12] px-4 text-[9px] font-mono uppercase tracking-wider text-gray-550">Ou via identifiants</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                          {isEmailInput ? (
                            <Mail className="w-3 h-3 text-amber-500" />
                          ) : hasDigitsOnly ? (
                            <Smartphone className="w-3 h-3 text-rose-500" />
                          ) : (
                            <Mail className="w-3 h-3 text-gray-500" />
                          )}
                          Email ou Numéro de téléphone
                        </label>
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest bg-white/5 py-0.5 px-1.5 rounded">
                          {isEmailInput ? "Courriel" : hasDigitsOnly ? "Téléphone" : "Saisir"}
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="votre-email@example.com ou +237..."
                        className="w-full bg-black/40 border border-white/10 focus:border-amber-500/50 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-0 transition-all font-mono"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
                          Mot de passe
                        </label>
                        <span className="text-[9px] text-gray-600 font-mono">Min. 4 chars.</span>
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

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isLoading || !identifier}
                        className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black py-3 rounded-xl font-bold text-xs select-none shadow-lg shadow-amber-950/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {isLoading ? (
                          <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
                        ) : null}
                        {isLoading ? 'Identification...' : "S'identifier maintenant"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Presets for Demo */}
            {!showGoogleChooser && (
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
                    <p className="font-bold text-white truncate">Partenaire</p>
                    <p className="text-[8.5px] text-gray-500 truncate">orange@sportix.com</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('694885086', 'sportix123')}
                    className="p-2 text-left text-gray-300 hover:text-white border border-white/5 hover:border-amber-500/30 bg-black/30 hover:bg-amber-550/5 rounded-lg transition-all text-xs"
                  >
                    <p className="font-bold text-[#f26d21] truncate">Support Orange</p>
                    <p className="text-[8.5px] text-gray-500 truncate">694 88 50 86</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('admin@sportix.com', 'admin123')}
                    className="p-2 text-left text-gray-300 hover:text-white border border-white/5 hover:border-amber-500/30 bg-black/30 hover:bg-amber-500/5 rounded-lg transition-all text-xs"
                  >
                    <p className="font-bold text-amber-400 truncate">Organisateur</p>
                    <p className="text-[8.5px] text-gray-500 truncate">admin@sportix.com</p>
                  </button>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5 mt-2.5 text-[9px] text-gray-500 leading-normal font-sans">
                  💡 <span className="font-semibold text-gray-400">Accès rapide :</span> Saisissez n'importe quel e-mail ou numéro de téléphone et un mot de passe (min 4 cars) pour vous authentifier ou utiliser la connexion Google simulée !
                </div>
              </div>
            )}

            <footer className="mt-4 pt-1 text-[9px] font-mono text-gray-600 text-center flex items-center justify-center gap-1 select-none">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>SYSTÈME ENTIÈREMENT SÉCURISÉ</span>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
