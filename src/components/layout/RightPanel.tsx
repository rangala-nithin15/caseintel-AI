import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  UserX, 
  FileText, 
  MapPin, 
  Pin, 
  StickyNote, 
  ChevronRight, 
  AlertCircle, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Bookmark,
  X
} from 'lucide-react';
import { MOCK_SUSPECTS, MOCK_FIRS, MOCK_HOTSPOTS } from '../../data/mockData';
import { FIRRecord, SuspectProfile } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface RightPanelProps {
  onSelectCase: (fir: FIRRecord) => void;
  onSelectSuspect: (suspect: SuspectProfile) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  onSelectCase,
  onSelectSuspect,
  mobileOpen = false,
  setMobileOpen
}) => {
  const { config } = useTheme();
  const [activeTab, setActiveTab] = useState<'insights' | 'wanted' | 'hotspots' | 'notes'>('insights');
  const [notesText, setNotesText] = useState<string>(
    "• Suspect Arjun Varma IP traced to VPN exit node in Dubai.\n• Ballistics for FIR 1120 match 7.65mm pistol seized in 2024.\n• Request CCTV records from Electronic City Toll Gate #4."
  );

  const handleCaseClick = (fir: FIRRecord) => {
    onSelectCase(fir);
    if (setMobileOpen) setMobileOpen(false);
  };

  const handleSuspectClick = (suspect: SuspectProfile) => {
    onSelectSuspect(suspect);
    if (setMobileOpen) setMobileOpen(false);
  };

  const PanelContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Mobile Top Header */}
      {isMobile && (
        <div className={`p-4 border-b flex items-center justify-between shrink-0 ${
          config.isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white'
        }`}>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-bold font-heading">KSP Intelligence Feed</h3>
          </div>
          <button
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Tab Switcher */}
      <div className={`p-3 border-b flex items-center justify-between gap-1 shrink-0 ${
        config.isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200/80 bg-slate-50/80'
      }`}>
        <button
          onClick={() => setActiveTab('insights')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer ${
            activeTab === 'insights'
              ? 'bg-cyan-600 text-white shadow-xs'
              : config.isDark ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Insights</span>
        </button>

        <button
          onClick={() => setActiveTab('wanted')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer ${
            activeTab === 'wanted'
              ? 'bg-cyan-600 text-white shadow-xs'
              : config.isDark ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <UserX className="w-3.5 h-3.5 text-rose-500" />
          <span>Wanted</span>
        </button>

        <button
          onClick={() => setActiveTab('hotspots')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer ${
            activeTab === 'hotspots'
              ? 'bg-cyan-600 text-white shadow-xs'
              : config.isDark ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-amber-500" />
          <span>Hotspots</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer ${
            activeTab === 'notes'
              ? 'bg-cyan-600 text-white shadow-xs'
              : config.isDark ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <StickyNote className="w-3.5 h-3.5 text-emerald-500" />
          <span>Notes</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* TAB 1: AI INSIGHTS */}
        {activeTab === 'insights' && (
          <div className="space-y-4">
            {/* Real-time Pattern Alert */}
            <div className={`p-3.5 rounded-2xl border shadow-xs relative overflow-hidden ${
              config.isDark
                ? 'bg-slate-900/90 border-cyan-500/30 text-slate-200'
                : 'bg-gradient-to-br from-cyan-50 via-white to-blue-50 border-cyan-200 text-slate-800'
            }`}>
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-1.5">
                <Zap className="w-4 h-4 text-cyan-500" />
                <h4 className="text-xs font-bold font-heading uppercase tracking-wider">
                  Modus Operandi Pattern Alert
                </h4>
              </div>
              <p className="text-xs opacity-90 leading-relaxed">
                CaseIntel AI cross-referenced <strong>FIR/CCB/2026/2401</strong> with Hyderabad Cyber Crime Database. Detected <strong>94.2% match</strong> in API scraper signature.
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">Syndicate: ShadowBytes</span>
                <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-bold">
                  CRITICAL
                </span>
              </div>
            </div>

            {/* Latest FIR Live Stream */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold font-heading uppercase opacity-80 tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-cyan-600" /> Latest Karnataka FIRs
                </h3>
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">Live Sync</span>
              </div>

              <div className="space-y-2">
                {MOCK_FIRS.slice(0, 3).map((fir) => (
                  <div
                    key={fir.firNumber}
                    onClick={() => handleCaseClick(fir)}
                    className={`p-3 rounded-xl border transition cursor-pointer group ${
                      config.isDark
                        ? 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400 group-hover:underline">
                        {fir.firNumber}
                      </span>
                      <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full ${
                        fir.priority === 'CRITICAL' ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800' : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      }`}>
                        {fir.priority}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold mt-1 line-clamp-1">
                      {fir.crimeType}
                    </h4>
                    <p className="text-[10px] opacity-60 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 opacity-60" /> {fir.policeStation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pinned Case Watchlist */}
            <div className={`p-3.5 rounded-2xl border ${
              config.isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200/80'
            }`}>
              <h3 className="text-xs font-bold font-heading uppercase opacity-80 mb-2 flex items-center gap-1.5">
                <Pin className="w-3.5 h-3.5 text-amber-500" /> Pinned Case Watchlist
              </h3>
              <div className={`p-2.5 rounded-xl border flex items-center justify-between shadow-xs ${
                config.isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
              }`}>
                <div>
                  <div className="text-xs font-mono font-bold">FIR/IND/2026/1892</div>
                  <div className="text-[10px] opacity-60">Swarna Jewellers Gold Heist</div>
                </div>
                <span className="text-xs font-mono text-emerald-500 font-bold">₹1.8 Cr</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MOST WANTED */}
        {activeTab === 'wanted' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold font-heading uppercase opacity-80 tracking-wider flex items-center gap-1.5">
              <UserX className="w-4 h-4 text-rose-500" /> Karnataka State Most Wanted
            </h3>

            {MOCK_SUSPECTS.map((suspect) => (
              <div
                key={suspect.id}
                onClick={() => handleSuspectClick(suspect)}
                className={`p-3 rounded-2xl border transition cursor-pointer group flex items-start gap-3 ${
                  config.isDark
                    ? 'bg-slate-900/60 hover:bg-slate-800 border-slate-800'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="relative">
                  <img
                    src={suspect.photoUrl}
                    alt={suspect.fullName}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-rose-500/50"
                  />
                  <span className={`absolute -bottom-1 -right-1 px-1 py-0.2 text-[8px] font-mono font-bold rounded ${
                    suspect.status === 'WANTED' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-slate-900'
                  }`}>
                    {suspect.status}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold truncate group-hover:text-rose-500 transition">
                      {suspect.fullName}
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">
                      {suspect.rewardINR}
                    </span>
                  </div>
                  <p className="text-[10px] text-cyan-500 font-mono">
                    Alias: {suspect.alias}
                  </p>
                  <p className="text-[11px] opacity-70 mt-1 line-clamp-1">
                    {suspect.crimeSpecialization}
                  </p>
                  <p className="text-[10px] opacity-60 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 opacity-60" /> {suspect.lastKnownLocation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: HOTSPOTS */}
        {activeTab === 'hotspots' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold font-heading uppercase opacity-80 tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500" /> High Crime Density Hotspots
            </h3>

            {MOCK_HOTSPOTS.map((hotspot) => (
              <div
                key={hotspot.id}
                className={`p-3 rounded-2xl border transition ${
                  config.isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold">
                    {hotspot.areaName}
                  </h4>
                  <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full ${
                    hotspot.riskLevel === 'VERY_HIGH' 
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800' 
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                  }`}>
                    {hotspot.riskLevel}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-amber-500 font-bold mt-1">
                  District: {hotspot.district}
                </div>
                <div className="text-[11px] opacity-70 mt-0.5">
                  Dominant Crime: {hotspot.dominantCrime}
                </div>
                <div className="mt-2 text-right">
                  <span className="text-[10px] font-mono text-cyan-500 font-bold">
                    {hotspot.crimeCount} Incident Reports Logged
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: QUICK NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold font-heading uppercase opacity-80 tracking-wider flex items-center gap-1.5">
                <StickyNote className="w-4 h-4 text-emerald-500" /> Interrogation & Case Notes
              </h3>
              <span className="text-[10px] font-mono opacity-50">Auto-saved</span>
            </div>

            <textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Type case notes, witness statements, suspect leads..."
              rows={10}
              className={`w-full p-3 rounded-2xl text-xs font-mono border transition resize-none leading-relaxed ${
                config.isDark
                  ? 'bg-slate-900/80 text-slate-100 border-slate-700 focus:outline-none focus:border-emerald-500'
                  : 'bg-slate-50 text-slate-800 border-slate-200 focus:outline-none focus:bg-white focus:border-emerald-500'
              }`}
            />

            <button
              onClick={() => alert("Investigation Note added to KSP Central Case Vault!")}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition active:scale-95 cursor-pointer"
            >
              Sync Note with KSP Core Vault
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Large Screen Right Panel */}
      <aside className={`hidden xl:flex xl:w-80 2xl:w-96 border-l h-screen sticky top-0 overflow-y-auto flex-col z-20 shadow-xs transition-colors duration-300 ${
        config.isDark
          ? 'bg-[#0f172a] border-slate-800 text-slate-100'
          : 'bg-white border-slate-200/90 text-slate-900'
      }`}>
        <PanelContent isMobile={false} />
      </aside>

      {/* Mobile Right Intelligence Overlay Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 xl:hidden flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className={`relative z-10 w-80 sm:w-96 max-w-[90vw] h-full flex flex-col shadow-2xl border-l ${
                config.isDark
                  ? 'bg-[#0f172a] border-slate-800 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <PanelContent isMobile={true} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
