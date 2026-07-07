import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SuggestedQuestionsProps {
  suggestions: string[];
  onClick: (text: string) => void;
  disabled?: boolean;
}

export default function SuggestedQuestions({ suggestions, onClick, disabled }: SuggestedQuestionsProps) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="px-6 py-3 bg-slate-950/20 border-t border-slate-800">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
        Suggested follow-up steps
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onClick(suggestion)}
            disabled={disabled}
            className="flex items-center gap-1.5 text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 disabled:opacity-50 text-slate-300 px-3.5 py-2 rounded-xl transition duration-200"
          >
            <span>{suggestion}</span>
            <ArrowRight size={12} className="text-slate-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
