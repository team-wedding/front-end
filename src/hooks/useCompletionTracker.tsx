import { useAccordionStore } from '@/store/useAccordionStore';
import { DependencyList, useEffect } from 'react';

interface useCompletionTrackerProps {
  feature: string;
  isCompleted: boolean;
  deps?: DependencyList;
}

export const useCompletionTracker = ({
  feature,
  isCompleted,
  deps = [],
}: useCompletionTrackerProps) => {
  const updateCompletionByFeature = useAccordionStore(
    (state) => state.updateCompletionByFeature,
  );

  useEffect(() => {
    updateCompletionByFeature(feature, isCompleted);
  }, [feature, isCompleted, updateCompletionByFeature, ...deps]);
};
