import React from 'react';
import { MOCK_SUSPECTS } from '../../data/mockData';
import { SuspectProfile } from '../../types';
import { UserX, ShieldAlert, Fingerprint, MapPin, ChevronRight, Award } from 'lucide-react';

interface SuspectsViewProps {
  onSelectSuspect: (suspect: SuspectProfile) => void;
}

export const SuspectsView: React.FC<SuspectsViewProps> = ({ onSelectSuspect }) => {
  return (
    <div className="space-y-5 pb-10">
      <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
            <UserX className="w-6 h-6 text-rose-600" />
            Karnataka State Suspect & Syndicate Radar
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Biometric criminal tracking, alias mapping, wanted rewards, and facial recognition scores.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-rose-100 border border-rose-200 text-xs font-mono font-bold text-rose-800">
          310 Biometric Profiles Tracked
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {MOCK_SUSPECTS.map((suspect) => (
          <div
            key={suspect.id}
            className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-rose-400 transition flex items-start gap-4 group shadow-xs hover:shadow-sm"
          >
            <div className="relative">
              <img
                src={suspect.photoUrl}
                alt={suspect.fullName}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-rose-300"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[8px] font-mono font-bold rounded bg-rose-700 text-white shadow-xs">
                {suspect.status}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-700 transition font-heading truncate">
                  {suspect.fullName}
                </h3>
                <span className="text-xs font-mono font-bold text-emerald-800 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-emerald-600" /> {suspect.rewardINR}
                </span>
              </div>

              <p className="text-xs font-mono text-cyan-800 font-bold mt-0.5">
                Alias: {suspect.alias}
              </p>

              <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                Specialization: {suspect.crimeSpecialization}
              </p>

              <div className="mt-2 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" /> {suspect.lastKnownLocation}
                </span>
                <span className="text-cyan-800 font-bold">Score: {suspect.biometricScore}%</span>
              </div>

              <button
                onClick={() => onSelectSuspect(suspect)}
                className="mt-3 w-full py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold transition border border-rose-200 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Query Suspect Network in AI</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
