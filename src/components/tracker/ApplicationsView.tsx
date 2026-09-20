import React, { useState } from 'react';
import { 
  FileCheck2, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { CitizenApplication, CitizenProfile } from '../../types';
import { SAMPLE_APPLICATIONS } from '../../data/mockData';

interface ApplicationsViewProps {
  activePersona: CitizenProfile;
}

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({ activePersona }) => {
  const [applications, setApplications] = useState<CitizenApplication[]>(SAMPLE_APPLICATIONS);
  const [selectedApp, setSelectedApp] = useState<CitizenApplication | null>(SAMPLE_APPLICATIONS[0]);
  const [showReceipt, setShowReceipt] = useState(false);

  const getStatusBadge = (status: CitizenApplication['status']) => {
    switch (status) {
      case 'Approved':
      case 'Disbursed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Under Verification':
      case 'Submitted':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Action Required':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse';
      default:
        return 'bg-white/5 text-[#A8B2C1] border-white/10';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-blue-500/10 text-blue-400">
              <FileCheck2 className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold text-blue-400 tracking-wider">
              Citizen Application Lifecycle
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
            Application Status Tracker
          </h1>
          <p className="text-sm text-[#A8B2C1] mt-1">
            Monitor real-time approval milestones across revenue, welfare, and municipal portals.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-[#11161D] border border-white/10 text-[#A8B2C1]">
            Citizen: <strong className="text-white">{activePersona.name}</strong>
          </span>
        </div>
      </div>

      {/* Main Tracker Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List of Applications (Span 5) */}
        <div className="lg:col-span-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-white px-1">
            Active Submissions ({applications.length})
          </p>

          {applications.map((app) => {
            const isSelected = selectedApp?.id === app.id;
            return (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#151B23] border-blue-500/40 shadow-xl shadow-blue-950/30 -translate-y-0.5'
                    : 'bg-[#0D1117] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1.5">
                  <span className="font-mono text-[#667085]">{app.applicationNumber}</span>
                  <span className={`px-2 py-0.5 rounded-md font-bold border ${getStatusBadge(app.status)}`}>
                    {app.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug">
                  {app.schemeOrServiceName}
                </h3>
                <p className="text-[11px] text-[#A8B2C1] mt-1 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-blue-400 shrink-0" />
                  <span className="truncate">{app.department}</span>
                </p>

                {/* Mini progress bar */}
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#667085]">
                  <span>Step {app.currentStep} of {app.totalSteps}</span>
                  <span>Updated {app.lastUpdated}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Active Timeline Details (Span 7) */}
        {selectedApp && (
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#667085]">Tracking Reference</span>
                  <h3 className="text-lg font-bold text-white font-mono">{selectedApp.applicationNumber}</h3>
                </div>
                <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${getStatusBadge(selectedApp.status)}`}>
                  {selectedApp.status}
                </span>
              </div>

              {/* Notice if Action Required */}
              {selectedApp.actionRequiredNote && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>Officer Note: Action Required</span>
                  </div>
                  <p className="text-[#A8B2C1]">{selectedApp.actionRequiredNote}</p>
                </div>
              )}

              {/* Step Timeline */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                  Statutory Verification Workflow
                </h4>
                
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
                  {[
                    { step: 1, name: 'Application Lodged Online', date: selectedApp.appliedDate, desc: 'Digital acknowledgment slip issued via portal.' },
                    { step: 2, name: 'Revenue / Nodal Field Inspection', date: 'In Progress', desc: 'Jurisdictional officer verifies physical documents and records.' },
                    { step: 3, name: 'Administrative Approval & Sanction', date: 'Pending', desc: 'Competent statutory authority signs digital clearance certificate.' },
                    { step: 4, name: 'Disbursal / Final Certificate Dispatch', date: 'Expected ' + selectedApp.estimatedCompletion, desc: 'Direct Benefit Transfer or QR-coded card available for download.' }
                  ].map((s) => {
                    const isPassed = s.step < selectedApp.currentStep;
                    const isCurrent = s.step === selectedApp.currentStep;

                    return (
                      <div key={s.step} className="relative">
                        <div className={`absolute -left-6 top-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                          isPassed
                            ? 'bg-emerald-500 border-emerald-400 text-black'
                            : isCurrent
                            ? 'bg-blue-600 border-blue-400 text-white animate-pulse'
                            : 'bg-[#080B10] border-white/20 text-white/40'
                        }`}>
                          {isPassed ? '✓' : s.step}
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs">
                            <h5 className={`font-bold ${isCurrent ? 'text-blue-300' : 'text-white'}`}>{s.name}</h5>
                            <span className="text-[10px] text-[#667085]">{s.date}</span>
                          </div>
                          <p className="text-[11px] text-[#A8B2C1] mt-0.5">{s.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setShowReceipt(true)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Acknowledgment Receipt</span>
              </button>

              <button
                onClick={() => alert(`Synchronized with ${selectedApp.department} API. Status is up to date.`)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30"
              >
                Refresh Status
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Printable Receipt Modal */}
      {showReceipt && selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0D1117] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="text-center pb-4 border-b border-white/10">
              <ShieldCheck className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <h3 className="font-extrabold text-base text-white">Government of India / State Civic Service</h3>
              <p className="text-[10px] text-[#A8B2C1]">Official Statutory Application Acknowledgment Slip</p>
            </div>

            <div className="space-y-2 text-xs text-[#A8B2C1]">
              <div className="flex justify-between">
                <span>Application Number:</span>
                <strong className="text-white font-mono">{selectedApp.applicationNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span>Applicant:</span>
                <strong className="text-white">{activePersona.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Program:</span>
                <strong className="text-white text-right max-w-[200px] truncate">{selectedApp.schemeOrServiceName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Department:</span>
                <strong className="text-white">{selectedApp.department}</strong>
              </div>
              <div className="flex justify-between">
                <span>Submission Date:</span>
                <strong className="text-white">{selectedApp.appliedDate}</strong>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <strong className="text-emerald-400">{selectedApp.status}</strong>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center gap-2">
              <button
                onClick={() => setShowReceipt(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
