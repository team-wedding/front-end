import { AccordionItemData } from '../components/common/CreateInvitation/Accordion';
import AddressInput from '../components/form/AddressInput/AddressInput';
import GreetingInput from '../components/form/GreetingInput/GreetingInput';
import ThemeSelection from '../components/form/ThemeSelection/ThemeSelection';
import WeddingDateInput from '../components/form/WeddingDateInput/WeddingDateInput';
import RsvpExample from '../components/form/RsvpSelection/RsvpExample';
import ImageInput from '../components/form/ThumbnailSelection/ImageInput';
import NameInput from '../components/form/NameInput/NameInput';
import CalendarSelection from '../components/form/CalendarSelection/CalendarSelection';
import MessageSelection from '../components/form/MessageSelection/MessageSelection';
import InformSection from '../components/display/InformSection/InformSection';
import GallerySelection from '../components/form/GallerySelection/GallerySelection';
import LocationSelection from '../components/form/LocationSelection/LocationSelection';
import ContactSelection from '../components/form/ContactSelection/ContactSelection';
import AccountInput from '../components/form/AccountSelection/AccountInput';

export const accordionData: AccordionItemData[] = [
  {
    id: 1,
    title: '이름',
    content: <NameInput />,
    hasToggle: false,
  },
  {
    id: 2,
    title: '예식 일시',
    content: <WeddingDateInput />,
    hasToggle: false,
  },
  {
    id: 3,
    title: '예식 장소',
    content: <AddressInput />,
    hasToggle: false,
  },
  {
    id: 4,
    title: '대표 이미지',
    content: <ImageInput />,
    hasToggle: false,
  },
  {
    id: 5,
    title: '제목 / 인사말',
    content: <GreetingInput />,
    hasToggle: false,
  },
  {
    id: 6,
    title: '참석 여부',
    content: <RsvpExample />,
    hasToggle: false,
  },
  {
    id: 7,
    title: '캘린더',
    content: <CalendarSelection />,
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 8,
    title: '지도 / 교통수단',
    content: <LocationSelection />,
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 9,
    title: '갤러리',
    content: <GallerySelection />,
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 10,
    title: '축하 메시지',
    content: <MessageSelection />,
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 11,
    title: '축의금',
    content: <AccountInput />,
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 12,
    title: '연락하기',
    content: <ContactSelection />,
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 13,
    title: '공지사항',
    content: <InformSection />,
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 14,
    title: '실시간 포토월',
    content: <RsvpExample />,
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 15,
    title: '테마 색상',
    content: <ThemeSelection />,
    hasToggle: false,
  },
  {
    id: 16,
    title: '글꼴',
    content: <ThemeSelection />,
    hasToggle: false,
  },
  {
    id: 17,
    title: '인트로 효과',
    content: <ThemeSelection />,
    hasToggle: true,
  },
  {
    id: 18,
    title: '배경 음악',
    content: <ThemeSelection />,
    hasToggle: true,
  },
  {
    id: 19,
    title: '갤러리',
    content: <GallerySelection />,
  },
];
