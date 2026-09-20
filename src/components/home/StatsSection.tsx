import React from 'react';
import { Users, Shield, Cpu, Landmark } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '1.4M+',
      label: 'Verified Citizens',
      desc: 'Active users across Indian states',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      value: '380+',
      label: 'Government Schemes',
      desc: 'Central & State Gazette-indexed',
      icon: Shield,
      color: 'text-emerald-400'
    },
    {
      value: '4.8M+',
      label: 'AI Inquiries Resolved',
      desc: 'Under 450ms median latency',
      icon: Cpu,
      color: 'text-cyan-400'
    },
    {
      value: '₹840 Cr+',
      label: 'Direct Benefits Unlocked',
      desc: 'Tracked through official DBT',
      icon: Landmark,
      color: 'text-purple-400'
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-y border-white/5 my-12 bg-[#080B10]/40">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/[0.02] transition-colors">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 mb-3 text-white">
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-bold text-white/90 mt-1">
                {stat.label}
              </p>
              <p className="text-[11px] text-[#667085] mt-0.5">
                {stat.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
