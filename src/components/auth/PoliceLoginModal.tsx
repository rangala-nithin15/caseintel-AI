import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  UserCheck, 
  Fingerprint, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  Sparkles,
  ArrowRight,
  RefreshCw,
  SlidersHorizontal,
  FolderPlus
} from 'lucide-react';
import { PoliceOfficer } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import policeLogo from '../../assets/logo.jpg';

interface PoliceLoginModalProps {
  onLoginSuccess: (officer: PoliceOfficer, startFresh: boolean) => void;
}

const PRESET_OFFICERS: PoliceOfficer[] = [
  {
    badgeId: "KSP-IPS-2026-884",
    name: "Inspector K. Vijay Kumar",
    rank: "Circle Inspector",
    unit: "Central Crime Branch (CCB) - Cyber & Organized Crime",
    station: "CCB Headquarters, Nrupatunga Road",
    district: "Bengaluru City",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    casesLed: 142,
    clearanceRate: "89.4%"
  },
  {
    badgeId: "KSP-PSI-2025-412",
    name: "Sub-Inspector M. Ramesh",
    rank: "Police Sub-Inspector",
    unit: "Law & Order Division",
    station: "Indiranagar PS, Bengaluru",
    district: "Bengaluru Urban",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    casesLed: 78,
    clearanceRate: "92.1%"
  },
  {
    badgeId: "KSP-ACP-2024-109",
    name: "ACP B. Suresh Nayak",
    rank: "Assistant Commissioner of Police",
    unit: "Maritime & Coastal Security Wing",
    station: "Panambur Coastal PS, Mangaluru",
    district: "Dakshina Kannada",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    casesLed: 215,
    clearanceRate: "94.8%"
  }
];

export const PoliceLoginModal: React.FC<PoliceLoginModalProps> = ({ onLoginSuccess }) => {
  const { config } = useTheme();
  const [selectedOfficer, setSelectedOfficer] = useState<PoliceOfficer>(PRESET_OFFICERS[0]);
  const [badgeIdInput, setBadgeIdInput] = useState<string>(PRESET_OFFICERS[0].badgeId);
  const [pinInput, setPinInput] = useState<string>('8840');
  const [customName, setCustomName] = useState<string>('');
  const [stationName, setStationName] = useState<string>('Central Police Station');
  const [loginMode, setLoginMode] = useState<'preset' | 'custom'>('preset');
  const [startFresh, setStartFresh] = useState<boolean>(false);

  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isScanningFingerprint, setIsScanningFingerprint] = useState<boolean>(false);
  const [verificationStep, setVerificationStep] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleOfficerSelect = (officer: PoliceOfficer) => {
    setSelectedOfficer(officer);
    setBadgeIdInput(officer.badgeId);
    setErrorMsg('');
  };

  const handleFingerprintScan = () => {
    setIsScanningFingerprint(true);
    setErrorMsg('');
    setTimeout(() => {
      setIsScanningFingerprint(false);
      triggerLoginSequence();
    }, 1600);
  };

  const triggerLoginSequence = () => {
    if (!badgeIdInput.trim()) {
      setErrorMsg('Please enter a valid Police Officer Badge ID.');
      return;
    }
    if (pinInput.length < 4) {
      setErrorMsg('4-Digit Security PIN code is required.');
      return;
    }

    setIsVerifying(true);
    setVerificationStep('Connecting to Karnataka Police Intranet Gateway...');

    setTimeout(() => {
      setVerificationStep('Authenticating Badge Credentials & RSA Cryptographic Token...');
    }, 700);

    setTimeout(() => {
      setVerificationStep('Biometric Hash Matched • Initializing Secure Case Vault...');
    }, 1400);

    setTimeout(() => {
      setIsVerifying(false);

      const finalOfficer: PoliceOfficer = loginMode === 'custom' ? {
        badgeId: badgeIdInput,
        name: customName.trim() || 'Officer ' + badgeIdInput.slice(-4),
        rank: 'Inspector',
        unit: 'Karnataka State Police Intelligence Unit',
        station: stationName,
        district: 'Bengaluru Urban',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        casesLed: 12,
        clearanceRate: '100%'
      } : selectedOfficer;

      onLoginSuccess(finalOfficer, startFresh);
    }, 2100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl overflow-y-auto">
      {/* Visual Glassmorphic Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl glass-card border border-white/20 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden my-auto"
      >
        {/* Ambient Top Light Beam */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />

        {/* Top KSP Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 via-cyan-600 to-blue-700 p-1 shadow-xl shadow-cyan-500/20">
            <div className="w-full h-full rounded-[12px] bg-slate-950 p-1 flex items-center justify-center overflow-hidden">
              <img 
                src={policeLogo} 
                alt="Karnataka State Police Emblem" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5" /> KARNATAKA STATE POLICE PORTAL
          </div>
          <h1 className="text-2xl font-bold font-heading tracking-tight">
            CaseIntel Secure Officer Portal
          </h1>
          <p className="text-xs opacity-70 mt-1 max-w-md">
            Restricted Access. Authorized Law Enforcement Personnel Only. Synchronized with KSP Central Case Vault.
          </p>
        </div>

        {/* Login Mode Tabs */}
        <div className="flex p-1 rounded-2xl bg-slate-200/60 dark:bg-slate-900/80 mb-6 border border-slate-300/50 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setLoginMode('preset')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
              loginMode === 'preset'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <UserCheck className="w-4 h-4" /> Select On-Duty Officer
          </button>
          <button
            type="button"
            onClick={() => setLoginMode('custom')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
              loginMode === 'custom'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Building2 className="w-4 h-4" /> Custom Officer Credentials
          </button>
        </div>

        {/* Content Body */}
        {loginMode === 'preset' ? (
          <div className="space-y-3 mb-6">
            <label className="block text-xs font-mono font-bold uppercase opacity-80 mb-1">
              Active KSP Officer Profiles:
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {PRESET_OFFICERS.map((officer) => {
                const isSelected = selectedOfficer.badgeId === officer.badgeId;
                return (
                  <div
                    key={officer.badgeId}
                    onClick={() => handleOfficerSelect(officer)}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center gap-3 relative overflow-hidden ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-500 ring-2 ring-cyan-500/30'
                        : 'bg-slate-100/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                    }`}
                  >
                    <img
                      src={officer.avatarUrl}
                      alt={officer.name}
                      className="w-11 h-11 rounded-xl object-cover ring-2 ring-cyan-500/40"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold font-heading truncate">
                          {officer.name}
                        </h4>
                        <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                          {officer.badgeId}
                        </span>
                      </div>
                      <p className="text-[11px] opacity-70 truncate mt-0.5">
                        {officer.rank} • {officer.unit}
                      </p>
                      <p className="text-[10px] opacity-50 truncate mt-0.5 font-mono">
                        {officer.station}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            <div>
              <label className="block text-xs font-mono font-bold uppercase opacity-80 mb-1">
                Officer Full Name:
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Inspector R. Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase opacity-80 mb-1">
                Police Station / Unit HQ:
              </label>
              <input
                type="text"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                placeholder="e.g. Central Crime Branch (CCB), Bengaluru"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>
          </div>
        )}

        {/* Credentials Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div>
            <label className="block text-xs font-mono font-bold uppercase opacity-80 mb-1">
              Badge ID:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 opacity-50" />
              <input
                type="text"
                value={badgeIdInput}
                onChange={(e) => setBadgeIdInput(e.target.value)}
                placeholder="KSP-IPS-2026-884"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase opacity-80 mb-1">
              4-Digit PIN Code:
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-3 opacity-50" />
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs font-mono font-bold tracking-widest"
              />
            </div>
          </div>
        </div>

        {/* Start Fresh Workspace Option */}
        <div className="p-3 rounded-2xl bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <FolderPlus className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold block">Start with Fresh Workspace</span>
              <span className="text-[10px] opacity-60 block">Create clean investigation workspace (no pre-loaded cases)</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={startFresh}
            onChange={(e) => setStartFresh(e.target.checked)}
            className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500 cursor-pointer"
          />
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Verification Loading Screen */}
        <AnimatePresence>
          {isVerifying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-2xl bg-cyan-950/90 text-cyan-100 border border-cyan-500/40 my-4 text-center space-y-3"
            >
              <div className="flex justify-center">
                <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
              </div>
              <p className="text-xs font-mono font-bold text-cyan-300">
                {verificationStep}
              </p>
              <div className="w-full h-1.5 rounded-full bg-cyan-900 overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleFingerprintScan}
            disabled={isVerifying || isScanningFingerprint}
            className={`py-3 px-4 rounded-2xl text-xs font-bold border transition flex items-center justify-center gap-2 cursor-pointer ${
              isScanningFingerprint
                ? 'bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-500/50'
                : 'bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            <Fingerprint className={`w-4 h-4 text-emerald-500 ${isScanningFingerprint ? 'animate-pulse' : ''}`} />
            <span>{isScanningFingerprint ? 'Scanning Biometrics...' : 'Biometric Thumb Scan'}</span>
          </button>

          <button
            type="button"
            onClick={triggerLoginSequence}
            disabled={isVerifying || isScanningFingerprint}
            className="py-3 px-4 rounded-2xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-600/25 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Authorize Officer Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
