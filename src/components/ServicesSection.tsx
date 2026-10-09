import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Layers, ShieldCheck, Droplets, Home, Flame } from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
  onNavigateToFullServices?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onSelectServiceForQuote,
  onNavigateToFullServices 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tous nos services' },
    { id: 'toitures', label: 'Toitures & Démoussage' },
    { id: 'terrasses', label: 'Terrasses & Cloche' },
    { id: 'surfaces', label: 'Façades & Murs' },
    { id: 'traitements', label: 'Traitements & Bois' },
  ];

  const filteredServices = activeCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Nos prestations professionnelles</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Des méthodes adaptées à chaque support
          </h2>

          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            Chez <strong className="text-emerald-700 font-extrabold">NOVA CB</strong>, nous ne nettoyons pas une terrasse en bois comme un dallage en pierre ou un crépi de façade. Diagnostic rigoureux, pressions régulées et solutions éco-responsables protectrices.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 font-bold'
                    : 'bg-white text-stone-700 border border-stone-200 hover:text-stone-900 hover:border-emerald-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 hover:border-emerald-500/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Photo & Badge */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-stone-100">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent"></div>
                
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Très demandé à Mérignac
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-stone-600 text-sm leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>

                  {/* Liste des supports pris en charge */}
                  <div className="mb-5">
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-2">
                      Supports pris en charge :
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.supports.map((sup, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-50/80 border border-emerald-200 text-emerald-800"
                        >
                          <Check className="w-3 h-3 text-emerald-600 mr-1 shrink-0" />
                          {sup}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-1.5 border-t border-stone-100 pt-4 mb-6">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => onSelectServiceForQuote(service.title)}
                    className="w-full bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl border border-emerald-200 hover:border-emerald-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:shadow-md"
                  >
                    <span>Demander mon diagnostic gratuit</span>
                    <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA button to view all details or ask question */}
        {onNavigateToFullServices && (
          <div className="mt-12 text-center">
            <button
              onClick={onNavigateToFullServices}
              className="inline-flex items-center gap-2 text-sm font-bold text-stone-700 hover:text-emerald-800 px-6 py-3 rounded-full bg-white hover:bg-stone-50 border border-stone-300 hover:border-emerald-400 transition-all cursor-pointer shadow-md"
            >
              <span>Consulter le détail technique de tous nos services</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
