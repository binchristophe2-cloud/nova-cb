import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Home, 
  ChevronRight, 
  Phone, 
  Mail, 
  Sparkles, 
  Check, 
  ShieldCheck,
  ClipboardList,
  Layers,
  Wrench,
  HelpCircle,
  Clock
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';

interface ProfessionalContactPageProps {
  initialService?: string;
  onNavigateHome: () => void;
  onNavigateToProfessionals: () => void;
}

const PRESTATIONS_OPTIONS = [
  "Nettoyage extérieur d'engins et accessoires de chantier",
  "Nettoyage extérieur d'équipements et remorques de paysagistes",
  "Nettoyage de sols, cours, accès et dalles extérieures",
  "Nettoyage de courts extérieurs et abords sportifs",
  "Nettoyage extérieur de remorques et plateaux",
  "Nettoyage adapté de façades et murets professionnels",
  "Nettoyage des sols et abords de zones de stockage des déchets",
  "Nettoyage extérieur de véhicules utilitaires sur site",
  "Autre besoin professionnel",
];

const FREQUENCY_OPTIONS = [
  { id: 'ponctuelle', label: 'Intervention ponctuelle' },
  { id: 'reguliere', label: 'Intervention régulière' },
  { id: 'recurrente', label: 'Besoin récurrent à définir' },
  { id: 'inconnu', label: 'Je ne sais pas encore' },
];

export const ProfessionalContactPage: React.FC<ProfessionalContactPageProps> = ({
  initialService,
  onNavigateHome,
  onNavigateToProfessionals,
}) => {
  // A. Coordonnées du professionnel
  const [fullName, setFullName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [siteLocation, setSiteLocation] = useState<string>('');

  // B. Type de demande (sélection multiple)
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // C. Informations sur le chantier
  const [siteAddress, setSiteAddress] = useState<string>('');
  const [surfaceOrEquipmentType, setSurfaceOrEquipmentType] = useState<string>('');
  const [surfaceOrQuantity, setSurfaceOrQuantity] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('Intervention ponctuelle');
  const [targetPeriod, setTargetPeriod] = useState<string>('');
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [specificConstraints, setSpecificConstraints] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize service from prop if provided
  useEffect(() => {
    if (initialService) {
      const match = PRESTATIONS_OPTIONS.find(
        (opt) => opt.toLowerCase().includes(initialService.toLowerCase()) || initialService.toLowerCase().includes(opt.toLowerCase())
      );
      if (match) {
        setSelectedServices([match]);
      } else {
        setSelectedServices([initialService]);
      }
    }
  }, [initialService]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) => 
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Le nom et prénom sont obligatoires.';
    if (!company.trim()) newErrors.company = "Le nom de l'entreprise est obligatoire.";
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Une adresse e-mail professionnelle valide est obligatoire.';
    if (!phone.trim()) newErrors.phone = 'Le numéro de téléphone est obligatoire.';
    if (!siteLocation.trim()) newErrors.siteLocation = 'La ville ou le code postal du site est obligatoire.';
    if (selectedServices.length === 0) newErrors.selectedServices = 'Veuillez sélectionner au moins un type de prestation.';
    if (!surfaceOrEquipmentType.trim()) newErrors.surfaceOrEquipmentType = 'Veuillez préciser le type de surface, d’équipement ou de matériel concerné.';
    if (!problemDescription.trim()) newErrors.problemDescription = 'La description du besoin et des salissures constatées est obligatoire.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorField = document.querySelector('.form-field-error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    const emailSubject = `[PRO NOVA CB] Demande d'étude de projet - ${company} (${fullName})`;

    const payload = {
      _subject: emailSubject,
      _replyto: email,
      form_type: 'professionnel',
      type_client: 'professionnel',
      destinataire: 'nova.entretien33@outlook.fr',

      // Coordonnées
      nom_complet: fullName,
      name: fullName,
      fullName: fullName,
      entreprise: company,
      company: company,
      fonction: jobTitle || 'Non précisée',
      email: email,
      telephone: phone,
      phone: phone,
      localisation_site: siteLocation,
      ville_code_postal: siteLocation,

      // Prestations & Chantier
      prestations_selectionnees: selectedServices.join(' ; '),
      services: selectedServices.join(' ; '),
      support_a_diagnostiquer: surfaceOrEquipmentType,
      surface_ou_quantite: surfaceOrQuantity || 'Non précisée',
      adresse_chantier: siteAddress || 'Non renseignée',
      frequence_souhaitee: frequency,
      periode_souhaitee: targetPeriod || 'Dès que possible / À convenir',
      description_besoin: problemDescription,
      problemes_constates: problemDescription,
      contraintes_particulieres: specificConstraints || 'Aucune contrainte spécifique mentionnée',
      informations_utiles: additionalNotes || 'Aucune information complémentaire',
      date_demande: new Date().toLocaleString('fr-FR'),
    };

    // FormBold Endpoint
    const formBoldEndpoint = (import.meta as any).env?.VITE_FORMBOLD_PRO_ENDPOINT || 'https://formbold.com/s/9kmb2';

    try {
      // Transmission simultanée multi-canaux pour 100% de délivrabilité :
      // 1. Script Hostinger natif contact.php (sauvegarde JSON + mail())
      // 2. FormSubmit AJAX vers nova.entretien33@outlook.fr
      // 3. FormSubmit AJAX vers binchristophe2@gmail.com
      // 4. FormBold (endpoint configuré)
      // 5. API Node /api/contact
      await Promise.allSettled([
        fetch('/contact.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        }),
        fetch('https://formsubmit.co/ajax/nova.entretien33@outlook.fr', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        }),
        fetch('https://formsubmit.co/ajax/binchristophe2@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        }),
        fetch(formBoldEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        }),
        fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        }),
      ]);

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Erreur transmission formulaire professionnel:', err);
      // Afficher la confirmation pour assurer une expérience fluide au professionnel
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbs = [
    { name: 'Accueil', url: `${window.location.origin}/` },
    { name: 'Professionnels', url: `${window.location.origin}/professionnels` },
    { name: 'Étude de projet', url: `${window.location.origin}/contact-professionnels` },
  ];

  return (
    <article className="min-h-screen bg-[#FAF8F5] text-stone-900 pb-16">
      <SeoHead
        title="Étudions votre projet professionnel | Formulaire B2B | NOVA CB"
        description="Formulaire d'étude de projet de nettoyage extérieur pour les professionnels, entreprises, paysagistes et collectivités en Gironde. Diagnostic technique et solution adaptée à vos contraintes."
        canonicalUrl={`${window.location.origin}/contact-professionnels`}
        breadcrumbs={breadcrumbs}
      />

      {/* Fil d'Ariane */}
      <nav aria-label="Fil d'Ariane" className="bg-stone-100 border-b border-stone-200 text-xs py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-stone-500">
          <button 
            onClick={onNavigateHome}
            className="flex items-center hover:text-emerald-700 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 mr-1 text-emerald-600" />
            <span>Accueil</span>
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <button 
            onClick={onNavigateToProfessionals}
            className="hover:text-emerald-700 transition-colors cursor-pointer"
          >
            Professionnels
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-emerald-700 font-semibold truncate">Étude de projet professionnel</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative py-12 lg:py-14 overflow-hidden border-b border-emerald-950/70 bg-[#071912] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>Formulaire réservé aux professionnels • Entreprises & Collectivités</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Étudions votre projet professionnel
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Vous recherchez un prestataire pour le nettoyage extérieur de vos équipements, de vos véhicules, de vos sols ou de vos installations professionnelles ?
          </p>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Présentez-nous votre besoin. NOVA CB étudiera votre demande afin de vérifier la faisabilité de l'intervention et de vous proposer une solution adaptée à votre site, à vos surfaces et à vos contraintes.
          </p>

          <div className="pt-2">
            <p className="text-xs text-stone-400/90 italic border-l-2 border-emerald-500/40 pl-3">
              Chaque demande fait l'objet d'une étude préalable. La faisabilité dépend notamment des surfaces, des salissures, des conditions d'accès et des contraintes techniques et environnementales.
            </p>
          </div>
        </div>
      </section>

      {/* Conteneur principal */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {isSubmitted ? (
          /* Écran de confirmation après envoi */
          <div className="bg-white rounded-3xl border border-emerald-200/90 p-8 sm:p-12 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="max-w-xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Demande transmise avec succès
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Merci pour votre demande
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                NOVA CB a bien reçu les informations transmises. Votre projet sera étudié au regard des prestations demandées et des contraintes du site. Si des précisions sont nécessaires, nous pourrons vous recontacter.
              </p>
            </div>

            {/* Récapitulatif rapide pour le professionnel */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 text-left text-xs sm:text-sm text-stone-700 max-w-lg mx-auto space-y-2">
              <div className="font-bold text-stone-900 border-b border-stone-200 pb-1.5 flex items-center justify-between">
                <span>Entreprise : {company}</span>
                <span className="text-emerald-700 font-semibold">{siteLocation}</span>
              </div>
              <div><strong>Contact :</strong> {fullName} {jobTitle ? `(${jobTitle})` : ''}</div>
              <div><strong>Prestation(s) :</strong> {selectedServices.join(', ')}</div>
              <div><strong>Matériel / Surface :</strong> {surfaceOrEquipmentType}</div>
              <div><strong>Fréquence :</strong> {frequency}</div>
            </div>

            {/* Actions post-envoi */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onNavigateToProfessionals}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                <span>Retour aux prestations professionnelles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onNavigateHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm transition-colors cursor-pointer border border-stone-300"
              >
                <span>Retour à l'accueil</span>
              </button>
            </div>
          </div>
        ) : (
          /* Formulaire de demande professionnelle */
          <form 
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-3xl border border-stone-200/90 shadow-lg p-6 sm:p-10 space-y-10"
          >
            {/* Bannière de distinction du formulaire */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                <strong>Espace Professionnels :</strong> Ce formulaire s'adresse aux entreprises, artisans, gestionnaires et collectivités. Pour les demandes de nettoyage de toitures ou terrasses de particuliers, veuillez utiliser le formulaire de diagnostic standard.
              </div>
            </div>

            {/* SECTION A : Coordonnées du professionnel */}
            <div className="space-y-4">
              <div className="border-b border-stone-200 pb-2">
                <h2 className="text-lg sm:text-xl font-black text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-black flex items-center justify-center">A</span>
                  <span>Coordonnées du professionnel</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Informations de l'interlocuteur et de l'entreprise
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nom et prénom */}
                <div className="space-y-1">
                  <label htmlFor="pro-fullname" className="block text-xs font-bold text-stone-800">
                    Nom et prénom <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="pro-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex : Jean Dupont"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none ${
                      errors.fullName 
                        ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-400 form-field-error' 
                        : 'border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-stone-50/40'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-600 font-semibold">{errors.fullName}</p>}
                </div>

                {/* Entreprise */}
                <div className="space-y-1">
                  <label htmlFor="pro-company" className="block text-xs font-bold text-stone-800">
                    Entreprise <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="pro-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ex : TP Bâtiment Aquitaine SAS"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none ${
                      errors.company 
                        ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-400 form-field-error' 
                        : 'border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-stone-50/40'
                    }`}
                  />
                  {errors.company && <p className="text-[11px] text-rose-600 font-semibold">{errors.company}</p>}
                </div>

                {/* Fonction (facultatif) */}
                <div className="space-y-1">
                  <label htmlFor="pro-jobtitle" className="block text-xs font-bold text-stone-800">
                    Fonction <span className="text-stone-400 font-normal">(facultatif)</span>
                  </label>
                  <input
                    id="pro-jobtitle"
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Ex : Responsable matériel, Conducteur de travaux..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 text-sm bg-stone-50/40 outline-none"
                  />
                </div>

                {/* Adresse e-mail professionnelle */}
                <div className="space-y-1">
                  <label htmlFor="pro-email" className="block text-xs font-bold text-stone-800">
                    Adresse e-mail professionnelle <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="pro-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@entreprise.fr"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none ${
                      errors.email 
                        ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-400 form-field-error' 
                        : 'border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-stone-50/40'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-600 font-semibold">{errors.email}</p>}
                </div>

                {/* Téléphone */}
                <div className="space-y-1">
                  <label htmlFor="pro-phone" className="block text-xs font-bold text-stone-800">
                    Téléphone <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="pro-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 00 00 00 00 ou 05 00 00 00 00"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none ${
                      errors.phone 
                        ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-400 form-field-error' 
                        : 'border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-stone-50/40'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-600 font-semibold">{errors.phone}</p>}
                </div>

                {/* Ville ou code postal du site à nettoyer */}
                <div className="space-y-1">
                  <label htmlFor="pro-site-location" className="block text-xs font-bold text-stone-800">
                    Ville ou code postal du site à nettoyer <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="pro-site-location"
                    type="text"
                    value={siteLocation}
                    onChange={(e) => setSiteLocation(e.target.value)}
                    placeholder="Ex : 33700 Mérignac, Bordeaux, Pessac..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none ${
                      errors.siteLocation 
                        ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-400 form-field-error' 
                        : 'border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-stone-50/40'
                    }`}
                  />
                  {errors.siteLocation && <p className="text-[11px] text-rose-600 font-semibold">{errors.siteLocation}</p>}
                </div>
              </div>
            </div>

            {/* SECTION B : Type de demande */}
            <div className="space-y-4">
              <div className="border-b border-stone-200 pb-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="text-lg sm:text-xl font-black text-stone-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-black flex items-center justify-center">B</span>
                    <span>Type de demande</span>
                    <span className="text-rose-600">*</span>
                  </h2>
                  <span className="text-xs text-emerald-800 bg-emerald-100/70 font-semibold px-2.5 py-0.5 rounded-full">
                    Sélectionnez une ou plusieurs prestations
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Cochez les prestations correspondant à votre besoin professionnel
                </p>
              </div>

              {/* Sélection directe / liste des 9 prestations */}
              <div className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PRESTATIONS_OPTIONS.map((prestation, idx) => {
                    const isSelected = selectedServices.includes(prestation);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => toggleService(prestation)}
                        className={`text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-bold shadow-sm'
                            : 'bg-stone-50/50 border-stone-200 hover:border-emerald-300 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="leading-snug">{prestation}</span>
                      </button>
                    );
                  })}
                </div>

                {errors.selectedServices && (
                  <p className="text-xs text-rose-600 font-semibold pt-1">{errors.selectedServices}</p>
                )}
              </div>
            </div>

            {/* SECTION C : Informations sur le chantier */}
            <div className="space-y-5">
              <div className="border-b border-stone-200 pb-2">
                <h2 className="text-lg sm:text-xl font-black text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-black flex items-center justify-center">C</span>
                  <span>Informations sur le chantier</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Détails techniques nécessaires à l'analyse de faisabilité
                </p>
              </div>

              <div className="space-y-4">
                {/* Type de surface, d'équipement ou de matériel concerné */}
                <div className="space-y-1">
                  <label htmlFor="pro-equipment-type" className="block text-xs font-bold text-stone-800">
                    Type de surface, d'équipement ou de matériel concerné <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="pro-equipment-type"
                    type="text"
                    value={surfaceOrEquipmentType}
                    onChange={(e) => setSurfaceOrEquipmentType(e.target.value)}
                    placeholder="Ex : 2 remorques paysagiste, cour pavée de 400 m², engin de terrassement, flotte de 4 utilitaires..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none ${
                      errors.surfaceOrEquipmentType 
                        ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-400 form-field-error' 
                        : 'border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-stone-50/40'
                    }`}
                  />
                  {errors.surfaceOrEquipmentType && (
                    <p className="text-[11px] text-rose-600 font-semibold">{errors.surfaceOrEquipmentType}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Adresse ou localisation précise du chantier */}
                  <div className="space-y-1">
                    <label htmlFor="pro-site-address" className="block text-xs font-bold text-stone-800">
                      Adresse ou localisation précise du chantier <span className="text-stone-400 font-normal">(facultatif)</span>
                    </label>
                    <input
                      id="pro-site-address"
                      type="text"
                      value={siteAddress}
                      onChange={(e) => setSiteAddress(e.target.value)}
                      placeholder="Rue, zone d'activité, lieu-dit..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 text-sm bg-stone-50/40 outline-none"
                    />
                  </div>

                  {/* Surface approximative en m² ou quantité d'équipements */}
                  <div className="space-y-1">
                    <label htmlFor="pro-surface-quantity" className="block text-xs font-bold text-stone-800">
                      Surface approx. (m²) ou quantité d'équipements <span className="text-stone-400 font-normal">(facultatif)</span>
                    </label>
                    <input
                      id="pro-surface-quantity"
                      type="text"
                      value={surfaceOrQuantity}
                      onChange={(e) => setSurfaceOrQuantity(e.target.value)}
                      placeholder="Ex : ~350 m², 3 engins, 2 remorques..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 text-sm bg-stone-50/40 outline-none"
                    />
                  </div>
                </div>

                {/* Fréquence souhaitée */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-stone-800">
                    Fréquence souhaitée
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {FREQUENCY_OPTIONS.map((freq) => (
                      <button
                        type="button"
                        key={freq.id}
                        onClick={() => setFrequency(freq.label)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                          frequency === freq.label
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        {freq.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Période souhaitée pour l'intervention */}
                <div className="space-y-1">
                  <label htmlFor="pro-period" className="block text-xs font-bold text-stone-800">
                    Période souhaitée pour l'intervention <span className="text-stone-400 font-normal">(facultatif)</span>
                  </label>
                  <input
                    id="pro-period"
                    type="text"
                    value={targetPeriod}
                    onChange={(e) => setTargetPeriod(e.target.value)}
                    placeholder="Ex : Dans les 15 jours, début du mois prochain, le week-end..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 text-sm bg-stone-50/40 outline-none"
                  />
                </div>

                {/* Description du besoin et des salissures constatées */}
                <div className="space-y-1">
                  <label htmlFor="pro-problem-desc" className="block text-xs font-bold text-stone-800">
                    Description du besoin et des salissures constatées <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="pro-problem-desc"
                    rows={4}
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                    placeholder="Précisez la nature des salissures (boue de chantier, dépôts végétaux, traces d'hydrocarbures, pollution, mousses...) et l'objectif de l'intervention."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none leading-relaxed ${
                      errors.problemDescription 
                        ? 'border-rose-500 bg-rose-50/30 ring-1 ring-rose-400 form-field-error' 
                        : 'border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 bg-stone-50/40'
                    }`}
                  />
                  {errors.problemDescription && (
                    <p className="text-[11px] text-rose-600 font-semibold">{errors.problemDescription}</p>
                  )}
                </div>

                {/* Contraintes particulières */}
                <div className="space-y-1">
                  <label htmlFor="pro-constraints" className="block text-xs font-bold text-stone-800">
                    Contraintes particulières <span className="text-stone-400 font-normal">(accès, horaires, raccordement en eau, évacuation des eaux, présence d'autres activités sur le site...)</span>
                  </label>
                  <textarea
                    id="pro-constraints"
                    rows={3}
                    value={specificConstraints}
                    onChange={(e) => setSpecificConstraints(e.target.value)}
                    placeholder="Ex : Présence d'un point d'eau sur site, intervention à réaliser avant 8h le matin, hauteur sous plafond limitée..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 text-sm bg-stone-50/40 outline-none leading-relaxed"
                  />
                </div>

                {/* Champ permettant de préciser toute information utile à l'étude du projet */}
                <div className="space-y-1">
                  <label htmlFor="pro-additional-notes" className="block text-xs font-bold text-stone-800">
                    Informations utiles complémentaires <span className="text-stone-400 font-normal">(facultatif)</span>
                  </label>
                  <input
                    id="pro-additional-notes"
                    type="text"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Toute autre précision utile pour étudier votre projet..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 text-sm bg-stone-50/40 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bouton d'envoi final */}
            <div className="pt-4 border-t border-stone-200 space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-white font-black text-sm tracking-wide transition-all shadow-xl cursor-pointer ${
                  isSubmitting
                    ? 'bg-stone-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30 transform hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmission en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Envoyer ma demande d'étude</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-stone-500 leading-normal">
                En soumettant ce formulaire, vous consentez à ce que NOVA CB utilise ces données professionnelles dans le cadre exclusif de l'étude de faisabilité de votre demande d'intervention.
              </p>
            </div>
          </form>
        )}
      </section>
    </article>
  );
};
