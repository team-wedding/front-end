import { create } from 'zustand';

// 청첩장 정보 - 제목
type InvitationStore = {
  invitationtitle: string;
  setInvitationTitle: (newTitle: string) => void;
  reset: () => void;
};

export const useInvitationStore = create<InvitationStore>((set) => ({
  invitationtitle: '',
  setInvitationTitle: (newTitle) => set({ invitationtitle: newTitle }),
  reset: () =>
    set({
      invitationtitle: '',
    }),
}));
