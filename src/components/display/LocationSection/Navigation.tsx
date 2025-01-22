import kakao from '../../../assets/kakaonavi.png';
import naver from '../../../assets/navermap.png';
import tmap from '../../../assets/tmap.png';
import {
  StoreState,
  useLocationFeatureStore,
} from '../../../store/OptionalFeature/useLocationFeatureStore';
import useAddressStore from '../../../store/useAddressStore';

const navigationData: {
  key: keyof StoreState['subFeatures'];
  img: string;
  alt: string;
}[] = [
  { key: 'navigationTmap', img: tmap, alt: 'Tmap' },
  { key: 'navigationNaver', img: naver, alt: 'Naver Map' },
  { key: 'navigationKakao', img: kakao, alt: 'Kakao Navi' },
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
