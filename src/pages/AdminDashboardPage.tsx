import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  LogOut, 
  ExternalLink, 
  Search, 
  Filter, 
  TrendingUp, 
  Download, 
  FileSpreadsheet, 
  FileCode, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  SlidersHorizontal, 
  Layers, 
  MapPin, 
  Sparkles, 
  Target, 
  AlertCircle, 
  ChevronRight, 
  BarChart3, 
  KeyRound, 
  UserCheck, 
  Globe, 
  Building2,
  Lock,
  ArrowUpRight,
  Database,
  PlusCircle,
  Network,
  HelpCircle,
  Check,
  X,
  FileCheck2,
  Gauge,
  Leaf
} from 'lucide-react';
import { AdminUser, SeoKeywordItem, KeywordStatus, SeoMetricsData } from '../types';
import { SERVICE_SILOS } from '../data/silosData';
import { analyzeSiloFeeding, SiloOpportunity, SiloFeedingAnalysis } from '../utils/siloFeederEngine';
import { AdminProductsTab } from '../components/AdminProductsTab';

interface AdminDashboardPageProps {
  user: AdminUser;
  onLogout: () => void;
  onNavigateHome: () => void;
  initialTab?: string;
}

type AdminTab = 
  | 'dashboard' 
  | 'matrice' 
  | 'mots-cles' 
  | 'pages' 
  | 'produits'
  | 'maillage' 
  | 'local' 
  | 'exports' 
  | 'parametres';

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  user,
  onLogout,
  onNavigateHome,
  initialTab = 'dashboard',
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab as AdminTab);
  const [matrix, setMatrix] = useState<SeoKeywordItem[]>([]);
  const [metrics, setMetrics] = useState<SeoMetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Filters for Matrix view
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntent, setSelectedIntent] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedGeo, setSelectedGeo] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Silo Feeding Feature State
  const [selectedFeederSilo, setSelectedFeederSilo] = useState<string>('nettoyage-terrasse');
  const [siloAnalysis, setSiloAnalysis] = useState<SiloFeedingAnalysis | null>(null);
  const [selectedOpportunities, setSelectedOpportunities] = useState<Record<string, boolean>>({});
  const [isInjectingKeywords, setIsInjectingKeywords] = useState(false);
  const [siloFeederModalOpen, setSiloFeederModalOpen] = useState(false);

  // Set noindex, nofollow for admin
  useEffect(() => {
    document.title = 'Espace Administrateur Privé | NOVA CB';
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');

    return () => {
      robotsMeta?.setAttribute('content', 'index, follow');
    };
  }, []);

  // Fetch confidential SEO matrix from server
  const fetchSeoMatrix = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/admin/seo/matrix');

      if (res.status === 401 || res.status === 403) {
        onLogout();
        return;
      }

      if (!res.ok) {
        throw new Error('Impossible de charger la matrice SEO.');
      }

      const data = await res.json();
      setMatrix(data.matrix || []);
      setMetrics(data.metrics || null);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erreur lors du chargement des données SEO.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoMatrix();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: KeywordStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/seo/matrix/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la mise à jour.');
      }

      const data = await res.json();
      setMatrix(prev => prev.map(item => item.id === id ? data.item : item));
      setSuccessToast(`Statut mis à jour : ${newStatus}`);
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (err) {
      alert('Impossible de mettre à jour le statut du mot-clé.');
    } finally {
      setUpdatingId(null);
    }
  };

  // Launch Silo Feeding Engine
  const handleOpenSiloFeeder = (siloKey?: string) => {
    const key = siloKey || selectedFeederSilo;
    setSelectedFeederSilo(key);
    const analysis = analyzeSiloFeeding(key, matrix);
    setSiloAnalysis(analysis);
    
    // Default select all opportunities
    const initialSelected: Record<string, boolean> = {};
    analysis.opportunities.forEach(opp => {
      initialSelected[opp.id] = true;
    });
    setSelectedOpportunities(initialSelected);
    setSiloFeederModalOpen(true);
  };

  const handleToggleOpportunity = (id: string) => {
    setSelectedOpportunities(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Admin validates and injects selected opportunities into confidential matrix
  const handleConfirmSiloFeeding = async () => {
    if (!siloAnalysis) return;
    
    const approvedOpportunities = siloAnalysis.opportunities.filter(
      opp => selectedOpportunities[opp.id]
    );

    if (approvedOpportunities.length === 0) {
      alert('Veuillez sélectionner au moins une opportunité à intégrer.');
      return;
    }

    setIsInjectingKeywords(true);
    try {
      const payload = approvedOpportunities.map(opp => ({
        keyword: opp.keyword,
        intent: opp.intent,
        priority: opp.priority,
        targetPage: opp.targetPage,
        slug: opp.slug,
        title: opp.title,
        h1: opp.h1,
        cta: opp.cta,
        status: 'À créer' as KeywordStatus,
        serviceType: opp.serviceType,
        geo: opp.geo,
      }));

      const res = await fetch('/api/admin/seo/matrix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: payload }),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de l’alimentation du silo.');
      }

      const data = await res.json();
      if (data.created && Array.isArray(data.created)) {
        setMatrix(prev => {
          const updated = [...prev, ...data.created];
          return updated;
        });
      }
      
      // Always refresh full SEO matrix & metrics to guarantee consistency across all tabs
      await fetchSeoMatrix();

      setSuccessToast(`${approvedOpportunities.length} opportunités validées et injectées dans le silo !`);
      setTimeout(() => setSuccessToast(null), 4000);
      setSiloFeederModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Impossible d’alimenter le silo.');
    } finally {
      setIsInjectingKeywords(false);
    }
  };

  // Secure CSV/JSON export trigger
  const handleExport = async (format: 'csv' | 'json') => {
    try {
      const res = await fetch(`/api/admin/seo/export?format=${format}`);

      if (!res.ok) {
        throw new Error('Erreur lors de l’export.');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `matrice-seo-nova-cb-confidentielle.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setSuccessToast(`Fichier exporté (${format.toUpperCase()}) avec succès.`);
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (err) {
      alert('Erreur lors de l’export sécurisé.');
    }
  };

  const handleLogoutClick = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      });
    } catch {
      // ignore
    } finally {
      onLogout();
    }
  };

  // Filter matrix
  const filteredMatrix = matrix.filter((item) => {
    const matchSearch = 
      item.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.targetPage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.h1.toLowerCase().includes(searchTerm.toLowerCase());

    const matchIntent = selectedIntent === 'all' || item.intent === selectedIntent;
    const matchPriority = selectedPriority === 'all' || item.priority === selectedPriority;
    const matchStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchGeo = selectedGeo === 'all' || item.geo === selectedGeo;
    const matchService = selectedService === 'all' || item.serviceType === selectedService;

    return matchSearch && matchIntent && matchPriority && matchStatus && matchGeo && matchService;
  });

  const geoList = Array.from(new Set(matrix.map(m => m.geo))).filter(Boolean);
  const serviceList = Array.from(new Set(matrix.map(m => m.serviceType))).filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Top Admin Security Bar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-base tracking-tight">NOVA CB</span>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-extrabold uppercase tracking-wider border border-rose-500/30 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  Espace Administrateur Privé
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Pilotage Stratégique SEO & Données Commerciales Internes
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* User badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-slate-300 font-medium">{user.email}</span>
              <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-extrabold text-[10px] uppercase">
                {user.role}
              </span>
            </div>

            {/* Link to public site */}
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              title="Voir le site public commercial"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Site Public</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogoutClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 hover:text-rose-200 border border-rose-500/40 text-xs font-bold transition-colors cursor-pointer"
              title="Se déconnecter de l'administration"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>DÉCONNEXION</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto border-t border-slate-800/60 py-1.5 no-scrollbar text-xs">
          {[
            { id: 'dashboard', label: 'Dashboard & Pilotage', icon: BarChart3 },
            { id: 'matrice', label: `Matrice SEO (${matrix.length})`, icon: Database },
            { id: 'mots-cles', label: 'Mots-Clés & Intentions', icon: Sparkles },
            { id: 'pages', label: 'Pages SEO & Silos', icon: Layers },
            { id: 'produits', label: 'Référentiel Produits & Chiffrage', icon: Leaf },
            { id: 'local', label: 'SEO Local Gironde', icon: MapPin },
            { id: 'exports', label: 'Exports Sécurisés', icon: Download },
            { id: 'parametres', label: 'Paramètres & Sécurité', icon: Lock },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Toast */}
        {successToast && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-500/90 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Loading / Error States */}
        {loading && (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-sky-400" />
            <p className="text-sm">Chargement sécurisé des données SEO confidentielles...</p>
          </div>
        )}

        {errorMsg && (
          <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={fetchSeoMatrix}
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs cursor-pointer"
            >
              Réessayer
            </button>
          </div>
        )}

        {!loading && !errorMsg && (
          <>
            {/* ========================================================= */}
            {/* TAB 1: DASHBOARD & PILOTAGE */}
            {/* ========================================================= */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Intro Banner */}
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Environnement Administrateur Isolé</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Tableau de Pilotage SEO & Rentabilité Commerciale
                    </h2>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      Bienvenue, <strong className="text-white">{user.email}</strong>. Cette interface regroupe l'ensemble des données d'acquisition naturelle de NOVA CB. Ces analyses sont strictement confidentielles et ne sont pas accessibles au public.
                    </p>
                  </div>
                </div>

                {/* KPI Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>Mots-Clés Stratégiques</span>
                      <Sparkles className="w-4 h-4 text-sky-400" />
                    </div>
                    <div className="text-3xl font-black text-white mt-2">
                      {metrics?.totalKeywords || matrix.length}
                    </div>
                    <div className="text-[11px] text-emerald-400 font-medium mt-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>100% enregistrés et actifs</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>Priorité Haute (P1)</span>
                      <TrendingUp className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-3xl font-black text-amber-400 mt-2">
                      {metrics?.p1PriorityCount || matrix.filter(k => k.priority === 'P1 - Forte').length}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-2">
                      Requêtes à plus fort potentiel de devis
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>Intentions Commerciales</span>
                      <Target className="w-4 h-4 text-sky-400" />
                    </div>
                    <div className="text-3xl font-black text-sky-400 mt-2">
                      {metrics?.commercialIntentCount || matrix.filter(k => k.intent === 'commerciale' || k.intent === 'transactionnelle').length}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-2">
                      Demandes de devis & tarifs directs
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>Taux d'Optimisation</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-3xl font-black text-emerald-400 mt-2">
                      {metrics?.totalKeywords ? Math.round((metrics.optimizedCount / metrics.totalKeywords) * 100) : 100}%
                    </div>
                    <div className="text-[11px] text-slate-400 mt-2">
                      Pages cibles, H1 & CTA déployés
                    </div>
                  </div>
                </div>

                {/* Strategic Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
                      <Database className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-base">Consulter la Matrice</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Accédez à la table complète des {matrix.length} mots-clés, triez par silo, priorité ou zone géographique et mettez à jour leur statut.
                    </p>
                    <button
                      onClick={() => setActiveTab('matrice')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 cursor-pointer pt-2"
                    >
                      <span>Ouvrir la matrice SEO</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-base">SEO Local & Communes</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Analyse du maillage local pour Mérignac (33700), Bordeaux Métropole, Pessac, Talence, Le Bouscat et la Gironde.
                    </p>
                    <button
                      onClick={() => setActiveTab('local')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer pt-2"
                    >
                      <span>Voir le maillage local</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                      <Download className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-base">Exports Sécurisés</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Générez instantanément un export au format CSV ou JSON de toute la base interne pour vos outils de reporting.
                    </p>
                    <button
                      onClick={() => setActiveTab('exports')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 cursor-pointer pt-2"
                    >
                      <span>Accéder aux exports</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 2: MATRICE SEO COMPLETE */}
            {/* ========================================================= */}
            {activeTab === 'matrice' && (
              <div className="space-y-6">
                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      Matrice SEO Confidentielle ({filteredMatrix.length} / {matrix.length})
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Gestion opérationnelle des intentions de recherche, des URL cibles et des statuts d'optimisation.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleExport('csv')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-700"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Exporter CSV</span>
                    </button>
                    <button
                      onClick={fetchSeoMatrix}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-700"
                      title="Rafraîchir les données"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
                      <span>Rafraîchir</span>
                    </button>
                  </div>
                </div>

                {/* Filters Bar */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Rechercher un mot-clé, une URL, une balise H1 ou une page cible..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-sky-500 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Priorité</label>
                      <select
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                        className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 outline-none"
                      >
                        <option value="all">Toutes les priorités</option>
                        <option value="P1 - Forte">P1 - Forte</option>
                        <option value="P2 - Moyenne">P2 - Moyenne</option>
                        <option value="P3 - Longue traîne">P3 - Longue traîne</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Intention</label>
                      <select
                        value={selectedIntent}
                        onChange={(e) => setSelectedIntent(e.target.value)}
                        className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 outline-none"
                      >
                        <option value="all">Toutes les intentions</option>
                        <option value="commerciale">Commerciale</option>
                        <option value="transactionnelle">Transactionnelle</option>
                        <option value="locale">Locale</option>
                        <option value="informationnelle">Informationnelle</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Silo / Prestation</label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 outline-none"
                      >
                        <option value="all">Tous les silos</option>
                        {serviceList.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Zone Géo</label>
                      <select
                        value={selectedGeo}
                        onChange={(e) => setSelectedGeo(e.target.value)}
                        className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 outline-none"
                      >
                        <option value="all">Toutes les zones</option>
                        {geoList.map(g => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Statut</label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 outline-none"
                      >
                        <option value="all">Tous les statuts</option>
                        <option value="Optimisé">Optimisé</option>
                        <option value="À optimiser">À optimiser</option>
                        <option value="À créer">À créer</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Matrix Table */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-3 px-4">Mot-Clé Stratégique</th>
                          <th className="py-3 px-3">Intention</th>
                          <th className="py-3 px-3">Priorité</th>
                          <th className="py-3 px-3">Page Cible & Slug</th>
                          <th className="py-3 px-3">H1 Déployé</th>
                          <th className="py-3 px-3">Statut & Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {filteredMatrix.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-800/40 transition-colors group">
                            {/* Keyword */}
                            <td className="py-3 px-4">
                              <div className="font-bold text-white group-hover:text-sky-400 transition-colors">
                                {item.keyword}
                              </div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                                <span>{item.serviceType}</span>
                                <span>•</span>
                                <span className="text-sky-400/90">{item.geo}</span>
                              </div>
                            </td>

                            {/* Intent */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-0.5 rounded-md font-semibold text-[10px] uppercase ${
                                item.intent === 'commerciale' 
                                  ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30' 
                                  : item.intent === 'transactionnelle' 
                                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                  : item.intent === 'locale' 
                                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30' 
                                  : 'bg-slate-700/30 text-slate-400'
                              }`}>
                                {item.intent}
                              </span>
                            </td>

                            {/* Priority */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1 font-bold text-[11px] ${
                                item.priority.startsWith('P1') 
                                  ? 'text-amber-400' 
                                  : item.priority.startsWith('P2') 
                                  ? 'text-sky-400' 
                                  : 'text-slate-400'
                              }`}>
                                {item.priority}
                              </span>
                            </td>

                            {/* Target Page & Slug */}
                            <td className="py-3 px-3">
                              <div className="font-medium text-slate-200 text-xs">
                                {item.targetPage}
                              </div>
                              <div className="font-mono text-[10px] text-slate-400 truncate max-w-[180px]">
                                {item.slug}
                              </div>
                            </td>

                            {/* H1 */}
                            <td className="py-3 px-3">
                              <div className="text-slate-300 line-clamp-2 text-xs max-w-xs">
                                {item.h1}
                              </div>
                            </td>

                            {/* Status and edit */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <select
                                value={item.status}
                                disabled={updatingId === item.id}
                                onChange={(e) => handleUpdateStatus(item.id, e.target.value as KeywordStatus)}
                                className={`px-2 py-1 rounded-lg text-xs font-bold outline-none cursor-pointer border ${
                                  item.status === 'Optimisé'
                                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                    : item.status === 'À optimiser'
                                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                    : 'bg-slate-800 text-slate-300 border-slate-700'
                                }`}
                              >
                                <option value="Optimisé">Optimisé</option>
                                <option value="À optimiser">À optimiser</option>
                                <option value="À créer">À créer</option>
                                <option value="À contrôler">À contrôler</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 3: MOTS-CLÉS & INTENTIONS */}
            {/* ========================================================= */}
            {activeTab === 'mots-cles' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
                  <h2 className="text-xl font-black text-white">Analyse des Intentions de Recherche (Search Intent)</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Segmentation des flux d'utilisateurs entre recherche de tarif immédiat, sélection d'artisan local et documentation technique.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Commercial Intent */}
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-base">Commerciale & Devis</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-extrabold text-xs">
                        {matrix.filter(k => k.intent === 'commerciale').length} requêtes
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Internautes prêts à engager un chantier à court terme. Pages orientées conversion avec estimation en 48h et garanties artisanales.
                    </p>
                    <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                      {matrix.filter(k => k.intent === 'commerciale').slice(0, 6).map(k => (
                        <div key={k.id} className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-800/40">
                          <span className="font-medium truncate max-w-[200px]">{k.keyword}</span>
                          <span className="text-[10px] text-amber-400 font-bold">{k.priority}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Local Intent */}
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-base">Locale (Gironde 33)</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-extrabold text-xs">
                        {matrix.filter(k => k.intent === 'locale').length} requêtes
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Recherches géolocalisées sur Mérignac, Bordeaux centre, Pessac, Talence et communes environnantes.
                    </p>
                    <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                      {matrix.filter(k => k.intent === 'locale').slice(0, 6).map(k => (
                        <div key={k.id} className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-800/40">
                          <span className="font-medium truncate max-w-[200px]">{k.keyword}</span>
                          <span className="text-[10px] text-purple-400 font-bold">{k.geo}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transactional Intent */}
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-base">Prix & Tarifs au m²</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs">
                        {matrix.filter(k => k.intent === 'transactionnelle').length} requêtes
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Comparaison de coûts et recherche de barèmes clairs. Répond avec nos repères tarifaires transparents (10€ à 22€/m²).
                    </p>
                    <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                      {matrix.filter(k => k.intent === 'transactionnelle').slice(0, 6).map(k => (
                        <div key={k.id} className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-800/40">
                          <span className="font-medium truncate max-w-[200px]">{k.keyword}</span>
                          <span className="text-[10px] text-emerald-400 font-bold">m²</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 4: PAGES SEO & SILOS */}
            {/* ========================================================= */}
            {activeTab === 'pages' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
                  <div>
                    <h2 className="text-xl font-black text-white">Cartographie des Pages Cibles & Silos</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Répartition des clusters sémantiques entre les pages de prestations (toiture, terrasse, façade) et les pages locales.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={selectedFeederSilo}
                      onChange={(e) => setSelectedFeederSilo(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-800 text-xs text-slate-200 border border-slate-700 focus:outline-none focus:border-sky-500 cursor-pointer"
                      title="Choisir le silo à analyser"
                    >
                      {Object.entries(SERVICE_SILOS).map(([key, silo]) => (
                        <option key={key} value={key}>
                          {silo.shortTitle} ({silo.category})
                        </option>
                      ))}
                    </select>

                    <button
                      id="feed-silo-main-btn"
                      onClick={() => handleOpenSiloFeeder(selectedFeederSilo)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-sm shadow-sky-500/20"
                    >
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>Alimenter le silo</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {serviceList.map(silo => {
                    const siloKeywords = matrix.filter(k => k.serviceType === silo);
                    // Match with SERVICE_SILOS key if possible
                    const matchedSiloEntry = Object.entries(SERVICE_SILOS).find(
                      ([, s]) => (s.category || '').toLowerCase() === String(silo).toLowerCase() || (s.shortTitle || '').toLowerCase().includes(String(silo).toLowerCase())
                    );
                    const siloKey = matchedSiloEntry ? matchedSiloEntry[0] : (silo === 'Terrasses' ? 'nettoyage-terrasse' : silo === 'Toitures' ? 'nettoyage-demoussage-toiture' : 'nettoyage-mur-exterieur');

                    // Compute dynamic score for card preview
                    const p1Count = siloKeywords.filter(k => k.priority === 'P1 - Forte').length;
                    const previewScore = Math.min(100, Math.round(siloKeywords.length * 7 + p1Count * 5 + 15));

                    return (
                      <div key={silo} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-white text-base flex items-center gap-2">
                            <Layers className="w-4 h-4 text-sky-400" />
                            <span>Silo : {silo}</span>
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-sky-400 font-bold text-xs border border-slate-700">
                              {siloKeywords.length} mots-clés
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                              previewScore >= 75 
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                                : previewScore >= 50 
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            }`}>
                              Score {previewScore}/100
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <div>
                            URL principale : <code className="text-slate-200">{siloKeywords[0]?.slug || '/'}</code>
                          </div>
                          <button
                            onClick={() => handleOpenSiloFeeder(siloKey)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3 text-sky-400" />
                            <span>Alimenter ce silo</span>
                          </button>
                        </div>

                        <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
                          {siloKeywords.slice(0, 4).map(k => (
                            <div key={k.id} className="flex items-center justify-between text-xs">
                              <span className="truncate max-w-xs">• {k.keyword}</span>
                              <span className="text-[10px] text-slate-500">{k.priority}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB: RÉFÉRENTIEL PRODUITS & CALCULATEUR */}
            {/* ========================================================= */}
            {activeTab === 'produits' && (
              <AdminProductsTab />
            )}

            {/* ========================================================= */}
            {/* TAB 5: SEO LOCAL GIRONDE */}
            {/* ========================================================= */}
            {activeTab === 'local' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
                  <h2 className="text-xl font-black text-white">Maillage Géographique Gironde (33)</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Stratégie d'ancrage local à Mérignac (siège), Bordeaux Métropole et la première couronne.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {geoList.map(city => {
                    const cityKeywords = matrix.filter(k => k.geo === city);
                    return (
                      <div key={city} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-base flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-purple-400" />
                            <span>{city}</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-extrabold text-xs">
                            {cityKeywords.length}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {cityKeywords.filter(k => k.priority === 'P1 - Forte').length} requêtes prioritaires P1
                        </p>
                        <div className="pt-2 border-t border-slate-800/80 space-y-1 text-xs text-slate-300">
                          {cityKeywords.slice(0, 3).map(k => (
                            <div key={k.id} className="truncate text-[11px] text-slate-400">
                              • {k.keyword}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 7: EXPORTS SECURISED */}
            {/* ========================================================= */}
            {activeTab === 'exports' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
                  <h2 className="text-xl font-black text-white">Exports Sécurisés des Données Stratégiques</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Téléchargez la matrice complète sous différents formats pour vos audits, tableurs ou intégrations CRM.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                        <FileSpreadsheet className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-white text-lg">Export CSV (Excel / Google Sheets)</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Fichier tabulaire complet comprenant tous les champs : mots-clés, intentions, priorités, slugs, titres SEO, H1 et zones géographiques.
                      </p>
                    </div>
                    <button
                      onClick={() => handleExport('csv')}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
                    >
                      <Download className="w-4 h-4" />
                      <span>Télécharger matrice-seo-nova-cb.csv</span>
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
                        <FileCode className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-white text-lg">Export JSON Structuré</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Format machine pour intégration programmatique, sauvegarde JSON ou synchronisation avec des outils externes.
                      </p>
                    </div>
                    <button
                      onClick={() => handleExport('json')}
                      className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sky-600/20"
                    >
                      <Download className="w-4 h-4" />
                      <span>Télécharger matrice-seo-nova-cb.json</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 7: PARAMETRES & SECURITE */}
            {/* ========================================================= */}
            {activeTab === 'parametres' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
                  <h2 className="text-xl font-black text-white">Paramètres d'Administration & Politiques de Sécurité</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Vérification de la séparation stricte entre le site public commercial et les données confidentielles.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-sky-400" />
                      <span>Compte Administrateur Actuel</span>
                    </h3>
                    <div className="space-y-3 text-xs text-slate-300">
                      <div className="flex justify-between py-1.5 border-b border-slate-800">
                        <span className="text-slate-500">Email actif :</span>
                        <span className="font-bold text-white">{user.email}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-800">
                        <span className="text-slate-500">Rôle RBAC :</span>
                        <span className="font-bold text-emerald-400 uppercase">{user.role}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-800">
                        <span className="text-slate-500">Type de session :</span>
                        <span className="font-bold text-slate-200">Cookie HttpOnly sécurisé</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-slate-500">Validité session :</span>
                        <span className="font-bold text-sky-400">4 heures (renouvelable)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span>Règles de Sécurité Appliquées</span>
                    </h3>
                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Backend Isolé :</strong> Les données SEO résident sur le serveur et ne sont jamais injectées dans le bundle public.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Contrôle 401/403 :</strong> Tout appel sans session valide est rejeté côté serveur avant de délivrer la matrice.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Indexation bloquée :</strong> Les balises <code>noindex, nofollow</code> et <code>robots.txt</code> interdisent aux moteurs de crawler l'espace admin.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Protection anti brute-force :</strong> Limitation automatique des requêtes de login après 5 tentatives échouées.</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </>
        )}
      </main>

      {/* ========================================================= */}
      {/* MODAL : ALIMENTER LE SILO (CONFIDENTIEL ADMINISTRATEUR) */}
      {/* ========================================================= */}
      {siloFeederModalOpen && siloAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Alimenter le Silo : {siloAnalysis.siloName}</h2>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-sky-400 text-xs font-bold border border-slate-700">
                      {siloAnalysis.siloCategory}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Enrichissement sémantique à partir des données internes, opportunités de mots-clés et maillage.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSiloFeederModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
              {/* Score Bar & KPI Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Score d'alimentation</div>
                    <div className="text-lg font-black text-white flex items-baseline gap-1">
                      <span>{siloAnalysis.overallScore}/100</span>
                      <span className={`text-[10px] font-extrabold ${
                        siloAnalysis.overallScore >= 75 ? 'text-emerald-400' : siloAnalysis.overallScore >= 50 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        ({siloAnalysis.scoreLabel})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Mots-clés en base</div>
                    <div className="text-lg font-black text-white">{siloAnalysis.existingKeywordsCount} requêtes</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Opportunités détectées</div>
                    <div className="text-lg font-black text-emerald-400">{siloAnalysis.opportunitiesCount} nouvelles</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Cannibalisation</div>
                    <div className="text-lg font-black text-white">
                      {siloAnalysis.cannibalizationRisks.length === 0 ? '0 risque' : `${siloAnalysis.cannibalizationRisks.length} conflits`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cannibalization & Content Gaps Alerts */}
              {(siloAnalysis.cannibalizationRisks.length > 0 || siloAnalysis.contentGaps.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Cannibalization Risks */}
                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 space-y-2">
                    <div className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      <span>Risques de Cannibalisation Détectés</span>
                    </div>
                    {siloAnalysis.cannibalizationRisks.length === 0 ? (
                      <p className="text-[11px] text-slate-400">Aucun conflit d'URL détecté sur les termes clés de ce silo.</p>
                    ) : (
                      <div className="space-y-2 text-[11px] text-slate-300">
                        {siloAnalysis.cannibalizationRisks.map((c, i) => (
                          <div key={i} className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">"{c.keyword}"</span>
                              <span className="text-[10px] text-amber-400 font-bold">Risque {c.riskLevel}</span>
                            </div>
                            <div className="text-slate-400">Pages en compétition : {c.conflictingPages.join(' vs ')}</div>
                            <div className="text-amber-200/90 text-[10px] italic">Solution : {c.solution}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content Gaps */}
                  <div className="p-4 rounded-2xl bg-sky-950/20 border border-sky-800/40 space-y-2">
                    <div className="font-bold text-sky-300 text-xs flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-sky-400" />
                      <span>Manques de Contenu & Opportunités de Trafic</span>
                    </div>
                    {siloAnalysis.contentGaps.length === 0 ? (
                      <p className="text-[11px] text-slate-400">La couverture sémantique de ce silo est équilibrée.</p>
                    ) : (
                      <div className="space-y-2 text-[11px] text-slate-300">
                        {siloAnalysis.contentGaps.map((g, i) => (
                          <div key={i} className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-1.5" />
                            <div>
                              <div className="font-bold text-white">{g.category}</div>
                              <div className="text-slate-400">{g.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Opportunities Table with Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <span>Opportunités de Mots-Clés Proposées (Validation Requise)</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Sélectionnez les termes à intégrer dans la matrice interne
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3 w-10 text-center">Choix</th>
                        <th className="py-2.5 px-3">Niveau d'Organisation</th>
                        <th className="py-2.5 px-3">Mot-clé Cible</th>
                        <th className="py-2.5 px-3">Intention & Priorité</th>
                        <th className="py-2.5 px-3">Page Cible & URL</th>
                        <th className="py-2.5 px-3">Action Proposée</th>
                        <th className="py-2.5 px-3">Justification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {siloAnalysis.opportunities.map((opp) => {
                        const isChecked = !!selectedOpportunities[opp.id];
                        return (
                          <tr 
                            key={opp.id} 
                            onClick={() => handleToggleOpportunity(opp.id)}
                            className={`cursor-pointer transition-colors ${isChecked ? 'bg-sky-950/15 hover:bg-sky-950/25' : 'hover:bg-slate-850/40 opacity-70'}`}
                          >
                            <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleOpportunity(opp.id)}
                                className="rounded border-slate-700 text-sky-500 focus:ring-0 cursor-pointer"
                              />
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold text-[10px] border border-slate-700">
                                {opp.level}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-bold text-white">
                              {opp.keyword}
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap space-x-1.5">
                              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-sky-300 text-[10px] font-bold">
                                {opp.intent}
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 text-[10px] font-bold">
                                {opp.priority}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-400">
                              <div className="font-medium text-slate-200">{opp.targetPage}</div>
                              <code className="text-[10px] text-slate-500">{opp.slug}</code>
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                opp.recommendedAction === 'Créer'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : opp.recommendedAction === 'Renforcer'
                                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              }`}>
                                {opp.recommendedAction}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-400 text-[11px] max-w-xs">
                              {opp.rationale}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Internal Mesh Section */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="font-bold text-white text-xs flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Network className="w-4 h-4 text-purple-400" />
                    <span>Maillage Interne Recommandé pour ce Silo (Liens & Ancres)</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Flux de jus SEO et cloisonnement thématique</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                  {siloAnalysis.meshLinks.map((link, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>{link.sourceTitle} ➔ <strong className="text-white">{link.targetTitle}</strong></span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold ${
                          link.status === 'Actif' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-purple-500/20 text-purple-300'
                        }`}>
                          {link.status}
                        </span>
                      </div>
                      <div className="text-slate-300">
                        Ancre exacte : <code className="text-sky-300 font-medium">"{link.anchorText}"</code>
                      </div>
                      <div className="text-[10px] text-slate-500">{link.relationshipType}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="text-xs text-slate-400">
                {Object.values(selectedOpportunities).filter(Boolean).length} opportunité(s) sélectionnée(s)
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSiloFeederModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold transition-colors cursor-pointer border border-slate-700"
                >
                  Annuler
                </button>
                <button
                  onClick={handleConfirmSiloFeeding}
                  disabled={isInjectingKeywords}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 text-xs font-black transition-colors cursor-pointer shadow-md shadow-sky-500/20"
                >
                  {isInjectingKeywords ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-950" />
                  ) : (
                    <FileCheck2 className="w-3.5 h-3.5 text-slate-950" />
                  )}
                  <span>Valider et injecter dans la matrice ({Object.values(selectedOpportunities).filter(Boolean).length})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
