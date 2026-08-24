import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DesktopIconItem } from '../../types/window';
import { DesktopIcon } from './DesktopIcon';
import { DesktopContextMenu, IconSizeType, SortType } from './DesktopContextMenu';
import { FloatingAIWidget } from './FloatingAIWidget';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useWindowStore } from '../../store/useWindowStore';
import { useSearchStore } from '../../store/useSearchStore';
import { profileData } from '../../data/profile';
import { soundEngine } from '../../utils/soundEngine';
import { getWindowsIcon } from '../icons/WindowsIcons';
import { MousePointer2, X, Search, Sparkles, User } from 'lucide-react';

const DESKTOP_ITEMS: DesktopIconItem[] = [
  { id: 'about', title: 'This PC', iconName: 'User', category: 'core' },
  { id: 'ai-assistant', title: 'Ask Vinay AI', iconName: 'Bot', badge: 'AI', category: 'tools' },
  { id: 'projects', title: 'Projects Explorer', iconName: 'FolderGit2', badge: '5', category: 'work' },
  { id: 'skills', title: 'Skills & Stack', iconName: 'Cpu', category: 'tools' },
  { id: 'experience', title: 'Experience', iconName: 'Briefcase', category: 'work' },
  { id: 'achievements', title: 'Achievements', iconName: 'Trophy', badge: '6', category: 'work' },
  { id: 'resume', title: 'Resume PDF', iconName: 'FileText', category: 'work' },
  { id: 'contact', title: 'Contact Direct', iconName: 'Mail', category: 'core' },
  { id: 'terminal', title: 'Terminal Shell', iconName: 'Terminal', category: 'tools' },
  { id: 'browser', title: 'Browser Demo', iconName: 'Globe', category: 'tools' },
  { id: 'arcade', title: 'Avinya Arcade', iconName: 'Gamepad2', badge: 'GAME', category: 'tools' },
  { id: 'architecture', title: 'System Graph', iconName: 'Network', badge: 'NEW', category: 'work' },
  { id: 'settings', title: 'Settings', iconName: 'Sliders', category: 'system' }
];

const DEFAULT_POSITIONS: Record<string, { x: number; y: number }> = {
  about: { x: 24, y: 20 },
  'ai-assistant': { x: 24, y: 120 },
  projects: { x: 24, y: 220 },
  skills: { x: 24, y: 320 },
  experience: { x: 24, y: 420 },

  achievements: { x: 140, y: 20 },
  resume: { x: 140, y: 120 },
  contact: { x: 140, y: 220 },
  terminal: { x: 140, y: 320 },
  browser: { x: 140, y: 420 },

  arcade: { x: 256, y: 20 },
  architecture: { x: 256, y: 120 },
  settings: { x: 256, y: 220 }
};

const POSITIONS_STORAGE_KEY = 'avinya_os_desktop_icon_positions_v3';

export const DesktopGrid: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [iconSize, setIconSize] = useState<IconSizeType>('medium');
  const [sortType, setSortType] = useState<SortType>('name');

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; isOpen: boolean }>({
    x: 0,
    y: 0,
    isOpen: false
  });

  // Movable icon positions state
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    try {
      const saved = localStorage.getItem(POSITIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const sanitized: Record<string, { x: number; y: number }> = {};
        Object.keys(parsed).forEach((key) => {
          sanitized[key] = {
            x: Math.max(10, Math.min(parsed[key].x, window.innerWidth - 110)),
            y: Math.max(10, Math.min(parsed[key].y, 480))
          };
        });
        return sanitized;
      }
    } catch (e) {
      console.warn('Failed to parse saved icon positions', e);
    }
    return DEFAULT_POSITIONS;
  });

  // Selection Marquee Rubber Band Box State
  const [isSelecting, setIsSelecting] = useState(false);
  const [marquee, setMarquee] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);

  const onboardingDismissed = useSettingsStore((s) => s.onboardingDismissed);
  const dismissOnboarding = useSettingsStore((s) => s.dismissOnboarding);

  const openWindow = useWindowStore((s) => s.openWindow);
  const windows = useWindowStore((s) => s.windows);
  const openSearch = useSearchStore((s) => s.openSearch);

  const containerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Save icon positions whenever updated
  const updatePosition = (id: string, x: number, y: number) => {
    setIconPositions((prev) => {
      const next = { ...prev, [id]: { x, y } };
      try {
        localStorage.setItem(POSITIONS_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save icon position', e);
      }
      return next;
    });
  };

  const handleAutoArrange = () => {
    soundEngine.playNotification();
    setIconPositions(DEFAULT_POSITIONS);
    localStorage.removeItem(POSITIONS_STORAGE_KEY);
  };

  const handleSortByName = () => {
    setSortType('name');
    soundEngine.playNotification();
    const sorted = [...DESKTOP_ITEMS].sort((a, b) => a.title.localeCompare(b.title));
    rearrangeSortedList(sorted);
  };

  const handleSortByType = () => {
    setSortType('type');
    soundEngine.playNotification();
    const categoryOrder: Record<string, number> = { core: 1, work: 2, tools: 3, system: 4 };
    const sorted = [...DESKTOP_ITEMS].sort((a, b) => {
      const catA = categoryOrder[a.category || 'tools'] || 5;
      const catB = categoryOrder[b.category || 'tools'] || 5;
      return catA - catB;
    });
    rearrangeSortedList(sorted);
  };

  const rearrangeSortedList = (sortedList: DesktopIconItem[]) => {
    const newPos: Record<string, { x: number; y: number }> = {};
    const itemsPerCol = 5;
    const colWidth = iconSize === 'large' ? 150 : iconSize === 'small' ? 110 : 130;
    const rowHeight = iconSize === 'large' ? 110 : iconSize === 'small' ? 90 : 100;

    sortedList.forEach((item, idx) => {
      const col = Math.floor(idx / itemsPerCol);
      const row = idx % itemsPerCol;
      newPos[item.id] = {
        x: 24 + col * colWidth,
        y: 20 + row * rowHeight
      };
    });

    setIconPositions(newPos);
    try {
      localStorage.setItem(POSITIONS_STORAGE_KEY, JSON.stringify(newPos));
    } catch (e) {
      console.warn('Failed to save sorted icon positions', e);
    }
  };

  // Global pointerup listener for marquee selection box cleanup
  useEffect(() => {
    if (!isSelecting) return;
    const handleGlobalPointerUp = () => {
      setIsSelecting(false);
      setMarquee(null);
    };
    window.addEventListener('pointerup', handleGlobalPointerUp);
    return () => window.removeEventListener('pointerup', handleGlobalPointerUp);
  }, [isSelecting]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'MAIN') {
      setSelectedId(null);
      setContextMenu((prev) => ({ ...prev, isOpen: false }));
      setIsSelecting(true);
      setMarquee({
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isSelecting && marquee) {
      setMarquee((prev) => (prev ? { ...prev, currentX: e.clientX, currentY: e.clientY } : null));
    }
  };

  const handlePointerUp = () => {
    setIsSelecting(false);
    setMarquee(null);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      isOpen: true
    });
  };

  const getMarqueeStyle = () => {
    if (!marquee) return {};
    const left = Math.min(marquee.startX, marquee.currentX);
    const top = Math.min(marquee.startY, marquee.currentY);
    const width = Math.abs(marquee.currentX - marquee.startX);
    const height = Math.abs(marquee.currentY - marquee.startY);
    return { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` };
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onContextMenu={handleContextMenu}
      className="relative w-full h-[calc(100vh-3.25rem)] select-none overflow-hidden"
    >
      {/* Onboarding hint banner */}
      {!onboardingDismissed && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 px-4 py-2 bg-slate-900/90 border border-sky-500/40 text-slate-200 rounded-full shadow-2xl backdrop-blur-md text-xs font-sans animate-bounce max-w-[90vw] text-center">
          <MousePointer2 className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="truncate">{isMobile ? 'Tap icons to open • Tap Start menu below' : 'Tip: Right-click desktop for options • Drag icons to arrange'}</span>
          <button
            onClick={dismissOnboarding}
            className="p-1 hover:text-white rounded-full hover:bg-white/10 shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* MOBILE NEXT-GEN GLASS OS LAUNCHER */}
      {isMobile ? (
        <div className="p-4 pt-12 space-y-4 overflow-y-auto max-h-[calc(100vh-6.5rem)] no-scrollbar z-20 relative">
          
          {/* Mobile Hero Profile & Quick Search Card */}
          <div className="p-4 rounded-3xl bg-slate-900/85 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {profileData.avatar ? (
                    <img
                      src={profileData.avatar}
                      alt={profileData.name}
                      className="w-11 h-11 rounded-2xl object-cover border border-cyan-400/50 shadow-md"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-bold text-lg">
                      V
                    </div>
                  )}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 shadow-[0_0_8px_#34d399] animate-pulse" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-bold text-sm text-white tracking-tight">{profileData.name}</h2>
                    <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-[9px] font-mono text-cyan-300 font-bold border border-cyan-500/30">
                      OS v2.6
                    </span>
                  </div>
                  <p className="text-[11px] text-cyan-400 font-mono font-medium">{profileData.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-400 font-mono">
                <span>● {profileData.status}</span>
              </div>
            </div>

            {/* Quick Search Launch Bar */}
            <button
              onClick={() => {
                soundEngine.playClick();
                openSearch();
              }}
              className="w-full px-3.5 py-2.5 bg-slate-950/90 border border-white/15 hover:border-cyan-400/60 rounded-2xl flex items-center justify-between text-xs text-slate-400 transition-all shadow-inner group cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="font-sans text-slate-300">Search apps, projects, commands...</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-cyan-300 font-mono border border-white/10">
                ⌘K
              </span>
            </button>
          </div>

          {/* Quick Launch Action Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'ai-assistant', label: '🤖 Ask AI', color: 'bg-purple-500/20 border-purple-400/40 text-purple-200' },
              { id: 'projects', label: '🚀 Projects (5)', color: 'bg-cyan-500/20 border-cyan-400/40 text-cyan-200' },
              { id: 'skills', label: '⚡ Tech Stack', color: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200' },
              { id: 'resume', label: '📄 Resume PDF', color: 'bg-amber-500/20 border-amber-400/40 text-amber-200' },
              { id: 'contact', label: '✉️ Contact', color: 'bg-sky-500/20 border-sky-400/40 text-sky-200' }
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => {
                  soundEngine.playClick();
                  openWindow(chip.id as any);
                }}
                className={`px-3 py-1.5 rounded-full border text-xs font-mono font-bold whitespace-nowrap transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer ${chip.color}`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Apps Section Header */}
          <div className="flex items-center justify-between px-1 pt-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Application Library
            </span>
            <span className="text-[10px] font-mono text-cyan-400 font-bold">{DESKTOP_ITEMS.length} APPS</span>
          </div>

          {/* Mobile App Grid - Glassmorphic Squircles */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {DESKTOP_ITEMS.map((item) => {
              const isOpen = !!windows[item.id]?.isOpen;
              return (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => {
                    soundEngine.playClick();
                    openWindow(item.id);
                  }}
                  className={`relative p-3 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all text-center group cursor-pointer shadow-lg ${
                    isOpen
                      ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.35)] ring-1 ring-cyan-400/40'
                      : 'bg-slate-900/70 border-white/10 hover:border-white/20 hover:bg-slate-900/90'
                  }`}
                >
                  {/* Badge Counter */}
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-cyan-500 text-[9px] font-mono font-bold text-slate-950 shadow-md z-10">
                      {item.badge}
                    </span>
                  )}

                  {/* Icon Graphic Container */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    {getWindowsIcon(item.id || item.iconName, 'w-7 h-7 filter drop-shadow')}
                  </div>

                  {/* Title Label */}
                  <span className="text-[11px] font-semibold text-slate-200 group-hover:text-cyan-200 line-clamp-1 leading-tight font-sans">
                    {item.title}
                  </span>

                  {/* Active Indicator Dot */}
                  {isOpen && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
                  )}
                </motion.button>
              );
            })}
          </div>

        </div>
      ) : (
        /* DESKTOP LAYOUT: Movable Drag-and-Drop Icons */
        DESKTOP_ITEMS.map((item) => {
          const pos = iconPositions[item.id] || DEFAULT_POSITIONS[item.id] || { x: 24, y: 24 };

          return (
            <motion.div
              key={item.id}
              drag
              dragConstraints={containerRef}
              dragElastic={0.05}
              dragMomentum={false}
              initial={{ x: pos.x, y: pos.y }}
              animate={{ x: pos.x, y: pos.y }}
              onDragEnd={(event, info) => {
                const bounds = containerRef.current?.getBoundingClientRect();
                const maxX = bounds ? bounds.width - 110 : window.innerWidth - 110;
                const maxY = bounds ? Math.min(bounds.height - 120, 480) : 480;

                const newX = Math.max(10, Math.min(maxX, pos.x + info.offset.x));
                const newY = Math.max(10, Math.min(maxY, pos.y + info.offset.y));

                updatePosition(item.id, newX, newY);
              }}
              whileDrag={{ scale: 1.1, zIndex: 900 }}
              className="absolute top-0 left-0 z-20 cursor-grab active:cursor-grabbing"
            >
              <DesktopIcon
                item={item}
                isSelected={selectedId === item.id}
                onSelect={(id) => setSelectedId(id)}
                iconSize={iconSize}
              />
            </motion.div>
          );
        })
      )}

      {/* Rubber Band Drag Marquee Selection Rectangle */}
      {isSelecting && marquee && (
        <div
          style={getMarqueeStyle()}
          className="fixed z-[8500] bg-sky-500/20 border border-sky-400/60 pointer-events-none rounded-xs"
        />
      )}

      {/* Floating Interactive 3D AI Hologram Widget */}
      <FloatingAIWidget />

      {/* Right Click Context Menu */}
      <DesktopContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        isOpen={contextMenu.isOpen}
        onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
        iconSize={iconSize}
        sortType={sortType}
        onSetIconSize={(sz) => {
          soundEngine.playClick();
          setIconSize(sz);
        }}
        onSortByName={handleSortByName}
        onSortByType={handleSortByType}
        onRefresh={handleAutoArrange}
      />
    </div>
  );
};
