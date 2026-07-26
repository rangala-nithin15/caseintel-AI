import React, { useState } from 'react';
import { Settings, ShieldCheck, Key, Lock, Bell, Database, Radio, Check, Server, Palette, Sparkles, Eye } from 'lucide-react';
import { CURRENT_OFFICER } from '../../data/mockData';
import { useTheme, THEME_CONFIGS } from '../../context/ThemeContext';

export const SettingsView: React.FC = () => {
  const { theme, setTheme, config } = useTheme();
  const [saved, setSaved] = useState<boolean>(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div className={`p-6 rounded-3xl border shadow-xs flex items-center justify-between transition ${
        config.isDark ? 'bg-[#121827] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div>
          <h2 className="text-xl font-bold font-heading flex items-center gap-2">
            <Settings className="w-6 h-6 text-cyan-600" />
            CaseIntel AI System Settings
          </h2>
          <p className="text-xs opacity-70 mt-1">
            Configure Karnataka State Police Intranet node, UI theme preferences, Gemini AI model parameters, and AES-256 encryption keys.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> SECURED
        </div>
      </div>

      {/* Settings Options */}
      <div className="space-y-5">
        {/* Visual Theme Selection Section */}
        <div className={`p-6 rounded-3xl border shadow-xs space-y-4 transition ${
          config.isDark ? 'bg-[#121827] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold font-heading flex items-center gap-2">
                <Palette className="w-5 h-5 text-cyan-600" /> UI Visual Themes & Effects
              </h3>
              <p className="text-xs opacity-60 mt-0.5">
                Select your preferred interface style including iOS Liquid Glass, Light, or High-Tech Dark Obsidian.
              </p>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg bg-cyan-600/10 text-cyan-600 border border-cyan-500/20">
              Active: {config.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {Object.values(THEME_CONFIGS).map((t) => (
              <div
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-2xl border transition cursor-pointer relative overflow-hidden group ${
                  theme === t.id
                    ? config.isDark
                      ? 'bg-cyan-950/60 border-cyan-500 shadow-md shadow-cyan-500/10 ring-2 ring-cyan-500/30'
                      : 'bg-cyan-50/80 border-cyan-500 shadow-md shadow-cyan-500/10 ring-2 ring-cyan-500/30'
                    : config.isDark
                      ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                {theme === t.id && (
                  <div className="absolute top-3 right-3 p-1 rounded-full bg-cyan-600 text-white">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold font-heading">{t.name}</span>
                  <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-slate-200/60 dark:bg-slate-800 opacity-80">
                    {t.isDark ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </div>

                <p className="text-xs opacity-70 line-clamp-2 leading-relaxed">
                  {t.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-200/20 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-cyan-600 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {t.badgeTag}
                  </span>
                  <span className="text-xs font-semibold group-hover:underline">
                    {theme === t.id ? 'Selected' : 'Apply Theme →'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Officer Credentials */}
        <div className={`p-5 rounded-2xl border shadow-xs space-y-3 transition ${
          config.isDark ? 'bg-[#121827] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <h3 className="text-sm font-bold font-heading flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-600" /> KSP Active Officer Credentials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div><span className="opacity-60">Name:</span> <span className="font-bold">{CURRENT_OFFICER.name}</span></div>
            <div><span className="opacity-60">Badge ID:</span> <span className="text-cyan-600 font-bold">{CURRENT_OFFICER.badgeId}</span></div>
            <div><span className="opacity-60">Rank:</span> <span className="font-bold">{CURRENT_OFFICER.rank}</span></div>
            <div><span className="opacity-60">Station HQ:</span> <span className="font-bold">{CURRENT_OFFICER.station}</span></div>
          </div>
        </div>

        {/* AI Model Configuration */}
        <div className={`p-5 rounded-2xl border shadow-xs space-y-3 transition ${
          config.isDark ? 'bg-[#121827] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <h3 className="text-sm font-bold font-heading flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-600" /> Server-Side AI Intelligence Model
          </h3>
          <div className={`p-3 rounded-xl border text-xs space-y-2 ${
            config.isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-mono opacity-70">Selected Model:</span>
              <span className="px-2 py-0.5 font-mono text-[10px] font-bold rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                gemini-2.5-flash
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono opacity-70">Grounding Engine:</span>
              <span className="font-mono text-emerald-600 font-bold">Karnataka Police FIR Central Database</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono opacity-70">API Key Status:</span>
              <span className="font-mono text-cyan-600 font-bold">Configured via Server Environment</span>
            </div>
          </div>
        </div>

        {/* Save Controls */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white transition flex items-center gap-2 shadow-xs cursor-pointer"
          >
            {saved ? <Check className="w-4 h-4" /> : null}
            <span>{saved ? "Settings Saved" : "Save System Configuration"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

