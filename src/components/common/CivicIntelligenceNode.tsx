import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  GraduationCap, 
  FileText, 
  Car, 
  Building2, 
  HeartHandshake,
  ArrowRight
} from 'lucide-react';

interface NodeData {
  id: string;
  label: string;
  category: string;
  icon: any;
  angle: number; // in radians
  distance: number;
  color: string;
  glowColor: string;
  description: string;
  stat: string;
}

const NODES: NodeData[] = [
  { id: 'schemes', label: 'Government Schemes', category: 'Welfare', icon: ShieldCheck, angle: 0, distance: 160, color: '#3B82F6', glowColor: 'rgba(59, 130, 246, 0.4)', description: '380+ Central & State welfare programs matched via AI', stat: '₹6,000 to ₹5L Benefit' },
  { id: 'healthcare', label: 'Healthcare & Health Cover', category: 'Health', icon: Heart, angle: Math.PI * 0.25, distance: 175, color: '#EF4444', glowColor: 'rgba(239, 68, 68, 0.4)', description: 'Ayushman Bharat cashless hospital network & medicine subsidies', stat: '55 Cr Covered' },
  { id: 'education', label: 'Education & Scholarships', category: 'Academics', icon: GraduationCap, angle: Math.PI * 0.5, distance: 155, color: '#F59E0B', glowColor: 'rgba(245, 158, 11, 0.4)', description: 'NSP scholarships, fee concessions & skill stipends', stat: 'Full Tuition Support' },
  { id: 'documents', label: 'Civic Documents & Vault', category: 'Identity', icon: FileText, angle: Math.PI * 0.75, distance: 180, color: '#22D3EE', glowColor: 'rgba(34, 211, 238, 0.4)', description: 'Aadhaar, Caste, Income & Land Record verification', stat: 'Instant e-KYC' },
  { id: 'transport', label: 'Transport & Parivahan', category: 'Mobility', icon: Car, angle: Math.PI, distance: 165, color: '#8B5CF6', glowColor: 'rgba(139, 92, 246, 0.4)', description: 'Contactless Driving License, RC transfer & permit renewals', stat: '18 Contactless Srv' },
  { id: 'offices', label: 'Administrative Offices', category: 'Local', icon: Building2, angle: Math.PI * 1.25, distance: 175, color: '#10B981', glowColor: 'rgba(16, 185, 129, 0.4)', description: 'Taluk offices, Seva Kendras & Grama One navigation', stat: 'Within 5 km radius' },
  { id: 'support', label: 'Citizen Grievance Support', category: 'Redressal', icon: HeartHandshake, angle: Math.PI * 1.5, distance: 155, color: '#EC4899', glowColor: 'rgba(236, 72, 153, 0.4)', description: 'Department identification, complaint drafting & escalation', stat: '94% Resolution Rate' },
  { id: 'services', label: 'Municipal Services', category: 'Civic', icon: Sparkles, angle: Math.PI * 1.75, distance: 170, color: '#06B6D4', glowColor: 'rgba(6, 182, 212, 0.4)', description: 'Water connection, property tax & trade licensing', stat: 'Direct Delivery' }
];

interface CivicIntelligenceNodeProps {
  onSelectCategory?: (category: string) => void;
}

export const CivicIntelligenceNode: React.FC<CivicIntelligenceNodeProps> = ({ onSelectCategory }) => {
  const [activeNode, setActiveNode] = useState<NodeData>(NODES[0]);
  const [rotationOffset, setRotationOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Slow continuous orbital rotation
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setRotationOffset(prev => (prev + 0.0015) % (Math.PI * 2));
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const centerX = 230;
  const centerY = 230;

  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto flex items-center justify-center select-none" ref={containerRef}>
      
      {/* Background Radial Lights and Pulse Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 rounded-full bg-blue-600/10 blur-3xl animate-pulse-subtle" />
        <div className="w-56 h-56 rounded-full bg-cyan-500/10 blur-2xl" />
        <div className="w-96 h-96 rounded-full border border-blue-500/10 border-dashed animate-[spin_60s_linear_infinite]" />
        <div className="w-72 h-72 rounded-full border border-white/5" />
        <div className="w-44 h-44 rounded-full border border-cyan-500/15" />
      </div>

      {/* SVG Connecting Lines & Moving Data Pulses */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 460 460">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic Lines to Satellite Nodes */}
        {NODES.map((node) => {
          const currentAngle = node.angle + rotationOffset;
          const targetX = centerX + Math.cos(currentAngle) * node.distance;
          const targetY = centerY + Math.sin(currentAngle) * node.distance;
          const isSelected = activeNode.id === node.id;

          return (
            <g key={`line-${node.id}`}>
              <line
                x1={centerX}
                y1={centerY}
                x2={targetX}
                y2={targetY}
                stroke={isSelected ? '#22D3EE' : 'rgba(255, 255, 255, 0.08)'}
                strokeWidth={isSelected ? 2 : 1}
                strokeDasharray={isSelected ? 'none' : '3 3'}
                filter={isSelected ? 'url(#glow)' : undefined}
                className="transition-all duration-300"
              />
              {/* Animated Data Packet */}
              <circle
                r={isSelected ? 3 : 2}
                fill={node.color}
                filter="url(#glow)"
              >
                <animateMotion
                  path={`M ${centerX} ${centerY} L ${targetX} ${targetY}`}
                  dur={`${2.5 + (node.distance % 3)}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Center Core: Glowing CiviAI Intelligence Node */}
      <div 
        onClick={() => onSelectCategory && onSelectCategory('assistant')}
        className="relative z-20 cursor-pointer group flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        <div className="relative w-24 h-24 rounded-3xl bg-[#080B10] border-2 border-blue-500/40 p-1 shadow-2xl shadow-blue-500/30 group-hover:border-cyan-400 group-hover:shadow-cyan-500/50 transition-all flex items-center justify-center">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-violet-600 opacity-40 blur-md group-hover:opacity-75 transition-opacity" />
          
          <div className="relative z-10 w-full h-full rounded-2xl bg-[#080B10] flex flex-col items-center justify-center text-center p-2">
            <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
            <span className="font-extrabold text-xs text-white tracking-tight mt-1 font-['Plus_Jakarta_Sans']">
              Civi<span className="text-cyan-400">AI</span>
            </span>
            <span className="text-[8px] uppercase tracking-widest text-[#A8B2C1] font-bold">
              Core Engine
            </span>
          </div>
        </div>
        <div className="absolute -bottom-6 px-2 py-0.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-[9px] text-blue-300 font-bold tracking-wider uppercase">
          Live Intelligence
        </div>
      </div>

      {/* Satellite Civic Nodes */}
      {NODES.map((node) => {
        const currentAngle = node.angle + rotationOffset;
        const x = centerX + Math.cos(currentAngle) * node.distance;
        const y = centerY + Math.sin(currentAngle) * node.distance;
        const isSelected = activeNode.id === node.id;
        const Icon = node.icon;

        return (
          <button
            key={node.id}
            onClick={() => {
              setActiveNode(node);
              if (onSelectCategory) onSelectCategory(node.id);
            }}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: 'translate(-50%, -50%)',
              borderColor: isSelected ? node.color : 'rgba(255, 255, 255, 0.1)',
              boxShadow: isSelected ? `0 0 20px ${node.glowColor}` : undefined
            }}
            className={`absolute z-20 group p-2.5 rounded-2xl border transition-all duration-300 flex items-center justify-center focus:outline-none ${
              isSelected
                ? 'bg-[#11161D] scale-110 shadow-2xl'
                : 'bg-[#080B10]/80 hover:bg-[#11161D] hover:scale-105'
            }`}
            title={`${node.label} - Click to focus`}
          >
            <div
              className="p-1.5 rounded-xl transition-colors"
              style={{
                backgroundColor: isSelected ? `${node.color}25` : 'transparent',
                color: node.color
              }}
            >
              <Icon className="w-5 h-5" />
            </div>

            {/* Hover Tooltip Label */}
            <div className="absolute -bottom-7 whitespace-nowrap px-2 py-0.5 rounded-md bg-[#0D1117] border border-white/10 text-[10px] text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              {node.label}
            </div>
          </button>
        );
      })}

      {/* Focused Node Overlay Details Card at Bottom */}
      {activeNode && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-80 bg-[#0D1117]/95 border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-xl z-30 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeNode.color }} />
              <span className="text-xs font-bold text-white">{activeNode.label}</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              {activeNode.stat}
            </span>
          </div>
          <p className="text-[11px] text-[#A8B2C1] mt-1.5 line-clamp-2">
            {activeNode.description}
          </p>
        </div>
      )}

    </div>
  );
};
