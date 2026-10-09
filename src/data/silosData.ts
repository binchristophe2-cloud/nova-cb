import { ServiceSilo, LocalCitySilo } from '../types';
import patioRotaryImg from '../assets/images/patio_rotary_cleaner_stone.jpg';
import woodImg from '../assets/images/wood_terrace_cleaning_1788450485682.jpg';
import pro200FacadeImg from '../assets/images/artisan_facade_clean_1789483624059.jpg';
import pro200ActionImg from '../assets/images/artisan_bento_smile_1789476181824.jpg';
import heroImg from '../assets/images/pro200_hero_unbrand_1789475076424.jpg';
import aboutImg from '../assets/images/artisan_about_single_1789483316483.jpg';
import roofImg from '../assets/images/roof_facade_cleaning_1788450498970.jpg';

export const SERVICE_SILOS: Record<string, ServiceSilo> = {
  'nettoyage-terrasse': {
    slug: 'nettoyage-terrasse',
    shortTitle: 'Nettoyage Terrasse Pro',
    title: 'Nettoyage Terrasse Professionnel Mérignac & Bordeaux | NOVA CB',
    metaDescription: 'Nettoyage professionnel de terrasse à cloche rotative industrielle sans éclaboussures. Suppression des mousses et voiles glissants à Mérignac et Bordeaux. Devis gratuit sous 48h.',
    h1: 'Nettoyage de terrasse haute performance à Mérignac et Bordeaux',
    category: 'Terrasses',
    intro: 'Avec le climat océanique de la Gironde, alternant averses régulières et ensoleillement printanier, les terrasses extérieures sont rapidement colonisées par des micro-algues noires, des lichens et un film biologique glissant. NOVA CB redonne vie à votre espace extérieur grâce à un équipement professionnel de surface à cloche rotative carénée régulée.',
    problemStatement: 'Un nettoyeur grand public à jet crayon décape le support de manière hétérogène, laisse des traces de rayures indélébiles, déchausse les joints de sable ou de mortier et éclabousse toutes les baies vitrées ainsi que les façades avoisinantes.',
    solutionOverview: 'Notre équipement combine une cloche rotative industrielle carénée avec deux buses en rotation constante sous pression calibrée. L’eau est canalisée sous le carénage, nettoyant le sol de façon parfaitement homogène sans aucune projection sur vos vitrages.',
    keyBenefits: [
      'Nettoyage à la cloche rotative industrielle sans aucune projection sur les vitres',
      'Pression calibrée selon le matériau pour préserver les joints et la surface',
      'Suppression intégrale du voile biologique glissant pour une sécurité immédiate',
      'Possibilité de traitement assainissant rémanent pour retarder le ré-encrassement',
    ],
    supports: [
      'Terrasses en bois naturel (ipé, teck, cumaru, pin)',
      'Dallages en béton désactivé ou béton gravillonné',
      'Pierres naturelles (travertin, pierre de Bourgogne, ardoise, calcaire)',
      'Pavés autobloquants et cours pavées',
      'Plages de piscine et margelles antidérapantes',
    ],
    protocol: [
      { step: 1, title: 'Diagnostic préalable du matériau', description: 'Inspection visuelle de l’état des dalles ou lames, identification du type de salissure et test de résistance des joints.' },
      { step: 2, title: 'Balayage & Dégagement préliminaire', description: 'Évacuation des feuilles, aiguilles de pin et poussières pour permettre un contact direct de l’eau avec la surface.' },
      { step: 3, title: 'Passage méthodique à la cloche rotative carénée', description: 'Décapage rotatif régulier à vitesse constante, avec rinçage abondant et évacuation des eaux de ruissellement.' },
      { step: 4, title: 'Application d’un traitement assainissant (optionnel)', description: 'Pulvérisation d’un traitement fongicide rémanent pour détruire les spores résiduelles en profondeur.' },
    ],
    pricingFactors: [
      'Superficie totale de la terrasse (tarification dégressive au m²)',
      'Nature du revêtement (bois nécessitant dégrisage vs pierre ou béton lavé)',
      'Niveau d’encrassement (présence de lichen incrusté, mousses épaisses)',
      'Facilité d’accès et proximité du point d’eau extérieur',
      'Option de traitement protecteur (anti-mousse, saturateur ou hydrofuge)',
    ],
    pricingGuide: 'Les interventions standards se situent généralement entre 6 € et 14 € par m² selon le support et la finition souhaitée. Un devis sur-mesure et gratuit est établi sous 48h après étude de vos dimensions.',
    faqs: [
      { question: 'Le nettoyage à la cloche rotative risque-t-il d’arracher les joints ?', answer: 'Non. Contrairement à une lance à buse directe qui concentre toute la pression sur un point de 2 millimètres, la cloche rotative disperse le flux à plat sur une zone circulaire de 40 cm. Les joints restent intacts et le sol est lavé uniformément.' },
      { question: 'Faut-il protéger les plantations et massifs autour de la terrasse ?', answer: 'Nous prenons soin d’arroser abondamment la végétation avoisinante avant et après l’intervention. Nous utilisons en priorité l’action mécanique de l’eau sous pression, et nos produits éventuels sont certifiés sans javel corrosive.' },
      { question: 'Combien de temps dure l’intervention pour une terrasse de 40 m² ?', answer: 'En moyenne, entre 2h et 3h30 selon le degré d’encrassement et le type de revêtement.' },
      { question: 'Quelle est la meilleure période pour faire nettoyer sa terrasse ?', answer: 'Entre mars et juin pour préparer les beaux jours, ou à l’automne (octobre-novembre) pour éliminer les feuilles humides et éviter les glissades hivernales.' },
    ],
    relatedSilos: [
      { slug: 'nettoyage-terrasse-bois', title: 'Terrasse en bois' },
      { slug: 'nettoyage-terrasse-pierre', title: 'Terrasse en pierre naturelle' },
      { slug: 'nettoyage-terrasse-beton', title: 'Terrasse en béton & dalles' },
      { slug: 'traitement-anti-mousse', title: 'Traitement anti-mousse' },
    ],
    ctaHeading: 'Votre terrasse a besoin d’un coup d’éclat professionnel ?',
    ctaButton: 'Demander mon devis terrasse gratuit',
    image: patioRotaryImg,
    alt: 'Nettoyage professionnel de terrasse à la cloche rotative à Mérignac',
  },

  'nettoyage-terrasse-bois': {
    slug: 'nettoyage-terrasse-bois',
    shortTitle: 'Terrasse Bois',
    title: 'Nettoyage Terrasse Bois Mérignac & Bordeaux | Rénovation NOVA CB',
    metaDescription: 'Nettoyage et rénovation de terrasse en bois (ipé, teck, pin, composite) en Gironde. Élimination du voile gris et des salissures glissantes sans fibrer le bois.',
    h1: 'Nettoyage et rénovation de terrasse en bois à Mérignac et Bordeaux',
    category: 'Terrasses',
    intro: 'Le bois est un matériau vivant d’une grande élégance, mais sous l’effet des UV et de l’humidité girondine, la lignine superficielle se dégrade et le bois prend une teinte grisâtre, voire noirâtre. Pire encore, les micro-mousses rendent les lames extrêmement glissantes et dangereuses dès la moindre pluie.',
    problemStatement: 'Utiliser un nettoyeur haute pression classique à trop forte pression sur du bois creuse les veines tendres, peluche les lames et crée des échardes désagréables pour les pieds nus.',
    solutionOverview: 'NOVA CB emploie une pression strictement régulée et une cloche rotative avec buses à jet plat, couplée si besoin à un dégrisant biodégradable qui ouvre les pores du bois et dissout la pellicule oxydée sans altérer la fibre.',
    keyBenefits: [
      'Pression calibrée pour ne jamais détériorer la fibre du bois ni créer d’échardes',
      'Élimination immédiate des dépôts glissants pour sécuriser les passages',
      'Restauration de la teinte chaleureuse d’origine du bois',
      'Préparation idéale du bois avant l’application d’une huile ou d’un saturateur',
    ],
    supports: [
      'Bois exotiques denses : Ipé, Teck, Cumaru, Massaranduba, Padouk',
      'Résineux autoclaves : Pin sylvestre, Pin maritime, Douglas, Mélèze',
      'Bois thermochauffés et feuillus locaux (chêne, frêne)',
      'Lames de terrasse en bois composite (nettoyage doux adapté)',
      'Bords de piscine en caillebotis et margelles bois',
    ],
    protocol: [
      { step: 1, title: 'Diagnostic de l’essence de bois', description: 'Vérification de la dureté du bois (exotique vs résineux) et contrôle de la fixation des lames.' },
      { step: 2, title: 'Nettoyage mécanique à pression adaptée', description: 'Passage dans le fil du bois avec notre matériel professionnel pour déloger la pellicule glissante.' },
      { step: 3, title: 'Application d’un dégrisant professionnel', description: 'Action ciblée pour casser l’oxydation des UV et faire réapparaître les nuances d’origine.' },
      { step: 4, title: 'Rinçage soigné & Option saturation', description: 'Rinçage basse pression à grande eau et possibilité d’application d’une huile de saturation protectrice après séchage complet.' },
    ],
    pricingFactors: [
      'Type de bois (exotique nécessitant plus de temps vs résineux classique)',
      'Besoin d’un dégrisage chimique doux en complément du nettoyage mécanique',
      'Surface totale à traiter',
      'Application d’un saturateur ou protecteur UV de finition',
    ],
    pricingGuide: 'Le nettoyage mécanique simple se situe généralement autour de 8 € à 12 € / m². Un protocole complet avec dégrisant se chiffre entre 14 € et 22 € / m² selon l’essence.',
    faqs: [
      { question: 'Est-il possible de redonner la couleur dorée à une terrasse en pin grisée depuis 3 ans ?', answer: 'Oui. Le grisaillement n’est qu’un phénomène de surface (moins de 0,5 mm d’épaisseur). Grâce à notre protocole de nettoyage et de dégrisage, le bois retrouve immédiatement ses tonalités chaleureuses.' },
      { question: 'Le bois composite peut-il être nettoyé de la même manière ?', answer: 'Le composite ne se grise pas de la même façon que le bois massif, mais il accumule des poussières grasses et du lichen dans ses rainures. Nous utilisons un protocole basse pression spécifique pour ne pas rayer le polymère.' },
      { question: 'Faut-il impérativement appliquer un saturateur après le nettoyage ?', answer: 'Ce n’est pas obligatoire, mais très conseillé si vous souhaitez préserver la teinte naturelle du bois sur la durée face aux rayons ultraviolets du soleil.' },
    ],
    relatedSilos: [
      { slug: 'degrisement-bois', title: 'Dégrisage bois approfondi' },
      { slug: 'nettoyage-terrasse', title: 'Nettoyage de terrasse global' },
      { slug: 'entretien-terrasse', title: 'Entretien régulier de terrasse' },
    ],
    ctaHeading: 'Envie de retrouver une terrasse en bois chaleureuse et non glissante ?',
    ctaButton: 'Demander un devis pour ma terrasse bois',
    image: woodImg,
    alt: 'Rénovation et dégrisage d’une terrasse en bois exotique en Gironde',
  },

  'nettoyage-terrasse-beton': {
    slug: 'nettoyage-terrasse-beton',
    shortTitle: 'Terrasse Béton',
    title: 'Nettoyage Terrasse Béton & Dalles Gravillonnées | NOVA CB',
    metaDescription: 'Nettoyage en profondeur de terrasse en béton désactivé, lissé ou dalles gravillonnées à Mérignac et Bordeaux. Élimination des taches de suie, terre et mousses.',
    h1: 'Nettoyage de terrasse en béton et dalles gravillonnées en Gironde',
    category: 'Terrasses',
    intro: 'Les terrasses en béton (dalles béton, béton désactivé, béton balayé ou dalles gravillonnées) sont robustes mais très poreuses. L’eau de pluie et les poussières s’infiltrent dans les micro-cavités, créant d’épaisses taches sombres et des encroûtements de lichen tenaces.',
    problemStatement: 'Laisser le béton s’encrasser favorise la pénétration de l’eau qui, lors des épisodes de gel en hiver, peut faire éclater les gravillons superficiels et provoquer des micro-fissures.',
    solutionOverview: 'Grâce à notre cloche rotative industrielle carénée de sol, nous nettoyons en profondeur sans déchausser les gravillons du béton désactivé. La force rotative désincruste les salissures logées entre les granulats et redonne à votre sol sa clarté originelle sans projections.',
    keyBenefits: [
      'Décrassage intégral des gravillons et des reliefs du béton désactivé',
      'Aucun creusement ni effritement des granulats grâce à une pression calibrée',
      'Suppression des taches noires de pollution, lichens encroûtants et résidus de terre',
      'Possibilité de traitement hydrofuge pour faciliter les futurs nettoyages',
    ],
    supports: [
      'Dalles gravillonnées classiques (lavées ou meulées)',
      'Béton désactivé et béton imprimé',
      'Dallage béton lisse ou balayé',
      'Pavés de béton autobloquants',
      'Cours d’accès et allées carrossables en béton',
    ],
    protocol: [
      { step: 1, title: 'Évaluation de la porosité', description: 'Contrôle de l’adhérence des granulats et repérage des zones particulièrement tachées.' },
      { step: 2, title: 'Prélavage haute efficacité', description: 'Humidification et application éventuelle d’un agent dégraissant si des taches grasses sont présentes.' },
      { step: 3, title: 'Nettoyage rotatif de surface', description: 'Décapage systématique à la cloche rotative sans traces de reprise ni rayures.' },
      { step: 4, title: 'Rinçage final & Assainissement', description: 'Évacuation des dépôts vers les évacuations pluviales et traitement préventif anti-mousse.' },
    ],
    pricingFactors: [
      'Surface totale à nettoyer',
      'Type de béton (béton lissé plus rapide à nettoyer que dalles gravillonnées très rugueuses)',
      'Présence de taches d’huile, barbecue ou tanin d’arbre',
      'Accessibilité et gestion des évacuations d’eau',
    ],
    pricingGuide: 'Comptez en moyenne entre 5 € et 10 € / m² pour un nettoyage professionnel de dalle béton ou béton désactivé.',
    faqs: [
      { question: 'Les gravillons de mon béton désactivé risquent-ils de sauter ?', answer: 'Non. Notre matériel professionnel à cloche rotative utilise des buses calibrées spécialement conçues pour nettoyer la matrice de ciment sans arracher les cailloux solidaires du béton.' },
      { question: 'Comment enlever les taches d’huile de barbecue sur le béton ?', answer: 'Nous appliquons un dégraissant professionnel spécifique avant le passage haute pression pour émulsionner les corps gras piégés dans la porosité du ciment.' },
    ],
    relatedSilos: [
      { slug: 'nettoyage-terrasse', title: 'Nettoyage terrasse général' },
      { slug: 'traitement-anti-mousse', title: 'Traitement anti-mousse préventif' },
      { slug: 'nettoyage-mur-exterieur', title: 'Nettoyage murets et clôtures' },
    ],
    ctaHeading: 'Vos dalles en béton ou votre béton désactivé ont noirci ?',
    ctaButton: 'Demander un devis terrasse béton',
    image: patioRotaryImg,
    alt: 'Décapage d’une terrasse en dalles de béton gravillonnées à Bordeaux',
  },

  'nettoyage-terrasse-pierre': {
    slug: 'nettoyage-terrasse-pierre',
    shortTitle: 'Terrasse Pierre',
    title: 'Nettoyage Terrasse Pierre Naturelle & Travertin | NOVA CB',
    metaDescription: 'Nettoyage délicat de terrasse en pierre naturelle, travertin, calcaire ou ardoise à Mérignac et Bordeaux. Respect de la patine minérale sans acide agressif.',
    h1: 'Nettoyage délicat de terrasse en pierre naturelle, calcaire et travertin',
    category: 'Terrasses',
    intro: 'La pierre naturelle confère un charme incomparable aux demeures girondines, qu’il s’agisse de dalles en travertin autour d’une piscine, de pierre calcaire bordelaise ou d’ardoise naturelle. Cependant, ces matériaux nobles sont poreux et particulièrement sensibles aux produits chimiques corrosifs et aux pressions mal maîtrisées.',
    problemStatement: 'L’emploi d’eau de javel, d’acide chlorhydrique ou d’un nettoyeur haute pression trop puissant attaque le calcaire de la pierre, ronge les arêtes vives et crée une porosité accrue qui réencrasse le sol deux fois plus vite.',
    solutionOverview: 'NOVA CB traite la pierre avec une infinie délicatesse : nous ajustons la pression au bar près, utilisons des brosses carénées douces et des nettoyants écologiques au pH neutre qui respectent la calcite et la patine d’origine.',
    keyBenefits: [
      'Préservation totale de la structure minérale et des nuances naturelles de la pierre',
      'Nettoyage à pression modérée sans acide corrosif ni javel',
      'Nettoyage soigné des margelles de piscine et des joints fragiles',
      'Possibilité d’imperméabilisation par traitement hydrofuge/oléofuge respirant',
    ],
    supports: [
      'Travertin clair, adouci ou vieilli',
      'Pierres calcaires régionales (pierre de Frontenac, d’Estaillades, de Bourgogne)',
      'Ardoises naturelles et pierres de schiste',
      'Dallages en granit et grès naturel',
      'Pavés anciens en pierre taillée',
    ],
    protocol: [
      { step: 1, title: 'Identification minéralogique', description: 'Détermination du type de roche (calcaire vs siliceuse) pour sélectionner la chimie et la pression idoines.' },
      { step: 2, title: 'Lavage doux basse à moyenne pression', description: 'Décollement des micro-algues et des fientes à la cloche de précision sans effriter les bords des dalles.' },
      { step: 3, title: 'Détachage ciblé des zones incrustées', description: 'Traitement spécifique des taches de tanins végétaux ou d’oxydation.' },
      { step: 4, title: 'Traitement protecteur imperméabilisant (recommandé)', description: 'Application d’un produit hydrofuge respirant non filmogène qui empêche l’eau et l’huile de pénétrer.' },
    ],
    pricingFactors: [
      'Type de pierre et fragilité du matériau',
      'Surface totale',
      'État des joints (présence de sable polymère, mortier ancien)',
      'Application d’une protection hydrofuge hydro-respirante',
    ],
    pricingGuide: 'Le coût varie généralement entre 8 € et 15 € / m² pour le nettoyage soigné, et environ 18 € à 25 € / m² avec l’option imperméabilisation hydrofuge complète.',
    faqs: [
      { question: 'Peut-on utiliser de l’eau de Javel sur du travertin ?', answer: 'Absolument pas. L’eau de javel brûle les composants calcaires du travertin, jaunit la pierre et détruit définitivement sa surface polie ou adoucie. Nous bannissons rigoureusement tout produit javellisé.' },
      { question: 'Le traitement hydrofuge modifie-t-il l’aspect de la pierre ?', answer: 'Non. Nous utilisons des hydrofuges professionnels en phase aqueuse non filmogènes. Ils sont invisibles, ne rendent pas la pierre brillante ni glissante et laissent respirer le support.' },
    ],
    relatedSilos: [
      { slug: 'nettoyage-terrasse', title: 'Nettoyage terrasse' },
      { slug: 'traitement-anti-mousse', title: 'Traitement anti-mousse' },
      { slug: 'entretien-terrasse', title: 'Entretien régulier' },
    ],
    ctaHeading: 'Prenez soin de votre pierre naturelle avec un artisan expert',
    ctaButton: 'Demander un devis pierre naturelle',
    image: patioRotaryImg,
    alt: 'Nettoyage délicat d’une terrasse en travertin autour d’une piscine à Mérignac',
  },

  'nettoyage-mur-exterieur': {
    slug: 'nettoyage-mur-exterieur',
    shortTitle: 'Murs Extérieurs',
    title: 'Nettoyage Mur Extérieur, Muret & Façade | NOVA CB',
    metaDescription: 'Nettoyage de façades, murets de clôture et murs extérieurs en Gironde. Méthode douce softwash pour crépi et enduit sans détérioration. Devis rapide sous 48h.',
    h1: 'Nettoyage de murs extérieurs, murets de clôture et façades en Gironde',
    category: 'Murs & Façades',
    intro: 'Les murs extérieurs, pignons de maison et murets de clôture sont exposés aux intempéries, à la pluie battante et aux éclaboussures de terre. En quelques années apparaissent des trainées rouges (algues trentepohlia), des traces noires de pollution et des voiles de mousse qui dévalorisent l’aspect esthétique de votre propriété.',
    problemStatement: 'Décaper un mur en crépi ou enduit gratté avec une buse rotative haute pression à bout portant arrache les grains d’enduit, crée des trous irréversibles et favorise les infiltrations d’humidité.',
    solutionOverview: 'NOVA CB pratique la méthode Softwash : une pulvérisation basse pression de produits nettoyants et assainissants professionnels, suivie d’un rinçage à pression douce et contrôlée. L’enduit reste intact, et les salissures sont détruites à la racine.',
    keyBenefits: [
      'Méthode douce préservant le crépi, les enduits talochés et les briques',
      'Élimination radicale des trainées rouges d’algues et traces noires de pollution',
      'Nettoyage complet des couvertines de murets et piliers de portail',
      'Action rémanente empêchant le retour prématuré des moisissures',
    ],
    supports: [
      'Enduits grattés, talochés ou écrasés',
      'Murets de clôture maçonnés et crépis',
      'Façades en briques ou moellons traditionnels',
      'Bardages peints ou en bois composite',
      'Piliers de portail et chapeaux de mur',
    ],
    protocol: [
      { step: 1, title: 'Diagnostic du support et de l’enduit', description: 'Vérification de l’adhérence du crépi, détection des micro-fissures et protection des ouvertures.' },
      { step: 2, title: 'Pulvérisation basse pression assainissante', description: 'Application d’une solution active qui dissout les champignons et algues sans action agressive.' },
      { step: 3, title: 'Rinçage contrôlé à moyenne pression', description: 'Balayage doux avec buses à jet plat pour évacuer les dépôts morts sans altérer le grain.' },
      { step: 4, title: 'Finition des couvertines et soubassements', description: 'Lavage soigné des parties basses sujettes aux projections de terre.' },
    ],
    pricingFactors: [
      'Hauteur du mur ou de la façade (nécessité d’escabeau, échafaudage ou perche)',
      'Type de crépi et fragilité de l’enduit',
      'Linéaire total de muret ou surface en m²',
      'Niveau d’infestation par les algues rouges',
    ],
    pricingGuide: 'Pour les murets de clôture et façades accessibles, les prix se situent habituellement entre 7 € et 15 € / m² selon l’accessibilité.',
    faqs: [
      { question: 'Pourquoi mon mur a-t-il des traces rouges verticales ?', answer: 'Il s’agit d’une micro-algue nommée Trentepohlia, particulièrement répandue dans le Sud-Ouest en raison de l’humidité et du climat tempéré. Un simple lavage à l’eau ne suffit pas car elle repousse aussitôt ; notre traitement fongicide détruit ses spores pour un résultat durable.' },
      { question: 'Le crépi risque-t-il de perdre des grains lors du lavage ?', answer: 'Non, car nous n’utilisons jamais de haute pression abrasive sur les façades. Notre méthode softwash mise sur l’efficacité chimique douce plutôt que sur la force mécanique brute.' },
    ],
    relatedSilos: [
      { slug: 'traitement-anti-mousse', title: 'Traitement anti-mousse' },
      { slug: 'nettoyage-terrasse', title: 'Nettoyage terrasse' },
      { slug: 'entretien-terrasse', title: 'Entretien extérieur' },
    ],
    ctaHeading: 'Redonnez à vos murs et façades l’aspect du neuf sans ravalement coûteux',
    ctaButton: 'Demander un devis mur extérieur',
    image: pro200FacadeImg,
    alt: 'Nettoyage doux d’un mur extérieur et façade crépie à Mérignac',
  },

  'traitement-anti-mousse': {
    slug: 'traitement-anti-mousse',
    shortTitle: 'Traitement Anti-Mousse',
    title: 'Traitement Anti-Mousse Professionnel Gironde | NOVA CB',
    metaDescription: 'Traitement anti-mousse curatif et préventif rémanent pour terrasses, cours, dallages et murs extérieurs à Mérignac et Bordeaux. Produits certifiés sans javel.',
    h1: 'Traitement anti-mousse professionnel pour terrasses, cours et murs',
    category: 'Traitements',
    intro: 'Nettoyer à l’eau retire la saleté visible, mais laisse en place des milliards de spores microscopiques profondément ancrées dans la porosité des matériaux. Dès les prochaines pluies, le verdissement reprend de plus belle. Pour briser ce cycle, l’application d’un traitement anti-mousse professionnel rémanent est indispensable.',
    problemStatement: 'Les produits anti-mousses grand public dilués ou les mélanges à base d’eau de javel sont nocifs pour l’environnement, décolorent les matériaux et perdent toute efficacité après quelques semaines seulement.',
    solutionOverview: 'NOVA CB applique des biocides professionnels concentrés homologués (fongicides, algicides, bactéricides). Ces formules pénètrent au cœur du support, détruisent les germes par étouffement et restent actives pendant 12 à 24 mois pour empêcher toute récidive.',
    keyBenefits: [
      'Action biocide curative immédiate et action préventive rémanente longue durée',
      'Produits professionnels sans javel, sans chlore agressif et biodégradables',
      'Protection active des terrasses, allées, murets et toitures',
      'Espacement significatif de la fréquence des futurs gros nettoyages',
    ],
    supports: [
      'Terrasses en bois, pierre naturelle, dalles ou béton',
      'Allées de gravillons, pavés autobloquants et cours intérieures',
      'Murs de clôture, façades et pignons de maison',
      'Margelles de piscine et contours paysagers',
      'Toitures en tuiles terre cuite, béton ou ardoise',
    ],
    protocol: [
      { step: 1, title: 'Nettoyage mécanique initial', description: 'Décrochage des mousses épaisses pour dégager les pores du matériau.' },
      { step: 2, title: 'Séchage partiel de la surface', description: 'Application sur support ressuyé pour que le traitement pénètre en profondeur sans être lessivé.' },
      { step: 3, title: 'Pulvérisation homogène au pulvérisateur basse pression', description: 'Dosage précis du produit professionnel pour un mouillage optimal sans ruissellement excessif.' },
      { step: 4, title: 'Action rémanente sans rinçage', description: 'Le produit s’active avec les pluies successives pour maintenir la surface saine au fil des mois.' },
    ],
    pricingFactors: [
      'Surface globale à traiter (m²)',
      'Degré d’encrassement et épaisseur de la mousse',
      'Intervention combinée avec un nettoyage de surface ou passage autonome',
    ],
    pricingGuide: 'En complément d’un nettoyage de terrasse, le traitement anti-mousse revient généralement entre 3 € et 6 € / m² supplémentaires.',
    faqs: [
      { question: 'Vos produits sont-ils dangereux pour les animaux de compagnie ?', answer: 'Nous demandons simplement de laisser sécher la surface pendant 2 à 4 heures avant de laisser vos animaux domestiques y marcher. Une fois sec, le produit est fixé dans le support et ne présente aucun danger au contact.' },
      { question: 'Faut-il rincer le produit après la pulvérisation ?', answer: 'Non. Il s’agit d’un traitement sans rinçage à action progressive : le produit détruit les micro-organismes, puis les résidus microscopiques se détachent d’eux-mêmes avec le vent et les pluies.' },
    ],
    relatedSilos: [
      { slug: 'nettoyage-terrasse', title: 'Nettoyage de terrasse' },
      { slug: 'nettoyage-mur-exterieur', title: 'Nettoyage des murs extérieurs' },
      { slug: 'entretien-terrasse', title: 'Entretien régulier de terrasse' },
    ],
    ctaHeading: 'Protégez durablement vos extérieurs contre les mousses et lichens',
    ctaButton: 'Demander mon devis anti-mousse',
    image: pro200ActionImg,
    alt: 'Application d’un traitement anti-mousse professionnel rémanent à Mérignac',
  },

  'degrisement-bois': {
    slug: 'degrisement-bois',
    shortTitle: 'Dégrisage Bois',
    title: 'Dégrisage Terrasse Bois Extérieur Gironde | Rénovation NOVA CB',
    metaDescription: 'Dégrisage professionnel de terrasse en bois (ipé, teck, cumaru, pin) à Mérignac et Bordeaux. Retrouvez la couleur chaude naturelle du bois d’origine.',
    h1: 'Dégrisement et restauration de terrasse en bois (ipé, teck, pin)',
    category: 'Bois',
    intro: 'Sous le soleil estival girondin, les rayons ultraviolets dégradent la couche superficielle de cellulose du bois, lui donnant cette teinte terne, gris cendré ou noirâtre. Le dégrisage professionnel est la solution experte pour réveiller la nuance chaude et vivante du bois sans avoir à poncer des dizaines de mètres carrés.',
    problemStatement: 'Poncer une terrasse en bois est un travail titanesque, bruyant, qui abîme les têtes de vis inox et crée des irrégularités de surface. Les décapants chimiques acides mal rincés, quant à eux, tachent la pierre ou les vitres alentour.',
    solutionOverview: 'Notre protocole repose sur l’action combinée d’un dégrisant professionnel formulé à base d’acide oxalique végétal et d’un brossage rotatif mécanique régulé. Les pores s’ouvrent, la lignine noircie se dissout et la vraie couleur du bois réapparaît instantanément lors du rinçage.',
    keyBenefits: [
      'Restauration spectaculaire de la couleur d’origine du bois sans ponçage abrasif',
      'Formule végétale respectueuse de la faune et de l’environnement immédiat',
      'Nettoyage en profondeur des rainures et des fentes sans pelucher le bois',
      'Base parfaite pour accueillir une huile ou un saturateur haute protection',
    ],
    supports: [
      'Terrasses en bois exotiques (Ipé, Teck, Cumaru, Itauba, Massaranduba)',
      'Terrasses en pin autoclave (classe 4), Douglas et Mélèze',
      'Bords de piscine et caillebotis en bois',
      'Bardages extérieurs et brise-vues en bois',
      'Mobiliers de jardin en teck massif',
    ],
    protocol: [
      { step: 1, title: 'Nettoyage préparatoire', description: 'Dépoussiérage et lavage doux pour éliminer les salissures superficielles.' },
      { step: 2, title: 'Application uniforme du dégrisant pro', description: 'Pulvérisation ou application au rouleau sur bois humide, temps de pose de 15 à 20 minutes.' },
      { step: 3, title: 'Brossage mécanique doux', description: 'Action mécanique dans le sens des fibres pour décoller la couche oxydée.' },
      { step: 4, title: 'Rinçage abondant & Neutralisation', description: 'Rinçage à l’eau claire pour stopper l’action et révéler la couleur originelle.' },
    ],
    pricingFactors: [
      'Essence du bois (les bois exotiques très denses nécessitent un dégrisant plus concentré)',
      'Ancienneté du grisaillement (bois grisé depuis 1 an vs bois très oxydé depuis 5 ans)',
      'Prestation complémentaire d’huilage / saturation',
    ],
    pricingGuide: 'Le dégrisage professionnel complet se situe généralement entre 12 € et 18 € / m² (hors saturation).',
    faqs: [
      { question: 'Le dégrisage affaiblit-il la résistance du bois ?', answer: 'Absolument pas. Le dégrisage n’agit que sur les cellules mortes superficielles (moins de 0,3 mm). Il n’attaque en rien la structure du bois et permet au contraire aux fibres saines de mieux respirer.' },
      { question: 'Doit-on huiler le bois tout de suite après le dégrisage ?', answer: 'Il faut laisser le bois sécher complètement pendant 48 à 72h avec un taux d’humidité inférieur à 18% avant toute application de saturateur pour garantir une imprégnation parfaite.' },
    ],
    relatedSilos: [
      { slug: 'nettoyage-terrasse-bois', title: 'Nettoyage terrasse bois' },
      { slug: 'entretien-terrasse', title: 'Entretien terrasse' },
      { slug: 'nettoyage-terrasse', title: 'Nettoyage terrasse global' },
    ],
    ctaHeading: 'Offrez une seconde jeunesse à votre terrasse en bois',
    ctaButton: 'Demander mon devis dégrisage',
    image: woodImg,
    alt: 'Dégrisage d’une terrasse en ipé à Bordeaux Mérignac',
  },

  'entretien-terrasse': {
    slug: 'entretien-terrasse',
    shortTitle: 'Entretien Terrasse',
    title: 'Entretien Régulier Terrasse & Extérieurs | NOVA CB',
    metaDescription: 'Service d’entretien régulier et contrat annuel pour terrasses, dallages et abords extérieurs à Mérignac et Bordeaux. Protection hydrofuge et suivi artisan.',
    h1: 'Entretien régulier et contrat annuel pour terrasses et abords',
    category: 'Entretien',
    intro: 'Conserver des extérieurs accueillants et impeccables tout au long de l’année demande de l’anticipation. Plutôt que d’attendre que le sol devienne noir et glissant, un entretien régulier programmé permet de préserver la beauté de votre terrasse, de prolonger sa durabilité et de réaliser d’importantes économies sur le long terme.',
    problemStatement: 'Attendre plusieurs années entre chaque intervention nécessite des décapages plus longs, plus coûteux, et laisse le temps aux mousses de s’infiltrer sous les joints ou dans les fibres du bois.',
    solutionOverview: 'NOVA CB propose des formules d’entretien saisonnier (au printemps avant la saison des déjeuners en terrasse, ou à l’automne après la chute des feuilles). Nous assurons un lavage doux de routine et un traitement préventif sans contrainte pour vous.',
    keyBenefits: [
      'Une terrasse propre et sécurisée toute l’année sans aucun effort pour vous',
      'Tarifs préférentiels dans le cadre d’un passage d’entretien régulier',
      'Maintien de la valeur patrimoniale de vos aménagements extérieurs',
      'Interventions planifiées à votre convenance avec compte-rendu photo',
    ],
    supports: [
      'Terrasses résidentielles de particuliers (bois, pierre naturelle, béton, dalles)',
      'Terrasses de restaurants, brasseries et commerces à Mérignac et Bordeaux',
      'Entrées de copropriétés et cours d’immeubles',
      'Contours de piscines privées ou d’hôtels',
    ],
    protocol: [
      { step: 1, title: 'Bilan de santé saisonnier', description: 'Vérification de l’état général de la surface après l’hiver ou après l’été.' },
      { step: 2, title: 'Nettoyage d’entretien basse/moyenne pression', description: 'Élimination des poussières de saison, pollens et dépôts superficiels.' },
      { step: 3, title: 'Renouvellement du traitement protecteur', description: 'Application du traitement d’appoint anti-germe pour maintenir la barrière protectrice.' },
      { step: 4, title: 'Conseils personnalisés de maintenance', description: 'Recommandations pour l’arrosage et le balayage d’appoint.' },
    ],
    pricingFactors: [
      'Fréquence des passages (annuel ou bi-annuel)',
      'Superficie totale des zones sous contrat',
      'Type de revêtement',
    ],
    pricingGuide: 'Les forfaits d’entretien régulier bénéficient d’une remise de 15% à 25% par rapport à une remise en état initiale.',
    faqs: [
      { question: 'À quelle fréquence conseillez-vous d’entretenir sa terrasse ?', answer: 'Un passage annuel au début du printemps (mars/avril) est idéal pour la grande majorité des terrasses. Dans les zones très boisées ou humides, un passage automnal d’appoint permet d’éviter que les feuilles mortes ne pourrissent sur les dalles.' },
      { question: 'Intervenez-vous également pour les terrasses de restaurants ?', answer: 'Oui. Nous entretenons les terrasses professionnelles avec des horaires aménagés tôt le matin avant l’ouverture de votre établissement pour ne pas perturber votre service.' },
    ],
    relatedSilos: [
      { slug: 'nettoyage-terrasse', title: 'Nettoyage terrasse' },
      { slug: 'traitement-anti-mousse', title: 'Traitement anti-mousse' },
      { slug: 'nettoyage-terrasse-bois', title: 'Terrasse bois' },
    ],
    ctaHeading: 'Gardez votre terrasse impeccable en toute saison sans contrainte',
    ctaButton: 'Planifier l’entretien de ma terrasse',
    image: aboutImg,
    alt: 'Artisan NOVA CB réalisant l’entretien régulier d’une terrasse à Mérignac',
  },

  'nettoyage-demoussage-toiture': {
    slug: 'nettoyage-demoussage-toiture',
    shortTitle: 'Démoussage & Nettoyage Toiture',
    title: 'Démoussage Toiture Mérignac & Bordeaux | Entreprise Nettoyage Toiture | Devis Gratuit 48h | NOVA CB',
    metaDescription: 'Entreprise spécialisée en démoussage toiture à Mérignac et Bordeaux. Traitement anti-mousse professionnel rémanent à basse pression. Demandez votre devis nettoyage toiture gratuit sous 48h.',
    h1: 'Démoussage et nettoyage de toiture à Mérignac et Bordeaux : Devis gratuit sous 48h',
    category: 'Toitures',
    intro: 'Vous cherchez une entreprise de nettoyage toiture à Bordeaux ou un artisan qualifié pour le démoussage toiture à Mérignac ? Face aux intempéries océaniques et à l’humidité girondine, la toiture accumule mousses, lichens et pollution urbaine. Ces micro-végétaux retiennent l’eau, rendent les tuiles poreuses et provoquent des fissurations lors des gels d’hiver. NOVA CB intervient à basse pression douce avec des traitements biocides homologués pour assainir durablement votre couverture sans jamais l’agresser.',
    problemStatement: 'Attention aux fausses bonnes idées : confier votre toit à un intervenant non qualifié qui utilise un nettoyeur haute pression agressif direct est la cause n°1 d’infiltrations d’eau et de casse de tuiles. Chez NOVA CB, entreprise de nettoyage toiture à Bordeaux et Mérignac, nous n’utilisons jamais de haute pression destructrice sur les toitures : notre protocole professionnel repose sur un démoussage soigné et l’application de produits anti-mousse rémanents sans javel.',
    solutionOverview: 'Pour chaque chantier de démoussage toiture à Bordeaux et Mérignac, NOVA CB applique une méthodologie experte : décapage mécanique doux des amas épais, débouchage des chéneaux et pulvérisation d’un traitement fongicide et algicide certifié. Les principes actifs pénètrent jusqu’à la racine des lichens, détruisent le biofilm et continuent d’agir pendant 12 à 24 mois.',
    keyBenefits: [
      'Démoussage toiture Mérignac (33700) : diagnostic toiture offert et intervention rapide sur tous types de tuiles',
      'Entreprise nettoyage toiture Bordeaux : savoir-faire artisanal, assurance décennale et respect absolu du bâti',
      'Nettoyage toiture Mérignac devis gratuit sous 48h : chiffrage clair, sans engagement et transparent au m²',
      'Méthode basse pression douce préservant l’étanchéité, l’émail et la porosité d’origine des tuiles',
      'Élimination radicale des mousses épaisses, lichens incrustés et pollution atmosphérique urbaine',
      'Nettoyage et débouchage complet des chéneaux, gouttières zinc ou PVC et descentes d’eaux pluviales',
    ],
    supports: [
      'Tuiles en terre cuite (romanes, plates, canal girondines)',
      'Tuiles en béton, ciment et fibrociment',
      'Couvertures en ardoise naturelle ou synthétique',
      'Bacs acier et toitures d’extensions',
      'Gouttières et zingueries (zinc, aluminium, cuivre, PVC)',
    ],
    protocol: [
      { step: 1, title: 'Inspection toiture & Sécurisation', description: 'Diagnostic complet de l’état des tuiles, contrôle de la zinguerie et sécurisation des accès (ligne de vie / échafaudage).' },
      { step: 2, title: 'Dégagement mécanique doux', description: 'Décrochage soigné des mousses volumineuses et débouchage complet des gouttières obstruées.' },
      { step: 3, title: 'Pulvérisation du traitement biocide rémanent', description: 'Application méthodique d’une solution fongicide et algicide professionnelle sans chlore ni acide agressif.' },
      { step: 4, title: 'Action autonettoyante & Contrôle d’étanchéité', description: 'Les agents actifs détruisent les micro-racines et les résidus s’éliminent naturellement au fil des pluies pour une protection 12 à 24 mois.' },
    ],
    pricingFactors: [
      'Superficie totale de la toiture (m² de pan développé)',
      'Pente du toit, hauteur de faîtage et accessibilité du bâtiment',
      'Type de tuiles (romanes, canal, plates, ardoises) et ancienneté',
      'Épaisseur et nature de l’encrassement végétal (mousse épaisse, lichen incrusté)',
    ],
    pricingGuide: 'Le coût pour un démoussage et nettoyage de toiture à Mérignac ou Bordeaux se situe généralement entre 10 € et 22 € / m² selon l’accessibilité et la configuration de la couverture. Demandez votre devis gratuit sous 48h pour un tarif ferme et sans surprise.',
    faqs: [
      { question: 'Comment obtenir un devis pour un nettoyage de toiture à Mérignac ?', answer: 'Pour obtenir votre devis nettoyage toiture à Mérignac sous 48h, contactez NOVA CB au 06 24 68 52 17 ou complétez notre formulaire en ligne. Nous nous déplaçons gratuitement sur place à Mérignac (33700) et dans les communes limitrophes pour évaluer l’état de votre toiture et vous remettre une estimation chiffrée détaillée sans aucun engagement.' },
      { question: 'Pourquoi choisir NOVA CB comme entreprise de nettoyage toiture à Bordeaux ?', answer: 'NOVA CB est une entreprise artisanale locale déclarée, disposant de toutes les assurances professionnelles requises. Nous utilisons du matériel professionnel adapté et des biocides homologués sans javel, garantissant un assainissement complet de vos tuiles sans risque de porosité ou de dégradation du bâti bordelais.' },
      { question: 'Quelle est la meilleure période pour réaliser un démoussage de toiture à Mérignac ou Bordeaux ?', answer: 'En Gironde, les périodes les plus favorables pour le démoussage toiture à Mérignac et Bordeaux se situent au printemps (mars à juin) et à l’automne (septembre à novembre), avant les périodes de gel. Le traitement biocide rémanent a ainsi le temps d’agir en profondeur pour stopper toute prolifération.' },
      { question: 'Pourquoi ne faut-il jamais utiliser un nettoyeur haute pression direct sur une toiture ?', answer: 'Un nettoyeur haute pression direct décape la couche protectrice de la tuile et ouvre ses pores. La tuile devient poreuse, fragile au gel, et se ré-encrasse deux fois plus vite. Notre méthode privilégie un traitement biocide doux et rémanent qui n’endommage pas le matériau.' },
      { question: 'Vos traitements anti-mousse risquent-ils de corroder les gouttières en zinc ?', answer: 'Non. Nous utilisons exclusivement des biocides professionnels au pH adapté, formulés sans acides chlorhydriques ni javel, parfaitement compatibles avec le zinc, l’aluminium, le PVC et les vitrages de fenêtres de toit (Velux).' },
    ],
    relatedSilos: [
      { slug: 'traitement-anti-mousse', title: 'Traitement anti-mousse' },
      { slug: 'nettoyage-mur-exterieur', title: 'Nettoyage des façades' },
      { slug: 'nettoyage-terrasse', title: 'Nettoyage terrasse' },
    ],
    ctaHeading: 'Besoin d’un démoussage de toiture à Mérignac ou Bordeaux ? Obtenez votre devis gratuit sous 48h',
    ctaButton: 'Demander mon devis toiture gratuit (48h)',
    image: roofImg,
    alt: 'Entreprise de nettoyage et démoussage professionnel de toiture tuiles à Mérignac et Bordeaux',
  },
};

export const LOCAL_CITY_SILOS: Record<string, LocalCitySilo> = {
  'merignac': {
    slug: 'merignac',
    cityName: 'Mérignac',
    postalCode: '33700',
    title: 'Nettoyage & Démoussage Toiture, Terrasse Mérignac (33700) | NOVA CB',
    metaDescription: 'Entreprise de démoussage toiture à Mérignac et nettoyage terrasse basée au 33 av. Léon Blum. Basse pression, produits écoresponsables. Diagnostic gratuit.',
    h1: 'Nettoyage de toiture, démoussage et terrasse à Mérignac (33700)',
    intro: 'Basée directement à Mérignac au 33 avenue Léon Blum, NOVA CB est votre artisan et entreprise de référence pour le démoussage de toiture, le nettoyage haute performance de terrasses et l’entretien des façades. Obtenez votre diagnostic gratuit sous 48h sans aucun engagement.',
    localQuestion: 'Pourquoi les terrasses et toitures noircissent-elles avec le temps à Mérignac ?',
    localContext: 'Mérignac est caractérisée par un habitat pavillonnaire verdoyant avec de nombreux pins maritimes et chênes d’Aquitaine. La chute d’épines de pin acides et le pollen printanier libèrent des composés organiques qui se déposent sur les surfaces poreuses. Avec les pluies océaniques, ces résidus créent un biofilm sombre favorisant la prolifération de mousses sur les toitures en tuiles et rendant glissantes les terrasses en bois et dalles béton.',
    neighborhoods: ['Mérignac Centre', 'Capeyron', 'Arlac', 'Beutre', 'Le Burck', 'Les Eyquems', 'Mondésir', 'Chemin Long'],
    typicalSurfaces: [
      'Toitures en tuiles romanes, canal et plates encrassées par les pins',
      'Terrasses en bois exotique (ipé, cumaru) ou pin des Landes',
      'Dallages en béton désactivé et dalles gravillonnées de pavillons',
      'Murets de clôture et façades crépi salis par les micro-algues',
    ],
    localChallenges: [
      'Encrassement végétal rapide des toitures sous la couverture boisée mérignacaise',
      'Dépôts noirs d’épines de pin et résine végétale formant un film collant',
      'Prolifération d’algues vertes glissantes pendant les mois humides',
      'Nécessité de préserver les pelouses et massifs soignés des jardins mérignacais',
    ],
    recommendedServices: [
      'Démoussage toiture Mérignac à basse pression douce et traitement biocide rémanent',
      'Nettoyage de toiture et débouchage complet des gouttières et chéneaux',
      'Nettoyage de terrasse à la cloche rotative industrielle sans projection',
      'Dégrisage et saturation des terrasses en pin et bois exotique',
    ],
    faqs: [
      { 
        question: 'Qu’est-ce qui provoque l’apparition de mousse et de traces noires sur les terrasses à Mérignac ?', 
        answer: 'L’accumulation d’humidité sous le couvert végétal et la décomposition des aiguilles de pin créent un milieu favorable au développement des micro-algues et des champignons microscopiques. En s’incrustant dans la porosité des dalles ou les rainures des lames en bois, ce biofilm fait noircir la terrasse et la rend très glissante à la première averse. NOVA CB intervient avec une cloche rotative carénée à pression maîtrisée associée à des solutions plus respectueuses de l’environnement, éliminant la pellicule glissante sans altérer la texture du matériau ni projeter de salissures sur les massifs de fleurs.' 
      },
      { 
        question: 'Pourquoi les toitures développent-elles de la mousse et des lichens dans les quartiers boisés de Mérignac ?', 
        answer: 'L’ombrage prolongé des chênes et des pins empêche les tuiles de sécher rapidement après la pluie, créant un terrain propice aux spores aéroportées. Les racines des mousses et lichens pénètrent la terre cuite, retenant l’eau et rendant la tuile gélive en hiver. Notre solution repose sur un démoussage doux à basse pression suivi d’un traitement à orientation biologique qui assèche les micro-organismes en profondeur et offre une action protectrice longue durée sans dégrader les faîtages.' 
      },
      { 
        question: 'Comment redonner de l’éclat à une façade encrassée par les micro-algues à Mérignac ?', 
        answer: 'Les façades orientées aux intempéries subissent les pluies battantes et restent humides, ce qui engendre des traînées verdâtres ou rougeâtres inesthétiques. Sans entretien, ces dépôts s’étendent et fragilisent l’enduit. Une méthode d’entretien privilégiant des produits écoresponsables appliquée par softwash (basse pression douce) désincruste les salissures en douceur, redonnant à la façade sa luminosité d’origine tout en préservant l’écosystème du jardin.' 
      },
      { 
        question: 'Comment entretenir durablement un muret de clôture exposé aux intempéries à Mérignac ?', 
        answer: 'Les murets extérieurs et couvertines absorbent l’eau par capillarité et sont rapidement colonisés par des dépôts verts et des lichens encroûtants. À terme, la pierre ou l’enduit s’effrite sous l’effet des écarts thermiques. Un nettoyage régulé suivi d’un traitement protecteur à orientation biologique neutralise les micro-germes et retarde durablement leur réapparition.' 
      },
    ],
    nearbyCities: [
      { slug: 'bordeaux', name: 'Bordeaux' },
      { slug: 'pessac', name: 'Pessac' },
      { slug: 'le-bouscat', name: 'Le Bouscat' },
      { slug: 'eysines', name: 'Eysines' },
    ],
  },

  'bordeaux': {
    slug: 'bordeaux',
    cityName: 'Bordeaux',
    postalCode: '33000',
    title: 'Entreprise Nettoyage Toiture & Terrasse Bordeaux | NOVA CB',
    metaDescription: 'Entreprise de nettoyage toiture à Bordeaux et artisan démoussage toiture. Traitement doux tuiles, ardoises et pierre calcaire. Diagnostic gratuit 48h.',
    h1: 'Entreprise de nettoyage toiture, démoussage et terrasse à Bordeaux',
    intro: 'Vous cherchez une entreprise de nettoyage toiture à Bordeaux ou un artisan pour l’entretien de vos terrasses de ville et cours d’échoppes ? NOVA CB apporte son expertise technique pour assainir toitures, façades et pierres de taille tout en préservant le cachet architectural unique de la métropole bordelaise.',
    localQuestion: 'Qu’est-ce qui favorise l’encrassement des toitures et façades en pierre à Bordeaux ?',
    localContext: 'Bordeaux présente un patrimoine minéral remarquable (immeubles en pierre de taille, échoppes bordelaises, toitures en tuiles canal et zinc) exposé à la pollution atmosphérique urbaine. Les microparticules de suie et les résidus de circulation s’associent aux pluies atlantiques pour former des croûtes noires et des encroûtements tenaces sur les pierres calcaires et les couvertures anciennes.',
    neighborhoods: ['Bordeaux Centre', 'Chartrons', 'Caudéran', 'Nansouty', 'Saint-Genès', 'La Bastide', 'Saint-Augustin', 'Grand Parc'],
    typicalSurfaces: [
      'Toitures urbaines en tuiles canal, tuiles plates, ardoises et zinc',
      'Dallages et façades en pierre calcaire bordelaise',
      'Terrasses en bois sur toits et balcons de résidences',
      'Cours intérieures pavées et cours d’échoppes',
    ],
    localChallenges: [
      'Encrassement des toitures par la pollution urbaine et suies de circulation',
      'Accès toiture et cours parfois restreint dans les échoppes bordelaises',
      'Fragilité des matériaux anciens nécessitant impérativement une méthode basse pression',
      'Préservation de la pierre calcaire blonde sans altération des modénatures',
    ],
    recommendedServices: [
      'Démoussage toiture Bordeaux par pulvérisation douce sans haute pression destructrice',
      'Nettoyage toiture basse pression et entretien des évacuations pluviales',
      'Nettoyage délicat de pierre calcaire à pression régulée',
      'Nettoyage de cours intérieures à la cloche rotative sans éclaboussures',
    ],
    faqs: [
      { 
        question: 'Qu’est-ce qui provoque les traces noires sur les façades et pierres de taille à Bordeaux ?', 
        answer: 'En milieu urbain dense, les particules de suie émises par la circulation et le chauffage se déposent sur la pierre calcaire poreuse. Les eaux pluviales dissolvent partiellement les minéraux de surface, emprisonnant la suie dans une croûte sombre qui retient l’humidité. NOVA CB utilise des solutions adaptées au support et utilisées dans une démarche plus respectueuse de l’environnement, avec un nettoyage à basse pression douce qui dissout les salissures superficielles sans desquamer la pierre de taille bordelaise.' 
      },
      { 
        question: 'Comment traiter une toiture urbaine encrassée sans détériorer les tuiles anciennes à Bordeaux ?', 
        answer: 'Les toitures d’échoppes et d’immeubles anciens sont souvent recouvertes de tuiles canal traditionnelles sensibles aux chocs mécaniques. L’emploi d’un nettoyeur haute pression classique risquerait de rendre les tuiles poreuses et de provoquer des infiltrations. Notre approche d’entretien utilisant des produits à orientation biologique consiste en une pulvérisation basse pression : les mousses et lichens sont détruits à la racine, puis s’éliminent naturellement par le ruissellement des pluies sans fragiliser la couverture.' 
      },
      { 
        question: 'Comment retrouver une terrasse ou cour pavée propre sans l’agresser à Bordeaux ?', 
        answer: 'Dans les cours intérieures closes souvent peu ensoleillées, l’humidité stagnante entraîne le verdissement des pavés et des dalles en pierre. Pour assainir ces espaces sans salir les murs mitoyens ni les baies vitrées, notre cloche rotative industrielle nettoie à fleur de sol avec un carénage hermétique et des produits écoresponsables, sans projection d’eau boueuse.' 
      },
      { 
        question: 'Pourquoi les lichens s’installent-ils sur certaines couvertures bordelaises et comment les limiter ?', 
        answer: 'La proximité du fleuve et le climat doux de l’estuaire maintiennent une hygrométrie favorable aux lichens crustacés qui s’accrochent solidement aux tuiles et rives en zinc. En appliquant une solution d’entretien respectueuse de l’environnement dotée d’une rémanence protectrice, nous éliminons les micro-racines et créons une barrière préventive qui espace les besoins d’entretien.' 
      },
    ],
    nearbyCities: [
      { slug: 'merignac', name: 'Mérignac' },
      { slug: 'talence', name: 'Talence' },
      { slug: 'le-bouscat', name: 'Le Bouscat' },
      { slug: 'bruges', name: 'Bruges' },
    ],
  },

  'pessac': {
    slug: 'pessac',
    cityName: 'Pessac',
    postalCode: '33600',
    title: 'Nettoyage & Démoussage Terrasse, Façade Pessac (33600) | NOVA CB',
    metaDescription: 'Nettoyage de façades, terrasses et toitures à Pessac. Élimination des traces rouges, noires et mousses avec produits écoresponsables. Diagnostic gratuit.',
    h1: 'Nettoyage et entretien de terrasses et façades à Pessac',
    intro: 'Voisine immédiate de Mérignac, Pessac offre un cadre résidentiel privilégié bordé de vignobles réputés et de parcs boisés. NOVA CB intervient à Pessac pour assainir vos terrasses en bois, façades crépies, murets et toitures en éliminant les salissures liées à la météo et à la végétation.',
    localQuestion: 'Qu’est-ce qui provoque les traces noires et le verdissement des façades à Pessac ?',
    localContext: 'La forte présence arborée (chênes, pins, acacias) et la proximité de cours d’eau comme le Peugue créent un microclimat humide propice aux micro-organismes végétaux. Les enduits de façade clairs et les terrasses de jardin y sont particulièrement exposés aux algues aéroportées et aux dépôts de tanins qui tachent les surfaces dès l’automne.',
    neighborhoods: ['Pessac Centre', 'Alouette', 'Magonty', 'France', 'Cap de Bos', 'Toctoucau', 'Noès'],
    typicalSurfaces: [
      'Terrasses en lames de pin traité ou bois exotique',
      'Enduits grattés et crépis de pavillons contemporains',
      'Plages de piscines en béton désactivé et dalles gravillonnées',
      'Murets de clôture noircis par l’humidité',
    ],
    localChallenges: [
      'Feuillage dense favorisant l’apparition de moisissures végétales',
      'Traces rouges et vertes sur les crépis de façade sous les vents dominants',
      'Micro-fissuration des dalles béton sous l’effet de l’humidité hivernale',
    ],
    recommendedServices: [
      'Nettoyage de façade softwash à basse pression douce et produits écoresponsables',
      'Décapage rotatif de terrasse haute précision sans traces',
      'Traitement fongicide rémanent longue durée pour toitures et murs',
      'Dégrisage des terrasses en bois exotiques et pin',
    ],
    faqs: [
      { 
        question: 'Pourquoi des traces vertes et rouges apparaissent-elles sur certains murs à Pessac ?', 
        answer: 'Ces traînées sont causées par la prolifération de micro-algues (Trentepohlia et chlorophycées) transportées par le vent et fixées par l’humidité ambiante sur les enduits poreux. En l’absence de traitement, elles pénètrent la couche superficielle du crépi et créent des décollements. NOVA CB applique une méthode d’entretien privilégiant des produits écoresponsables par pulvérisation basse pression : le traitement détruit les micro-végétaux à la racine sans agresser le revêtement ni décolorer les peintures.' 
      },
      { 
        question: 'Pourquoi les terrasses en bois grisent-elles avec le temps à Pessac ?', 
        answer: 'L’action conjointe des rayons ultraviolets et de l’humidité décompose la lignine en surface du bois, ce qui lui donne cette teinte grise terne. Simultanément, un voile d’algues microscopiques s’installe et rend les lames glissantes. Notre intervention associe un brossage mécanique régulé à la cloche rotative et l’application d’un dégriseur à orientation biologique, redonnant au pin ou au bois exotique sa teinte naturelle et chaleureuse.' 
      },
      { 
        question: 'Comment éliminer les traces vertes sur un muret de clôture à Pessac ?', 
        answer: 'Les murets entourant les jardins pessacais subissent les remontées d’humidité du sol et l’ombrage des haies vives. Un traitement adapté au support avec des solutions plus respectueuses de l’environnement permet de nettoyer la pierre ou le crépi sans détériorer les joints de maçonnerie, avec une action rémanente qui retarde l’apparition de nouvelles mousses.' 
      },
      { 
        question: 'Quels sont les signes indiquant qu’une toiture nécessite un entretien à Pessac ?', 
        answer: 'L’apparition de paquets de mousse le long des emboîtements de tuiles, le verdissement généralisé de la toiture ou des résidus végétaux réguliers dans les chéneaux signalent un encrassement avancé. Un démoussage préventif à basse pression permet de restaurer la porosité normale des tuiles avant que le gel hivernal ne provoque des fissures.' 
      },
    ],
    nearbyCities: [
      { slug: 'merignac', name: 'Mérignac' },
      { slug: 'gradignan', name: 'Gradignan' },
      { slug: 'talence', name: 'Talence' },
      { slug: 'bordeaux', name: 'Bordeaux' },
    ],
  },

  'talence': {
    slug: 'talence',
    cityName: 'Talence',
    postalCode: '33400',
    title: 'Nettoyage & Entretien Terrasse, Muret Talence (33400) | NOVA CB',
    metaDescription: 'Nettoyage professionnel de terrasses, murets et façades à Talence. Artisan de proximité, matériel caréné sans projection, produits écoresponsables.',
    h1: 'Nettoyage professionnel de terrasses, murets et cours à Talence',
    intro: 'À Talence, commune dynamique limitrophe de Bordeaux, les propriétaires de maisons de ville, échoppes et appartements en rez-de-jardin font appel à NOVA CB pour assainir et valoriser leurs espaces extérieurs : terrasses carrelées, cours pavées, murets mitoyens et toitures.',
    localQuestion: 'Pourquoi les murets extérieurs et terrasses noircissent-ils avec le temps à Talence ?',
    localContext: 'Les habitations talençaises disposent souvent de cours mitoyennes et de terrasses proches des limites de propriété. L’encaissement urbain limite la ventilation naturelle et favorise la rétention d’humidité. Les particules urbaines et poussières atmosphériques se combinent aux micro-organismes pour faire noircir les joints de carrelage, les murets de clôture et les dallages extérieurs.',
    neighborhoods: ['Talence Centre', 'Thouars', 'Saint-Genès Talence', 'Peixotto', 'La Médoquine'],
    typicalSurfaces: [
      'Carrelage extérieur antidérapant et grès cérame',
      'Cours intérieures en pavés ou briques anciennes',
      'Murets de clôture crépis ou en parpaings peints',
      'Terrasses en bois composite ou pin',
    ],
    localChallenges: [
      'Espaces étroits nécessitant une maîtrise totale des projections d’eau',
      'Noircissement rapide des joints de carrelage et des crépis mitoyens',
      'Préservation absolue des clôtures et cours des voisins lors du nettoyage',
    ],
    recommendedServices: [
      'Nettoyage à la cloche rotative sans éclaboussure ni projection',
      'Décrassage et blanchiment des joints de carrelage extérieur',
      'Nettoyage softwash des murets et façades mitoyennes',
      'Traitement anti-mousse préventif et rémanent',
    ],
    faqs: [
      { 
        question: 'Pourquoi les murets extérieurs noircissent-ils avec le temps à Talence ?', 
        answer: 'L’exposition prolongée aux poussières urbaines piégées par les eaux de pluie fait pénétrer une suie fine dans les aspérités de l’enduit ou du crépi. Avec l’humidité, des micro-algues noires s’y fixent et créent un voile sombre. NOVA CB applique une méthode d’entretien privilégiant des produits écoresponsables par pulvérisation basse pression : les salissures sont dissoutes sans dégrader le mortier ni écailler la peinture.' 
      },
      { 
        question: 'Comment enlever les traces vertes et noires d’une terrasse sans salir les murs des voisins à Talence ?', 
        answer: 'Dans les cours et terrasses mitoyennes de Talence, un nettoyeur à jet libre projetterait de la boue sur les façades adjacentes. Nous utilisons exclusivement une cloche rotative carénée en inox munie d’une jupe protectrice : le jet tourne à haute vitesse à l’intérieur du carénage, nettoyant dalles et joints en profondeur sans la moindre projection latérale vers les propriétés voisines.' 
      },
      { 
        question: 'Comment nettoyer une façade sans utiliser une méthode trop agressive à Talence ?', 
        answer: 'Les enduits fins et crépis de ville ne supportent pas les fortes pressions qui risquent de creuser le support. Notre technique softwash fait appel à des solutions sélectionnées pour limiter l’impact sur l’environnement : le produit agit doucement par contact pour neutraliser les polluants et la mousse, avant un rinçage doux régulé.' 
      },
      { 
        question: 'Qu’est-ce qui favorise l’encrassement des toitures dans les quartiers de Talence ?', 
        answer: 'L’alternance entre la pollution de l’agglomération et l’humidité ambiante accélère le noircissement des tuiles. Les lichens s’y installent dans les zones ombragées par les constructions voisines. Une pulvérisation d’anti-mousse rémanent d’origine végétale permet d’assainir la toiture durablement.' 
      },
    ],
    nearbyCities: [
      { slug: 'bordeaux', name: 'Bordeaux' },
      { slug: 'pessac', name: 'Pessac' },
      { slug: 'gradignan', name: 'Gradignan' },
    ],
  },

  'le-bouscat': {
    slug: 'le-bouscat',
    cityName: 'Le Bouscat',
    postalCode: '33110',
    title: 'Nettoyage & Rénovation Terrasse, Toiture Le Bouscat (33110) | NOVA CB',
    metaDescription: 'Rénovation soignée de terrasses en travertin, pierre naturelle et bois exotique au Bouscat. Produits écoresponsables, finition haut de gamme. Diagnostic gratuit.',
    h1: 'Rénovation soignée de terrasses, toitures et façades au Bouscat',
    intro: 'Reconnue pour ses demeures de standing, ses parcs soignés et ses propriétés élégantes, la commune du Bouscat exige des interventions de haute précision. NOVA CB prend soin de vos terrasses en matériaux nobles (travertin, ipé, teck, pierre calcaire), de vos toitures et de vos façades avec un respect absolu des finitions.',
    localQuestion: 'Comment retrouver une terrasse et des façades propres sans les agresser au Bouscat ?',
    localContext: 'Les exigences esthétiques au Bouscat sont particulièrement élevées. Les aménagements paysagers intègrent des matériaux de premier choix associés à des plantations soignées. Cette configuration exclut l’usage de produits corrosifs brutaux ou de pressions inadaptées qui pourraient rayer la pierre adoucie, pelucher le bois précieux ou brûler les massifs végétaux.',
    neighborhoods: ['Le Bouscat Centre', 'Barrière du Médoc', 'Lafont', 'Godard', 'Ermitage'],
    typicalSurfaces: [
      'Terrasses en travertin et pierre naturelle adoucie',
      'Terrasses en ipé, teck et bois exotiques haut de gamme',
      'Plages de piscines paysagères et margelles en pierre',
      'Murs de clôture d’hôtels particuliers et toitures traditionnelles',
    ],
    localChallenges: [
      'Matériaux haut de gamme intolérants aux erreurs de décapage mécanique',
      'Protection absolue des massifs floraux et plantations ornementales',
      'Élimination délicate des lichens dorés sans rayer la pierre',
    ],
    recommendedServices: [
      'Nettoyage délicat basse pression de la pierre naturelle et du travertin',
      'Dégrisage expert et saturation des terrasses en bois précieux',
      'Application d’hydrofuges respirants anti-taches pour pierre',
      'Démoussage toiture doux avec produits à orientation biologique',
    ],
    faqs: [
      { 
        question: 'Comment retrouver une terrasse propre sans l’agresser au Bouscat ?', 
        answer: 'Sur des matériaux nobles tels que le travertin, la pierre calcaire ou l’ipé, un nettoyeur haute pression standard creuserait la pierre et rayerait les lames de bois. NOVA CB utilise une approche d’entretien utilisant des produits à orientation biologique au pH neutre combinée à une cloche de surface à pression modérée. Ce procédé nettoie la surface en douceur, élimine les taches et restaure la clarté d’origine sans fragiliser le matériau.' 
      },
      { 
        question: 'Comment entretenir durablement une terrasse en bois précieux exposée aux intempéries au Bouscat ?', 
        answer: 'L’ipé et le teck résistent naturellement aux insectes mais subissent le grisaillement dû aux rayons UV et aux pluies. Après un dégrisage soigné à base de produits respectueux de l’environnement, nous pouvons appliquer des saturateurs non filmogènes d’origine végétale. Ils pénètrent au cœur des fibres sans s’écailler, nourrissant le bois et rehaussant ses nuances chaleureuses.' 
      },
      { 
        question: 'Quels facteurs favorisent l’encrassement des murs extérieurs et murets au Bouscat ?', 
        answer: 'La proximité d’arbres majestueux et de massifs denses crée un ombrage permanent propice au développement de lichens et de micro-mousses le long des murs de clôture. Un traitement softwash régulé avec des produits sélectionnés pour limiter l’impact sur l’environnement assainit les parements de pierre sans nuire aux plantations adjacentes.' 
      },
      { 
        question: 'Pourquoi les toitures développent-elles de la mousse et comment les préserver au Bouscat ?', 
        answer: 'Les toitures traditionnelles en tuiles plates ou canal accumulent des spores de lichens dans les zones ombragées. En appliquant une solution d’assainissement douce et rémanente, nous détruisons les racines végétales sans perturber l’étanchéité des noues et solins en zinc.' 
      },
    ],
    nearbyCities: [
      { slug: 'bordeaux', name: 'Bordeaux' },
      { slug: 'merignac', name: 'Mérignac' },
      { slug: 'bruges', name: 'Bruges' },
      { slug: 'eysines', name: 'Eysines' },
    ],
  },

  'bruges': {
    slug: 'bruges',
    cityName: 'Bruges',
    postalCode: '33520',
    title: 'Nettoyage & Démoussage Toiture, Terrasse Bruges (33520) | NOVA CB',
    metaDescription: 'Traitement anti-mousse et nettoyage de terrasses et toitures à Bruges. Élimination du voile vert et humidité avec produits écoresponsables. Diagnostic gratuit.',
    h1: 'Nettoyage de toiture, façade et terrasse à Bruges (33520)',
    intro: 'Bordée par les marais et la proximité du lac de Bordeaux, la commune de Bruges bénéficie d’un cadre naturel exceptionnel mais connaît un taux d’humidité résiduelle élevé. NOVA CB aide les résidents brugeais à débarrasser leurs terrasses, toitures et façades des dépôts verts et biofilms glissants qui s’y installent rapidement.',
    localQuestion: 'Pourquoi des traces vertes et dépôts humides apparaissent-ils si vite à Bruges ?',
    localContext: 'La présence des plans d’eau, des marais et des brumes matinales maintient une hygrométrie élevée tout au long de l’année. L’air humide favorise la germination accélérée de micro-algues vertes (chlorophycées) et de mousses sur le bois, le crépi et les tuiles de toiture. Sans entretien adapté, les terrasses deviennent des patinoires et les façades se couvrent de traînées vertes tenaces.',
    neighborhoods: ['Bruges Centre', 'Terdits', 'Le Tasta', 'Sainte-Germaine'],
    typicalSurfaces: [
      'Terrasses sur pilotis et cours d’eau en bois ou composite',
      'Façades en enduit monocouche clair sujettes au verdissement',
      'Dallages béton et carrelages extérieurs de résidences récentes',
      'Toitures pavillonnaires exposées à l’humidité lacustre',
    ],
    localChallenges: [
      'Forte récurrence du voile vert en raison de l’air humide permanent',
      'Nécessité absolue d’un traitement anti-mousse rémanent longue durée',
      'Protection des sols à proximité des berges et espaces aquatiques',
    ],
    recommendedServices: [
      'Décapage cloche rotative pour supprimer le film glissant sur terrasse',
      'Traitement anti-mousse toiture et façade à orientation biologique',
      'Nettoyage sécurisé des terrasses au bord de l’eau sans produits polluants',
      'Entretien préventif des évacuations pluviales et chéneaux',
    ],
    faqs: [
      { 
        question: 'Pourquoi des traces vertes apparaissent-elles sur certains murs et façades à Bruges ?', 
        answer: 'L’évaporation des marais et du lac génère une humidité de l’air propice aux micro-organismes végétaux aéroportés. Dès que le crépi reste humide plus de 48 heures, des colonies d’algues s’y développent en surface. NOVA CB applique des solutions adaptées au support et utilisées dans une démarche plus respectueuse de l’environnement : le produit pénètre les micro-cavités de l’enduit pour neutraliser les racines sans lessivage chimique polluant vers les nappes phréatiques.' 
      },
      { 
        question: 'Pourquoi ma terrasse devient-elle glissante avec le temps à Bruges ?', 
        answer: 'Le contact continu avec l’air humide favorise la formation d’un biofilm glissant invisible par temps sec mais extrêmement dangereux dès qu’il pleut. Notre cloche rotative carénée élimine ce film organique par action mécanique douce et évacuation immédiate de l’eau, laissant les dalles ou lames de bois parfaitement assainies et sécurisées.' 
      },
      { 
        question: 'Pourquoi certaines toitures deviennent-elles rapidement verdâtres à Bruges ?', 
        answer: 'Les brumes matinales se condensent sur les tuiles, apportant l’eau indispensable aux spores de mousse. En l’absence de traitement préventif, les lichens s’étendent et s’enracinent. Nous pulvérisons un traitement biocide rémanent d’origine végétale qui bloque la photosynthèse des mousses et protège la toiture sur plusieurs saisons.' 
      },
      { 
        question: 'Comment nettoyer un muret sans détériorer son revêtement en milieu humide à Bruges ?', 
        answer: 'Les murets d’enceinte absorbent l’humidité du sol et noircissent sous l’action des mousses rampantes. Un nettoyage doux par pulvérisation d’un produit écoresponsable permet de détacher les salissures sans dégrader les joints ni effriter les crépis de clôture.' 
      },
    ],
    nearbyCities: [
      { slug: 'le-bouscat', name: 'Le Bouscat' },
      { slug: 'bordeaux', name: 'Bordeaux' },
      { slug: 'eysines', name: 'Eysines' },
    ],
  },

  'eysines': {
    slug: 'eysines',
    cityName: 'Eysines',
    postalCode: '33320',
    title: 'Nettoyage Terrasse, Façade & Toiture Eysines (33320) | NOVA CB',
    metaDescription: 'Nettoyage de terrasse, toitures et murets extérieurs à Eysines. Traitement anti-mousse doux, produits écoresponsables. Diagnostic gratuit artisan.',
    h1: 'Entretien de terrasses, façades et toitures à Eysines',
    intro: 'Commune maraîchère et résidentielle dynamique, Eysines compte de nombreux pavillons avec de spacieuses terrasses en béton désactivé, dallages et toitures familiales. NOVA CB assure leur nettoyage en profondeur avec des méthodes respectueuses de l’environnement.',
    localQuestion: 'Quels sont les facteurs qui accélèrent l’encrassement des terrasses et murets à Eysines ?',
    localContext: 'La proximité des zones maraîchères de la vallée des Jalles et des espaces verts génère des poussières organiques de terre qui se dispersent lors des périodes de vent. Lorsque la pluie survient, ces particules s’infiltrent dans les micro-cavités du béton désactivé, des pavés et des enduits de façade, créant une pellicule terreuse propice aux mousses tenaces.',
    neighborhoods: ['Eysines Centre', 'Le Vigean', 'Migron', 'La Forêt', 'Le Derby'],
    typicalSurfaces: [
      'Béton désactivé et dalles gravillonnées de terrasse',
      'Terrasses en bois résineux ou composite',
      'Murets d’enceinte et crépis de pavillons',
      'Toitures en tuiles béton et terre cuite',
    ],
    localChallenges: [
      'Incrustation de poussières de terre fertile dans la porosité des sols',
      'Mousses épaisses au pied des clôtures et haies végétales',
      'Encrassement précoce des toitures exposées aux vents d’ouest',
    ],
    recommendedServices: [
      'Nettoyage rotatif de surface pour terrasses sans creuser le béton',
      'Nettoyage softwash des murets de clôture et façades',
      'Démoussage toiture basse pression et produits écoresponsables',
      'Traitement protecteur anti-mousse rémanent',
    ],
    faqs: [
      { 
        question: 'Quels sont les facteurs qui accélèrent l’encrassement d’une terrasse à Eysines ?', 
        answer: 'Le brassage de poussières fines issues des zones maraîchères s’ajoute aux intempéries régulières. Cette terre microscopique se loge dans les creux du béton désactivé ou entre les dalles, formant un terreau où s’enracinent algues et adventices. Notre cloche rotative carénée déloge ces impuretés par flux d’eau tournant sans creuser le liant minéral, complétée par un produit de finition écoresponsable.' 
      },
      { 
        question: 'Comment éliminer les traces vertes et la terre incrustée sur un muret à Eysines ?', 
        answer: 'Les murets reçoivent les éclaboussures de pluie chargée de poussières de sol. Pour nettoyer le crépi sans provoquer d’effritement, nous appliquons une solution assainissante à orientation biologique qui décolle les dépôts avant un rinçage doux à très basse pression.' 
      },
      { 
        question: 'Pourquoi les façades exposées à l’humidité se dégradent-elles plus rapidement à Eysines ?', 
        answer: 'L’humidité résiduelle sous le couvert des haies de jardin permet aux champignons microscopiques de proliférer sur les enduits. À long terme, ils favorisent des micro-fissures superficielles. Notre méthode softwash élimine ces agents pathogènes sans altérer la couche d’imperméabilisation de la façade.' 
      },
      { 
        question: 'Comment préserver une toiture exposée à l’humidité et aux poussières à Eysines ?', 
        answer: 'Les poussières retenues sur les tuiles nourrissent les lichens qui fixent l’eau. Un démoussage régulier à basse pression avec des solutions respectueuses de l’environnement permet de rétablir la bonne glisse des eaux pluviales et d’éviter les risques de tuiles poreuses.' 
      },
    ],
    nearbyCities: [
      { slug: 'merignac', name: 'Mérignac' },
      { slug: 'le-bouscat', name: 'Le Bouscat' },
      { slug: 'bruges', name: 'Bruges' },
      { slug: 'saint-medard-en-jalles', name: 'Saint-Médard-en-Jalles' },
    ],
  },

  'saint-medard-en-jalles': {
    slug: 'saint-medard-en-jalles',
    cityName: 'Saint-Médard-en-Jalles',
    postalCode: '33160',
    title: 'Démoussage Toiture & Terrasse Saint-Médard-en-Jalles | NOVA CB',
    metaDescription: 'Démoussage toiture et nettoyage terrasse à Saint-Médard-en-Jalles (33160). Traitement des aiguilles de pin, sève et mousses. Diagnostic gratuit.',
    h1: 'Nettoyage de toiture, terrasse et façade à Saint-Médard-en-Jalles',
    intro: 'À l’orée des pinèdes de l’ouest bordelais, Saint-Médard-en-Jalles bénéficie d’un environnement naturel d’exception. Cependant, les aiguilles de pin acides et la résine mettent les toitures, terrasses et murets à rude épreuve. NOVA CB déploie son équipement professionnel et ses produits écoresponsables pour assainir durablement vos extérieurs.',
    localQuestion: 'Comment limiter le retour de la mousse et des traces de résine à Saint-Médard-en-Jalles ?',
    localContext: 'La forte présence des pins maritimes engendre une chute constante d’aiguilles très acides et des coulées de résine collante par temps chaud. Ces éléments forment des plaques noires tenaces dans les creux de tuiles et sur les terrasses en bois, favorisant un noircissement accéléré et la prolifération de mousses épaisses dans les zones ombragées.',
    neighborhoods: ['Saint-Médard Centre', 'Gajouquera', 'Hastignan', 'Corbiac', 'Magudas', 'Issac'],
    typicalSurfaces: [
      'Toitures en tuiles de maisons contemporaines et pavillons sous les pins',
      'Grandes terrasses en bois (pin des Landes, ipé) et composites',
      'Dallages de piscines et allées gravillonnées',
      'Murets de clôture en pierre ou béton bordant les parcelles boisées',
    ],
    localChallenges: [
      'Résine et tanin d’aiguilles de pin collés durablement au support',
      'Prolifération de mousses épaisses dans les zones ombragées sous les arbres',
      'Encrassement rapide des gouttières par les aiguilles et cônes de pin',
    ],
    recommendedServices: [
      'Démoussage toiture à basse pression et nettoyage des gouttières',
      'Décapage cloche rotative industrielle pour éliminer résine et traces noires',
      'Dégrisage en profondeur des terrasses en bois naturel',
      'Traitement anti-mousse longue rémanence respectueux de la nature',
    ],
    faqs: [
      { 
        question: 'Comment limiter le retour de la mousse sur une toiture sous les pins à Saint-Médard-en-Jalles ?', 
        answer: 'L’acidité des aiguilles accumulées dans les emboîtements de tuiles favorise une repousse fulgurante des mousses. Après un nettoyage doux à basse pression pour évacuer les débris végétaux sans endommager les faîtages, NOVA CB pulvérise un traitement biocide rémanent à orientation biologique. Ce produit imprègne le matériau et inhibe la germination des spores pour plusieurs années, même sous un ombrage forestier continu.' 
      },
      { 
        question: 'Comment enlever les traces de résine et d’aiguilles de pin sur une terrasse à Saint-Médard-en-Jalles ?', 
        answer: 'La sève de pin forme une colle tenace que le jet d’eau haute pression ne fait que durcir ou étaler. Nous appliquons des solvants végétaux biodégradables qui dissolvent la résine sans attaquer la teinte du bois ou du béton, avant de passer notre cloche rotative industrielle pour extraire la matière en profondeur.' 
      },
      { 
        question: 'Pourquoi les façades proches des zones boisées verdissent-elles plus rapidement à Saint-Médard-en-Jalles ?', 
        answer: 'La présence rapprochée des arbres freine la ventilation naturelle des murs et projette des spores de lichens lors des tempêtes. Un nettoyage doux par pulvérisation d’un traitement écoresponsable élimine les micro-algues sans abîmer les enduits ni porter atteinte à la biodiversité du jardin.' 
      },
      { 
        question: 'Pourquoi certains murs extérieurs restent-ils humides et noircissent-ils à Saint-Médard-en-Jalles ?', 
        answer: 'Les murets en lisière de terrain boisé reçoivent l’eau de ruissellement des branches d’arbres chargée de tanins. Cette humidité permanente favorise des champignons microscopiques qui noircissent la pierre. Un assainissement doux à pression régulée suivi d’un traitement préventif respirant redonne aux murets leur propreté originelle.' 
      },
    ],
    nearbyCities: [
      { slug: 'merignac', name: 'Mérignac' },
      { slug: 'eysines', name: 'Eysines' },
    ],
  },

  'gradignan': {
    slug: 'gradignan',
    cityName: 'Gradignan',
    postalCode: '33170',
    title: 'Nettoyage & Démoussage Toiture, Terrasse Gradignan | NOVA CB',
    metaDescription: 'Démoussage toiture, dégrisage terrasse bois et nettoyage façade à Gradignan (33170). Produits écoresponsables, respect des espaces boisés. Diagnostic gratuit.',
    h1: 'Nettoyage et démoussage de toiture et terrasse à Gradignan',
    intro: 'Ville-parc renommée pour ses berges de l’Eau Bourde et ses nombreux espaces boisés séculaires, Gradignan possède un patrimoine résidentiel où terrasses et toitures côtoient une nature luxuriante. NOVA CB veille à l’entretien rigoureux et écologique de vos extérieurs tout au long de l’année.',
    localQuestion: 'Pourquoi les toitures et terrasses développent-elles des mousses épaisses à Gradignan ?',
    localContext: 'L’abondance de parcs boisés et la présence de la rivière de l’Eau Bourde maintiennent une fraîcheur et une hygrométrie élevées sous canopée. Les toitures et terrasses situées à l’ombre des grands arbres reçoivent peu de soleil direct pour sécher, ce qui crée des conditions idéales pour le développement de mousses denses et de lichens incrustants.',
    neighborhoods: ['Gradignan Centre', 'Cayac', 'Malartic', 'Mandavit', 'Laurenzane', 'Favard'],
    typicalSurfaces: [
      'Toitures de villas et pavillons en tuiles sous les grands arbres',
      'Terrasses en bois naturel (pin, ipé, chêne) entourées de végétation',
      'Dallages en pierre calcaire et travertin',
      'Murets de soutènement et clôtures en pierre de pays',
    ],
    localChallenges: [
      'Ombrage permanent causé par les grands arbres favorisant la mousse dense',
      'Grisaillement rapide des terrasses en bois sous les feuillus',
      'Obligation de préserver les sols vivants et cours d’eau lors des interventions',
    ],
    recommendedServices: [
      'Démoussage toiture à basse pression avec produits à orientation biologique',
      'Nettoyage à la cloche rotative sans projections de boue',
      'Dégrisage et saturation des terrasses en bois naturel',
      'Traitement assainissant fongicide rémanent pour murets et façades',
    ],
    faqs: [
      { 
        question: 'Pourquoi les toitures développent-elles de la mousse et des lichens à Gradignan ?', 
        answer: 'L’ombrage de la canopée des parcs gradignanais empêche les tuiles de sécher après les averses. Les mousses s’y développent en coussins épais qui se comportent comme de véritables éponges, maintenant les tuiles humides en continu. En période de gel, cette humidité prisonnière peut provoquer des épaufrures et des infiltrations. NOVA CB pulvérise une solution d’entretien respectueuse de l’environnement qui détache la mousse sans fragiliser la couverture, assurant une protection pérenne.' 
      },
      { 
        question: 'Pourquoi ma terrasse en bois devient-elle glissante et comment l’entretenir à Gradignan ?', 
        answer: 'Les chutes de feuilles en automne et l’humidité de l’Eau Bourde favorisent l’installation rapide d’un biofilm végétal glissant. Pour restaurer l’adhérence sans abîmer les lames de bois, nous procédons à un nettoyage à la cloche rotative carénée complété par un produit écoresponsable, éliminant les dépôts sans relever la fibre du bois.' 
      },
      { 
        question: 'Comment éliminer les mousses et lichens présents sur une façade à Gradignan ?', 
        answer: 'Les façades de villas situées en lisière de bois sont souvent colonisées par des lichens jaunes ou gris tenaces. Notre protocole softwash applique un produit écoresponsable qui désolidarise les lichens à la racine, rincé ensuite à très basse pression pour préserver l’enduit et les plantations du jardin.' 
      },
      { 
        question: 'Qu’est-ce qui favorise l’apparition de mousse sur les murs extérieurs et murets à Gradignan ?', 
        answer: 'L’eau de ruissellement des feuillages couplée à l’absence de rayonnement solaire direct maintient les murets de pierre dans une humidité constante. Un traitement fongicide doux et rémanent permet d’assainir la pierre durablement sans recourir à des produits chlorés polluants pour la terre du jardin.' 
      },
    ],
    nearbyCities: [
      { slug: 'pessac', name: 'Pessac' },
      { slug: 'talence', name: 'Talence' },
      { slug: 'merignac', name: 'Mérignac' },
      { slug: 'bordeaux', name: 'Bordeaux' },
    ],
  },
};
