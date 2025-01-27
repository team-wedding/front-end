import { create } from 'zustand';

type StoreState = {
  greetingTitle: string;
  greetingContent: string;
  setGreetingTitle: (greetingTitle: string) => void;
  setGreetingContent: (greetingContent: string) => void;
  selectedSample: string | null;
  setSelectedSample: (sample: string) => void;
  reset: () => void;
};

const initialState = {
  greetingTitle: '',
  greetingContent: '',
};

const useGreetingStore = create<StoreState>((set) => ({
  ...initialState,
  setGreetingTitle: (greetingTitle) => set({ greetingTitle }),
  setGreetingContent: (greetingContent) => set({ greetingContent }),
  selectedSample: null,
  setSelectedSample: (sample) => set({ selectedSample: sample }),
  reset: () => set(() => initialState),
}));

export default useGreetingStore;
