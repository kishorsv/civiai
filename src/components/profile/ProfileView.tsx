import React from 'react';
import { 
  User, 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Phone, 
  FileText, 
  Lock, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  Bell, 
  Eye, 
  Smartphone,
  Check
} from 'lucide-react';
import { CitizenProfile, Language } from '../../types';

interface ProfileViewProps {
  activePersona: CitizenProfile;
  personas: CitizenProfile[];
  onSelectPersona: (p: CitizenProfile) => void;
  currentLanguage: Language;
  setCurrentLanguage: (l: Language) => void;
  onNavigate: (tab: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  activePersona,
  personas,
  onSelectPersona,
  currentLanguage,
  setCurrentLanguage,
  onNavigate
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Profile Header Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-[#0D1117] to-[#151B23]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={activePersona.avatarUrl}
                alt={activePersona.name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-blue-500/40 shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-emerald-500 text-black shadow-md">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
                  {activePersona.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Aadhaar Verified
                </span>
              </div>
              <p className="text-xs text-[#A8B2C1] mt-1 font-medium">
                {activePersona.occupation} • {activePersona.age} Years Old • Category: <strong className="text-white">{activePersona.category}</strong>
              </p>
              <p className="text-xs text-blue-400 mt-0.5 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activePersona.district}, {activePersona.state}</span>
              </p>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="sm:text-right space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>DigiLocker Linked</span>
            </div>
            <p className="text-[11px] text-[#667085]">Statutory data sovereign to citizen</p>
          </div>

        </div>
      </div>

      {/* Switch Persona Shelf (For Demo & Testing) */}
      <div className="glass-card rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Switch Testing Citizen Profile</span>
            </h3>
            <p className="text-[11px] text-[#A8B2C1]">Experience how CiviAI recalibrates schemes and AI advice dynamically</p>
          </div>
          <span className="text-[10px] text-[#667085] uppercase font-bold">Demo Mode</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {personas.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectPersona(p)}
              className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                activePersona.id === p.id
                  ? 'bg-blue-600/20 border-blue-500/50 shadow-md shadow-blue-950/40'
                  : 'bg-[#11161D] hover:bg-[#151B23] border-white/5'
              }`}
            >
              <img src={p.avatarUrl} alt={p.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{p.name}</p>
                <p className="text-[10px] text-[#A8B2C1] truncate">{p.occupation}</p>
                <p className="text-[9px] text-emerald-400 font-semibold">{p.state}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Clean Settings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Personal & Household Information */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <span>Socio-Economic Identity</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[#A8B2C1]">Annual Household Income</span>
              <strong className="text-white">₹{activePersona.annualIncome.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[#A8B2C1]">BPL / Ration Status</span>
              <strong className={activePersona.isBPL ? 'text-emerald-400' : 'text-[#A8B2C1]'}>
                {activePersona.isBPL ? 'BPL / Antyodaya Cardholder' : 'APL Non-BPL'}
              </strong>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[#A8B2C1]">Farmer Landholding Record</span>
              <strong className={activePersona.isFarmer ? 'text-emerald-400' : 'text-[#A8B2C1]'}>
                {activePersona.isFarmer ? 'Verified Landowner (RTC)' : 'Non-Agricultural'}
              </strong>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#A8B2C1]">Senior Citizen / Student</span>
              <strong className="text-white">
                {activePersona.isSeniorCitizen ? 'Senior Citizen' : activePersona.isStudent ? 'Active Student' : 'General Working Age'}
              </strong>
            </div>
          </div>
        </div>

        {/* Sovereign Document Locker */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Digital Document Vault</span>
            </h3>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
              {activePersona.documentsInVault.length} Available
            </span>
          </div>

          <p className="text-xs text-[#A8B2C1]">
            Encrypted documents available for instant AI eligibility verification without paperwork.
          </p>

          <div className="space-y-2">
            {activePersona.documentsInVault.map((doc, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#11161D] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-white font-medium">{doc}</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Language & Accessibility Preferences */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Civic Language & Speech</span>
          </h3>
          
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#A8B2C1]">Interface & AI Voice Language</span>
              <span className="text-white font-bold">{currentLanguage}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#A8B2C1]">Audio Read Aloud (TTS)</span>
              <span className="text-emerald-400 font-bold">Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#A8B2C1]">Speech Recognition (STT)</span>
              <span className="text-emerald-400 font-bold">Supported (Web Speech API)</span>
            </div>
          </div>
        </div>

        {/* Data Sovereignty & Privacy */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            <span>Privacy & Public Record Security</span>
          </h3>

          <p className="text-xs text-[#A8B2C1] leading-relaxed">
            Your personal credentials are kept client-side and never sold. AI prompts query official statutory regulations without storing sensitive biometric identifiers.
          </p>

          <div className="pt-2 flex items-center justify-between text-xs text-[#667085]">
            <span>DPDP Act 2023 Compliant</span>
            <span className="text-blue-400 font-semibold">Zero Telemetry Sale</span>
          </div>
        </div>

      </div>

    </div>
  );
};
