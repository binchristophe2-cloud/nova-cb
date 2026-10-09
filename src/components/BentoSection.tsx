import React from 'react';
import { ArrowUpRight, CheckCircle2, Shield, Sparkles, Award } from 'lucide-react';
import actionImg from '../assets/images/artisan_bento_smile_1789476181824.jpg';
import woodImg from '../assets/images/wood_terrace_cleaning_1788450485682.jpg';

interface BentoSectionProps {
  onLearnMore: () => void;
  onViewReviews: () => void;
  onOpenQuote: () => void;
}

export const BentoSection: React.FC<BentoSectionProps> = ({ onLearnMore, onViewReviews, onOpenQuote }) => {
  return (
    <section id="bento-presentation-section" className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro statement with statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 lg:mb-16">
          {/* Left Stats column */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="border-l-4 border-emerald-600 pl-4 bg-white/90 py-3 rounded-r-2xl border border-stone-200/80 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 tracking-tight">
                100%
              </div>
              <div className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
                Matériaux et supports respectés (zéro dégradation)
              </div>
            </div>

            <div className="border-l-4 border-teal-600 pl-4 bg-white/90 py-3 rounded-r-2xl border border-stone-200/80 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                48h
              </div>
              <div className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
                Délai moyen d’intervention sur Mérignac & région
              </div>
            </div>
          </div>

          {/* Right Text Manifesto */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>À propos de notre engagement</span>
              <span className="text-emerald-600">›</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-snug">
              Chez <strong className="text-emerald-700 font-extrabold">NOVA CB</strong>, nous croyons qu’un extérieur entretenu{' '}
              <span className="text-emerald-700">valorise durablement</span> votre patrimoine.
            </h2>

            <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed font-normal">
              C’est pourquoi nous allions un <strong className="text-stone-900">diagnostic technique préalable</strong> de chaque support, le choix d’une méthode de nettoyage calibrée (pression d’eau régulée ou softwash basse pression), l’utilisation de solutions éco-responsables sans danger pour vos matériaux, et l’application de <strong className="text-stone-900">traitements préventifs longue durée</strong>.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Large image card with technician in action */}
          <div className="md:col-span-7 bg-[#071912] rounded-3xl overflow-hidden border border-emerald-950/60 shadow-xl group relative min-h-[380px] md:min-h-full flex flex-col">
            <div className="relative w-full h-full min-h-[380px] flex-1 overflow-hidden">
              <img
                src={actionImg}
                alt="Artisan NOVA CB avec cloche professionnelle sur terrasse à Mérignac"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071912]/95 via-[#071912]/45 to-transparent"></div>
              
              {/* Overlay pill on photo */}
              <div className="absolute top-5 left-5 bg-[#091F17]/90 backdrop-blur-md text-emerald-200 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-emerald-600/40 shadow-sm">
                Cloche rotative sans projection
              </div>

              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 text-white">
                <div className="font-bold text-lg sm:text-xl tracking-tight text-white">Nettoyage haute précision par cloche rotative carénée</div>
                <p className="text-xs sm:text-sm text-emerald-100/80 mt-1.5 leading-relaxed max-w-xl">
                  Décapage homogène et sans traces grâce à notre cloche de surface professionnelle à double buse rotative. Élimine les mousses et le film glissant sans aucune projection sur vos murs et baies vitrées.
                </p>
              </div>
            </div>
          </div>

          {/* Right column: 2 stacked cards (Clean white card + Emerald rating card) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Card 2: Modern clean white card with arrow */}
            <div 
              onClick={onLearnMore}
              className="bg-white text-stone-900 rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-stone-200 shadow-lg group cursor-pointer hover:border-emerald-500/50 transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 tracking-tight mb-2">
                  Rénover vos espaces extérieurs avec soin
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Terrasses bois grisaillées, terrasses béton ou pierre encrassées, façades ternies ou toitures avec mousse, lichen et pollution urbaine : nous redonnons un éclat immédiat et protecteur.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-100 text-sm font-semibold text-emerald-700 group-hover:text-emerald-600">
                <span>Découvrir notre méthode</span>
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Card 3: Emerald green rating card */}
            <div 
              onClick={onViewReviews}
              className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-emerald-950/20 group cursor-pointer hover:shadow-emerald-900/30 transition-all border border-emerald-600/40"
            >
              <div>
                {/* Avatars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex -space-x-2">
                    <div className="w-9 h-9 rounded-full bg-white/20 border-2 border-white text-xs font-bold flex items-center justify-center">
                      LD
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/30 border-2 border-white text-xs font-bold flex items-center justify-center">
                      CM
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/40 border-2 border-white text-xs font-bold flex items-center justify-center">
                      MB
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black tracking-tight text-white">4.9 / 5</div>
                    <div className="text-[11px] text-emerald-200 font-medium">Avis clients vérifiés</div>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-white mb-1">
                  Recommandé par nos clients
                </h4>
                <p className="text-xs text-emerald-100/90 leading-snug">
                  Particuliers et professionnels à Mérignac et en Gironde nous font confiance pour leur remise en état.
                </p>

                {/* Progress bar effect */}
                <div className="mt-4 bg-emerald-950/50 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-300 h-full rounded-full w-[98%]"></div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-sm font-semibold text-white">
                <span>Lire les retours clients</span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-emerald-800 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
