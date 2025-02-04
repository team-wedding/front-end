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
  setImages: (galleryImages: string[]) => set(() => ({ galleryImages })),
  setGalleryFiles: (files: File[]) => set(() => ({ galleryFiles: files })),
  grid: true,
  setGrid: (grid: boolean) => set(() => ({ grid })),
  reset: () => set({ galleryImages: [] }),
}));

export default useGalleryStore;
