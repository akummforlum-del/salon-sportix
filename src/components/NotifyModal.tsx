import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, CheckCircle2, Loader2, Mail, Phone } from 'lucide-react';
import { Destination } from '../types';

interface NotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination;
}

export default function NotifyModal({ isOpen, onClose, destination }: NotifyModalProps) {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [interest, setInterest] = useState<'visitor' | 'speaker' | 'sponsor' | 'media' | 'expo'>('visitor');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [generatedUrl, setGeneratedUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    
    // Construct the customized subscription text message
    const interestLabels: Record<string, string> = {
      visitor: '🎟️ Visiteur (Intérêt général)',
      expo: '🎪 Exposant (Réserver un Stand)',
      sponsor: '🤝 Sponsor / Partenariat',
      speaker: '🎙️ Intervenant / Conférencier',
      media: '📹 Presse / Accréditation Média'
    };
    const interestLabel = interestLabels[interest] || interest;

    const text = `Bonjour Salon Sportix ${destination.name},\n\n` +
                 `Je viens de m'abonner aux alertes depuis le site internet de Sportix pour l'édition de ${destination.name}.\n\n` +
                 `* 📧 Adresse E-mail : ${email}\n` +
                 `* 📲 WhatsApp : ${whatsapp || 'Non spécifié'}\n` +
                 `* 🎯 Participation : ${interestLabel}\n\n` +
                 `Veuillez m'inscrire pour recevoir en priorité les alertes officielles, stands et billetterie. Merci !`;

    const cleanPhones = destination.phones || [];
    const destinationPhone = cleanPhones[0] || '237694885086';
    const rawNumber = destinationPhone.replace(/[^\d]/g, '');
    const whatsappUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`;
    setGeneratedUrl(whatsappUrl);

    // Simulate API registration call (Persisting Email & WhatsApp)
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setWhatsapp('');
      
      // Auto open custom generated WhatsApp link
      try {
        window.open(whatsappUrl, '_blank');
      } catch (err) {
        console.warn("Automated popup block detected, manual action button provided.", err);
      }
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0c0d12] p-6 shadow-2xl shadow-black/90 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-1.5 text-gray-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {status !== 'success' ? (
              <>
                {/* Header inside modal */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/10 text-rose-450 border border-rose-500/20">
                    <Bell className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-white uppercase tracking-tight">
                      S'abonner aux alertes
                    </h3>
                    <p className="text-xs">
                      <span className="font-black text-rose-500 uppercase tracking-widest text-[10.5px] font-mono">
                        salon sportix {destination.name}
                      </span>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                  Soyez averti en priorité par <strong className="text-white">E-mail et WhatsApp</strong> du lancement de la billetterie, des stands officiels et des conférenciers du salon <strong className="text-white">Sportix {destination.name}</strong>.
                </p>

                {/* Subscription Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email & Whatsapp input fields side-by-side on desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Email Input */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-450 mb-1.5">
                        Adresse E-mail
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="votre@email.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === 'error') setStatus('idle');
                          }}
                          className={`w-full bg-black/40 border rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-all ${
                            status === 'error' ? 'border-rose-500' : 'border-white/10 focus:border-white/20'
                          }`}
                        />
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                      </div>
                    </div>

                    {/* WhatsApp Input (With phone validation prompt) */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-450 mb-1.5">
                        Numéro WhatsApp (Optionnel)
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="+237 654 15 24 99"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-white/20 transition-all"
                        />
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-emerald-500" />
                      </div>
                    </div>
                  </div>

                  {status === 'error' && (
                    <span className="text-xs text-rose-450 mt-1 block font-mono">
                      * Veuillez entrer un e-mail valide de contact.
                    </span>
                  )}

                  {/* Role interest selection upgraded with Expo option */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-450 mb-2">
                      Catégorie de participation envisagée
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {([
                        { id: 'visitor', label: '👨‍🚀 Visiteur', emoji: '🧑‍💻' },
                        { id: 'expo', label: '🎪 Exposant (Expo)', emoji: '🎪' },
                        { id: 'sponsor', label: '🤝 Sponsor', emoji: '💎' },
                        { id: 'speaker', label: '🎙️ Intervenant', emoji: '📢' },
                        { id: 'media', label: '📹 Presse / Média', emoji: '🎥' }
                      ] as const).map((role) => (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setInterest(role.id)}
                          className={`rounded-xl py-2 px-2.5 text-[11px] text-left border transition-all flex items-center gap-1.5 ${
                            interest === role.id
                              ? 'bg-rose-550/10 border-rose-500 text-rose-400 font-semibold shadow-inner'
                              : 'bg-black/30 border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                          }`}
                        >
                          <span>{role.emoji}</span>
                          <span>{role.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full relative flex items-center justify-center gap-2 mt-4 rounded-xl bg-rose-500 hover:bg-rose-400 py-3 px-4 text-xs font-semibold text-white transition-all disabled:opacity-50 select-none cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Transmission sécurisée...</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-4 h-4" />
                        <span>Valider mon abonnement Email & WhatsApp</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              // Success Panel - customized to present both Email and WhatsApp details clearly!
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  Abonnement Activé !
                </h3>
                <p className="text-xs text-gray-400 max-w-sm mb-5 leading-relaxed">
                  Excellent ! Vos coordonnées ont été enregistrées pour l'édition <strong className="text-white">Sportix {destination.name}</strong>.<br />
                  Vous recevrez la programmation ainsi que les alertes en priorité par <strong className="text-emerald-400">E-mail et WhatsApp</strong>.
                </p>

                {/* Direct Action Link to send raw WhatsApp confirmation */}
                <div className="w-full bg-[#1c2e1f]/30 border border-emerald-500/20 rounded-2xl p-4 mb-6 text-left">
                  <p className="text-gray-300 text-[11px] mb-3 leading-relaxed">
                    Si la redirection automatique n'a pas fonctionné ou s'est fermée, cliquez ci-dessous pour envoyer vos informations directement sur WhatsApp :
                  </p>
                  <a
                    href={generatedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#22c55e] hover:bg-[#1fbd58] text-white font-bold font-sans rounded-xl py-3 px-4 text-xs transition-all tracking-wide shadow-md hover:scale-101 cursor-pointer"
                  >
                    💬 Envoyer mes infos sur WhatsApp
                  </a>
                </div>

                <button
                  onClick={onClose}
                  className="rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 text-[10px] font-mono text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  Fermer
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

