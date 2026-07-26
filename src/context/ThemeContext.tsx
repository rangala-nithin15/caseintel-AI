import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppTheme, ThemeConfig } from '../types';

export const THEME_CONFIGS: Record<AppTheme, ThemeConfig> = {
  'liquid-glass': {
    id: 'liquid-glass',
    name: 'iOS Liquid Glass',
    description: 'Ultra-translucent frosted glass, fluid pastel ambient mesh & sleek iOS blur effects',
    isDark: false,
    accentColor: '#0284c7',
    badgeTag: 'iOS Glass',
  },
  'minimal-light': {
    id: 'minimal-light',
    name: 'Nordic Minimal Light',
    description: 'Crisp pristine white canvas, zero distraction & high-contrast typography',
    isDark: false,
    accentColor: '#0f766e',
    badgeTag: 'Nordic Light',
  },
  'midnight-obsidian': {
    id: 'midnight-obsidian',
    name: 'Midnight Obsidian',
    description: 'Deep luxury dark obsidian with luminous emerald & cyan neon glows',
    isDark: true,
    accentColor: '#10b981',
    badgeTag: 'Obsidian Dark',
  },
  'cyber-slate': {
    id: 'cyber-slate',
    name: 'Cyber Tactical Slate',
    description: 'High-tech dark slate canvas with electric cyan & purple highlights',
    isDark: true,
    accentColor: '#06b6d4',
    badgeTag: 'Cyber Dark',
  },
};

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  config: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('ksp_app_theme');
    return (saved as AppTheme) || 'liquid-glass';
  });

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('ksp_app_theme', newTheme);
  };

  const config = THEME_CONFIGS[theme] || THEME_CONFIGS['liquid-glass'];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (config.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, config]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, config }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
