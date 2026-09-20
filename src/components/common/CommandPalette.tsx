import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  MapPin, 
  Bot, 
  ArrowRight, 
  Command, 
  FileText, 
  History,
  CornerDownLeft
} from 'lucide-react';
import { SCHEMES_DATA, CIVIC_SERVICES_DATA, GOV_OFFICES_DATA } from '../../data/mockData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, itemId?: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle Escape and Arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredSchemes = SCHEMES_DATA.filter(s => 
    s.title.toLowerCase().includes(query.toLowerCase()) || 
    s.shortCode.toLowerCase().includes(query.toLowerCase()) ||
    s.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredServices = CIVIC_SERVICES_DATA.filter(s => 
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredOffices = GOV_OFFICES_DATA.filter(o =>
    o.name.toLowerCase().includes(query.toLowerCase()) ||
    o.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0D1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#11161D]">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, scheme, service, or ask CiviAI..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/40 focus:outline-none font-medium"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 hover:bg-white/5 rounded-lg text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[11px] text-white/50 font-mono">
            ESC to close
          </kbd>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          
          {/* Quick AI Action */}
          {query.trim() && (
            <div className="p-1">
              <button
                onClick={() => {
                  onNavigate('assistant');
                  onClose();
                }}
                className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-500/30 hover:border-blue-400 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                      Ask CiviAI: "{query}"
                    </p>
                    <p className="text-[10px] text-[#A8B2C1]">Get instant eligibility, step guides, and verified portal links</p>
                  </div>
                </div>
                <CornerDownLeft className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* Quick Navigation Sections */}
          {!query.trim() && (
            <div className="space-y-3">
              <p className="px-2 text-[10px] uppercase font-bold text-white/40 tracking-wider">
                Quick Shortcuts
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'AI Assistant', icon: Bot, tab: 'assistant', color: 'text-cyan-400' },
                  { label: 'Government Schemes', icon: ShieldCheck, tab: 'schemes', color: 'text-emerald-400' },
                  { label: 'Civic Services', icon: Layers, tab: 'services', color: 'text-blue-400' },
                  { label: 'Nearby Offices', icon: MapPin, tab: 'map', color: 'text-purple-400' }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.tab}
                      onClick={() => {
                        onNavigate(item.tab);
                        onClose();
                      }}
                      className="p-3 rounded-xl bg-[#11161D] hover:bg-[#151B23] border border-white/5 hover:border-white/15 transition-all text-left flex flex-col gap-1.5"
                    >
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-xs font-semibold text-white">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Government Schemes Matches */}
          {filteredSchemes.length > 0 && (
            <div className="space-y-1">
              <p className="px-2 text-[10px] uppercase font-bold text-white/40 tracking-wider flex items-center justify-between">
                <span>Government Schemes</span>
                <span className="text-blue-400">{filteredSchemes.length} found</span>
              </p>
              {filteredSchemes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    onNavigate('schemes', s.id);
                    onClose();
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                        {s.title}
                      </p>
                      <p className="text-[10px] text-[#A8B2C1]">
                        {s.sponsoringBody} • {s.category} • <span className="text-emerald-400 font-semibold">{s.financialAssistance}</span>
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}

          {/* Civic Services Matches */}
          {filteredServices.length > 0 && (
            <div className="space-y-1">
              <p className="px-2 text-[10px] uppercase font-bold text-white/40 tracking-wider flex items-center justify-between">
                <span>Civic Services</span>
                <span className="text-cyan-400">{filteredServices.length} found</span>
              </p>
              {filteredServices.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => {
                    onNavigate('services', srv.id);
                    onClose();
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {srv.title}
                      </p>
                      <p className="text-[10px] text-[#A8B2C1]">
                        {srv.department} • <span className="text-cyan-300">{srv.turnaroundTime}</span>
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}

          {/* Gov Offices Matches */}
          {filteredOffices.length > 0 && (
            <div className="space-y-1">
              <p className="px-2 text-[10px] uppercase font-bold text-white/40 tracking-wider flex items-center justify-between">
                <span>Nearby Administrative Offices</span>
              </p>
              {filteredOffices.map((off) => (
                <button
                  key={off.id}
                  onClick={() => {
                    onNavigate('map', off.id);
                    onClose();
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                        {off.name}
                      </p>
                      <p className="text-[10px] text-[#A8B2C1]">
                        {off.category} • {off.distanceKm} km away • {off.timings}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}

          {/* Empty Search State */}
          {query && filteredSchemes.length === 0 && filteredServices.length === 0 && filteredOffices.length === 0 && (
            <div className="py-8 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-white/40 mb-3">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-white">No direct matches for "{query}"</p>
              <p className="text-xs text-[#A8B2C1] mt-1">Press enter to ask the CiviAI Assistant or try checking spelling.</p>
              <button
                onClick={() => {
                  onNavigate('assistant');
                  onClose();
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30"
              >
                Ask CiviAI Assistant →
              </button>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#080B10] border-t border-white/5 flex items-center justify-between text-[11px] text-[#667085]">
          <span>Navigation: Select item to jump directly</span>
          <span className="flex items-center gap-1.5 font-mono">
            <kbd className="bg-white/5 px-1 rounded text-white/60">↑</kbd>
            <kbd className="bg-white/5 px-1 rounded text-white/60">↓</kbd> to navigate
          </span>
        </div>

      </div>

    </div>
  );
};
