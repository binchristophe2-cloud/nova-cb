import { SeoKeywordItem, ServiceSilo, LocalCitySilo, KeywordIntent, KeywordPriority, KeywordStatus } from '../types';
import { SERVICE_SILOS, LOCAL_CITY_SILOS } from '../data/silosData';

export interface SiloOpportunity {
  id: string;
  keyword: string;
  intent: KeywordIntent;
  priority: KeywordPriority;
  targetPage: string;
  slug: string;
  title: string;
  h1: string;
  cta: string;
  serviceType: string;
  geo: string;
  level: 'Niveau 1 (Silo Pilier)' | 'Niveau 2 (Sous-silo)' | 'Niveau 3 (Ultra-ciblé / Local)';
  rationale: string;
  recommendedAction: 'Créer' | 'Renforcer' | 'Optimiser' | 'Associer';
  selected?: boolean;
}

export interface InternalMeshLink {
  sourceTitle: string;
  sourceSlug: string;
  targetTitle: string;
  targetSlug: string;
  anchorText: string;
  relationshipType: 'Silo vers Sous-silo' | 'Sous-silo vers Pilier' | 'Transversal complémentaire' | 'Ancrage local vers Prestation';
  status: 'Actif' | 'Recommandé';
}

export interface SiloFeedingAnalysis {
  siloKey: string;
  siloName: string;
  siloCategory: string;
  mainSlug: string;
  overallScore: number; // 0-100
  scoreLabel: 'Faible' | 'Moyen' | 'Bon' | 'Optimal';
  existingKeywordsCount: number;
  opportunitiesCount: number;
  cannibalizationRisks: {
    keyword: string;
    conflictingPages: string[];
    riskLevel: 'Faible' | 'Modéré' | 'Élevé';
    solution: string;
  }[];
  contentGaps: {
    category: string;
    description: string;
    impact: 'Fort' | 'Moyen';
  }[];
  meshLinks: InternalMeshLink[];
  opportunities: SiloOpportunity[];
}

/**
 * Normalizes keyword string for duplicate and conflict detection
 */
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Analyzes a specific SEO silo against existing matrix keywords and website data
 */
export function analyzeSiloFeeding(siloKey: string, currentMatrix: SeoKeywordItem[]): SiloFeedingAnalysis {
  const serviceSilo = SERVICE_SILOS[siloKey];
  const allServiceKeys = Object.keys(SERVICE_SILOS);
  const cities = Object.values(LOCAL_CITY_SILOS);

  let siloName = '';
  let siloCategory = '';
  let mainSlug = '';

  if (serviceSilo) {
    siloName = serviceSilo.shortTitle || serviceSilo.title;
    siloCategory = serviceSilo.category;
    mainSlug = `/${serviceSilo.slug}`;
  } else {
    // If it's a category or generic name
    siloName = siloKey;
    siloCategory = siloKey;
    mainSlug = `/${siloKey.toLowerCase().replace(/\s+/g, '-')}`;
  }

  // 1. Identify existing keywords related to this silo
  const existingSiloKeywords = currentMatrix.filter(k => {
    const normKw = normalizeString(k.keyword);
    const normTarget = normalizeString(k.targetPage);
    const normSlug = normalizeString(k.slug);
    const normSilo = normalizeString(siloName);
    const normCat = normalizeString(siloCategory);
    
    return (
      k.serviceType.toLowerCase() === siloCategory.toLowerCase() ||
      normKw.includes(normSilo) ||
      normTarget.includes(normSilo) ||
      normSlug.includes(normSilo) ||
      (serviceSilo && normSlug.includes(serviceSilo.slug))
    );
  });

  const existingNormalizedKeywords = new Set(currentMatrix.map(k => normalizeString(k.keyword)));

  // 2. Generate prospective keyword opportunities based on semantic trees & levels
  const rawOpportunities: SiloOpportunity[] = [];

  if (siloKey === 'nettoyage-terrasse' || siloCategory === 'Terrasses') {
    const ideas = [
      {
        kw: 'nettoyage terrasse cloche rotative sans eclaboussure',
        intent: 'commerciale' as KeywordIntent,
        priority: 'P1 - Forte' as KeywordPriority,
        target: 'Nettoyage Terrasse Professionnel',
        slug: '/nettoyage-terrasse',
        title: 'Nettoyage Terrasse Cloche Rotative Industrielle | NOVA CB',
        h1: 'Nettoyage de terrasse sans projection à la cloche rotative',
        cta: 'Demander un devis terrasse',
        geo: 'Gironde',
        level: 'Niveau 1 (Silo Pilier)' as const,
        rationale: 'Recherche d’expertise technique différenciante (cloche carénée pro).',
        action: 'Renforcer' as const,
      },
      {
        kw: 'degraissage terrasse dalle beton desactive bordeaux',
        intent: 'commerciale' as KeywordIntent,
        priority: 'P2 - Moyenne' as KeywordPriority,
        target: 'Terrasse Béton',
        slug: '/nettoyage-terrasse-beton',
        title: 'Dégraissage et Nettoyage Béton Désactivé Bordeaux | NOVA CB',
        h1: 'Dégraissage et décapage de terrasse en béton désactivé',
        cta: 'Obtenir un tarif pour mon béton désactivé',
        geo: 'Bordeaux',
        level: 'Niveau 2 (Sous-silo)' as const,
        rationale: 'Requête spécifique matériau (béton désactivé) à fort pouvoir d’achat.',
        action: 'Créer' as const,
      },
      {
        kw: 'eliminer voile vert glissant terrasse bois merignac',
        intent: 'commerciale' as KeywordIntent,
        priority: 'P1 - Forte' as KeywordPriority,
        target: 'Terrasse Bois',
        slug: '/nettoyage-terrasse-bois',
        title: 'Éliminer le Voile Vert Glissant Terrasse Bois Mérignac | NOVA CB',
        h1: 'Suppression définitive des lichens et glissades sur terrasse bois',
        cta: 'Sécuriser ma terrasse bois',
        geo: 'Mérignac',
        level: 'Niveau 3 (Ultra-ciblé / Local)' as const,
        rationale: 'Problème de sécurité récurrent à l’automne/printemps à Mérignac.',
        action: 'Créer' as const,
      },
      {
        kw: 'entretien annuel terrasse composite pessac',
        intent: 'transactionnelle' as KeywordIntent,
        priority: 'P2 - Moyenne' as KeywordPriority,
        target: 'Entretien Terrasse',
        slug: '/entretien-terrasse',
        title: 'Entretien Annuel Terrasse Composite Pessac | Contrat NOVA CB',
        h1: 'Contrat d’entretien régulier de terrasse composite à Pessac',
        cta: 'Souscrire un passage annuel',
        geo: 'Pessac',
        level: 'Niveau 2 (Sous-silo)' as const,
        rationale: 'Fidélisation client et récurrence de chiffre d’affaires en contrat.',
        action: 'Créer' as const,
      },
      {
        kw: 'nettoyage margelle piscine travertin sans produit corrosif',
        intent: 'commerciale' as KeywordIntent,
        priority: 'P1 - Forte' as KeywordPriority,
        target: 'Terrasse Pierre',
        slug: '/nettoyage-terrasse-pierre',
        title: 'Nettoyage Margelle et Plage Piscine Travertin | NOVA CB',
        h1: 'Lavage doux de margelle piscine en travertin sans javel',
        cta: 'Demander un devis piscine',
        geo: 'Gironde',
        level: 'Niveau 3 (Ultra-ciblé / Local)' as const,
        rationale: 'Demande estivale très lucrative sur les plages de piscine haut de gamme.',
        action: 'Créer' as const,
      },
      {
        kw: 'prix renovateur saturateur terrasse bois au m2 gironde',
        intent: 'transactionnelle' as KeywordIntent,
        priority: 'P2 - Moyenne' as KeywordPriority,
        target: 'Dégrisage Bois',
        slug: '/degrisement-bois',
        title: 'Prix Dégrisage et Saturateur Terrasse Bois au m² | NOVA CB',
        h1: 'Barème tarifaire au m² pour dégriser et saturer une terrasse bois',
        cta: 'Estimer mon coût au m²',
        geo: 'Gironde',
        level: 'Niveau 2 (Sous-silo)' as const,
        rationale: 'Recherche transactionnelle avec intention immédiate de commande.',
        action: 'Créer' as const,
      }
    ];

    ideas.forEach((item, idx) => {
      rawOpportunities.push({
        id: `opp-${siloKey}-${idx + 1}`,
        keyword: item.kw,
        intent: item.intent,
        priority: item.priority,
        targetPage: item.target,
        slug: item.slug,
        title: item.title,
        h1: item.h1,
        cta: item.cta,
        serviceType: 'Terrasses',
        geo: item.geo,
        level: item.level,
        rationale: item.rationale,
        recommendedAction: item.action,
        selected: true,
      });
    });
  } else if (siloKey === 'nettoyage-demoussage-toiture' || siloCategory === 'Toitures') {
    const ideas = [
      {
        kw: 'demoussage toiture basse pression sans jet destructeur merignac 33700',
        intent: 'commerciale' as KeywordIntent,
        priority: 'P1 - Forte' as KeywordPriority,
        target: 'Démoussage & Nettoyage Toiture',
        slug: '/nettoyage-demoussage-toiture',
        title: 'Démoussage Toiture Basse Pression Mérignac 33700 | NOVA CB',
        h1: 'Démoussage toiture sans nettoyeur haute pression direct à Mérignac',
        cta: 'Obtenir mon diagnostic toiture gratuit 48h',
        geo: 'Mérignac',
        level: 'Niveau 1 (Silo Pilier)' as const,
        rationale: 'Requête stratégique réassurante sur la préservation des tuiles canal/romanes.',
        action: 'Renforcer' as const,
      },
      {
        kw: 'nettoyage debouchage gouttiere zinc et cheneaux bordeaux',
        intent: 'commerciale' as KeywordIntent,
        priority: 'P2 - Moyenne' as KeywordPriority,
        target: 'Démoussage & Nettoyage Toiture',
        slug: '/nettoyage-demoussage-toiture',
        title: 'Débouchage Gouttières Zinc et Chéneaux Bordeaux | NOVA CB',
        h1: 'Nettoyage et vidage de chéneaux et gouttières à Bordeaux',
        cta: 'Demander un devis toiture et gouttières',
        geo: 'Bordeaux',
        level: 'Niveau 2 (Sous-silo)' as const,
        rationale: 'Service complémentaire indispensable pour éviter les infiltrations d’eaux pluviales.',
        action: 'Créer' as const,
      },
      {
        kw: 'traitement biocide curatif lichen incruste toiture tuile romane',
        intent: 'commerciale' as KeywordIntent,
        priority: 'P1 - Forte' as KeywordPriority,
        target: 'Traitement Anti-Mousse',
        slug: '/traitement-anti-mousse',
        title: 'Traitement Biocide Toiture Lichens Incrustés Gironde | NOVA CB',
        h1: 'Élimination des lichens incrustés sur tuiles romanes par biocide rémanent',
        cta: 'Assainir mes tuiles durablement',
        geo: 'Gironde',
        level: 'Niveau 2 (Sous-silo)' as const,
        rationale: 'Forte valeur technique : solutionne les lichens blancs et jaunes impossibles à rincer à l’eau.',
        action: 'Créer' as const,
      },
      {
        kw: 'tarif demoussage toiture 100m2 merignac devis gratuit',
        intent: 'transactionnelle' as KeywordIntent,
        priority: 'P1 - Forte' as KeywordPriority,
        target: 'Démoussage & Nettoyage Toiture',
        slug: '/nettoyage-demoussage-toiture',
        title: 'Tarif Démoussage Toiture 100m² Mérignac | Devis 48h NOVA CB',
        h1: 'Prix pour le nettoyage et démoussage d’une toiture de 100m² à Mérignac',
        cta: 'Calculer mon devis 100m²',
        geo: 'Mérignac',
        level: 'Niveau 3 (Ultra-ciblé / Local)' as const,
        rationale: 'Volume de recherche très qualifié avec superficie type d’un pavillon mérignacais.',
        action: 'Créer' as const,
      }
    ];

    ideas.forEach((item, idx) => {
      rawOpportunities.push({
        id: `opp-${siloKey}-${idx + 1}`,
        keyword: item.kw,
        intent: item.intent,
        priority: item.priority,
        targetPage: item.target,
        slug: item.slug,
        title: item.title,
        h1: item.h1,
        cta: item.cta,
        serviceType: 'Toitures',
        geo: item.geo,
        level: item.level,
        rationale: item.rationale,
        recommendedAction: item.action,
        selected: true,
      });
    });
  } else if (siloKey === 'nettoyage-mur-exterieur' || siloCategory === 'Murs & Façades') {
    const ideas = [
      {
        kw: 'nettoyage muret cloture crepi noirci bordeaux metropole',
        intent: 'commerciale' as KeywordIntent,
        priority: 'P1 - Forte' as KeywordPriority,
        target: 'Murs Extérieurs',
        slug: '/nettoyage-mur-exterieur',
        title: 'Nettoyage Muret Clôture Crépi Bordeaux Métropole | NOVA CB',
        h1: 'Lavage softwash de murets de clôture et piliers de portail',
        cta: 'Devis rapide muret de clôture',
        geo: 'Bordeaux',
        level: 'Niveau 2 (Sous-silo)' as const,
        rationale: 'Les murets de clôture noircissent 2x plus vite que les façades en bord de route.',
        action: 'Créer' as const,
      },
      {
        kw: 'enlever traces rouges algues trentepohlia facade crepi gironde',
        intent: 'informationnelle' as KeywordIntent,
        priority: 'P2 - Moyenne' as KeywordPriority,
        target: 'Murs Extérieurs',
        slug: '/nettoyage-mur-exterieur',
        title: 'Éliminer les Traces Rouges sur Façade Crépi | Guide NOVA CB',
        h1: 'Comment traiter les coulures rouges d’algues trentepohlia sur crépi',
        cta: 'Demander un diagnostic façade',
        geo: 'Gironde',
        level: 'Niveau 3 (Ultra-ciblé / Local)' as const,
        rationale: 'Forte recherche informationnelle se convertissant en demande de softwash professionnel.',
        action: 'Créer' as const,
      },
      {
        kw: 'softwash facade crepi sans abimer enduit merignac',
        intent: 'commerciale' as KeywordIntent,
        priority: 'P1 - Forte' as KeywordPriority,
        target: 'Murs Extérieurs',
        slug: '/nettoyage-mur-exterieur',
        title: 'Nettoyage Softwash Façade Crépi Mérignac | Artisan NOVA CB',
        h1: 'Méthode Softwash douce pour façades crépies sans arracher le grain',
        cta: 'Demander mon devis façade doux',
        geo: 'Mérignac',
        level: 'Niveau 1 (Silo Pilier)' as const,
        rationale: 'Argument technique rassurant face aux façadiers industriels trop agressifs.',
        action: 'Renforcer' as const,
      }
    ];

    ideas.forEach((item, idx) => {
      rawOpportunities.push({
        id: `opp-${siloKey}-${idx + 1}`,
        keyword: item.kw,
        intent: item.intent,
        priority: item.priority,
        targetPage: item.target,
        slug: item.slug,
        title: item.title,
        h1: item.h1,
        cta: item.cta,
        serviceType: 'Murs & Façades',
        geo: item.geo,
        level: item.level,
        rationale: item.rationale,
        recommendedAction: item.action,
        selected: true,
      });
    });
  } else {
    // Generic generator for other silos (Traitements, Bois, Entretien)
    const citiesToPick = ['Mérignac', 'Bordeaux', 'Pessac', 'Gironde'];
    citiesToPick.forEach((cityName, idx) => {
      rawOpportunities.push({
        id: `opp-${siloKey}-${idx + 1}`,
        keyword: `${siloKey.replace(/-/g, ' ')} ${cityName.toLowerCase()} artisan professionnel`,
        intent: idx % 2 === 0 ? 'commerciale' : 'transactionnelle',
        priority: idx === 0 ? 'P1 - Forte' : 'P2 - Moyenne',
        targetPage: siloName,
        slug: mainSlug,
        title: `${siloName} ${cityName} | Artisan NOVA CB`,
        h1: `${siloName} à ${cityName} : Intervention garantie & Devis 48h`,
        cta: `Demander mon devis à ${cityName}`,
        serviceType: siloCategory,
        geo: cityName,
        level: idx === 0 ? 'Niveau 1 (Silo Pilier)' : 'Niveau 3 (Ultra-ciblé / Local)',
        rationale: `Renforcement du maillage territorial sur ${cityName}.`,
        recommendedAction: 'Créer',
        selected: true,
      });
    });
  }

  // 3. Filter out any opportunities that already strictly exist in the matrix (anti-duplicate)
  const opportunities = rawOpportunities.map(opp => {
    const isAlreadyPresent = existingNormalizedKeywords.has(normalizeString(opp.keyword));
    return {
      ...opp,
      recommendedAction: isAlreadyPresent ? ('Optimiser' as const) : opp.recommendedAction,
    };
  });

  // 4. Detect Cannibalization Risks
  const cannibalizationRisks: SiloFeedingAnalysis['cannibalizationRisks'] = [];
  const keywordMap: Record<string, string[]> = {};

  currentMatrix.forEach(item => {
    const words = normalizeString(item.keyword).split(' ').filter(w => w.length > 3);
    const root = words.slice(0, 2).join(' ');
    if (root) {
      if (!keywordMap[root]) keywordMap[root] = [];
      if (!keywordMap[root].includes(item.targetPage)) {
        keywordMap[root].push(item.targetPage);
      }
    }
  });

  Object.entries(keywordMap).forEach(([root, pages]) => {
    if (pages.length > 1 && root.includes(normalizeString(siloCategory).slice(0, 4))) {
      cannibalizationRisks.push({
        keyword: root,
        conflictingPages: pages,
        riskLevel: pages.length > 2 ? 'Élevé' : 'Modéré',
        solution: `Attribuer l'intention principale à la page ${pages[0]} et repositionner ${pages.slice(1).join(', ')} sur des variantes longue traîne spécifiques.`,
      });
    }
  });

  // 5. Internal Mesh Links (Maillage Interne Siloté)
  const meshLinks: InternalMeshLink[] = [];

  if (serviceSilo) {
    // Links to sub-silos and related silos
    serviceSilo.relatedSilos.forEach(rel => {
      meshLinks.push({
        sourceTitle: serviceSilo.shortTitle,
        sourceSlug: `/${serviceSilo.slug}`,
        targetTitle: rel.title,
        targetSlug: `/${rel.slug}`,
        anchorText: `Découvrir notre prestation ${rel.title.toLowerCase()}`,
        relationshipType: 'Silo vers Sous-silo',
        status: 'Actif',
      });
    });

    // Local landing pages linking back to this main silo
    cities.slice(0, 3).forEach(city => {
      meshLinks.push({
        sourceTitle: `${city.cityName} (Local)`,
        sourceSlug: `/${city.slug}`,
        targetTitle: serviceSilo.shortTitle,
        targetSlug: `/${serviceSilo.slug}`,
        anchorText: `${serviceSilo.shortTitle.toLowerCase()} à ${city.cityName}`,
        relationshipType: 'Ancrage local vers Prestation',
        status: 'Actif',
      });
    });

    // Recommended new cross-links
    if (siloCategory === 'Terrasses') {
      meshLinks.push({
        sourceTitle: 'Nettoyage Terrasse Pro',
        sourceSlug: '/nettoyage-terrasse',
        targetTitle: 'Traitement Anti-Mousse',
        targetSlug: '/traitement-anti-mousse',
        anchorText: 'traitement assainissant rémanent anti-mousse',
        relationshipType: 'Transversal complémentaire',
        status: 'Recommandé',
      });
    } else if (siloCategory === 'Toitures') {
      meshLinks.push({
        sourceTitle: 'Démoussage & Nettoyage Toiture',
        sourceSlug: '/nettoyage-demoussage-toiture',
        targetTitle: 'Nettoyage Façades & Murs',
        targetSlug: '/nettoyage-mur-exterieur',
        anchorText: 'nettoyage doux de vos façades et murets',
        relationshipType: 'Transversal complémentaire',
        status: 'Recommandé',
      });
    }
  }

  // 6. Content Gaps
  const contentGaps: SiloFeedingAnalysis['contentGaps'] = [];
  const p1Count = existingSiloKeywords.filter(k => k.priority === 'P1 - Forte').length;
  const p3Count = existingSiloKeywords.filter(k => k.priority === 'P3 - Longue traîne').length;
  const localCount = existingSiloKeywords.filter(k => k.intent === 'locale').length;

  if (p1Count < 4) {
    contentGaps.push({
      category: 'Requêtes Piliers P1',
      description: 'Ce silo manque de requêtes phares à fort volume commercial pour dominer la SERP en Gironde.',
      impact: 'Fort',
    });
  }

  if (p3Count < 3) {
    contentGaps.push({
      category: 'Mots-clés Longue Traîne (P3)',
      description: 'Densifier les requêtes ultra-spécifiques (types de salissures, matériaux précis, cas d’usage sans javel).',
      impact: 'Moyen',
    });
  }

  if (localCount < 4) {
    contentGaps.push({
      category: 'Maillage Communes Gironde',
      description: 'Créer des liens explicites avec les pages satellites de Bordeaux Métropole (Mérignac, Pessac, Talence, Le Bouscat).',
      impact: 'Fort',
    });
  }

  // 7. Calculate Silo Feeding Score (0 - 100)
  // Metrics:
  // - Keyword coverage (max 35 pts)
  // - Priority balance P1/P2/P3 (max 25 pts)
  // - Internal mesh completeness (max 20 pts)
  // - Absence of heavy cannibalization (max 20 pts)
  let score = 0;
  
  // Keyword count score
  score += Math.min(35, existingSiloKeywords.length * 5);

  // Intent variety score
  const intentsCovered = new Set(existingSiloKeywords.map(k => k.intent)).size;
  score += Math.min(25, intentsCovered * 8);

  // Mesh score
  score += Math.min(20, meshLinks.length * 3);

  // Deduct cannibalization penalty
  const highRiskCount = cannibalizationRisks.filter(c => c.riskLevel === 'Élevé').length;
  const penalty = highRiskCount * 8;
  score = Math.max(10, Math.min(100, score - penalty + 15));

  let scoreLabel: SiloFeedingAnalysis['scoreLabel'] = 'Faible';
  if (score >= 80) scoreLabel = 'Optimal';
  else if (score >= 65) scoreLabel = 'Bon';
  else if (score >= 45) scoreLabel = 'Moyen';

  return {
    siloKey,
    siloName,
    siloCategory,
    mainSlug,
    overallScore: Math.round(score),
    scoreLabel,
    existingKeywordsCount: existingSiloKeywords.length,
    opportunitiesCount: opportunities.length,
    cannibalizationRisks,
    contentGaps,
    meshLinks,
    opportunities,
  };
}
