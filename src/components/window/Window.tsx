import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WindowState } from '../../types/window';
import { useWindowStore } from '../../store/useWindowStore';
import { WindowHeader } from './WindowHeader';

interface WindowProps {
  windowState: WindowState;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ windowState, children }) => {
  const {
    id,
    title,
    icon,
    position,
    size,
    zIndex,
    isMinimized,
    isMaximized,
    isOpen
  } = windowState;

  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition
  } = useWindowStore();

  const activeWindowId = useWindowStore((s) => s.activeWindowId);
  const isActive = activeWindowId === id;

  const [isMobile, setIsMobile] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const windowPosRef = useRef(position);

  useEffect(() => {
    windowPosRef.current = position;
  }, [position]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Title bar dragging handler
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMaximized || isMobile) return;
    focusWindow(id);

    isDraggingRef.current = true;
    dragStartPos.current = { x: e.clientX - windowPosRef.current.x, y: e.clientY - windowPosRef.current.y };

    let animationFrameId: number | null = null;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!isDraggingRef.current) return;
      
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const newX = Math.max(10, Math.min(window.innerWidth - size.width - 10, moveEvent.clientX - dragStartPos.current.x));
        const newY = Math.max(40, Math.min(window.innerHeight - 80, moveEvent.clientY - dragStartPos.current.y));
        updatePosition(id, { x: newX, y: newY });
      });
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // Window styling setup
  const isFullScreen = isMaximized || isMobile;

  const windowStyle: React.CSSProperties = isFullScreen
    ? {
        position: 'fixed',
        top: isMobile ? 36 : 36,
        left: 0,
        width: '100vw',
        height: isMobile ? 'calc(100dvh - 76px)' : 'calc(100vh - 84px)',
        zIndex
      }
    : {
        position: 'fixed',
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        zIndex
      };

  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{
            opacity: 0,
            scale: 0.92,
            y: 15,
            transition: { duration: 0.15, ease: 'easeOut' }
          }}
          transition={{ type: 'spring', damping: 28, stiffness: 380, mass: 0.8 }}
          style={windowStyle}
          onPointerDown={() => focusWindow(id)}
          className={`flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden glass-panel ${
            isActive
              ? 'glass-panel-active ring-1 ring-cyan-400/50 shadow-[0_25px_60px_rgba(0,0,0,0.7)] opacity-100'
              : 'opacity-90 shadow-xl border border-white/10'
          }`}
        >
          <WindowHeader
            title={title}
            iconName={icon}
            isMaximized={isMaximized}
            onMinimize={() => minimizeWindow(id)}
            onMaximize={() => maximizeWindow(id)}
            onClose={() => closeWindow(id)}
            onHeaderPointerDown={handlePointerDown}
          />

          <div
            className={`flex-1 overflow-hidden flex flex-col text-slate-100 font-sans ${
              id === 'ai-assistant' || (isMobile && id !== 'resume')
                ? 'p-0 bg-slate-950/90'
                : 'p-3 sm:p-6 bg-slate-950/60 overflow-y-auto'
            }`}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
