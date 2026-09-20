import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Plus, 
  MessageSquare, 
  ChevronRight,
  BookOpen,
  Building2,
  Heart,
  GraduationCap,
  Car,
  Briefcase,
  MapPin,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { ChatMessage, CitizenProfile, Language, Scheme } from '../../types';
import { SCHEMES_DATA } from '../../data/mockData';

interface AIAssistantViewProps {
  activePersona: CitizenProfile;
  currentLanguage: Language;
  onSelectScheme: (s: Scheme) => void;
  onNavigateToEligibility: (s: Scheme) => void;
  onNavigateToMap: () => void;
  initialQuery?: string;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  activePersona,
  currentLanguage,
  onSelectScheme,
  onNavigateToEligibility,
  onNavigateToMap,
  initialQuery
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-initial',
      sender: 'assistant',
      text: `Namaste ${activePersona.name}! I am your CiviAI Civic Assistant.\n\nI have reviewed your active profile: **${activePersona.occupation}** located in **${activePersona.district}, ${activePersona.state}** (Annual Household Income: ₹${activePersona.annualIncome.toLocaleString('en-IN')}).\n\nHow can I help you navigate government schemes, certificates, or local public offices today?`,
      timestamp: 'Just now',
      isVerified: true,
      verifiedSource: {
        portalName: 'National Government Services Portal',
        url: 'https://services.india.gov.in',
        lastUpdated: 'Sept 2026'
      },
      checklist: [
        'Aadhaar linked to active mobile',
        'Updated bank account with NPCI Direct Benefit Transfer mapping',
        'State residence / domicile certificate'
      ]
    }
  ]);

  const [input, setInput] = useState(initialQuery || '');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  // Web Speech API: Voice Recognition
  const toggleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please try Chrome or Edge.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLanguage === 'Hindi' ? 'hi-IN' : currentLanguage === 'Kannada' ? 'kn-IN' : currentLanguage === 'Tamil' ? 'ta-IN' : 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        handleSend(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  // Text to Speech
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = currentLanguage === 'Hindi' ? 'hi-IN' : 'en-IN';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Conversational response generator matching citizen persona and schemes
  const handleSend = (overridePrompt?: string) => {
    const textToSend = overridePrompt || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!overridePrompt) setInput('');
    setLoading(true);

    // Simulate AI synthesis with contextual scheme intelligence
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let reply = "";
      let matchedSchemes: Scheme[] = [];
      let steps: string[] = [];
      let checklist: string[] = [];
      let portalName = "Digital India Services Portal";
      let portalUrl = "https://services.india.gov.in";

      if (lower.includes('kisan') || lower.includes('farm') || lower.includes('agriculture') || activePersona.isFarmer && lower.includes('scheme')) {
        const pmKisan = SCHEMES_DATA.find(s => s.id === 'pm-kisan');
        if (pmKisan) matchedSchemes.push(pmKisan);
        reply = `Based on your profile as a **${activePersona.occupation}** in **${activePersona.state}**, you qualify for **PM Kisan Samman Nidhi Yojana**.\n\nYou are entitled to **₹6,000 per year** delivered directly via DBT in 3 installments of ₹2,000 every four months.`;
        steps = [
          'Verify that your land parcel (RTC/Pahani) is registered in the state revenue portal under your name.',
          'Complete mandatory e-KYC using Aadhaar OTP or fingerprint at your local Grama One center.',
          'Check that your bank account is mapped to the Aadhaar Payment Bridge (APB).'
        ];
        checklist = ['Aadhaar Card', 'Pahani / Land RTC Record', 'Bank Passbook (Aadhaar Seeded)'];
        portalName = "PM-KISAN Official Portal";
        portalUrl = "https://pmkisan.gov.in";
      } else if (lower.includes('ayushman') || lower.includes('health') || lower.includes('hospital') || lower.includes('medical') || lower.includes('card')) {
        const ayushman = SCHEMES_DATA.find(s => s.id === 'ayushman-bharat');
        if (ayushman) matchedSchemes.push(ayushman);
        reply = `You have high eligibility for **Ayushman Bharat PM-JAY (Golden Health Card)**.\n\nProvides **₹5,00,000 annual cashless coverage** per family across 27,000+ empaneled public & private hospitals nationwide. Under 2026 guidelines, senior citizens aged 70+ also receive unconditional separate coverage.`;
        steps = [
          'Check your family name on the PM-JAY beneficiary portal or visit any empaneled hospital.',
          'Authenticate via Aadhaar biometric scanner at the Ayushman Mitra Helpdesk.',
          'Receive instant digital Ayushman Golden Card for cashless treatment.'
        ];
        checklist = ['Ration Card (BPL/NFSA)', 'Aadhaar Card of all family members', 'Active mobile number'];
        portalName = "National Health Authority PM-JAY";
        portalUrl = "https://pmjay.gov.in";
      } else if (lower.includes('scholarship') || lower.includes('student') || lower.includes('education') || lower.includes('college')) {
        const nsp = SCHEMES_DATA.find(s => s.id === 'national-scholarship');
        if (nsp) matchedSchemes.push(nsp);
        reply = `For students enrolled in post-matric studies, the **National Scholarship Portal (NSP)** offers comprehensive financial assistance covering **100% course tuition fees** plus a monthly maintenance allowance.`;
        steps = [
          'Generate your One-Time Registration (OTR) on scholarships.gov.in using Aadhaar e-KYC.',
          'Upload your latest academic marksheet and college bonafide certificate.',
          'Your College Nodal Officer and District Social Welfare officer will verify records online.'
        ];
        checklist = ['Student Aadhaar Card', 'College Bonafide Certificate', 'Tehsildar Income Certificate', 'Previous Year Marksheet'];
        portalName = "National Scholarship Portal";
        portalUrl = "https://scholarships.gov.in";
      } else if (lower.includes('office') || lower.includes('near') || lower.includes('csc') || lower.includes('seva') || lower.includes('kendra')) {
        reply = `In **${activePersona.district}**, there are 4 active citizen facilitation centers within 5 kilometers of your location, including the **Taluk Administrative Office (Mini Vidhana Soudha)** and **Central CSC Grama One**.\n\nThese centers handle Aadhaar updates, ration cards, land revenue mutation, and certificate issuance without appointments.`;
        steps = [
          'Select "Map" from the navigation bar to see exact driving distances and live working hours.',
          'Carry physical originals of your Aadhaar card and required supporting documents.'
        ];
        checklist = ['Aadhaar Card', 'Mobile with OTP capability'];
        portalName = "State Citizen Service Centers Directory";
        portalUrl = "https://sevasindhu.karnataka.gov.in";
      } else {
        matchedSchemes = SCHEMES_DATA.slice(0, 2);
        reply = `Namaste ${activePersona.name}! I processed your query against national civic records.\n\nBased on your active credentials (${activePersona.occupation}, ${activePersona.district}, Annual Income ₹${activePersona.annualIncome.toLocaleString('en-IN')}), here are the verified entitlements and next steps for you:`;
        steps = [
          'Review the verified scheme cards below for matching criteria.',
          'Click "Check Match" to evaluate your exact profile against statutory rules.',
          'Prepare your digital identity documents for paperless submission.'
        ];
        checklist = ['Aadhaar Card', 'Income Certificate', 'Bank Account'];
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isVerified: true,
        verifiedSource: {
          portalName: portalName,
          url: portalUrl,
          lastUpdated: 'Sept 2026'
        },
        suggestedSchemes: matchedSchemes,
        steps: steps,
        checklist: checklist
      };

      setMessages(prev => [...prev, assistantMsg]);
      setLoading(false);
    }, 600);
  };

  const categories = [
    { label: 'Government Schemes', icon: ShieldCheck, query: 'Show all government welfare schemes I am eligible for' },
    { label: 'Civic Documents', icon: FileText, query: 'What documents are required for income & caste certificates?' },
    { label: 'Healthcare & Cover', icon: Heart, query: 'How can I get Ayushman Bharat ₹5 Lakh health cover?' },
    { label: 'Education & Grants', icon: GraduationCap, query: 'Which scholarships can college students apply for?' },
    { label: 'Transport & Driving', icon: Car, query: 'How can I renew my driving license online without RTO visit?' },
    { label: 'Local Administrative Offices', icon: Building2, query: 'Where is the nearest Seva Kendra or Taluk office?' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-110px)] min-h-[600px] flex flex-col">
      
      {/* Top Breadcrumb & Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white leading-none">CiviAI Assistant</h2>
            <p className="text-[11px] text-[#A8B2C1] mt-0.5">Calibrated to {activePersona.name} ({activePersona.occupation})</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Gazette Verified
          </span>
          <button 
            onClick={() => setMessages([messages[0]])}
            className="flex items-center gap-1 bg-[#11161D] hover:bg-[#151B23] border border-white/10 text-[#A8B2C1] hover:text-white px-2.5 py-1 rounded-lg text-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>
      </div>

      {/* Main Dual Pane Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* Left Sidebar: Categories & Starter Topics */}
        <div className="hidden lg:flex lg:col-span-4 flex-col bg-[#0D1117] border border-white/10 rounded-2xl p-4 overflow-y-auto space-y-4">
          
          <div>
            <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-2">
              Civic Knowledge Sectors
            </p>
            <div className="space-y-1">
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                const isCatActive = activeCategory === cat.label;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveCategory(cat.label);
                      handleSend(cat.query);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between group ${
                      isCatActive
                        ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                        : 'text-[#A8B2C1] hover:bg-white/5 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="truncate">{cat.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Citizen Profile Box */}
          <div className="p-3.5 rounded-xl bg-[#11161D] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Active Profile</span>
              <span className="text-[10px] text-emerald-400 font-bold">Verified</span>
            </div>
            <div className="flex items-center gap-2.5">
              <img src={activePersona.avatarUrl} alt={activePersona.name} className="w-9 h-9 rounded-xl object-cover ring-1 ring-white/10" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{activePersona.name}</p>
                <p className="text-[10px] text-[#A8B2C1] truncate">{activePersona.occupation}</p>
                <p className="text-[10px] text-blue-400 font-medium">{activePersona.district}, {activePersona.state}</p>
              </div>
            </div>
            <div className="text-[10px] text-[#667085] pt-1 border-t border-white/5">
              Income: ₹{activePersona.annualIncome.toLocaleString('en-IN')}/yr • Category: {activePersona.category}
            </div>
          </div>

          {/* Trust Guarantee Note */}
          <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 text-[11px] text-[#A8B2C1] leading-relaxed">
            <div className="flex items-center gap-1.5 text-blue-300 font-bold text-xs mb-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Verifiable Sourcing</span>
            </div>
            All statutory schemes cited by CiviAI link directly to Gazette-published government portals.
          </div>

        </div>

        {/* Right Area: Conversational Feed & Input Bar */}
        <div className="lg:col-span-8 flex flex-col bg-[#0D1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Messages Feed Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                
                {/* Sender Tag */}
                <div className="flex items-center gap-2 mb-1.5 px-1">
                  <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                    {msg.sender === 'user' ? activePersona.name : 'CiviAI Civic Engine'}
                  </span>
                  <span className="text-[10px] text-[#667085]">{msg.timestamp}</span>
                </div>

                {/* User Message Bubble */}
                {msg.sender === 'user' ? (
                  <div className="max-w-2xl bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-3 text-sm leading-relaxed shadow-lg shadow-blue-600/20 font-medium">
                    {msg.text}
                  </div>
                ) : (
                  /* AI Response Card */
                  <div className="w-full max-w-3xl bg-[#11161D] border border-white/10 rounded-2xl rounded-bl-sm p-4 sm:p-5 text-sm space-y-4 shadow-xl">
                    
                    {/* Header Verified Tag & Audio Button */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-cyan-400 flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-xs text-white">Civic Recommendation</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => speakText(msg.text)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold transition-colors"
                          title="Listen with Speech Synthesis"
                        >
                          {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                          <span className="text-[11px]">{isSpeaking ? 'Stop Audio' : 'Listen'}</span>
                        </button>

                        <button
                          onClick={() => copyToClipboard(msg.text, msg.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                          title="Copy message"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Main Narrative Text */}
                    <div className="text-[#F8FAFC] leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                      {msg.text}
                    </div>

                    {/* Step-by-Step Action Items */}
                    {msg.steps && msg.steps.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-[#080B10] border border-white/5 space-y-2">
                        <p className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                          <span>Recommended Action Steps</span>
                        </p>
                        <ol className="space-y-1.5 text-xs text-[#A8B2C1]">
                          {msg.steps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2">
                              <span className="font-mono font-bold text-blue-400 text-[11px] mt-0.5">0{sIdx + 1}.</span>
                              <span className="leading-snug">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Mandatory Documents Checklist */}
                    {msg.checklist && msg.checklist.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-[#080B10] border border-white/5 space-y-2">
                        <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Required Documents</span>
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {msg.checklist.map((doc, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2 text-xs text-[#A8B2C1]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span>{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Matched Scheme Cards */}
                    {msg.suggestedSchemes && msg.suggestedSchemes.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <p className="text-xs font-bold text-white uppercase tracking-wider text-[10px]">
                          Matched Statutory Programs
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {msg.suggestedSchemes.map((scheme) => (
                            <div
                              key={scheme.id}
                              className="p-3 rounded-xl bg-[#080B10] border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-center justify-between text-[10px] mb-1">
                                  <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold">
                                    {scheme.category}
                                  </span>
                                  <span className="text-emerald-400 font-bold">
                                    {scheme.financialAssistance || 'Benefit'}
                                  </span>
                                </div>
                                <h5 className="font-bold text-xs text-white line-clamp-1">{scheme.title}</h5>
                                <p className="text-[11px] text-[#A8B2C1] mt-1 line-clamp-2">{scheme.simplifiedDescription}</p>
                              </div>

                              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                                <button
                                  onClick={() => onSelectScheme(scheme)}
                                  className="text-[11px] text-blue-400 hover:text-blue-300 font-bold"
                                >
                                  View Scheme Details →
                                </button>
                                <button
                                  onClick={() => onNavigateToEligibility(scheme)}
                                  className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition-colors"
                                >
                                  Check Match
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Official Source & Verification Pill */}
                    {msg.verifiedSource && (
                      <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] text-[#667085] gap-2">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Source: <strong className="text-white/80">{msg.verifiedSource.portalName}</strong> ({msg.verifiedSource.lastUpdated})</span>
                        </div>
                        <a
                          href={msg.verifiedSource.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 text-xs text-[#A8B2C1] bg-[#11161D] border border-white/5 p-3 rounded-2xl w-fit">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Consulting Gazette records & evaluating citizen credentials...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Controls Bar */}
          <div className="p-3 sm:p-4 bg-[#080B10] border-t border-white/10 flex items-center gap-2">
            
            {/* Voice Input Mic */}
            <button
              onClick={toggleSpeechRecognition}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse border-rose-400'
                  : 'bg-[#11161D] hover:bg-[#151B23] text-[#A8B2C1] hover:text-white border-white/10'
              }`}
              title="Voice Assistant (Mic)"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Main Text Input */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Ask in ${currentLanguage} (e.g. "Am I eligible for PM-KISAN or Ayushman Bharat?")...`}
              className="flex-1 bg-[#11161D] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors"
            />

            {/* Send Button */}
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/30 flex items-center gap-1.5 transition-all"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
