import CalendarSection from '@display/CalendarSection/CalendarSection';
import ContactSection from '@display/ContactSection/ContactSection';
import GallerySection from '@display/GallerySection/GallerySection';
import GreetingSection from '@display/GreetingSection/GreetingSection';
import LocationSection from '@display/LocationSection/LocationSection';
import MusicSection from '@display/MusicSection/MusicSection';
import NoticeSection from '@display/NoticeSection/NoticeSection';
import PhotoTalkSection from '@display/PhotoTalkSection/PhotoTalkSection';
import ThumbnailSection from '@display/ThumbnailSection/ThumbnailSection';
import AccountSection from '@/components/display/AccountSection/AccountSection';
import AttendanceSection from '@/components/display/AttendanceSection/AttendanceSection';

export interface SectionItemData {
  section: React.ReactNode;
  feature: string;
  hasDrag: boolean;
}

export const sectionData: SectionItemData[] = [
  {
    section: <ThumbnailSection />,
    feature: 'thumbnail',
    hasDrag: false,
  },
  {
    section: <GreetingSection />,
    feature: 'greeting',
    hasDrag: false,
  },
  {
    section: <AttendanceSection />,
    feature: 'rsvp',
    hasDrag: false,
  },
  {
    section: <PhotoTalkSection />,
    feature: 'phototalk',
    hasDrag: false,
  },
  {
    section: <CalendarSection />,
    feature: 'calendar',
    hasDrag: true,
  },
  {
    section: <LocationSection />,
    feature: 'location',
    hasDrag: true,
  },
  {
    section: <GallerySection />,
    feature: 'gallery',
    hasDrag: true,
  },
  {
    section: <AccountSection />,
    feature: 'account',
    hasDrag: true,
  },
  {
    section: <ContactSection />,
    feature: 'contact',
    hasDrag: true,
  },
  {
    section: <NoticeSection />,
    feature: 'notice',
    hasDrag: true,
  },
  {
    section: <MusicSection />,
    feature: 'music',
    hasDrag: false,
  },
];
