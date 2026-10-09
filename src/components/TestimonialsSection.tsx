import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, CheckCircle, Award } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonialsData';
import actionImg from '../assets/images/artisan_testimonials_1789475470600.jpg';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials-section" className="py-16 sm:py-24 bg-[#0b1329] border-t border-sky-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Avis vérifiés</span>
              <span className="text-sky-400">›</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ce que nos <span className="text-sky-400">clients disent</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </span>
            <span className="text-white font-bold text-sm">4.9 / 5</span>
            <span className="text-slate-400">sur plus de 120 avis locaux</span>
          </div>
        </div>

        {/* Content Layout matching the reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Professional Action Visual */}
          <div className="lg:col-span-5 h-[340px] sm:h-[420px] rounded-3xl overflow-hidden relative shadow-xl border border-sky-900/50">
            <img
              src={actionImg}
              alt="Artisan NOVA CB avec cloche professionnelle de nettoyage"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500 text-white text-xs font-bold mb-2 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                Intervention soignée & garantie
              </div>
              <p className="text-sm text-slate-200 font-medium">
                « Un chantier rendu propre, sans projection, avec protection immédiate des matériaux. »
              </p>
            </div>
          </div>

          {/* Right: Testimonial Card */}
          <div className="lg:col-span-7 bg-[#0e1935] rounded-3xl p-8 sm:p-10 border border-sky-900/50 shadow-xl flex flex-col justify-between relative min-h-[380px]">
            <Quote className="w-14 h-14 text-sky-500/10 absolute top-8 right-8 pointer-events-none" />

            <div>
              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              {/* Comment text */}
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed italic mb-8 font-medium">
                « {current.comment} »
              </p>
            </div>

            {/* Author details & navigation buttons */}
            <div className="pt-6 border-t border-sky-900/40 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 font-extrabold flex items-center justify-center text-sm">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white text-sm sm:text-base">
                    {current.name}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {current.role} • {current.city}
                  </div>
                  <div className="text-[11px] text-sky-400 font-semibold mt-0.5">
                    Prestation : {current.service}
                  </div>
                </div>
              </div>

              {/* Arrow controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full border border-sky-900/60 bg-slate-900/90 hover:border-sky-500/50 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Témoignage précédent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md shadow-sky-500/25"
                  aria-label="Témoignage suivant"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Local trust indicators row */}
        <div className="mt-12 pt-8 border-t border-sky-900/40 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3.5 bg-[#0e1935] rounded-2xl border border-sky-900/40 shadow-sm">
            <div className="text-xs font-bold text-white">Artisan Local</div>
            <div className="text-[11px] text-sky-300/80">Mérignac (33700)</div>
          </div>
          <div className="p-3.5 bg-[#0e1935] rounded-2xl border border-sky-900/40 shadow-sm">
            <div className="text-xs font-bold text-white">Assurance Responsabilité</div>
            <div className="text-[11px] text-sky-300/80">Garantie professionnelle</div>
          </div>
          <div className="p-3.5 bg-[#0e1935] rounded-2xl border border-sky-900/40 shadow-sm">
            <div className="text-xs font-bold text-white">Produits Certifiés</div>
            <div className="text-[11px] text-sky-300/80">Efficacité & respect support</div>
          </div>
          <div className="p-3.5 bg-[#0e1935] rounded-2xl border border-sky-900/40 shadow-sm">
            <div className="text-xs font-bold text-white">Devis 100% Gratuit</div>
            <div className="text-[11px] text-sky-300/80">Sans aucun engagement</div>
          </div>
        </div>
      </div>
    </section>
  );
};
