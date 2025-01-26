import { navigationData } from '@constants/navigationData';
import { useLocationFeatureStore } from '@store/OptionalFeature/useLocationFeatureStore';
// import useAddressStore from '@store/useAddressStore';

const Navigation = () => {
  const { subFeatures } = useLocationFeatureStore();

  // 내비게이션 api 연결하기
  // const { address } = useAddressStore();

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
