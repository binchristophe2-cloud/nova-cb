import React, { useState, useRef } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  AlertCircle, 
  Sparkles, 
  Copy, 
  ExternalLink, 
  Check, 
  Camera, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  MessageCircle, 
  ShieldCheck, 
  HelpCircle,
  Home,
  Layers,
  Trees,
  Search,
  CheckCircle
} from 'lucide-react';

interface ContactFormProps {
  initialService?: string;
  className?: string;
  onSuccess?: () => void;
}

interface PhotoFile {
  id: string;
  name: string;
  previewUrl: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialService, className = '', onSuccess }) => {
  // Determine default support based on initialService prop if provided
  const getInitialSupport = (svc?: string): string => {
    if (!svc) return '';
    const lower = svc.toLowerCase();
    if (lower.includes('toiture') || lower.includes('démoussage') || lower.includes('tuile')) return 'Toiture';
    if (lower.includes('façade') || lower.includes('facade') || lower.includes('enduit')) return 'Façade';
    if (lower.includes('muret') || lower.includes('mur')) return 'Muret';
    if (lower.includes('terrasse') || lower.includes('bois') || lower.includes('dalle') || lower.includes('pavé')) return 'Terrasse';
    return '';
  };

  // State
  const [isStarted, setIsStarted] = useState<boolean>(Boolean(initialService));
  const [currentStep, setCurrentStep] = useState<number>(1); // 1: Besoin, 2: Problèmes, 3: Coordonnées & Photos, 4: Résumé
  const [supportSelected, setSupportSelected] = useState<string>(getInitialSupport(initialService));
  const [observedProblems, setObservedProblems] = useState<string[]>([]);
  
  // Coordinates
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('33700');
  const [city, setCity] = useState<string>('Mérignac');
  const [consentContact, setConsentContact] = useState<boolean>(true);
  
  // Photos (facultatif, 1 à 3)
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Support Options (Single choice)
  const SUPPORT_OPTIONS = [
    { id: 'Toiture', label: 'Toiture', icon: '🏠', desc: 'Tuiles, ardoises, fibro-ciment' },
    { id: 'Façade', label: 'Façade', icon: '🧱', desc: 'Enduit, crépi, bardage, pierre' },
    { id: 'Muret', label: 'Muret', icon: '🧱', desc: 'Muret de clôture, piliers, couvertines' },
    { id: 'Terrasse', label: 'Terrasse', icon: '🌿', desc: 'Bois, dalles, pavés, béton, carrelage' },
    { id: 'Autre', label: 'Autre', icon: '🔎', desc: 'Allée, plage de piscine, escalier...' },
  ];

  // Observed Problems Options (Multi-choice)
  const PROBLEM_OPTIONS = [
    'Mousse',
    'Lichens',
    'Salissures',
    'Traces noires',
    'Dépôts verts',
    'Grisaillement',
    'Peinture / revêtement dégradé',
    'Support terni',
    'Je ne sais pas',
    'Autre',
  ];

  const handleToggleProblem = (problem: string) => {
    if (problem === 'Je ne sais pas') {
      // If choosing "Je ne sais pas", clear or toggle it
      setObservedProblems((prev) => 
        prev.includes('Je ne sais pas') ? [] : ['Je ne sais pas']
      );
      return;
    }

    setObservedProblems((prev) => {
      const filtered = prev.filter(p => p !== 'Je ne sais pas');
      if (filtered.includes(problem)) {
        return filtered.filter(p => p !== problem);
      } else {
        return [...filtered, problem];
      }
    });
  };

  // Photo handlers
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files) as File[];
    
    // Maximum 3 photos
    const availableSlots = 3 - photos.length;
    if (availableSlots <= 0) return;

    const newPhotos: PhotoFile[] = filesArray.slice(0, availableSlots).map((file: File, idx: number) => ({
      id: `${Date.now()}-${idx}`,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    }));

    setPhotos(prev => [...prev, ...newPhotos]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  // Validation before going to next step
  const handleNextStep = () => {
    setErrorMsg(null);

    if (currentStep === 1) {
      if (!supportSelected) {
        setErrorMsg('Veuillez sélectionner ce que vous souhaitez faire diagnostiquer.');
        return;
      }
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      if (observedProblems.length === 0) {
        setErrorMsg('Veuillez sélectionner au moins un problème constaté (ou cochez "Je ne sais pas").');
        return;
      }
      setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      if (!fullName.trim()) {
        setErrorMsg('Veuillez renseigner votre Nom et Prénom.');
        return;
      }
      if (!phone.trim()) {
        setErrorMsg('Veuillez renseigner votre numéro de téléphone.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Veuillez renseigner une adresse email valide.');
        return;
      }
      if (!consentContact) {
        setErrorMsg('Veuillez accepter d’être recontacté pour votre diagnostic gratuit.');
        return;
      }
      setCurrentStep(4);
      return;
    }
  };

  const handlePrevStep = () => {
    setErrorMsg(null);
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      setIsStarted(false);
    }
  };

  // Submission handler
  const handleSubmitDiagnostic = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('Veuillez renseigner vos coordonnées avant de valider.');
      setCurrentStep(3);
      return;
    }

    setIsSubmitting(true);

    const emailSubject = `Demande de diagnostic gratuit NOVA CB - ${fullName || 'Client'}`;
    const payload = {
      _subject: emailSubject,
      _replyto: email,
      _captcha: 'false',
      _template: 'table',
      destinataire: 'nova.entretien33@outlook.fr',
      type_demande: 'Demande de diagnostic gratuit sans engagement',
      support_a_diagnostiquer: supportSelected || 'Non spécifié',
      problemes_constates: observedProblems.join(', ') || 'À identifier sur place',
      nom_complet: fullName,
      telephone: phone,
      email: email,
      adresse_du_bien: address || 'Non renseignée',
      code_postal: postalCode || 'Non renseigné',
      ville: city || 'Mérignac',
      accord_recontact: consentContact ? 'Oui, accepté' : 'Non',
      photos_fournies: photos.length > 0 ? `${photos.length} photo(s) (${photos.map(p => p.name).join(', ')})` : 'Aucune photo fournie (facultatif)',
      date_demande: new Date().toLocaleString('fr-FR'),
    };

    try {
      // Transmit simultaneously to FormSubmit and FormBold
      await Promise.allSettled([
        fetch('https://formsubmit.co/ajax/nova.entretien33@outlook.fr', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        }),
        fetch('https://formbold.com/s/9kmb2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        }),
      ]);

      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Erreur transmission diagnostic:', err);
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Email Fallback generator
  const emailSubject = `Demande de diagnostic gratuit NOVA CB - ${fullName || 'Client'}`;
  const emailBody = [
    `Bonjour NOVA CB,`,
    ``,
    `Voici les détails de ma demande de diagnostic gratuit :`,
    `• Support à diagnostiquer : ${supportSelected || 'À identifier'}`,
    `• Problème(s) constaté(s) : ${observedProblems.join(', ') || 'Non précisé'}`,
    `• Nom et Prénom : ${fullName}`,
    `• Téléphone : ${phone}`,
    `• E-mail : ${email}`,
    `• Adresse du bien : ${address || 'Non renseignée'}`,
    `• Code postal & Ville : ${postalCode} ${city}`,
    `• Accord d'être recontacté : ${consentContact ? 'Oui' : 'Non'}`,
    `• Nombre de photos : ${photos.length}`,
    ``,
    `Merci de me recontacter pour réaliser le diagnostic gratuit sans engagement.`,
  ].join('\n');

  const mailtoLink = `mailto:nova.entretien33@outlook.fr?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const webOutlookLink = `https://outlook.live.com/mail/0/deeplink/compose?to=nova.entretien33@outlook.fr&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const webGmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=nova.entretien33@outlook.fr&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const whatsappLink = `https://wa.me/33624685217?text=${encodeURIComponent(`Bonjour NOVA CB, je viens de faire une demande de diagnostic gratuit pour mon support : ${supportSelected || 'extérieur'}. Pouvez-vous me recontacter ?`)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setIsStarted(false);
    setCurrentStep(1);
    setSupportSelected('');
    setObservedProblems([]);
    setFullName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setPostalCode('33700');
    setCity('Mérignac');
    setPhotos([]);
  };

  // ==========================================
  // VIEW: 7. PAGE DE CONFIRMATION APRÈS ENVOI
  // ==========================================
  if (isSubmitted) {
    return (
      <div 
        id="diagnostic-form-success-container"
        className={`bg-[#0c1630] text-white rounded-3xl p-6 sm:p-10 border border-sky-800/80 shadow-2xl animate-in fade-in zoom-in-95 duration-300 ${className}`}
      >
        {/* Main Checkmark Badge */}
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/40 shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        {/* Title & Subtitle as requested in Section 7 */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Votre demande de diagnostic est bien enregistrée ✓
          </h3>
          <p className="text-sky-300 font-bold text-base sm:text-lg">
            Merci pour votre confiance.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Nous allons étudier votre demande afin de vous apporter une première orientation personnalisée.
          </p>
        </div>

        {/* Next Steps Card as requested in Section 7 */}
        <div className="bg-[#080f22] rounded-2xl p-5 sm:p-6 border border-sky-900/60 max-w-xl mx-auto mb-6 text-left shadow-lg">
          <h4 className="text-xs font-black uppercase tracking-wider text-sky-400 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Prochaine étape :</span>
          </h4>
          <ol className="space-y-3.5 text-xs sm:text-sm text-slate-200">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-300 font-bold text-xs flex items-center justify-center shrink-0 border border-sky-400/40">
                1
              </span>
              <span className="pt-0.5"><strong className="text-white">Nous prenons connaissance de votre demande</strong> (support : {supportSelected || 'extérieur'}).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-300 font-bold text-xs flex items-center justify-center shrink-0 border border-sky-400/40">
                2
              </span>
              <span className="pt-0.5"><strong className="text-white">Nous vous recontactons</strong> par téléphone au {phone} sous 24 à 48h.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-300 font-bold text-xs flex items-center justify-center shrink-0 border border-sky-400/40">
                3
              </span>
              <span className="pt-0.5"><strong className="text-white">Nous réalisons le diagnostic</strong> technique sur place, gratuitement et sans engagement.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-300 font-bold text-xs flex items-center justify-center shrink-0 border border-sky-400/40">
                4
              </span>
              <span className="pt-0.5"><strong className="text-white">Nous vous présentons les solutions adaptées</strong> pour préserver durablement votre bien.</span>
            </li>
          </ol>
        </div>

        {/* Secondary Buttons as requested in Section 7 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-6">
          <a
            href="tel:0624685217"
            className="w-full bg-sky-500 hover:bg-sky-400 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg shadow-sky-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>📞 Être rappelé (06 24 68 52 17)</span>
          </a>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>💬 Nous contacter sur WhatsApp</span>
          </a>
        </div>

        {/* Summary of Submitted Details */}
        <div className="bg-[#080f22]/70 rounded-2xl p-4 max-w-xl mx-auto mb-6 text-xs text-slate-300 text-left border border-sky-900/40 space-y-1.5">
          <div className="font-bold text-white pb-1 border-b border-slate-800 flex items-center justify-between">
            <span>Récapitulatif de votre diagnostic</span>
            <span className="text-emerald-400 text-[11px] font-semibold">Statut : Transmis ✓</span>
          </div>
          <div><strong className="text-slate-200">Support :</strong> {supportSelected}</div>
          <div><strong className="text-slate-200">Problème(s) :</strong> {observedProblems.join(', ')}</div>
          <div><strong className="text-slate-200">Contact :</strong> {fullName} • {phone} • {email}</div>
          <div><strong className="text-slate-200">Commune :</strong> {postalCode} {city}</div>
          {photos.length > 0 && <div><strong className="text-slate-200">Photos :</strong> {photos.length} photo(s) transmise(s)</div>}
        </div>

        {/* Direct Email Backup Options */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white font-medium underline cursor-pointer transition-colors"
          >
            Faire une autre demande de diagnostic
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: HERO ENTRY / INTRO DE LA SECTION
  // If user hasn't clicked "DEMANDER MON DIAGNOSTIC GRATUIT" yet
  // ==========================================
  if (!isStarted) {
    return (
      <div 
        id="diagnostic-intro-container"
        className={`bg-[#0c1630] rounded-3xl p-6 sm:p-8 lg:p-10 border border-sky-800/80 shadow-2xl relative text-white ${className}`}
      >
        <div className="max-w-xl mx-auto text-center space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-400/30">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Première étape 100% offerte & sans engagement</span>
          </div>

          {/* 1. NOUVEAU TITRE & SOUS-TITRE */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            Demander mon diagnostic gratuit
          </h3>

          <p className="text-sky-100 text-base sm:text-lg font-semibold leading-relaxed">
            Évaluez gratuitement l'état de votre toiture, façade, muret ou terrasse, sans engagement.
          </p>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            Un premier échange nous permet d'identifier vos besoins, l'état du support et la solution la plus adaptée.
          </p>

          {/* Visual Step-by-Step Preview */}
          <div className="grid grid-cols-3 gap-2 py-3 text-left">
            <div className="bg-[#080f22] p-3 rounded-2xl border border-sky-900/50">
              <span className="text-[10px] text-sky-400 font-bold uppercase block">Étape 1</span>
              <span className="text-xs font-bold text-white block mt-0.5">Votre besoin</span>
              <span className="text-[11px] text-slate-400">Toiture, terrasse...</span>
            </div>
            <div className="bg-[#080f22] p-3 rounded-2xl border border-sky-900/50">
              <span className="text-[10px] text-sky-400 font-bold uppercase block">Étape 2</span>
              <span className="text-xs font-bold text-white block mt-0.5">État observé</span>
              <span className="text-[11px] text-slate-400">Mousse, taches...</span>
            </div>
            <div className="bg-[#080f22] p-3 rounded-2xl border border-sky-900/50">
              <span className="text-[10px] text-sky-400 font-bold uppercase block">Étape 3</span>
              <span className="text-xs font-bold text-white block mt-0.5">Coordonnées</span>
              <span className="text-[11px] text-slate-400">Réponse rapide</span>
            </div>
          </div>

          {/* 2. BOUTON PRINCIPAL */}
          <div className="pt-2">
            <button
              id="cta-demander-diagnostic-gratuit"
              type="button"
              onClick={() => {
                setIsStarted(true);
                setCurrentStep(1);
              }}
              className="w-full bg-sky-500 hover:bg-sky-400 active:scale-98 text-white font-black text-base sm:text-lg py-4 px-6 rounded-2xl shadow-xl shadow-sky-500/35 hover:shadow-sky-400/50 transition-all flex items-center justify-center gap-3 cursor-pointer group uppercase tracking-wide border border-sky-400/40"
            >
              <span>DEMANDER MON DIAGNOSTIC GRATUIT</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* 3. MICRO-ARGUMENTS DE RÉASSURANCE */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-bold text-slate-200">
              <span className="flex items-center gap-1.5 text-emerald-400">
                ✓ Diagnostic gratuit
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                ✓ Sans engagement
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                ✓ Conseils personnalisés
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                ✓ Réponse rapide
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-sky-900/50 flex items-center justify-center gap-3 text-xs text-slate-400">
            <span>Ou appel direct :</span>
            <a href="tel:0624685217" className="text-sky-300 hover:text-white font-extrabold flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>06 24 68 52 17</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: 4. PARCOURS PROGRESSIF DU FORMULAIRE
  // ==========================================
  return (
    <div 
      id="diagnostic-form-wrapper"
      className={`bg-[#0c1630] rounded-3xl p-6 sm:p-8 lg:p-10 border border-sky-800/80 shadow-2xl relative text-white ${className}`}
    >
      {/* Progress Bar Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Diagnostic gratuit sans engagement</span>
          </span>
          <span className="text-slate-400 font-semibold">
            Étape {currentStep} sur 4
          </span>
        </div>

        {/* Progress track */}
        <div className="w-full bg-[#080f22] h-2 rounded-full overflow-hidden border border-sky-900/50">
          <div 
            className="bg-gradient-to-r from-sky-500 to-sky-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Error message banner */}
      {errorMsg && (
        <div className="mb-5 p-3.5 rounded-2xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2.5 animate-in fade-in duration-150">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ===================================== */}
      {/* ÉTAPE 1 — VOTRE BESOIN */}
      {/* ===================================== */}
      {currentStep === 1 && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Que souhaitez-vous faire diagnostiquer ?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Sélectionnez la surface concernée par votre demande.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SUPPORT_OPTIONS.map((item) => {
              const isSelected = supportSelected === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSupportSelected(item.id);
                    setErrorMsg(null);
                  }}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-3.5 group relative ${
                    isSelected
                      ? 'bg-sky-950/80 border-sky-400 shadow-lg shadow-sky-500/20 ring-1 ring-sky-400'
                      : 'bg-[#080f22] border-sky-900/50 hover:border-sky-600 hover:bg-[#0c1630]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform ${
                    isSelected ? 'bg-sky-500 text-white scale-105' : 'bg-slate-900 border border-sky-900/60'
                  }`}>
                    <span>{item.icon}</span>
                  </div>
                  <div className="flex-1 pr-6">
                    <span className="font-extrabold text-white text-sm sm:text-base block group-hover:text-sky-300 transition-colors">
                      {item.label}
                    </span>
                    <span className="text-slate-400 text-xs block mt-0.5 leading-snug">
                      {item.desc}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-sky-900/50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrevStep}
              className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-2.5 transition-colors cursor-pointer"
            >
              ← Annuler
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-extrabold text-sm py-3 px-6 rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Continuer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ===================================== */}
      {/* ÉTAPE 2 — ÉTAT OBSERVÉ */}
      {/* ===================================== */}
      {currentStep === 2 && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Quel problème avez-vous constaté ?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Plusieurs choix possibles pour adapter notre matériel et nos méthodes.
            </p>
          </div>

          {/* Helper Reassurance Note as requested in Section 4 */}
          <div className="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-600/40 text-xs text-sky-200 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <span>
              <strong>Vous n'êtes pas certain du problème ?</strong> Aucun souci, nous pouvons vous aider à l'identifier.
            </span>
          </div>

          {/* Multiple choice tags / buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
            {PROBLEM_OPTIONS.map((prob) => {
              const isSelected = observedProblems.includes(prob);
              return (
                <button
                  key={prob}
                  type="button"
                  onClick={() => handleToggleProblem(prob)}
                  className={`p-3 rounded-xl text-left border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25'
                      : 'bg-[#080f22] text-slate-200 border-sky-900/50 hover:border-sky-600 hover:text-white'
                  }`}
                >
                  <span className="truncate pr-1">{prob}</span>
                  <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                    isSelected ? 'bg-white text-sky-600 border-white' : 'border-slate-700 bg-slate-900'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-sky-900/50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrevStep}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2.5 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour</span>
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-extrabold text-sm py-3 px-6 rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Continuer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ===================================== */}
      {/* ÉTAPE 3 — VOS COORDONNÉES & PHOTOS */}
      {/* ===================================== */}
      {currentStep === 3 && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Vos coordonnées
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Ces informations nous permettent de vous recontacter et de localiser votre bien en Gironde (33).
            </p>
          </div>

          <div className="space-y-4">
            {/* Identity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Nom / Prénom <span className="text-sky-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Christophe B."
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-900/60 bg-[#080f22] text-white placeholder:text-slate-500 text-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Téléphone <span className="text-sky-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ex : 06 24 68 52 17"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-900/60 bg-[#080f22] text-white placeholder:text-slate-500 text-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all"
                />
              </div>
            </div>

            {/* Email & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  E-mail <span className="text-sky-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="Ex : contact@exemple.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-900/60 bg-[#080f22] text-white placeholder:text-slate-500 text-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Adresse du bien
                </label>
                <input
                  type="text"
                  placeholder="Ex : 33 avenue Léon Blum"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-900/60 bg-[#080f22] text-white placeholder:text-slate-500 text-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all"
                />
              </div>
            </div>

            {/* Postal Code & City */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Code postal
                </label>
                <input
                  type="text"
                  placeholder="33700"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-900/60 bg-[#080f22] text-white placeholder:text-slate-500 text-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Ville
                </label>
                <input
                  type="text"
                  placeholder="Mérignac, Bordeaux..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-900/60 bg-[#080f22] text-white placeholder:text-slate-500 text-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all"
                />
              </div>
            </div>

            {/* 5. PHOTO — ÉLÉMENT DE CONVERSION (Facultatif) */}
            <div className="pt-2 border-t border-sky-900/50">
              <div className="bg-[#080f22] p-4 rounded-2xl border border-sky-900/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-bold text-white">
                      Une photo peut nous aider à préparer votre diagnostic.
                    </span>
                  </div>
                  <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full font-semibold border border-sky-500/30">
                    Facultatif
                  </span>
                </div>

                <p className="text-[11px] text-slate-400">
                  Facultatif — 1 à 3 photos suffisent. Ne jamais rendre l'ajout de photo obligatoire.
                </p>

                {/* Upload Button */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload-input"
                  />
                  {photos.length < 3 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-300 hover:text-white border border-sky-700/60 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>+ Ajouter une photo ({photos.length}/3)</span>
                    </button>
                  )}
                </div>

                {/* Photos previews list */}
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2.5 pt-2">
                    {photos.map((item) => (
                      <div key={item.id} className="relative group rounded-xl overflow-hidden border border-sky-900/60 bg-black aspect-video">
                        <img 
                          src={item.previewUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(item.id)}
                          className="absolute top-1 right-1 p-1 bg-rose-600/90 text-white rounded-md hover:bg-rose-700 transition-colors cursor-pointer"
                          title="Supprimer la photo"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Checkbox consent as requested in Section 4 */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={consentContact}
                  onChange={(e) => setConsentContact(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-sky-500 bg-[#080f22] border-sky-700 focus:ring-0 cursor-pointer"
                />
                <span>
                  J'accepte d'être recontacté concernant ma demande de diagnostic gratuit.
                </span>
              </label>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-sky-900/50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrevStep}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2.5 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour</span>
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-extrabold text-sm py-3 px-6 rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Vérifier mon résumé</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ===================================== */}
      {/* ÉTAPE 4 — 6. DERNIÈRE ÉTAPE AVANT ENVOI */}
      {/* ===================================== */}
      {currentStep === 4 && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Votre demande de diagnostic gratuit
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Vérifiez vos informations avant de confirmer votre demande d'évaluation.
            </p>
          </div>

          {/* Clean Summary Card */}
          <div className="bg-[#080f22] rounded-2xl p-4 sm:p-5 border border-sky-900/60 text-xs sm:text-sm space-y-2.5 text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400 font-medium">Support sélectionné :</span>
              <span className="font-extrabold text-white bg-sky-500/20 text-sky-300 px-2.5 py-0.5 rounded-full border border-sky-400/30">
                {supportSelected || 'Toiture'}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400 font-medium">Problème(s) constaté(s) :</span>
              <span className="font-bold text-white text-right max-w-[200px] truncate">
                {observedProblems.join(', ') || 'Non précisé'}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400 font-medium">Nom :</span>
              <span className="font-bold text-white">{fullName}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400 font-medium">Téléphone :</span>
              <span className="font-bold text-sky-400">{phone}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400 font-medium">E-mail :</span>
              <span className="font-bold text-white">{email}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">Ville :</span>
              <span className="font-bold text-white">{postalCode} {city}</span>
            </div>

            {photos.length > 0 && (
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-emerald-400 font-semibold text-xs">
                <span>Photos jointes :</span>
                <span>{photos.length} photo(s) prête(s)</span>
              </div>
            )}
          </div>

          {/* Section 6 Text: Tout est prêt ? Envoyez votre demande. */}
          <div className="text-center pt-2 space-y-3">
            <p className="text-base sm:text-lg font-black text-white">
              Tout est prêt ? Envoyez votre demande.
            </p>

            {/* Primary Submit Button */}
            <button
              id="submit-diagnostic-final-btn"
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmitDiagnostic()}
              className="w-full bg-sky-500 hover:bg-sky-400 active:scale-98 text-white font-black text-base sm:text-lg py-4 px-6 rounded-2xl shadow-xl shadow-sky-500/35 hover:shadow-sky-400/50 transition-all flex items-center justify-center gap-3 cursor-pointer group uppercase tracking-wide border border-sky-400/40 disabled:opacity-75"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  <span>Envoi de votre demande...</span>
                </span>
              ) : (
                <>
                  <span>JE DEMANDE MON DIAGNOSTIC GRATUIT</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Reassurance text under button as requested in Section 6 */}
            <p className="text-xs font-bold text-slate-300">
              Gratuit • Sans engagement • Réponse rapide
            </p>
          </div>

          {/* Back button to edit */}
          <div className="pt-2 flex justify-start">
            <button
              type="button"
              onClick={handlePrevStep}
              className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Modifier mes informations</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
