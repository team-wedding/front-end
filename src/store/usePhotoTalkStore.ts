import { PhotoTalk } from '@/types/phototalkType';
import { create } from 'zustand';

interface PhotoTalkState {
  photoTalkList: PhotoTalk[];
  editingPhotoTalk: PhotoTalk | null;
  setPhotoTalkList: (PhotoTalkList: PhotoTalk[]) => void;
  setEditingPhotoTalk: (photoTalk: PhotoTalk | null) => void;
  resetFields: () => void;
  getAllImages: () => string[];
}

const usePhotoTalkStore = create<PhotoTalkState>((set, get) => ({
  photoTalkList: [],
  editingPhotoTalk: null,
  setPhotoTalkList: (photoTalkList: PhotoTalk[]) => {
    set({ photoTalkList: photoTalkList });
  },
  setEditingPhotoTalk: (photoTalk) => {
    set({ editingPhotoTalk: photoTalk });
  },
  resetFields: () =>
    set({
      editingPhotoTalk: null,
    }),
  getAllImages: () => {
    return get().photoTalkList.flatMap((photoTalk) =>
      Array.isArray(photoTalk.imageUrl)
        ? photoTalk.imageUrl
        : typeof photoTalk.imageUrl === 'string' && photoTalk.imageUrl !== ''
          ? JSON.parse(photoTalk.imageUrl)
          : [],
    );
  },
}));

export default usePhotoTalkStore;
