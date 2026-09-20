import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Clock, 
  ArrowRight, 
  Bell, 
  ChevronRight, 
  Calendar, 
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Bot
} from 'lucide-react';
import { CitizenProfile, Scheme, CivicService } from '../../types';
import { SCHEMES_DATA, CIVIC_SERVICES_DATA, GOV_OFFICES_DATA, SAMPLE_APPLICATIONS, SAMPLE_NOTIFICATIONS } from '../../data/mockData';

interface CitizenDashboardProps {
  activePersona: CitizenProfile;
  onNavigate: (tab: string, itemId?: string) => void;
  onSelectScheme: (scheme: Scheme) => void;
  onSelectService: (service: CivicService) => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  activePersona,
  onNavigate,
  onSelectScheme,
  onSelectService
}) => {
  const firstName = activePersona.name.split(' ')[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Personalized Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              {activePersona.district}, {activePersona.state} Citizen Portal
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
            Good day, {firstName}.
          </h1>
          <p className="text-sm text-[#A8B2C1] mt-1">
            Here is your verified civic intelligence snapshot and upcoming entitlement deadlines.
          </p>
        </div>

        <button
          onClick={() => onNavigate('assistant')}
          className="self-start sm:self-auto h-11 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask CiviAI Anything</span>
        </button>
      </div>

      {/* Top Stat Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => onNavigate('services')}
          className="glass-card rounded-2xl p-4 sm:p-5 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-[#A8B2C1] mb-2">
            <span>Nearby Civic Services</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 text-blue-400 transition-transform" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
            24
          </p>
          <p className="text-[11px] text-blue-400 font-semibold mt-1">available in {activePersona.district}</p>
        </div>

        <div 
          onClick={() => onNavigate('schemes')}
          className="glass-card rounded-2xl p-4 sm:p-5 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-[#A8B2C1] mb-2">
            <span>Eligible Schemes</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 text-emerald-400 transition-transform" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
            {activePersona.isFarmer ? '7' : activePersona.isStudent ? '5' : '4'}
          </p>
          <p className="text-[11px] text-emerald-400 font-semibold mt-1">based on your active profile</p>
        </div>

        <div 
          onClick={() => onNavigate('applications')}
          className="glass-card rounded-2xl p-4 sm:p-5 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-[#A8B2C1] mb-2">
            <span>Active Applications</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 text-cyan-400 transition-transform" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
            {SAMPLE_APPLICATIONS.length}
          </p>
          <p className="text-[11px] text-cyan-400 font-semibold mt-1">1 requires action</p>
        </div>

        <div 
          onClick={() => onNavigate('map')}
          className="glass-card rounded-2xl p-4 sm:p-5 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-[#A8B2C1] mb-2">
            <span>Public Offices</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 text-purple-400 transition-transform" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
            {GOV_OFFICES_DATA.length}
          </p>
          <p className="text-[11px] text-purple-400 font-semibold mt-1">within 5 km distance</p>
        </div>

      </div>

      {/* Row 1: Asymmetric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Large Card: AI Assistant Gateway (Span 7) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-500/20 text-cyan-400">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  CiviAI Assistant
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Ready
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white">
              "Am I eligible for PM-KISAN or Ayushman Bharat?"
            </h3>
            <p className="text-xs sm:text-sm text-[#A8B2C1] mt-2 leading-relaxed">
              Based on your status in Mandya, Karnataka, you qualify for ₹6,000 direct benefit transfer and comprehensive ₹5 Lakh family health assurance.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('assistant')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5"
            >
              <span>Ask AI in Detail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('schemes', 'pm-kisan')}
              className="px-4 py-2.5 rounded-xl bg-[#151B23] hover:bg-[#1A212B] border border-white/10 text-white font-semibold text-xs transition-colors"
            >
              Verify PM-KISAN Rules
            </button>
          </div>
        </div>

        {/* Medium Card: Saved / Recommended Schemes (Span 5) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Top Matched Schemes</span>
              </h3>
              <button 
                onClick={() => onNavigate('schemes')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
              >
                View all →
              </button>
            </div>

            <div className="space-y-2.5">
              {SCHEMES_DATA.slice(0, 2).map((scheme) => (
                <div
                  key={scheme.id}
                  onClick={() => onSelectScheme(scheme)}
                  className="p-3 rounded-xl bg-[#11161D] hover:bg-[#151B23] border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold">
                      {scheme.category}
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {scheme.financialAssistance}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                    {scheme.title}
                  </h4>
                  <p className="text-[11px] text-[#A8B2C1] line-clamp-1 mt-0.5">
                    {scheme.simplifiedDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#667085] flex items-center justify-between">
            <span>Verified against 2026 Gazettes</span>
            <span className="text-emerald-400 font-semibold">100% Match</span>
          </div>
        </div>

      </div>

      {/* Row 2: Map & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Large: Interactive Map Hub Preview (Span 7) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>Administrative Offices Around You</span>
                </h3>
                <p className="text-xs text-[#A8B2C1] mt-0.5">Nearby Taluk, Grama One & Civic Seva Kendras</p>
              </div>
              <button 
                onClick={() => onNavigate('map')}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
              >
                Open Full Map →
              </button>
            </div>

            {/* Office Mini List */}
            <div className="space-y-2.5">
              {GOV_OFFICES_DATA.slice(0, 3).map((office) => (
                <div
                  key={office.id}
                  onClick={() => onNavigate('map', office.id)}
                  className="p-3 rounded-xl bg-[#11161D] hover:bg-[#151B23] border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-3">
                    <p className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                      {office.name}
                    </p>
                    <p className="text-[11px] text-[#A8B2C1] truncate">
                      {office.address}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-purple-400">{office.distanceKm} km</span>
                    <p className="text-[10px] text-[#667085]">{office.timings.split('–')[0]} Open</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#667085]">
            <span>Transit: Walkable & State Bus route verified</span>
            <button onClick={() => onNavigate('map')} className="text-purple-400 font-bold">
              View Directions →
            </button>
          </div>
        </div>

        {/* Small: Recent Notifications & Deadlines (Span 5) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-400" />
                <span>Civic Alerts & Deadlines</span>
              </h3>
              <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                Live
              </span>
            </div>

            <div className="space-y-3">
              {SAMPLE_NOTIFICATIONS.slice(0, 3).map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => notif.actionUrl && onNavigate(notif.actionUrl.replace('/', ''))}
                  className="p-3 rounded-xl bg-[#11161D] border border-white/5 hover:border-white/15 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className={`font-bold uppercase ${notif.priority === 'high' ? 'text-amber-400' : 'text-blue-400'}`}>
                      {notif.type.replace('_', ' ')}
                    </span>
                    <span className="text-[#667085]">{notif.timestamp}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                    {notif.title}
                  </h4>
                  <p className="text-[11px] text-[#A8B2C1] line-clamp-1 mt-0.5">
                    {notif.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('applications')}
            className="mt-4 pt-3 border-t border-white/5 w-full text-center text-xs text-blue-400 hover:text-blue-300 font-bold"
          >
            Track Active Submissions →
          </button>
        </div>

      </div>

      {/* Row 3: Civic Services Quick Shelf */}
      <div className="glass-card rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Featured Civic Certificates & Licenses</h3>
            <p className="text-xs text-[#A8B2C1] mt-0.5">Turnaround times and required checklists for everyday public services</p>
          </div>
          <button 
            onClick={() => onNavigate('services')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            View all 10 categories →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CIVIC_SERVICES_DATA.slice(0, 3).map((srv) => (
            <div
              key={srv.id}
              onClick={() => onSelectService(srv)}
              className="p-4 rounded-2xl bg-[#11161D] hover:bg-[#151B23] border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 font-bold">
                    {srv.category}
                  </span>
                  <span className="text-[#667085]">{srv.onlineAvailability}</span>
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {srv.title}
                </h4>
                <p className="text-[11px] text-[#A8B2C1] mt-1 line-clamp-2">
                  {srv.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-bold">{srv.turnaroundTime}</span>
                <span className="text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  Details <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
