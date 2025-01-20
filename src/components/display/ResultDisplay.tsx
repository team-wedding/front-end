import CalendarSection from './CalendarSection/CalendarSection';
import LocationSection from './LocationSection/LocationSection';
import ContactSection from './ContactSection/ContactSection';
import ThumbnailSection from './ThumbnailSection/ThumbnailSection';
import GreetingSection from './GreetingSection/GreetingSection';
import GallerySection from './GallerySection/GallerySection';
import MoneySection from './MoneySection/MoneySection';
import InformSection from './InformSection/InformSection';
import AttendanceSection from './AttendanceSection/AttendanceSection';
import PhotoTalkSection from './PhotoTalkSection/PhotoTalk';

const ResultDisplay = () => {
  return (
    <div className="result-layout">
      <ThumbnailSection />
      <GreetingSection />
      <CalendarSection />
      <LocationSection />
      <ContactSection />
      <GallerySection />
      <MoneySection />
      <InformSection />
      <PhotoTalkSection />
      <AttendanceSection />
    </div>
  );
};

export default ResultDisplay;
