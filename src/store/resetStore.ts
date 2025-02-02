import useAccountStore from './OptionalFeature/useAccountFeatureStore';
import useGalleryStore from './OptionalFeature/useGalleryFeatureStore';
import useAddressStore from './useAddressStore';
import useBrideGroomStore from './useBrideGroomStore';
import useContactStore from './useContactStore';
import useGreetingStore from './useGreetingStore';
import useImageStore from './useImageStore';
import { useInvitationStore } from './useInvitaionStore';
import useThemeStore from './useThemeStore';
import { useWeddingStore } from './useWeddingStore';

export const resetAllStores = () => {
  useAccountStore.getState().reset();
  useAddressStore.getState().reset();
  useBrideGroomStore.getState().reset();
  useContactStore.getState().reset();
  useGalleryStore.getState().reset();
  useGreetingStore.getState().reset();
  useImageStore.getState().reset();
  useInvitationStore.getState().reset();
  useThemeStore.getState().reset();
  useWeddingStore.getState().reset();
};
