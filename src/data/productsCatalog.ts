export interface ProductItem {
  id: string;
  name: string; // Nom interne admin / fiche fabricant
  publicTitle: string; // Nom générique public sans marque
  brand: string; // Réservé mode administrateur
  category: 'Toitures' | 'Façades & Murs' | 'Terrasses' | 'Traitements & Spécifiques';
  supports: string[];
  usage: string;
  description: string;
  dilution: string;
  yieldM2: string; // ex: '5 à 8 m²/L'
  applicationMethod: string;
  actionTime: string;
  precautions: string;
  isEcocert: boolean;
  isNaturalOrigin: boolean;
  isMadeInFrance: boolean;
  officialUrl?: string; // Fiche fabricant réservée admin
  active: boolean;
  verificationStatus: 'Oui' | 'Non' | 'À vérifier';
  verificationDate: string;
  purchasePriceHT?: number; // Prix achat HT conditionnement (réservé admin)
  packagingSize?: string; // ex: '5 L' ou '20 L'
  costPerM2HT?: number; // Coût produit estimé au m²
}

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: 'toiture-demoussant-eco',
    name: 'Bionetal Démoussant Toiture & Matériaux',
    publicTitle: 'Solution de Démoussage Toiture & Matériaux',
    brand: 'Bionetal',
    category: 'Toitures',
    supports: ['Tuiles terre cuite', 'Tuiles béton', 'Ardoises naturelles', 'Zinc', 'Fibrociment sans amiante'],
    usage: 'Élimination curative et préventive des dépôts verts, mousses, lichens et micro-algues sur couvertures de toiture.',
    description: 'Solution aqueuse concentrée formulée à base d’ingrédients d’origine naturelle. Formule sans chlore, sans javel, sans acides agressifs et sans ammoniums quaternaires. Respecte la porosité et l’étanchéité des tuiles.',
    dilution: 'Concentré pur ou dilué selon encrassement (1 volume pour 2 à 4 volumes d’eau selon prescriptions techniques).',
    yieldM2: '4 à 6 m² / Litre de solution prête à l’emploi',
    applicationMethod: 'Pulvérisation basse pression sans jet direct à haute pression destructeur.',
    actionTime: 'Action rémanente progressive sous l’effet de la pluie et du soleil (résultats optimaux sous 4 à 12 semaines).',
    precautions: 'Ne pas appliquer par temps de pluie imminente (< 24h) ni en plein soleil sur toiture brûlante (> 30°C). Protéger la végétation sensible avant rinçage.',
    isEcocert: true,
    isNaturalOrigin: true,
    isMadeInFrance: true,
    officialUrl: 'https://bionetal.fr',
    active: true,
    verificationStatus: 'Oui',
    verificationDate: '2026-03-15',
    purchasePriceHT: 48.50,
    packagingSize: '5 L',
    costPerM2HT: 0.95,
  },
  {
    id: 'facade-degraissant-eco',
    name: 'Bionetal Nettoyant Façades & Murs Extérieurs',
    publicTitle: 'Solution Nettoyante Façades & Murs Extérieurs',
    brand: 'Bionetal',
    category: 'Façades & Murs',
    supports: ['Enduit gratté', 'Enduit taloché', 'Crépi minéral', 'Murs peints extérieurs', 'Briques & Pierres de taille'],
    usage: 'Nettoyage des salissures atmosphériques, poussières urbaines, traces rouges et encroûtements légers sur parois verticales.',
    description: 'Formulation adaptée aux supports verticaux sensibles. Nettoie en profondeur les pollutions sans arracher le grain de l’enduit ni altérer les teintes minérales.',
    dilution: 'Prêt à l’emploi ou dilution 1:3 selon l’intensité des salissures.',
    yieldM2: '5 à 8 m² / Litre selon la porosité du crépi',
    applicationMethod: 'Application pulvérisateur basse pression (Softwash), brossage doux si nécessaire, rinçage soigné à pression régulée.',
    actionTime: '15 à 30 minutes de temps de contact avant rinçage à l’eau claire.',
    precautions: 'Toujours procéder à un essai préalable sur une zone peu visible. Humidifier les plantes environnantes.',
    isEcocert: true,
    isNaturalOrigin: true,
    isMadeInFrance: true,
    officialUrl: 'https://bionetal.fr',
    active: true,
    verificationStatus: 'Oui',
    verificationDate: '2026-03-15',
    purchasePriceHT: 42.00,
    packagingSize: '5 L',
    costPerM2HT: 0.85,
  },
  {
    id: 'terrasse-bois-eco',
    name: 'Bionetal Dégrisant & Nettoyant Bois Naturel',
    publicTitle: 'Dégrisant Végétal & Nettoyant Bois Extérieur',
    brand: 'Bionetal',
    category: 'Terrasses',
    supports: ['Bois exotiques (Ipé, Teck, Cumaru)', 'Bois résineux autoclaves (Pin, Douglas)', 'Bois thermochauffés', 'Caillebotis piscine'],
    usage: 'Élimination du grisaillement superficiel dû aux UV et des micro-algues glissantes sans attaquer la lignine ni effilocher les fibres.',
    description: 'Composé d’actifs d’origine végétale spécifiquement dosés pour ouvrir les pores du bois et restituer sa couleur naturelle d’origine avant éventuelle saturation.',
    dilution: 'Prêt à l’emploi ou 1:1 pour entretien courant.',
    yieldM2: '6 à 10 m² / Litre',
    applicationMethod: 'Application au pulvérisateur ou au balai brosse, action mécanique douce, rinçage basse pression avec cloche de surface.',
    actionTime: '15 à 20 minutes sans laisser sécher le produit au soleil.',
    precautions: 'Travailler par temps couvert ou à l’ombre. Porter des gants de protection standard.',
    isEcocert: true,
    isNaturalOrigin: true,
    isMadeInFrance: true,
    officialUrl: 'https://bionetal.fr',
    active: true,
    verificationStatus: 'Oui',
    verificationDate: '2026-03-15',
    purchasePriceHT: 39.00,
    packagingSize: '5 L',
    costPerM2HT: 0.78,
  },
  {
    id: 'terrasse-pierre-dallage-eco',
    name: 'Bionetal Nettoyant Minéral Sols & Dallages',
    publicTitle: 'Nettoyant Minéral Sols, Dalles & Pavés Extérieurs',
    brand: 'Bionetal',
    category: 'Terrasses',
    supports: ['Pierre naturelle (Travertin, Calcaire, Grès)', 'Dallages en béton désactivé', 'Pavés autobloquants', 'Carrelage extérieur'],
    usage: 'Dégraissage et décrassage des sols extérieurs encrassés par les intempéries, feuilles mortes, graisses de barbecue et lichens.',
    description: 'Nettoyant minéral doux formulé à base de tensioactifs d’origine végétale. Sans solvants pétrochimiques ni acides agressifs, respectueux des joints de mortier ou de sable polymère.',
    dilution: '1 volume de produit pour 3 à 5 volumes d’eau selon encrassement.',
    yieldM2: '6 à 8 m² / Litre préparé',
    applicationMethod: 'Passage mécanique à la cloche rotative carénée sous pression calibrée après temps de trempage.',
    actionTime: '20 à 30 minutes de pause active avant lavage à la cloche de surface.',
    precautions: 'Rincer abondamment à l’eau claire. Ne pas rejeter directement dans un bassin de poissons sans décantation.',
    isEcocert: false,
    isNaturalOrigin: true,
    isMadeInFrance: true,
    officialUrl: 'https://bionetal.fr',
    active: true,
    verificationStatus: 'Oui',
    verificationDate: '2026-03-15',
    purchasePriceHT: 44.00,
    packagingSize: '5 L',
    costPerM2HT: 0.82,
  },
  {
    id: 'hydrofuge-impregnant-eco',
    name: 'Bionetal Hydrofuge Imprégnant Minéral',
    publicTitle: 'Traitement Protecteur Hydrofuge Minéral',
    brand: 'Bionetal',
    category: 'Traitements & Spécifiques',
    supports: ['Tuiles en terre cuite', 'Pierres naturelles poreuses', 'Bétons', 'Enduits minéraux de façade'],
    usage: 'Protection oléofuge et hydrofuge rémanente contre l’eau, les infiltrations d’humidité et le ré-encrassement par les dépôts verts.',
    description: 'Imprégnation incolore en phase aqueuse qui laisse respirer le support sans créer de film plastique étanche à la vapeur d’eau.',
    dilution: 'Prêt à l’emploi (ne pas diluer).',
    yieldM2: '4 à 7 m² / Litre selon la porosité',
    applicationMethod: 'Application au pulvérisateur basse pression jusqu’à refus sur support parfaitement sec et propre.',
    actionTime: 'Séchage complet en 24h. Efficacité hydrophobe maximale après 48h.',
    precautions: 'Appliquer uniquement sur support sec et propre. Ne pas appliquer en cas de risque de pluie sous 24h.',
    isEcocert: false,
    isNaturalOrigin: true,
    isMadeInFrance: true,
    officialUrl: 'https://bionetal.fr',
    active: true,
    verificationStatus: 'Oui',
    verificationDate: '2026-03-15',
    purchasePriceHT: 65.00,
    packagingSize: '5 L',
    costPerM2HT: 1.45,
  }
];
