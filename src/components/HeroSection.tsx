import React from 'react';
import { ArrowRight, Phone, Star, ShieldCheck, CheckCircle, Sparkles, Award } from 'lucide-react';
import heroImg from '../assets/images/pro200_hero_unbrand_1789475076424.jpg';

interface HeroSectionProps {
  onOpenQuote: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuote, onExploreServices }) => {
  return (
    <section id="hero-section" className="relative pt-2 pb-12 sm:pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Container with rounded luxury framing */}
        <div className="relative bg-[#071912] text-white rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-emerald-950/60 shadow-2xl">
          {/* Background Hero Image with professional overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImg}
              alt="Artisan NOVA CB avec cloche rotative professionnelle de nettoyage sur terrasse à Mérignac"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-1000"
            />
            {/* Multi-stage dark gradient overlays for high text legibility */}
            <div className="absolute inset-0 bg-[#071912]/80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#071912] via-[#071912]/50 to-[#071912]/65"></div>
          </div>

          <div className="relative z-10 p-6 sm:p-10 md:p-16 lg:p-20 flex flex-col justify-between min-h-[580px] lg:min-h-[640px]">
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <div 
                id="hero-trust-badge"
                className="inline-flex items-center gap-2 bg-[#091F17]/85 backdrop-blur-md border border-emerald-800/80 text-xs sm:text-sm font-semibold text-emerald-200 px-4 py-1.5 rounded-full shadow-lg text-center"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Toitures & Façades à Basse Pression • Terrasses par Cloche sans Projection</span>
                <span className="text-emerald-400">›</span>
              </div>
            </div>

            {/* Main Center Headline Content */}
            <div className="max-w-3xl mx-auto text-center flex flex-col items-center my-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-5 text-center max-w-2xl mx-auto">
                <span className="text-emerald-400 block text-center">Nettoyage Toitures, Terrasses & Façades</span>
              </h1>

              <p className="text-emerald-100/90 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-normal text-center mx-auto">
                Toiture avec mousse, lichen et pollution urbaine, façade ternie ou terrasse noircie ? <strong className="font-bold text-white">NOVA CB</strong> applique la technique adaptée à chaque surface : <strong className="text-white font-semibold">nettoyage à basse pression</strong> pour protéger tuiles et enduits, et <strong className="text-white font-semibold">nettoyage de terrasse par cloche rotative</strong> sans projection à Mérignac, Bordeaux et en Gironde.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <button
                  id="hero-primary-cta"
                  onClick={onOpenQuote}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm sm:text-base font-bold px-7 py-3.5 rounded-full shadow-xl shadow-emerald-600/30 hover:shadow-emerald-500/50 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer group w-full sm:w-auto"
                >
                  <span>Demander mon diagnostic gratuit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  id="hero-call-now-btn"
                  href="tel:0624685217"
                  className="bg-[#091F17]/95 hover:bg-[#0c2b20] text-white text-sm sm:text-base font-extrabold px-6 py-3.5 rounded-full border-2 border-emerald-500/60 hover:border-emerald-400 flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-emerald-600/10 w-full sm:w-auto"
                  title="Appeler NOVA CB au 06 24 68 52 17"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>06 24 68 52 17</span>
                </a>
              </div>
            </div>

            {/* Bottom floating card row (exact design inspired by screenshot) */}
            <div className="mt-10 pt-6 border-t border-emerald-900/60 flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Trust pill points */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-emerald-200/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Toiture & Façade : Basse pression douce</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Terrasse : Cloche rotative carénée</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Solutions éco-responsables adaptées au support</span>
                </div>
              </div>

              {/* Bottom right preview card (as in screenshot) */}
              <div 
                id="hero-floating-service-card"
                onClick={onExploreServices}
                className="bg-[#091F17]/85 backdrop-blur-xl border border-emerald-800/70 p-4 rounded-2xl hover:border-emerald-500/50 transition-all max-w-md w-full lg:w-auto flex items-center justify-between gap-4 cursor-pointer group shadow-xl"
              >
                <div className="text-center flex-1">
                  <div className="text-white font-bold text-sm group-hover:text-emerald-300 transition-colors text-center whitespace-nowrap">
                    Basse Pression & Cloche de Surface
                  </div>
                  <div className="text-[11px] text-emerald-200/70 leading-snug mt-0.5 text-center">
                    Toiture & façade à basse pression, terrasse par cloche sans projection.
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4 -rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
