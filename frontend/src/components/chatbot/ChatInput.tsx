import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-slate-800 bg-slate-900/40 p-4">
      <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1.5 focus-within:border-blue-500/50 transition duration-200">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          placeholder="Ask anything about crime records (e.g., 'Show theft cases in Bagalkot')..."
          className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500 w-full px-3 py-2 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!text.trim() || disabled}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white p-2.5 rounded-lg flex items-center gap-2 text-xs font-semibold tracking-wide uppercase transition shrink-0"
        >
          <span>Send</span>
          <Send size={14} />
        </button>
      </div>
    </form>
  );
}
