import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DesktopIconItem } from '../../types/window';
import { DesktopIcon } from './DesktopIcon';
import { DesktopContextMenu, IconSizeType, SortType } from './DesktopContextMenu';
import { FloatingAIWidget } from './FloatingAIWidget';
import { useSettingsStore } from '../../store/useSettingsStore';
import { soundEngine } from '../../utils/soundEngine';
import { MousePointer2, X } from 'lucide-react';

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
  about: { x: 24, y: 24 },
  'ai-assistant': { x: 24, y: 236 },
  projects: { x: 24, y: 448 },
  skills: { x: 140, y: 24 },
  experience: { x: 140, y: 236 },
  achievements: { x: 140, y: 448 },
  resume: { x: 256, y: 24 },
  contact: { x: 256, y: 236 },
  terminal: { x: 256, y: 448 },
  browser: { x: 372, y: 24 },
  arcade: { x: 372, y: 236 },
  architecture: { x: 372, y: 448 },
  settings: { x: 488, y: 24 }
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
            y: Math.max(10, Math.min(parsed[key].y, 460))
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

  const containerRef = useRef<HTMLDivElement>(null);

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
    const itemsPerCol = 3;
    const colWidth = iconSize === 'large' ? 150 : iconSize === 'small' ? 110 : 130;
    const rowHeight = iconSize === 'large' ? 220 : iconSize === 'small' ? 190 : 212;

    sortedList.forEach((item, idx) => {
      const col = Math.floor(idx / itemsPerCol);
      const row = idx % itemsPerCol;
      newPos[item.id] = {
        x: 24 + col * colWidth,
        y: 24 + row * rowHeight
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
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 px-4 py-2 bg-slate-900/90 border border-sky-500/40 text-slate-200 rounded-full shadow-2xl backdrop-blur-md text-xs font-sans animate-bounce">
          <MousePointer2 className="w-4 h-4 text-sky-400" />
          <span>Tip: Right-click desktop for options • Drag icons to arrange</span>
          <button
            onClick={dismissOnboarding}
            className="p-1 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Movable Desktop Icons */}
      {DESKTOP_ITEMS.map((item) => {
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
              const maxY = bounds ? Math.min(bounds.height - 130, 460) : 460;

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
      })}

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
