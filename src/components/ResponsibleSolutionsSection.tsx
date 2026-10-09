import React from 'react';
import { Leaf, Award, ShieldCheck, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { PRODUCTS_CATALOG, ProductItem } from '../data/productsCatalog';

interface ResponsibleSolutionsSectionProps {
  categoryFilter?: 'Toitures' | 'Façades & Murs' | 'Terrasses' | 'Traitements & Spécifiques' | 'all';
  onOpenQuote?: () => void;
  compact?: boolean;
}

export const ResponsibleSolutionsSection: React.FC<ResponsibleSolutionsSectionProps> = ({
  categoryFilter = 'all',
  onOpenQuote,
  compact = false,
}) => {
  const filteredProducts = categoryFilter === 'all' 
    ? PRODUCTS_CATALOG 
    : PRODUCTS_CATALOG.filter(p => p.category === categoryFilter);

  return (
    <section className="my-10 rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-xl">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="relative z-10 space-y-6">
        {/* Header badge & title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Leaf className="w-3.5 h-3.5" />
              <span>Solutions de Nettoyage Éco-responsables</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Des solutions de nettoyage adaptées et éco-responsables
            </h3>
          </div>

          {onOpenQuote && (
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold transition-all shadow-md shadow-emerald-500/20 cursor-pointer shrink-0"
            >
              <span>Demander conseil support</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Framing text */}
        <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-2">
          <p>
            Pour nos prestations de nettoyage et d’entretien extérieur en Gironde, <strong>Nova Entretien</strong> privilégie, lorsque cela est techniquement adapté au support, des solutions à base d’ingrédients d’origine naturelle et des produits bénéficiant de certifications environnementales reconnues.
          </p>
          <p className="text-slate-400 text-xs sm:text-sm">
            Notre objectif : associer efficacité du traitement, respect du support et réduction de l’impact environnemental lorsque les conditions du chantier le permettent.
          </p>
        </div>

        {/* Products showcase grid */}
        {!compact && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredProducts.map((prod) => (
              <div 
                key={prod.id}
                className="rounded-2xl bg-slate-950/80 border border-slate-800/90 p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-colors"
              >
                <div className="space-y-3">
                  {/* Badges row */}
                  <div className="flex flex-wrap gap-1.5">
                    {prod.isEcocert && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold uppercase">
                        <Award className="w-3 h-3 text-emerald-400" />
                        Certifié ECOCERT
                      </span>
                    )}
                    {prod.isNaturalOrigin && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/40 text-[10px] font-bold">
                        <Leaf className="w-3 h-3 text-sky-400" />
                        Origine Naturelle
                      </span>
                    )}
                    {prod.isMadeInFrance && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-medium">
                        🇫🇷 Formulé en France
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      {prod.category} • Solution Éco-responsable
                    </div>
                    <h4 className="text-sm font-bold text-white mt-0.5">
                      {prod.publicTitle || prod.name}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="pt-2 border-t border-slate-800/60 space-y-1.5 text-xs">
                    <div className="text-slate-400">
                      <strong className="text-slate-300">Supports compatibles :</strong> {prod.supports.slice(0, 3).join(', ')}...
                    </div>
                    <div className="text-slate-400">
                      <strong className="text-slate-300">Application :</strong> {prod.applicationMethod}
                    </div>
                    <div className="text-slate-400">
                      <strong className="text-slate-300">Action :</strong> {prod.actionTime}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 italic">
                    Utilisé selon compatibilité chantier
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sélection technique qualifiée</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Responsible Method Banner */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Note de transparence :</strong> Les solutions de nettoyage sont sélectionnées en fonction de la nature et de la sensibilité du support. La mention ECOCERT s’applique exclusivement aux références formellement certifiées.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
