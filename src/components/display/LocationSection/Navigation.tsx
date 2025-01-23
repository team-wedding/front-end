import kakao from '../../../assets/kakaonavi.png';
import naver from '../../../assets/navermap.png';
import tmap from '../../../assets/tmap.png';
import {
  StoreState,
  useLocationFeatureStore,
} from '../../../store/OptionalFeature/useLocationFeatureStore';
import useAddressStore from '../../../store/useAddressStore';

export const navigationData: {
  key: keyof StoreState['subFeatures'];
  title: string;
  img: string;
  alt: string;
}[] = [
  { key: 'navigationTmap', title: '티맵', img: tmap, alt: 'Tmap' },
  { key: 'navigationNaver', title: '네이버지도', img: naver, alt: 'Naver Map' },
  {
    key: 'navigationKakao',
    title: '카카오내비',
    img: kakao,
    alt: 'Kakao Navi',
  },
];

const Navigation = () => {
  const { subFeatures } = useLocationFeatureStore();

  // 내비게이션 api 연결하기
  // const { address } = useAddressStore();

  const enabledNavigation = navigationData.filter(
    ({ key }) => subFeatures[key],
  );
  if (enabledNavigation.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-evenly gap-4 py-10 px-10 ">
      {navigationData.map(
        ({ key, img, alt }) =>
          subFeatures[key] && (
            <button key={key}>
              <img src={img} alt={alt} className="w-8 rounded-lg shadow-md" />
            </button>
          ),
      )}
    </div>
  );
};

export default Navigation;
