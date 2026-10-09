import React from 'react';
import { Phone, Mail, MapPin, ArrowUp, Clock, ShieldCheck, Sparkles, Layers, Map } from 'lucide-react';
import { PageType } from '../types';
import { SERVICE_SILOS, LOCAL_CITY_SILOS } from '../data/silosData';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onOpenQuote: () => void;
  onNavigateToSilo?: (slug: string) => void;
  onNavigateToCity?: (slug: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  onOpenQuote,
  onNavigateToSilo,
  onNavigateToCity,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const serviceList = Object.values(SERVICE_SILOS);
  const cityList = Object.values(LOCAL_CITY_SILOS);

  return (
    <footer className="bg-[#05140e] text-slate-300 pt-16 pb-12 border-t border-emerald-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-emerald-950/80">
          
          {/* Col 1: Brand & Presentation */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center">
              <span className="font-black text-2xl tracking-tight text-white uppercase">
                NOVA CB
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed max-w-sm">
              Entreprise artisanale spécialisée dans le traitement de toiture et façade à basse pression (mousse, lichen, pollution urbaine) et le décapage de terrasse par cloche rotative sans projection à Mérignac, Bordeaux Métropole et en Gironde.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-300 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#091F17] border border-emerald-900/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Basse pression toiture & façade</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#091F17] border border-emerald-900/60">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cloche terrasse sans projection</span>
              </div>
            </div>
          </div>

          {/* Col 2: Prestations Silos SEO */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Prestations & Solutions</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-100/70">
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-emerald-300 font-bold transition-colors text-left cursor-pointer flex items-center gap-1.5 text-emerald-400"
                >
                  <span>• Nos Solutions Éco-responsables</span>
                </button>
              </li>
              {serviceList.map((silo) => (
                <li key={silo.slug}>
                  {onNavigateToSilo ? (
                    <button
                      onClick={() => onNavigateToSilo(silo.slug)}
                      className="hover:text-emerald-300 transition-colors text-left cursor-pointer hover:underline"
                    >
                      • {silo.shortTitle}
                    </button>
                  ) : (
                    <span>• {silo.shortTitle}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Communes & Secteurs Locaux */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-1.5">
              <Map className="w-4 h-4 text-emerald-400" />
              <span>Secteurs Gironde</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-100/70">
              {cityList.map((city) => (
                <li key={city.slug}>
                  {onNavigateToCity ? (
                    <button
                      onClick={() => onNavigateToCity(city.slug)}
                      className="hover:text-emerald-300 transition-colors text-left cursor-pointer hover:underline"
                    >
                      • {city.cityName} ({city.postalCode})
                    </button>
                  ) : (
                    <span>• {city.cityName}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Horaires */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Contact & Intervention
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-100/80">
              <a
                href="tel:0624685217"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#091F17] hover:bg-[#0c2a1f] border border-emerald-500/50 hover:border-emerald-400 text-white transition-all group shadow-sm"
                title="Appeler NOVA CB"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold leading-none">Téléphone direct</div>
                  <span className="font-extrabold text-sm text-white group-hover:text-emerald-300 transition-colors">06 24 68 52 17</span>
                </div>
              </a>

              <a
                href="mailto:nova.entretien33@outlook.fr"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#091F17] hover:bg-[#0c2a1f] border border-emerald-900/60 hover:border-emerald-400 text-slate-300 transition-all group"
                title="Envoyer un e-mail à NOVA CB"
              >
                <div className="w-7 h-7 rounded-lg bg-[#061811] text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium leading-none">Email direct</div>
                  <span className="font-bold text-xs text-emerald-400 group-hover:text-emerald-300 transition-colors truncate block">nova.entretien33@outlook.fr</span>
                </div>
              </a>

              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>33 avenue Léon Blum, 33700 Mérignac, France</span>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300 pt-1">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Horaires d'intervention :</span>
                  <span>Lun - Sam : 8h00 - 19h00 (Fermé Dimanche)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-emerald-950/80 space-y-4">
          {/* Quick High-Intent SEO Keywords Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-[#091F17]/70 p-3.5 rounded-2xl border border-emerald-900/60">
            <div className="text-emerald-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Interventions Toiture Prioritaires :</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={() => onNavigateToSilo && onNavigateToSilo('nettoyage-demoussage-toiture')}
                className="px-2.5 py-1 rounded-lg bg-[#061811] hover:bg-emerald-600 hover:text-white text-emerald-200 transition-colors border border-emerald-900/60 cursor-pointer"
              >
                Démoussage toiture Mérignac
              </button>
              <button
                onClick={() => onNavigateToSilo && onNavigateToSilo('nettoyage-demoussage-toiture')}
                className="px-2.5 py-1 rounded-lg bg-[#061811] hover:bg-emerald-600 hover:text-white text-emerald-200 transition-colors border border-emerald-900/60 cursor-pointer"
              >
                Démoussage toiture Bordeaux
              </button>
              <button
                onClick={() => onNavigateToSilo && onNavigateToSilo('nettoyage-demoussage-toiture')}
                className="px-2.5 py-1 rounded-lg bg-[#061811] hover:bg-emerald-600 hover:text-white text-emerald-200 transition-colors border border-emerald-900/60 cursor-pointer"
              >
                Nettoyage toiture Mérignac devis 48h
              </button>
              <button
                onClick={() => onNavigateToSilo && onNavigateToSilo('nettoyage-demoussage-toiture')}
                className="px-2.5 py-1 rounded-lg bg-[#061811] hover:bg-emerald-600 hover:text-white text-emerald-200 transition-colors border border-emerald-900/60 cursor-pointer"
              >
                Entreprise nettoyage toiture Bordeaux
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>© {new Date().getFullYear()} NOVA CB - Tous droits réservés. Entreprise artisanale déclarée en Gironde (33).</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <button
                id="footer-admin-discreet-btn"
                onClick={() => {
                  if (onOpenAdmin) {
                    onOpenAdmin();
                  } else {
                    window.location.href = '/admin';
                  }
                }}
                className="text-[11px] text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer focus:outline-none"
                title="Accès réservé"
              >
                Espace administrateur
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <span>Mérignac • Bordeaux • Gironde</span>
              <button
                onClick={scrollToTop}
                className="w-8 h-8 rounded-full bg-[#091F17] hover:bg-emerald-600 text-slate-300 hover:text-white border border-emerald-900/60 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Retour en haut"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
