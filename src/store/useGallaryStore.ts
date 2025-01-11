import { create } from 'zustand';

type StoreState = {
  images: string[];
  setImages: (images: string[]) => void;
  grid: boolean;
  setGrid: (grid: boolean) => void;
};

const useGallaryStore = create<StoreState>((set) => ({
  images: [],
  setImages: (images: string[]) => set(() => ({ images })),
  grid: true,
  setGrid: (grid: boolean) => set(() => ({ grid })),
}));

export default useGallaryStore;
