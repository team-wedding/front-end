import { create } from 'zustand';

type StoreState = {
  title: string;
  greeting: string;
  setTitle: (title: string) => void;
  setGreeting: (greeting: string) => void;
  selectedSample: string | null;
  setSelectedSample: (sample: string) => void;
};

const useGreetingStore = create<StoreState>((set) => ({
  title: '',
  greeting: '',
  setTitle: (title) => set({ title }),
  setGreeting: (greeting) => set({ greeting }),
  selectedSample: null,
  setSelectedSample: (sample) => set({ selectedSample: sample }),
}));

export default useGreetingStore;
