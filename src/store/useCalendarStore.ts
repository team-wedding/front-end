import { create } from 'zustand';

interface CalendarState {
  selectedFeatures: string[];
  selectFeature: (feature: string) => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  selectedFeatures: [],
  selectFeature: (feature) => {
    const { selectedFeatures } = get();
    if (selectedFeatures.includes(feature)) {
      set({ selectedFeatures: selectedFeatures.filter((f) => f !== feature) });
    } else {
      set({ selectedFeatures: [...selectedFeatures, feature] });
    }
  },
}));
