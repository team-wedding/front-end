import { create } from 'zustand';

interface ThemeState {
  font: string;
  // weight: string;
  // backgroundColor: string;
  size: string;
  updateFont: (font: string) => void;
  updateSize: (size: string) => void;
  // updateWeight: (weight: string) => void;
  // updateBackgroundColor: (backgroundColor: string) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  font: '',
  size: '',
  //weight: '',
  // backgroundColor: '',
  updateFont: (font: string) => set(() => ({ font: font })),
  updateSize: (size: string) => set(() => ({ size: size })),
  // updateWeight: (weight) => set(() => ({ weight: weight })),
  // updateBackgroundColor: (backgroundColor) =>
  //   set(() => ({ backgroundColor: backgroundColor })),
}));

export default useThemeStore;
