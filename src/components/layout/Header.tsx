import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Clock, 
  PlusCircle, 
  FileUp, 
  Mic, 
  Sparkles, 
  ShieldCheck, 
  X, 
  AlertTriangle, 
  ExternalLink,
  ChevronRight,
  Palette,
  Check,
  Menu,
  SlidersHorizontal,
  Zap
} from 'lucide-react';
import { CURRENT_OFFICER, MOCK_SMART_ALERTS } from '../../data/mockData';
import { SmartAlert } from '../../types';
import { useTheme, THEME_CONFIGS } from '../../context/ThemeContext';
import policeLogo from '../../assets/logo.jpg';

interface HeaderProps {
  onOpenVoiceInput: () => void;
  onOpenUploader: () => void;
  onOpenNewReport: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onOpenMobileMenu?: () => void;
  onOpenMobileRightPanel?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenVoiceInput,
  onOpenUploader,
  onOpenNewReport,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onOpenMobileMenu,
  onOpenMobileRightPanel
}) => {
  const { theme, setTheme, config } = useTheme();
  const [timeStr, setTimeStr] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showThemeMenu, setShowThemeMenu] = useState<boolean>(false);
  const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<SmartAlert[]>(MOCK_SMART_ALERTS);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      const dateFormatted = now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      setTimeStr(`${dateFormatted} | ${formatted} IST`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    onSearchSubmit(e);
    setShowMobileSearch(false);
  };

  return (
    <header className={`sticky top-0 z-20 h-16 px-3 sm:px-6 flex items-center justify-between transition-colors duration-300 ${
      config.isDark 
        ? 'bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md' 
        : 'bg-white/90 backdrop-blur-md border-b border-slate-200/90 text-slate-900 shadow-xs'
    }`}>
      {/* Left: Mobile Menu Trigger + Officer Branding */}
      <div className="flex items-center gap-2.5 min-w-0">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 md:hidden transition cursor-pointer"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Small Emblem Badge */}
        <div className="w-9 h-9 rounded-xl p-0.5 bg-gradient-to-br from-amber-500/80 to-cyan-600 shadow-xs shrink-0 flex items-center justify-center overflow-hidden bg-slate-900">
          <img 
            src={policeLogo} 
            alt="Karnataka Police Emblem" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 truncate">
            <h2 className="text-sm sm:text-base font-bold font-heading truncate">
              Jai Hind, <span className="text-cyan-600 font-bold">{CURRENT_OFFICER.name.split(' ')[0]}</span>
            </h2>
            <span className={`hidden sm:flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-md border shrink-0 ${
              config.isDark
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              <ShieldCheck className="w-3 h-3 text-emerald-500" /> SECURED
            </span>
          </div>
          <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs font-mono truncate ${config.isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <Clock className="w-3 h-3 text-cyan-600 shrink-0" />
            <span className="truncate hidden sm:inline">{timeStr || '25 Jul 2026 | IST'}</span>
            <span className="truncate sm:hidden">{timeStr.split('|')[1] || 'IST'}</span>
            <span className="opacity-40">•</span>
            <span className="text-cyan-600 font-semibold truncate">{CURRENT_OFFICER.station.split(',')[0]}</span>
          </div>
        </div>
      </div>

      {/* Center Search Bar (Desktop) */}
      <div className="flex-1 max-w-xl mx-4 lg:mx-6 hidden md:block">
        <form onSubmit={onSearchSubmit} className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-cyan-600 transition" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FIRs, suspect fingerprints, IPC sections, location hotspot..."
            className={`w-full pl-10 pr-24 py-2 rounded-xl text-xs font-medium border transition ${
              config.isDark
                ? 'bg-slate-900/90 text-slate-100 placeholder-slate-500 border-slate-700 focus:outline-none focus:border-cyan-500'
                : 'bg-slate-100/90 text-slate-900 placeholder-slate-400 border-slate-200 focus:outline-none focus:bg-white focus:border-cyan-500'
            }`}
          />
          <div className="absolute inset-y-0 right-1 flex items-center gap-1">
            <button
              type="button"
              onClick={onOpenVoiceInput}
              className="p-1 rounded-lg text-slate-400 hover:text-cyan-600 hover:bg-cyan-500/10 transition cursor-pointer"
              title="Voice Search Assistant"
            >
              <Mic className="w-4 h-4 text-cyan-600" />
            </button>
            <button
              type="submit"
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Right Controls & Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Mobile Search Icon Toggle */}
        <button
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 md:hidden transition cursor-pointer"
          title="Search"
        >
          <Search className="w-4 h-4 text-cyan-600" />
        </button>

        {/* Theme Switcher Button */}
        <div className="relative">
          <button
            onClick={() => { setShowThemeMenu(!showThemeMenu); setShowNotifications(false); }}
            className={`flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
              config.isDark
                ? 'bg-slate-800 text-cyan-300 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
            }`}
            title="Change Theme & Visual Style"
          >
            <Palette className="w-4 h-4 text-cyan-600" />
            <span className="hidden sm:inline font-mono text-[11px]">{config.badgeTag}</span>
          </button>

          {/* Theme Dropdown Menu */}
          {showThemeMenu && (
            <div className={`absolute right-0 mt-3 w-72 rounded-2xl border p-3 shadow-2xl z-50 transition ${
              config.isDark
                ? 'bg-[#121827] border-slate-700 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/20">
                <span className="text-xs font-bold font-heading flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-cyan-500" /> Select Visual Theme
                </span>
                <button 
                  onClick={() => setShowThemeMenu(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1.5">
                {Object.values(THEME_CONFIGS).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full p-2.5 rounded-xl text-left transition flex items-center justify-between border cursor-pointer ${
                      theme === t.id
                        ? config.isDark
                          ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
                          : 'bg-cyan-50 border-cyan-400 text-cyan-900'
                        : config.isDark
                          ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300'
                          : 'bg-slate-50 border-slate-100 hover:border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-heading">{t.name}</span>
                        <span className="px-1.5 py-0.2 text-[9px] font-mono rounded bg-slate-200/50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {t.isDark ? 'Dark' : 'Light'}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{t.description}</p>
                    </div>
                    {theme === t.id && (
                      <Check className="w-4 h-4 text-cyan-500 shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Buttons (Desktop + Mobile Scan) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onOpenNewReport}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs transition active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Case</span>
          </button>

          <button
            onClick={onOpenUploader}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold border transition active:scale-95 cursor-pointer flex items-center gap-1.5 ${
              config.isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
            }`}
            title="Upload FIR PDF or Evidence Image for Scanning"
          >
            <FileUp className="w-4 h-4 text-cyan-600" />
            <span className="hidden sm:inline">Scan FIR</span>
          </button>
        </div>

        {/* Intelligence Side Drawer Mobile Trigger */}
        {onOpenMobileRightPanel && (
          <button
            onClick={onOpenMobileRightPanel}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 xl:hidden transition cursor-pointer"
            title="Intel Feed"
          >
            <Zap className="w-4 h-4 text-amber-500" />
          </button>
        )}

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowThemeMenu(false); }}
            className={`relative p-2 rounded-xl border transition cursor-pointer ${
              config.isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title="Intelligence Alerts"
          >
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            )}
          </button>

          {/* Floating Notification Panel */}
          {showNotifications && (
            <div className={`absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl border p-4 shadow-2xl z-50 transition ${
              config.isDark ? 'bg-[#121827] border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/20">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <h3 className="text-xs font-bold font-heading uppercase tracking-wider">
                    Smart Intelligence Alerts ({notifications.length})
                  </h3>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-2 space-y-2 max-h-80 overflow-y-auto">
                {notifications.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-xl border transition group ${
                      config.isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full border ${
                        alert.severity === 'CRITICAL' 
                          ? 'bg-rose-100 text-rose-800 border-rose-200' 
                          : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}>
                        {alert.type}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{alert.timestamp}</span>
                    </div>
                    <h4 className="text-xs font-semibold mt-1 group-hover:text-cyan-600 transition">
                      {alert.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                      {alert.message}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200/20 text-center">
                <button 
                  onClick={() => setNotifications([])}
                  className="text-xs text-cyan-600 hover:text-cyan-700 font-semibold cursor-pointer"
                >
                  Clear All Alerts
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Expandable Search Bar Overlay */}
      {showMobileSearch && (
        <div className={`absolute top-16 left-0 right-0 p-3 border-b shadow-xl z-30 md:hidden transition ${
          config.isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <form onSubmit={handleMobileSearchSubmit} className="relative flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FIRs, suspects, IPC sections..."
              autoFocus
              className={`flex-1 pl-3 pr-10 py-2.5 rounded-xl text-xs font-medium border transition ${
                config.isDark
                  ? 'bg-slate-900 text-slate-100 border-slate-700 focus:outline-none focus:border-cyan-500'
                  : 'bg-slate-100 text-slate-900 border-slate-200 focus:outline-none focus:bg-white focus:border-cyan-500'
              }`}
            />
            <button
              type="button"
              onClick={onOpenVoiceInput}
              className="p-2 rounded-xl text-cyan-600 bg-cyan-500/10 transition"
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="submit"
              className="px-3 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 text-white shadow-xs transition"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowMobileSearch(false)}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
};
