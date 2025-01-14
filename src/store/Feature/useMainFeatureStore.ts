import { create } from 'zustand';
import { accordionData } from '../../constants/accordionData';
import { AccordionItemData } from '../../components/common/CreateInvitation/Accordion';

interface MainFeatureState {
  selectedMainFeatures: Record<Required<AccordionItemData>['feature'], boolean>; // 동적으로 관리, feature 기반 타입
  toggleMainFeature: (
    feature: Required<AccordionItemData>['feature'],
    enabled: boolean,
  ) => void;
}

const defaultMainFeatures = accordionData.reduce(
  (acc, item) => {
    if (item.feature) {
      acc[item.feature] = false;
    }
    return acc;
  },
  {} as Record<Required<AccordionItemData>['feature'], boolean>,
);

export const useMainFeatureStore = create<MainFeatureState>((set) => ({
  selectedMainFeatures: defaultMainFeatures, // 동적으로 상태 생성
  toggleMainFeature: (feature, enabled) =>
    set((state) => ({
      selectedMainFeatures: {
        ...state.selectedMainFeatures,
        [feature]: enabled,
      },
    })),
}));
