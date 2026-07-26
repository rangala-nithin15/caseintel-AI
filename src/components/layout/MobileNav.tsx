import React from 'react';
import { 
  LayoutDashboard, 
  Cpu, 
  Database, 
  FolderGit2, 
  Menu,
  Sparkles
} from 'lucide-react';
import { NavigationTab } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface MobileNavProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenMobileMenu: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenMobileMenu
}) => {
  const { config } = useTheme();

  const mainTabs = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assistant' as NavigationTab, label: 'Case AI', icon: Cpu, isSpecial: true },
    { id: 'database' as NavigationTab, label: 'Crime DB', icon: Database },
    { id: 'cases' as NavigationTab, label: 'Active FIRs', icon: FolderGit2 },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden border-t backdrop-blur-xl transition-colors duration-300 ${
      config.isDark
        ? 'bg-[#0f172a]/95 border-slate-800/90 text-slate-100 shadow-2xl'
        : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-lg'
    }`}>
      <div className="grid grid-cols-5 h-16 px-1 items-center max-w-md mx-auto">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-cyan-600 dark:text-cyan-400 font-bold scale-105'
                  : config.isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`relative p-1.5 rounded-xl transition ${
                isActive 
                  ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30' 
                  : 'bg-transparent'
              }`}>
                <Icon className="w-5 h-5" />
                {tab.isSpecial && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium mt-0.5 tracking-tight truncate max-w-full">
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* 5th Button: Open Full Mobile Menu Drawer */}
        <button
          onClick={onOpenMobileMenu}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-200 cursor-pointer ${
            config.isDark ? 'text-slate-400 hover:text-slate-100' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <Menu className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium mt-0.5 tracking-tight">
            Menu
          </span>
        </button>
      </div>
    </div>
  );
};
