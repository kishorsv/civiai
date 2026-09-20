import React from 'react';
import { 
  X, 
  Layers, 
  Building2, 
  Clock, 
  CreditCard, 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { CivicService } from '../../types';

interface ServiceDetailModalProps {
  service: CivicService | null;
  onClose: () => void;
  onStartApplication: (service: CivicService) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onStartApplication
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#0D1117] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#11161D] border-b border-white/10 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {service.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              {service.onlineAvailability}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
            {service.title}
          </h2>

          <p className="text-xs text-[#A8B2C1] mt-1.5 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{service.department}</span>
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#080B10] border border-white/10 text-xs">
            <div>
              <span className="text-[#667085] text-[10px] uppercase font-bold block">Processing Turnaround</span>
              <strong className="text-emerald-400 font-bold">{service.turnaroundTime}</strong>
            </div>
            <div>
              <span className="text-[#667085] text-[10px] uppercase font-bold block">Statutory Official Fee</span>
              <strong className="text-white font-bold">{service.officialFee}</strong>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[#667085] text-[10px] uppercase font-bold block">Digital Signature</span>
              <strong className="text-cyan-400 font-bold">QR-Coded e-Certificate</strong>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Detailed Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">What is this service?</h4>
            <p className="text-sm text-[#A8B2C1] leading-relaxed">
              {service.detailedDescription}
            </p>
          </div>

          {/* Required Documents */}
          <div className="p-4 rounded-2xl bg-[#11161D] border border-white/5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Mandatory Checklist & Documents</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#A8B2C1]">
              {service.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Application Steps */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">How to Apply (Steps)</h4>
            <ol className="space-y-2.5 text-xs text-[#A8B2C1]">
              {service.applicationSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-mono font-bold text-cyan-400 text-xs mt-0.5">0{idx + 1}.</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions Banner */}
          <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
            <a
              href={service.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#A8B2C1] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>View Official Department Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => onStartApplication(service)}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 transition-all hover:scale-[1.02]"
            >
              <span>Start Application Submission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
