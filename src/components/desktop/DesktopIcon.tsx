import React from 'react';
import { DesktopIconItem } from '../../types/window';
import { useWindowStore } from '../../store/useWindowStore';
import { soundEngine } from '../../utils/soundEngine';
import { getWindowsIcon } from '../icons/WindowsIcons';
import { IconSizeType } from './DesktopContextMenu';
import { CornerUpRight } from 'lucide-react';

interface DesktopIconProps {
  item: DesktopIconItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  iconSize?: IconSizeType;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ item, isSelected, onSelect, iconSize = 'medium' }) => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const windows = useWindowStore((s) => s.windows);

  const isOpen = !!windows[item.id]?.isOpen;

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onSelect(item.id);
    soundEngine.playClick();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    openWindow(item.id);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    openWindow(item.id);
  };

  const getContainerDimensions = () => {
    switch (iconSize) {
      case 'small':
        return 'w-20 sm:w-22';
      case 'large':
        return 'w-28 sm:w-32';
      default:
        return 'w-24 sm:w-28';
    }
  };

  const getIconDimensions = () => {
    switch (iconSize) {
      case 'small':
        return 'w-8 h-8 sm:w-9 sm:h-9';
      case 'large':
        return 'w-14 h-14 sm:w-16 sm:h-16';
      default:
        return 'w-11 h-11 sm:w-13 sm:h-13';
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`Open ${item.title}`}
      onPointerDown={handlePointerDown}
      onDoubleClick={handleDoubleClick}
      onTouchEnd={handleTouchEnd}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openWindow(item.id);
        }
      }}
      className={`group relative flex flex-col items-center justify-center p-2 rounded transition-all duration-150 cursor-pointer outline-none ${getContainerDimensions()} text-center select-none ${
        isSelected
          ? 'bg-sky-500/25 border border-sky-400/50 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
          : 'hover:bg-white/10 border border-transparent hover:border-white/10'
      }`}
    >
      {/* Icon Graphic Container */}
      <div className="relative flex items-center justify-center transition-transform group-hover:scale-105">
        {getWindowsIcon(item.id || item.iconName, `${getIconDimensions()} filter drop-shadow-md`)}

        {/* Windows Shortcut Overlay Arrow Badge */}
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 bg-white/90 rounded-xs border border-slate-400 flex items-center justify-center shadow-xs">
          <CornerUpRight className="w-2.5 h-2.5 text-sky-700 stroke-[2.5]" />
        </div>

        {/* Badge counter if any */}
        {item.badge && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-4.5 px-1 rounded-full bg-sky-500 text-[10px] font-mono font-bold text-slate-950 shadow-md">
            {item.badge}
          </span>
        )}

        {/* Open indicator dot */}
        {isOpen && (
          <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
        )}
      </div>

      {/* Realistic Windows Text Label with Drop Shadow */}
      <span className="mt-1.5 text-[11px] sm:text-xs font-normal text-slate-100 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.95)] line-clamp-2 leading-snug tracking-wide group-hover:text-white">
        {item.title}
      </span>
    </div>
  );
};
