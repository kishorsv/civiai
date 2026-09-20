import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  ShieldCheck, 
  FileText, 
  Search, 
  Filter, 
  TrendingUp, 
  Activity, 
  Cpu, 
  AlertCircle, 
  CheckCircle2, 
  MoreVertical, 
  Download, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Database,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { ADMIN_METRICS, SCHEMES_DATA, CIVIC_SERVICES_DATA, SAMPLE_APPLICATIONS } from '../../data/mockData';

interface AdminDashboardViewProps {
  onBackToCitizen: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onBackToCitizen }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'schemes' | 'applications' | 'queries'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [tableData, setTableData] = useState([
    { id: 'REC-01', name: 'PM Kisan Samman Nidhi', category: 'Agriculture', status: 'Active', updated: '2 hours ago', queries: 42100 },
    { id: 'REC-02', name: 'Ayushman Bharat PM-JAY', category: 'Healthcare', status: 'Active', updated: '15 mins ago', queries: 88400 },
    { id: 'REC-03', name: 'Post-Matric Scholarships (NSP)', category: 'Education', status: 'Expiring Soon', updated: 'Yesterday', queries: 31200 },
    { id: 'REC-04', name: 'PM Awas Yojana Gramin', category: 'Housing', status: 'Active', updated: '3 days ago', queries: 19400 },
    { id: 'REC-05', name: 'Rooftop Solar Surya Ghar', category: 'Utilities', status: 'Active', updated: '4 hours ago', queries: 27900 },
    { id: 'REC-06', name: 'Gruha Lakshmi Direct DBT', category: 'Social Welfare', status: 'Active', updated: 'Today', queries: 64100 },
  ]);

  const handleArchive = (id: string) => {
    setTableData(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Admin Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider font-mono">
              CIVIAI STATUTORY GOVERNANCE ENGINE
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
            Administrative Intelligence Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#A8B2C1] mt-0.5">
            Real-time public welfare disbursal monitoring, AI telemetry, and Gazette synchronization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCitizen}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>← Citizen Portal</span>
          </button>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5" />
            <span>State API: Online</span>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ADMIN_METRICS.map((metric, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-[#A8B2C1] mb-2">
              <span className="font-medium">{metric.title}</span>
              <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                {metric.change} <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
              {metric.value}
            </p>
            <p className="text-[11px] text-[#667085] mt-1">{metric.subtext}</p>
          </div>
        ))}
      </div>

      {/* Modern Visual Telemetry & AI Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Chart: AI Query Trends & Traffic (Span 8) */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>AI Semantic Query Volume (Last 7 Days)</span>
                </h3>
                <p className="text-xs text-[#A8B2C1] mt-0.5">Daily natural language citizen requests mapped to state schemes</p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20 font-bold">
                Peak: 742,890 / day
              </span>
            </div>

            {/* Minimalist Visual Bar Chart */}
            <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-white/5">
              {[
                { day: 'Mon', count: 68, label: '540k' },
                { day: 'Tue', count: 75, label: '610k' },
                { day: 'Wed', count: 82, label: '690k' },
                { day: 'Thu', count: 94, label: '742k' },
                { day: 'Fri', count: 88, label: '710k' },
                { day: 'Sat', count: 62, label: '480k' },
                { day: 'Sun', count: 54, label: '410k' },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] text-[#A8B2C1] opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    {bar.label}
                  </div>
                  <div 
                    style={{ height: `${bar.count}%` }}
                    className="w-full max-w-[48px] rounded-xl bg-gradient-to-t from-blue-600 to-cyan-400 group-hover:from-blue-500 group-hover:to-cyan-300 transition-all shadow-md shadow-blue-500/20"
                  />
                  <span className="text-[11px] text-[#667085] font-semibold">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-2 flex items-center justify-between text-xs text-[#A8B2C1]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Natural Language Chat: 84%
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" /> Voice Assistant (Mic): 16%
            </span>
          </div>
        </div>

        {/* Right Distribution: Top Inquired Sectors (Span 4) */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Top Civic Categories</h3>
            <p className="text-xs text-[#A8B2C1]">Citizens query volume breakdown</p>

            <div className="space-y-3 mt-4">
              {[
                { name: 'Healthcare & PM-JAY', pct: 36, color: 'bg-red-500' },
                { name: 'Agriculture & PM-KISAN', pct: 28, color: 'bg-emerald-500' },
                { name: 'Education & Scholarships', pct: 18, color: 'bg-amber-500' },
                { name: 'Identity & Certificates', pct: 12, color: 'bg-blue-500' },
                { name: 'Housing & Municipal', pct: 6, color: 'bg-purple-500' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-medium">{item.name}</span>
                    <span className="text-[#A8B2C1] font-mono">{item.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#11161D] border border-white/5 text-[11px] text-[#A8B2C1]">
            💡 <strong className="text-white">Trend:</strong> Increased senior citizen queries following Ayushman Vaya Vandana expansion.
          </div>
        </div>

      </div>

      {/* Admin Data Table: Section 18 */}
      <div className="glass-card rounded-3xl p-6 space-y-4">
        
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white">Statutory Welfare Records & Schemes</h3>
            <p className="text-xs text-[#A8B2C1]">Filter, audit, and inspect gazette configurations</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter table..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-[#11161D] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
              />
            </div>
            <button
              onClick={() => alert('Exporting encrypted CSV audit log...')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/5">
          <table className="w-full text-left text-xs text-[#A8B2C1]">
            <thead className="bg-[#11161D] text-white uppercase text-[10px] tracking-wider border-b border-white/5">
              <tr>
                <th className="p-3.5">Scheme / Service Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Indexed Queries</th>
                <th className="p-3.5">Last Gazette Sync</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#0D1117]">
              {tableData
                .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((row) => (
                  <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5 font-bold text-white">
                      {row.name}
                      <span className="block text-[10px] text-[#667085] font-mono mt-0.5">{row.id}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 font-semibold text-[11px]">
                        {row.category}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        row.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-white">
                      {row.queries.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3.5 text-[#667085]">
                      {row.updated}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => alert(`Inspecting statutory config for ${row.name}`)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => handleArchive(row.id)}
                        className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold transition-colors"
                      >
                        Archive
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
