import React from 'react';
import { motion } from 'motion/react';
import { 
  FolderGit2, 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  FileSpreadsheet, 
  UserX, 
  Coins, 
  TrendingUp, 
  ShieldCheck 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const StatsOverview: React.FC = () => {
  const { config } = useTheme();

  const stats = [
    {
      title: "Total Crime Cases",
      value: "14,280",
      change: "+4.2% MoM",
      isPositive: true,
      icon: FolderGit2,
      color: "from-cyan-500 to-blue-600",
      borderGlow: "glow-cyan",
      badge: "KSP Central Registry"
    },
    {
      title: "Solved Cases (Clearance)",
      value: "11,840",
      change: "82.9% Rate",
      isPositive: true,
      icon: CheckCircle2,
      color: "from-emerald-500 to-teal-600",
      borderGlow: "glow-blue",
      badge: "Top 3 State"
    },
    {
      title: "Pending Investigations",
      value: "1,890",
      change: "-12% Backlog",
      isPositive: true,
      icon: Clock,
      color: "from-amber-500 to-orange-600",
      borderGlow: "glow-purple",
      badge: "Active Pursuit"
    },
    {
      title: "Critical High Priority",
      value: "85",
      change: "Immediate Action",
      isPositive: false,
      icon: AlertOctagon,
      color: "from-rose-500 to-red-700",
      borderGlow: "glow-red",
      badge: "Red Alert"
    },
    {
      title: "Today's FIR Reports",
      value: "42",
      change: "Last 24 Hours",
      isPositive: true,
      icon: FileSpreadsheet,
      color: "from-sky-500 to-indigo-600",
      borderGlow: "glow-blue",
      badge: "Live Feed"
    },
    {
      title: "Active Suspect Radar",
      value: "310",
      change: "Biometric Tracked",
      isPositive: false,
      icon: UserX,
      color: "from-purple-500 to-indigo-700",
      borderGlow: "glow-purple",
      badge: "ANPR Synced"
    },
    {
      title: "Recovered Stolen Value",
      value: "₹ 4.2 Cr",
      change: "+₹85L this week",
      isPositive: true,
      icon: Coins,
      color: "from-teal-400 to-emerald-600",
      borderGlow: "glow-cyan",
      badge: "Property Seized"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            className={`p-4 rounded-2xl border transition duration-200 relative overflow-hidden group shadow-xs hover:shadow-sm ${
              config.isDark
                ? 'bg-[#0f172a]/90 border-slate-800 text-slate-100 hover:border-cyan-500'
                : 'bg-white border-slate-200 text-slate-900 hover:border-cyan-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-xs`}>
                <Icon className="w-5 h-5" />
              </div>

              <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-full border ${
                config.isDark
                  ? 'bg-slate-800 text-slate-300 border-slate-700'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}>
                {stat.badge}
              </span>
            </div>

            <div className="mt-3">
              <h4 className={`text-xs font-semibold font-sans ${config.isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {stat.title}
              </h4>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-bold font-heading tracking-tight">
                  {stat.value}
                </span>
                <span className={`text-[11px] font-mono font-semibold flex items-center gap-0.5 ${
                  stat.isPositive ? 'text-emerald-500' : 'text-rose-500'
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition" />
          </motion.div>
        );
      })}
    </div>
  );
};

