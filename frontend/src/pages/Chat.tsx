import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bot, Trash2, Loader2, Download } from 'lucide-react';
import { askCrimeAssistant } from '../api/chatApi';
import ChatMessages from '../components/chatbot/ChatMessages';
import ChatInput from '../components/chatbot/ChatInput';
import SuggestedQuestions from '../components/chatbot/SuggestedQuestions';
import ConversationSummary from '../components/chatbot/ConversationSummary';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  records?: any[];
  count?: number;
}

export default function Chat() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q');
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [context, setContext] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Show theft cases in Bagalkot",
    "Show murder cases in Mysuru in 2021",
    "Show FIRs from Amengad PS",
  ]);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Execute initial query from Dashboard if present
  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
      // Clear search query param
      setSearchParams({});
    }
  }, [initialQuery]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || sending) return;

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setSending(true);

    try {
      const response = await askCrimeAssistant(text, context);
      
      const assistantMsg: Message = {
        sender: 'assistant',
        text: response.summary,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        records: response.records,
        count: response.count
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setContext(response.context);
      setSuggestions(response.suggestions || []);
    } catch (err) {
      console.error("Error communicating with AI Assistant:", err);
      const errorMsg: Message = {
        sender: 'assistant',
        text: "Error: I am unable to connect to the intelligence server. Please ensure the backend is running.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setContext(null);
    setSuggestions([
      "Show theft cases in Bagalkot",
      "Show murder cases in Mysuru in 2021",
      "Show FIRs from Amengad PS",
    ]);
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative">
      {/* Printable Area - Hidden on Screen, visible on print */}
      <div id="print-area" className="hidden print:block p-8 bg-white text-black font-sans w-full">
        <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black tracking-tight">CYBER-MATRIX CRIMINOLOGY REPORT</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
              Confidential - Internal Law Enforcement Intelligence
            </p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <div>Date: {new Date().toLocaleDateString()}</div>
            <div>Time: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>

        {context && (
          <div className="mb-6 bg-slate-100 p-4 rounded border border-slate-300">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Investigation Scope</h3>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {context.crime && <li><strong>Offence Type:</strong> {context.crime}</li>}
              {context.district && <li><strong>District Focus:</strong> {context.district}</li>}
              {context.station && <li><strong>Police Station:</strong> {context.station}</li>}
              {context.year && <li><strong>Year Period:</strong> {context.year}</li>}
              {context.only_convicted && <li><strong>Disposition:</strong> Convictions Only</li>}
            </ul>
          </div>
        )}

        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1">
            Case Q&A Transcript
          </h3>
          {messages.map((msg, index) => (
            <div key={index} className="text-xs">
              <div className="font-bold text-slate-700 uppercase mb-1">
                {msg.sender === 'user' ? 'Investigator Prompt' : 'Intelligence Summary'} ({msg.timestamp})
              </div>
              <p className="text-slate-900 whitespace-pre-wrap pl-3 border-l-2 border-slate-300 leading-relaxed">
                {msg.text.replace(/\*\*/g, '')}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-300 pt-4 text-center text-[10px] text-slate-500">
          Generated automatically by Cyber Matrix Crime Intelligence System. Confidentiality and security rules apply.
        </div>
      </div>

      {/* Screen Layout */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950/40 print:hidden">
        {/* Chat Header */}
        <div className="h-16 border-b border-slate-800 bg-slate-900/60 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-200">AI Crime Assistant</h3>
              <p className="text-[10px] text-slate-400">Surveillance Memory active</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <>
                <button
                  onClick={handleExportPDF}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition cursor-pointer"
                >
                  <Download size={14} className="text-blue-400" />
                  <span>Export Report</span>
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 bg-slate-800 hover:bg-rose-500/10 border border-slate-700 hover:border-rose-500/30 rounded-xl text-slate-400 hover:text-rose-400 transition cursor-pointer"
                  title="Clear Conversation"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <ChatMessages messages={messages} />

        {sending && (
          <div className="px-6 py-2 flex items-center gap-2 text-xs text-slate-400 bg-slate-950/20">
            <Loader2 size={12} className="animate-spin text-blue-500" />
            <span>AI Assistant is compiling criminology aggregates...</span>
          </div>
        )}

        {/* Suggested Questions */}
        <SuggestedQuestions
          suggestions={suggestions}
          onClick={handleSendMessage}
          disabled={sending}
        />

        {/* Chat Input */}
        <ChatInput onSend={handleSendMessage} disabled={sending} />

        <div ref={messagesEndRef} />
      </div>

      {/* Right Sidebar Conversation Summary */}
      <ConversationSummary context={context} onReset={handleReset} />
    </div>
  );
}
