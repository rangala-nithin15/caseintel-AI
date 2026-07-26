import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Search, FileText, UserSearch, AlertCircle, ShieldAlert } from 'lucide-react';
import { INITIAL_SUGGESTED_PROMPTS } from '../../data/mockData';

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onSelectPrompt }) => {
  const promptIcons = [Search, UserSearch, FileText, ShieldAlert, AlertCircle, Sparkles];

  return (
    <div className="w-full space-y-3 my-4">
      <div className="flex items-center gap-2 text-xs font-mono text-cyan-800">
        <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
        <span className="font-bold uppercase tracking-wider">Suggested Intelligence Queries</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {INITIAL_SUGGESTED_PROMPTS.map((promptText, index) => {
          const Icon = promptIcons[index % promptIcons.length];

          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectPrompt(promptText)}
              className="group p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-cyan-400 text-left transition flex items-start gap-3 shadow-xs hover:shadow-sm"
            >
              <div className="p-2 rounded-xl bg-cyan-50 text-cyan-700 group-hover:bg-cyan-100 transition">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-800 group-hover:text-cyan-900 transition leading-snug">
                  {promptText}
                </p>
                <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                  Run Query →
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
