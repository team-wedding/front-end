import { create } from 'zustand';

type WeddingStore = {
  weddingDate: Date | null;
  setWeddingDate: (date: Date | null) => void;
  weddingTime: string | null;
  setWeddingTime: (time: string) => void;
};

// 예식 정보 - 날짜, 시간
export const useWeddingStore = create<WeddingStore>((set) => ({
  weddingDate: new Date(),
  setWeddingDate: (date) => set({ weddingDate: date }),
  weddingTime: '12:00',
  setWeddingTime: (time) => set({ weddingTime: time }),
}));

// 청첩장 정보 - 제목
type InvitationStore = {
  title: string;
  setTitle: (newTitle: string) => void;
};

export const useInvitationStore = create<InvitationStore>((set) => ({
  title: '',
  setTitle: (newTitle) => set({ title: newTitle }),
}));
