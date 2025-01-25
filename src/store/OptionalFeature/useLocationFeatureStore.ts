import { create } from 'zustand';

export interface StoreState {
  subFeatures: {
    canMoveMap: boolean;
    navigationTmap: boolean;
    navigationNaver: boolean;
    navigationKakao: boolean;
    transportationCar: boolean;
    transportationSubway: boolean;
    transportationBus: boolean;
  };
  transportationInputs: {
    car: string;
    bus: string;
    subway: string;
  };
  toggleSubFeature: (
    feature: keyof StoreState['subFeatures'],
    enabled: boolean,
  ) => void;
  updateTransportationInput: (
    type: keyof StoreState['transportationInputs'],
    value: string,
  ) => void;
}

export const useLocationFeatureStore = create<StoreState>((set) => ({
  subFeatures: {
    canMoveMap: false,
    navigationTmap: false,
    navigationNaver: false,
    navigationKakao: false,
    transportationCar: false,
    transportationSubway: false,
    transportationBus: false,
  },
  transportationInputs: {
    car: '',
    bus: '',
    subway: '',
  },
  toggleSubFeature: (feature, enabled) => {
    set((state) => ({
      subFeatures: {
        ...state.subFeatures,
        [feature]: enabled,
      },
    }));
  },
  updateTransportationInput: (type, value) => {
    set((state) => ({
      transportationInputs: {
        ...state.transportationInputs,
        [type]: value,
      },
    }));
  },
}));
