import LocationTitle from './LocationTitle';
import Map from './Map';
import { useOptionalFeatureStore } from '@store/OptionalFeature/useOptionalFeatureStore';
import Navigation from './Navigation';
import Transportation from './Transportation';
import { useLocationFeatureStore } from '@store/OptionalFeature/useLocationFeatureStore';
import { navigationData } from '@constants/navigationData';
import { transportationData } from '@constants/transportationData';

const LocationSection = () => {
  const { selectedOptionalFeatures } = useOptionalFeatureStore();
  const { subFeatures } = useLocationFeatureStore();

  const isLocationFeatureActive = selectedOptionalFeatures.location;

  const enabledNavigation = navigationData.filter(
    ({ key }) => subFeatures[key],
  );
  const enabledTransportation = transportationData.filter(
    ({ key }) => subFeatures[key],
  );

  return (
    isLocationFeatureActive && (
      <div className="flex flex-col text-sm py-20">
        <LocationTitle />
        <Map />
        {enabledNavigation.length !== 0 && <Navigation />}
        {enabledTransportation.length !== 0 && <Transportation />}
      </div>
    )
  );
};

export default LocationSection;
