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
import AccountSelection from '../components/form/AccountSelection/AccountSelection';
import ContactSelection from '../components/form/ContactSelection/ContactSelection';

export const accordionData: AccordionItemData[] = [
  {
    id: 1,
    title: '이름',
    content: <NameInput />,
  },
  {
    id: 2,
    title: '예식 일시',
    content: <WeddingDateInput />,
  },
  {
    id: 3,
    title: '예식 장소',
    content: <AddressInput />,
  },
  {
    id: 4,
    title: '대표 이미지',
    content: <ImageInput />,
  },
  {
    id: 5,
    title: '제목 / 인사말',
    content: <GreetingInput />,
  },
  {
    id: 6,
    title: '참석 여부',
    content: <RsvpExample />,
  },
  {
    id: 7,
    title: '캘린더',
    content: <CalendarSelection />,
  },
  {
    id: 8,
    title: '지도 / 교통수단',
    content: <LocationSelection />,
  },
  {
    id: 9,
    title: '갤러리',
    content: <GallerySelection />,
  },
  {
    id: 10,
    title: '축하 메시지',
    content: <MessageSelection />,
  },
  {
    id: 11,
    title: '축의금',
    content: <AccountSelection />,
  },
  {
    id: 12,
    title: '연락하기',
    content: <ContactSelection />,
  },
  {
    id: 13,
    title: '공지사항',
    content: <InformSection />,
  },
  {
    id: 14,
    title: '실시간 포토월',
    content: <RsvpExample />,
  },
  {
    id: 15,
    title: '테마 색상',
    content: <ThemeSelection />,
  },
  {
    id: 16,
    title: '글꼴',
    content: <ThemeSelection />,
  },
  {
    id: 17,
    title: '인트로 효과',
    content: <ThemeSelection />,
  },
  {
    id: 18,
    title: '배경 음악',
    content: <ThemeSelection />,
  },
];
