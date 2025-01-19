import { create } from 'zustand';

type StoreState = {
  uploadedImage: string;
  setUploadedImage: (image: string) => void;
  reset: () => void;
};

const useImageStore = create<StoreState>((set) => ({
  uploadedImage: '',
  setUploadedImage: (image) => set({ uploadedImage: image }),
  reset: () => set({ uploadedImage: '' }),
}));

export default useImageStore;
