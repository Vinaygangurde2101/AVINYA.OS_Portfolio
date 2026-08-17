import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../../store/useWindowStore';
import { soundEngine } from '../../utils/soundEngine';
import { AIAssistantIcon } from '../icons/WindowsIcons';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

const COMPACT_HINTS = [
  'Ask about my AI projects',
  'Ask about my 8.46 GPA',
  'Ask about my tech stack',
  'Ask about my work experience',
  'Ask about my IIT Bombay award'
];

export const FloatingAIWidget: React.FC = () => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const [hintIdx, setHintIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHintIdx((prev) => (prev + 1) % COMPACT_HINTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenAI = () => {
    soundEngine.playClick();
    openWindow('ai-assistant');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 22, stiffness: 350, delay: 0.15 }}
      onClick={handleOpenAI}
      className="fixed bottom-14 right-4 sm:right-6 z-[8500] px-3.5 py-2 rounded-full bg-slate-900/90 border border-cyan-400/50 shadow-[0_0_25px_rgba(6,182,212,0.4)] backdrop-blur-xl text-slate-100 font-sans select-none hover:shadow-[0_0_35px_rgba(6,182,212,0.65)] hover:border-cyan-300 transition-all duration-200 cursor-pointer flex items-center gap-3 group hover:scale-[1.04]"
    >
      {/* Sleek 3D AI Hologram Icon Avatar */}
      <div className="relative shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 via-sky-500 to-emerald-400 p-0.5 shadow-[0_0_10px_rgba(6,182,212,0.6)] group-hover:rotate-6 transition-transform">
          <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
            <AIAssistantIcon className="w-6 h-6" />
          </div>
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full animate-pulse shadow-[0_0_6px_#34d399]" />
      </div>

      {/* Compact Text Ticker */}
      <div className="flex flex-col justify-center max-w-[160px] sm:max-w-[200px]">
        <div className="flex items-center gap-1.5 leading-none mb-0.5">
          <span className="text-xs font-bold text-white tracking-wide">Vinay AI</span>
          <span className="px-1.5 py-0.2 text-[8px] font-mono rounded bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-extrabold animate-pulse">
            AI ⚡
          </span>
        </div>
        <div className="h-3.5 overflow-hidden flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={hintIdx}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.25 }}
              className="text-[10px] text-cyan-200/90 font-medium truncate flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
              <span className="truncate">{COMPACT_HINTS[hintIdx]}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Action Button Pill */}
      <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 group-hover:from-cyan-400 group-hover:to-emerald-300 text-slate-950 text-[10px] font-extrabold flex items-center gap-1 shadow-md shrink-0">
        <span>Chat</span>
        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </motion.div>
  );
};
