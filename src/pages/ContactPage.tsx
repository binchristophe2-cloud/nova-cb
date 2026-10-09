import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, Sparkles, Navigation } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';

interface ContactPageProps {
  selectedService: string;
  onFormSuccess?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ selectedService, onFormSuccess }) => {
  return (
    <div className="py-10 sm:py-16 bg-[#0b1329] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Contactez NOVA CB à Mérignac</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Demander mon <span className="text-sky-400">diagnostic gratuit</span>
          </h1>

          <p className="mt-4 text-slate-200 text-base sm:text-lg leading-relaxed font-medium">
            Évaluez gratuitement l'état de votre toiture, façade, muret ou terrasse, sans engagement.
          </p>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            Un premier échange nous permet d'identifier vos besoins, l'état du support et la solution la plus adaptée.
          </p>
        </div>

        {/* Main Grid: Info + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Coordinates & Local Area */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0e1935] text-white rounded-3xl p-6 sm:p-8 border border-sky-900/50 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
                  Coordonnées officielles
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    NOVA
                  </span>
                  <span className="bg-sky-500 text-white font-black text-sm px-2 py-0.5 rounded shadow-sm tracking-wider">
                    CB
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Nettoyage, rénovation esthétique et entretien des surfaces extérieures.
                </p>
              </div>

              <div className="space-y-4 text-sm pt-4 border-t border-sky-900/40">
                <a
                  href="tel:0624685217"
                  className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900/95 hover:bg-slate-800 border-2 border-sky-500/60 hover:border-sky-400 shadow-lg shadow-sky-500/10 transition-all group cursor-pointer"
                  title="Appeler NOVA CB"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/30 group-hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>Ligne directe 7j/7</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white group-hover:text-sky-300 tracking-wider mt-0.5">
                      06 24 68 52 17
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:nova.entretien33@outlook.fr"
                  className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900/95 hover:bg-slate-800 border-2 border-sky-900/60 hover:border-sky-400 shadow-md transition-all group cursor-pointer"
                  title="Envoyer un email à NOVA CB"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-sky-900/50 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Email professionnel
                    </div>
                    <div className="text-sm sm:text-base font-black text-sky-400 group-hover:text-sky-300 transition-colors truncate mt-0.5">
                      nova.entretien33@outlook.fr
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-900/90 border border-sky-900/40">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Adresse</div>
                    <div className="text-sm font-semibold text-white">
                      33 avenue Léon Blum
                    </div>
                    <div className="text-xs text-slate-300">
                      33700 Mérignac, France
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-900/90 border border-sky-900/40">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Horaires d’intervention</div>
                    <div className="text-sm font-semibold text-white">
                      Lundi au Samedi : 8h00 - 19h00
                    </div>
                    <div className="text-xs text-slate-400">
                      Fermé le Dimanche
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Geographical coverage card */}
            <div className="bg-[#0e1935] rounded-3xl p-6 sm:p-7 border border-sky-900/50 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                <Navigation className="w-4 h-4" />
                <span>Zone d’intervention</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Mérignac et toute la Métropole Bordelaise
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Nous nous déplaçons rapidement dans un rayon de 40 km autour de Mérignac :
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {['Mérignac', 'Bordeaux', 'Pessac', 'Le Bouscat', 'Talence', 'Saint-Médard-en-Jalles', 'Eysines', 'Bruges', 'Gradignan', 'Cenon', 'Bassin d’Arcachon'].map((city) => (
                  <span
                    key={city}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 text-sky-200 border border-sky-900/40"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Quote Form */}
          <div className="lg:col-span-7">
            <ContactForm 
              initialService={selectedService}
              onSuccess={onFormSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
