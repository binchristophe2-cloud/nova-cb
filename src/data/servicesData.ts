import { ServiceItem } from '../types';

import heroImg from '../assets/images/pro200_hero_unbrand_1789475076424.jpg';
import pro200FacadeImg from '../assets/images/artisan_facade_clean_1789483624059.jpg';
import patioRotaryImg from '../assets/images/patio_rotary_cleaner_stone.jpg';
import pro200ActionImg from '../assets/images/artisan_bento_smile_1789476181824.jpg';
import woodImg from '../assets/images/wood_terrace_cleaning_1788450485682.jpg';
import roofImg from '../assets/images/roof_facade_cleaning_1788450498970.jpg';

export const SERVICES: ServiceItem[] = [
  {
    id: 'terrasses',
    title: 'Nettoyage de Terrasse par Cloche Rotative',
    category: 'terrasses',
    popular: true,
    shortDesc: 'Nettoyage haute performance sans projection grâce à notre cloche rotative carénée : décapage homogène, respect des joints et zéro éclaboussure.',
    longDesc: 'NOVA CB utilise une cloche rotative professionnelle de surface carénée pour éliminer en profondeur les salissures atmosphériques, moisissures, mousses et voiles ternes sans éclabousser les baies vitrées ou dégrader les joints. Nous adaptons la pression d’eau et appliquons des produits biodégradables ciblés afin de préserver l’intégrité structurelle de chaque revêtement.',
    supports: [
      'Terrasses bois (teck, ipé, pin)',
      'Dallages béton & gravillonné',
      'Pierres naturelles (travertin, calcaire, ardoise)',
      'Lames composites',
      'Pavés autobloquants & cours',
    ],
    features: [
      'Nettoyage à la cloche rotative carénée (zéro projection)',
      'Suppression intégrale des dépôts glissants et verdissements',
      'Préservation totale des joints et de la surface du sol',
      'Possibilité de traitement imperméabilisant ou saturateur protecteur',
    ],
    image: patioRotaryImg,
  },
  {
    id: 'toitures',
    title: 'Démoussage & Nettoyage de Toiture à Basse Pression',
    category: 'toitures',
    popular: true,
    shortDesc: 'Entreprise spécialisée en démoussage toiture à Mérignac et Bordeaux : traitement anti-mousse professionnel basse pression, préservation de l’étanchéité et devis gratuit sous 48h.',
    longDesc: 'NOVA CB est votre entreprise de nettoyage toiture à Bordeaux et référence du démoussage toiture à Mérignac. Face aux intempéries girondines, mousses, lichens et pollution urbaine fragilisent vos tuiles. Nous procédons à un nettoyage doux à basse pression suivi d’un traitement anti-mousse fongicide rémanent sans chlore. Demandez votre devis nettoyage toiture à Mérignac et Bordeaux gratuit sous 48h.',
    supports: [
      'Démoussage toiture Mérignac (33700) et Bordeaux Métropole',
      'Élimination radicale mousses, lichens et pollution urbaine incrustée',
      'Traitement anti-mousse curatif et préventif rémanent 12-24 mois',
      'Tuiles terre cuite (romanes, canal), béton, ardoise et zinc',
      'Nettoyage et débouchage des gouttières et descentes pluviales',
    ],
    features: [
      'Entreprise nettoyage toiture Bordeaux déclarée & assurée',
      'Nettoyage toiture Mérignac devis gratuit sous 48h sans engagement',
      'Intervention à basse pression douce respectueuse de la toiture',
      'Zéro nettoyeur haute pression agressif ou destructeur',
      'Traitement assainissant rémanent agissant sur plusieurs saisons',
      'Prévention certifiée des infiltrations et microfissures',
    ],
    image: roofImg,
  },
  {
    id: 'surfaces-exterieures',
    title: 'Nettoyage de Façades & Murs à Basse Pression (Softwash)',
    category: 'surfaces',
    popular: true,
    shortDesc: 'Nettoyage soigné à basse pression contrôlée pour façades, crépi et murets : élimination des traces rouges et noires sans aucun arrachement.',
    longDesc: 'Les façades et abords extérieurs subissent l’humidité, les fumées et les intempéries. Équipés de buses basse pression softwash et de produits professionnels ciblés, nous éliminons les traces noires, rouges ou vertes tout en respectant scrupuleusement l’enduit ou le crépi, complété par la cloche de sol pour les abords.',
    supports: [
      'Murs de clôture & murets',
      'Façades (enduit gratté, taloché, bardage)',
      'Allées carrossables et piétonnes',
      'Cours intérieures et terrasses d’accès',
      'Escaliers extérieurs et seuils de porte',
      'Piliers et margelles de piscine',
    ],
    features: [
      'Méthode softwash à basse pression douce pour préserver le crépi',
      'Cloche de surface pour allées et cours sans projection',
      'Élimination des pollutions atmosphériques et trainées d’eau',
      'Protection durable contre les nouvelles agressions',
    ],
    image: pro200FacadeImg,
  },
  {
    id: 'traitements-specifiques',
    title: 'Traitements Spécifiques & Dégrisage Bois',
    category: 'traitements',
    shortDesc: 'Traitements anti-mousse professionnels, fongicides certifiés, dégrisage et saturation protectrice du bois.',
    longDesc: 'Pour garantir un résultat pérenne, un simple lavage ne suffit pas. NOVA CB applique des formulations curatives et préventives concentrées qui détruisent les germes en profondeur et saturent les fibres pour stopper l’apparition de nouvelles mousses.',
    supports: [
      'Dégrisage du bois extérieur',
      'Entretien et protection du bois (huilage, saturation)',
      'Traitement anti-mousse curatif et préventif',
      'Traitement fongicide et algicide professionnel',
      'Nettoyage et traitement des surfaces très encrassées',
    ],
    features: [
      'Nettoyage et dégrisage ciblé à la cloche rotative de précision',
      'Produits professionnels sans chlore agressif',
      'Action rémanente empêchant la réapparition rapide',
      'Restauration de la teinte chaude d’origine du bois',
      'Traitement protecteur oléofuge & hydrofuge disponible',
    ],
    image: pro200ActionImg,
  },
];
