import { create } from 'zustand';

type StoreState = {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
};

const useImageStore = create<StoreState>((set) => ({
  uploadedImage: null,
  setUploadedImage: (image) => set({ uploadedImage: image }),
}));

export default useImageStore;
