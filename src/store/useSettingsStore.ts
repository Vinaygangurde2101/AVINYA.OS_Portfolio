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

  setTheme: (theme: OSTheme) => void;
  setWallpaperId: (id: string) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setVolume: (vol: number) => void;
  setReducedMotion: (reduced: boolean) => void;
  setClock24h: (is24: boolean) => void;
  dismissOnboarding: () => void;
  toggleStartMenu: () => void;
  setStartMenuOpen: (open: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: getItem<OSTheme>('avinya_theme', 'midnight'),
  wallpaperId: getItem<string>('avinya_wallpaper', 'win11-bloom'),
  soundEnabled: getItem<boolean>('avinya_sound_enabled', false),
  volume: getItem<number>('avinya_sound_vol', 0.2),
  reducedMotion: getItem<boolean>('avinya_reduced_motion', false),
  clock24h: getItem<boolean>('avinya_clock_24h', false),
  onboardingDismissed: getItem<boolean>('avinya_onboarding_dismissed', false),
  startMenuOpen: false,

  setTheme: (theme) => {
    setItem('avinya_theme', theme);
    set({ theme });
  },

  setWallpaperId: (wallpaperId) => {
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
  }
}));
