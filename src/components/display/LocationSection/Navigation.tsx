import { useNavigationHandler } from '@/hooks/useNavigationHandler';
import { navigationData } from '@constants/navigationData';
import { useLocationFeatureStore } from '@store/OptionalFeature/useLocationFeatureStore';
import useAddressStore from '@store/useAddressStore';

const Navigation = () => {
  const { subFeatures } = useLocationFeatureStore();

  const { address, coords } = useAddressStore();

  const handleNavigation = useNavigationHandler({
    address,
    lat: coords.lat,
    lng: coords.lng,
  });

  return (
    <div className="flex justify-evenly gap-4 py-10 px-10 ">
      {navigationData.map(
        ({ key, img, alt }) =>
          subFeatures[key] && (
            <button key={key} onClick={() => handleNavigation(key)}>
              <img src={img} alt={alt} className="w-8 rounded-lg shadow-md" />
            </button>
          ),
      )}
    </div>
  );
};

export default Navigation;
