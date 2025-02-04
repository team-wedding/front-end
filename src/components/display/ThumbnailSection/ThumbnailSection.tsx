import BrideGroomName from './BrideGroomName';
import DateTitle from './DateTitle';
import Image from './Image';
import WeddingInformation from './WeddingInformation';

const ThumbnailSection = () => {
  return (
    <div className="column-center gap-6 py-14 rounded-t-2xl">
      <DateTitle />
      <Image />
      <BrideGroomName />
      <WeddingInformation />
    </div>
  );
};

export default ThumbnailSection;
