import { create } from 'zustand';

type StoreState = {
  uploadedImageUrl: string;
  setUploadedImageUrl: (image: string) => void;
  uploadedImageFile: File | null;
  setUploadedImageFile: (image: File | null) => void;
  reset: () => void;
};

const useImageStore = create<StoreState>((set) => ({
  uploadedImageUrl: '',
  setUploadedImageUrl: (image) => set({ uploadedImageUrl: image }),
  uploadedImageFile: null,
  setUploadedImageFile: (image) => set({ uploadedImageFile: image }),
  reset: () => set({ uploadedImageUrl: '', uploadedImageFile: null }),
}));

export default useImageStore;
