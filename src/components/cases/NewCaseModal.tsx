import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FolderPlus, 
  X, 
  ShieldCheck, 
  FileText, 
  MapPin, 
  User, 
  AlertCircle, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Plus,
  RefreshCw,
  Hash
} from 'lucide-react';
import { FIRRecord, CaseStatus, PriorityLevel } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface NewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCaseCreated: (newCase: FIRRecord) => void;
}

export const NewCaseModal: React.FC<NewCaseModalProps> = ({
  isOpen,
  onClose,
  onCaseCreated
}) => {
  const { config } = useTheme();

  // Form State
  const [firNumber, setFirNumber] = useState<string>(`FIR/CCB/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`);
  const [crimeType, setCrimeType] = useState<string>('Cyber Financial Fraud');
  const [policeStation, setPoliceStation] = useState<string>('Cyber Crime PS, Bengaluru City');
  const [district, setDistrict] = useState<string>('Bengaluru Urban');
  const [priority, setPriority] = useState<PriorityLevel>('HIGH');
  const [status, setStatus] = useState<CaseStatus>('UNDER_INVESTIGATION');
  const [complainantName, setComplainantName] = useState<string>('');
  const [victimName, setVictimName] = useState<string>('');
  const [suspectsInput, setSuspectsInput] = useState<string>('');
  const [stolenValueINR, setStolenValueINR] = useState<string>('₹ 0');
  const [ipcSectionsInput, setIpcSectionsInput] = useState<string>('Section 66D IT Act, IPC 420, BNS 318');
  const [investigatingOfficer, setInvestigatingOfficer] = useState<string>('Inspector K. Vijay Kumar');
  const [locationAddress, setLocationAddress] = useState<string>('Koramangala 4th Block, Bengaluru');
  const [description, setDescription] = useState<string>('');
  const [modusOperandiTag, setModusOperandiTag] = useState<string>('Phishing Vector & Unauthorized Account Draining');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleGenerateFirNumber = () => {
    const districtsCodes: Record<string, string> = {
      'Bengaluru Urban': 'CCB',
      'Dakshina Kannada': 'MNG',
      'Mysuru': 'MYS',
      'Dharwad': 'HBL',
      'Belagavi': 'BGM',
      'Shimoga': 'SMG'
    };
    const code = districtsCodes[district] || 'KSP';
    const num = Math.floor(1000 + Math.random() * 9000);
    setFirNumber(`FIR/${code}/${new Date().getFullYear()}/${num}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firNumber.trim()) {
      setErrorMsg('FIR Number is required.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please enter a brief incident description / narrative.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const suspectsName = suspectsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const ipcSections = ipcSectionsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' IST';

    const newRecord: FIRRecord = {
      firNumber: firNumber.trim(),
      policeStation: policeStation.trim(),
      district,
      ipcSections: ipcSections.length > 0 ? ipcSections : ['IPC 420'],
      crimeType: crimeType.trim(),
      dateReported: nowStr,
      dateIncident: nowStr,
      status,
      priority,
      complainantName: complainantName.trim() || 'State Enforcement Division',
      victimName: victimName.trim() || 'Public / Citizen',
      suspectsName: suspectsName.length > 0 ? suspectsName : ['Unidentified Suspect'],
      stolenValueINR: stolenValueINR.trim() || '₹ 0',
      description: description.trim(),
      locationCoordinates: {
        lat: 12.9716,
        lng: 77.5946,
        address: locationAddress.trim() || 'Bengaluru'
      },
      investigatingOfficer: investigatingOfficer.trim() || 'Inspector K. Vijay Kumar',
      evidenceItemsCount: 3,
      modusOperandiTag: modusOperandiTag.trim() || 'Standard Pattern'
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onCaseCreated(newRecord);
      onClose();
    }, 600);
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
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
            <FolderPlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-heading">Register New Case FIR</h2>
            <p className="text-xs opacity-70">
              File official crime incident record into Karnataka Police Central Database.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: FIR Number & Police Station */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase opacity-80 mb-1">
                FIR Number:
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={firNumber}
                  onChange={(e) => setFirNumber(e.target.value)}
                  className={`w-full pl-3 pr-9 py-2.5 rounded-xl font-mono text-xs font-bold border transition ${
                    config.isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                  }`}
                  placeholder="FIR/CCB/2026/2401"
                  required
                />
                <button
                  type="button"
                  onClick={handleGenerateFirNumber}
                  title="Generate New FIR Number"
                  className="absolute right-2 p-1.5 text-cyan-500 hover:bg-cyan-500/10 rounded-lg cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase opacity-80 mb-1">
                Crime Category / Offense:
              </label>
              <input
                type="text"
                value={crimeType}
                onChange={(e) => setCrimeType(e.target.value)}
                placeholder="e.g. Cyber Financial Fraud, Armed Robbery"
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium border transition ${
                  config.isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
                required
              />
            </div>
          </div>

          {/* Row 2: District & Police Station */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase opacity-80 mb-1">
                District Jurisdiction:
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium border transition ${
                  config.isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="Bengaluru Urban">Bengaluru Urban</option>
                <option value="Dakshina Kannada">Dakshina Kannada (Mangaluru)</option>
                <option value="Mysuru">Mysuru</option>
                <option value="Dharwad">Dharwad (Hubballi)</option>
                <option value="Belagavi">Belagavi</option>
                <option value="Shimoga">Shimoga</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase opacity-80 mb-1">
                Police Station Name:
              </label>
              <input
                type="text"
                value={policeStation}
                onChange={(e) => setPoliceStation(e.target.value)}
                placeholder="Cyber Crime PS, Bengaluru City"
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium border transition ${
                  config.isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
                required
              />
            </div>
          </div>

          {/* Row 3: Priority & Case Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase opacity-80 mb-1">
                Priority Level:
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium border transition ${
                  config.isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="CRITICAL">🔴 CRITICAL</option>
                <option value="HIGH">🟠 HIGH</option>
                <option value="MEDIUM">🟡 MEDIUM</option>
                <option value="LOW">🔵 LOW</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase opacity-80 mb-1">
                Case Status:
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CaseStatus)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium border transition ${
                  config.isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-300'
                }`}
              >
                <option value="UNDER_INVESTIGATION">UNDER INVESTIGATION</option>
                <option value="SUSPECT_DETAINED">SUSPECT DETAINED</option>
                <option value="CHARGE_SHEET_FILED">CHARGE SHEET FILED</option>
                <option value="CLOSED_SOLVED">CLOSED / SOLVED</option>
                <option value="COLD_CASE">COLD CASE</option>
              </select>
            </div>
          </div>

          {/* Row 4: Complainant & Suspects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase opacity-80 mb-1">
                Complainant / Organization:
              </label>
              <input
                type="text"
                value={complainantName}
                onChange={(e) => setComplainantName(e.target.value)}
                placeholder="e.g. HDFC Bank Cyber Fraud Cell"
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium border transition ${
                  config.isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase opacity-80 mb-1">
                Suspect Name(s) (Comma separated):
              </label>
              <input
                type="text"
                value={suspectsInput}
                onChange={(e) => setSuspectsInput(e.target.value)}
                placeholder="e.g. Arjun Varma, Unknown Alias"
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium border transition ${
                  config.isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          {/* Row 5: Financial Valuation & IPC Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase opacity-80 mb-1">
                Stolen Value / Loss (INR):
              </label>
              <input
                type="text"
                value={stolenValueINR}
                onChange={(e) => setStolenValueINR(e.target.value)}
                placeholder="e.g. ₹ 45,00,000"
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-mono font-bold border transition ${
                  config.isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase opacity-80 mb-1">
                IPC / IT Act Sections:
              </label>
              <input
                type="text"
                value={ipcSectionsInput}
                onChange={(e) => setIpcSectionsInput(e.target.value)}
                placeholder="Section 66D IT Act, IPC 420"
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-mono font-bold border transition ${
                  config.isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          {/* Row 6: Investigating Officer & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase opacity-80 mb-1">
                Investigating Officer:
              </label>
              <input
                type="text"
                value={investigatingOfficer}
                onChange={(e) => setInvestigatingOfficer(e.target.value)}
                placeholder="Inspector K. Vijay Kumar"
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium border transition ${
                  config.isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase opacity-80 mb-1">
                Modus Operandi Tag:
              </label>
              <input
                type="text"
                value={modusOperandiTag}
                onChange={(e) => setModusOperandiTag(e.target.value)}
                placeholder="e.g. Thermal Torch Cutting / API Token Hijack"
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium border transition ${
                  config.isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          {/* Description Narrative Area */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase opacity-80 mb-1">
              Case Incident Narrative / Description:
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the incident narrative, timeline of event, modus operandi, and initial evidence seized..."
              className={`w-full p-3 rounded-xl text-xs font-medium border transition ${
                config.isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
              }`}
              required
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-xs font-semibold bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-600/25 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving to Database...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Store Case in Database</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
