import React, { useState } from 'react';
import { 
  Leaf, 
  Award, 
  ExternalLink, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  ShieldCheck, 
  Home, 
  ChevronRight,
  ArrowRight,
  Droplets,
  Clock,
  Sparkles
} from 'lucide-react';
import { PRODUCTS_CATALOG, ProductItem } from '../data/productsCatalog';
import { SeoHead } from '../components/SeoHead';

interface ProductsSolutionsPageProps {
  onOpenQuote: (serviceName?: string) => void;
  onNavigateHome: () => void;
}

export const ProductsSolutionsPage: React.FC<ProductsSolutionsPageProps> = ({
  onOpenQuote,
  onNavigateHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCertification, setSelectedCertification] = useState<string>('all');

  const categories = ['all', 'Toitures', 'Façades & Murs', 'Terrasses', 'Traitements & Spécifiques'];

  const filteredProducts = PRODUCTS_CATALOG.filter((prod) => {
    const matchCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchCert = selectedCertification === 'all' 
      ? true 
      : selectedCertification === 'ecocert' 
      ? prod.isEcocert 
      : true;
    const matchSearch = 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.supports.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCategory && matchCert && matchSearch;
  });

  const breadcrumbs = [
    { name: 'Accueil', url: `${window.location.origin}/` },
    { name: 'Nos Produits & Solutions', url: `${window.location.origin}/nos-produits` },
  ];

  return (
    <article className="min-h-screen bg-[#FAF8F5] text-stone-900">
      <SeoHead
        title="Nos Solutions de Nettoyage Éco-responsables | NOVA CB"
        description="Découvrez les solutions de nettoyage extérieur privilégiées par NOVA CB : formules à base d'ingrédients d'origine naturelle et références certifiées ECOCERT selon le support."
        canonicalUrl={`${window.location.origin}/nos-produits`}
        breadcrumbs={breadcrumbs}
      />

      {/* Breadcrumb Bar */}
      <nav aria-label="Fil d'Ariane" className="bg-stone-100 border-b border-stone-200 text-xs py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-stone-500">
          <button 
            onClick={onNavigateHome}
            className="flex items-center hover:text-white transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 mr-1 text-emerald-600" />
            <span>Accueil</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-emerald-400 font-semibold truncate">Nos Solutions Éco-responsables</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative py-12 lg:py-16 overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase">
            <Leaf className="w-3.5 h-3.5" />
            <span>Solutions de Nettoyage Éco-responsables</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl">
            Des solutions de nettoyage adaptées et éco-responsables
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            Pour nos prestations de nettoyage et d’entretien extérieur en Gironde, <strong>Nova Entretien</strong> privilégie, lorsque cela est techniquement adapté au support, des solutions à base d’ingrédients d’origine naturelle et des produits bénéficiant de certifications environnementales reconnues.
          </p>

          {/* Ethics statement */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 max-w-3xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-white">Engagement de clarté technique :</strong>
              <p className="text-stone-500 leading-relaxed">
                Notre objectif est d’associer efficacité du traitement, respect du support et réduction de l’impact environnemental lorsque les conditions du chantier le permettent. Les produits sont sélectionnés en fonction de la compatibilité du support et de ses caractéristiques techniques. La mention ECOCERT s’applique uniquement aux références formellement certifiées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Products Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Filter controls */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm shadow-emerald-500/20'
                    : 'bg-slate-950 text-stone-500 hover:text-white border border-slate-800'
                }`}
              >
                {cat === 'all' ? 'Tous les produits' : cat}
              </button>
            ))}
          </div>

          {/* Search & Certification Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <select
              value={selectedCertification}
              onChange={(e) => setSelectedCertification(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">Toutes certifications</option>
              <option value="ecocert">Certifié ECOCERT uniquement</option>
            </select>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par matériau, nom..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-lg space-y-6"
            >
              <div className="space-y-4">
                {/* Header row with badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    {prod.category} • Solution Éco-responsable
                  </span>

                  <div className="flex flex-wrap gap-1.5">
                    {prod.isEcocert && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold uppercase">
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                        Certifié ECOCERT
                      </span>
                    )}
                    {prod.isNaturalOrigin && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-sky-500/40 text-[10px] font-bold">
                        <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                        Origine Naturelle
                      </span>
                    )}
                    {prod.isMadeInFrance && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-medium">
                        🇫🇷 Formulé en France
                      </span>
                    )}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {prod.publicTitle || prod.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {prod.description}
                </p>

                {/* Technical data table */}
                <div className="rounded-2xl bg-slate-950/70 border border-slate-800/80 p-4 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-800/60">
                    <span className="text-stone-500 font-medium">Supports compatibles :</span>
                    <span className="text-slate-200 font-semibold sm:text-right">{prod.supports.join(', ')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-stone-500 font-medium">Dilution :</span>
                    <span className="text-slate-200 font-semibold">{prod.dilution}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-stone-500 font-medium">Rendement indicatif :</span>
                    <span className="text-emerald-400 font-bold">{prod.yieldM2}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-stone-500 font-medium">Mode d'application :</span>
                    <span className="text-slate-200 font-semibold">{prod.applicationMethod}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-stone-500 font-medium">Temps d'action :</span>
                    <span className="text-emerald-700 font-semibold">{prod.actionTime}</span>
                  </div>
                  <div className="py-1">
                    <span className="text-stone-500 font-medium block mb-1">Précautions & Sécurité :</span>
                    <span className="text-slate-300 text-[11px] leading-relaxed block">{prod.precautions}</span>
                  </div>
                </div>
              </div>

              {/* Bottom CTAs */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-slate-500 text-[11px]">
                  Produit appliqué selon l'état et la sensibilité du support
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 text-emerald-400 font-semibold text-xs border border-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sélection qualifiée</span>
                  </span>
                  <button
                    onClick={() => onOpenQuote(prod.category)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    <span>Demander devis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 7-Step Method Banner */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Une méthode adaptée à chaque support</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Nova Entretien ne choisit pas uniquement un produit, mais une méthode complète
            </h3>
            <p className="text-xs sm:text-sm text-stone-500">
              L'efficacité du résultat repose sur le respect rigoureux de chaque étape technique du protocole d'intervention.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            {[
              { step: '1', title: 'Diagnostic', desc: 'Analyse de porosité et nature des salissures' },
              { step: '2', title: 'Choix de la solution', desc: 'Sélection éco-responsable adaptée' },
              { step: '3', title: 'Application', desc: 'Pulvérisation basse pression ou cloche' },
              { step: '4', title: 'Temps d’action', desc: 'Période active respectée sans surdosage' },
              { step: '5', title: 'Nettoyage', desc: 'Rinçage soigné à pression calibrée' },
              { step: '6', title: 'Contrôle final', desc: 'Vérification de l’intégrité du support' },
            ].map((st) => (
              <div key={st.step} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black flex items-center justify-center mx-auto border border-emerald-500/40">
                  {st.step}
                </div>
                <div className="text-xs font-bold text-white">{st.title}</div>
                <div className="text-[11px] text-stone-500 leading-tight">{st.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Global CTA Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-sky-950/40 border border-emerald-500/30 text-center space-y-4">
          <h3 className="text-2xl font-black text-white">
            Vous souhaitez connaître la solution adaptée à votre toiture, façade ou terrasse ?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Après analyse du support, <strong>Nova Entretien</strong> sélectionne la méthode et les produits adaptés à votre chantier. Devis gratuit sous 48h.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-xl shadow-emerald-500/30 cursor-pointer"
            >
              <span>DEMANDER MON DEVIS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};
