import React from 'react';
import { Bot, User, Clock, ShieldAlert } from 'lucide-react';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  records?: any[];
  count?: number;
}

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  // Custom parser to format bold markdown '**' and bullet points '•' without extra libraries
  const renderMessageText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={i} className="h-2" />;

      const isBullet = trimmed.startsWith('•');
      const content = isBullet ? trimmed.substring(1).trim() : line;

      // Split by bold markers
      const parts = content.split(/\*\*(.*?)\*\*/g);
      const renderedParts = parts.map((part, index) => {
        if (index % 2 === 1) {
          return <strong key={index} className="text-white font-bold">{part}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={i} className="ml-5 list-disc text-slate-300 mt-1.5 leading-relaxed">
            {renderedParts}
          </li>
        );
      }
      return <p key={i} className="text-slate-300 leading-relaxed">{renderedParts}</p>;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <div className="h-16 w-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 mb-4 animate-bounce">
            <Bot size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Start an AI Investigation</h3>
          <p className="text-slate-400 text-sm max-w-sm">
            Type queries like "Show theft cases in Bagalkot" and refine them by year or convictions.
          </p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-4 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="h-9 w-9 rounded-xl bg-linear-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shrink-0">
                <Bot size={18} />
              </div>
            )}

            <div
              className={`max-w-[75%] rounded-2xl p-4 border ${
                msg.sender === 'user'
                  ? 'bg-blue-600 border-blue-500/20 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-100'
              }`}
            >
              <div className="flex justify-between items-center text-[10px] text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider">
                  {msg.sender === 'user' ? 'Lead Investigator' : 'AI Assistant'}
                </span>
                <span className="flex items-center gap-1 pl-2">
                  <Clock size={10} />
                  {msg.timestamp}
                </span>
              </div>

              <div className="space-y-1">
                {msg.sender === 'user' ? (
                  <p className="text-white leading-relaxed">{msg.text}</p>
                ) : (
                  renderMessageText(msg.text)
                )}
              </div>

              {/* Collapsible records table/view if available */}
              {msg.records && msg.records.length > 0 && (
                <div className="mt-4 border-t border-slate-800 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Recent Incident Matches ({msg.count} total)
                    </span>
                  </div>
                  
                  <div className="overflow-x-auto rounded-lg border border-slate-800 max-h-60">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                          <th className="p-2 font-medium">FIR ID</th>
                          <th className="p-2 font-medium">Date</th>
                          <th className="p-2 font-medium">Crime Group</th>
                          <th className="p-2 font-medium">Division</th>
                          <th className="p-2 font-medium">Stage</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                        {msg.records.slice(0, 5).map((rec: any, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-800/30">
                            <td className="p-2 text-slate-300 font-mono">{rec.Unit_ID}-{rec.KGID || 'N/A'}</td>
                            <td className="p-2 text-slate-400">{rec.FIR_Day}/{rec.FIR_MONTH}/{rec.FIR_YEAR}</td>
                            <td className="p-2 text-slate-300 font-semibold">{rec.CrimeGroup_Name}</td>
                            <td className="p-2 text-slate-400">{rec.UnitName}</td>
                            <td className="p-2">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                                rec.FIR_Stage === 'Convicted'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              }`}>
                                {rec.FIR_Stage}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {msg.records.length > 5 && (
                    <p className="text-[10px] text-slate-500 mt-2 italic">
                      Showing top 5 matches. Total cases: {msg.count}.
                    </p>
                  )}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="h-9 w-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                <User size={18} />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
