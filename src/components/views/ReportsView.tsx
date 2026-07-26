import React from 'react';
import { FileSpreadsheet, Download, Printer, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';
import { MOCK_FIRS } from '../../data/mockData';
import policeLogo from '../../assets/logo.jpg';

export const ReportsView: React.FC = () => {
  return (
    <div className="space-y-5 pb-10">
      <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl p-1 bg-gradient-to-br from-amber-500 via-cyan-600 to-blue-700 shadow-md shrink-0 flex items-center justify-center overflow-hidden bg-slate-900">
            <img 
              src={policeLogo} 
              alt="Karnataka Police Seal" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
              Karnataka Police Official FIR & Prosecution Reports
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Generate court-ready Form-54 briefs, charge sheets, and AI case summaries formatted according to Karnataka High Court standards.
            </p>
          </div>
        </div>

        <button 
          onClick={() => alert("Generating Full State Intelligence Brief PDF...")}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-700 hover:bg-cyan-800 text-white shadow-xs transition flex items-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export All FIR Briefs (PDF)</span>
        </button>
      </div>

      <div className="space-y-3">
        {MOCK_FIRS.map((fir) => (
          <div
            key={fir.firNumber}
            className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-mono text-cyan-800">{fir.firNumber}</h4>
                <h3 className="text-sm font-bold text-slate-900 font-heading">{fir.crimeType}</h3>
                <p className="text-[11px] text-slate-500">{fir.policeStation} • Complainant: {fir.complainantName}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Printing Court-ready Form-54 brief for ${fir.firNumber}`)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Print Brief
              </button>
              <button
                onClick={() => alert(`Downloaded Official Prosecution PDF for ${fir.firNumber}`)}
                className="px-3 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 text-xs font-bold border border-cyan-200 flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
