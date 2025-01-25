import CalendarSection from '@display/CalendarSection/CalendarSection';
import ContactSection from '@display/ContactSection/ContactSection';
import GallerySection from '@display/GallerySection/GallerySection';
import GreetingSection from '@display/GreetingSection/GreetingSection';
import LocationSection from '@display/LocationSection/LocationSection';
import MoneySection from '@display/MoneySection/MoneySection';
import MusicSection from '@display/MusicSection/MusicSection';
import NoticeSection from '@display/NoticeSection/NoticeSection';
import PhotoTalkSection from '@display/PhotoTalkSection/PhotoTalkSection';
import RsvpSection from '@display/RsvpSection/RsvpSection';
import ThumbnailSection from '@display/ThumbnailSection/ThumbnailSection';

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
