import CalendarSection from './CalendarSection/CalendarSection';
import LocationSection from './LocationSection/LocationSection';
import ContactSection from './ContactSection/ContactSection';
import ThumbnailSection from './ThumbnailSection/ThumbnailSection';
import GreetingSection from './GreetingSection/GreetingSection';
import GallerySection from './GallerySection/GallerySection';
import AccountSection from './AccountSection/AccountSection';
import AttendanceSection from './AttendanceSection/AttendanceSection';
import NoticeSection from './NoticeSection/NoticeSection';
import PhotoTalkSection from './PhotoTalkSection/PhotoTalkSection';

const ResultDisplay = () => {
  return (
    <div className="result-layout">
      <ThumbnailSection />
      <GreetingSection />
      <CalendarSection />
      <LocationSection />
      <ContactSection />
      <GallerySection />
      <AccountSection />
      <NoticeSection />
      <PhotoTalkSection />
      <AttendanceSection />
    </div>
  );
};

export default ResultDisplay;
