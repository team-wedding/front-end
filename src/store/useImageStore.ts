import { create } from 'zustand';

type StoreState = {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  reset: () => void;
};

const useImageStore = create<StoreState>((set) => ({
  uploadedImage: null,
  setUploadedImage: (image) => set({ uploadedImage: image }),
  reset: () => set({ uploadedImage: null }),
}));

export default useImageStore;
