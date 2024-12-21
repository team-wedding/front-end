import React from 'react';
import Image from './Image';
import BrideGroomName from './BrideGroomName';
import DateTitle from './DateTitle';
import WeddingInformation from './WeddingInformation';

const ThumbnailSection = () => {
  return (
    <div className="column-center gap-6">
      <DateTitle />
      <Image />
      <BrideGroomName />
      <WeddingInformation />
    </div>
  );
};

export default ThumbnailSection;
