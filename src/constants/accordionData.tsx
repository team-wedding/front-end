import { AccordionItemData } from '../components/common/CreateInvitation/Accordion';
import AddressInput from '../components/form/AddressInput/AddressInput';
import GreetingInput from '../components/form/GreetingInput/GreetingInput';
import ThemeSelection from '../components/form/ThemeSelection/ThemeSelection';
import WeddingDateInput from '../components/form/WeddingDateInput/WeddingDateInput';
import RsvpExample from '../components/form/RsvpSelection/RsvpExample';
import ImageInput from '../components/form/ThumbnailSelection/ImageInput';
import NameInput from '../components/form/NameInput/NameInput';
import ContactInput from '../components/form/ContactInput/ContactInput';
import CalendarSelection from '../components/form/CalendarSelection/CalendarSelection';
import MessageSelection from '../components/form/MessageSelection/MessageSelection';
import AccountInput from '../components/form/AccountInput/AccountInput';
import InformSection from '../components/display/InformSection/InformSection';

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
    title: '축하 메시지',
    content: <MessageSelection />,
  },
  {
    id: 9,
    title: '축의금',
    content: <AccountInput />,
  },
  {
    id: 10,
    title: '연락하기',
    content: <ContactInput />,
  },
  {
    id: 11,
    title: '공지사항',
    content: <InformSection />,
  },
  {
    id: 12,
    title: '실시간 포토월',
    content: <RsvpExample />,
  },
  {
    id: 13,
    title: '테마 색상',
    content: <ThemeSelection />,
  },
  {
    id: 14,
    title: '글꼴',
    content: <ThemeSelection />,
  },
  {
    id: 15,
    title: '인트로 효과',
    content: <ThemeSelection />,
  },
  {
    id: 16,
    title: '배경 음악',
    content: <ThemeSelection />,
  },
];
