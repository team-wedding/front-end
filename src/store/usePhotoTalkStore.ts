import { create } from 'zustand';

export interface PhotoTalk {
  id?: number;
  name: string;
  message: string;
  password: string;
  imageUrl: string[];
}

interface PhotoTalkState {
  photoTalks: PhotoTalk[];
  editingPhotoTalk: PhotoTalk | null;
  setEditingPhotoTalk: (photoTalk: PhotoTalk | null) => void;
  addPhotoTalk: (photoTalk: PhotoTalk) => void;
  editPhotoTalk: (id: number, updateTalk: PhotoTalk) => void;
  deletePhotoTalk: (id: number, password?: string) => void;
  resetFields: () => void;
  getAllImages: () => string[];
}

const usePhotoTalkStore = create<PhotoTalkState>((set, get) => ({
  photoTalks: [],
  editingPhotoTalk: null,

  setEditingPhotoTalk: (photoTalk) => {
    set({ editingPhotoTalk: photoTalk });
  },

  addPhotoTalk: (newPhotoTalk) => {
    set((state) => ({
      photoTalks: [newPhotoTalk, ...state.photoTalks],
    }));
  },

  editPhotoTalk: (id, updateTalk) => {
    set((state) => ({
      photoTalks: state.photoTalks.map((talk) =>
        talk.id === id ? updateTalk : talk,
      ),
    }));
  },

  deletePhotoTalk: (id, password) => {
    const talk = get().photoTalks.find((t) => t.id === id);
    if (!talk) return false;

    if (talk.password === password) {
      set((state) => ({
        photoTalks: state.photoTalks.filter((t) => t.id !== id),
      }));
      return true;
    }

    return false;
  },

  getAllImages: () => {
    return get().photoTalks.flatMap((talk) => talk.imageUrl);
  },

  resetFields: () =>
    set({
      editingPhotoTalk: null,
    }),
}));

export default usePhotoTalkStore;
