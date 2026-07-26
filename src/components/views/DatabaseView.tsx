import React, { useState, useEffect } from 'react';
import { FIRRecord } from '../../types';
import { casesService } from '../../services/casesService';
import { 
  Search, 
  Filter, 
  MapPin, 
  FileText, 
  Calendar, 
  ShieldCheck, 
  ChevronRight, 
  X, 
  FolderPlus, 
  Sparkles, 
  Trash2, 
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { NewCaseModal } from '../cases/NewCaseModal';
import { CaseSummaryModal } from '../cases/CaseSummaryModal';
import { useTheme } from '../../context/ThemeContext';

interface DatabaseViewProps {
  onSelectCase: (fir: FIRRecord) => void;
  onAskAi?: (query: string) => void;
}

export const DatabaseView: React.FC<DatabaseViewProps> = ({ onSelectCase, onAskAi }) => {
  const { config } = useTheme();
  const [cases, setCases] = useState<FIRRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [summarizeFir, setSummarizeFir] = useState<FIRRecord | null>(null);
  const [activeDetailFir, setActiveDetailFir] = useState<FIRRecord | null>(null);
  const [deletingFir, setDeletingFir] = useState<string | null>(null);

  const districts = ['ALL', 'Bengaluru Urban', 'Dakshina Kannada', 'Mysuru', 'Dharwad', 'Belagavi'];
  const statuses = ['ALL', 'UNDER_INVESTIGATION', 'SUSPECT_DETAINED', 'CHARGE_SHEET_FILED', 'CLOSED_SOLVED', 'COLD_CASE'];

  const loadCases = async () => {
    setIsLoading(true);
    try {
      const data = await casesService.getCases(searchTerm, selectedDistrict, selectedStatus);
      setCases(data);
    } catch (e) {
      console.error('Failed to load cases:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCases();
  }, [searchTerm, selectedDistrict, selectedStatus]);

  const handleCaseCreated = async (newCase: FIRRecord) => {
    await casesService.addCase(newCase);
    await loadCases();
  };

  const handleDeleteCase = async (firNumber: string) => {
    setDeletingFir(firNumber);
    await casesService.deleteCase(firNumber);
    setDeletingFir(null);
    await loadCases();
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Top Banner */}
      <div className={`p-6 rounded-3xl border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition ${
        config.isDark ? 'bg-[#0f172a]/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div>
          <h2 className="text-xl font-bold font-heading flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-500" />
            Karnataka Central Crime Database Repository
          </h2>
          <p className="text-xs opacity-70 mt-1">
            Access synchronized FIR records, IPC/BNS section indexing, witness logs, and live crime database.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>KSP Core DB Sync: 100%</span>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <FolderPlus className="w-4 h-4" />
            <span>+ Add Case to Database</span>
          </button>
        </div>
      </div>

      {/* Filter Controls & Search Bar */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row gap-3 shadow-xs transition ${
        config.isDark ? 'bg-[#0f172a]/80 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by FIR Number, Station, Crime Category, Suspect Name, or Narrative..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border transition focus:outline-none focus:border-cyan-500 ${
              config.isDark ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition focus:outline-none focus:border-cyan-500 ${
              config.isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            {districts.map((d) => (
              <option key={d} value={d}>District: {d}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition focus:outline-none focus:border-cyan-500 ${
              config.isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>Status: {s.replace('_', ' ')}</option>
            ))}
          </select>

          <button
            onClick={loadCases}
            title="Refresh Database"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cyan-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Cases Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-3 text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin text-cyan-500" />
          <p className="text-xs font-mono font-semibold">Querying Central Police Database...</p>
        </div>
      ) : cases.length === 0 ? (
        <div className={`p-10 rounded-2xl border text-center space-y-3 transition ${
          config.isDark ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
        }`}>
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-sm font-bold">No Case Records Found</h3>
          <p className="text-xs max-w-md mx-auto">
            No FIR records matched your search query. Try broadening your keywords or add a new case to the database.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white transition cursor-pointer"
          >
            + Add New Case
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((fir) => (
            <div
              key={fir.firNumber}
              className={`p-5 rounded-2xl border transition duration-200 flex flex-col justify-between group shadow-xs hover:shadow-md ${
                config.isDark
                  ? 'bg-[#0f172a]/90 border-slate-800 hover:border-cyan-500/50 text-slate-100'
                  : 'bg-white border-slate-200 hover:border-cyan-400 text-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 group-hover:underline">
                    {fir.firNumber}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full ${
                      fir.priority === 'CRITICAL' 
                        ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' 
                        : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>
                      {fir.priority}
                    </span>

                    <button
                      onClick={() => handleDeleteCase(fir.firNumber)}
                      disabled={deletingFir === fir.firNumber}
                      title="Delete Case from Database"
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold mt-2 font-heading">
                  {fir.crimeType}
                </h3>

                <div className="text-[11px] opacity-70 mt-1 flex items-center gap-1 font-mono">
                  <MapPin className="w-3 h-3 text-cyan-500" /> {fir.policeStation}
                </div>

                <p className="text-xs opacity-80 mt-2 line-clamp-3 leading-relaxed">
                  {fir.description}
                </p>

                {/* IPC Badges */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {fir.ipcSections?.map((sec, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-0.5 text-[9px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {sec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => setSummarizeFir(fir)}
                  className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-500/30 transition flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  <span>AI Summary</span>
                </button>

                <button
                  onClick={() => setActiveDetailFir(fir)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold transition border border-slate-200 dark:border-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Full Record</span>
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

      {/* Case Summary Modal */}
      <CaseSummaryModal
        fir={summarizeFir}
        onClose={() => setSummarizeFir(null)}
        onAskAi={onAskAi}
      />

      {/* Full FIR Details Modal */}
      {activeDetailFir && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className={`w-full max-w-2xl rounded-3xl p-6 border shadow-2xl relative max-h-[90vh] overflow-y-auto ${
            config.isDark ? 'bg-[#0f172a] border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => setActiveDetailFir(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  {activeDetailFir.firNumber}
                </span>
                <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-rose-500/10 text-rose-500">
                  {activeDetailFir.priority} Priority
                </span>
              </div>

              <h2 className="text-lg font-bold font-heading">
                {activeDetailFir.crimeType}
              </h2>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
                <div><span className="opacity-60">Police Station:</span> <span className="font-bold text-cyan-600 dark:text-cyan-400">{activeDetailFir.policeStation}</span></div>
                <div><span className="opacity-60">District:</span> <span className="font-bold text-cyan-600 dark:text-cyan-400">{activeDetailFir.district}</span></div>
                <div><span className="opacity-60">Reported Date:</span> <span>{activeDetailFir.dateReported}</span></div>
                <div><span className="opacity-60">Officer:</span> <span>{activeDetailFir.investigatingOfficer}</span></div>
                <div><span className="opacity-60">Complainant:</span> <span>{activeDetailFir.complainantName}</span></div>
                <div><span className="opacity-60">Suspects:</span> <span>{activeDetailFir.suspectsName?.join(', ')}</span></div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase font-mono opacity-60 mb-1">
                  Crime Description & Narrative:
                </h4>
                <p className="text-xs leading-relaxed p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  {activeDetailFir.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-800 dark:text-cyan-300">
                <span className="font-bold">MO Tag:</span> {activeDetailFir.modusOperandiTag}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    setSummarizeFir(activeDetailFir);
                    setActiveDetailFir(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate AI Summary</span>
                </button>

                <button
                  onClick={() => setActiveDetailFir(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
