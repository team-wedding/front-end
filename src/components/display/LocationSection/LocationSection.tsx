import LocationTitle from './LocationTitle';
import Map from './Map';
import { useOptionalFeatureStore } from '../../../store/OptionalFeature/useOptionalFeatureStore';
import Navigation from './Navigation';
import Transportation from './Transportation';

const LocationSection = () => {
  const { selectedOptionalFeatures } = useOptionalFeatureStore();

  const isLocationFeatureActive = selectedOptionalFeatures.location;

  return (
    isLocationFeatureActive && (
      <div className="flex flex-col text-sm">
        <LocationTitle />
        <Map />
        <Navigation />
        <Transportation />
      </div>
    )
  );
};

export default LocationSection;
