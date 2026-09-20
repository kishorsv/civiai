import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { CommandPalette } from './components/common/CommandPalette';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { Footer } from './components/common/Footer';

import { HeroSection } from './components/home/HeroSection';
import { AISearchBox } from './components/home/AISearchBox';
import { BentoFeatures } from './components/home/BentoFeatures';
import { StatsSection } from './components/home/StatsSection';

import { AIAssistantView } from './components/assistant/AIAssistantView';
import { CitizenDashboard } from './components/dashboard/CitizenDashboard';
import { SchemesView } from './components/schemes/SchemesView';
import { SchemeDetailModal } from './components/schemes/SchemeDetailModal';
import { EligibilityModal } from './components/schemes/EligibilityModal';
import { ServicesView } from './components/services/ServicesView';
import { ServiceDetailModal } from './components/services/ServiceDetailModal';
import { InteractiveMapView } from './components/map/InteractiveMapView';
import { ApplicationsView } from './components/tracker/ApplicationsView';
import { ProfileView } from './components/profile/ProfileView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';

import { PRESET_PERSONAS, SAMPLE_NOTIFICATIONS, SCHEMES_DATA, CIVIC_SERVICES_DATA } from './data/mockData';
import { CitizenProfile, Language, Scheme, CivicService } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('English');
  const [activePersona, setActivePersona] = useState<CitizenProfile>(PRESET_PERSONAS[0]);
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  // Overlays & Modals
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedSchemeDetail, setSelectedSchemeDetail] = useState<Scheme | null>(null);
  const [selectedSchemeEligibility, setSelectedSchemeEligibility] = useState<Scheme | null>(null);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<CivicService | null>(null);

  // Parameter passing for search & map
  const [assistantInitialQuery, setAssistantInitialQuery] = useState<string>('');
  const [mapInitialOfficeId, setMapInitialOfficeId] = useState<string | undefined>(undefined);
  const [detectedLocation, setDetectedLocation] = useState<string | undefined>(undefined);

  // Global Keyboard Shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAISearch = (query: string) => {
    setAssistantInitialQuery(query);
    setActiveTab('assistant');
  };

  const handleDetectLocation = () => {
    setDetectedLocation(`${activePersona.district} Center`);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleSelectNotification = (actionUrl?: string) => {
    if (actionUrl) {
      const tab = actionUrl.replace('/', '');
      setActiveTab(tab);
    }
  };

  const handleNavigateFromPalette = (tab: string, itemId?: string) => {
    setActiveTab(tab);
    if (tab === 'schemes' && itemId) {
      const s = SCHEMES_DATA.find(item => item.id === itemId);
      if (s) setSelectedSchemeDetail(s);
    } else if (tab === 'services' && itemId) {
      const srv = CIVIC_SERVICES_DATA.find(item => item.id === itemId);
      if (srv) setSelectedServiceDetail(srv);
    } else if (tab === 'map' && itemId) {
      setMapInitialOfficeId(itemId);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-[#F8FAFC] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-600 selection:text-white pb-20 lg:pb-0">
      
      {/* Background Decorative Grids */}
      <div className="fixed inset-0 bg-civic-grid opacity-30 pointer-events-none z-0" />

      {/* Floating Glass Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        activePersona={activePersona}
        personas={PRESET_PERSONAS}
        onSelectPersona={setActivePersona}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        unreadCount={notifications.filter(n => !n.isRead).length}
      />

      {/* Main View Router */}
      <main className="flex-1 relative z-10">
        
        {/* Landing Page */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            <HeroSection
              onAskAI={() => setActiveTab('assistant')}
              onExplore={() => setActiveTab('schemes')}
              onSelectCategory={(cat) => {
                if (cat === 'schemes') setActiveTab('schemes');
                else if (cat === 'services') setActiveTab('services');
                else if (cat === 'offices') setActiveTab('map');
                else setActiveTab('assistant');
              }}
            />

            <AISearchBox
              onSearch={handleAISearch}
              onDetectLocation={handleDetectLocation}
              detectedLocation={detectedLocation}
            />

            <BentoFeatures onNavigate={(tab) => setActiveTab(tab)} />

            <StatsSection />
          </div>
        )}

        {/* Citizen Dashboard */}
        {activeTab === 'dashboard' && (
          <CitizenDashboard
            activePersona={activePersona}
            onNavigate={(tab, itemId) => handleNavigateFromPalette(tab, itemId)}
            onSelectScheme={(scheme) => setSelectedSchemeDetail(scheme)}
            onSelectService={(service) => setSelectedServiceDetail(service)}
          />
        )}

        {/* AI Citizen Assistant */}
        {activeTab === 'assistant' && (
          <AIAssistantView
            activePersona={activePersona}
            currentLanguage={currentLanguage}
            onSelectScheme={(scheme) => setSelectedSchemeDetail(scheme)}
            onNavigateToEligibility={(scheme) => setSelectedSchemeEligibility(scheme)}
            onNavigateToMap={() => setActiveTab('map')}
            initialQuery={assistantInitialQuery}
          />
        )}

        {/* Welfare Schemes Discovery */}
        {activeTab === 'schemes' && (
          <SchemesView
            activePersona={activePersona}
            onSelectScheme={(scheme) => setSelectedSchemeDetail(scheme)}
            onCheckEligibility={(scheme) => setSelectedSchemeEligibility(scheme)}
          />
        )}

        {/* Civic Services Directory */}
        {activeTab === 'services' && (
          <ServicesView
            onSelectService={(service) => setSelectedServiceDetail(service)}
          />
        )}

        {/* Interactive Civic Map */}
        {activeTab === 'map' && (
          <InteractiveMapView
            activePersona={activePersona}
            initialOfficeId={mapInitialOfficeId}
          />
        )}

        {/* Application Status Tracker */}
        {activeTab === 'applications' && (
          <ApplicationsView
            activePersona={activePersona}
          />
        )}

        {/* Citizen Profile & Sovereign Vault */}
        {activeTab === 'profile' && (
          <ProfileView
            activePersona={activePersona}
            personas={PRESET_PERSONAS}
            onSelectPersona={setActivePersona}
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}

        {/* Admin Governance Suite */}
        {activeTab === 'admin' && (
          <AdminDashboardView
            onBackToCitizen={() => setActiveTab('dashboard')}
          />
        )}

      </main>

      {/* Global Modals & Overlays */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigateFromPalette}
      />

      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
        onSelectNotification={handleSelectNotification}
      />

      {/* Scheme Detail Modal */}
      <SchemeDetailModal
        scheme={selectedSchemeDetail}
        onClose={() => setSelectedSchemeDetail(null)}
        onOpenEligibility={(scheme) => setSelectedSchemeEligibility(scheme)}
        activePersona={activePersona}
      />

      {/* Eligibility Checker Modal */}
      <EligibilityModal
        scheme={selectedSchemeEligibility}
        activePersona={activePersona}
        onClose={() => setSelectedSchemeEligibility(null)}
        onNavigateToApply={(scheme) => {
          setSelectedSchemeEligibility(null);
          setSelectedSchemeDetail(scheme);
        }}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceDetail}
        onClose={() => setSelectedServiceDetail(null)}
        onStartApplication={(service) => {
          setSelectedServiceDetail(null);
          setActiveTab('applications');
        }}
      />

      {/* Mobile Native Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* High-Trust Civic Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
