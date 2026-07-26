import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bot, 
  User, 
  Copy, 
  Check, 
  FileText, 
  UserX, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Zap,
  MapPin
} from 'lucide-react';
import { ChatMessage as ChatMessageType, FIRRecord, SuspectProfile } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
  onSelectCase?: (fir: FIRRecord) => void;
  onSelectSuspect?: (suspect: SuspectProfile) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onSelectCase,
  onSelectSuspect
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const isAi = message.sender === 'ai';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3.5 my-4 ${isAi ? 'justify-start' : 'justify-end'}`}
    >
      {/* Avatar */}
      {isAi && (
        <div className="relative flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 p-0.5 shadow-md shadow-cyan-500/10">
          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
            <Bot className="w-5 h-5 text-cyan-600" />
          </div>
        </div>
      )}

      {/* Message Box */}
      <div className={`max-w-2xl group relative rounded-3xl p-4 sm:p-5 border shadow-xs ${
        isAi 
          ? 'bg-white border-slate-200 text-slate-800' 
          : 'bg-cyan-700 text-white border-cyan-600 shadow-sm'
      }`}>
        {/* Header Header Bar */}
        <div className={`flex items-center justify-between pb-2 mb-2 border-b text-xs ${isAi ? 'border-slate-100 text-slate-500' : 'border-white/20 text-cyan-100'}`}>
          <div className="flex items-center gap-1.5 font-mono">
            {isAi ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span className="font-bold text-slate-900">CaseIntel AI Intelligence</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800 font-bold border border-cyan-200">
                  Gemini 3.6
                </span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-cyan-100" />
                <span className="font-bold text-white">Circle Inspector</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono opacity-70">{message.timestamp}</span>
            {isAi && (
              <button
                onClick={handleCopy}
                className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition"
                title="Copy Brief Text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Text Content */}
        <div className="text-sm leading-relaxed space-y-2 whitespace-pre-wrap font-sans">
          {message.text}
        </div>

        {/* Streaming Loading Indicator */}
        {message.isStreaming && (
          <div className="flex items-center gap-1.5 mt-3 text-xs font-mono text-cyan-700">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-ping" />
            <span>Analyzing Karnataka Crime Records...</span>
          </div>
        )}

        {/* Attachments if any */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
            {message.attachments.map((att, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-cyan-800"
              >
                <FileText className="w-4 h-4 text-cyan-600" />
                <span>{att.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Matched Grounding Cards */}
        {message.groundingData && (
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
            {/* FIR Cards Grid */}
            {message.groundingData.firsMatched && message.groundingData.firsMatched.length > 0 && (
              <div>
                <h5 className="text-[11px] font-bold font-heading uppercase text-cyan-800 tracking-wider mb-2 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-cyan-600" /> Correlated FIR Records ({message.groundingData.firsMatched.length})
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {message.groundingData.firsMatched.map((fir) => (
                    <div
                      key={fir.firNumber}
                      onClick={() => onSelectCase && onSelectCase(fir)}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-cyan-400 transition cursor-pointer group/card"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-cyan-800 group-hover/card:underline">
                          {fir.firNumber}
                        </span>
                        <span className="px-1.5 py-0.2 text-[9px] font-mono rounded bg-rose-100 text-rose-800 font-bold">
                          {fir.priority}
                        </span>
                      </div>
                      <div className="text-[11px] font-semibold text-slate-800 mt-1 line-clamp-1">
                        {fir.crimeType}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-slate-400" /> {fir.policeStation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suspect Chips */}
            {message.groundingData.suspectsMatched && message.groundingData.suspectsMatched.length > 0 && (
              <div>
                <h5 className="text-[11px] font-bold font-heading uppercase text-rose-700 tracking-wider mb-2 flex items-center gap-1">
                  <UserX className="w-3.5 h-3.5" /> Suspect Network Match
                </h5>
                <div className="flex flex-wrap gap-2">
                  {message.groundingData.suspectsMatched.map((suspect) => (
                    <div
                      key={suspect.id}
                      onClick={() => onSelectSuspect && onSelectSuspect(suspect)}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-rose-200 hover:border-rose-400 transition cursor-pointer"
                    >
                      <img
                        src={suspect.photoUrl}
                        alt={suspect.fullName}
                        className="w-6 h-6 rounded-lg object-cover ring-1 ring-rose-400"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-800">{suspect.fullName}</span>
                        <span className="ml-1.5 text-[10px] font-mono text-rose-700 font-bold">({suspect.status})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Tactical Action Buttons */}
            {message.groundingData.suggestedActions && message.groundingData.suggestedActions.length > 0 && (
              <div className="pt-2">
                <h5 className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                  Tactical Action Recommendations:
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {message.groundingData.suggestedActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => alert(`Executing Tactical Action: ${action}`)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-800 font-medium text-[11px] border border-cyan-200 transition"
                    >
                      <Zap className="w-3 h-3 text-cyan-600" />
                      <span>{action}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {!isAi && (
        <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-slate-200 border border-slate-300 flex items-center justify-center">
          <User className="w-5 h-5 text-slate-700" />
        </div>
      )}
    </motion.div>
  );
};
