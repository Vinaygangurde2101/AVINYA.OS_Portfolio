import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useWindowStore } from '../../store/useWindowStore';
import { useSearchStore } from '../../store/useSearchStore';
import { profileData } from '../../data/profile';
import { AppId } from '../../types/window';
import { getWindowsIcon } from '../icons/WindowsIcons';
import { soundEngine } from '../../utils/soundEngine';
import { Search, Power, RotateCcw, Lock, Moon, ChevronRight } from 'lucide-react';

const MENU_APPS: { id: AppId; title: string; icon: string; desc: string }[] = [
  { id: 'about', title: 'This PC', icon: 'User', desc: 'Profile & summary' },
  { id: 'ai-assistant', title: 'Ask Vinay AI', icon: 'Bot', desc: 'Portfolio LLM Chatbot' },
  { id: 'projects', title: 'Projects Explorer', icon: 'FolderGit2', desc: 'Case studies & demos' },
  { id: 'skills', title: 'Skills & Stack', icon: 'Cpu', desc: 'Frontend & backend' },
  { id: 'experience', title: 'Work Experience', icon: 'Briefcase', desc: 'Career timeline' },
  { id: 'achievements', title: 'Awards & Honors', icon: 'Trophy', desc: 'Badges & open source' },
  { id: 'resume', title: 'Resume PDF', icon: 'FileText', desc: 'Downloadable resume' },
  { id: 'contact', title: 'Contact Direct', icon: 'Mail', desc: 'Send direct message' },
  { id: 'terminal', title: 'Terminal Shell', icon: 'Terminal', desc: 'Developer CLI' },
  { id: 'browser', title: 'Browser Sandbox', icon: 'Globe', desc: 'Web apps preview' },
  { id: 'arcade', title: 'Avinya Arcade', icon: 'Gamepad2', desc: 'Cyberpunk mini-games' },
  { id: 'architecture', title: 'System Graph', icon: 'Network', desc: 'Microservices & AI topology' },
  { id: 'settings', title: 'Settings', icon: 'Sliders', desc: 'Themes & wallpaper' }
];

export const StartMenu: React.FC = () => {
  const isOpen = useSettingsStore((s) => s.startMenuOpen);
  const setOpen = useSettingsStore((s) => s.setStartMenuOpen);
  const openWindow = useWindowStore((s) => s.openWindow);
  const openSearch = useSearchStore((s) => s.openSearch);

  const [showPowerMenu, setShowPowerMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
        setShowPowerMenu(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setOpen]);

  const handleLaunchApp = (id: AppId) => {
    openWindow(id);
    setOpen(false);
  };

  const handlePowerAction = (action: string) => {
    setShowPowerMenu(false);
    setOpen(false);
    if (action === 'restart') {
      window.location.reload();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.96 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="fixed bottom-14 left-1/2 -translate-x-1/2 z-[9500] w-[90vw] max-w-[540px] rounded-2xl bg-slate-900/95 border border-white/15 p-6 shadow-2xl backdrop-blur-2xl text-slate-100 font-sans"
        >
          {/* Top Search Bar */}
          <button
            onClick={() => {
              setOpen(false);
              openSearch();
            }}
            className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 hover:border-sky-500/50 rounded-full flex items-center justify-between text-xs text-slate-400 transition-all group shadow-inner"
          >
            <span className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
              <span>Type here to search apps, settings, projects...</span>
            </span>
            <kbd className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md text-[10px] border border-white/10 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Pinned Section */}
          <div className="mt-5">
            <div className="flex items-center justify-between px-1 mb-3">
              <span className="text-xs font-semibold text-slate-200">Pinned Apps</span>
              <button
                onClick={() => {
                  setOpen(false);
                  openSearch();
                }}
                className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1"
              >
                <span>All apps</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Grid of Pinned Apps */}
            <div className="grid grid-cols-5 gap-2">
              {MENU_APPS.map((app) => (
                <motion.button
                  key={app.id}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    soundEngine.playClick();
                    handleLaunchApp(app.id);
                  }}
                  className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white/10 transition-all group text-center"
                >
                  <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getWindowsIcon(app.id || app.icon, 'w-9 h-9 filter drop-shadow')}
                  </div>
                  <span className="mt-1.5 text-[11px] font-medium text-slate-200 group-hover:text-white line-clamp-1 leading-snug">
                    {app.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Recommended Section */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <span className="text-xs font-semibold text-slate-200 px-1 mb-3 block">Recommended</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleLaunchApp('projects')}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 text-left transition-colors"
              >
                {getWindowsIcon('projects', 'w-8 h-8')}
                <div>
                  <div className="text-xs font-medium text-slate-200">Full-Stack Portfolio</div>
                  <div className="text-[10px] text-slate-400">Recently updated</div>
                </div>
              </button>

              <button
                onClick={() => handleLaunchApp('resume')}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 text-left transition-colors"
              >
                {getWindowsIcon('resume', 'w-8 h-8')}
                <div>
                  <div className="text-xs font-medium text-slate-200">Resume.pdf</div>
                  <div className="text-[10px] text-slate-400">PDF Document</div>
                </div>
              </button>
            </div>
          </div>

          {/* Bottom Profile Bar & Power Controls */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-9 h-9 rounded-full object-cover border border-sky-400/40 shadow"
              />
              <div>
                <h4 className="font-semibold text-xs text-slate-100">{profileData.name}</h4>
                <p className="text-[10px] text-slate-400">{profileData.role}</p>
              </div>
            </div>

            {/* Power Button */}
            <div className="relative">
              <button
                onClick={() => setShowPowerMenu(!showPowerMenu)}
                className="p-2 rounded-full hover:bg-white/15 text-slate-300 hover:text-red-400 transition-colors"
                title="Power options"
              >
                <Power className="w-4 h-4" />
              </button>

              {/* Power Options Menu */}
              <AnimatePresence>
                {showPowerMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-10 right-0 w-36 p-1.5 rounded-xl bg-slate-950/95 border border-white/15 shadow-2xl backdrop-blur-xl text-xs z-[9600]"
                  >
                    <button
                      onClick={() => handlePowerAction('sleep')}
                      className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 text-left"
                    >
                      <Moon className="w-3.5 h-3.5 text-sky-400" />
                      <span>Sleep</span>
                    </button>
                    <button
                      onClick={() => handlePowerAction('restart')}
                      className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 text-left"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>Restart</span>
                    </button>
                    <button
                      onClick={() => handlePowerAction('shutdown')}
                      className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 text-red-300 text-left"
                    >
                      <Power className="w-3.5 h-3.5 text-red-400" />
                      <span>Shut down</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
