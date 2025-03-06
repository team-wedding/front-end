import { create } from 'zustand';

type Mode = 'light' | 'dark';

interface DarkModeState {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  mode: (localStorage.getItem('darkMode') as Mode) || 'light',
  setMode: (mode) => {
    localStorage.setItem('darkMode', mode);
    set({ mode });
  },
}));
