import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Phone, 
  MapPin, 
  Layers, 
  Wrench, 
  BadgePercent,
  Check,
  ChevronRight,
  HelpCircle,
  Home
} from 'lucide-react';
import { ServiceSilo } from '../types';
import { SeoHead } from '../components/SeoHead';
import { SiloResponsibleBlock } from '../components/SiloResponsibleBlock';

interface ServiceSiloPageProps {
  silo: ServiceSilo;
  onOpenQuote: (serviceName?: string) => void;
  onNavigateToSilo: (slug: string) => void;
  onNavigateToCity: (slug: string) => void;
  onNavigateHome: () => void;
}

export const ServiceSiloPage: React.FC<ServiceSiloPageProps> = ({
  silo,
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
    { name: 'Prestations', url: `${window.location.origin}/#services` },
    { name: silo.shortTitle, url: `${window.location.origin}/${silo.slug}` },
  ];

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100">
      <SeoHead
        title={silo.title}
        description={silo.metaDescription}
        canonicalUrl={`${window.location.origin}/${silo.slug}`}
        breadcrumbs={breadcrumbs}
        faqs={silo.faqs}
        serviceData={{
          name: silo.shortTitle,
          description: silo.metaDescription,
        }}
      />

      {/* Breadcrumb Bar */}
      <nav aria-label="Fil d'Ariane" className="bg-slate-900/80 border-b border-slate-800 text-xs py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-slate-400">
          <button 
            onClick={onNavigateHome}
            className="flex items-center hover:text-white transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 mr-1 text-sky-400" />
            <span>Accueil</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <button 
            onClick={onNavigateHome}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Prestations
          </button>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-sky-400 font-semibold truncate">{silo.shortTitle}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/90 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span><strong className="text-white font-black bg-sky-500/20 px-1.5 py-0.5 rounded border border-sky-400/30">NOVA CB</strong> • Spécialiste {silo.category}</span>
              </div>

              {/* H1 Tag */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                {silo.h1}
              </h1>

              {/* Introduction: problème -> solution -> zone -> CTA */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {silo.intro}
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="font-semibold text-slate-200">
                    {silo.category === 'Toitures' || silo.category === 'Façades' ? 'Basse pression douce' : 'Cloche rotative carénée'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="font-semibold text-slate-200">
                    {silo.category === 'Toitures' ? 'Préservation étanchéité' : silo.category === 'Façades' ? 'Respect des enduits' : 'Zéro projection latérale'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-1">
                  <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="font-semibold text-slate-200">Devis gratuit sous 48h</span>
                </div>
              </div>

              {/* Primary Immediate CTAs */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onOpenQuote(silo.shortTitle)}
                  className="px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-black text-sm sm:text-base shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer"
                >
                  <span>{silo.ctaButton}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:0624685217"
                  className="px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>06 24 68 52 17</span>
                </a>
              </div>
            </div>

            {/* Right Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl shadow-sky-950/40 group">
                <img
                  src={silo.image}
                  alt={silo.alt}
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-sky-400 font-bold uppercase tracking-wider text-[10px]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Zone d’intervention prioritaire</span>
                  </div>
                  <div className="text-white font-extrabold text-sm mt-0.5">
                    Mérignac, Bordeaux Métropole & Gironde (33)
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section : Problème et Solution professionnelle */}
      <section className="py-12 sm:py-16 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Problème rencontré */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-rose-500/20 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 text-rose-400 text-xs font-bold uppercase">
                <span>Le Risque des Méthodes Inadaptées</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Pourquoi un simple jet haute pression ou de la javel est dangereux
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {silo.problemStatement}
              </p>
            </div>

            {/* Solution NOVA CB */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-sky-500/30 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 text-xs font-bold uppercase">
                <span>L'Approche Professionnelle <strong className="text-white font-black">NOVA CB</strong></span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                La méthode contrôlée sans détériorer le support
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {silo.solutionOverview}
              </p>
            </div>

          </div>

          {/* Key Benefits Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {silo.keyBenefits.map((benefit, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* Mid CTA */}
          <div className="mt-8 text-center">
            <button
              onClick={() => onOpenQuote(silo.shortTitle)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-sky-500/50 hover:border-sky-400 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Faire estimer mon chantier pour {silo.shortTitle}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Solutions de Nettoyage Responsables */}
      <SiloResponsibleBlock
        siloCategory={silo.category}
        siloSlug={silo.slug}
        onOpenQuote={onOpenQuote}
      />

      {/* Strategic Local SEO & Conversion Hub for Toiture */}
      {silo.slug === 'nettoyage-demoussage-toiture' && (
        <section className="py-12 sm:py-16 bg-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Expertise Spécialisée Gironde • Mérignac & Bordeaux</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Votre entreprise de référence pour le nettoyage et démoussage de toiture
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Que vous recherchiez un <strong className="text-white">démoussage toiture à Mérignac</strong>, un <strong className="text-white">démoussage toiture à Bordeaux</strong> ou une <strong className="text-white">entreprise de nettoyage toiture qualifiée</strong> avec un <strong className="text-white">devis toiture gratuit sous 48h</strong>, NOVA CB applique un protocole basse pression respectueux de l’étanchéité de vos tuiles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1: Démoussage toiture Mérignac */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 flex flex-col justify-between transition-all group shadow-lg">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    Démoussage toiture Mérignac
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Diagnostic gratuit à Mérignac (33700) : élimination douce des mousses végétales, lichens incrustés et dépôts d’arbres sur tuiles romanes, canal ou béton sans haute pression destructrice.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => onOpenQuote('Démoussage Toiture Mérignac')}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-sky-500 text-sky-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Devis Mérignac 48h</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 2: Démoussage toiture Bordeaux */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 flex flex-col justify-between transition-all group shadow-lg">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Home className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    Démoussage toiture Bordeaux
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Intervention soignée à Bordeaux Métropole : assainissement des toits urbains, échoppes bordelaises, tuiles anciennes et zinc avec traitement fongicide rémanent longue durée.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => onOpenQuote('Démoussage Toiture Bordeaux')}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-sky-500 text-sky-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Devis Bordeaux 48h</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 3: Nettoyage toiture Mérignac devis */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 flex flex-col justify-between transition-all group shadow-lg">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <BadgePercent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    Nettoyage toiture Mérignac devis
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Obtenez votre devis nettoyage toiture sous 48h chrono : tarif transparent au m² (dès 10€/m²), déplacement et diagnostic toiture offerts sans aucun engagement.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => onOpenQuote('Devis Nettoyage Toiture Mérignac')}
                    className="w-full py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-sky-500/20"
                  >
                    <span>Obtenir mon devis en 48h</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 4: Entreprise nettoyage toiture Bordeaux */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 flex flex-col justify-between transition-all group shadow-lg">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    Entreprise nettoyage toiture Bordeaux
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Société artisanale locale NOVA CB : assurance décennale & RC Pro, matériel basse pression professionnel, produits certifiés sans javel respectueux de l’environnement.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <a
                    href="tel:0624685217"
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-sky-500/40 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-sky-400" />
                    <span>06 24 68 52 17</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section : Supports et Matériaux Traités */}
      <section className="py-12 sm:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
              Polyvalence & Adaptabilité
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Surfaces et supports pris en charge
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Chaque revêtement obéit à des propriétés physiques uniques. Nous ajustons la buse, la pression et les solutions nettoyantes pour chaque matériau.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {silo.supports.map((support, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800/90 hover:border-sky-500/40 transition-all flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  {support}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section : Méthode d'intervention étape par étape */}
      <section className="py-12 sm:py-16 border-b border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
              Rigueur Artisanale
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Notre protocole d'intervention en 4 étapes
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              De l’inspection initiale jusqu’au contrôle de finition, rien n’est laissé au hasard.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {silo.protocol.map((step) => (
              <div 
                key={step.step}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 text-white font-black text-base flex items-center justify-center mb-4 shadow-md shadow-sky-500/30">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section : Facteurs influençant le prix & Devis transparent */}
      <section className="py-12 sm:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="text-sky-400 text-xs font-bold uppercase tracking-wider">
                Transparence & Estimation
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Comment est calculé le prix d’un nettoyage ?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Chez <strong className="text-sky-400 font-extrabold">NOVA CB</strong>, nous croyons à la transparence tarifaire. Le montant de votre devis dépend de critères objectifs et techniques :
              </p>

              <ul className="space-y-2.5 pt-2">
                {silo.pricingFactors.map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/30 text-xs text-sky-200 mt-4 leading-relaxed">
                <span className="font-extrabold text-white block mb-1">Repère d’estimation :</span>
                {silo.pricingGuide}
              </div>
            </div>

            {/* Box CTA Devis */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl text-center space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-sky-500/30">
                <BadgePercent className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white">
                  Obtenez votre estimation gratuite
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Sans engagement • Réponse sous 48h ouvrées
                </p>
              </div>

              <div className="space-y-2 text-left text-xs text-slate-300 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-sky-400" />
                  <span>Visite technique préalable gratuite</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-sky-400" />
                  <span>Prix ferme et définitif sans surprise</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-sky-400" />
                  <span>Artisan assuré et certifié en Gironde</span>
                </div>
              </div>

              <button
                onClick={() => onOpenQuote(silo.shortTitle)}
                className="w-full py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-sm shadow-xl shadow-sky-500/30 transition-all cursor-pointer"
              >
                Demander mon devis en 2 minutes
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Section FAQ SEO Spécifique */}
      <section className="py-12 sm:py-16 border-b border-slate-800 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
              Questions Fréquentes
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              FAQ : Tout savoir sur {silo.shortTitle.toLowerCase()}
            </h2>
          </div>

          <div className="space-y-3">
            {silo.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white hover:text-sky-300 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-sky-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Maillage Interne : Silos Complémentaires & Villes */}
      <section className="py-12 sm:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Silos Liés */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-sky-400" />
                <span>Prestations complémentaires recommandées</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {silo.relatedSilos.map((rel) => (
                  <button
                    key={rel.slug}
                    onClick={() => onNavigateToSilo(rel.slug)}
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-left text-xs font-semibold text-slate-200 hover:text-white border border-slate-700/60 hover:border-sky-500/40 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span>{rel.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            {/* Communes Liées */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>Intervention dans votre commune en Gironde</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {['merignac', 'bordeaux', 'pessac', 'talence', 'le-bouscat', 'bruges'].map((citySlug) => (
                  <button
                    key={citySlug}
                    onClick={() => onNavigateToCity(citySlug)}
                    className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-center font-semibold text-slate-300 hover:text-white border border-slate-700/60 hover:border-sky-500/40 capitalize transition-all cursor-pointer"
                  >
                    {citySlug.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final Conversion CTA Strip */}
      <section className="py-12 bg-gradient-to-r from-sky-900/60 via-slate-900 to-sky-950/70 border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {silo.ctaHeading}
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Contactez votre artisan local <strong className="text-white font-bold">NOVA CB</strong> au 06 24 68 52 17 ou faites votre demande en ligne pour recevoir un devis gratuit sous 48h.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenQuote(silo.shortTitle)}
              className="px-8 py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-sky-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Demander mon devis gratuit
            </button>
            <a
              href="tel:0624685217"
              className="px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold text-sm flex items-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>Appel direct : 06 24 68 52 17</span>
            </a>
          </div>
        </div>
      </section>

    </article>
  );
};
