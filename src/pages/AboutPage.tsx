import React from 'react';
import { ShieldCheck, Target, Droplets, CheckCircle, Award, MapPin, Phone, ArrowRight, Sparkles, Layers } from 'lucide-react';
import actionImg from '../assets/images/artisan_bento_smile_1789476181824.jpg';
import woodImg from '../assets/images/wood_terrace_cleaning_1788450485682.jpg';
import aboutImg from '../assets/images/artisan_about_single_1789483316483.jpg';
import { PageType } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenQuote }) => {
  const steps = [
    {
      num: '01',
      title: 'Diagnostic précis du support',
      desc: 'Identification de la nature du matériau (essence de bois, porosité de la pierre, type d’enduit ou de tuile) et du degré d’encrassement végétal ou minéral.',
    },
    {
      num: '02',
      title: 'Choix de la méthode calibrée',
      desc: 'Sélection d’une pression d’eau adaptée, utilisation de cloches rotatives plates pour sols, ou pulvérisation basse pression Softwash pour préserver les enduits.',
    },
    {
      num: '03',
      title: 'Produits professionnels ciblés',
      desc: 'Application de dégraissants, dégriseurs ou nettoyants actifs respectant les normes environnementales et sans chlore corrosif pour la végétation environnante.',
    },
    {
      num: '04',
      title: 'Traitement protecteur & préventif',
      desc: 'Pulvérisation d’un traitement anti-mousse / fongicide rémanent ou saturateur hydrofuge pour retarder durablement le retour des salissures.',
    },
  ];

  return (
    <div className="py-10 sm:py-16 bg-[#FAF8F5] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-600/15 border border-sky-400/30 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>À propos de NOVA CB</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            L’art de rénover et protéger <span className="text-emerald-600">vos extérieurs</span>
          </h1>

          <p className="mt-5 text-slate-300 text-base sm:text-lg leading-relaxed">
            Implantée à <strong>Mérignac</strong>, <strong className="text-emerald-600 font-extrabold">NOVA CB</strong> est une entreprise spécialisée dans le nettoyage haute performance, la rénovation esthétique et l’entretien des surfaces extérieures, auprès des particuliers et des professionnels.
          </p>
        </div>

        {/* Story & Philosophy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Une approche technique & durable, loin des nettoyages destructeurs
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Trop souvent, le nettoyage extérieur est assimilé à un passage brutal de nettoyeur haute pression à l’aveugle. Pourtant, une pression excessive éclate les fibres du bois, creuse les joints des pavés et fragilise la perméabilité des enduits de façade.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Chez <strong className="text-emerald-600 font-extrabold">NOVA CB</strong>, nous avons fait le choix d’une méthode responsable et experte : chaque chantier débute par l’analyse du support. Nous appliquons un <strong className="text-white">nettoyage à basse pression douce</strong> pour les toitures et façades afin de préserver l'étanchéité des tuiles et l'intégrité des enduits, et une <strong className="text-white">cloche de surface rotative sans projection</strong> pour décrasser vos terrasses en profondeur et de manière parfaitement homogène.
            </p>

            <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/30 text-sky-200 text-xs sm:text-sm font-medium flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>Notre mission : remettre en état toitures, terrasses et façades, tout en prolongeant la durée de vie de votre patrimoine extérieur.</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-sky-900/50">
              <img
                src={aboutImg}
                alt="Artisan NOVA CB avec cloche professionnelle de nettoyage sur terrasse à Mérignac"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                  Mérignac & Région Bordelaise
                </div>
                <div className="text-lg font-bold">
                  Tarification transparente et adaptée à chaque surface
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Steps Process */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Notre protocole d’intervention en 4 étapes
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Une méthodologie éprouvée pour un résultat net, sans projection et sans risque.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-[#0e1935] p-6 sm:p-7 rounded-3xl border border-sky-900/50 hover:border-sky-500/50 shadow-xl transition-all relative flex flex-col justify-between group"
              >
                <div>
                  <div className="text-3xl font-black text-emerald-600 mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="w-8 h-1 bg-sky-400 rounded-full mt-6 group-hover:w-16 transition-all"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Anchor / Commitments */}
        <div className="bg-[#0e1935] text-white rounded-3xl p-8 sm:p-12 border border-sky-900/50 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-emerald-600 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5" />
                <span>33 avenue Léon Blum, 33700 Mérignac</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Une entreprise locale à votre écoute en Gironde
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Basés à Mérignac, nous intervenons avec réactivité pour les particuliers (villas, pavillons, copropriétés) et pour les professionnels (commerces, terrasses de restaurants, bureaux, bâtiments tertiaires).
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={onOpenQuote}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-sky-500/30 text-center text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Demander un diagnostic gratuit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:0624685217"
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3.5 px-6 rounded-full border border-slate-700 text-center text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>06 24 68 52 17</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
