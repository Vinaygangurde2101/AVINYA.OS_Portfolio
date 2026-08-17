import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useWindowStore } from '../../store/useWindowStore';
import {
  Wifi,
  Bluetooth,
  Plane,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Battery,
  Settings,
  BatteryCharging
} from 'lucide-react';

interface QuickSettingsFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSettingsFlyout: React.FC<QuickSettingsFlyoutProps> = ({ isOpen, onClose }) => {
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const setSoundEnabled = useSettingsStore((s) => s.setSoundEnabled);
  const volume = useSettingsStore((s) => s.volume);
  const setVolume = useSettingsStore((s) => s.setVolume);
  const openWindow = useWindowStore((s) => s.openWindow);

  // Quick settings toggles states
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [airplaneOn, setAirplaneOn] = useState(false);
  const [nightLight, setNightLight] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [brightness, setBrightness] = useState(0.85);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ type: 'spring', damping: 24, stiffness: 360 }}
          className="fixed bottom-14 right-3 z-[9500] w-80 p-4 rounded-2xl bg-slate-900/95 border border-white/15 shadow-2xl backdrop-blur-3xl text-slate-100 font-sans select-none"
        >
          {/* Quick Toggle Buttons 3x2 Grid */}
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {/* Wi-Fi */}
            <button
              onClick={() => setWifiOn(!wifiOn)}
              className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-medium ${
                wifiOn
                  ? 'bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.35)]'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              <Wifi className="w-5 h-5" />
              <span className="text-[11px] font-semibold">{wifiOn ? 'Wi-Fi' : 'Off'}</span>
            </button>

            {/* Bluetooth */}
            <button
              onClick={() => setBluetoothOn(!bluetoothOn)}
              className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-medium ${
                bluetoothOn
                  ? 'bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.35)]'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              <Bluetooth className="w-5 h-5" />
              <span className="text-[11px] font-semibold">{bluetoothOn ? 'Bluetooth' : 'Off'}</span>
            </button>

            {/* Airplane Mode */}
            <button
              onClick={() => setAirplaneOn(!airplaneOn)}
              className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-medium ${
                airplaneOn
                  ? 'bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.35)]'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              <Plane className="w-5 h-5" />
              <span className="text-[11px] font-semibold">Airplane</span>
            </button>

            {/* Night Light */}
            <button
              onClick={() => setNightLight(!nightLight)}
              className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-medium ${
                nightLight
                  ? 'bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.35)]'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              <Moon className="w-5 h-5" />
              <span className="text-[11px] font-semibold">Night light</span>
            </button>

            {/* Dark Theme */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-medium ${
                darkMode
                  ? 'bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.35)]'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              <Sun className="w-5 h-5" />
              <span className="text-[11px] font-semibold">Dark mode</span>
            </button>

            {/* Sound Mute */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-medium ${
                soundEnabled
                  ? 'bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.35)]'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              <span className="text-[11px] font-semibold">{soundEnabled ? 'Audio' : 'Muted'}</span>
            </button>
          </div>

          {/* Volume Slider */}
          <div className="space-y-3 p-3 rounded-xl bg-white/5 border border-white/10 mb-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setSoundEnabled(!soundEnabled)}>
                {soundEnabled ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={soundEnabled ? volume : 0}
                onChange={(e) => {
                  if (!soundEnabled) setSoundEnabled(true);
                  setVolume(parseFloat(e.target.value));
                }}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <span className="text-xs font-mono text-slate-300 w-8 text-right">
                {soundEnabled ? `${Math.round(volume * 100)}%` : '0%'}
              </span>
            </div>

            {/* Brightness Slider */}
            <div className="flex items-center gap-3">
              <Sun className="w-4 h-4 text-sky-400" />
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.05"
                value={brightness}
                onChange={(e) => setBrightness(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <span className="text-xs font-mono text-slate-300 w-8 text-right">
                {Math.round(brightness * 100)}%
              </span>
            </div>
          </div>

          {/* Bottom Bar: Battery & Settings Shortcut */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2 font-mono">
              <BatteryCharging className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-slate-200">100% Charging</span>
            </div>

            <button
              onClick={() => {
                openWindow('settings');
                onClose();
              }}
              className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="All Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
