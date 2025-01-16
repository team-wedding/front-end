import { create } from 'zustand';

interface ThemeState {
  font: string;
  weight: string;
  backgroundColor: string;
  setFont: (font: string) => void;
  setWeight: (weight: string) => void;
  setBackgroundColor: (backgroundColor: string) => void;
  reset: () => void;
}

const initialState = {
  font: '',
  weight: '',
  backgroundColor: '',
};

const usePersonStore = create<ThemeState>((set) => ({
  ...initialState,
  setFont: (font: string) => set(() => ({ font: font })),
  setWeight: (weight) => set(() => ({ weight: weight })),
  setBackgroundColor: (backgroundColor) =>
    set(() => ({ backgroundColor: backgroundColor })),
  reset: () => set(() => initialState),
}));

export default usePersonStore;
