import React, { useState, useEffect } from 'react';
import { BootScreen } from './components/boot/BootScreen';
import { Desktop } from './components/desktop/Desktop';
import { WindowManager } from './components/window/WindowManager';
import { Taskbar } from './components/taskbar/Taskbar';
import { CommandPalette } from './components/search/CommandPalette';
import { soundEngine } from './utils/soundEngine';

export const App: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);

  // Konami Code Easter Egg Listener (Up, Up, Down, Down, Left, Right, Left, Right, B, A)
  useEffect(() => {
    const konamiSequence = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a'
    ];
    let keyIdx = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = konamiSequence[keyIdx].toLowerCase();

      if (key === expected) {
        keyIdx++;
        if (keyIdx === konamiSequence.length) {
          setKonamiActive(true);
          soundEngine.playNotification();
          keyIdx = 0;
          setTimeout(() => setKonamiActive(false), 15000);
        }
      } else {
        keyIdx = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05070d] text-slate-100 select-none">
      {!isBooted && <BootScreen onComplete={() => setIsBooted(true)} />}

      {isBooted && (
        <>
          <Desktop />
          <WindowManager />
          <Taskbar />
          <CommandPalette />

          {/* Konami Easter Egg Matrix Rain Canvas */}
          {konamiActive && (
            <div className="fixed inset-0 pointer-events-none z-[9998] bg-emerald-950/20 backdrop-blur-xs flex items-center justify-center">
              <div className="text-emerald-400 font-mono text-xl sm:text-2xl font-bold p-6 bg-slate-950/90 border border-emerald-500/40 rounded-2xl shadow-2xl animate-pulse">
                💚 KONAMI MATRIX CODE ACTIVATED! 💚
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
