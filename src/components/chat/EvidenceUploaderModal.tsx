import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileUp, X, FileText, Image, CheckCircle, ShieldAlert, Cpu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface EvidenceUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadProcessed: (summaryText: string) => void;
}

export const EvidenceUploaderModal: React.FC<EvidenceUploaderModalProps> = ({
  isOpen,
  onClose,
  onUploadProcessed
}) => {
  const { config } = useTheme();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleProcess = () => {
    if (!selectedFile) return;
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            onUploadProcessed(
              `Document Extraction Complete for file "${selectedFile.name}":
• Extracted FIR Ref: FIR/CCB/2026/2401
• Incident Category: Cyber Financial Fraud / API Hijack
• Extracted IPC/IT Sections: Section 66D IT Act, IPC 420
• Key Suspect Flagged: Arjun 'Crypto' Varma (Alias: GhostCode)
• Recommended Action: Run immediate cross-check against crypto transaction logs.`
            );
            onClose();
          }, 400);
          return 100;
        }
        return prev + 20;
      });
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl relative transition ${
          config.isDark ? 'bg-[#121827] border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
            <Cpu className="w-5 h-5 text-cyan-500" />
            <h3 className="text-base font-bold font-heading">
              KSP Document & Evidence Scanner
            </h3>
          </div>

          <p className="text-xs opacity-70">
            Upload FIR PDF copies, ballistics report images, crime scene photographs, or witness deposition transcripts for immediate OCR extraction & suspect correlation.
          </p>

          {/* Drag & Drop Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileSelect(e.dataTransfer.files[0]);
              }
            }}
            className={`p-8 rounded-2xl border-2 border-dashed transition text-center flex flex-col items-center justify-center gap-3 ${
              dragActive 
                ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40' 
                : selectedFile 
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' 
                  : config.isDark ? 'border-slate-800 bg-slate-900/50 hover:border-cyan-500' : 'border-slate-300 bg-slate-50/50 hover:border-cyan-400'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <FileUp className="w-7 h-7" />
            </div>

            {selectedFile ? (
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Selected: {selectedFile.name}
                </span>
                <span className="text-[10px] font-mono opacity-60">
                  {(selectedFile.size / 1024).toFixed(1)} KB • Ready for System Analysis
                </span>
              </div>
            ) : (
              <div>
                <p className="text-xs font-semibold">
                  Drag & Drop FIR Document or Click to Browse
                </p>
                <p className="text-[10px] opacity-50 mt-1 font-mono">
                  Supports PDF, PNG, JPG, DOCX (Max 25MB)
                </p>
              </div>
            )}

            <input
              type="file"
              onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
              className="hidden"
              id="evidence-file-input"
            />
            <label
              htmlFor="evidence-file-input"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-300 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              Browse Local Files
            </label>
          </div>

          {/* Processing Progress */}
          {isScanning && (
            <div className={`space-y-2 p-3 rounded-2xl border ${config.isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between text-xs font-mono text-cyan-600 dark:text-cyan-400">
                <span className="flex items-center gap-1.5">
                  Running Optical Character Recognition & Analysis...
                </span>
                <span>{scanProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-cyan-600 transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              disabled={!selectedFile || isScanning}
              onClick={handleProcess}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                selectedFile && !isScanning
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs'
                  : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Scan & Process File</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

