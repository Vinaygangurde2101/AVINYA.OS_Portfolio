import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../../data/profile';
import { Sparkles, Terminal } from 'lucide-react';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootMessages = [
    'Initializing kernel modules...',
    'Mounting spatial UI architecture...',
    'Loading project telemetry & case studies...',
    'Establishing secure WebSocket session...',
    'System ready.'
  ];

  useEffect(() => {
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < bootMessages.length) {
        setLogs((prev) => [...prev, bootMessages[currentIdx]]);
        setProgress(Math.round(((currentIdx + 1) / bootMessages.length) * 100));
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 280);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-[10000] bg-[#05070d] flex flex-col items-center justify-center p-6 text-slate-100 font-mono select-none"
      >
        {/* Logo Branding */}
        <div className="relative flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 p-[1px] shadow-[0_0_40px_rgba(0,240,255,0.4)] mb-4 animate-pulse">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-cyan-400 text-2xl font-bold">
              ◈
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-widest text-slate-100 font-sans">
            {profileData.osName}
          </h1>
          <p className="text-xs text-slate-400 mt-1">Personal Developer Workstation v2.6</p>
        </div>

        {/* Boot Terminal Box */}
        <div className="w-full max-w-md p-4 rounded-xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-2 text-xs text-slate-300">
          <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-white/10 pb-2 mb-2">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              BOOT SEQUENCE
            </span>
            <span>{progress}%</span>
          </div>

          <div className="h-24 overflow-y-auto space-y-1 font-mono">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-cyan-400">›</span>
                <span>{log}</span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          onClick={onComplete}
          className="mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-4"
        >
          Skip Boot Animation →
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
