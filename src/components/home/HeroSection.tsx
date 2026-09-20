import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  Building2,
  ChevronRight
} from 'lucide-react';
import { CivicIntelligenceNode } from '../common/CivicIntelligenceNode';

interface HeroSectionProps {
  onAskAI: () => void;
  onExplore: () => void;
  onSelectCategory: (cat: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onAskAI,
  onExplore,
  onSelectCategory
}) => {
  return (
    <section className="relative pt-8 pb-16 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background Subtle Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] radial-glow-blue pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] radial-glow-cyan pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Editorial Copy */}
        <div className="lg:col-span-6 space-y-6 text-left relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#11161D] border border-white/10 text-xs text-white/90 shadow-lg">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold text-[11px] text-cyan-300">Public Beta 2.0</span>
            <span className="text-white/30">•</span>
            <span className="text-[#A8B2C1] text-[11px]">Powered by AI Civic Knowledge Engine</span>
          </div>

          {/* Cinematic Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-['Plus_Jakarta_Sans']">
            Navigate Your City. <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Understand Your Government.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-[#A8B2C1] leading-relaxed max-w-xl font-normal">
            CiviAI helps you discover civic services, government schemes, offices and public resources through one intelligent, verified interface.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onAskAI}
              className="h-12 sm:h-13 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Ask CiviAI</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExplore}
              className="h-12 sm:h-13 px-6 rounded-xl bg-[#11161D] hover:bg-[#151B23] border border-white/10 hover:border-white/20 text-white font-semibold text-sm transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Services</span>
              <ChevronRight className="w-4 h-4 text-white/50" />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-6 text-xs text-[#A8B2C1]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-medium">AI-powered discovery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="font-medium">Verified civic information</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="font-medium">Multilingual voice support</span>
            </div>
          </div>

        </div>

        {/* Right Interactive Civic Intelligence Node */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <CivicIntelligenceNode onSelectCategory={onSelectCategory} />
        </div>

      </div>

    </section>
  );
};
