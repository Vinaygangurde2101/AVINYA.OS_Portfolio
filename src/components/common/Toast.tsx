import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-20 right-6 z-[9999] flex items-center gap-3 px-4 py-3 bg-slate-900/95 border border-cyan-500/30 text-white rounded-xl shadow-2xl backdrop-blur-xl font-sans text-sm"
        >
          {type === 'success' && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
          {type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {type === 'info' && <Info className="w-5 h-5 text-violet-400" />}
          <span className="font-medium text-slate-200">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
