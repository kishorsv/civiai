import React from 'react';
import { 
  Bot, 
  ShieldCheck, 
  FileCheck2, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Scale, 
  Lock,
  Layers
} from 'lucide-react';

interface BentoFeaturesProps {
  onNavigate: (tab: string) => void;
}

export const BentoFeatures: React.FC<BentoFeaturesProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligent Civic Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
          Engineered for the Modern Citizen
        </h2>
        <p className="text-sm sm:text-base text-[#A8B2C1]">
          Cutting through bureaucratic friction with verifiable AI, contextual eligibility matching, and sovereign document security.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Large AI Citizen Assistant (Span 2) */}
        <div 
          onClick={() => onNavigate('assistant')}
          className="md:col-span-2 glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-blue-500/20 transition-all" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Bot className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Natural Language
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
              Explainable AI Assistant
            </h3>
            <p className="text-sm text-[#A8B2C1] mt-2 max-w-md leading-relaxed">
              Ask complex civic questions in your native language. CiviAI translates convoluted legal gazettes into crystal clear eligibility requirements and next steps.
            </p>
          </div>

          {/* Mini Interactive Preview Snippet */}
          <div className="mt-6 p-3.5 rounded-2xl bg-[#11161D] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#667085]">Citizen query: "Can I get health cover for my grandparents?"</span>
              <span className="text-emerald-400 font-bold">Verified Match</span>
            </div>
            <div className="p-2 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-white/90">
              💡 Yes. Under expanded <strong className="text-blue-300">Ayushman Bharat 2026</strong>, citizens aged 70+ receive free ₹5 Lakh health assurance regardless of family income.
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-blue-400">
            <span>Launch AI Assistant →</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Card 2: Government Scheme Discovery */}
        <div 
          onClick={() => onNavigate('schemes')}
          className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between group cursor-pointer"
        >
          <div>
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
              Scheme Directory
            </h3>
            <p className="text-xs sm:text-sm text-[#A8B2C1] mt-2 leading-relaxed">
              Browse 380+ welfare schemes across Central and 28 State governments with automated persona eligibility filters.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-emerald-400">
            <span>Discover Schemes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Interactive Civic Map */}
        <div 
          onClick={() => onNavigate('map')}
          className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between group cursor-pointer"
        >
          <div>
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
              Nearby Administrative Hubs
            </h3>
            <p className="text-xs sm:text-sm text-[#A8B2C1] mt-2 leading-relaxed">
              Find nearest Taluk offices, Seva Kendras, and hospitals with verified office hours, contact officers, and direct routes.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-purple-400">
            <span>Explore Map</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Civic Services Directory (Span 2) */}
        <div 
          onClick={() => onNavigate('services')}
          className="md:col-span-2 glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              10 Major Sectors
            </span>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            Comprehensive Civic Services
          </h3>
          <p className="text-sm text-[#A8B2C1] mt-2 max-w-lg leading-relaxed">
            From Birth Certificates and Driving Licenses to Property Tax and Water Connections — view turnaround times, fees, and required checklists before you apply.
          </p>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-cyan-400">
            <span>View All Civic Services →</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 5: Application Tracking */}
        <div 
          onClick={() => onNavigate('applications')}
          className="md:col-span-2 glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Real-Time Tracking
            </span>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
            Unified Application Lifecycle
          </h3>
          <p className="text-sm text-[#A8B2C1] mt-2 leading-relaxed">
            Track statutory approvals across revenue, health, and transport departments in one unified dashboard with alert notifications.
          </p>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-amber-400">
            <span>Track Application Status →</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

    </section>
  );
};
