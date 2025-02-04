import { create } from 'zustand';

interface ThemeState {
  font: string;
  fontIndex: number;
  bigSize: boolean;
  setFont: (font: string, fontIndex: number) => void;
  updateSize: (size: boolean) => void;
  reset: () => void;
}

const initialState = {
  font: 'Mapo',
  fontIndex: 0,
  bigSize: false,
};

const useThemeStore = create<ThemeState>((set) => ({
  ...initialState,
  setFont: (font: string, fontIndex: number) =>
    set(() => ({ font, fontIndex })),
  updateSize: (bigSize: boolean) => set(() => ({ bigSize: bigSize })),
  reset: () => set(() => initialState),
}));

export default useThemeStore;
