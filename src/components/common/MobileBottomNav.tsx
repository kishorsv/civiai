import React from 'react';
import { Home, Compass, Bot, MapPin, User, Sparkles } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'schemes', label: 'Explore', icon: Compass },
    { id: 'assistant', label: 'AI', icon: Bot, isCenter: true },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-1 pointer-events-none">
      <nav className="glass-nav rounded-2xl p-1.5 shadow-2xl flex items-center justify-around max-w-md mx-auto pointer-events-auto border border-white/10 bg-[#080B10]/90 backdrop-blur-2xl">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative -top-5 flex flex-col items-center group focus:outline-none"
              >
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px] shadow-xl shadow-blue-500/30 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-[#080B10] rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
                  </div>
                </div>
                <span className="text-[10px] font-bold text-cyan-400 mt-1">Ask AI</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center w-14 py-1.5 rounded-xl transition-all ${
                isActive
                  ? 'text-blue-400 font-bold'
                  : 'text-[#A8B2C1] hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400 stroke-[2.5]' : 'text-[#667085]'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-blue-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
