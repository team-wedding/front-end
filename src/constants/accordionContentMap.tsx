import AddressInput from '@form/BasicInformation/AddressInput/AddressInput';
import NameInput from '@form/BasicInformation/NameInput/NameInput';
import WeddingDateInput from '@form/BasicInformation/WeddingDateInput/WeddingDateInput';
import AccountFeature from '@form/Feature/AccountFeature/AccountFeature';
import CalendarFeature from '@form/Feature/CalendarFeature/CalendarFeature';
import ContactFeature from '@form/Feature/ContactFeature/ContactFeature';
import GalleryFeature from '@form/Feature/GalleryFeature/GalleryFeature';
import GreetingFeature from '@form/Feature/GreetingFeature/GreetingFeature';
import LocationFeature from '@form/Feature/LocationFeature/LocationFeature';
import RsvpExample from '@form/Feature/RsvpFeature/RsvpExample';
import NoticeFeature from '@form/Feature/NoticeFeature/NoticeFeature';
import MusicFeature from '@form/Theme/MusicFeature/MusicFeature';
import PhotoTalkFeature from '@/components/form/Feature/PhotoTalkFeature/PhotoTalkFeature';
import ThumbnailFeature from '@/components/form/Feature/ThumbnailFeature/ThumbnailFeature';
import FontFeature from '@/components/form/Theme/FontFeature/FontFeature';

export const contentMap: Record<string, JSX.Element> = {
  nameInput: <NameInput />,
  weddingDateInput: <WeddingDateInput />,
  weddingPlaceInput: <AddressInput />,
  thumbnail: <ThumbnailFeature />,
  greeting: <GreetingFeature />,
  rsvp: <RsvpExample />,
  phototalk: <PhotoTalkFeature />,
  calendar: <CalendarFeature />,
  location: <LocationFeature />,
  gallery: <GalleryFeature />,
  account: <AccountFeature />,
  contact: <ContactFeature />,
  notice: <NoticeFeature />,
  font: <FontFeature />,
  music: <MusicFeature />,
};
