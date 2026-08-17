import { ReactNode } from 'react';

export type AppId =
  | 'about'
  | 'projects'
  | 'project-details'
  | 'skills'
  | 'experience'
  | 'achievements'
  | 'resume'
  | 'contact'
  | 'terminal'
  | 'browser'
  | 'settings'
  | 'ai-assistant'
  | 'arcade'
  | 'architecture';

export interface WindowState {
  id: AppId | string;
  title: string;
  icon: string; // Lucide icon name
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isOpen: boolean;
  componentProps?: Record<string, any>;
}

export interface DesktopIconItem {
  id: AppId;
  title: string;
  iconName: string;
  badge?: string | number;
  category?: 'core' | 'work' | 'tools' | 'system';
}
