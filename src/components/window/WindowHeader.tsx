import React from 'react';
import { WindowControls } from './WindowControls';
import { getWindowsIcon } from '../icons/WindowsIcons';

interface WindowHeaderProps {
  title: string;
  iconName: string;
  isMaximized: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  onHeaderPointerDown?: (e: React.PointerEvent) => void;
}

export const WindowHeader: React.FC<WindowHeaderProps> = ({
  title,
  iconName,
  isMaximized,
  onMinimize,
  onMaximize,
  onClose,
  onHeaderPointerDown
}) => {
  return (
    <div
      onPointerDown={onHeaderPointerDown}
      onDoubleClick={onMaximize}
      className="h-10 px-3 bg-slate-900/95 border-b border-white/10 flex items-center justify-between select-none cursor-grab active:cursor-grabbing rounded-t-xl relative"
    >
      {/* Mobile Top Grab Bar Indicator Pill */}
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/25 sm:hidden pointer-events-none" />

      {/* App Icon & Title */}
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="flex items-center justify-center w-5 h-5">
          {getWindowsIcon(iconName, 'w-4 h-4 filter drop-shadow-xs')}
        </div>
        <span className="text-xs font-medium text-slate-200 font-sans tracking-wide truncate">
          {title}
        </span>
      </div>

      {/* Window Controls */}
      <WindowControls
        isMaximized={isMaximized}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
      />
    </div>
  );
};
