import { create } from 'zustand';
import { getItem, setItem } from '../utils/storage';
import { soundEngine } from '../utils/soundEngine';

export type OSTheme = 'midnight' | 'aurora' | 'cyberpunk' | 'monochrome' | 'emerald';

interface SettingsState {
  theme: OSTheme;
  wallpaperId: string;
  soundEnabled: boolean;
  volume: number;
  reducedMotion: boolean;
  clock24h: boolean;
  onboardingDismissed: boolean;
  startMenuOpen: boolean;
  videoWallpaperMuted: boolean;
  videoWallpaperReplayTrigger: number;
  videoFreezeLastFrame: boolean;

  setTheme: (theme: OSTheme) => void;
  setWallpaperId: (id: string) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setVolume: (vol: number) => void;
  setReducedMotion: (reduced: boolean) => void;
  setClock24h: (is24: boolean) => void;
  dismissOnboarding: () => void;
  toggleStartMenu: () => void;
  setStartMenuOpen: (open: boolean) => void;
  setVideoWallpaperMuted: (muted: boolean) => void;
  replayVideoWallpaper: () => void;
  setVideoFreezeLastFrame: (freeze: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: getItem<OSTheme>('avinya_theme', 'midnight'),
  wallpaperId: getItem<string>('avinya_wallpaper_v4', 'vinay-video-wallpaper'),
  soundEnabled: getItem<boolean>('avinya_sound_enabled', false),
  volume: getItem<number>('avinya_sound_vol', 0.2),
  reducedMotion: getItem<boolean>('avinya_reduced_motion', false),
  clock24h: getItem<boolean>('avinya_clock_24h', false),
  onboardingDismissed: getItem<boolean>('avinya_onboarding_dismissed', false),
  startMenuOpen: false,
  videoWallpaperMuted: getItem<boolean>('avinya_video_muted_v2', false),
  videoWallpaperReplayTrigger: 0,
  videoFreezeLastFrame: getItem<boolean>('avinya_video_freeze_last', true),

  setTheme: (theme) => {
    setItem('avinya_theme', theme);
    set({ theme });
  },

  setWallpaperId: (wallpaperId) => {
    setItem('avinya_wallpaper_v4', wallpaperId);
    setItem('avinya_wallpaper', wallpaperId);
    set({ wallpaperId });
  },

  setSoundEnabled: (soundEnabled) => {
    setItem('avinya_sound_enabled', soundEnabled);
    soundEngine.setMuted(!soundEnabled);
    set({ soundEnabled });
  },

  setVolume: (volume) => {
    setItem('avinya_sound_vol', volume);
    soundEngine.setVolume(volume);
    set({ volume });
  },

  setReducedMotion: (reducedMotion) => {
    setItem('avinya_reduced_motion', reducedMotion);
    set({ reducedMotion });
  },

  setClock24h: (clock24h) => {
    setItem('avinya_clock_24h', clock24h);
    set({ clock24h });
  },

  dismissOnboarding: () => {
    setItem('avinya_onboarding_dismissed', true);
    set({ onboardingDismissed: true });
  },

  toggleStartMenu: () => {
    soundEngine.playClick();
    set({ startMenuOpen: !get().startMenuOpen });
  },

  setStartMenuOpen: (startMenuOpen) => {
    set({ startMenuOpen });
  },

  setVideoWallpaperMuted: (videoWallpaperMuted) => {
    setItem('avinya_video_muted_v2', videoWallpaperMuted);
    set({ videoWallpaperMuted });
  },

  replayVideoWallpaper: () => {
    set((s) => ({ videoWallpaperReplayTrigger: s.videoWallpaperReplayTrigger + 1 }));
  },

  setVideoFreezeLastFrame: (videoFreezeLastFrame) => {
    setItem('avinya_video_freeze_last', videoFreezeLastFrame);
    set({ videoFreezeLastFrame });
  }
}));
