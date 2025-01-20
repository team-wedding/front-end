import { useOptionalFeatureStore } from './useOptionalFeatureStore';

export const useToggleFeatureStore = (feature: string) => {
  const { selectedOptionalFeatures, toggleOptionalFeature } =
    useOptionalFeatureStore();

  const isFeatureActive =
    selectedOptionalFeatures[
      feature as keyof typeof selectedOptionalFeatures
    ] ?? false;

  const handleToggle = (enabled: boolean) => {
    toggleOptionalFeature(
      feature as keyof typeof selectedOptionalFeatures,
      enabled,
    );
  };

  return { isFeatureActive, handleToggle };
};
