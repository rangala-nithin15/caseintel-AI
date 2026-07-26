import React, { useState, useEffect } from 'react';
import { FIRRecord } from '../../types';
import { casesService } from '../../services/casesService';
import { 
  FolderGit2, 
  ChevronRight, 
  FolderPlus, 
  Sparkles, 
  Search, 
  MapPin, 
  RefreshCw,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { NewCaseModal } from '../cases/NewCaseModal';
import { CaseSummaryModal } from '../cases/CaseSummaryModal';
import { useTheme } from '../../context/ThemeContext';

interface ActiveCasesViewProps {
  onSelectCase: (fir: FIRRecord) => void;
  onAskAi?: (query: string) => void;
}

export const ActiveCasesView: React.FC<ActiveCasesViewProps> = ({ onSelectCase, onAskAi }) => {
  const { config } = useTheme();
  const [cases, setCases] = useState<FIRRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [summarizeFir, setSummarizeFir] = useState<FIRRecord | null>(null);

  const loadCases = async () => {
    setIsLoading(true);
    try {
      const data = await casesService.getCases(searchTerm);
      setCases(data);
    } catch (e) {
      console.error('Failed to load active cases:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCases();
  }, [searchTerm]);

  const handleCaseCreated = async (newCase: FIRRecord) => {
    await casesService.addCase(newCase);
    await loadCases();
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition ${
        config.isDark ? 'bg-[#0f172a]/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div>
          <h2 className="text-xl font-bold font-heading flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-cyan-500" />
            Active Investigation Case Vault
          </h2>
          <p className="text-xs opacity-70 mt-1">
            Track ongoing FIR records, custody chains, and real-time database case submissions.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-md transition flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <FolderPlus className="w-4 h-4" />
          <span>+ File New Case FIR</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className={`p-4 rounded-2xl border flex items-center gap-3 shadow-xs transition ${
        config.isDark ? 'bg-[#0f172a]/80 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search active cases by FIR Number, Station, Crime Type, Suspect Name..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border transition focus:outline-none focus:border-cyan-500 ${
              config.isDark ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

        <button
          onClick={loadCases}
          title="Refresh List"
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cyan-500' : ''}`} />
        </button>
      </div>

      {/* Case Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-3 text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin text-cyan-500" />
          <p className="text-xs font-mono font-semibold">Loading Active Investigation Records...</p>
        </div>
      ) : cases.length === 0 ? (
        <div className={`p-10 rounded-2xl border text-center space-y-3 transition ${
          config.isDark ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
        }`}>
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-sm font-bold">No Active Cases Found</h3>
          <p className="text-xs max-w-md mx-auto">
            No active cases match your search. Click below to add a new case to the database.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white transition cursor-pointer"
          >
            + File New Case FIR
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cases.map((fir) => (
            <div
              key={fir.firNumber}
              className={`p-5 rounded-2xl border transition flex flex-col justify-between shadow-xs hover:shadow-md ${
                config.isDark
                  ? 'bg-[#0f172a]/90 border-slate-800 hover:border-cyan-500/50 text-slate-100'
                  : 'bg-white border-slate-200 hover:border-cyan-400 text-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {fir.firNumber}
                  </span>
                  <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full ${
                    fir.priority === 'CRITICAL' 
                      ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' 
                      : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  }`}>
                    {fir.priority}
                  </span>
                </div>

                <h3 className="text-sm font-bold mt-2 font-heading">{fir.crimeType}</h3>
                <p className="text-xs opacity-80 mt-1 line-clamp-2 leading-relaxed">{fir.description}</p>

                <div className="mt-3 grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-mono">
                  <div><span className="opacity-60">Officer:</span> <span className="font-semibold">{fir.investigatingOfficer}</span></div>
                  <div><span className="opacity-60">Evidence:</span> <span className="text-cyan-500 font-bold">{fir.evidenceItemsCount} Files</span></div>
                  <div className="col-span-2"><span className="opacity-60">Station:</span> <span>{fir.policeStation}</span></div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={() => setSummarizeFir(fir)}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 text-cyan-700 dark:text-cyan-300 font-bold text-xs border border-cyan-500/30 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  <span>AI Brief Summary</span>
                </button>

                <button
                  onClick={() => onSelectCase(fir)}
                  className="flex-1 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Launch Brief</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Case Entry Modal */}
      <NewCaseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCaseCreated={handleCaseCreated}
      />

      {/* Case AI Summary Modal */}
      <CaseSummaryModal
        fir={summarizeFir}
        onClose={() => setSummarizeFir(null)}
        onAskAi={onAskAi}
      />
    </div>
  );
};
