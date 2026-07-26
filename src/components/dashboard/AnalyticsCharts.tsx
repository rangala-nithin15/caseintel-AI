import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, Legend 
} from 'recharts';
import { MOCK_ANALYTICS_DATA } from '../../data/mockData';
import { BarChart3, PieChart as PieIcon, TrendingUp, ShieldCheck } from 'lucide-react';

export const AnalyticsCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-4">
      {/* Chart 1: Monthly Crime Trends Area Chart */}
      <div className="lg:col-span-2 p-5 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-600" />
            <h3 className="text-sm font-bold font-heading text-slate-900">
              Karnataka Monthly Crime Clearance Trend
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-800 font-semibold bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200">
            +14.8% Clearance YoY
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_ANALYTICS_DATA.monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="solvedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0891b2" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="pendingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Area type="monotone" dataKey="solved" name="Solved Cases" stroke="#0891b2" strokeWidth={2} fillOpacity={1} fill="url(#solvedGradient)" />
              <Area type="monotone" dataKey="pending" name="Pending Cases" stroke="#d97706" strokeWidth={2} fillOpacity={1} fill="url(#pendingGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Crime Type Distribution Donut Chart */}
      <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <PieIcon className="w-5 h-5 text-purple-600" />
          <h3 className="text-sm font-bold font-heading text-slate-900">
            Crime Type Distribution
          </h3>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={MOCK_ANALYTICS_DATA.crimeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={5}
                dataKey="value"
              >
                {MOCK_ANALYTICS_DATA.crimeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-1.5 mt-2">
          {MOCK_ANALYTICS_DATA.crimeDistribution.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-700 truncate">{item.name}</span>
              </div>
              <span className="font-mono font-bold text-slate-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart 3: District Clearance Rates Bar Chart */}
      <div className="lg:col-span-3 p-5 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold font-heading text-slate-900">
              District Crime Clearance Rate & Load (Karnataka State)
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-800 font-semibold">31 Districts Synced</span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_ANALYTICS_DATA.districtBreakdown} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis dataKey="district" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
              <Bar dataKey="cases" name="Total Cases" fill="#0284c7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
