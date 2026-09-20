import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Check, 
  Building2,
  ExternalLink
} from 'lucide-react';
import { Scheme, CitizenProfile, CivicCategory } from '../../types';
import { SCHEMES_DATA } from '../../data/mockData';

interface SchemesViewProps {
  activePersona: CitizenProfile;
  onSelectScheme: (scheme: Scheme) => void;
  onCheckEligibility: (scheme: Scheme) => void;
  selectedSchemeId?: string;
}

const CATEGORIES: CivicCategory[] = [
  'All',
  'Agriculture',
  'Healthcare',
  'Housing',
  'Education',
  'Employment',
  'Utilities',
  'Social Welfare'
];

export const SchemesView: React.FC<SchemesViewProps> = ({
  activePersona,
  onSelectScheme,
  onCheckEligibility,
  selectedSchemeId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CivicCategory>('All');
  const [filterSponsor, setFilterSponsor] = useState<'All' | 'Central Government' | 'State Government'>('All');
  const [onlyEligibleForPersona, setOnlyEligibleForPersona] = useState(false);

  const filteredSchemes = SCHEMES_DATA.filter((scheme) => {
    const matchesSearch = 
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.simplifiedDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    const matchesSponsor = filterSponsor === 'All' || scheme.sponsoringBody === filterSponsor;

    let matchesPersona = true;
    if (onlyEligibleForPersona) {
      if (scheme.eligibilityCriteria.farmerOnly && !activePersona.isFarmer) matchesPersona = false;
      if (scheme.eligibilityCriteria.studentOnly && !activePersona.isStudent) matchesPersona = false;
      if (scheme.eligibilityCriteria.bplOnly && !activePersona.isBPL) matchesPersona = false;
      if (scheme.eligibilityCriteria.maxIncome && activePersona.annualIncome > scheme.eligibilityCriteria.maxIncome) matchesPersona = false;
    }

    return matchesSearch && matchesCategory && matchesSponsor && matchesPersona;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              National & State Entitlement Registry
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
            Discover Welfare Schemes
          </h1>
          <p className="text-sm text-[#A8B2C1] mt-1 max-w-2xl">
            Search verified government welfare programs, direct benefit transfers (DBT), housing grants, and health assurances tailored to your household.
          </p>
        </div>

        {/* Citizen Match Filter Switch */}
        <button
          onClick={() => setOnlyEligibleForPersona(!onlyEligibleForPersona)}
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
            onlyEligibleForPersona
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-950/40'
              : 'bg-[#11161D] text-[#A8B2C1] hover:text-white border-white/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Match with {activePersona.name.split(' ')[0]}'s Profile</span>
          {onlyEligibleForPersona && <Check className="w-3.5 h-3.5 text-emerald-400" />}
        </button>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-blue-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search schemes by name, department, financial benefit, or keywords..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#0D1117] border border-white/10 hover:border-blue-500/40 focus:border-blue-500 text-sm text-white placeholder-white/40 focus:outline-none transition-all shadow-xl"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills & Sponsor Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 max-w-3xl">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-[#11161D] text-[#A8B2C1] hover:text-white hover:bg-[#151B23] border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sponsoring Body Filter */}
          <div className="flex items-center gap-1.5 bg-[#11161D] p-1 rounded-xl border border-white/5 text-xs">
            {(['All', 'Central Government', 'State Government'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterSponsor(s)}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium text-[11px] ${
                  filterSponsor === s ? 'bg-[#1A212B] text-white font-bold' : 'text-[#A8B2C1] hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.length === 0 ? (
          <div className="col-span-full py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-white/40 mb-3">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-white">No matching schemes found</h3>
            <p className="text-xs text-[#A8B2C1] mt-1 max-w-sm mx-auto">
              Try adjusting your category filter or clearing the search query to explore other welfare programs.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setOnlyEligibleForPersona(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between group relative hover:border-blue-500/40 transition-all"
            >
              <div>
                
                {/* Header Pills */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {scheme.category}
                  </span>
                  <span className="text-[10px] text-[#A8B2C1] font-semibold truncate max-w-[150px]">
                    {scheme.sponsoringBody}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                  {scheme.title}
                </h3>

                {/* Department */}
                <p className="text-[11px] text-[#667085] mt-1 flex items-center gap-1 truncate">
                  <Building2 className="w-3 h-3 shrink-0" />
                  <span className="truncate">{scheme.department}</span>
                </p>

                {/* Simplified Overview */}
                <p className="text-xs text-[#A8B2C1] mt-3 line-clamp-3 leading-relaxed">
                  {scheme.simplifiedDescription}
                </p>

                {/* Financial Benefit Badge */}
                {scheme.financialAssistance && (
                  <div className="mt-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-emerald-300">Financial Assistance</span>
                    <span className="text-xs font-bold text-emerald-400">{scheme.financialAssistance}</span>
                  </div>
                )}

              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectScheme(scheme)}
                  className="text-xs text-[#A8B2C1] hover:text-white font-semibold transition-colors"
                >
                  View Details →
                </button>

                <button
                  onClick={() => onCheckEligibility(scheme)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 flex items-center gap-1.5 transition-all hover:scale-[1.02]"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
