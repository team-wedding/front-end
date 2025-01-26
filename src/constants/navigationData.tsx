import kakao from '@assets/kakaonavi.png';
import naver from '@assets/navermap.png';
import tmap from '@assets/tmap.png';
import { StoreState } from '@store/OptionalFeature/useLocationFeatureStore';

interface navigationItemData {
  key: keyof StoreState['subFeatures'];
  title: string;
  img: string;
  alt: string;
}

export const navigationData: navigationItemData[] = [
  {
    key: 'navigationTmap',
    title: '티맵',
    img: tmap,
    alt: 'Tmap',
  },
  {
    key: 'navigationNaver',
    title: '네이버지도',
    img: naver,
    alt: 'Naver Map',
  },
  {
    key: 'navigationKakao',
    title: '카카오내비',
    img: kakao,
    alt: 'Kakao Navi',
  },
];
