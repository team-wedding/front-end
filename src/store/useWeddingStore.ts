import { create } from 'zustand';

type WeddingStore = {
  weddingDate: Date;
  weddingTime: string;
  formattedDate: {
    year: number;
    month: number;
    day: number;
  };
  setWeddingDate: (date: Date) => void;
  setWeddingTime: (time: string) => void;
  reset: () => void; // Reset 메서드 추가
};

// 초기 상태 정의
const initialState = {
  weddingDate: new Date(),
  weddingTime: '12:00',
  formattedDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  },
};

export const useWeddingStore = create<WeddingStore>((set) => ({
  ...initialState,
  setWeddingDate: (date) =>
    set({
      weddingDate: date,
      formattedDate: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      },
    }),
  setWeddingTime: (time) => set({ weddingTime: time }),
  reset: () => set(initialState), // Reset 메서드 구현
}));
