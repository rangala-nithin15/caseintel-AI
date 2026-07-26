import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Zap, ArrowRight, BellRing } from 'lucide-react';
import { MOCK_SMART_ALERTS } from '../../data/mockData';

interface SmartAlertsBannerProps {
  onSelectAlert: (caseRef?: string) => void;
}

export const SmartAlertsBanner: React.FC<SmartAlertsBannerProps> = ({ onSelectAlert }) => {
  const topAlert = MOCK_SMART_ALERTS[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="my-3 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 relative overflow-hidden"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700 border border-rose-200 flex-shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.2 text-[9px] font-mono font-bold rounded bg-rose-200 text-rose-800">
              {topAlert.type}
            </span>
            <span className="text-[10px] font-mono text-slate-500">{topAlert.timestamp}</span>
          </div>
          <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">
            {topAlert.title}: <span className="font-normal text-slate-700">{topAlert.message}</span>
          </h4>
        </div>
      </div>

      <button
        onClick={() => onSelectAlert(topAlert.caseReference)}
        className="flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-800 text-white shadow-xs transition flex items-center gap-1.5 active:scale-95"
      >
        <span>Analyze Pattern</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};
