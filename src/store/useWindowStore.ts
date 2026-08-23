import { create } from 'zustand';
import { AppId, WindowState } from '../types/window';
import { soundEngine } from '../utils/soundEngine';

interface AppDefaults {
  title: string;
  icon: string;
  defaultWidth: number;
  defaultHeight: number;
}

const DEFAULT_APPS: Record<AppId, AppDefaults> = {
  about: { title: 'About Me', icon: 'User', defaultWidth: 840, defaultHeight: 620 },
  projects: { title: 'Projects Explorer', icon: 'FolderGit2', defaultWidth: 920, defaultHeight: 650 },
  'project-details': { title: 'Case Study Details', icon: 'FileCode2', defaultWidth: 880, defaultHeight: 680 },
  skills: { title: 'Skills & Stack', icon: 'Cpu', defaultWidth: 860, defaultHeight: 600 },
  experience: { title: 'Experience Timeline', icon: 'Briefcase', defaultWidth: 840, defaultHeight: 640 },
  achievements: { title: 'Achievements & Badges', icon: 'Trophy', defaultWidth: 820, defaultHeight: 580 },
  resume: { title: 'Resume Document', icon: 'FileText', defaultWidth: 850, defaultHeight: 690 },
  contact: { title: 'Contact Direct', icon: 'Mail', defaultWidth: 880, defaultHeight: 660 },
  terminal: { title: 'Terminal Shell', icon: 'Terminal', defaultWidth: 780, defaultHeight: 520 },
  browser: { title: 'Browser Sandbox', icon: 'Globe', defaultWidth: 960, defaultHeight: 660 },
  settings: { title: 'System Settings', icon: 'Sliders', defaultWidth: 700, defaultHeight: 540 },
  'ai-assistant': { title: 'Vinay AI Assistant', icon: 'Bot', defaultWidth: 860, defaultHeight: 640 },
  arcade: { title: 'Avinya Arcade', icon: 'Gamepad2', defaultWidth: 880, defaultHeight: 620 },
  architecture: { title: 'System Architecture Graph', icon: 'Network', defaultWidth: 920, defaultHeight: 660 }
};

interface WindowStore {
  windows: Record<string, WindowState>;
  highestZIndex: number;
  activeWindowId: string | null;

  openWindow: (id: AppId | string, customProps?: Record<string, any>, customTitle?: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  toggleWindow: (id: AppId | string) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: {},
  highestZIndex: 100,
  activeWindowId: null,

  openWindow: (id, customProps, customTitle) => {
    const state = get();
    const existing = state.windows[id];

    soundEngine.playWindowOpen();

    if (existing) {
      // If already exists, un-minimize if needed and bring to front
      const nextZ = state.highestZIndex + 1;
      set({
        windows: {
          ...state.windows,
          [id]: {
            ...existing,
            isMinimized: false,
            zIndex: nextZ,
            isOpen: true,
            componentProps: customProps ? { ...existing.componentProps, ...customProps } : existing.componentProps,
            title: customTitle || existing.title
          }
        },
        highestZIndex: nextZ,
        activeWindowId: id
      });
      return;
    }

    // Determine default app configuration
    const baseAppId = (id.includes(':') ? id.split(':')[0] : id) as AppId;
    const config = DEFAULT_APPS[baseAppId] || {
      title: customTitle || 'Application',
      icon: 'AppWindow',
      defaultWidth: 800,
      defaultHeight: 560
    };

    // Calculate smart initial offset so new windows open centered and upward in the viewport
    const openWindows = Object.values(state.windows).filter((w) => w.isOpen && !w.isMinimized);
    const windowCount = openWindows.length;
    const offset = (windowCount % 5) * 24;
    const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const viewportH = typeof window !== 'undefined' ? window.innerHeight : 800;

    const width = Math.min(config.defaultWidth, viewportW - 40);
    const height = Math.min(config.defaultHeight, viewportH - 120);

    const initialX = Math.max(20, Math.min((viewportW - width) / 2 + offset, viewportW - width - 20));
    const initialY = Math.max(45, Math.min((viewportH - height) / 3.2 + offset, viewportH - height - 70));

    const nextZ = state.highestZIndex + 1;

    const newWindow: WindowState = {
      id,
      title: customTitle || config.title,
      icon: config.icon,
      position: { x: initialX, y: initialY },
      size: { width, height },
      zIndex: nextZ,
      isMinimized: false,
      isMaximized: false,
      isOpen: true,
      componentProps: customProps
    };

    set({
      windows: { ...state.windows, [id]: newWindow },
      highestZIndex: nextZ,
      activeWindowId: id
    });
  },

  closeWindow: (id) => {
    const state = get();
    const target = state.windows[id];
    if (!target) return;

    soundEngine.playWindowMinimize();

    const { [id]: removed, ...remaining } = state.windows;

    // Find new active window if closed window was active
    let newActiveId: string | null = null;
    if (state.activeWindowId === id) {
      const openRemaining = Object.values(remaining).filter((w) => w.isOpen && !w.isMinimized);
      if (openRemaining.length > 0) {
        openRemaining.sort((a, b) => b.zIndex - a.zIndex);
        newActiveId = openRemaining[0].id;
      }
    } else {
      newActiveId = state.activeWindowId;
    }

    set({
      windows: remaining,
      activeWindowId: newActiveId
    });
  },

  minimizeWindow: (id) => {
    const state = get();
    const target = state.windows[id];
    if (!target) return;

    soundEngine.playWindowMinimize();

    set({
      windows: {
        ...state.windows,
        [id]: { ...target, isMinimized: true }
      },
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
    });
  },

  maximizeWindow: (id) => {
    const state = get();
    const target = state.windows[id];
    if (!target) return;

    const nextZ = state.highestZIndex + 1;
    set({
      windows: {
        ...state.windows,
        [id]: { ...target, isMaximized: !target.isMaximized, zIndex: nextZ, isMinimized: false }
      },
      highestZIndex: nextZ,
      activeWindowId: id
    });
  },

  restoreWindow: (id) => {
    const state = get();
    const target = state.windows[id];
    if (!target) return;

    soundEngine.playWindowOpen();

    const nextZ = state.highestZIndex + 1;
    set({
      windows: {
        ...state.windows,
        [id]: { ...target, isMinimized: false, zIndex: nextZ }
      },
      highestZIndex: nextZ,
      activeWindowId: id
    });
  },

  focusWindow: (id) => {
    const state = get();
    const target = state.windows[id];
    if (!target) return;

    if (state.activeWindowId === id && !target.isMinimized) return;

    const nextZ = state.highestZIndex + 1;
    set({
      windows: {
        ...state.windows,
        [id]: { ...target, zIndex: nextZ, isMinimized: false }
      },
      highestZIndex: nextZ,
      activeWindowId: id
    });
  },

  updatePosition: (id, position) => {
    const state = get();
    const target = state.windows[id];
    if (!target) return;

    set({
      windows: {
        ...state.windows,
        [id]: { ...target, position }
      }
    });
  },

  updateSize: (id, size) => {
    const state = get();
    const target = state.windows[id];
    if (!target) return;

    set({
      windows: {
        ...state.windows,
        [id]: { ...target, size }
      }
    });
  },

  toggleWindow: (id) => {
    const state = get();
    const target = state.windows[id];

    if (!target || !target.isOpen) {
      state.openWindow(id);
    } else if (target.isMinimized) {
      state.restoreWindow(id);
    } else if (state.activeWindowId === id) {
      state.minimizeWindow(id);
    } else {
      state.focusWindow(id);
    }
  }
}));
