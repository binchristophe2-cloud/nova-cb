import React from 'react';
import { ShieldCheck, MapPin, Phone, ArrowRight, Sparkles } from 'lucide-react';
import aboutImg from '../assets/images/artisan_about_single_1789483316483.jpg';

interface AboutSectionProps {
  onOpenQuote: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuote }) => {
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
    <section id="a-propos" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>À propos de NOVA CB</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            L’art de rénover et protéger <span className="text-emerald-700">vos extérieurs</span>
          </h2>

          <p className="mt-5 text-stone-600 text-base sm:text-lg leading-relaxed">
            Implantée à <strong>Mérignac</strong>, <strong className="text-emerald-700 font-extrabold">NOVA CB</strong> est une entreprise spécialisée dans le nettoyage haute performance, la rénovation esthétique et l’entretien des surfaces extérieures, auprès des particuliers et des professionnels.
          </p>
        </div>

        {/* Story & Philosophy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Une approche technique & durable, loin des nettoyages destructeurs
            </h3>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Trop souvent, le nettoyage extérieur est assimilé à un passage brutal de nettoyeur haute pression à l’aveugle. Pourtant, une pression excessive éclate les fibres du bois, creuse les joints des pavés et fragilise la perméabilité des enduits de façade.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Chez <strong className="text-emerald-700 font-extrabold">NOVA CB</strong>, notre positionnement est clair : <em>« Des solutions de nettoyage adaptées et éco-responsables pour vos extérieurs. »</em> Chaque chantier débute par l’analyse minutieuse du matériau. Lorsque les conditions du chantier le permettent, nous privilégions des <strong className="text-stone-900">solutions à base d'ingrédients d'origine naturelle</strong> et des produits bénéficiant de certifications environnementales reconnues, notamment des produits certifiés ECOCERT lorsque la référence adaptée au support en bénéficie.
            </p>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>Notre mission : associer efficacité du traitement, respect du support et réduction de l'impact environnemental lorsque les conditions du chantier le permettent.</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200">
              <img
                src={aboutImg}
                alt="Artisan NOVA CB avec cloche professionnelle de nettoyage sur terrasse à Mérignac"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
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
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              Notre protocole d’intervention en 4 étapes
            </h3>
            <p className="text-stone-500 text-sm mt-2">
              Une méthodologie éprouvée pour un résultat net, sans projection et sans risque.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between group"
              >
                <div>
                  <div className="text-3xl font-black text-emerald-600 mb-4">
                    {step.num}
                  </div>
                  <h4 className="text-lg font-bold text-stone-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="w-8 h-1 bg-emerald-500 rounded-full mt-6 group-hover:w-16 transition-all"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Anchor / Commitments */}
        <div className="bg-[#071912] text-white rounded-3xl p-8 sm:p-12 border border-emerald-950/60 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a261b] text-emerald-400 text-xs font-bold border border-emerald-800/60">
                <MapPin className="w-3.5 h-3.5" />
                <span>33 avenue Léon Blum, 33700 Mérignac</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Une entreprise locale à votre écoute en Gironde
              </h3>
              <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
                Basés à Mérignac, nous intervenons avec réactivité pour les particuliers (villas, pavillons, copropriétés) et pour les professionnels (commerces, terrasses de restaurants, bureaux, bâtiments tertiaires).
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={onOpenQuote}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-emerald-600/30 text-center text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Demander mon diagnostic gratuit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:0624685217"
                className="bg-[#0a261b] hover:bg-[#0e3324] text-white font-bold py-3.5 px-6 rounded-full border-2 border-emerald-500/50 hover:border-emerald-400 text-center text-sm transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-extrabold">06 24 68 52 17</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
