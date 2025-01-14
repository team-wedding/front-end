import { create } from 'zustand';

interface ThemeState {
  font: string;
  weight: string;
  backgroundColor: string;
  updateFont: (font: string) => void;
  updateWeight: (weight: string) => void;
  updateBackgroundColor: (backgroundColor: string) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  font: '',
  weight: '',
  backgroundColor: '',
  updateFont: (font: string) => set(() => ({ font: font })),
  updateWeight: (weight) => set(() => ({ weight: weight })),
  updateBackgroundColor: (backgroundColor) =>
    set(() => ({ backgroundColor: backgroundColor })),
}));

export default useThemeStore;
