import LocationTitle from './LocationTitle';
import Map from './Map';
import { useOptionalFeatureStore } from '../../../store/OptionalFeature/useOptionalFeatureStore';
import Navigation, { navigationData } from './Navigation';
import Transportation, { transportationData } from './Transportation';
import { useLocationFeatureStore } from '../../../store/OptionalFeature/useLocationFeatureStore';

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
      <div className="flex flex-col text-sm">
        <LocationTitle />
        <Map />
        {enabledNavigation.length !== 0 && <Navigation />}
        {enabledTransportation.length !== 0 && <Transportation />}
      </div>
    )
  );
};

export default LocationSection;
