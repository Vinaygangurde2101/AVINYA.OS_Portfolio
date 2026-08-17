import React from 'react';
import { Minus, Square, Copy, X } from 'lucide-react';

interface WindowControlsProps {
  isMaximized: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

export const WindowControls: React.FC<WindowControlsProps> = ({
  isMaximized,
  onMinimize,
  onMaximize,
  onClose
}) => {
  return (
    <div className="flex items-center -mr-3 h-full">
      {/* Minimize */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMinimize();
        }}
        className="w-11 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        title="Minimize"
        aria-label="Minimize Window"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      {/* Maximize / Restore */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMaximize();
        }}
        className="w-11 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        title={isMaximized ? 'Restore' : 'Maximize'}
        aria-label="Maximize Window"
      >
        {isMaximized ? <Copy className="w-3 h-3" /> : <Square className="w-3 h-3" />}
      </button>

      {/* Close - Turns red on hover (#e81123) like real Windows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="w-11 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#e81123] rounded-tr-xl transition-colors"
        title="Close"
        aria-label="Close Window"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
