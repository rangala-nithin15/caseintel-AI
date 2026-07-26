import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Bot, 
  Database, 
  Search, 
  FolderGit2, 
  UserX, 
  FileSpreadsheet, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  ShieldAlert, 
  LogOut,
  Radio,
  Cpu,
  X
} from 'lucide-react';
import { NavigationTab, PoliceOfficer } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import policeLogo from '../../assets/logo.jpg';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  currentOfficer: PoliceOfficer;
  onLogout: () => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  currentOfficer,
  onLogout,
  mobileOpen = false,
  setMobileOpen
}) => {
  const { config } = useTheme();

  const navItems = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'assistant' as NavigationTab, label: 'Case Intelligence', icon: Cpu, badge: 'Live Vault' },
    { id: 'database' as NavigationTab, label: 'Crime Database', icon: Database, badge: '14.2k' },
    { id: 'evidence' as NavigationTab, label: 'Evidence Search', icon: Search, badge: 'Scanner' },
    { id: 'cases' as NavigationTab, label: 'Active Cases', icon: FolderGit2, badge: '85 Critical' },
    { id: 'suspects' as NavigationTab, label: 'Suspect Radar', icon: UserX, badge: '310 Tracked' },
    { id: 'reports' as NavigationTab, label: 'FIR & Reports', icon: FileSpreadsheet, badge: '42 Today' },
    { id: 'analytics' as NavigationTab, label: 'Crime Analytics', icon: BarChart3, badge: null },
    { id: 'settings' as NavigationTab, label: 'System Settings', icon: Settings, badge: null },
  ];

  const handleTabSelect = (tab: NavigationTab) => {
    setActiveTab(tab);
    if (setMobileOpen) setMobileOpen(false);
  };

  const handleLogoutClick = () => {
    if (setMobileOpen) setMobileOpen(false);
    onLogout();
  };

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="h-full flex flex-col justify-between">
      {/* Top Header Logo */}
      <div className={`h-16 flex items-center justify-between px-4 border-b shrink-0 ${
        config.isDark ? 'border-slate-800' : 'border-slate-200/80'
      }`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-cyan-600 to-blue-700 p-0.5 shadow-md shadow-cyan-500/20 shrink-0">
            <div className={`w-full h-full rounded-[9px] flex items-center justify-center overflow-hidden p-0.5 ${
              config.isDark ? 'bg-slate-900' : 'bg-white'
            }`}>
              <img 
                src={policeLogo} 
                alt="Karnataka State Police Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>

          {(!collapsed || isMobile) && (
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold font-heading tracking-tight">
                  CaseIntel
                </span>
                <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded-md border ${
                  config.isDark 
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-800' 
                    : 'bg-cyan-100 text-cyan-800 border-cyan-300'
                }`}>
                  Portal
                </span>
              </div>
              <span className="text-[10px] font-mono opacity-60 uppercase tracking-wider flex items-center gap-1">
                <Radio className="w-2.5 h-2.5 text-emerald-500" /> KSP Intelligence
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle / Mobile Close Button */}
        {isMobile ? (
          <button
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-1.5 rounded-lg transition border cursor-pointer ${
              config.isDark 
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' 
                : 'bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 border-slate-200'
            }`}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleTabSelect(item.id)}
              className={`w-full group relative flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? config.isDark
                    ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-cyan-50 text-cyan-900 border border-cyan-200 shadow-xs'
                  : config.isDark
                    ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-cyan-500 rounded-r-full" />
              )}

              <div className={`p-1.5 rounded-lg transition ${
                isActive 
                  ? 'bg-cyan-600 text-white' 
                  : config.isDark
                    ? 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-cyan-400'
                    : 'bg-slate-100 group-hover:bg-slate-200 text-slate-500 group-hover:text-cyan-700'
              }`}>
                <Icon className="w-4 h-4" />
              </div>

              {(!collapsed || isMobile) && (
                <div className="flex-1 flex items-center justify-between overflow-hidden">
                  <span className={`truncate ${isActive ? 'font-bold' : ''}`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className={`ml-2 px-2 py-0.5 text-[9px] font-mono font-bold rounded-full border ${
                      isActive
                        ? 'bg-cyan-200/60 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-200 border-cyan-300 dark:border-cyan-700'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Officer Footer Card */}
      <div className={`p-3 border-t shrink-0 ${
        config.isDark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200/80 bg-slate-50/80'
      }`}>
        <div className={`flex items-center gap-3 p-2.5 rounded-2xl border shadow-xs ${
          config.isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        } ${collapsed && !isMobile ? 'justify-center' : ''}`}>
          <div className="relative shrink-0">
            <img
              src={currentOfficer.avatarUrl}
              alt={currentOfficer.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-cyan-500/30"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>

          {(!collapsed || isMobile) && (
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold truncate font-heading">
                {currentOfficer.name}
              </h4>
              <p className="text-[10px] font-mono text-cyan-600 font-semibold truncate">
                {currentOfficer.badgeId}
              </p>
            </div>
          )}

          {(!collapsed || isMobile) && (
            <button
              onClick={handleLogoutClick}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition cursor-pointer shrink-0"
              title="Logout Officer Session"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (md and above) */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className={`hidden md:flex relative z-30 h-screen flex-col border-r shadow-xs select-none transition-colors duration-300 ${
          config.isDark
            ? 'bg-[#0f172a] border-slate-800 text-slate-100'
            : 'bg-white/90 backdrop-blur-md border-slate-200/90 text-slate-900'
        }`}
      >
        <SidebarContent isMobile={false} />
      </motion.aside>

      {/* Mobile Overlay Drawer (below md) */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Slide-over Content Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className={`relative z-10 w-80 max-w-[85vw] h-full flex flex-col shadow-2xl border-r ${
                config.isDark
                  ? 'bg-[#0f172a] border-slate-800 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <SidebarContent isMobile={true} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
