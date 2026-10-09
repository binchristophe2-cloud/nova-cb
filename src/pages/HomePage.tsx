import React, { useRef } from 'react';
import { HeroSection } from '../components/HeroSection';
import { BentoSection } from '../components/BentoSection';
import { ServicesSection } from '../components/ServicesSection';
import { SiloShowcaseSection } from '../components/SiloShowcaseSection';
import { ResponsibleSolutionsSection } from '../components/ResponsibleSolutionsSection';
import { AboutSection } from '../components/AboutSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { LocalZonesSection } from '../components/LocalZonesSection';
import { FaqSection } from '../components/FaqSection';
import { ContactForm } from '../components/ContactForm';
import { SeoHead } from '../components/SeoHead';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { PageType } from '../types';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onOpenQuote: (serviceName?: string) => void;
  onSelectServiceForQuote: (serviceTitle: string) => void;
  selectedService: string;
  setSelectedService: (service: string) => void;
  onFormSuccess: () => void;
  onNavigateToSilo: (slug: string) => void;
  onNavigateToCity: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onOpenQuote,
  onSelectServiceForQuote,
  selectedService, 
  setSelectedService,
  onFormSuccess,
  onNavigateToSilo,
  onNavigateToCity,
}) => {
  const contactSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-0">
      <SeoHead
        title="Démoussage & Nettoyage Toiture Mérignac, Bordeaux | Devis Gratuit | NOVA CB"
        description="Entreprise spécialisée en démoussage toiture à Mérignac et Bordeaux. Traitement anti-mousse basse pression, nettoyage de terrasse par cloche et façades. Devis toiture gratuit sous 48h."
        canonicalUrl={window.location.origin}
        breadcrumbs={[
          { name: 'Accueil', url: `${window.location.origin}/` },
        ]}
      />

      {/* 1. Hero Section */}
      <div id="accueil" className="scroll-mt-20">
        <HeroSection 
          onOpenQuote={() => onOpenQuote()}
          onExploreServices={() => scrollToSection('prestations-silos')}
        />
      </div>

      {/* 2. Bento Presentation & Stats */}
      <div id="atouts" className="scroll-mt-20">
        <BentoSection 
          onLearnMore={() => scrollToSection('a-propos')}
          onViewReviews={() => scrollToSection('temoignages')}
          onOpenQuote={() => onOpenQuote()}
        />
      </div>

      {/* 3. Services Showcase */}
      <ServicesSection 
        onSelectServiceForQuote={onSelectServiceForQuote}
        onNavigateToFullServices={() => scrollToSection('prestations-silos')}
      />

      {/* 4. Architecture Silos SEO Spécialisée (Terrasses bois, béton, pierre, murs, anti-mousse, entretien) */}
      <SiloShowcaseSection
        onNavigateToSilo={onNavigateToSilo}
        onOpenQuote={onOpenQuote}
      />

      {/* 4b. Positionnement Éco-responsable & Solutions Adaptées */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResponsibleSolutionsSection onOpenQuote={onOpenQuote} />
      </div>

      {/* 5. About & 4-Step Technical Protocol */}
      <AboutSection onOpenQuote={() => onOpenQuote()} />

      {/* 6. Testimonials */}
      <div id="temoignages" className="scroll-mt-20">
        <TestimonialsSection />
      </div>

      {/* 7. Local Zones d'intervention (Mérignac, Bordeaux, Pessac, Talence...) */}
      <LocalZonesSection
        onNavigateToCity={onNavigateToCity}
        onOpenQuote={onOpenQuote}
      />

      {/* 8. Interactive FAQ */}
      <div id="faq" className="scroll-mt-20">
        <FaqSection onOpenQuote={() => onOpenQuote()} />
      </div>

      {/* Final Conversion Strip */}
      <section className="py-12 bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 text-white text-center border-y border-sky-400/40 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Votre terrasse ou vos extérieurs ont besoin d'un nettoyage ?
          </h2>
          <p className="text-base sm:text-lg text-sky-100 max-w-2xl mx-auto">
            Évaluez gratuitement l'état de votre toiture, façade, muret ou terrasse, sans engagement.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                onOpenQuote();
                scrollToSection('contact');
              }}
              className="px-8 py-4 rounded-2xl bg-slate-950 hover:bg-[#070c18] text-white font-extrabold text-sm sm:text-base shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 border border-sky-400/30"
            >
              <span>Demander mon diagnostic gratuit</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </button>
            <a
              href="tel:0624685217"
              className="px-6 py-4 rounded-2xl bg-sky-950/70 hover:bg-sky-900 text-white font-bold text-sm flex items-center gap-2 transition-all border border-sky-300/40"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>06 24 68 52 17</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. High-Converting Diagnostic Gratuit Section */}
      <section 
        id="contact" 
        ref={contactSectionRef} 
        className="py-16 sm:py-24 bg-[#080d1a] text-white relative overflow-hidden scroll-mt-20 border-t border-sky-950/80"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Coordinates & Assurance */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/15 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4 border border-sky-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>Diagnostic gratuit & sans engagement</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Demander mon <span className="text-sky-400">diagnostic gratuit</span>
                </h2>

                <p className="mt-4 text-slate-200 text-base sm:text-lg font-medium leading-relaxed">
                  Évaluez gratuitement l'état de votre toiture, façade, muret ou terrasse, sans engagement.
                </p>

                <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                  Un premier échange nous permet d'identifier vos besoins, l'état du support et la solution la plus adaptée.
                </p>
              </div>

              {/* Coordinates List */}
              <div className="space-y-4 pt-4 border-t border-sky-900/40">
                <a
                  href="tel:0624685217"
                  className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#0e1935] hover:bg-[#122044] border-2 border-sky-500/60 hover:border-sky-400 shadow-lg shadow-sky-500/10 transition-all group cursor-pointer"
                  title="Appeler directement NOVA CB"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/30 group-hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>Ligne directe 7j/7</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white group-hover:text-sky-300 tracking-wider mt-0.5">
                      06 24 68 52 17
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:nova.entretien33@outlook.fr"
                  className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#0e1935] hover:bg-[#122044] border-2 border-sky-900/60 hover:border-sky-400 shadow-md transition-all group cursor-pointer"
                  title="Envoyer un email à NOVA CB"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-sky-900/60 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Email professionnel
                    </div>
                    <div className="text-sm sm:text-lg font-black text-sky-400 group-hover:text-sky-300 transition-colors truncate mt-0.5">
                      nova.entretien33@outlook.fr
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0e1935]/80 border border-sky-900/40">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-sky-900/50 text-sky-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Siège social</div>
                    <div className="text-sm font-semibold text-white">
                      33 avenue Léon Blum, 33700 Mérignac, France
                    </div>
                    <div className="text-xs text-sky-400 mt-0.5">
                      Intervention Mérignac & Gironde (rayon 40km)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0e1935]/80 border border-sky-900/40">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-sky-900/50 text-sky-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Horaires d'intervention</div>
                    <div className="text-sm font-semibold text-white">
                      Lundi au Samedi : 8h00 - 19h00
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Fermé le Dimanche
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Converting Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm 
                initialService={selectedService}
                onSuccess={onFormSuccess}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
