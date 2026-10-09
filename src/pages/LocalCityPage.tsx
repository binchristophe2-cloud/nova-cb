import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Home, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  TreePine, 
  Wrench,
  Check
} from 'lucide-react';
import { LocalCitySilo } from '../types';
import { SeoHead } from '../components/SeoHead';
import patioRotaryImg from '../assets/images/patio_rotary_cleaner_stone.jpg';

interface LocalCityPageProps {
  city: LocalCitySilo;
  onOpenQuote: (serviceOrCity?: string) => void;
  onNavigateToSilo: (slug: string) => void;
  onNavigateToCity: (slug: string) => void;
  onNavigateHome: () => void;
}

export const LocalCityPage: React.FC<LocalCityPageProps> = ({
  city,
  onOpenQuote,
  onNavigateToSilo,
  onNavigateToCity,
  onNavigateHome,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const breadcrumbs = [
    { name: 'Accueil', url: `${window.location.origin}/` },
    { name: 'Secteurs d’intervention', url: `${window.location.origin}/#zones` },
    { name: `${city.cityName} (${city.postalCode})`, url: `${window.location.origin}/${city.slug}` },
  ];

  return (
    <article className="min-h-screen bg-[#FAF8F5] text-stone-900">
      <SeoHead
        title={city.title}
        description={city.metaDescription}
        canonicalUrl={`${window.location.origin}/${city.slug}`}
        breadcrumbs={breadcrumbs}
        faqs={city.faqs}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Fil d'Ariane" className="bg-stone-100 border-b border-stone-200 text-xs py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-slate-400">
          <button 
            onClick={onNavigateHome}
            className="flex items-center hover:text-white transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            <span>Accueil</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span>Secteurs d’intervention</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-emerald-400 font-semibold truncate">{city.cityName} ({city.postalCode})</span>
        </div>
      </nav>

      {/* Hero Section Locale */}
      <section className="relative py-12 lg:py-16 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-[#071912] to-[#0a261c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide uppercase">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Intervention locale • {city.cityName} ({city.postalCode})</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                {city.h1}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {city.intro}
              </p>

              {/* Badges Artisan de Proximité */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-slate-200">Visite sous 24-48h</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-slate-200">Zéro frais de déplacement</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-1">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-slate-200">Basse pression & Cloche</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onOpenQuote(`Devis ${city.cityName}`)}
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer"
                >
                  <span>Demander mon devis à {city.cityName}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:0624685217"
                  className="px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>06 24 68 52 17</span>
                </a>
              </div>
            </div>

            {/* Right Card with Local info */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-[#0b241b] border border-emerald-900/60 p-6 shadow-2xl space-y-5">
                <div className="flex items-center gap-3 border-b border-emerald-950 pb-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-black text-base flex items-center gap-1.5">
                      <span className="text-emerald-400">NOVA CB</span> Gironde
                    </div>
                    <div className="text-xs text-emerald-100/70">Siège social : 33 avenue Léon Blum, 33700 Mérignac</div>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5 text-stone-200">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Secteur :</strong> {city.cityName} ({city.postalCode}) et communes limitrophes</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-stone-200">
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Disponibilité :</strong> Du Lundi au Samedi de 8h00 à 19h00</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-stone-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Garantie :</strong> Assurance professionnelle artisanale</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#061912] border border-emerald-950 text-xs text-stone-200">
                  <div className="font-bold text-emerald-400 mb-1">Quartiers desservis à {city.cityName} :</div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {city.neighborhoods.map((q, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-200 text-[11px] border border-emerald-900/40">
                        {q}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenQuote(`Devis ${city.cityName}`)}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  Obtenir une estimation sous 48h
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section : Spécificités & Défis Locaux */}
      <section className="py-14 sm:py-20 border-b border-stone-200/80 bg-[#F5F2EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-wide">
                <TreePine className="w-4 h-4 text-emerald-700" />
                <span>Contexte & Climat Local</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                {city.localQuestion || `Pourquoi les surfaces s’encrassent-elles à ${city.cityName} ?`}
              </h2>
              <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-normal">
                {city.localContext}
              </p>

              <div className="pt-2 space-y-3">
                <h3 className="text-base sm:text-lg font-black text-stone-950 flex items-center gap-2 pt-1">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>Problématiques courantes observées sur le terrain :</span>
                </h3>
                {city.localChallenges.map((challenge, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-stone-300 shadow-sm text-sm sm:text-base text-stone-900 font-medium">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-800" />
                    </div>
                    <span className="leading-relaxed text-stone-900 font-semibold">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Surfaces Typiques */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-300 shadow-sm space-y-4">
              <h3 className="text-xl font-black text-stone-950">
                Revêtements les plus fréquents à {city.cityName}
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                Chaque surface demande une attention particulière. Voici nos interventions habituelles chez les propriétaires de la commune :
              </p>
              
              <ul className="space-y-2.5">
                {city.typicalSurfaces.map((surf, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{surf}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Prestations recommandées pour la commune */}
      <section className="py-14 sm:py-20 border-b border-stone-200/80 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              Savoir-Faire Adapté
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              Nos prestations les plus demandées à {city.cityName}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {city.recommendedServices.map((service, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-400 hover:shadow-md transition-all">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-stone-900">
                    {service}
                  </h3>
                </div>
                <button
                  onClick={() => onOpenQuote(service)}
                  className="text-emerald-700 hover:text-emerald-800 font-extrabold text-xs flex items-center gap-1 group cursor-pointer pt-2 border-t border-stone-100"
                >
                  <span>Diagnostic gratuit</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Locale */}
      <section className="py-14 sm:py-20 border-b border-stone-200/80 bg-[#F5F2EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
              Intervention à {city.cityName}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950">
              Questions fréquentes de nos clients à {city.cityName}
            </h2>
          </div>

          <div className="space-y-3">
            {city.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                    isOpen 
                      ? 'bg-white border-emerald-600 shadow-md ring-1 ring-emerald-600/30' 
                      : 'bg-white border-stone-300 hover:border-emerald-400'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 text-base sm:text-lg font-bold text-stone-950 hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-600 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm sm:text-base text-stone-900 leading-relaxed border-t border-stone-200 pt-4 bg-stone-50/80 font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Maillage Communes Voisines */}
      <section className="py-14 sm:py-20 border-b border-stone-200/80 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm text-center space-y-4">
            <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
              Nous intervenons également dans les communes voisines
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
              <strong className="text-stone-900 font-bold">NOVA CB</strong> se déplace sans surcoût dans l'ensemble de Bordeaux Métropole et en Gironde.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {city.nearbyCities.map((nc, idx) => {
                const serviceLabels = [
                  `Nettoyage toiture & terrasse à ${nc.name}`,
                  `Démoussage toiture à ${nc.name}`,
                  `Nettoyage de terrasse à ${nc.name}`,
                  `Entretien façades & murets à ${nc.name}`
                ];
                const label = serviceLabels[idx % serviceLabels.length];
                return (
                  <button
                    key={nc.slug}
                    onClick={() => onNavigateToCity(nc.slug)}
                    className="px-4 py-2 rounded-xl bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-800 text-xs font-semibold border border-stone-200 hover:border-emerald-300 transition-all cursor-pointer"
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="py-14 bg-[#071912] text-white border-t border-emerald-950/70 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Votre toiture, façade, muret ou terrasse à {city.cityName} a besoin d’un diagnostic ?
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/80 max-w-xl mx-auto">
            Demandez votre diagnostic gratuit et sans engagement dès aujourd'hui. Réponse rapide sous 48h.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenQuote(`Diagnostic ${city.cityName}`)}
              className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-600/30 transition-all cursor-pointer"
            >
              Demander mon diagnostic gratuit pour {city.cityName}
            </button>
            <a
              href="tel:0624685217"
              className="px-6 py-4 rounded-2xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-white font-bold text-sm flex items-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>06 24 68 52 17</span>
            </a>
          </div>
        </div>
      </section>

    </article>
  );
};
