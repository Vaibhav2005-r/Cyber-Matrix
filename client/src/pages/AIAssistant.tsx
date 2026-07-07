import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage } from '@/lib/catalyst';
import { Terminal, Send, Cpu, Database, Network, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'system', content: string, meta?: any}[]>([
    { role: 'system', content: 'INTELLIGENCE MATRIX TERMINAL v9.4.1\nSECURE CONNECTION ESTABLISHED.\nAWAITING QUERY INPUT...' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<any>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setIsTyping(true);

    const res = await sendChatMessage(msg, context);
    
    setContext(res.context);
    setIsTyping(false);
    setMessages(prev => [...prev, { 
      role: 'system', 
      content: res.reply,
      meta: res.evidence 
    }]);
  };

  return (
    <div className="p-6 h-[calc(100vh-2rem)] flex flex-col space-y-4">
      <div className="flex justify-between items-end border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-mono font-bold tracking-widest mb-1 text-foreground flex items-center gap-2">
            <Terminal className="text-secondary" /> AI_INTELLIGENCE_TERMINAL
          </h1>
          <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em]">KSP • Secure Channel • NLP Engine Active</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 border border-border bg-card flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
            <Cpu size={12} className="text-secondary animate-pulse" /> MODEL_STATE: ONLINE
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-4 gap-4 overflow-hidden">
        {/* Main Terminal */}
        <Card className="col-span-3 bg-black border border-border rounded-none shadow-none flex flex-col h-full overflow-hidden">
          <CardContent className="flex-1 p-0 flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-6 font-mono text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col space-y-2 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground tracking-widest uppercase">
                    {m.role === 'user' ? 'OPERATOR_INPUT' : 'SYSTEM_RESPONSE'}
                  </div>
                  <div className={`p-3 max-w-[80%] border ${
                    m.role === 'user' 
                      ? 'border-secondary/50 bg-secondary/10 text-secondary' 
                      : 'border-border bg-[#0a0a0a] text-green-400'
                  }`}>
                    <pre className="whitespace-pre-wrap font-mono text-xs">{m.content}</pre>
                    
                    {m.meta && (
                      <div className="mt-4 pt-4 border-t border-dashed border-green-900/50 flex flex-col space-y-2">
                        <div className="text-[10px] text-green-600 uppercase tracking-widest">Metadata_Trace</div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] text-green-700">
                          {Object.entries(m.meta).map(([k, v]) => (
                            <div key={k} className="p-1 border border-green-900/30 bg-green-950/20 truncate">
                              <span className="opacity-50">{k}:</span> {JSON.stringify(v)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex flex-col items-start space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground tracking-widest uppercase">
                    SYSTEM_PROCESSING
                  </div>
                  <div className="p-3 border border-border bg-[#0a0a0a] text-green-400 flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" />
                    <span className="text-xs">COMPUTING_TRAJECTORY...</span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-border bg-[#0a0a0a] flex items-center gap-4">
              <span className="text-secondary font-mono animate-pulse">{'>'}</span>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-sm placeholder:text-green-900"
                placeholder="Enter search query or command..."
                spellCheck={false}
              />
              <button 
                onClick={handleSend}
                className="p-2 bg-secondary/10 border border-secondary text-secondary hover:bg-secondary hover:text-black transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Side Context Panel */}
        <Card className="col-span-1 bg-card border border-border rounded-none shadow-none h-full overflow-y-auto">
          <div className="p-3 border-b border-border bg-muted/20">
            <div className="text-[10px] font-mono tracking-widest text-muted-foreground flex items-center gap-2">
              <Database size={12} /> SESSION_CONTEXT
            </div>
          </div>
          <div className="p-4 space-y-6">
            {context ? (
              <div className="space-y-4">
                {Object.entries(context).map(([key, val]) => (
                  <div key={key} className="space-y-1">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">{key}</div>
                    <div className="text-xs font-mono text-foreground border border-border p-2 bg-background break-all">
                      {val !== null ? String(val) : 'NULL'}
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => setContext(null)}
                  className="w-full p-2 border border-destructive text-[10px] font-mono text-destructive hover:bg-destructive hover:text-black transition-colors uppercase"
                >
                  Flush_Memory
                </button>
              </div>
            ) : (
              <div className="text-xs font-mono text-muted-foreground/50 border border-dashed border-border p-4 text-center">
                MEMORY_BANK_EMPTY
              </div>
            )}
            
            <div className="pt-4 border-t border-border space-y-2">
              <div className="text-[10px] font-mono tracking-widest text-muted-foreground flex items-center gap-2">
                <Network size={12} /> BACKEND_STATUS
              </div>
              <div className="text-[10px] font-mono text-green-500 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> /api/chat ONLINE
              </div>
              <div className="text-[10px] font-mono text-muted-foreground">
                LATENCY: 42ms<br/>
                ENGINE: FastNLP-v2
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
