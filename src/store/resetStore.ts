import { useLocationFeatureStore } from '@store/OptionalFeature/useLocationFeatureStore';
import useRSVPStore from '@/store/useRSVPStore';
import useAccountStore from './useAccountStore';
import useAddressStore from './useAddressStore';
import useBrideGroomStore from './useBrideGroomStore';
import useContactStore from './useContactStore';
import useGallaryStore from './useGallaryStore';
import useGreetingStore from './useGreetingStore';
import useImageStore from './useImageStore';
import { useInvitationStore } from './useInvitaionStore';
import useThemeStore from './useThemeStore';
import { useWeddingStore } from './useWeddingStore';
import { useOptionalFeatureStore } from '@/store/OptionalFeature/useOptionalFeatureStore';
import useNoticeStore from '@/store/useNoticeStore';
import { useCalendarFeatureStore } from '@/store/OptionalFeature/useCalendarFeatureStore';
import { useMusicFeatureStore } from '@/store/OptionalFeature/useMusicFeatureStore';

const resetAllStores = () => {
  //제목
  useInvitationStore.getState().reset();
  //step 1
  // useBrideGroomStore.getState().reset();
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
  useGallaryStore.getState().reset();
  useAccountStore.getState().reset();
  useContactStore.getState().reset();
  useNoticeStore.getState().reset();
  //step3
  useThemeStore.getState().reset();
  useMusicFeatureStore.getState().reset();
};
export default resetAllStores;
