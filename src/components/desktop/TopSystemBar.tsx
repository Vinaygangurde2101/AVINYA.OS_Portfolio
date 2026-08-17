import React, { useState, useEffect } from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useSearchStore } from '../../store/useSearchStore';
import { profileData } from '../../data/profile';
import { Wifi, Battery, Search, Volume2, VolumeX, Sparkles } from 'lucide-react';

export const TopSystemBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');

  const toggleStartMenu = useSettingsStore((s) => s.toggleStartMenu);
  const clock24h = useSettingsStore((s) => s.clock24h);
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const setSoundEnabled = useSettingsStore((s) => s.setSoundEnabled);
  const openSearch = useSearchStore((s) => s.openSearch);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !clock24h
      };
      setTimeStr(now.toLocaleTimeString([], options));
      setDateStr(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [clock24h]);

  return (
    <header className="h-9 w-full bg-slate-950/80 backdrop-blur-md border-b border-white/10 px-4 flex items-center justify-between text-xs font-mono select-none z-[8000] text-slate-300">
      {/* Left: OS Name & Status */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleStartMenu}
          className="flex items-center gap-2 hover:text-cyan-400 transition-colors font-bold tracking-wider text-slate-100 px-2 py-1 rounded hover:bg-white/5 active:scale-95"
        >
          <span className="text-cyan-400 text-sm">◈</span>
          <span>{profileData.osName}</span>
        </button>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-sans font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {profileData.status}
        </span>
      </div>

      {/* Center: Search trigger prompt */}
      <button
        onClick={openSearch}
        className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-slate-400 hover:text-slate-200 transition-all text-[11px]"
      >
        <Search className="w-3.5 h-3.5 text-cyan-400" />
        <span>Search apps, projects, commands...</span>
        <kbd className="px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded text-[10px] border border-white/10 font-mono">
          ⌘K
        </kbd>
      </button>

      {/* Right: Indicators & Clock */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-1 hover:text-cyan-400 transition-colors rounded hover:bg-white/5"
          title={soundEnabled ? 'Mute System Audio' : 'Unmute System Audio'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
        </button>

        <div className="hidden sm:flex items-center gap-1.5 text-slate-400" title="Network Connection: Gigabit 1Gbps">
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
        </div>

        <div className="hidden sm:flex items-center gap-1 text-slate-400" title="Battery: 100% Charging">
          <Battery className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-[10px]">100%</span>
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <span className="hidden sm:inline text-slate-400 text-[11px]">{dateStr}</span>
          <span className="font-semibold text-slate-100 text-[11px]">{timeStr}</span>
        </div>
      </div>
    </header>
  );
};
