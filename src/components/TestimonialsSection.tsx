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
    <section id="testimonials-section" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Avis vérifiés</span>
              <span className="text-emerald-600">›</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Ce que nos <span className="text-emerald-700">clients disent</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
            <span className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </span>
            <span className="text-stone-900 font-bold text-sm">4.9 / 5</span>
            <span className="text-stone-500">sur plus de 120 avis locaux</span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Professional Action Visual */}
          <div className="lg:col-span-5 h-[340px] sm:h-[420px] rounded-3xl overflow-hidden relative shadow-xl border border-stone-200">
            <img
              src={actionImg}
              alt="Artisan NOVA CB avec cloche professionnelle de nettoyage"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold mb-2 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                Intervention soignée & garantie
              </div>
              <p className="text-sm text-stone-200 font-medium">
                « Un chantier rendu propre, sans projection, avec protection immédiate des matériaux. »
              </p>
            </div>
          </div>

          {/* Right: Testimonial Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl flex flex-col justify-between relative min-h-[380px]">
            <Quote className="w-14 h-14 text-emerald-600/10 absolute top-8 right-8 pointer-events-none" />

            <div>
              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-500 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500" />
                ))}
              </div>

              {/* Comment text */}
              <p className="text-stone-800 text-base sm:text-lg leading-relaxed italic mb-8 font-medium">
                « {current.comment} »
              </p>
            </div>

            {/* Author details & navigation buttons */}
            <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-extrabold flex items-center justify-center text-sm">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-sm sm:text-base">
                    {current.name}
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    {current.role} • {current.city}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    Prestation : {current.service}
                  </div>
                </div>
              </div>

              {/* Arrow controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Témoignage précédent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md shadow-emerald-600/25"
                  aria-label="Témoignage suivant"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Local trust indicators row */}
        <div className="mt-12 pt-8 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <div className="text-xs font-bold text-stone-900">Artisan Local</div>
            <div className="text-[11px] text-emerald-700">Mérignac (33700)</div>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <div className="text-xs font-bold text-stone-900">Assurance Responsabilité</div>
            <div className="text-[11px] text-emerald-700">Garantie professionnelle</div>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <div className="text-xs font-bold text-stone-900">Produits Certifiés</div>
            <div className="text-[11px] text-emerald-700">Efficacité & respect support</div>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <div className="text-xs font-bold text-stone-900">Devis 100% Gratuit</div>
            <div className="text-[11px] text-emerald-700">Sans aucun engagement</div>
          </div>
        </div>
      </div>
    </section>
  );
};
