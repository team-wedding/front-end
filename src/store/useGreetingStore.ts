import { create } from 'zustand';

type StoreState = {
  title: string;
  greeting: string;
  setTitle: (title: string) => void;
  setGreeting: (greeting: string) => void;
  selectedSample: string | null;
  setSelectedSample: (sample: string) => void;
  reset: () => void;
};

const initialState = {
  title: '',
  greeting: '',
};

const useGreetingStore = create<StoreState>((set) => ({
  ...initialState,
  setTitle: (title) => set({ title }),
  setGreeting: (greeting) => set({ greeting }),
  selectedSample: null,
  setSelectedSample: (sample) => set({ selectedSample: sample }),
  reset: () => set(() => initialState),
}));

export default useGreetingStore;
