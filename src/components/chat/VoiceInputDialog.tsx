import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mic, MicOff, X, Sparkles, Volume2, Check } from 'lucide-react';

interface VoiceInputDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceSubmit: (transcript: string) => void;
}

export const VoiceInputDialog: React.FC<VoiceInputDialogProps> = ({
  isOpen,
  onClose,
  onVoiceSubmit
}) => {
  const [isListening, setIsListening] = useState<boolean>(true);
  const [transcript, setTranscript] = useState<string>('Show all robbery cases from Bengaluru Indiranagar...');
  const [waveHeights, setWaveHeights] = useState<number[]>([12, 28, 45, 18, 35, 52, 24, 40, 15]);

  useEffect(() => {
    if (!isOpen || !isListening) return;

    const interval = setInterval(() => {
      setWaveHeights(prev => prev.map(() => Math.floor(Math.random() * 45) + 10));
    }, 150);

    return () => clearInterval(interval);
  }, [isOpen, isListening]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onVoiceSubmit(transcript);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg rounded-3xl p-6 border border-slate-200 bg-white shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-mono border border-cyan-200">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>KSP AI Voice Intelligence Transcriber</span>
          </div>

          <h3 className="text-lg font-bold font-heading text-slate-900">
            {isListening ? "Listening to Officer Voice Input..." : "Voice Capture Paused"}
          </h3>

          {/* Animated Microphone Waveform */}
          <div className="py-6 flex items-center justify-center gap-1.5 h-24">
            {isListening && waveHeights.map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: `${h}px` }}
                transition={{ duration: 0.15 }}
                className="w-2 rounded-full bg-cyan-600"
              />
            ))}

            <button
              onClick={() => setIsListening(!isListening)}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition shadow-md ${
                isListening 
                  ? 'bg-rose-600 text-white shadow-rose-200 animate-pulse' 
                  : 'bg-slate-100 text-cyan-700 border border-slate-300'
              }`}
            >
              {isListening ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
            </button>
          </div>

          {/* Recognized Text Display */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left">
            <span className="text-[10px] font-mono text-cyan-800 uppercase tracking-wider block mb-1">
              Live Transcribed Query:
            </span>
            <input
              type="text"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none"
            />
          </div>

          {/* Quick Voice Preset Chips */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {[
              "Show all robbery cases from Bengaluru",
              "Find crimes involving suspect Arjun Varma",
              "Summarize FIR number 2401",
              "List cybercrime cases from this week"
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setTranscript(preset)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 border border-slate-200 transition"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Submit Actions */}
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirm}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-cyan-700 hover:bg-cyan-800 text-white shadow-sm transition flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Query Assistant</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
