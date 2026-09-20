import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  Calendar, 
  FileText, 
  Sparkles,
  Users,
  Check
} from 'lucide-react';
import { Scheme, CitizenProfile } from '../../types';

interface SchemeDetailModalProps {
  scheme: Scheme | null;
  onClose: () => void;
  onOpenEligibility: (scheme: Scheme) => void;
  activePersona: CitizenProfile;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  onClose,
  onOpenEligibility,
  activePersona
}) => {
  if (!scheme) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Click backdrop to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#0D1117] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Modal Header / Banner */}
        <div className="p-6 sm:p-8 bg-[#11161D] border-b border-white/10 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {scheme.category}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              {scheme.status}
            </span>
            <span className="text-xs text-[#A8B2C1]">
              {scheme.sponsoringBody}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
            {scheme.title}
          </h2>

          <p className="text-xs text-[#A8B2C1] mt-1.5 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>{scheme.department}</span>
          </p>

          {/* Quick CTA Banner */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#080B10] border border-white/10">
            <div>
              <p className="text-[10px] uppercase font-bold text-[#667085]">Financial Benefit / Entitlement</p>
              <p className="text-base sm:text-lg font-bold text-emerald-400">{scheme.financialAssistance || 'Statutory Benefit'}</p>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenEligibility(scheme);
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Check My Eligibility</span>
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[65vh] overflow-y-auto">
          
          {/* Section: Overview */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">Overview</h4>
            <p className="text-sm text-[#A8B2C1] leading-relaxed">
              {scheme.detailedOverview}
            </p>
          </div>

          {/* Section: Who can apply & Eligibility Criteria */}
          <div className="p-5 rounded-2xl bg-[#11161D] border border-white/5 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Who Can Apply?</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#A8B2C1]">
              {scheme.eligibilityCriteria.customRules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-normal">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Required Documents Checklist */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Required Documents</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {scheme.requiredDocuments.map((doc, idx) => {
                const inVault = activePersona.documentsInVault.includes(doc);
                return (
                  <div key={idx} className="p-3 rounded-xl bg-[#11161D] border border-white/5 flex items-center justify-between text-xs">
                    <span className="text-white font-medium">{doc}</span>
                    {inVault ? (
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> In Vault
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-semibold">
                        Needed
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Vertical 5-Step Application Stepper */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              How to Apply (5-Step Roadmap)
            </h4>
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-blue-500 before:via-cyan-400 before:to-transparent">
              {scheme.applicationSteps.map((step) => (
                <div key={step.stepNumber} className="relative">
                  <div className="absolute -left-6 sm:-left-8 top-0 w-6 h-6 rounded-full bg-[#080B10] border-2 border-blue-400 text-blue-300 font-mono font-bold text-xs flex items-center justify-center">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-white">
                      {step.title}
                    </h5>
                    <p className="text-xs text-[#A8B2C1] mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Official Information & Source Link */}
          <div className="p-4 rounded-2xl bg-[#080B10] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#A8B2C1]">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified Official Central/State Gazette Authority</span>
            </div>
            <a
              href={scheme.officialPortalUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>Visit Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
