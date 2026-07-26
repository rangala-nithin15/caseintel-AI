import React, { useState } from 'react';
import { Search, Fingerprint, Camera, ShieldCheck, Cpu, Sparkles, CheckCircle2, AlertTriangle, UserX } from 'lucide-react';
import { MOCK_SUSPECTS } from '../../data/mockData';

export const EvidenceSearchView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fingerprint' | 'facial' | 'ballistics'>('fingerprint');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [matchResult, setMatchResult] = useState<boolean>(false);

  const handleRunScan = () => {
    setIsScanning(true);
    setMatchResult(false);
    setTimeout(() => {
      setIsScanning(false);
      setMatchResult(true);
    }, 1500);
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Header */}
      <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-600" />
            Biometric & Evidence Intelligence Workbench
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Run automated AI biometric matching against Karnataka State Police FSL archives & Interpol criminal databases.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-cyan-100 border border-cyan-200 text-xs font-mono font-bold text-cyan-800">
          Biometric Engine: Active
        </div>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => { setActiveTab('fingerprint'); setMatchResult(false); }}
          className={`p-4 rounded-2xl bg-white border transition text-left flex items-center gap-3 cursor-pointer ${
            activeTab === 'fingerprint' ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <Fingerprint className="w-6 h-6 text-cyan-600" />
          <div>
            <h4 className="text-xs font-bold text-slate-900 font-heading">Fingerprint Hash Match</h4>
            <span className="text-[10px] font-mono text-slate-500">Latent ridge analysis</span>
          </div>
        </button>

        <button
          onClick={() => { setActiveTab('facial'); setMatchResult(false); }}
          className={`p-4 rounded-2xl bg-white border transition text-left flex items-center gap-3 cursor-pointer ${
            activeTab === 'facial' ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <Camera className="w-6 h-6 text-purple-600" />
          <div>
            <h4 className="text-xs font-bold text-slate-900 font-heading">CCTV Facial Recognition</h4>
            <span className="text-[10px] font-mono text-slate-500">ANPR toll camera feed</span>
          </div>
        </button>

        <button
          onClick={() => { setActiveTab('ballistics'); setMatchResult(false); }}
          className={`p-4 rounded-2xl bg-white border transition text-left flex items-center gap-3 cursor-pointer ${
            activeTab === 'ballistics' ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <ShieldCheck className="w-6 h-6 text-amber-600" />
          <div>
            <h4 className="text-xs font-bold text-slate-900 font-heading">Ballistics Rifling Match</h4>
            <span className="text-[10px] font-mono text-slate-500">7.65mm / 9mm cartridges</span>
          </div>
        </button>
      </div>

      {/* Interactive Scanner Box */}
      <div className="p-8 rounded-3xl border border-slate-200 bg-white shadow-xs text-center space-y-4">
        <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-cyan-50 border border-cyan-200 text-cyan-700">
          <Fingerprint className={`w-12 h-12 ${isScanning ? 'animate-pulse text-cyan-600' : ''}`} />
          {isScanning && (
            <span className="absolute inset-0 rounded-3xl border-2 border-cyan-500 animate-ping" />
          )}
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 font-heading">
            {isScanning ? "Scanning KSP Central Biometric Archives..." : "Ready to Cross-Match Evidence"}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Upload or select an evidence specimen from active case files to verify biometric identity against 310 tracked suspects.
          </p>
        </div>

        <button
          onClick={handleRunScan}
          disabled={isScanning}
          className="px-6 py-3 rounded-2xl text-xs font-bold bg-cyan-700 hover:bg-cyan-800 text-white shadow-xs transition active:scale-95 cursor-pointer"
        >
          {isScanning ? "Analyzing..." : "Run AI Biometric Specimen Correlation"}
        </button>

        {/* Match Output */}
        {matchResult && (
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-emerald-300 text-left max-w-lg mx-auto space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> HIGH CONFIDENCE BIOMETRIC HIT (98.6%)
              </span>
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded bg-rose-100 text-rose-800">
                CRITICAL
              </span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <img
                src={MOCK_SUSPECTS[0].photoUrl}
                alt="Suspect"
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-rose-500"
              />
              <div className="text-xs">
                <h4 className="font-bold text-slate-900">{MOCK_SUSPECTS[0].fullName}</h4>
                <p className="font-mono text-cyan-800 font-bold text-[10px]">Fingerprint ID: {MOCK_SUSPECTS[0].fingerprintId}</p>
                <p className="text-slate-600 text-[10px]">Status: {MOCK_SUSPECTS[0].status} • Reward: {MOCK_SUSPECTS[0].rewardINR}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
