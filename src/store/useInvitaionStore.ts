import { create } from 'zustand';

// 청첩장 정보 - 제목
type InvitationStore = {
  title: string;
  setTitle: (newTitle: string) => void;
};

export const useInvitationStore = create<InvitationStore>((set) => ({
  title: '',
  setTitle: (newTitle) => set({ title: newTitle }),
}));
