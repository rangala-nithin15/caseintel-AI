import React from 'react';
import { AnalyticsCharts } from '../dashboard/AnalyticsCharts';
import { BarChart3, TrendingUp, ShieldCheck, MapPin } from 'lucide-react';
import { MOCK_ANALYTICS_DATA, MOCK_HOTSPOTS } from '../../data/mockData';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-5 pb-10">
      <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-600" />
            Karnataka Crime Analytics & Spatial Density Heatmaps
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Deep statistical correlation across 31 police districts, monthly clearance velocity, and crime cluster projections.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-cyan-100 border border-cyan-200 text-xs font-mono font-bold text-cyan-800">
          KSP Intelligence Engine v3.8
        </span>
      </div>

      <AnalyticsCharts />

      {/* Spatial Heatmap Density Breakdown */}
      <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-xs">
        <h3 className="text-sm font-bold font-heading text-slate-900 mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-600" /> High Crime Density Spatial Hotspot Registry
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MOCK_HOTSPOTS.map((hs) => (
            <div key={hs.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{hs.areaName}</h4>
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded bg-rose-100 text-rose-800">
                  {hs.riskLevel}
                </span>
              </div>
              <p className="text-[11px] font-mono text-cyan-800 font-bold mt-1">{hs.district}</p>
              <p className="text-[11px] text-slate-600 mt-0.5">{hs.dominantCrime}</p>
              <div className="mt-2 text-xs font-mono font-bold text-amber-700">
                {hs.crimeCount} Incident Reports Logged
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
