import { create } from 'zustand';

// 청첩장 정보 - 제목
type InvitationStore = {
  title: string;
  setTitle: (title: string) => void;
};

export const useInvitationStore = create<InvitationStore>((set) => ({
  title: '',
  setTitle: (title) => set({ title }),
}));
