import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const ParticleBackground: React.FC = () => {
  const { theme, config } = useTheme();

  if (theme === 'liquid-glass') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-100/60">
        {/* iOS 18 Liquid Mesh Organic Gradient Blobs */}
        <div 
          className="absolute top-[-10%] left-[15%] w-[650px] h-[650px] bg-gradient-to-tr from-cyan-300/30 via-sky-200/40 to-indigo-300/30 rounded-full blur-[100px] animate-liquid"
          style={{ animationDuration: '14s' }}
        />
        <div 
          className="absolute bottom-[-15%] right-[10%] w-[700px] h-[700px] bg-gradient-to-br from-emerald-200/30 via-teal-300/25 to-sky-300/30 rounded-full blur-[120px] animate-liquid"
          style={{ animationDuration: '18s', animationDelay: '-4s' }}
        />
        <div 
          className="absolute top-[35%] left-[-8%] w-[500px] h-[500px] bg-gradient-to-r from-purple-200/30 via-pink-200/20 to-amber-200/25 rounded-full blur-[110px] animate-liquid"
          style={{ animationDuration: '16s', animationDelay: '-8s' }}
        />
        <div className="absolute inset-0 cyber-grid-bg opacity-20" />
      </div>
    );
  }

  if (theme === 'minimal-light') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-[120px]" />
        <div className="absolute inset-0 cyber-grid-bg opacity-15" />
      </div>
    );
  }

  if (theme === 'midnight-obsidian') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#090d16]">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[15%] w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-0 cyber-grid-bg opacity-25" />
      </div>
    );
  }

  // cyber-slate
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0f1d]">
      <div className="absolute top-[-5%] left-[10%] w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[130px]" />
      <div className="absolute bottom-[0%] right-[10%] w-[550px] h-[550px] bg-purple-600/15 rounded-full blur-[130px]" />
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />
    </div>
  );
};

