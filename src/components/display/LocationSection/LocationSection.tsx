import React from 'react';
import LocationTitle from './LocationTitle';
import Map from './Map';

const LocationSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <LocationTitle />
      <Map />
    </div>
  );
};

export default LocationSection;
