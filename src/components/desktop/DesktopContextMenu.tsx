import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../../store/useWindowStore';
import { soundEngine } from '../../utils/soundEngine';
import {
  Grid,
  ArrowUpDown,
  RefreshCw,
  FolderPlus,
  Monitor,
  Palette,
  Terminal,
  ChevronRight,
  FileText,
  Check,
  Bot,
  Sparkles
} from 'lucide-react';

export type IconSizeType = 'small' | 'medium' | 'large';
export type SortType = 'name' | 'type';

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  iconSize: IconSizeType;
  sortType: SortType;
  onSetIconSize: (size: IconSizeType) => void;
  onSortByName: () => void;
  onSortByType: () => void;
  onRefresh: () => void;
}

export const DesktopContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  isOpen,
  onClose,
  iconSize,
  sortType,
  onSetIconSize,
  onSortByName,
  onSortByType,
  onRefresh
}) => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const menuRef = useRef<HTMLDivElement>(null);

  const [activeSubmenu, setActiveSubmenu] = useState<'view' | 'sort' | 'new' | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
        setActiveSubmenu(null);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', onClose, { capture: true });
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', onClose, { capture: true } as any);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const adjustedX = Math.min(x, window.innerWidth - 240);
  const adjustedY = Math.min(y, window.innerHeight - 360);

  const handleAction = (action: () => void) => {
    soundEngine.playClick();
    action();
    onClose();
    setActiveSubmenu(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95, y: 5 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
        style={{ top: `${adjustedY}px`, left: `${adjustedX}px` }}
        className="fixed z-[9990] w-56 p-1.5 rounded-xl bg-slate-900/95 backdrop-blur-3xl border border-white/15 shadow-2xl text-xs text-slate-200 select-none font-sans"
      >
        <div className="space-y-0.5">
          {/* View Submenu Option */}
          <div onMouseEnter={() => setActiveSubmenu('view')} className="relative">
            <button className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-left group">
              <span className="flex items-center gap-2.5">
                <Grid className="w-4 h-4 text-slate-400 group-hover:text-sky-400" />
                <span>View</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {activeSubmenu === 'view' && (
              <div className="absolute left-full top-0 ml-1 w-44 p-1.5 rounded-xl bg-slate-900/95 border border-white/15 shadow-2xl backdrop-blur-3xl space-y-0.5 z-[9995]">
                <button
                  onClick={() => handleAction(() => onSetIconSize('large'))}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white/10 text-left"
                >
                  <span>Large icons</span>
                  {iconSize === 'large' && <Check className="w-3.5 h-3.5 text-sky-400" />}
                </button>
                <button
                  onClick={() => handleAction(() => onSetIconSize('medium'))}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white/10 text-left"
                >
                  <span>Medium icons</span>
                  {iconSize === 'medium' && <Check className="w-3.5 h-3.5 text-sky-400" />}
                </button>
                <button
                  onClick={() => handleAction(() => onSetIconSize('small'))}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white/10 text-left"
                >
                  <span>Small icons</span>
                  {iconSize === 'small' && <Check className="w-3.5 h-3.5 text-sky-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Sort Submenu Option */}
          <div onMouseEnter={() => setActiveSubmenu('sort')} className="relative">
            <button className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-left group">
              <span className="flex items-center gap-2.5">
                <ArrowUpDown className="w-4 h-4 text-slate-400 group-hover:text-sky-400" />
                <span>Sort by</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {activeSubmenu === 'sort' && (
              <div className="absolute left-full top-0 ml-1 w-44 p-1.5 rounded-xl bg-slate-900/95 border border-white/15 shadow-2xl backdrop-blur-3xl space-y-0.5 z-[9995]">
                <button
                  onClick={() => handleAction(onSortByName)}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white/10 text-left"
                >
                  <span>Name (Alphabetical)</span>
                  {sortType === 'name' && <Check className="w-3.5 h-3.5 text-sky-400" />}
                </button>
                <button
                  onClick={() => handleAction(onSortByType)}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white/10 text-left"
                >
                  <span>Item Type / Category</span>
                  {sortType === 'type' && <Check className="w-3.5 h-3.5 text-sky-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Auto-arrange / Refresh */}
          <button
            onMouseEnter={() => setActiveSubmenu(null)}
            onClick={() => handleAction(onRefresh)}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-left group"
          >
            <RefreshCw className="w-4 h-4 text-slate-400 group-hover:text-sky-400" />
            <span>Auto-arrange icons</span>
          </button>

          <div className="my-1 h-[1px] bg-white/10" />

          {/* New Submenu Option */}
          <div onMouseEnter={() => setActiveSubmenu('new')} className="relative">
            <button className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-left group">
              <span className="flex items-center gap-2.5">
                <FolderPlus className="w-4 h-4 text-amber-400" />
                <span>New</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {activeSubmenu === 'new' && (
              <div className="absolute left-full top-0 ml-1 w-48 p-1.5 rounded-xl bg-slate-900/95 border border-white/15 shadow-2xl backdrop-blur-3xl space-y-0.5 z-[9995]">
                <button
                  onClick={() => handleAction(() => openWindow('projects'))}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 text-left"
                >
                  <FolderPlus className="w-4 h-4 text-amber-400" />
                  <span>Projects Folder</span>
                </button>
                <button
                  onClick={() => handleAction(() => openWindow('ai-assistant'))}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 text-left"
                >
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>AI Conversation</span>
                </button>
                <button
                  onClick={() => handleAction(() => openWindow('resume'))}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 text-left"
                >
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>Resume Document</span>
                </button>
              </div>
            )}
          </div>

          <div className="my-1 h-[1px] bg-white/10" />

          {/* Open Terminal */}
          <button
            onMouseEnter={() => setActiveSubmenu(null)}
            onClick={() => handleAction(() => openWindow('terminal'))}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-left group"
          >
            <Terminal className="w-4 h-4 text-sky-400" />
            <span>Open in Terminal</span>
          </button>

          {/* Display settings */}
          <button
            onMouseEnter={() => setActiveSubmenu(null)}
            onClick={() => handleAction(() => openWindow('settings'))}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-left group"
          >
            <Monitor className="w-4 h-4 text-slate-400 group-hover:text-sky-400" />
            <span>Display settings</span>
          </button>

          {/* Personalize */}
          <button
            onMouseEnter={() => setActiveSubmenu(null)}
            onClick={() => handleAction(() => openWindow('settings'))}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-left group"
          >
            <Palette className="w-4 h-4 text-slate-400 group-hover:text-sky-400" />
            <span>Personalize</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
