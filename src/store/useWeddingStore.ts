import { create } from 'zustand';

type WeddingStore = {
  weddingDate: Date | null;
  weddingTime: {
    hour: number | null;
    minute: number | null;
  };
  formattedDate: {
    year: number;
    month: number;
    day: number;
  };
  setWeddingDate: (date: Date | null) => void;
  setWeddingTime: (hour: number, minute: number) => void;
};

// 초기 상태 정의
const initialState = {
  weddingDate: new Date(), // 초기값
  weddingTime: {
    hour: 12,
    minute: 0,
  }, // 초기값

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
  setWeddingTime: (hour, minute) =>
    set({
      weddingTime: { hour, minute },
    }),
  reset: () => set(initialState), // Reset 메서드 구현
}));
