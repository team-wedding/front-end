import { create } from 'zustand';

interface StoreState {
  audioSubFeatures: {
    music: boolean;
  };
  selectedMusic: {
    id: number | null;
    title: string;
    src: string;
  };
  toggleSubFeature: (
    feature: keyof StoreState['audioSubFeatures'],
    enabled: boolean,
  ) => void;
  selectMusic: (music: { id: number; title: string; src: string }) => void;
}

export const useMusicFeatureStore = create<StoreState>((set) => ({
  audioSubFeatures: {
    music: false,
  },
  selectedMusic: {
    id: null,
    title: '',
    src: '',
  },
  toggleSubFeature: (feature, enabled) => {
    set((state) => ({
      audioSubFeatures: {
        ...state.audioSubFeatures,
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
