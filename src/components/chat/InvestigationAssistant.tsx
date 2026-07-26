import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Send, 
  Mic, 
  Paperclip, 
  Bot, 
  Trash2, 
  RotateCcw, 
  FileText, 
  ShieldCheck,
  Zap,
  Radio,
  Cpu
} from 'lucide-react';
import { ChatMessage as ChatMessageType, FIRRecord, SuspectProfile } from '../../types';
import { ChatMessage } from './ChatMessage';
import { SuggestedPrompts } from './SuggestedPrompts';
import { sendChatMessage } from '../../services/aiService';
import { useTheme } from '../../context/ThemeContext';
import policeLogo from '../../assets/logo.jpg';

interface InvestigationAssistantProps {
  onOpenVoiceInput: () => void;
  onOpenUploader: () => void;
  onSelectCase: (fir: FIRRecord) => void;
  onSelectSuspect: (suspect: SuspectProfile) => void;
  initialQuery?: string;
}

export const InvestigationAssistant: React.FC<InvestigationAssistantProps> = ({
  onOpenVoiceInput,
  onOpenUploader,
  onSelectCase,
  onSelectSuspect,
  initialQuery
}) => {
  const { config } = useTheme();
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `### 🛡️ Welcome to CaseIntel Investigation System
**Unit:** Karnataka State Police Central Intelligence Command  
**Status:** Authenticated & Connected to Central Vault

Synchronized with active Karnataka FIR databases across all 31 districts, FSL ballistics logs, and suspect radar.

**How can I assist your investigation today?**
- Search FIRs by natural language location or modus operandi
- Summarize complex case sheets into executive briefing cards
- Match suspect signatures across Cyber, Armed Robbery, or Narcotics syndicates`,
      timestamp: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuery) {
      handleSendQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSendQuery = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsTyping(true);

    try {
      const response = await sendChatMessage(textToSend, messages);

      const aiMsg: ChatMessageType = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.reply,
        timestamp: response.timestamp,
        groundingData: response.groundingData
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat response error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'ai',
        text: 'Session history cleared. Ready for new Karnataka Police intelligence query.',
        timestamp: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className={`flex flex-col h-full rounded-3xl border shadow-md overflow-hidden relative transition ${
      config.isDark ? 'bg-[#0f172a]/90 border-slate-800 text-slate-100' : 'bg-white/90 border-slate-200/90 text-slate-900'
    }`}>
      {/* Top Action Header */}
      <div className={`px-6 py-3.5 border-b flex items-center justify-between ${
        config.isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200/80 bg-slate-50/80'
      }`}>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl p-0.5 bg-gradient-to-br from-amber-500 via-cyan-600 to-blue-700 shadow-sm shrink-0 overflow-hidden bg-slate-900">
            <img 
              src={policeLogo} 
              alt="Karnataka Police Emblem" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
          </div>

          <div>
            <h3 className="text-sm font-bold font-heading flex items-center gap-2">
              CaseIntel Automated Query Engine
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                ACTIVE GROUNDING
              </span>
            </h3>
            <p className="text-[10px] font-mono opacity-60 flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 text-emerald-500" /> KSP Intelligence Server • Central Vault Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl opacity-70 hover:opacity-100 hover:text-rose-500 hover:bg-rose-500/10 transition text-xs flex items-center gap-1.5 cursor-pointer"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline font-mono">Clear Session</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onSelectCase={onSelectCase}
            onSelectSuspect={onSelectSuspect}
          />
        ))}

        {/* Suggested Queries Container */}
        {messages.length <= 2 && (
          <SuggestedPrompts onSelectPrompt={(p) => handleSendQuery(p)} />
        )}

        {isTyping && (
          <div className="flex items-center gap-3 my-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-500">
              <Cpu className="w-4 h-4 animate-spin" />
            </div>
            <div className={`px-4 py-3 rounded-2xl border text-xs font-mono flex items-center gap-2 ${
              config.isDark ? 'bg-slate-900 border-slate-800 text-cyan-300' : 'bg-slate-50 border-slate-200 text-cyan-900'
            }`}>
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <span>Cross-referencing Karnataka Police Central Case Vault...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Control Box */}
      <div className={`p-4 border-t ${
        config.isDark ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-slate-50/50'
      }`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuery();
          }}
          className="relative flex items-center gap-2"
        >
          <div className="flex items-center gap-1 pl-2">
            <button
              type="button"
              onClick={onOpenUploader}
              className="p-2.5 rounded-xl opacity-70 hover:opacity-100 hover:text-cyan-500 transition cursor-pointer"
              title="Attach FIR Document or Image"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onOpenVoiceInput}
              className="p-2.5 rounded-xl text-cyan-500 hover:bg-cyan-500/10 transition cursor-pointer"
              title="Voice Input Assistant"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search Police Records (e.g. 'Show robbery cases from Bengaluru' or 'Find suspect Arjun Varma')..."
            className={`flex-1 py-3 px-4 rounded-2xl text-sm transition font-sans ${
              config.isDark 
                ? 'bg-slate-900 text-slate-100 placeholder-slate-500 border border-slate-700 focus:outline-none focus:border-cyan-500' 
                : 'bg-white text-slate-900 placeholder-slate-400 border border-slate-300 focus:outline-none focus:border-cyan-600'
            }`}
          />

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`p-3 rounded-2xl font-bold transition flex items-center justify-center cursor-pointer ${
              input.trim() && !isTyping
                ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-md active:scale-95'
                : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
            title="Send Query"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

