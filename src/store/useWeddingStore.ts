import { create } from 'zustand';

type WeddingStore = {
  weddingDate: Date | null;
  weddingTime: string | null;
  formattedDate: {
    year: number | null;
    month: number | null;
    day: number | null;
  };
  setWeddingDate: (date: Date | null) => void;
  setWeddingTime: (time: string) => void;
};

// 예식 정보 - 날짜, 시간
export const useWeddingStore = create<WeddingStore>((set) => ({
  weddingDate: new Date(),
  weddingTime: '12:00',
  formattedDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  },
  setWeddingDate: (date) =>
    set({
      weddingDate: date,
      formattedDate: date
        ? {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
          }
        : { year: null, month: null, day: null },
    }),
  setWeddingTime: (time) => set({ weddingTime: time }),
}));
