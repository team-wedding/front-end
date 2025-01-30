import { create } from 'zustand';
import { musicData } from '@/constants/musicData';

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
  selectMusic: (musicId: number) => void;
  reset: () => void;
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
  selectMusic: (musicId) => {
    const music = musicData.filter((value) => value.id == musicId);
    set(() => ({
      selectedMusic: music[0],
    }));
  },
  reset: () =>
    set(() => ({
      subFeatures: {
        music: false,
      },
      selectedMusic: {
        id: null,
        title: '',
        src: '',
      },
    })),
}));
