import { create } from 'zustand';

interface StoreState {
  subFeatures: {
    music: boolean;
  };
  selectedMusic: {
    id: number | null;
    title: string;
    src: string;
  };
  toggleSubFeature: (
    feature: keyof StoreState['subFeatures'],
    enabled: boolean,
  ) => void;
  selectMusic: (music: { id: number; title: string; src: string }) => void;
}

export const useMusicFeatureStore = create<StoreState>((set) => ({
  subFeatures: {
    music: false,
  },
  selectedMusic: {
    id: null,
    title: '',
    src: '',
  },
  toggleSubFeature: (feature, enabled) => {
    set((state) => ({
      subFeatures: {
        ...state.subFeatures,
        [feature]: enabled,
      },
    }));
  },
  selectMusic: (music) => {
    set(() => ({
      selectedMusic: music,
    }));
  },
}));
