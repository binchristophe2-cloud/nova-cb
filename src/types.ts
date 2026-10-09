export type PageType = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'contact' 
  | 'products'
  | 'silo' 
  | 'local' 
  | 'admin-login'
  | 'admin-dashboard';

export interface AdminUser {
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

export interface SeoMetricsData {
  totalKeywords: number;
  optimizedCount: number;
  p1PriorityCount: number;
  commercialIntentCount: number;
  localIntentCount: number;
}

export type KeywordIntent = 'commerciale' | 'transactionnelle' | 'locale' | 'informationnelle';
export type KeywordPriority = 'P1 - Forte' | 'P2 - Moyenne' | 'P3 - Longue traîne';
export type KeywordStatus = 'Optimisé' | 'À optimiser' | 'À créer' | 'À contrôler';

export interface SeoKeywordItem {
  id: string;
  keyword: string;
  intent: KeywordIntent;
  priority: KeywordPriority;
  targetPage: string;
  slug: string;
  title: string;
  h1: string;
  cta: string;
  status: KeywordStatus;
  serviceType: string;
  geo: string;
}

export interface ServiceSilo {
  slug: string;
  shortTitle: string;
  title: string;
  metaDescription: string;
  h1: string;
  category: string;
  intro: string;
  problemStatement: string;
  solutionOverview: string;
  keyBenefits: string[];
  supports: string[];
  protocol: { step: number; title: string; description: string }[];
  pricingFactors: string[];
  pricingGuide: string;
  faqs: FaqItem[];
  relatedSilos: { slug: string; title: string }[];
  ctaHeading: string;
  ctaButton: string;
  image: string;
  alt: string;
}

export interface LocalCitySilo {
  slug: string;
  cityName: string;
  postalCode: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  localQuestion?: string;
  localContext: string;
  neighborhoods: string[];
  typicalSurfaces: string[];
  localChallenges: string[];
  recommendedServices: string[];
  faqs: FaqItem[];
  nearbyCities: { slug: string; name: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'terrasses' | 'surfaces' | 'traitements' | 'toitures' | 'textiles';
  shortDesc: string;
  longDesc: string;
  supports: string[];
  features: string[];
  image: string;
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  comment: string;
  service: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  services: string[];
  surfaceArea?: string;
  supportType?: string;
  preferEcoSolutions?: boolean;
  clientType: 'particulier' | 'professionnel';
  message: string;
}

export interface AppNotification {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

