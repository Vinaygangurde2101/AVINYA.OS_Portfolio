import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useWindowStore } from '../../store/useWindowStore';
import { useSearchStore } from '../../store/useSearchStore';
import { StartMenu } from './StartMenu';
import { QuickSettingsFlyout } from './QuickSettingsFlyout';
import { CalendarFlyout } from './CalendarFlyout';
import { Tooltip } from '../common/Tooltip';
import { AppId } from '../../types/window';
import { soundEngine } from '../../utils/soundEngine';
import { getWindowsIcon, WindowsLogoIcon, WeatherWidgetIcon } from '../icons/WindowsIcons';
import { Search, LayoutGrid, Wifi, Volume2, Battery, Bell, X, ExternalLink, Sparkles } from 'lucide-react';

const DOCK_APPS: { id: AppId; title: string; icon: string }[] = [
  { id: 'about', title: 'This PC', icon: 'User' },
  { id: 'ai-assistant', title: 'Ask Vinay AI', icon: 'Bot' },
  { id: 'projects', title: 'Projects Explorer', icon: 'FolderGit2' },
  { id: 'skills', title: 'Skills & Stack', icon: 'Cpu' },
  { id: 'experience', title: 'Experience', icon: 'Briefcase' },
  { id: 'achievements', title: 'Achievements', icon: 'Trophy' },
  { id: 'resume', title: 'Resume PDF', icon: 'FileText' },
  { id: 'contact', title: 'Contact Direct', icon: 'Mail' },
  { id: 'terminal', title: 'Terminal Shell', icon: 'Terminal' }
];

export const Taskbar: React.FC = () => {
  const toggleStartMenu = useSettingsStore((s) => s.toggleStartMenu);
  const startMenuOpen = useSettingsStore((s) => s.startMenuOpen);
  const clock24h = useSettingsStore((s) => s.clock24h);
  const openSearch = useSearchStore((s) => s.openSearch);

  const windows = useWindowStore((s) => s.windows);
  const activeWindowId = useWindowStore((s) => s.activeWindowId);
  const toggleWindow = useWindowStore((s) => s.toggleWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const closeWindow = useWindowStore((s) => s.closeWindow);

  // Flyouts state
  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Hover preview state
  const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);

  // Live Clock & Colon Pulse
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [colonVisible, setColonVisible] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeOpts: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: !clock24h
      };
      setTimeStr(now.toLocaleTimeString([], timeOpts));
      setDateStr(now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' }));
      setColonVisible((prev) => !prev);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [clock24h]);

  const handleShowDesktop = () => {
    soundEngine.playClick();
    Object.keys(windows).forEach((id) => {
      if (windows[id]?.isOpen && !windows[id]?.isMinimized) {
        minimizeWindow(id);
      }
    });
  };

  const handleDockClick = (id: AppId) => {
    soundEngine.playClick();
    toggleWindow(id);
  };

  return (
    <>
      <StartMenu />
      <QuickSettingsFlyout isOpen={quickSettingsOpen} onClose={() => setQuickSettingsOpen(false)} />
      <CalendarFlyout isOpen={calendarOpen} onClose={() => setCalendarOpen(false)} />

      {/* Full-width Windows 11 Acrylic Interactive Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 z-[9000] bg-[#0d131f]/90 backdrop-blur-3xl border-t border-white/15 flex items-center justify-between px-3 select-none shadow-[0_-5px_25px_rgba(0,0,0,0.5)]">
        
        {/* Left Interactive Weather Pill */}
        <div className="hidden md:flex items-center">
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundEngine.playClick();
              openSearch();
            }}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-sans text-slate-200 group shadow-md"
          >
            <div className="relative">
              <WeatherWidgetIcon className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-sky-400 rounded-full animate-ping" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[11px] font-bold text-slate-100 flex items-center gap-1">
                72°F Sunny
                <Sparkles className="w-2.5 h-2.5 text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
              <span className="text-[9px] text-sky-300 font-mono">AQI 28 • Excellent</span>
            </div>
          </motion.button>
        </div>

        {/* Center Dock Container */}
        <div className="flex items-center gap-1.5 mx-auto">
          {/* Animated Start Menu Button */}
          <Tooltip content="Start Menu (Windows 11)">
            <motion.button
              whileHover={{ rotate: 12, scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.92, rotate: 0 }}
              onClick={() => {
                soundEngine.playClick();
                toggleStartMenu();
              }}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                startMenuOpen
                  ? 'bg-sky-500/30 border border-sky-400/80 shadow-[0_0_20px_rgba(56,189,248,0.45)] text-sky-300'
                  : 'hover:bg-white/10 border border-transparent text-sky-400'
              }`}
            >
              <WindowsLogoIcon className="w-5 h-5 filter drop-shadow" />
            </motion.button>
          </Tooltip>

          {/* Windows Search Bar Pill */}
          <Tooltip content="Search Apps & Files (⌘K)">
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                soundEngine.playClick();
                openSearch();
              }}
              className="h-9 px-3.5 rounded-full bg-slate-900/90 hover:bg-slate-900 border border-white/15 flex items-center gap-2 text-slate-300 hover:text-white transition-all text-xs shadow-inner group"
            >
              <Search className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-sans text-slate-300 font-medium">Search</span>
              <kbd className="hidden lg:inline px-1.5 py-0.2 bg-slate-800 text-sky-300 rounded text-[9px] border border-white/15 font-mono">
                ⌘K
              </kbd>
            </motion.button>
          </Tooltip>

          {/* Task View Icon */}
          <Tooltip content="Task View Explorer">
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                soundEngine.playClick();
                openSearch();
              }}
              className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-slate-300 transition-colors"
            >
              <LayoutGrid className="w-4 h-4 text-slate-300" />
            </motion.button>
          </Tooltip>

          <div className="w-[1px] h-5 bg-white/15 mx-1" />

          {/* Dock App Icons List */}
          <div className="flex items-center gap-1 py-0.5">
            {DOCK_APPS.map((app) => {
              const winState = windows[app.id];
              const isOpen = winState?.isOpen;
              const isMinimized = winState?.isMinimized;
              const isActive = activeWindowId === app.id && !isMinimized;
              const isHovered = hoveredAppId === app.id;

              return (
                <div
                  key={app.id}
                  className="relative"
                  onMouseEnter={() => setHoveredAppId(app.id)}
                  onMouseLeave={() => setHoveredAppId(null)}
                >
                  <Tooltip content={app.title}>
                    <motion.button
                      whileHover={{ scale: 1.18, y: -4 }}
                      whileTap={{ scale: 0.92, y: 0 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                      onClick={() => handleDockClick(app.id)}
                      className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-sky-500/25 border border-sky-400/60 shadow-[0_0_16px_rgba(56,189,248,0.35)]'
                          : isOpen
                          ? 'bg-white/10 border border-white/20 hover:bg-white/15'
                          : 'hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      {getWindowsIcon(app.id || app.icon, 'w-6 h-6 filter drop-shadow')}

                      {/* Active Indicator Sliding Cyan Pill */}
                      {isActive && (
                        <motion.span
                          layoutId="activeDockPill"
                          className="absolute bottom-0.5 w-4 h-0.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]"
                        />
                      )}

                      {/* Open Minimized Dot */}
                      {isOpen && !isActive && (
                        <span
                          className={`absolute bottom-0.5 w-1.5 h-1.5 rounded-full ${
                            isMinimized ? 'bg-amber-400 shadow-[0_0_6px_#fbbf24]' : 'bg-slate-400'
                          }`}
                        />
                      )}
                    </motion.button>
                  </Tooltip>

                  {/* Interactive Window Hover Preview Card */}
                  <AnimatePresence>
                    {isHovered && isOpen && winState && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.92 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 350 }}
                        className="absolute bottom-13 left-1/2 -translate-x-1/2 z-[9900] w-48 p-3 rounded-2xl bg-slate-900/95 border border-white/20 shadow-2xl backdrop-blur-2xl text-slate-100 font-sans pointer-events-auto"
                      >
                        {/* Preview Header */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <div className="flex items-center gap-1.5 overflow-hidden">
                            {getWindowsIcon(app.id || app.icon, 'w-4 h-4 shrink-0')}
                            <span className="text-xs font-semibold text-slate-200 truncate">
                              {winState.title || app.title}
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              soundEngine.playWindowMinimize();
                              closeWindow(winState.id);
                            }}
                            className="p-1 rounded-lg hover:bg-rose-500/20 hover:text-rose-300 text-slate-400 transition-colors"
                            title="Close Window"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Interactive Thumbnail Box */}
                        <div
                          onClick={() => {
                            soundEngine.playClick();
                            focusWindow(winState.id);
                          }}
                          className="w-full h-24 rounded-xl bg-slate-950/80 border border-white/10 p-2 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-sky-400/50 transition-all group relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="p-2 rounded-full bg-slate-900 border border-white/10 group-hover:scale-110 transition-transform">
                            <ExternalLink className="w-4 h-4 text-sky-400" />
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-200 transition-colors">
                            {winState.isMinimized ? 'Minimized • Click to restore' : 'Click to bring front'}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right System Tray & Interactive Clock */}
        <div className="flex items-center gap-1.5 font-sans text-xs text-slate-300">
          {/* Quick Settings Grouped Pill */}
          <Tooltip content="Quick Settings (Wi-Fi, Volume, Battery)">
            <motion.button
              whileHover={{ scale: 1.06, y: -1 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                soundEngine.playClick();
                setQuickSettingsOpen(!quickSettingsOpen);
                setCalendarOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${
                quickSettingsOpen
                  ? 'bg-sky-500/30 border border-sky-400/80 text-white shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                  : 'hover:bg-white/10 text-slate-300 border border-transparent'
              }`}
            >
              <Wifi className="w-3.5 h-3.5 text-sky-400" />
              <Volume2 className="w-3.5 h-3.5 text-slate-300" />
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
            </motion.button>
          </Tooltip>

          {/* Stacked Clock & Calendar Button */}
          <Tooltip content="Calendar & Notifications">
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                soundEngine.playClick();
                setCalendarOpen(!calendarOpen);
                setQuickSettingsOpen(false);
              }}
              className={`flex flex-col items-end px-2.5 py-1 rounded-xl transition-all leading-none text-right ${
                calendarOpen
                  ? 'bg-sky-500/30 border border-sky-400/80 text-white shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                  : 'hover:bg-white/10 text-slate-300 border border-transparent'
              }`}
            >
              <span className="text-[11px] font-semibold text-slate-100 font-mono tracking-tight">
                {timeStr}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">{dateStr}</span>
            </motion.button>
          </Tooltip>

          {/* Notification Bell Icon */}
          <Tooltip content="System Notifications">
            <motion.button
              whileHover={{ scale: 1.15, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                soundEngine.playClick();
                setCalendarOpen(!calendarOpen);
              }}
              className="p-2 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white relative transition-colors"
            >
              <Bell className="w-3.5 h-3.5 text-sky-400" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-sky-400 rounded-full animate-ping" />
            </motion.button>
          </Tooltip>

          {/* Show Desktop 2px Edge Trigger */}
          <Tooltip content="Show / Hide Desktop">
            <motion.div
              whileHover={{ backgroundColor: 'rgba(56, 189, 248, 0.4)' }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShowDesktop}
              className="w-1.5 h-10 rounded-r border-l border-white/20 cursor-pointer ml-1 transition-colors"
            />
          </Tooltip>
        </div>
      </div>
    </>
  );
};
