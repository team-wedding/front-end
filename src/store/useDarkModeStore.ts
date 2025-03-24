import { create } from 'zustand';

type Mode = 'light' | 'dark';

interface DarkModeState {
  mode: Mode;
  userSelected: boolean;
  setMode: (mode: Mode, userSelected?: boolean) => void;
  initializeMode: () => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  mode: 'light',
  userSelected: false,

  setMode: (mode, userSelected = true) => {
    if (typeof window !== 'undefined' && userSelected) {
      localStorage.setItem('darkMode', mode);
    }
    set({ mode, userSelected });
  },

  initializeMode: () => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('darkMode') as Mode | null;
    if (stored) {
      set({ mode: stored, userSelected: true });
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      set({ mode: prefersDark ? 'dark' : 'light', userSelected: false });
    }
  },
}));
