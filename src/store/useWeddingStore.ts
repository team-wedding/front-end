import { create } from 'zustand';

type WeddingStore = {
  weddingDate: Date | undefined;
  weddingTime: {
    hour: number | null;
    minute: number | null;
  };
  formattedDate: {
    year: number | null;
    month: number | null;
    day: number | null;
  };
  setWeddingDate: (date: Date | undefined) => void;
  setWeddingTime: (hour: number | null, minute: number | null) => void;
  reset: () => void;
};

// 초기 상태 정의
const initialState = {
  weddingDate: undefined,
  weddingTime: {
    hour: null,
    minute: null,
  },
  formattedDate: {
    year: null,
    month: null,
    day: null,
  },
};

export const useWeddingStore = create<WeddingStore>((set) => ({
  ...initialState,
  setWeddingDate: (date: Date | undefined) => {
    set({
      weddingDate: date,
      formattedDate: date
        ? {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
          }
        : { year: null, month: null, day: null },
    });
  },
  setWeddingTime: (hour, minute) =>
    set({
      weddingTime: { hour, minute },
    }),
  reset: () => set({ ...initialState }),
}));
