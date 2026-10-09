import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Menu, X, ArrowRight, ShieldCheck, Sparkles, Layers, ChevronDown } from 'lucide-react';
import { PageType } from '../types';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenQuote: () => void;
  onNavigateToCity?: (citySlug: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  onOpenQuote,
  onNavigateToCity
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectorDropdownOpen, setSectorDropdownOpen] = useState(false);
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState(false);
  const sectorDropdownRef = useRef<HTMLDivElement>(null);

  const SECTORS = [
    { slug: 'merignac', name: 'Mérignac', code: '33700', badge: 'Siège social' },
    { slug: 'bordeaux', name: 'Bordeaux', code: '33000', badge: 'Centre & Métropole' },
    { slug: 'pessac', name: 'Pessac', code: '33600' },
    { slug: 'talence', name: 'Talence', code: '33400' },
    { slug: 'le-bouscat', name: 'Le Bouscat', code: '33110' },
    { slug: 'bruges', name: 'Bruges', code: '33520' },
    { slug: 'eysines', name: 'Eysines', code: '33320' },
    { slug: 'saint-medard-en-jalles', name: 'St-Médard-en-Jalles', code: '33160' },
    { slug: 'gradignan', name: 'Gradignan', code: '33170' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sectorDropdownRef.current && !sectorDropdownRef.current.contains(event.target as Node)) {
        setSectorDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSectorDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navItems: { label: string; page: PageType }[] = [
    { label: 'Accueil', page: 'home' },
    { label: 'À propos', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Contact', page: 'contact' },
  ];

  const sectionMap: Partial<Record<PageType, string>> = {
    home: 'accueil',
    about: 'a-propos',
    services: 'services',
    contact: 'contact',
  };

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setSectorDropdownOpen(false);
    const targetId = sectionMap[page];
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCity = (slug: string) => {
    setSectorDropdownOpen(false);
    if (onNavigateToCity) {
      onNavigateToCity(slug);
    } else {
      window.history.pushState(null, '', `/${slug}`);
      window.location.hash = slug;
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAllZones = () => {
    setSectorDropdownOpen(false);
    onNavigate('home');
    setTimeout(() => {
      const el = document.getElementById('zones');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div id="top-announcement-bar" className="bg-slate-950 text-slate-400 text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="flex items-center gap-1.5 text-sky-400 font-medium text-[11px] sm:text-xs">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Nettoyage & Rénovation Extérieure • Mérignac & Gironde (33)</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            <a 
              href="mailto:nova.entretien33@outlook.fr" 
              className="bg-slate-900/90 hover:bg-slate-800 text-sky-300 hover:text-white font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs border border-slate-700/80 hover:border-sky-400 transition-all flex items-center gap-1.5 whitespace-nowrap shadow-sm"
              title="Envoyer un email à NOVA CB"
            >
              <Mail className="w-3 h-3 text-sky-400 shrink-0" />
              <span className="hidden sm:inline font-semibold tracking-wide">nova.entretien33@outlook.fr</span>
              <span className="sm:hidden font-semibold">Email</span>
            </a>
            <a 
              href="tel:0624685217" 
              className="bg-sky-500 hover:bg-sky-400 text-white hover:text-white font-extrabold px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs shadow-md shadow-sky-500/25 hover:shadow-sky-400/40 flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all"
              title="Appeler directement NOVA CB"
            >
              <Phone className="w-3 h-3 text-white shrink-0" />
              <span className="whitespace-nowrap font-black tracking-wider text-white">06 24 68 52 17</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating pill-style modern navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-5'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <nav 
            id="main-floating-navbar" 
            className="bg-[#0c1630]/95 backdrop-blur-xl border border-sky-900/50 rounded-full px-3.5 sm:px-6 py-2 sm:py-2.5 shadow-2xl shadow-slate-950/40 flex items-center justify-between text-white gap-2 sm:gap-4 relative"
          >
            {/* Left section: Mobile menu toggle + Brand Logo */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Mobile menu button */}
              <button
                id="mobile-menu-toggle-button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                aria-label="Ouvrir le menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Brand Logo: Uniquement NOVA CB sans encadré bleu */}
              <button 
                id="brand-logo-button"
                onClick={() => handleNavClick('home')}
                className="flex items-center text-left group cursor-pointer focus:outline-none shrink-0 py-1"
              >
                <span className="font-black text-base sm:text-lg lg:text-xl tracking-tight text-white uppercase transition-colors group-hover:text-sky-400">
                  NOVA CB
                </span>
              </button>
            </div>

            {/* Center section: Desktop Navigation Links centered on the bandeau */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-2 lg:mx-4">
              <div className="flex items-center space-x-1 lg:space-x-1.5 bg-[#080f22]/90 p-1 rounded-full border border-sky-900/40 shadow-inner">
                {navItems.map((item) => {
                  const isActive = currentPage === item.page;
                  return (
                    <button
                      key={item.page}
                      id={`nav-link-${item.page}`}
                      onClick={() => handleNavClick(item.page)}
                      className={`px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                          : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}

                {/* Secteur d'intervention Dropdown Button inside the banner */}
                <div className="relative" ref={sectorDropdownRef}>
                  <button
                    id="nav-link-secteur-intervention"
                    onClick={() => setSectorDropdownOpen(!sectorDropdownOpen)}
                    className={`px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      sectorDropdownOpen
                        ? 'bg-slate-700 text-white shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                    }`}
                    aria-expanded={sectorDropdownOpen}
                    aria-haspopup="true"
                  >
                    <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Secteur d'intervention</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${sectorDropdownOpen ? 'rotate-180 text-sky-400' : 'text-slate-400'}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {sectorDropdownOpen && (
                    <div
                      id="sector-dropdown-menu"
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 sm:w-96 bg-[#0c1630]/98 backdrop-blur-2xl border border-sky-900/70 rounded-2xl p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                          <MapPin className="w-3.5 h-3.5 text-sky-400" />
                          <span>Villes & Communes (Gironde 33)</span>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                          Sans frais de déplacement
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 py-2 max-h-64 overflow-y-auto">
                        {SECTORS.map((city) => (
                          <button
                            key={city.slug}
                            id={`dropdown-city-${city.slug}`}
                            onClick={() => handleSelectCity(city.slug)}
                            className="flex flex-col text-left px-3 py-2 rounded-xl hover:bg-slate-800/90 transition-colors group cursor-pointer border border-transparent hover:border-slate-700"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">
                                {city.name}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {city.code}
                              </span>
                            </div>
                            {city.badge && (
                              <span className="text-[10px] text-sky-400/90 font-medium mt-0.5">
                                {city.badge}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between px-2">
                        <button
                          id="dropdown-all-zones-link"
                          onClick={handleAllZones}
                          className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                        >
                          <span>Voir toute la zone Gironde (33)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right section: Phone & Quote CTA Button - Centered vertically & fully visible */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Full phone on sm+ screens */}
              <a
                id="header-phone-cta"
                href="tel:0624685217"
                className="hidden sm:flex items-center gap-2 text-xs sm:text-sm font-black text-white bg-slate-800/95 hover:bg-slate-800 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border-2 border-sky-500 hover:border-sky-400 whitespace-nowrap shrink-0 shadow-md shadow-sky-500/15 transition-all hover:scale-102"
                title="Téléphoner à NOVA CB au 06 24 68 52 17"
              >
                <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-3 h-3 text-white" />
                </div>
                <span className="whitespace-nowrap tracking-wide font-black text-white">06 24 68 52 17</span>
              </a>

              {/* On mobile: Quick direct call badge that fits naturally in the navbar */}
              <a
                id="header-mobile-phone-cta"
                href="tel:0624685217"
                className="sm:hidden flex items-center gap-1.5 bg-slate-800/90 border border-sky-500/80 text-white px-2.5 py-1.5 rounded-full text-xs font-bold shadow-sm"
                title="Appeler le 06 24 68 52 17"
              >
                <div className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="font-black text-[11px] text-white tracking-tight">06 24 68 52 17</span>
              </a>

              {/* Centered, highly visible Diagnostic CTA button - VISIBLE ON DESKTOP */}
              <button
                id="header-quote-cta-btn"
                onClick={onOpenQuote}
                className="hidden lg:flex items-center justify-center gap-1.5 bg-sky-500 hover:bg-sky-400 active:scale-95 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-full shadow-lg shadow-sky-500/30 hover:shadow-sky-400/50 transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0 border border-sky-400/40"
              >
                <span className="whitespace-nowrap">Demander mon diagnostic gratuit</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              </button>
            </div>
          </nav>

          {/* Mobile dropdown menu */}
          {mobileMenuOpen && (
            <div 
              id="mobile-navigation-dropdown"
              className="md:hidden mt-2 bg-[#0c1630]/98 backdrop-blur-2xl border border-sky-900/70 rounded-3xl p-4 shadow-2xl text-white space-y-3 animate-in fade-in slide-in-from-top-3 duration-200"
            >
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.page}
                    id={`mobile-nav-${item.page}`}
                    onClick={() => handleNavClick(item.page)}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                      currentPage === item.page
                        ? 'bg-sky-500 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                {/* Mobile Secteur d'intervention Accordion */}
                <div className="border-t border-slate-800/80 pt-1 mt-1">
                  <button
                    id="mobile-nav-secteurs-btn"
                    onClick={() => setMobileSectorsOpen(!mobileSectorsOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sky-400" />
                      <span>Secteur d'intervention (33)</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSectorsOpen ? 'rotate-180 text-sky-400' : 'text-slate-400'}`} />
                  </button>

                  {mobileSectorsOpen && (
                    <div className="grid grid-cols-2 gap-1.5 px-2 pb-2 pt-1 animate-in fade-in duration-150">
                      {SECTORS.map((city) => (
                        <button
                          key={city.slug}
                          id={`mobile-city-${city.slug}`}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            handleSelectCity(city.slug);
                          }}
                          className="text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-between border border-slate-800/60"
                        >
                          <span>{city.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{city.code}</span>
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleAllZones();
                        }}
                        className="col-span-2 text-left px-3 py-2 rounded-xl text-xs font-bold text-sky-400 hover:bg-slate-800 transition-colors flex items-center justify-between mt-1"
                      >
                        <span>Voir toute la zone Gironde (33)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Prominent Mobile Quote CTA inside the mobile menu */}
              <div className="pt-2">
                <button
                  id="mobile-menu-quote-cta-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-sm shadow-lg shadow-sky-500/30 active:scale-98 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-sky-100" />
                  <span>Demander mon diagnostic gratuit</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2.5">
                <a
                  href="tel:0624685217"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-black text-sm shadow-md shadow-sky-500/30 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-sky-100 font-semibold leading-none">Appel direct 7j/7</div>
                    <span className="text-base font-black tracking-wider">06 24 68 52 17</span>
                  </div>
                </a>
                <a
                  href="mailto:nova.entretien33@outlook.fr"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-white hover:border-sky-400 transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-700 text-sky-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium leading-none">Email direct</div>
                    <span className="text-xs font-bold text-sky-300 truncate block">nova.entretien33@outlook.fr</span>
                  </div>
                </a>
                <div className="flex items-center gap-3 px-4 py-1.5 text-slate-400 text-xs">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>33 avenue Léon Blum, 33700 Mérignac</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
