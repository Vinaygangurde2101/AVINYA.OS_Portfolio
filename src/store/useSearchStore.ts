import { create } from 'zustand';
import { soundEngine } from '../utils/soundEngine';

interface SearchState {
  isOpen: boolean;
  query: string;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  setQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  isOpen: false,
  query: '',

  openSearch: () => {
    soundEngine.playClick();
    set({ isOpen: true, query: '' });
  },

  closeSearch: () => {
    set({ isOpen: false, query: '' });
  },

  toggleSearch: () => {
    const next = !get().isOpen;
    if (next) soundEngine.playClick();
    set({ isOpen: next, query: '' });
  },

  setQuery: (query) => set({ query })
}));
