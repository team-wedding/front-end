import { create } from 'zustand';

interface ThemeState {
  font: string;
  bigSize: boolean;
  setFont: (font: string) => void;
  updateSize: (size: boolean) => void;
  reset: () => void;
}

const initialState = {
  font: '',
  bigSize: false,
};

const useThemeStore = create<ThemeState>((set) => ({
  ...initialState,
  setFont: (font: string) => set(() => ({ font: font })),
  updateSize: (bigSize: boolean) => set(() => ({ bigSize: bigSize })),
  reset: () => set(() => initialState),
}));

export default useThemeStore;
