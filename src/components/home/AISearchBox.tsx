import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Mic, 
  MicOff, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Compass,
  Check
} from 'lucide-react';

interface AISearchBoxProps {
  onSearch: (query: string) => void;
  onDetectLocation: () => void;
  detectedLocation?: string;
}

export const AISearchBox: React.FC<AISearchBoxProps> = ({
  onSearch,
  onDetectLocation,
  detectedLocation
}) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const suggestions = [
    "Find government offices near me",
    "Which schemes am I eligible for?",
    "How can I apply for a birth certificate?",
    "Show education schemes & scholarships"
  ];

  // Web Speech API Voice Recognition
  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
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
      recognition.lang = 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        onSearch(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-8">
      
      {/* Search Input Box */}
      <form
        onSubmit={handleSubmit}
        className="relative group p-1.5 rounded-2xl bg-[#0D1117] border border-white/10 hover:border-blue-500/40 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 shadow-2xl transition-all"
      >
        <div className="flex items-center gap-2 sm:gap-3 px-3 py-1.5">
          
          {/* AI Core Icon */}
          <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>

          {/* Large Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about civic services, schemes, certificates, offices..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-white/40 focus:outline-none font-medium"
          />

          {/* Location Pill */}
          <button
            type="button"
            onClick={onDetectLocation}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              detectedLocation
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-white/5 hover:bg-white/10 text-[#A8B2C1] hover:text-white border-white/10'
            }`}
            title="Detect nearby civic jurisdiction"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{detectedLocation || 'Near me'}</span>
            {detectedLocation && <Check className="w-3 h-3 text-emerald-400" />}
          </button>

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleVoice}
            className={`p-2.5 rounded-xl border transition-all ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse border-rose-500'
                : 'bg-white/5 hover:bg-white/10 text-[#A8B2C1] hover:text-white border-white/10'
            }`}
            title="Search with Voice"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Submit Search Button */}
          <button
            type="submit"
            disabled={!query.trim()}
            className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/30 flex items-center gap-1.5 transition-all shrink-0"
          >
            <span className="hidden sm:inline">Ask AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </form>

      {/* Suggestion Chips */}
      <div className="mt-4 flex flex-wrap items-center gap-2 justify-center text-xs">
        <span className="text-[#667085] text-[11px] font-semibold flex items-center gap-1">
          <Compass className="w-3 h-3 text-blue-400" /> Common queries:
        </span>
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => {
              setQuery(s);
              onSearch(s);
            }}
            className="bg-[#11161D] hover:bg-[#151B23] border border-white/5 hover:border-white/20 text-[#A8B2C1] hover:text-white px-3 py-1.5 rounded-xl transition-all shadow-sm hover:scale-[1.02]"
          >
            {s}
          </button>
        ))}
      </div>

    </div>
  );
};
