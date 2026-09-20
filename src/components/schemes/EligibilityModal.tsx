import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Scheme, CitizenProfile } from '../../types';

interface EligibilityModalProps {
  scheme: Scheme | null;
  activePersona: CitizenProfile;
  onClose: () => void;
  onNavigateToApply: (scheme: Scheme) => void;
}

export const EligibilityModal: React.FC<EligibilityModalProps> = ({
  scheme,
  activePersona,
  onClose,
  onNavigateToApply
}) => {
  if (!scheme) return null;

  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [isEligible, setIsEligible] = useState(true);
  const [matchScore, setMatchScore] = useState(95);

  const evaluateCriteria = () => {
    let eligible = true;
    let score = 100;

    if (scheme.eligibilityCriteria.farmerOnly && !activePersona.isFarmer) {
      eligible = false;
      score -= 50;
    }
    if (scheme.eligibilityCriteria.studentOnly && !activePersona.isStudent) {
      eligible = false;
      score -= 50;
    }
    if (scheme.eligibilityCriteria.maxIncome && activePersona.annualIncome > scheme.eligibilityCriteria.maxIncome) {
      eligible = false;
      score -= 35;
    }
    if (scheme.eligibilityCriteria.bplOnly && !activePersona.isBPL) {
      eligible = false;
      score -= 40;
    }

    setIsEligible(eligible);
    setMatchScore(Math.max(20, score));
    setHasEvaluated(true);

    if (eligible) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#0D1117] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-7 z-10 space-y-6 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-cyan-400 border border-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Smart Eligibility Checker</h3>
              <p className="text-xs text-[#A8B2C1]">Automated evaluation against statutory gazettes</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-white/5 text-white/50 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scheme & Citizen Summary */}
        <div className="p-4 rounded-2xl bg-[#11161D] border border-white/5 space-y-3 text-xs">
          <div>
            <span className="text-[#667085] uppercase font-bold text-[10px]">Testing Eligibility For:</span>
            <h4 className="font-bold text-white text-sm mt-0.5">{scheme.title}</h4>
            <p className="text-emerald-400 font-semibold mt-0.5">{scheme.financialAssistance}</p>
          </div>

          <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-[#A8B2C1]">
            <div>
              <span className="text-[#667085] block text-[10px]">Candidate:</span>
              <strong className="text-white">{activePersona.name}</strong> ({activePersona.age}y)
            </div>
            <div>
              <span className="text-[#667085] block text-[10px]">Occupation:</span>
              <strong className="text-white">{activePersona.occupation}</strong>
            </div>
            <div>
              <span className="text-[#667085] block text-[10px]">Location:</span>
              <strong className="text-white">{activePersona.district}, {activePersona.state}</strong>
            </div>
            <div>
              <span className="text-[#667085] block text-[10px]">Annual Income:</span>
              <strong className="text-white">₹{activePersona.annualIncome.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </div>

        {/* Evaluation Results Card */}
        {hasEvaluated ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className={`p-4 rounded-2xl border text-center space-y-2 ${
              isEligible
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              <div className="inline-flex p-3 rounded-2xl bg-white/5">
                {isEligible ? <CheckCircle2 className="w-8 h-8 text-emerald-400" /> : <AlertTriangle className="w-8 h-8 text-amber-400" />}
              </div>
              <h4 className="text-lg font-bold text-white">
                {isEligible ? 'High Eligibility Match!' : 'Partial Criteria Match'}
              </h4>
              <p className="text-xs text-[#A8B2C1] max-w-sm mx-auto">
                {isEligible
                  ? `Your active credentials fulfill all core criteria for ${scheme.shortCode}. You are clear to proceed with application submission.`
                  : `One or more income, landholding, or occupation thresholds diverge from the statutory rules for this specific scheme.`}
              </p>
              <div className="pt-2 text-2xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
                {matchScore}% Match Score
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setHasEvaluated(false)}
                className="flex-1 py-3 rounded-xl bg-[#151B23] hover:bg-[#1A212B] border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-check</span>
              </button>
              <a
                href={scheme.officialPortalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Proceed to Official Apply</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-[#080B10] border border-white/5 text-xs text-[#A8B2C1] space-y-1.5">
              <span className="font-bold text-white text-[11px] uppercase tracking-wider block">
                Verification Criteria:
              </span>
              {scheme.eligibilityCriteria.customRules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>

            <button
              onClick={evaluateCriteria}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Evaluate Profile Now</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
