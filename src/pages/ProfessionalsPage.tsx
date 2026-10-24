import React from 'react';
import { 
  Building2, 
  Wrench, 
  Truck, 
  Layers, 
  Trophy, 
  Trash2, 
  Trees, 
  Car, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight, 
  Home, 
  ChevronRight, 
  Phone, 
  Mail, 
  Sparkles,
  ClipboardCheck,
  Info
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';

interface ProfessionalsPageProps {
  onOpenQuote: (serviceName?: string) => void;
  onNavigateHome: () => void;
}

interface ProfessionalService {
  id: number;
  title: string;
  badge: string;
  icon: React.ElementType;
  description: string;
  scopeList: string[];
  technicalCondition: string;
  exclusions?: string;
  waterDrainCondition?: string;
  image?: string;
}

export const ProfessionalsPage: React.FC<ProfessionalsPageProps> = ({
  onOpenQuote,
  onNavigateHome,
}) => {
  const professionalServices: ProfessionalService[] = [
    {
      id: 1,
      title: "Nettoyage extérieur d'engins et accessoires de chantier",
      badge: "Engins & Équipements",
      icon: Wrench,
      description: "Nous proposons le nettoyage extérieur d'engins et d'accessoires de chantier afin de contribuer à leur entretien et à la propreté des équipements.",
      scopeList: [
        "Nettoyage des surfaces extérieures accessibles.",
        "Élimination des salissures compatibles avec les méthodes utilisées.",
        "Nettoyage de certains accessoires et équipements de chantier."
      ],
      technicalCondition: "Chaque intervention est étudiée en fonction du matériel, de son état et des contraintes techniques."
    },
    {
      id: 2,
      title: "Nettoyage extérieur d'équipements et remorques de paysagistes",
      badge: "Espaces Verts & Paysagistes",
      icon: Trees,
      description: "Une solution complémentaire pour les paysagistes et les entreprises d'espaces verts souhaitant maintenir leurs équipements propres.",
      scopeList: [
        "Nettoyage extérieur de remorques.",
        "Nettoyage de caissons et de surfaces extérieures accessibles.",
        "Nettoyage d'équipements compatibles avec les méthodes employées.",
        "Entretien extérieur après des activités générant des salissures."
      ],
      technicalCondition: "Les modalités d'intervention sont adaptées au type d'équipement et à son état."
    },
    {
      id: 3,
      title: "Nettoyage de sols, cours, accès et dalles extérieures",
      badge: "Surfaces & Espaces Extérieurs",
      icon: Layers,
      description: "Nous accompagnons les professionnels dans l'entretien de leurs surfaces extérieures afin de conserver des espaces propres et accueillants.",
      scopeList: [
        "Nettoyage de cours et de cours de service.",
        "Nettoyage de dalles et de sols extérieurs.",
        "Nettoyage d'accès et de cheminements.",
        "Traitement des salissures et dépôts compatibles avec les supports."
      ],
      technicalCondition: "La méthode est définie selon le matériau, l'état de la surface et les contraintes d'évacuation des eaux.",
      image: "/src/assets/images/patio_rotary_cleaner_stone.jpg"
    },
    {
      id: 4,
      title: "Nettoyage de courts extérieurs et abords sportifs",
      badge: "Équipements Sportifs",
      icon: Trophy,
      description: "NOVA CB étudie les besoins de nettoyage des courts de tennis extérieurs et des abords sportifs, en tenant compte des caractéristiques des revêtements.",
      scopeList: [
        "Nettoyage de courts extérieurs compatibles avec les techniques retenues.",
        "Entretien des abords et des cheminements.",
        "Nettoyage des surfaces périphériques.",
        "Étude des besoins d'entretien ponctuel ou programmé."
      ],
      technicalCondition: "Chaque revêtement nécessite une évaluation préalable. Les méthodes et produits sont sélectionnés selon leur compatibilité avec la surface sportive."
    },
    {
      id: 5,
      title: "Nettoyage extérieur de remorques et plateaux",
      badge: "Remorques & Plateaux",
      icon: Truck,
      description: "Nous proposons des prestations de nettoyage extérieur de remorques et de plateaux utilisés dans le cadre d'activités professionnelles.",
      scopeList: [
        "Nettoyage des surfaces extérieures accessibles.",
        "Nettoyage des plateaux et parties compatibles avec les méthodes retenues.",
        "Élimination des salissures courantes.",
        "Entretien extérieur adapté aux matériaux."
      ],
      technicalCondition: "La prestation ne comprend pas automatiquement le nettoyage mécanique, la maintenance, la décontamination ou les réparations des équipements."
    },
    {
      id: 6,
      title: "Nettoyage adapté de façades et murets professionnels",
      badge: "Bâtiments & Murs",
      icon: Building2,
      description: "Nous accompagnons les entreprises, gestionnaires immobiliers et professionnels dans l'entretien des façades et murets de leurs bâtiments et sites.",
      scopeList: [
        "Nettoyage de façades.",
        "Nettoyage de murets.",
        "Entretien des surfaces extérieures maçonnées.",
        "Étude des besoins de traitement complémentaire, lorsque cela est pertinent."
      ],
      technicalCondition: "La technique utilisée dépend du support, de son état et du type de salissures. Un diagnostic préalable permet de déterminer la méthode adaptée.",
      image: "/src/assets/images/artisan_facade_clean_1789483624059.jpg"
    },
    {
      id: 7,
      title: "Nettoyage des sols et abords de zones de stockage des déchets",
      badge: "Zones Déchets & Locaux Techniques",
      icon: Trash2,
      description: "NOVA CB étudie les besoins de nettoyage des sols et des abords de certaines zones de stockage des déchets sur les sites professionnels.",
      scopeList: [
        "Nettoyage de sols extérieurs.",
        "Nettoyage des abords des zones de stockage.",
        "Élimination des salissures compatibles avec les méthodes utilisées.",
        "Entretien des surfaces minérales accessibles."
      ],
      technicalCondition: "Avant toute intervention, la nature des déchets et des salissures doit être vérifiée.",
      exclusions: "Les opérations impliquant des déchets dangereux, des matières biologiques à risque, des produits chimiques non identifiés ou une contamination particulière sont exclues tant que les compétences, équipements et autorisations nécessaires n'ont pas été vérifiés.",
      waterDrainCondition: "Les conditions de collecte et d'évacuation des eaux de nettoyage doivent également être évaluées."
    },
    {
      id: 8,
      title: "Nettoyage extérieur de véhicules utilitaires sur site",
      badge: "Flottes & Utilitaires sur site",
      icon: Car,
      description: "Nous proposons aux professionnels d'étudier des interventions de nettoyage extérieur de véhicules utilitaires directement sur leur site, sous réserve de la faisabilité technique et des conditions d'intervention.",
      scopeList: [
        "Nettoyage extérieur de véhicules utilitaires.",
        "Nettoyage des surfaces extérieures accessibles.",
        "Nettoyage de certains éléments de carrosserie compatibles avec la méthode retenue.",
        "Interventions ponctuelles ou regroupées sur un même site."
      ],
      technicalCondition: "La prestation concerne exclusivement les opérations compatibles avec les équipements disponibles. Le nettoyage intérieur, le lavage spécialisé et les opérations de décontamination ne sont pas inclus par défaut.",
      waterDrainCondition: "Les conditions d'accès à l'eau, de gestion des eaux de lavage et de protection de l'environnement doivent être vérifiées avant l'intervention."
    }
  ];

  const breadcrumbs = [
    { name: 'Accueil', url: `${window.location.origin}/` },
    { name: 'Professionnels', url: `${window.location.origin}/professionnels` },
  ];

  return (
    <article className="min-h-screen bg-[#FAF8F5] text-stone-900">
      <SeoHead
        title="Prestations de Nettoyage pour les Professionnels | NOVA CB Mérignac & Gironde"
        description="Prestations de nettoyage extérieur pour professionnels : engins de chantier, remorques paysagistes, sols, cours, cours de tennis, façades d'entreprises et utilitaires sur site. Étude technique préalable en Gironde."
        canonicalUrl={`${window.location.origin}/professionnels`}
        breadcrumbs={breadcrumbs}
      />

      {/* Fil d'Ariane */}
      <nav aria-label="Fil d'Ariane" className="bg-stone-100 border-b border-stone-200 text-xs py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-stone-500">
          <button 
            onClick={onNavigateHome}
            className="flex items-center hover:text-emerald-700 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 mr-1 text-emerald-600" />
            <span>Accueil</span>
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-emerald-700 font-semibold truncate">Espace Professionnels</span>
        </div>
      </nav>

      {/* Header Héro Professionnels */}
      <section className="relative py-12 lg:py-16 overflow-hidden border-b border-emerald-950/70 bg-[#071912] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Solutions Entreprises, Artisans & Collectivités</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Nos prestations de nettoyage pour les professionnels
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              NOVA CB accompagne les artisans, paysagistes, gestionnaires immobiliers et entreprises dans l'entretien de leurs surfaces extérieures, abords techniques et équipements de travail. Chaque intervention fait l'objet d'une analyse de faisabilité et d'une méthode adaptée aux supports.
            </p>
          </div>

          {/* Points clés d'engagement pro */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 max-w-4xl">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#092218] border border-emerald-900/60 text-xs text-emerald-100">
              <ClipboardCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Étude de faisabilité & diagnostic préalable</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#092218] border border-emerald-900/60 text-xs text-emerald-100">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Respect des supports & contraintes techniques</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#092218] border border-emerald-900/60 text-xs text-emerald-100">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Interventions en Gironde & Bordeaux Métropole</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section des 8 Cartes de Prestations Professionnelles */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
            Catalogue d'interventions professionnelles
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Des interventions ciblées selon vos équipements et surfaces
          </h2>
          <p className="text-sm text-stone-600">
            Découvrez nos solutions adaptées aux contraintes des professionnels du bâtiment, des espaces verts, du sport et du tertiaire.
          </p>
        </div>

        {/* Grille des cartes professionnelles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {professionalServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={`pro-service-${service.id}`}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
              >
                {/* Image optionnelle si disponible et pertinente */}
                {service.image && (
                  <div className="h-48 sm:h-56 w-full relative overflow-hidden bg-stone-900">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700 text-white text-[11px] font-black uppercase tracking-wider shadow">
                        {service.badge}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-8 flex-1 flex flex-col space-y-6">
                  {/* Titre et Badge si pas d'image */}
                  <div>
                    {!service.image && (
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                          {service.badge}
                        </span>
                        <span className="text-xs font-bold text-stone-400">
                          Prestation #{service.id}
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-stone-900 tracking-tight leading-snug">
                        {service.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Prestations envisageables */}
                  <div className="space-y-3 pt-2 border-t border-stone-100 flex-1">
                    <h4 className="text-xs font-black uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Prestations envisageables :</span>
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                      {service.scopeList.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Modalités & conditions techniques */}
                  <div className="space-y-2 pt-3 border-t border-stone-100 text-xs text-stone-600">
                    <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-stone-800">
                        <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Modalités d'intervention :</span>
                      </div>
                      <p className="leading-relaxed text-stone-600">
                        {service.technicalCondition}
                      </p>
                    </div>

                    {/* Mentions d'exclusions spécifiques (déchets dangereux, etc.) */}
                    {service.exclusions && (
                      <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-amber-900 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span>Périmètre & exclusions :</span>
                        </div>
                        <p className="leading-relaxed text-[11px] text-amber-800">
                          {service.exclusions}
                        </p>
                      </div>
                    )}

                    {/* Évacuation des eaux */}
                    {service.waterDrainCondition && (
                      <p className="text-[11px] text-stone-500 italic">
                        {service.waterDrainCondition}
                      </p>
                    )}
                  </div>

                  {/* Bouton d'action pour la prestation */}
                  <div className="pt-2">
                    <button
                      onClick={() => onOpenQuote(service.title)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#091F17] hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      <span>Étudier ce besoin pour mon entreprise</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION FINALE : UNE PRESTATION ADAPTÉE À VOTRE ACTIVITÉ */}
        <section 
          id="besoin-specifique-pro"
          className="p-8 sm:p-12 rounded-3xl bg-[#071912] text-white border border-emerald-950/80 shadow-2xl space-y-8 relative overflow-hidden"
        >
          {/* Accent visuel d'arrière plan */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Étude & Devis sur Mesure</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Un besoin spécifique sur votre site professionnel ?
            </h2>

            <div className="space-y-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-white">
                Vous êtes artisan, paysagiste, gestionnaire de site, responsable d'équipements sportifs ou dirigeant d'entreprise ?
              </p>
              <p>
                Présentez-nous votre besoin : NOVA CB étudiera les caractéristiques de votre site, le type de surface ou d'équipement concerné et les conditions d'intervention afin de déterminer si une prestation adaptée peut vous être proposée.
              </p>
              <p>
                Nous privilégions une approche pragmatique, avec une étude préalable et une proposition adaptée à chaque demande.
              </p>
            </div>
          </div>

          {/* Boutons d'action principaux */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 relative z-10">
            <button
              id="btn-presenter-besoin-pro"
              onClick={() => onOpenQuote('Besoins professionnels')}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm transition-all shadow-xl shadow-emerald-600/30 cursor-pointer border border-emerald-400/40 transform hover:-translate-y-0.5"
            >
              <span>Présenter mon besoin professionnel</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:0624685217"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#0d2a1f] hover:bg-[#12382a] text-white font-bold text-sm transition-all border border-emerald-800 hover:border-emerald-500"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>06 24 68 52 17</span>
            </a>

            <a
              href="mailto:nova.entretien33@outlook.fr"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#0d2a1f] hover:bg-[#12382a] text-white font-bold text-sm transition-all border border-emerald-800 hover:border-emerald-500"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>nova.entretien33@outlook.fr</span>
            </a>
          </div>
        </section>
      </section>
    </article>
  );
};
