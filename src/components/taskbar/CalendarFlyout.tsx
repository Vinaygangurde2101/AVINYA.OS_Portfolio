import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Bell, Sparkles } from 'lucide-react';

interface CalendarFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarFlyout: React.FC<CalendarFlyoutProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Calendar math
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ type: 'spring', damping: 24, stiffness: 360 }}
          className="fixed bottom-14 right-3 z-[9500] w-80 p-4 rounded-2xl bg-slate-900/95 border border-white/15 shadow-2xl backdrop-blur-3xl text-slate-100 font-sans select-none"
        >
          {/* Top Date Header */}
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-100">
                {currentDate.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>
              <p className="text-xs text-sky-400 font-mono">AVINYA.OS System Calendar</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-between my-3 px-1">
            <span className="font-semibold text-xs text-slate-200">
              {monthNames[month]} {year}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Names Header */}
          <div className="grid grid-cols-7 text-center text-[10px] font-mono text-slate-400 font-bold mb-1">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {/* Empty slots for start padding */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-7" />
            ))}

            {/* Days of month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const isToday =
                today.getDate() === dayNum &&
                today.getMonth() === month &&
                today.getFullYear() === year;

              return (
                <button
                  key={`day-${dayNum}`}
                  className={`h-7 rounded-lg flex items-center justify-center font-medium transition-all ${
                    isToday
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(56,189,248,0.4)]'
                      : 'hover:bg-white/10 text-slate-200'
                  }`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Notifications Card Section */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <span className="text-[11px] font-mono text-slate-400 block mb-2">Notifications</span>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <div className="font-semibold text-slate-100">Welcome to Portfolio OS</div>
                <div className="text-[10px] text-slate-400">All systems running smoothly</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
