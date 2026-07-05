import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Download, Volume2, VolumeX, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { sendChatMessage } from '../lib/catalyst';

interface Evidence {
  query: string;
  fir_numbers: string[];
  record_count: number;
  confidence: string;
}

interface Message {
  id: number;
  role: 'user' | 'bot';
  content: string;
  evidence?: Evidence;
  timestamp: Date;
}

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'bot',
      content: 'Welcome to the KSP AI Investigation Assistant. You can ask me about crime data, repeat offenders, or specific FIRs in English or Kannada.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<'en'|'kn'>('en');
  const [voiceOutput, setVoiceOutput] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [expandedEvidence, setExpandedEvidence] = useState<number | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = language === 'en' ? 'en-US' : 'kn-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Speech recognition is not supported in this browser.");
      }
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await sendChatMessage(userMsg.content, language);
      const botMsg: Message = {
        id: Date.now() + 1,
        role: 'bot',
        content: response.reply,
        evidence: response.evidence,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      
      if (voiceOutput) {
        const utterance = new SpeechSynthesisUtterance(response.reply);
        utterance.lang = language === 'en' ? 'en-US' : 'kn-IN';
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'bot',
        content: 'Connection error. Unable to reach Catalyst Functions.',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">AI Crime Assistant</h1>
          <p className="text-sm text-muted-foreground">Powered by Catalyst ConvoKraft & QuickML</p>
        </div>
        <div className="flex gap-4 items-center">
          <Button 
            variant="outline" 
            onClick={() => setLanguage(l => l === 'en' ? 'kn' : 'en')}
            className={language === 'kn' ? 'bg-primary/20 text-primary border-primary' : ''}
          >
            {language === 'en' ? 'English (EN)' : 'ಕನ್ನಡ (KN)'}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setVoiceOutput(!voiceOutput)}
            className={voiceOutput ? 'text-primary' : 'text-muted-foreground'}
          >
            {voiceOutput ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </Button>

          <Button variant="outline" onClick={() => window.print()} className="gap-2">
            <Download size={16} /> Export PDF
          </Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-border bg-card shadow-sm">
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {messages.map(msg => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              
              <div className={`max-w-[75%] p-4 rounded-xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted/50 text-foreground border border-border'
              }`}>
                <div className="leading-relaxed text-sm">{msg.content}</div>
                <div className={`text-[10px] mt-2 text-right ${msg.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {msg.evidence && (
                <div className="mt-2 max-w-[75%] w-full">
                  <button 
                    onClick={() => setExpandedEvidence(prev => prev === msg.id ? null : msg.id)}
                    className="flex items-center gap-1.5 text-xs text-yellow-500 hover:text-yellow-400 transition-colors bg-transparent border-none cursor-pointer"
                  >
                    <ShieldCheck size={14} /> Explainable AI Trace {expandedEvidence === msg.id ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                  </button>
                  
                  {expandedEvidence === msg.id && (
                    <div className="mt-3 p-4 bg-black/40 rounded-lg border border-border/50 backdrop-blur-sm">
                      <div className="text-xs text-muted-foreground mb-3">
                        <strong className="text-foreground">Confidence:</strong> {msg.evidence.confidence} ({msg.evidence.record_count} records checked)
                      </div>
                      <div className="text-xs text-muted-foreground mb-1"><strong className="text-foreground">ZCQL Query:</strong></div>
                      <pre className="text-[11px] bg-black/60 p-3 rounded-md overflow-x-auto text-green-400 mb-3 border border-border/30">
                        {msg.evidence.query}
                      </pre>
                      {msg.evidence.fir_numbers.length > 0 && (
                        <div>
                          <div className="text-xs text-muted-foreground mb-2"><strong className="text-foreground">Referenced FIRs:</strong></div>
                          <div className="flex gap-2 flex-wrap">
                            {msg.evidence.fir_numbers.map(fir => (
                              <span key={fir} className="bg-primary/10 text-primary px-2 py-1 rounded text-[11px] font-medium border border-primary/20">
                                #{fir}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start">
              <div className="p-4 rounded-xl bg-muted/50 text-muted-foreground text-sm border border-border">
                Analyzing state crime database...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t border-border bg-muted/30 flex gap-3 items-center">
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleListening}
            className={`rounded-full shrink-0 ${isListening ? 'border-destructive text-destructive animate-pulse bg-destructive/10' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Mic size={18} />
          </Button>
          
          <Input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={language === 'en' ? "Ask about crime data, FIRs, or offenders..." : "ಕ್ರೈಮ್ ಡೇಟಾ ಬಗ್ಗೆ ಕೇಳಿ..."}
            className="flex-1 bg-background/50 border-border"
          />

          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="shrink-0 px-6"
          >
            <Send size={18} className="mr-2" /> Send
          </Button>
        </div>
      </Card>
    </div>
  );
};
