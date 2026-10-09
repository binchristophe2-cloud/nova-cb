import React from 'react';
import { MapPin, ArrowRight, Clock, ShieldCheck, Phone, Sparkles } from 'lucide-react';
import { LOCAL_CITY_SILOS } from '../data/silosData';

interface LocalZonesSectionProps {
  onNavigateToCity: (slug: string) => void;
  onOpenQuote: (city?: string) => void;
}

export const LocalZonesSection: React.FC<LocalZonesSectionProps> = ({
  onNavigateToCity,
  onOpenQuote,
}) => {
  const cities = Object.values(LOCAL_CITY_SILOS);

  return (
    <section id="zones" className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Artisan de Proximité • Gironde (33)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            Zones d'intervention en Gironde
          </h2>

          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            Installés au 33 avenue Léon Blum à Mérignac, nous intervenons sans surcoût de déplacement dans toute la métropole bordelaise et dans un rayon de 40 km.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cities.map((city) => (
            <div
              key={city.slug}
              className="rounded-3xl bg-white border border-stone-200 hover:border-emerald-500/50 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-xs border border-emerald-200">
                      33
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                        {city.cityName}
                      </h3>
                      <div className="text-[11px] text-stone-500 font-mono">
                        Code Postal : {city.postalCode}
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100/70 text-emerald-800 border border-emerald-200">
                    Secteur direct
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-3">
                  {city.intro}
                </p>

                <div className="text-[11px] text-stone-600 font-medium space-y-1 bg-stone-50 p-3 rounded-xl border border-stone-200 mb-4">
                  <div className="text-emerald-700 font-bold text-[10px] uppercase">Quartiers & Spécificités :</div>
                  <div className="truncate text-stone-700">
                    {city.neighborhoods.slice(0, 4).join(', ')}...
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigateToCity(city.slug)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-600 flex items-center gap-1 group-hover:gap-1.5 transition-all cursor-pointer"
                >
                  <span>Page locale {city.cityName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenQuote(`Diagnostic ${city.cityName}`)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-600 hover:text-white text-[11px] font-bold text-emerald-800 transition-all cursor-pointer"
                >
                  Diagnostic {city.cityName}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global info banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-bold text-stone-900">
              Votre commune n'apparaît pas dans la liste ci-dessus ?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
              Nous couvrons également Le Haillan, Blanquefort, Saint-Aubin-de-Médoc, Bègles, Villenave-d'Ornon, Cenon, Floirac, Lormont, Ambarès, et toute la Gironde dans un rayon de 40 km autour de Mérignac.
            </p>
          </div>

          <button
            onClick={() => onOpenQuote('Diagnostic Gironde')}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/20 whitespace-nowrap transition-all cursor-pointer"
          >
            Vérifier mon éligibilité & diagnostic
          </button>
        </div>

      </div>
    </section>
  );
};
