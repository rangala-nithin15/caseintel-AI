import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  MapPin, 
  UserCheck, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { MOCK_TIMELINE_EVENTS } from '../../data/mockData';
import { InvestigationTimelineEvent } from '../../types';

export const TimelineView: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>("TL-001");

  return (
    <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan-600" />
          <h3 className="text-base font-bold font-heading text-slate-900">
            Active Investigation Timeline
          </h3>
        </div>
        <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-cyan-100 text-cyan-800 border border-cyan-200">
          REAL-TIME KSP CHRONOLOGY
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-cyan-500">
        {MOCK_TIMELINE_EVENTS.map((event) => {
          const isExpanded = expandedId === event.id;

          return (
            <div key={event.id} className="relative group">
              {/* Timeline Connector Dot */}
              <div className="absolute -left-[30px] top-1.5 w-5 h-5 rounded-full bg-white border-2 border-cyan-600 flex items-center justify-center shadow-xs">
                <div className="w-2 h-2 rounded-full bg-cyan-600" />
              </div>

              {/* Card Container */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : event.id)}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-cyan-400 transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-md bg-cyan-100 text-cyan-800 border border-cyan-200">
                      {event.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      Case Ref: {event.caseId}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-800 font-bold">
                      {event.timestamp}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-2 font-heading">
                  {event.title}
                </h4>

                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  {event.description}
                </p>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-600"
                  >
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Officer: {event.officerInCharge}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>Location: {event.location}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
