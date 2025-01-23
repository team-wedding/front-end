import { create } from 'zustand';
import {
  accordionData,
  AccordionItemData,
} from '../../constants/accordionData';

interface OptionalFeatureState {
  selectedOptionalFeatures: Record<
    Required<AccordionItemData>['feature'],
    boolean
  >; // 동적으로 관리, feature 기반 타입
  toggleOptionalFeature: (
    feature: Required<AccordionItemData>['feature'],
    enabled: boolean,
  ) => void;
}

const defaultOptionalFeatures = accordionData.reduce(
  (acc, item) => {
    if (item.feature) {
      acc[item.feature] = false;
    }
    return acc;
  },
  {} as Record<Required<AccordionItemData>['feature'], boolean>,
);

export const useOptionalFeatureStore = create<OptionalFeatureState>((set) => ({
  selectedOptionalFeatures: defaultOptionalFeatures, // 동적으로 상태 생성
  toggleOptionalFeature: (feature, enabled) =>
    set((state) => ({
      selectedOptionalFeatures: {
        ...state.selectedOptionalFeatures,
        [feature]: enabled,
      },
    })),
}));
