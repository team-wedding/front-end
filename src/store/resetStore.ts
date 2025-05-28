import useAddressStore from './useAddressStore';
import useBrideGroomStore from './useBrideGroomStore';
import useContactStore from './useContactStore';
import useGreetingStore from './useGreetingStore';
import useImageStore from './useImageStore';
import { useInvitationStore } from './useInvitaionStore';
import useThemeStore from './useThemeStore';
import { useWeddingStore } from './useWeddingStore';
import { useOptionalFeatureStore } from '@/store/OptionalFeature/useOptionalFeatureStore';
import { useCalendarFeatureStore } from '@/store/OptionalFeature/useCalendarFeatureStore';
import { useMusicFeatureStore } from '@/store/OptionalFeature/useMusicFeatureStore';
import useGalleryStore from '@/store/OptionalFeature/useGalleryFeatureStore';
import useAccountStore from '@/store/OptionalFeature/useAccountFeatureStore';
import useNoticeStore from '@/store/OptionalFeature/useNoticeFeatureStore';
import useRSVPStore from './useRSVPStore';
import { useLocationFeatureStore } from './OptionalFeature/useLocationFeatureStore';

const resetAllStores = () => {
  //제목
  useInvitationStore.getState().reset();
  //step 1
  useBrideGroomStore.getState().reset();
  useWeddingStore.getState().reset();
  useAddressStore.getState().reset();
  //step2
  useImageStore.getState().reset();
  useGreetingStore.getState().reset();
  useRSVPStore.getState().reset();
  //optional
  useOptionalFeatureStore.getState().reset();
  useCalendarFeatureStore.getState().reset();
  useLocationFeatureStore.getState().reset();
  useGalleryStore.getState().reset();
  useAccountStore.getState().reset();
  useContactStore.getState().reset();
  useNoticeStore.getState().reset();
  //step3
  useThemeStore.getState().reset();
  useMusicFeatureStore.getState().reset();
};
export default resetAllStores;
