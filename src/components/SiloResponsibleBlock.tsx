import React from 'react';
import { 
  Leaf, 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PRODUCTS_CATALOG, ProductItem } from '../data/productsCatalog';

interface SiloResponsibleBlockProps {
  siloCategory: string; // ex: 'Toitures', 'Façades', 'Terrasses', 'Traitements'
  siloSlug: string;
  onOpenQuote: (serviceName?: string) => void;
}

export const SiloResponsibleBlock: React.FC<SiloResponsibleBlockProps> = ({
  siloCategory,
  siloSlug,
  onOpenQuote,
}) => {
  // Determine products matching this silo
  const isRoof = siloCategory === 'Toitures' || siloSlug.includes('toiture');
  const isFacade = siloCategory === 'Façades' || siloCategory === 'surfaces' || siloSlug.includes('facade') || siloSlug.includes('mur');
  const isTerrace = siloCategory === 'Terrasses' || siloSlug.includes('terrasse');

  const relevantProducts = PRODUCTS_CATALOG.filter((p) => {
    if (isRoof) return p.category === 'Toitures' || p.category === 'Traitements & Spécifiques';
    if (isFacade) return p.category === 'Façades & Murs';
    if (isTerrace) return p.category === 'Terrasses';
    return true;
  });

  return (
    <section className="py-14 sm:py-20 border-b border-stone-200/80 bg-[#F5F2EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Block 2: NOS SOLUTIONS DE NETTOYAGE RESPONSABLES */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>Nos Solutions de Nettoyage Responsables</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                Un nettoyage efficace, avec des solutions plus responsables pour vos extérieurs
              </h2>
            </div>
            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-colors shrink-0 cursor-pointer shadow-md shadow-emerald-600/20"
            >
              <span>Demander mon devis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            Pour nos prestations de nettoyage et d’entretien extérieur, <strong>Nova Entretien</strong> privilégie, lorsque cela est techniquement adapté au support, des solutions à base d’ingrédients d’origine naturelle et des produits bénéficiant de certifications environnementales reconnues.
          </p>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Notre objectif : associer efficacité du traitement, respect du support et réduction de l’impact environnemental lorsque les conditions du chantier le permettent.
          </p>
        </div>

        {/* Specialized Encart 3: TOITURE — SOLUTION ÉCO-RESPONSABLE PRIVILÉGIÉE */}
        {isRoof && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-300 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  Traitement & Démoussage Toiture
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                  SOLUTIONS DE TRAITEMENT ÉCO-RESPONSABLES PRIVILÉGIÉES
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-extrabold uppercase">
                Référence adaptée aux couvertures
              </span>
            </div>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              Pour le nettoyage et le démoussage des toitures, nous privilégions lorsque cela est adapté au support des solutions de traitement à base d'ingrédients d'origine naturelle et, selon la référence utilisée, des produits bénéficiant d'une certification environnementale reconnue.
            </p>

            {/* Officially verified features checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-300 flex items-start gap-2.5">
                <Award className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-950 block font-bold">Produits certifiés ECOCERT</strong>
                  <span className="text-stone-700 text-xs font-medium">Selon la référence toiture certifiée</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-300 flex items-start gap-2.5">
                <Leaf className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-950 block font-bold">Ingrédients d’origine naturelle</strong>
                  <span className="text-stone-700 text-xs font-medium">Formule aqueuse concentrée</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-950 block font-bold">Action préventive & curative</strong>
                  <span className="text-stone-700 text-xs font-medium">Dépôts verts, mousses et lichens</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-950 block font-bold">Sans chlore, ni javel, ni quats</strong>
                  <span className="text-stone-700 text-xs font-medium">Sans acides agressifs</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-stone-200 text-xs sm:text-sm">
              <div className="text-stone-800">
                <strong className="text-stone-950 font-bold">Application :</strong> Pulvérisation basse pression sans jet direct destructeur pour préserver l'étanchéité des tuiles.
              </div>
              <div className="inline-flex items-center gap-1.5 text-emerald-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Formule professionnelle adaptée au matériau</span>
              </div>
            </div>
          </div>
        )}

        {/* Specialized Encart 4: FAÇADES ET MURS */}
        {isFacade && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  Façades, Murs & Enduits Extérieurs
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                  SOLUTIONS ADAPTÉES AUX FAÇADES ET MURS
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold">
                Basse pression & respect de l'enduit
              </span>
            </div>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              Pour les façades et murs extérieurs, Nova Entretien privilégie, lorsque cela est techniquement possible, des solutions de nettoyage et de traitement présentant des caractéristiques environnementales adaptées au chantier.
            </p>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong className="text-stone-900">Engagement technique :</strong> Produit sélectionné selon la porosité du support (enduit gratté, crépi, pierre calcaire) pour désincruster les traces rouges et pollutions sans altérer les teintes minérales.
              </span>
            </div>
          </div>
        )}

        {/* Specialized Encart 5: TERRASSES — SOLUTIONS ADAPTÉES AU SUPPORT */}
        {isTerrace && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 space-y-6 shadow-sm">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                Terrasses & Revêtements de Sol
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                NETTOYAGE DE TERRASSE — SOLUTIONS ADAPTÉES AU SUPPORT
              </h3>
            </div>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              Pour le nettoyage des terrasses, nous sélectionnons les produits en fonction de la nature du support : bois, pierre, béton, carrelage ou pavés. Lorsque cela est techniquement adapté, nous privilégions des solutions éco-responsables et à base d'ingrédients d'origine naturelle.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-300 space-y-1">
                <strong className="text-stone-950 block font-bold">Terrasse bois naturel</strong>
                <span className="text-stone-800 leading-relaxed font-normal">Dégrisant formulé à base végétale, action dans le fil du bois sans peluchage.</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-300 space-y-1">
                <strong className="text-stone-950 block font-bold">Terrasse pierre naturelle</strong>
                <span className="text-stone-800 leading-relaxed font-normal">Nettoyant minéral neutre sans acides, respectueux du travertin et calcaires.</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-300 space-y-1">
                <strong className="text-stone-950 block font-bold">Terrasse béton désactivé</strong>
                <span className="text-stone-800 leading-relaxed font-normal">Dégraissant actif doux pour désincruster les cavités sans déchausser les gravillons.</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-300 space-y-1">
                <strong className="text-stone-950 block font-bold">Terrasse carrelée & grès</strong>
                <span className="text-stone-800 leading-relaxed font-normal">Nettoyage basse pression et brossage ciblé pour préserver les joints de mortier.</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-300 space-y-1">
                <strong className="text-stone-950 block font-bold">Terrasse pavés autobloquants</strong>
                <span className="text-stone-800 leading-relaxed font-normal">Cloche rotative carénée régulée pour éliminer les voiles sans vider les joints de sable.</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-300 space-y-1">
                <strong className="text-stone-950 block font-bold">Autres supports extérieurs</strong>
                <span className="text-stone-800 leading-relaxed font-normal">Analyse préalable sur mesure avant toute application mécanique ou de solution active.</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                « Le produit et la méthode de nettoyage sont sélectionnés selon la nature, l'état et la sensibilité du support. »
              </span>
            </div>
          </div>
        )}

        {/* Block 8: UNE MÉTHODE ADAPTÉE À CHAQUE SUPPORT (Diagnostic -> Choix -> Application -> Temps -> Nettoyage -> Contrôle) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 space-y-6 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Une méthode adaptée à chaque support</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              Nova Entretien ne choisit pas uniquement un produit, mais une méthode adaptée au chantier
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Chaque étape garantit un assainissement optimal en préservant le matériau dans le temps.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            {[
              { step: '1', name: 'Diagnostic', desc: 'Analyse du support et état d’encrassement' },
              { step: '2', name: 'Choix de la solution', desc: 'Sélection éco-responsable compatible' },
              { step: '3', name: 'Application', desc: 'Basse pression ou cloche carénée' },
              { step: '4', name: 'Temps d’action', desc: 'Action rémanente selon fiche technique' },
              { step: '5', name: 'Nettoyage / rinçage', desc: 'Rinçage soigné si nécessaire' },
              { step: '6', name: 'Contrôle final', desc: 'Vérification méticuleuse du rendu' },
            ].map((p) => (
              <div key={p.step} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center mx-auto shadow-sm">
                  {p.step}
                </div>
                <div className="text-xs font-bold text-stone-900">{p.name}</div>
                <div className="text-[11px] text-stone-600 leading-snug">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Block 9: ARGUMENT COMMERCIAL RENFORCÉ */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#071912] text-white border border-emerald-950/70 text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Vous souhaitez connaître la solution adaptée à votre toiture, façade ou terrasse ?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl mx-auto">
            Après analyse du support, <strong>Nova Entretien</strong> sélectionne la méthode et les produits adaptés à votre chantier.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/30 cursor-pointer"
            >
              <span>DEMANDER MON DEVIS GRATUIT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
