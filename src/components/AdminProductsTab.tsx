import React, { useState } from 'react';
import { 
  Leaf, 
  Award, 
  Plus, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Calculator, 
  DollarSign, 
  Layers, 
  Check, 
  X,
  FileCheck2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { PRODUCTS_CATALOG, ProductItem } from '../data/productsCatalog';

export const AdminProductsTab: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>(PRODUCTS_CATALOG);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');

  // Devis calculator state
  const [calcService, setCalcService] = useState<'Toitures' | 'Façades & Murs' | 'Terrasses'>('Toitures');
  const [calcSupport, setCalcSupport] = useState<string>('Tuiles terre cuite');
  const [calcSurface, setCalcSurface] = useState<number>(100);
  const [calcSellingPricePerM2, setCalcSellingPricePerM2] = useState<number>(18);

  const categories = ['all', 'Toitures', 'Façades & Murs', 'Terrasses', 'Traitements & Spécifiques'];

  // Toggle product status (active / inactive)
  const handleToggleActive = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  // Change verification status
  const handleChangeVerification = (id: string, newStatus: 'Oui' | 'Non' | 'À vérifier') => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, verificationStatus: newStatus } : p));
  };

  const filteredProducts = products.filter(p => {
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchVerif = verificationFilter === 'all' || p.verificationStatus === verificationFilter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.supports.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      p.usage.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchVerif && matchSearch;
  });

  // Calculator support options
  const supportsByService: Record<'Toitures' | 'Façades & Murs' | 'Terrasses', string[]> = {
    'Toitures': ['Tuiles terre cuite', 'Tuiles béton', 'Ardoises naturelles', 'Zinc'],
    'Façades & Murs': ['Enduit gratté', 'Enduit taloché', 'Crépi minéral', 'Murs peints extérieurs', 'Briques & Pierres de taille'],
    'Terrasses': ['Bois exotiques (Ipé, Teck, Cumaru)', 'Bois résineux autoclaves (Pin, Douglas)', 'Pierre naturelle (Travertin, Calcaire, Grès)', 'Dallages en béton désactivé', 'Pavés autobloquants', 'Carrelage extérieur']
  };

  // Find compatible product for chosen support
  const compatibleProduct = products.find(p => 
    p.active && 
    p.category === (calcService as any) && 
    p.supports.some(sup => sup.toLowerCase().includes(calcSupport.toLowerCase()) || calcSupport.toLowerCase().includes(sup.toLowerCase()))
  ) || products.find(p => p.active && p.category === (calcService as any));

  // Calculations
  const costPerM2 = compatibleProduct?.costPerM2HT || 0.90;
  const totalProductCost = Math.round(costPerM2 * calcSurface * 100) / 100;
  const totalSellingPrice = Math.round(calcSellingPricePerM2 * calcSurface * 100) / 100;
  const grossMargin = Math.round((totalSellingPrice - totalProductCost) * 100) / 100;
  const marginPercent = totalSellingPrice > 0 ? Math.round((grossMargin / totalSellingPrice) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Leaf className="w-3.5 h-3.5" />
            <span>Référentiel Produits & Solutions Responsables</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Base Technique des Produits et Certifications Éco-responsables
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Gestion des fiches techniques officielles Bionetal et partenaires, traçabilité des certifications ECOCERT vérifiées et intégration directe au simulateur de devis chantier.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-right">
            <div className="text-[10px] uppercase font-bold text-slate-500">Références Actives</div>
            <div className="text-lg font-black text-emerald-400">
              {products.filter(p => p.active).length} / {products.length}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION CALCULATEUR DE DEVIS AVEC RÉFÉRENTIEL PRODUIT */}
      {/* ========================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/30 border border-sky-500/30 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Calculateur de Devis & Rentabilité Chantier</h3>
              <p className="text-xs text-slate-400">
                Couplage direct entre le support du chantier, le produit Bionetal adapté et le coût de revient au m².
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/40">
            Aide au chiffrage artisan
          </span>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Prestation / Silo</label>
            <select
              value={calcService}
              onChange={(e) => {
                const s = e.target.value as any;
                setCalcService(s);
                setCalcSupport(supportsByService[s][0]);
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-sky-500 cursor-pointer"
            >
              <option value="Toitures">Toitures (Nettoyage & Démoussage)</option>
              <option value="Façades & Murs">Façades & Murs extérieurs</option>
              <option value="Terrasses">Terrasses & Sols extérieurs</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Nature du support</label>
            <select
              value={calcSupport}
              onChange={(e) => setCalcSupport(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-sky-500 cursor-pointer"
            >
              {supportsByService[calcService].map(sup => (
                <option key={sup} value={sup}>{sup}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Surface du chantier (m²)</label>
            <input
              type="number"
              min="10"
              max="2000"
              value={calcSurface}
              onChange={(e) => setCalcSurface(Number(e.target.value) || 0)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-sky-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Prix de vente visé (€ HT / m²)</label>
            <input
              type="number"
              min="5"
              max="100"
              value={calcSellingPricePerM2}
              onChange={(e) => setCalcSellingPricePerM2(Number(e.target.value) || 0)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-sky-500 font-bold"
            />
          </div>
        </div>

        {/* Recommended compatible product box */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-emerald-400">Produit compatible recommandé :</span>
              {compatibleProduct?.isEcocert && (
                <span className="px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  Certifié ECOCERT
                </span>
              )}
            </div>
            <div className="text-sm font-black text-white">{compatibleProduct?.name}</div>
            <div className="text-xs text-slate-400">
              Rendement : {compatibleProduct?.yieldM2} • Dilution : {compatibleProduct?.dilution}
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <div className="text-[10px] text-slate-400">Coût produit / m² HT</div>
            <div className="text-base font-black text-emerald-400">{costPerM2.toFixed(2)} € / m²</div>
          </div>
        </div>

        {/* Results summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Coût produit chantier :</span>
            <span className="text-lg font-black text-slate-200">{totalProductCost.toFixed(2)} € HT</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Prix de vente total :</span>
            <span className="text-lg font-black text-sky-400">{totalSellingPrice.toFixed(2)} € HT</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Marge brute chantier :</span>
            <span className="text-lg font-black text-emerald-400">{grossMargin.toFixed(2)} € HT</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Rentabilité brute :</span>
            <span className="text-lg font-black text-emerald-300">{marginPercent} %</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TABLEAU RÉFÉRENTIEL PRODUITS */}
      {/* ========================================================= */}
      <div className="space-y-4">
        {/* Filters */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === c
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {c === 'all' ? 'Toutes catégories' : c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 outline-none cursor-pointer"
            >
              <option value="all">Toutes certifications</option>
              <option value="Oui">Certification vérifiée : Oui</option>
              <option value="À vérifier">Certification : À vérifier</option>
            </select>

            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filtrer les fiches produits..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Product Cards Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-4">Produit & Marque</th>
                <th className="py-3 px-4">Catégorie & Supports</th>
                <th className="py-3 px-4">Certification</th>
                <th className="py-3 px-4">Dilution & Rendement</th>
                <th className="py-3 px-4">Temps Action</th>
                <th className="py-3 px-4">Coût / m² HT</th>
                <th className="py-3 px-4">Certif. Vérifiée</th>
                <th className="py-3 px-4 text-right">Fiche Officielle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                  {/* Status Toggle */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(p.id)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black cursor-pointer ${
                        p.active 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}
                    >
                      {p.active ? 'ACTIF' : 'INACTIF'}
                    </button>
                  </td>

                  {/* Name & Brand */}
                  <td className="py-3 px-4 font-bold text-white max-w-xs">
                    <div>{p.name}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{p.brand} • Conditionnement {p.packagingSize} ({p.purchasePriceHT}€ HT)</div>
                  </td>

                  {/* Category & Supports */}
                  <td className="py-3 px-4 text-slate-300 max-w-xs">
                    <span className="font-semibold text-sky-400 block">{p.category}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-1">{p.supports.join(', ')}</span>
                  </td>

                  {/* Certification Badges */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {p.isEcocert ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                          <Award className="w-3 h-3" /> ECOCERT
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">Non certifié</span>
                      )}
                      {p.isNaturalOrigin && (
                        <span className="text-[10px] text-sky-300">Origine naturelle</span>
                      )}
                    </div>
                  </td>

                  {/* Dilution & Yield */}
                  <td className="py-3 px-4 text-slate-300 text-[11px] whitespace-nowrap">
                    <div>{p.yieldM2}</div>
                    <div className="text-[10px] text-slate-500">{p.dilution}</div>
                  </td>

                  {/* Action time */}
                  <td className="py-3 px-4 text-slate-300 text-[11px]">
                    {p.actionTime}
                  </td>

                  {/* Cost per m² */}
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400 whitespace-nowrap">
                    {p.costPerM2HT ? `${p.costPerM2HT.toFixed(2)} €` : 'N/A'}
                  </td>

                  {/* Verification Status selector */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <select
                      value={p.verificationStatus}
                      onChange={(e) => handleChangeVerification(p.id, e.target.value as any)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-bold outline-none cursor-pointer border ${
                        p.verificationStatus === 'Oui'
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : p.verificationStatus === 'À vérifier'
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      <option value="Oui">Oui (vérifié)</option>
                      <option value="À vérifier">À vérifier</option>
                      <option value="Non">Non</option>
                    </select>
                    <div className="text-[9px] text-slate-500 mt-0.5">{p.verificationDate}</div>
                  </td>

                  {/* Link */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    {p.officialUrl && (
                      <a
                        href={p.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-bold text-xs"
                      >
                        <span>Fiche</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
