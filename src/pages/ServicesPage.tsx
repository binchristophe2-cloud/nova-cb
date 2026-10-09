import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, ShieldCheck, Droplets, Sun, Layers, Home } from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import { PageType, ServiceItem } from '../types';

interface ServicesPageProps {
  onNavigate: (page: PageType) => void;
  onSelectServiceForQuote: (serviceTitle: string) => void;
  onOpenQuote: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ 
  onNavigate, 
  onSelectServiceForQuote,
  onOpenQuote 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Toutes les prestations' },
    { id: 'terrasses', label: 'Terrasses & Sols' },
    { id: 'surfaces', label: 'Façades & Murs' },
    { id: 'traitements', label: 'Traitements Spécifiques & Bois' },
    { id: 'toitures', label: 'Toitures & Démoussage' },
  ];

  const filtered = selectedCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <div className="py-10 sm:py-16 bg-[#0b1329] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Catalogue complet des prestations</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Solutions professionnelles de <span className="text-sky-400">nettoyage & rénovation</span>
          </h1>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Découvrez nos interventions ciblées pour terrasses, façades, toitures et abords extérieurs à Mérignac et en Gironde. Chaque support bénéficie d’un protocole technique dédié.
          </p>

          {/* Categories Selector */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30 font-bold'
                    : 'bg-[#0e1935] text-slate-300 border border-sky-900/50 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Service Cards */}
        <div className="space-y-12">
          {filtered.map((service, index) => (
            <div
              key={service.id}
              id={`service-detail-${service.id}`}
              className={`bg-[#0e1935] rounded-3xl overflow-hidden border border-sky-900/50 shadow-xl grid grid-cols-1 lg:grid-cols-12 items-stretch ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image side */}
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-slate-900">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-sky-500 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Intervention NOVA CB
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
                    {service.title}
                  </h2>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    {service.longDesc}
                  </p>

                  {/* Supports grid */}
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2.5">
                      Supports traités :
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.supports.map((sup, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs font-medium text-slate-200 bg-[#091024] p-2.5 rounded-xl border border-sky-900/50"
                        >
                          <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span>{sup}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 border-t border-sky-900/40 pt-4 mb-6">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0"></span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-sky-900/40 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onSelectServiceForQuote(service.title)}
                    className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all shadow-md shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Demander mon diagnostic gratuit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onOpenQuote}
                    className="w-full sm:w-auto text-xs text-slate-300 hover:text-white font-semibold py-3 px-4 rounded-xl border border-sky-900/50 hover:border-sky-500/50 bg-[#091024] transition-colors cursor-pointer"
                  >
                    Contacter un conseiller
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informational banner about materials */}
        <div className="bg-[#0e1935] text-white rounded-3xl p-8 sm:p-10 border border-sky-900/50 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto mb-2 border border-sky-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            Vous avez un support spécifique ou un doute sur le matériau ?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Nos techniciens réalisent un test sur une zone discrète pour déterminer la tolérance du support avant toute intervention générale.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenQuote}
              className="bg-sky-500 hover:bg-sky-400 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-colors cursor-pointer shadow-lg shadow-sky-500/25 inline-flex items-center gap-2"
            >
              <span>Demander un diagnostic sans engagement</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
