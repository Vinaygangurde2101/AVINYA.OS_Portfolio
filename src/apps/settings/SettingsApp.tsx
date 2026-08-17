import React from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { wallpaperOptions } from '../../data/wallpapers';
import { Sliders, Volume2, VolumeX, Moon, Sparkles, Command, RotateCcw, ShieldCheck } from 'lucide-react';

export const SettingsApp: React.FC = () => {
  const wallpaperId = useSettingsStore((s) => s.wallpaperId);
  const setWallpaperId = useSettingsStore((s) => s.setWallpaperId);
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const setSoundEnabled = useSettingsStore((s) => s.setSoundEnabled);
  const volume = useSettingsStore((s) => s.volume);
  const setVolume = useSettingsStore((s) => s.setVolume);
  const reducedMotion = useSettingsStore((s) => s.reducedMotion);
  const setReducedMotion = useSettingsStore((s) => s.setReducedMotion);
  const clock24h = useSettingsStore((s) => s.clock24h);
  const setClock24h = useSettingsStore((s) => s.setClock24h);

  const handleResetLayout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-6 select-none font-sans text-xs">
      {/* Wallpaper Selection Section */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Desktop Wallpaper & Mesh Gradient
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {wallpaperOptions.map((wp) => (
            <button
              key={wp.id}
              onClick={() => setWallpaperId(wp.id)}
              className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                wallpaperId === wp.id
                  ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'bg-slate-950/60 border-white/10 hover:border-white/20 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-4 h-4 rounded-full border border-white/30"
                  style={{ backgroundColor: wp.accentColor }}
                />
                <div>
                  <div className="font-bold text-xs">{wp.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{wp.category}</div>
                </div>
              </div>
              {wallpaperId === wp.id && (
                <span className="text-[10px] font-mono text-cyan-400">Active</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Audio & Motion Preferences */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase text-cyan-400 flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            AUDIO FEEDBACK (SYNTH)
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">UI Sound Effects</span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                  soundEnabled ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    soundEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {soundEnabled && (
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Volume</span>
                  <span>{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            )}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase text-violet-400 flex items-center gap-2">
            <Moon className="w-4 h-4" />
            ACCESSIBILITY & TIME
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Reduced Motion</span>
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                  reducedMotion ? 'bg-violet-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    reducedMotion ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300">24-Hour Clock Format</span>
              <button
                onClick={() => setClock24h(!clock24h)}
                className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                  clock24h ? 'bg-violet-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    clock24h ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Keyboard Shortcuts Guide */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase text-slate-300 flex items-center gap-2">
          <Command className="w-4 h-4 text-cyan-400" />
          KEYBOARD SHORTCUTS REFERENCE
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-slate-300">
          <div className="p-2 rounded bg-slate-950/60 border border-white/5 flex items-center justify-between">
            <span>Global App Search</span>
            <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 text-[10px]">⌘K / Ctrl+K</kbd>
          </div>
          <div className="p-2 rounded bg-slate-950/60 border border-white/5 flex items-center justify-between">
            <span>Close Active Modal</span>
            <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 text-[10px]">ESC</kbd>
          </div>
          <div className="p-2 rounded bg-slate-950/60 border border-white/5 flex items-center justify-between">
            <span>Clear Terminal Screen</span>
            <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 text-[10px]">Ctrl + L</kbd>
          </div>
          <div className="p-2 rounded bg-slate-950/60 border border-white/5 flex items-center justify-between">
            <span>Command History</span>
            <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 text-[10px]">↑ / ↓ Arrows</kbd>
          </div>
        </div>
      </div>

      {/* Reset Layout Action */}
      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-rose-300">Reset OS Preferences</h4>
          <p className="text-[11px] text-slate-400">Clears saved theme & window positions in local storage.</p>
        </div>
        <button
          onClick={handleResetLayout}
          className="px-3.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 border border-rose-500/40 font-mono text-xs flex items-center gap-1.5 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Layout</span>
        </button>
      </div>
    </div>
  );
};
