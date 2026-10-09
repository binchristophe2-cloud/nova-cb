import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServiceSiloPage } from './pages/ServiceSiloPage';
import { LocalCityPage } from './pages/LocalCityPage';
import { ProductsSolutionsPage } from './pages/ProductsSolutionsPage';
import { NotificationToast } from './components/NotificationToast';
import { PageType, AppNotification, AdminUser } from './types';
import { SERVICE_SILOS, LOCAL_CITY_SILOS } from './data/silosData';
import { Phone, Calendar, ArrowRight, Sparkles } from 'lucide-react';

// Lazy-loaded administrative components to avoid leaking admin bundle to public visitors
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [currentSiloSlug, setCurrentSiloSlug] = useState<string | null>(null);
  const [currentCitySlug, setCurrentCitySlug] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>('terrasses-bois');
  const [notification, setNotification] = useState<AppNotification | null>(null);

  // Admin state
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [adminInitialTab, setAdminInitialTab] = useState<string>('dashboard');
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  const triggerNotification = (notif: Omit<AppNotification, 'id'>) => {
    setNotification({
      id: String(Date.now()),
      ...notif,
    });
  };

  // Verify admin session with server using HttpOnly cookie
  const checkAdminAuth = useCallback(async () => {
    setIsCheckingAuth(true);
    try {
      const res = await fetch('/api/admin/me');
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setAdminUser(data.user);
          return true;
        }
      }
      setAdminUser(null);
      return false;
    } catch {
      setAdminUser(null);
      return false;
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  // Synchronize route state with URL
  const resolveRoute = useCallback(() => {
    const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
    const hash = window.location.hash.replace(/^#\/?/, '');
    const fullPath = window.location.pathname;

    // Check if on Admin route
    if (fullPath.startsWith('/admin') || rawPath.startsWith('admin') || hash.startsWith('admin')) {
      setIsAdminRoute(true);
      if (fullPath.includes('/seo') || hash.includes('seo') || fullPath.includes('matrice')) {
        setAdminInitialTab('matrice');
      } else {
        setAdminInitialTab('dashboard');
      }
      checkAdminAuth();
      return;
    }

    // Public routes
    setIsAdminRoute(false);
    const routeCandidate = rawPath || hash;

    if (routeCandidate) {
      if (routeCandidate === 'nos-produits' || routeCandidate === 'produits' || routeCandidate === 'products') {
        setCurrentPage('products');
        setCurrentSiloSlug(null);
        setCurrentCitySlug(null);
        return;
      }
      if (SERVICE_SILOS[routeCandidate]) {
        setCurrentSiloSlug(routeCandidate);
        setCurrentCitySlug(null);
        return;
      }
      if (LOCAL_CITY_SILOS[routeCandidate]) {
        setCurrentCitySlug(routeCandidate);
        setCurrentSiloSlug(null);
        return;
      }
    }

    // Default: Home Page
    setCurrentSiloSlug(null);
    setCurrentCitySlug(null);

    // Scroll to section if hash matches a page section
    const sectionMap: Record<string, string> = {
      home: 'accueil',
      accueil: 'accueil',
      services: 'services',
      atouts: 'atouts',
      about: 'a-propos',
      'a-propos': 'a-propos',
      temoignages: 'temoignages',
      zones: 'zones',
      faq: 'faq',
      contact: 'contact',
    };
    const targetId = sectionMap[hash];
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  }, [checkAdminAuth]);

  useEffect(() => {
    resolveRoute();
    window.addEventListener('popstate', resolveRoute);
    window.addEventListener('hashchange', resolveRoute);
    return () => {
      window.removeEventListener('popstate', resolveRoute);
      window.removeEventListener('hashchange', resolveRoute);
    };
  }, [resolveRoute]);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    setCurrentSiloSlug(null);
    setCurrentCitySlug(null);
    setIsAdminRoute(false);

    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.history.pushState(null, '', `/#${page}`);
    } else {
      window.location.hash = page;
    }

    const sectionMap: Partial<Record<PageType, string>> = {
      home: 'accueil',
      services: 'services',
      about: 'a-propos',
      contact: 'contact',
    };
    const targetId = sectionMap[page];
    setTimeout(() => {
      const el = targetId ? document.getElementById(targetId) : null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleNavigateHome = () => {
    setCurrentSiloSlug(null);
    setCurrentCitySlug(null);
    setIsAdminRoute(false);
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSilo = (slug: string) => {
    setCurrentSiloSlug(slug);
    setCurrentCitySlug(null);
    setIsAdminRoute(false);
    window.history.pushState(null, '', `/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerNotification({
      type: 'info',
      title: 'Page Spécialisée',
      message: `Vous consultez la page dédiée : ${SERVICE_SILOS[slug]?.shortTitle || slug}.`,
    });
  };

  const handleNavigateToCity = (slug: string) => {
    setCurrentCitySlug(slug);
    setCurrentSiloSlug(null);
    setIsAdminRoute(false);
    window.history.pushState(null, '', `/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerNotification({
      type: 'info',
      title: 'Secteur Local',
      message: `Intervention à ${LOCAL_CITY_SILOS[slug]?.cityName || slug} et communes voisines.`,
    });
  };

  const handleOpenQuote = (serviceOrCity?: string) => {
    if (serviceOrCity) {
      setSelectedService(serviceOrCity);
    }

    if (currentSiloSlug || currentCitySlug) {
      setCurrentSiloSlug(null);
      setCurrentCitySlug(null);
      window.history.pushState(null, '', '/#contact');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    triggerNotification({
      type: 'info',
      title: 'Diagnostic gratuit sans engagement',
      message: serviceOrCity 
        ? `Évaluation pour « ${serviceOrCity} ». Réponse rapide garantie.`
        : 'Remplissez le formulaire ci-dessous pour votre diagnostic gratuit et sans engagement.',
    });
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    triggerNotification({
      type: 'info',
      title: 'Prestation sélectionnée',
      message: `La prestation « ${serviceTitle} » est pré-sélectionnée dans votre formulaire de devis.`,
    });
  };

  const handleFormSuccess = () => {
    triggerNotification({
      type: 'success',
      title: 'Demande envoyée avec succès !',
      message: 'Vos informations ont été transmises à notre équipe NOVA CB. Réponse sous 48h.',
    });
  };

  const handleAdminLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    triggerNotification({
      type: 'success',
      title: 'Connexion réussie',
      message: `Bienvenue dans l'espace d'administration NOVA CB.`,
    });
  };

  const handleOpenAdmin = () => {
    setIsAdminRoute(true);
    window.history.pushState(null, '', '/admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    checkAdminAuth();
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    setIsAdminRoute(true);
    window.history.pushState(null, '', '/admin/login');
    triggerNotification({
      type: 'info',
      title: 'Déconnexion effectuée',
      message: 'Votre session d’administration a été fermée en toute sécurité.',
    });
  };

  // If on Admin route, render exclusively the Admin area with dynamic code-splitting
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
        <NotificationToast
          notification={notification}
          onDismiss={() => setNotification(null)}
        />

        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-sky-400">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Chargement de l’espace sécurisé...</span>
              </div>
            </div>
          }
        >
          {adminUser ? (
            <AdminDashboardPage
              user={adminUser}
              onLogout={handleAdminLogout}
              onNavigateHome={handleNavigateHome}
              initialTab={adminInitialTab}
            />
          ) : (
            <AdminLoginPage
              onLoginSuccess={handleAdminLoginSuccess}
              onNavigateHome={handleNavigateHome}
            />
          )}
        </Suspense>
      </div>
    );
  }

  // Render logic for Public Commercial Site
  const activeSilo = currentSiloSlug ? SERVICE_SILOS[currentSiloSlug] : null;
  const activeCity = currentCitySlug ? LOCAL_CITY_SILOS[currentCitySlug] : null;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* Toast Notification */}
      <NotificationToast
        notification={notification}
        onDismiss={() => setNotification(null)}
      />

      {/* Navigation (Strictly public & client-oriented) */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenQuote={() => handleOpenQuote()}
        onNavigateToCity={handleNavigateToCity}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'products' ? (
          <ProductsSolutionsPage
            onOpenQuote={handleOpenQuote}
            onNavigateHome={handleNavigateHome}
          />
        ) : activeSilo ? (
          <ServiceSiloPage
            silo={activeSilo}
            onOpenQuote={handleOpenQuote}
            onNavigateToSilo={handleNavigateToSilo}
            onNavigateToCity={handleNavigateToCity}
            onNavigateHome={handleNavigateHome}
          />
        ) : activeCity ? (
          <LocalCityPage
            city={activeCity}
            onOpenQuote={handleOpenQuote}
            onNavigateToSilo={handleNavigateToSilo}
            onNavigateToCity={handleNavigateToCity}
            onNavigateHome={handleNavigateHome}
          />
        ) : (
          <HomePage
            onNavigate={handleNavigate}
            onOpenQuote={handleOpenQuote}
            onSelectServiceForQuote={handleSelectServiceForQuote}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            onFormSuccess={handleFormSuccess}
            onNavigateToSilo={handleNavigateToSilo}
            onNavigateToCity={handleNavigateToCity}
          />
        )}
      </main>

      {/* Footer (Strictly public & client-oriented) */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuote={() => handleOpenQuote()}
        onNavigateToSilo={handleNavigateToSilo}
        onNavigateToCity={handleNavigateToCity}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Mobile Sticky Quick Contact Floating Bar for Optimal Conversion */}
      <div 
        id="mobile-sticky-quick-action-bar"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 p-2.5 flex items-center gap-2 shadow-2xl"
      >
        <a
          href="tel:0624685217"
          className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 px-3 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-sky-400" />
          <span>06 24 68 52 17</span>
        </a>
        <button
          id="mobile-sticky-quote-btn"
          onClick={() => handleOpenQuote()}
          className="flex-1 bg-sky-500 hover:bg-sky-400 active:scale-95 text-white text-xs font-black py-3 px-3 rounded-xl shadow-lg shadow-sky-500/30 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-100 shrink-0" />
          <span>Diagnostic gratuit</span>
        </button>
      </div>

      {/* Tablet-Only Floating Diagnostic CTA */}
      <div 
        id="tablet-floating-quote-container"
        className="hidden sm:max-lg:flex fixed bottom-6 right-6 z-40 items-center animate-in fade-in slide-in-from-bottom-4 duration-300"
      >
        <button
          id="tablet-floating-quote-btn"
          onClick={() => handleOpenQuote()}
          className="bg-sky-500 hover:bg-sky-400 active:scale-95 text-white text-sm font-extrabold px-5 py-3 rounded-full shadow-2xl shadow-sky-500/40 hover:shadow-sky-400/50 flex items-center gap-2.5 transition-all cursor-pointer border-2 border-white/20 backdrop-blur-sm group"
          title="Demander mon diagnostic gratuit"
        >
          <Sparkles className="w-4 h-4 text-sky-100 group-hover:rotate-12 transition-transform" />
          <span className="whitespace-nowrap font-black tracking-wide">Demander mon diagnostic gratuit</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
