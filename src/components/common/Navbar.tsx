import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Bell, 
  Globe, 
  Menu, 
  X, 
  UserCheck, 
  ShieldCheck, 
  LayoutDashboard, 
  Compass, 
  FileText, 
  Layers, 
  MapPin, 
  Bot,
  Command,
  ChevronDown
} from 'lucide-react';
import { CitizenProfile, Language } from '../../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  activePersona: CitizenProfile;
  personas: CitizenProfile[];
  onSelectPersona: (p: CitizenProfile) => void;
  onOpenCommandPalette: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
}

const LANGUAGES: Language[] = [
  'English', 
  'Hindi', 
  'Kannada', 
  'Tamil', 
  'Telugu', 
  'Malayalam', 
  'Marathi', 
  'Bengali'
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentLanguage,
  setCurrentLanguage,
  activePersona,
  personas,
  onSelectPersona,
  onOpenCommandPalette,
  onOpenNotifications,
  unreadCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assistant', label: 'AI Assistant', icon: Bot, isHighlighted: true },
    { id: 'schemes', label: 'Schemes', icon: ShieldCheck },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'applications', label: 'Tracking', icon: FileText },
  ];

  return (
    <header className="sticky top-4 z-40 px-4 sm:px-6 max-w-7xl mx-auto w-full transition-all">
      <nav className="glass-nav rounded-2xl px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between shadow-2xl relative">
        
        {/* Brand / Logo */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
            <div className="w-full h-full bg-[#080B10] rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white font-['Plus_Jakarta_Sans']">
                Civi<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md">
                2.0
              </span>
            </div>
            <span className="hidden sm:block text-[10px] text-[#A8B2C1] font-medium tracking-wide">
              Civic Intelligence Platform
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-[#11161D]/80 border border-white/5 p-1 rounded-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-blue-600/90 shadow-md shadow-blue-600/30'
                    : 'text-[#A8B2C1] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#667085]'}`} />
                <span>{link.label}</span>
                {link.isHighlighted && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Utility Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden md:flex items-center gap-2 bg-[#11161D] hover:bg-[#151B23] border border-white/10 text-[#A8B2C1] hover:text-white px-2.5 py-1.5 rounded-xl text-xs transition-colors"
            title="Search anywhere (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px]">Search</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[10px] text-white/60 font-mono">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 bg-[#11161D] hover:bg-[#151B23] border border-white/10 text-[#A8B2C1] hover:text-white px-2.5 py-1.5 rounded-xl text-xs transition-colors"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-medium text-[11px] hidden sm:inline">{currentLanguage}</span>
              <ChevronDown className="w-3 h-3 text-white/50" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#0D1117] border border-white/10 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-2 py-1 text-[10px] uppercase font-bold text-white/40 tracking-wider">
                  Select Language
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLanguage(lang);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                      currentLanguage === lang
                        ? 'bg-blue-600/20 text-blue-400 font-bold'
                        : 'text-[#A8B2C1] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{lang}</span>
                    {currentLanguage === lang && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Trigger */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-[#11161D] hover:bg-[#151B23] border border-white/10 text-[#A8B2C1] hover:text-white transition-colors"
            title="Civic Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center ring-2 ring-[#05070A]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Active Persona Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 sm:pr-2.5 rounded-xl bg-[#11161D] hover:bg-[#151B23] border border-white/10 transition-colors"
              title="Switch Citizen Profile"
            >
              <img
                src={activePersona.avatarUrl}
                alt={activePersona.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-blue-400/50"
              />
              <div className="hidden sm:block text-left">
                <p className="text-[11px] font-bold text-white leading-none truncate max-w-[90px]">
                  {activePersona.name.split(' ')[0]}
                </p>
                <p className="text-[9px] text-[#A8B2C1] leading-none mt-0.5">
                  {activePersona.state}
                </p>
              </div>
              <ChevronDown className="w-3 h-3 text-white/50 hidden sm:block" />
            </button>

            {personaDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#0D1117] border border-white/10 rounded-2xl shadow-2xl p-2 z-50">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-white/40 tracking-wider flex items-center justify-between">
                  <span>Demo Citizen Profiles</span>
                  <UserCheck className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="space-y-1 mt-1">
                  {personas.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectPersona(p);
                        setPersonaDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-xl transition-all flex items-center gap-2.5 ${
                        activePersona.id === p.id
                          ? 'bg-blue-600/20 border border-blue-500/30'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <img src={p.avatarUrl} alt={p.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{p.name}</p>
                        <p className="text-[10px] text-[#A8B2C1] truncate">{p.occupation} • {p.district}</p>
                        <p className="text-[9px] text-emerald-400 font-semibold">₹{p.annualIncome.toLocaleString('en-IN')}/yr</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-white/5 px-2 py-1 text-[10px] text-center text-[#667085]">
                  AI responses calibrate to active citizen profile
                </div>
              </div>
            )}
          </div>

          {/* Ask CiviAI Primary CTA */}
          <button
            onClick={() => setActiveTab('assistant')}
            className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask CiviAI</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#11161D] border border-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 glass-panel rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-top-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-[#151B23] text-[#A8B2C1] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="text-xs text-[#A8B2C1] hover:text-white font-medium"
            >
              Admin Governance Portal →
            </button>
            <button
              onClick={() => {
                onOpenCommandPalette();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-blue-400 font-bold flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search (Ctrl+K)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
