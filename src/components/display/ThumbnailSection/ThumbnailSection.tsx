import BrideGroomName from './BrideGroomName';
import DateTitle from './DateTitle';
import Image from './Image';
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
