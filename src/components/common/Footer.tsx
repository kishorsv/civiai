import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Globe2, 
  Github, 
  Twitter, 
  Linkedin, 
  HeartHandshake,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="mt-20 border-t border-white/5 bg-[#05070A] relative z-10">
      
      {/* Trust & Guarantee Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#A8B2C1]">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#0D1117] border border-white/5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">100% Verified Civic Sources</h5>
              <p className="text-[11px] text-[#667085] mt-0.5">Directly mirrored from Gazette notifications & official ministries.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#0D1117] border border-white/5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Explainable AI Assistance</h5>
              <p className="text-[11px] text-[#667085] mt-0.5">Clear separation between verified statutory facts and AI guidance.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#0D1117] border border-white/5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Inclusive Digital Governance</h5>
              <p className="text-[11px] text-[#667085] mt-0.5">8 Indian languages with voice accessibility for every citizen.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#080B10] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-['Plus_Jakarta_Sans']">
                Civi<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
              </span>
            </div>
            <p className="text-sm text-[#A8B2C1] max-w-sm leading-relaxed">
              Intelligence for a more accessible civic experience. Navigate your city, discover entitlements, and interact with public services seamlessly.
            </p>
            <div className="flex items-center gap-3 text-white/50">
              <a href="https://github.com/kishorsv/civiai" target="_blank" rel="noreferrer" className="p-2 rounded-xl hover:bg-white/5 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#twitter" className="p-2 rounded-xl hover:bg-white/5 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#linkedin" className="p-2 rounded-xl hover:bg-white/5 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Platform</h6>
            <ul className="space-y-2 text-xs text-[#A8B2C1]">
              <li>
                <button onClick={() => setActiveTab('schemes')} className="hover:text-white transition-colors">
                  Government Schemes
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-white transition-colors">
                  Civic Services
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('assistant')} className="hover:text-white transition-colors">
                  AI Citizen Assistant
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-white transition-colors">
                  Administrative Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('applications')} className="hover:text-white transition-colors">
                  Application Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Civic Tech */}
          <div>
            <h6 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Civic Tech</h6>
            <ul className="space-y-2 text-xs text-[#A8B2C1]">
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors">
                  Citizen Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('profile')} className="hover:text-white transition-colors">
                  Citizen Persona Profiles
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-white transition-colors">
                  Governance Analytics
                </button>
              </li>
              <li>
                <a href="https://data.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  Open Data India <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h6 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Trust & Ethics</h6>
            <ul className="space-y-2 text-xs text-[#A8B2C1]">
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy & Data Sovereignty</a></li>
              <li><a href="#transparency" className="hover:text-white transition-colors">Algorithmic Transparency</a></li>
              <li><a href="#verification" className="hover:text-white transition-colors">Verification Methodology</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Public Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#667085]">
          <p>© 2026 CiviAI. Built for Smarter, Transparent Civic Services.</p>
          <p className="text-[11px] text-center sm:text-right">
            Information should be accessible, understandable and verifiable.
          </p>
        </div>

      </div>

    </footer>
  );
};
