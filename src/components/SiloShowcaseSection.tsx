import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  TreePine, 
  Square, 
  Gem, 
  Building, 
  ShieldCheck, 
  CalendarClock,
  Home
} from 'lucide-react';
import { SERVICE_SILOS } from '../data/silosData';

interface SiloShowcaseSectionProps {
  onNavigateToSilo: (slug: string) => void;
  onOpenQuote: (serviceName?: string) => void;
}

export const SiloShowcaseSection: React.FC<SiloShowcaseSectionProps> = ({
  onNavigateToSilo,
  onOpenQuote,
}) => {
  const silosList = [
    {
      slug: 'nettoyage-terrasse',
      title: 'Nettoyage Terrasse par Cloche',
      desc: 'Cloche rotative carénée sans projection. Nettoyage homogène supprimant mousses et voile glissant.',
      icon: Layers,
      highlight: 'Cloche de surface',
      tag: 'Terrasses & Sols',
    },
    {
      slug: 'nettoyage-demoussage-toiture',
      title: 'Toiture à Basse Pression',
      desc: 'Nettoyage doux basse pression contre mousses, lichens et pollution urbaine, préservant l’étanchéité des tuiles.',
      icon: Home,
      highlight: 'Basse pression',
      tag: 'Toitures & Couverture',
    },
    {
      slug: 'nettoyage-mur-exterieur',
      title: 'Façades & Murs à Basse Pression',
      desc: 'Méthode douce softwash basse pression pour crépi et enduits sans aucun risque d’arrachement.',
      icon: Building,
      highlight: 'Basse pression',
      tag: 'Façades & Murs',
    },
    {
      slug: 'nettoyage-terrasse-bois',
      title: 'Terrasse Bois & Rénovation',
      desc: 'Nettoyage basse pression contrôlée pour ipé, teck, cumaru et pin sans fibrer le bois.',
      icon: TreePine,
      highlight: 'Protection fibre',
      tag: 'Bois Naturel',
    },
    {
      slug: 'nettoyage-terrasse-beton',
      title: 'Terrasse Béton & Dalles Gravillonnées',
      desc: 'Décrassage profond du béton désactivé et dalles de pavillon à la cloche rotative sans desceller.',
      icon: Square,
      highlight: 'Sans projection',
      tag: 'Béton & Pavés',
    },
    {
      slug: 'nettoyage-terrasse-pierre',
      title: 'Pierre Naturelle & Travertin',
      desc: 'Nettoyage délicat au pH neutre pour travertin, pierre calcaire bordelaise et ardoise.',
      icon: Gem,
      highlight: 'Soin minéral',
      tag: 'Pierres Nobles',
    },
    {
      slug: 'traitement-anti-mousse',
      title: 'Traitement Anti-Mousse Rémanent',
      desc: 'Formulations fongicides concentrées professionnelles sans javel pour stopper la récidive.',
      icon: ShieldCheck,
      highlight: 'Action 12-24 mois',
      tag: 'Traitements Pro',
    },
    {
      slug: 'entretien-terrasse',
      title: 'Entretien Régulier & Contrat Annuel',
      desc: 'Passage saisonnier programmé pour conserver vos aménagements propres toute l’année.',
      icon: CalendarClock,
      highlight: 'Sérénité totale',
      tag: 'Abonnement',
    },
  ];

  return (
    <section id="prestations-silos" className="py-14 sm:py-20 bg-[#0b1329] border-t border-sky-950/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Architecture Technique Spécialisée</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Nos pôles de compétences extérieurs
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Chaque matériau requiert un protocole rigoureux. Découvrez nos pages dédiées par support pour comprendre notre méthode et obtenir une estimation précise.
          </p>
        </div>

        {/* Silos Grid (8 Specialized Services) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {silosList.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.slug}
                className="rounded-3xl bg-[#0e1935] border border-sky-900/50 hover:border-sky-500/50 p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-sky-500/15 text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform border border-sky-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-950/60 text-sky-300 border border-sky-800/60">
                      {item.highlight}
                    </span>
                  </div>

                  <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wide mb-1">
                    {item.tag}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-sky-900/40 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onNavigateToSilo(item.slug)}
                    className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 group-hover:gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Voir la méthode</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenQuote(item.title)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-sky-900/50 hover:bg-sky-500 hover:text-white text-[11px] font-bold text-sky-200 transition-all cursor-pointer"
                  >
                    Devis
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-white font-bold text-sm sm:text-base">
              Vous avez un projet spécifique ou plusieurs surfaces à traiter en même temps ?
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Profitez d’une tarification globale dégressive pour l’ensemble de vos extérieurs.
            </div>
          </div>
          <button
            onClick={() => onOpenQuote('Devis Global')}
            className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            Faire estimer mon chantier
          </button>
        </div>

      </div>
    </section>
  );
};
