import React, { useEffect } from 'react';
import { FaqItem } from '../types';

interface BreadcrumbEntry {
  name: string;
  url: string;
}

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  breadcrumbs?: BreadcrumbEntry[];
  faqs?: FaqItem[];
  serviceData?: {
    name: string;
    description: string;
    providerName?: string;
    areaServed?: string[];
  };
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalUrl,
  breadcrumbs,
  faqs,
  serviceData,
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update or Create Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update or Create OG Tags
    const ogTags: Record<string, string> = {
      'og:title': title,
      'og:description': description,
      'og:type': 'website',
      'og:url': canonicalUrl || window.location.href,
      'og:locale': 'fr_FR',
      'og:site_name': 'NOVA CB',
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', property);
        document.head.appendChild(ogMeta);
      }
      ogMeta.setAttribute('content', content);
    });

    // 4. Update Canonical Link
    const fullCanonical = canonicalUrl || window.location.origin + window.location.pathname;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonical);

    // 5. Injected Structured Data (JSON-LD)
    const scriptId = 'nova-dynamic-json-ld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const schemas: any[] = [];

    // LocalBusiness Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      name: 'NOVA CB',
      alternateName: 'NOVA CB Toiture & Extérieur',
      description: 'Entreprise artisanale spécialisée dans le démoussage et nettoyage de toiture à basse pression, le décapage de terrasse par cloche rotative et le nettoyage de façades à Mérignac, Bordeaux et en Gironde.',
      url: window.location.origin,
      telephone: '+33624685217',
      email: 'nova.entretien33@outlook.fr',
      priceRange: '€€',
      image: `${window.location.origin}/assets/patio_rotary_cleaner_stone.jpg`,
      knowsAbout: [
        'Démoussage toiture Mérignac',
        'Démoussage toiture Bordeaux',
        'Nettoyage toiture Mérignac devis',
        'Entreprise nettoyage toiture Bordeaux',
        'Traitement anti-mousse toiture tuiles et ardoises',
        'Nettoyage terrasse cloche rotative sans projection',
        'Nettoyage façade basse pression softwash'
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '33 avenue Léon Blum',
        addressLocality: 'Mérignac',
        postalCode: '33700',
        addressRegion: 'Gironde',
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 44.8386,
        longitude: -0.6433,
      },
      areaServed: [
        'Mérignac',
        'Bordeaux',
        'Pessac',
        'Talence',
        'Le Bouscat',
        'Bruges',
        'Eysines',
        'Saint-Médard-en-Jalles',
        'Gradignan',
        'Gironde',
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '19:00',
        },
      ],
    });

    // WebSite Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'NOVA CB',
      url: window.location.origin,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${window.location.origin}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });

    // BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      });
    }

    // FAQPage Schema
    if (faqs && faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }

    // Service Schema
    if (serviceData) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: serviceData.name,
        description: serviceData.description,
        provider: {
          '@type': 'LocalBusiness',
          name: serviceData.providerName || 'NOVA CB',
          telephone: '+33624685217',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '33 avenue Léon Blum',
            addressLocality: 'Mérignac',
            postalCode: '33700',
            addressCountry: 'FR',
          },
        },
        areaServed: (serviceData.areaServed || ['Mérignac', 'Bordeaux Métropole', 'Gironde']).map((area) => ({
          '@type': 'AdministrativeArea',
          name: area,
        })),
      });
    }

    scriptEl.textContent = JSON.stringify(schemas, null, 2);

    return () => {
      // Optional cleanup on unmount
    };
  }, [title, description, canonicalUrl, breadcrumbs, faqs, serviceData]);

  return null;
};
