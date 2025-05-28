import { create } from 'zustand';

type StoreState = {
  galleryImages: string[];
  galleryFiles: File[];
  setImages: (images: string[]) => void;
  setGalleryFiles: (files: File[]) => void;
  grid: boolean;
  setGrid: (grid: boolean) => void;
  reset: () => void;
};

const useGalleryStore = create<StoreState>((set) => ({
  galleryImages: [],
  galleryFiles: [],
  grid: true,
  setImages: (images: string[]) => set(() => ({ galleryImages: images })),
  setGalleryFiles: (files: File[]) => set(() => ({ galleryFiles: files })),
  setGrid: (grid: boolean) => set(() => ({ grid })),
  reset: () => set({ galleryImages: [], galleryFiles: [] }),
}));

export default useGalleryStore;
