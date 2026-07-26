import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, X, Copy, Check, FileText, ShieldCheck, ExternalLink, Bot } from 'lucide-react';
import Markdown from 'react-markdown';
import { FIRRecord } from '../../types';
import { casesService } from '../../services/casesService';
import { useTheme } from '../../context/ThemeContext';

interface CaseSummaryModalProps {
  fir: FIRRecord | null;
  onClose: () => void;
  onAskAi?: (query: string) => void;
}

export const CaseSummaryModal: React.FC<CaseSummaryModalProps> = ({
  fir,
  onClose,
  onAskAi
}) => {
  const { config } = useTheme();
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!fir) return;

    let isMounted = true;
    setIsLoading(true);

    casesService.summarizeCase(fir.firNumber).then((resText) => {
      if (isMounted) {
        setSummary(resText);
        setIsLoading(false);
      }
    }).catch(() => {
      if (isMounted) {
        setSummary(`### 📑 Executive Brief: ${fir.firNumber}\n\n* **Crime Type:** ${fir.crimeType}\n* **Description:** ${fir.description}\n* **Station:** ${fir.policeStation}`);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [fir]);

  if (!fir) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAskAssistant = () => {
    if (onAskAi) {
      onAskAi(`Please analyze case ${fir.firNumber} and summarize key suspect connections and evidence.`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className={`w-full max-w-2xl p-6 sm:p-8 rounded-3xl border shadow-2xl relative my-auto transition ${
          config.isDark ? 'bg-[#0f172a] border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                {fir.firNumber}
              </span>
              <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full ${
                fir.priority === 'CRITICAL' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {fir.priority}
              </span>
            </div>
            <h2 className="text-lg font-bold font-heading">{fir.crimeType}</h2>
          </div>
        </div>

        {/* Status Bar */}
        <div className="p-3 mb-5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
          <div><span className="opacity-60">Station:</span> <span className="font-semibold">{fir.policeStation}</span></div>
          <div><span className="opacity-60">Officer:</span> <span className="font-semibold">{fir.investigatingOfficer}</span></div>
          <div><span className="opacity-60">Loss Valuation:</span> <span className="font-semibold text-cyan-600 dark:text-cyan-400">{fir.stolenValueINR || 'N/A'}</span></div>
        </div>

        {/* AI Summary Content Box */}
        <div className={`p-5 rounded-2xl border min-h-[180px] max-h-[360px] overflow-y-auto text-xs leading-relaxed transition ${
          config.isDark ? 'bg-slate-900/90 border-slate-700/80' : 'bg-slate-50 border-slate-200'
        }`}>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-3 text-slate-400">
              <Sparkles className="w-8 h-8 text-cyan-500 animate-spin" />
              <p className="text-xs font-mono font-semibold animate-pulse">Generating AI Executive Brief from Karnataka Database...</p>
            </div>
          ) : (
            <div className="markdown-body text-slate-800 dark:text-slate-200">
              <Markdown>{summary}</Markdown>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5">
          <button
            onClick={handleCopy}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Brief' : 'Copy Brief'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onAskAi && (
              <button
                onClick={handleAskAssistant}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI Assistant</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
