import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Navigation, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  Building2, 
  ExternalLink, 
  CheckCircle2, 
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { GovOffice, CitizenProfile } from '../../types';
import { GOV_OFFICES_DATA } from '../../data/mockData';

interface InteractiveMapViewProps {
  activePersona: CitizenProfile;
  initialOfficeId?: string;
}

export const InteractiveMapView: React.FC<InteractiveMapViewProps> = ({
  activePersona,
  initialOfficeId
}) => {
  const [selectedOffice, setSelectedOffice] = useState<GovOffice>(
    GOV_OFFICES_DATA.find(o => o.id === initialOfficeId) || GOV_OFFICES_DATA[0]
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxDistance, setMaxDistance] = useState<number>(10);

  const categories = ['All', 'Taluk Office', 'Seva Kendra', 'Hospital', 'RTO'];

  const filteredOffices = GOV_OFFICES_DATA.filter((off) => {
    const matchesCat = selectedCategory === 'All' || off.category === selectedCategory;
    const matchesSearch = off.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDist = off.distanceKm <= maxDistance;
    return matchesCat && matchesSearch && matchesDist;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-purple-500/10 text-purple-400">
              <MapPin className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold text-purple-400 tracking-wider">
              {activePersona.district}, {activePersona.state} Spatial Hub
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
            Services Around You
          </h1>
          <p className="text-sm text-[#A8B2C1] mt-1">
            Locate nearby Taluk offices, Grama One Seva Kendras, and government hospitals with verified operating hours.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-xl bg-[#11161D] border border-white/10 text-[#A8B2C1]">
            Your location: <strong className="text-white">{activePersona.district} Center</strong>
          </span>
        </div>
      </div>

      {/* Map Card & Split Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
        
        {/* Left Interactive Vector Map Canvas (Span 8) */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden bg-[#080B10]">
          
          {/* Top In-Map Search & Category Filters */}
          <div className="relative z-20 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search offices or seva kendras..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#11161D]/90 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-purple-400 backdrop-blur-md"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'bg-[#11161D] text-[#A8B2C1] hover:text-white border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dark Vector Map Simulation */}
          <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl bg-[#05070A] border border-white/5 my-4 overflow-hidden flex items-center justify-center select-none">
            
            {/* Grid Pattern & Radar Rings */}
            <div className="absolute inset-0 bg-civic-grid opacity-30" />
            <div className="w-[500px] h-[500px] rounded-full border border-purple-500/10 pointer-events-none absolute" />
            <div className="w-[360px] h-[360px] rounded-full border border-purple-500/15 pointer-events-none absolute animate-pulse-subtle" />
            <div className="w-[200px] h-[200px] rounded-full border border-cyan-500/15 pointer-events-none absolute" />
            
            {/* Citizen Origin Marker */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-blue-500 ring-8 ring-blue-500/20 flex items-center justify-center text-white shadow-lg animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span className="mt-1 px-2 py-0.5 rounded-md bg-[#0D1117] border border-white/10 text-[9px] text-white font-bold">
                You ({activePersona.name.split(' ')[0]})
              </span>
            </div>

            {/* Office Markers Scattered Geographically */}
            {filteredOffices.map((office, idx) => {
              const isSelected = selectedOffice.id === office.id;
              // Deterministic positions based on index
              const positions = [
                { top: '28%', left: '35%' },
                { top: '65%', left: '55%' },
                { top: '35%', left: '70%' },
                { top: '75%', left: '25%' }
              ];
              const pos = positions[idx % positions.length];

              return (
                <div
                  key={office.id}
                  onClick={() => setSelectedOffice(office)}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute z-20 cursor-pointer group -translate-x-1/2 -translate-y-1/2"
                >
                  <div className={`p-2 rounded-2xl border transition-all duration-300 flex items-center justify-center ${
                    isSelected
                      ? 'bg-purple-600 border-white text-white scale-125 shadow-xl shadow-purple-600/50 ring-4 ring-purple-500/30'
                      : 'bg-[#11161D] border-purple-400/40 text-purple-300 hover:scale-110 hover:border-white'
                  }`}>
                    <Building2 className="w-4 h-4" />
                  </div>

                  {/* Marker Tooltip */}
                  <div className={`absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md text-[10px] font-bold transition-all pointer-events-none shadow-xl ${
                    isSelected
                      ? 'bg-purple-950 border border-purple-400 text-white opacity-100'
                      : 'bg-[#0D1117] border border-white/10 text-[#A8B2C1] opacity-0 group-hover:opacity-100'
                  }`}>
                    {office.name.split('(')[0]} ({office.distanceKm} km)
                  </div>
                </div>
              );
            })}

            {/* Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 bg-[#0D1117]/90 border border-white/10 rounded-xl p-2 text-[10px] text-[#A8B2C1] space-y-1 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Your Location ({activePersona.district})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Government Facilitation Center</span>
              </div>
            </div>

          </div>

          {/* Bottom Distance Slider */}
          <div className="flex items-center justify-between text-xs text-[#A8B2C1] pt-2 border-t border-white/5">
            <span className="text-[11px]">Radius filter: Up to {maxDistance} km</span>
            <input
              type="range"
              min="2"
              max="20"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-32 accent-purple-500 cursor-pointer"
            />
          </div>

        </div>

        {/* Right Details Drawer (Span 4) */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {selectedOffice.category}
              </span>
              <span className="text-xs font-bold text-emerald-400">
                {selectedOffice.distanceKm} km away
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white leading-snug">
                {selectedOffice.name}
              </h3>
              <p className="text-xs text-[#A8B2C1] mt-1.5 flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{selectedOffice.address}</span>
              </p>
            </div>

            {/* Operating Hours */}
            <div className="p-3.5 rounded-2xl bg-[#11161D] border border-white/5 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white font-medium">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{selectedOffice.timings}</span>
              </div>
              <div className="flex items-center gap-2 text-[#A8B2C1]">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>{selectedOffice.workingDays}</span>
              </div>
            </div>

            {/* Services Handled Here */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                Services Facilitated
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedOffice.servicesProvided.map((srv, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-white/5 text-[#A8B2C1] px-2 py-1 rounded-lg border border-white/5"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 text-xs text-[#A8B2C1] pt-2 border-t border-white/5">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href={`tel:${selectedOffice.contactNumber}`} className="hover:text-white transition-colors">
                  {selectedOffice.contactNumber}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span className="truncate">{selectedOffice.email}</span>
              </div>
            </div>

          </div>

          {/* Directions Button */}
          <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedOffice.name + ' ' + selectedOffice.address)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
            <p className="text-[10px] text-center text-[#667085]">
              Transit verified: Walkable or reachable via district local transport.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
