import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { FAQ_ITEMS } from '../data/faqData';

interface FaqSectionProps {
  onOpenQuote: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenQuote }) => {
  // Allow toggling items; start with the first question open by default
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-[#0b1329] border-t border-sky-950/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
            <span>Foire aux questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Des <span className="text-sky-400">Questions ?</span> Nous avons les réponses
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Tout ce que vous devez savoir sur nos méthodes d’intervention, la sécurité de vos matériaux et notre tarification.
          </p>
        </div>

        {/* Questions with answers placed directly underneath */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0f1d3d] border-sky-500/60 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/30'
                    : 'bg-[#0e1935] border-sky-900/50 hover:border-sky-500/40 hover:bg-[#122044]'
                }`}
              >
                <button
                  id={`faq-question-btn-${idx}`}
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span
                    className={`text-base sm:text-lg font-bold transition-colors ${
                      isOpen ? 'text-sky-300' : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    {item.question}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'bg-slate-900/90 text-slate-300 border border-sky-900/60'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-sky-900/40 pt-4 bg-[#0d1833]"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Help Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#0e1935] text-white border border-sky-900/50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">Une autre question sur nos prestations ?</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Notre équipe technique <strong className="text-white font-bold">NOVA CB</strong> à Mérignac vous renseigne et vous conseille gratuitement.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-end shrink-0 w-full sm:w-auto">
            <a
              href="tel:0624685217"
              className="text-xs font-bold text-white hover:text-sky-400 px-4 py-2.5 rounded-full border border-slate-700 hover:border-slate-600 bg-slate-800/80 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>06 24 68 52 17</span>
            </a>
            <button
              onClick={onOpenQuote}
              className="bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-sky-500/20"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Poser une question</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
