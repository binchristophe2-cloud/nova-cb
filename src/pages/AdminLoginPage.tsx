import React, { useState, useEffect } from 'react';
import { Shield, Lock, Mail, AlertCircle, ArrowLeft, Loader2, KeyRound, CheckCircle2 } from 'lucide-react';
import { AdminUser } from '../types';

interface AdminLoginPageProps {
  onLoginSuccess: (user: AdminUser) => void;
  onNavigateHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigateHome,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Set noindex, nofollow for admin
  useEffect(() => {
    document.title = 'Connexion Administration Privée | NOVA CB';
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');

    return () => {
      robotsMeta?.setAttribute('content', 'index, follow');
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMsg(data.error || 'Identifiants incorrects.');
        setLoading(false);
        return;
      }

      // Success: session is held in HttpOnly secure cookie
      onLoginSuccess(data.user);
    } catch (err) {
      setErrorMsg('Erreur de communication avec le serveur d’authentification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 selection:bg-sky-500 selection:text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500 rounded-full blur-[140px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Retour au site public NOVA CB</span>
        </button>

        {/* Security Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/80">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
              <Shield className="w-7 h-7" />
            </div>
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-sky-400 mb-1">
              Espace Administrateur Privé
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              NOVA CB
            </h1>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Authentification requise pour accéder aux outils de pilotage, à la matrice SEO et aux données internes.
            </p>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-300 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Email Administrateur
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nova-cb.fr"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm text-white placeholder-slate-600 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Mot de passe
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
                >
                  {showPassword ? 'Masquer' : 'Afficher'}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm text-white placeholder-slate-600 transition-all outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white font-extrabold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Vérification sécurisée...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Se connecter</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Features Footnote */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Session HttpOnly chiffrée & contrôle strict côté serveur</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Protection anti force-brute avec temporisation dynamique</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Matrice SEO et analyses confidentielles protégées par 401/403</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
