import { create } from 'zustand';

interface StoreState {
  subCalendarFeatures: {
    calendar: boolean;
    countdown: boolean;
    dday: boolean;
  };
  toggleSubFeature: (
    feature: keyof StoreState['subCalendarFeatures'],
    enabled: boolean,
  ) => void;
}

export const useCalendarFeatureStore = create<StoreState>((set) => ({
  subCalendarFeatures: {
    calendar: false,
    countdown: false,
    dday: false,
  },
  toggleSubFeature: (feature, enabled) => {
    set((state) => ({
      subCalendarFeatures: {
        ...state.subCalendarFeatures,
        [feature]: enabled,
      },
    }));
  },
}));
