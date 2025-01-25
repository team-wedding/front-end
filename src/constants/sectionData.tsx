import CalendarSection from '../components/display/CalendarSection/CalendarSection';
import ContactSection from '../components/display/ContactSection/ContactSection';
import GallerySection from '../components/display/GallerySection/GallerySection';
import GreetingSection from '../components/display/GreetingSection/GreetingSection';
import LocationSection from '../components/display/LocationSection/LocationSection';
import MoneySection from '../components/display/MoneySection/MoneySection';
import MusicSection from '../components/display/MusicSection/MusicSection';
import NoticeSection from '../components/display/NoticeSection/NoticeSection';
import PhotoTalkSection from '../components/display/PhotoTalkSection/PhotoTalkSection';
import RsvpSection from '../components/display/RsvpSection/RsvpSection';
import ThumbnailSection from '../components/display/ThumbnailSection/ThumbnailSection';

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
    section: <RsvpSection />,
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
    section: <MoneySection />,
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
