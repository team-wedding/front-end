import { create } from 'zustand';

export interface PhotoTalk {
  id: string;
  name: string;
  content: string;
  password: string;
  images: string[];
}

interface PhotoTalkState {
  isOpen: boolean;
  photoTalks: PhotoTalk[];
  editingPhotoTalk: PhotoTalk | null;
  openEditor: () => void;
  closeEditor: () => void;
  addPhotoTalk: (photoTalk: PhotoTalk) => void;
  editPhotoTalk: (id: string, updatedPhotoTalk: PhotoTalk) => void;
  deletePhotoTalk: (id: string) => void;
  setEditingPhotoTalk: (photoTalk: PhotoTalk | null) => void;
  getAllImages: () => string[];
}

const usePhotoTalkStore = create<PhotoTalkState>((set, get) => ({
  isOpen: false,
  photoTalks: [],
  editingPhotoTalk: null,
  openEditor: (): void => set({ isOpen: true }),
  closeEditor: (): void => set({ isOpen: false, editingPhotoTalk: null }),
  addPhotoTalk: (photoTalk: PhotoTalk): void =>
    set((state) => ({ photoTalks: [photoTalk, ...state.photoTalks] })),
  editPhotoTalk: (id: string, updatedPhotoTalk: PhotoTalk): void =>
    set((state) => ({
      photoTalks: state.photoTalks.map((talk) =>
        talk.id === id ? { ...talk, ...updatedPhotoTalk } : talk,
      ),
    })),
  deletePhotoTalk: (id: string): void =>
    set((state) => ({
      photoTalks: state.photoTalks.filter((talk) => talk.id !== id),
    })),
  setEditingPhotoTalk: (photoTalk: PhotoTalk | null): void =>
    set({ editingPhotoTalk: photoTalk }),
  getAllImages: (): string[] => get().photoTalks.flatMap((talk) => talk.images),
}));

export default usePhotoTalkStore;
