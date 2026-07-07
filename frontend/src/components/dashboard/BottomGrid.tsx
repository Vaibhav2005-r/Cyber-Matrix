import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, Clock, MapPin, Sparkles } from 'lucide-react';

interface BottomGridProps {
  recentCases: any[];
}

export default function BottomGrid({ recentCases }: BottomGridProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/chat?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestedClick = (text: string) => {
    navigate(`/chat?q=${encodeURIComponent(text)}`);
  };

  const suggestedPrompts = [
    "Show theft cases in Bagalkot",
    "Show murder cases in Mysuru in 2021",
    "Show FIRs from Amengad PS",
  ];

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      {/* AI Assistant Preview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-linear-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Bot size={22} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                AI Crime Assistant
                <span className="flex items-center gap-0.5 text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full font-medium">
                  <Sparkles size={10} />
                  BETA
                </span>
              </h3>
              <p className="text-xs text-slate-400">Ask questions and query Karnataka crime records using natural language.</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase block">
              Suggested Queries
            </span>
            <div className="flex flex-col gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSuggestedClick(prompt)}
                  className="text-left text-xs bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 px-4 py-2.5 rounded-xl transition duration-200"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1.5 focus-within:border-blue-500/50 transition duration-200">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about crime records..."
              className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500 w-full px-3 py-2"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white p-2.5 rounded-lg flex items-center gap-2 text-xs font-semibold tracking-wide uppercase transition"
            >
              <span>Send</span>
              <Send size={14} />
            </button>
          </div>
        </form>
      </div>

      {/* Recent Cases Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Recent Case Feeds</h3>
            <p className="text-xs text-slate-400">Live feed of incoming FIR registrations</p>
          </div>
          <span className="h-2 w-2 bg-emerald-500 rounded-full animate-ping" />
        </div>

        <div className="space-y-4">
          {recentCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="flex items-center justify-between p-3.5 bg-slate-800/20 hover:bg-slate-800/40 border border-slate-800/50 rounded-xl transition duration-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                  caseItem.severity === 'high' 
                    ? 'bg-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
                    : caseItem.severity === 'medium' 
                    ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' 
                    : 'bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.5)]'
                }`} />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-200 truncate" title={caseItem.type}>{caseItem.type}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {caseItem.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {caseItem.location}
                    </span>
                  </div>
                </div>
              </div>

              <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${
                caseItem.status === 'Resolved'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : caseItem.status === 'Investigating'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}>
                {caseItem.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
