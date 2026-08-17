import React, { useState } from 'react';
import { useSettingsStore, OSTheme } from '../../store/useSettingsStore';
import { Sliders, Volume2, VolumeX, Moon, Sun, Monitor } from 'lucide-react';
import { wallpaperOptions } from '../../data/wallpapers';

export const SystemTray: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);
  const wallpaperId = useSettingsStore((s) => s.wallpaperId);
  const setWallpaperId = useSettingsStore((s) => s.setWallpaperId);
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const setSoundEnabled = useSettingsStore((s) => s.setSoundEnabled);
  const volume = useSettingsStore((s) => s.volume);
  const setVolume = useSettingsStore((s) => s.setVolume);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        title="Quick Control Center"
      >
        <Sliders className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 w-72 p-4 rounded-2xl glass-panel border border-white/15 shadow-2xl backdrop-blur-2xl text-slate-100 text-xs font-sans z-[9500]">
          <h4 className="font-semibold text-slate-200 mb-3 flex items-center justify-between">
            <span>Control Center</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[10px] text-slate-400 hover:text-white"
            >
              Done
            </button>
          </h4>

          {/* Sound Toggle & Slider */}
          <div className="space-y-2 mb-4 p-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-slate-300 flex items-center gap-2">
                {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                Audio Feedback
              </span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                  soundEnabled ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    soundEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {soundEnabled && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            )}
          </div>

          {/* Wallpaper Quick Switcher */}
          <div>
            <span className="font-mono text-[11px] text-slate-400 mb-2 block">Wallpaper Style</span>
            <div className="grid grid-cols-2 gap-2">
              {wallpaperOptions.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => setWallpaperId(wp.id)}
                  className={`p-2 rounded-lg border text-left text-[11px] font-mono transition-all flex items-center gap-2 ${
                    wallpaperId === wp.id
                      ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300'
                      : 'border-white/10 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ backgroundColor: wp.accentColor }}
                  />
                  <span className="truncate">{wp.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
