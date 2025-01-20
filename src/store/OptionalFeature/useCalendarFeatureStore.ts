import { create } from 'zustand';

interface StoreState {
  subFeatures: {
    calendar: boolean;
    countdown: boolean;
    dday: boolean;
  };
  toggleSubFeature: (
    feature: keyof StoreState['subFeatures'],
    enabled: boolean,
  ) => void;
}

export const useCalendarFeatureStore = create<StoreState>((set) => ({
  subFeatures: {
    calendar: false,
    countdown: false,
    dday: false,
  },
  toggleSubFeature: (feature, enabled) => {
    set((state) => ({
      subFeatures: {
        ...state.subFeatures,
        [feature]: enabled,
      },
    }));
  },
}));
