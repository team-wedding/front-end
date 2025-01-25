import { create } from 'zustand';

interface ThemeState {
  font: string;
  size: string;
  setFont: (font: string) => void;
  updateSize: (size: string) => void;
  reset: () => void;
}

const initialState = {
  font: '',
  size: '',
};

const useThemeStore = create<ThemeState>((set) => ({
  ...initialState,
  setFont: (font: string) => set(() => ({ font: font })),
  updateSize: (size: string) => set(() => ({ size: size })),
  reset: () => set(() => initialState),
}));

export default useThemeStore;
