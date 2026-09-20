import React, { useState } from 'react';
import { 
  Layers, 
  FileText, 
  GraduationCap, 
  Heart, 
  Car, 
  Briefcase, 
  Home, 
  Zap, 
  ShieldAlert, 
  Building2, 
  HeartHandshake, 
  ArrowRight, 
  Search, 
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CivicService, CivicCategory } from '../../types';
import { CIVIC_SERVICES_DATA } from '../../data/mockData';

interface ServicesViewProps {
  onSelectService: (service: CivicService) => void;
}

interface CategoryInfo {
  name: CivicCategory;
  title: string;
  description: string;
  icon: any;
  serviceCount: number;
  color: string;
  glow: string;
}

const CATEGORY_ITEMS: CategoryInfo[] = [
  { name: 'Documents', title: 'Civic Documents & Identity', description: 'Birth, death, income, caste, domicile & legal heir certificates', icon: FileText, serviceCount: 18, color: '#3B82F6', glow: 'rgba(59, 130, 246, 0.3)' },
  { name: 'Education', title: 'Education & Academics', description: 'Scholarship admissions, exam migration & bonafide verifications', icon: GraduationCap, serviceCount: 14, color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.3)' },
  { name: 'Healthcare', title: 'Health Assurance & Care', description: 'Ayushman card generation, hospital empanelment & medical aid', icon: Heart, serviceCount: 12, color: '#EF4444', glow: 'rgba(239, 68, 68, 0.3)' },
  { name: 'Transport', title: 'Transport & Motor Vehicle', description: 'Contactless driving licenses, vehicle registrations & NOC permits', icon: Car, serviceCount: 22, color: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.3)' },
  { name: 'Employment', title: 'Jobs & Micro Entrepreneurship', description: 'Udyam registration, employment exchange & MUDRA loan facilitation', icon: Briefcase, serviceCount: 16, color: '#10B981', glow: 'rgba(16, 185, 129, 0.3)' },
  { name: 'Housing', title: 'Housing & Urban Development', description: 'PMAY housing subsidy, title verification & site allotment deeds', icon: Home, serviceCount: 9, color: '#EC4899', glow: 'rgba(236, 72, 153, 0.3)' },
  { name: 'Utilities', title: 'Electricity, Water & LPG', description: 'Solar rooftop subsidy, domestic power connections & ration PDS quota', icon: Zap, serviceCount: 15, color: '#EAB308', glow: 'rgba(234, 179, 8, 0.3)' },
  { name: 'Public Safety', title: 'Public Safety & Police Verification', description: 'Police clearance certificates, tenant verification & domestic violence reporting', icon: ShieldAlert, serviceCount: 8, color: '#6366F1', glow: 'rgba(99, 102, 241, 0.3)' },
  { name: 'Municipal Services', title: 'City Municipal Governance', description: 'Property tax calculation, trade licenses, birth corrections & building plans', icon: Building2, serviceCount: 20, color: '#06B6D4', glow: 'rgba(6, 182, 212, 0.3)' },
  { name: 'Social Welfare', title: 'Social Welfare & Pensions', description: 'Old age pensions, disability pensions, widow allowances & maternity DBT', icon: HeartHandshake, serviceCount: 17, color: '#14B8A6', glow: 'rgba(20, 184, 166, 0.3)' },
];

export const ServicesView: React.FC<ServicesViewProps> = ({ onSelectService }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CivicCategory>('All');

  const filteredServices = CIVIC_SERVICES_DATA.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-cyan-500/10 text-cyan-400">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
              Citizen Service Directory
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
            Civic Services & Certificates
          </h1>
          <p className="text-sm text-[#A8B2C1] mt-1 max-w-2xl">
            Everything you need to apply for official state and central civic certificates, driving licenses, municipal permits, and tax payments.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search civic services..."
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* 10 Major Category Cards with Upward Hover Micro-Interactions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            10 Primary Civic Domains
          </h2>
          <span className="text-xs text-[#667085]">Click any category to filter services</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {CATEGORY_ITEMS.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;

            return (
              <div
                key={cat.name}
                onClick={() => setSelectedCategory(isSelected ? 'All' : cat.name)}
                className={`glass-card rounded-2xl p-4 flex flex-col justify-between cursor-pointer group transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? 'border-cyan-400 bg-[#151B23] shadow-lg shadow-cyan-950/40 -translate-y-1'
                    : 'hover:-translate-y-1 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="p-2.5 rounded-xl transition-transform group-hover:scale-110 duration-200"
                      style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/5 text-[#A8B2C1]">
                      {cat.serviceCount} services
                    </span>
                  </div>

                  <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-[#A8B2C1] mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-semibold text-cyan-400">
                  <span>{isSelected ? 'Selected' : 'Explore'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Services List Table / Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Available Online & Hybrid Services ({filteredServices.length})
          </h2>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              Clear filter ({selectedCategory}) ×
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              onClick={() => onSelectService(srv)}
              className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between group cursor-pointer hover:border-cyan-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] mb-2">
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold">
                    {srv.category}
                  </span>
                  <span className="text-[#667085] font-medium">{srv.onlineAvailability}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-[11px] text-[#667085] mt-1 line-clamp-1">
                  {srv.department}
                </p>

                <p className="text-xs text-[#A8B2C1] mt-3 line-clamp-2 leading-relaxed">
                  {srv.shortDescription}
                </p>

                <div className="mt-4 p-3 rounded-xl bg-[#11161D] border border-white/5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#667085]">Turnaround:</span>
                    <strong className="text-emerald-400">{srv.turnaroundTime}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#667085]">Statutory Fee:</span>
                    <strong className="text-white">{srv.officialFee}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-cyan-400">
                <span>View Requirements & Apply</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
