import { AccordionItemData } from '../components/common/CreateInvitation/Accordion';
import AddressInput from '../components/form/BasicInformation/AddressInput/AddressInput';
import NameInput from '../components/form/BasicInformation/NameInput/NameInput';
import WeddingDateInput from '../components/form/BasicInformation/WeddingDateInput/WeddingDateInput';
import AccountFeature from '../components/form/Feature/AccountFeature/AccountFeature';
import CalendarFeature from '../components/form/Feature/CalendarFeature/CalendarFeature';
import ContactFeature from '../components/form/Feature/ContactFeature/ContactFeature';
import GalleryFeature from '../components/form/Feature/GalleryFeature/GalleryFeature';
import GreetingFeature from '../components/form/Feature/GreetingFeature/GreetingFeature';
import LocationFeature from '../components/form/Feature/LocationFeature/LocationFeature';
import RsvpExample from '../components/form/Feature/RsvpFeature/RsvpExample';
import ImageInput from '../components/form/Feature/ThumbnailFeature/ImageInput';
import ThemeFeature from '../components/form/Theme/ThemeFeature/ThemeFeature';
import NoticeFeature from '../components/form/Feature/NoticeFeature/NoticeFeature';

export const accordionData: AccordionItemData[] = [
  {
    id: 1,
    title: '이름',
    feature: '',
    content: <NameInput />,
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 2,
    title: '예식 일시',
    feature: '',
    content: <WeddingDateInput />,
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 3,
    title: '예식 장소',
    feature: '',
    content: <AddressInput />,
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 4,
    title: '대표 이미지',
    feature: '',
    content: <ImageInput />,
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 5,
    title: '제목 / 인사말',
    feature: '',
    content: <GreetingFeature />,
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 6,
    title: '참석 여부',
    feature: '',
    content: <RsvpExample />,
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 7,
    title: '실시간 포토월',
    feature: '',
    content: <RsvpExample />, // PhotoTalkFeature로 수정 필요
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 8,
    title: '캘린더',
    feature: 'mainCalendar',
    content: <CalendarFeature />,
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 9,
    title: '지도 / 교통수단',
    feature: 'mainLocation',
    content: <LocationFeature />,
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 10,
    title: '갤러리',
    feature: 'mainGallery',
    content: <GalleryFeature />,
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 11,
    title: '축의금',
    feature: 'mainAccount',
    content: <AccountFeature />,
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 12,
    title: '연락하기',
    feature: 'mainContact',
    content: <ContactFeature />,
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 13,
    title: '공지사항',
    feature: 'mainNotice',
    content: <NoticeFeature />,
    hasToggle: true,
    hasDrag: true,
  },

  {
    id: 14,
    title: '테마 색상',
    feature: '',
    content: <ThemeFeature />,
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 15,
    title: '글꼴',
    feature: '',
    content: <ThemeFeature />,
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 16,
    title: '인트로 효과',
    feature: '',
    content: <ThemeFeature />,
    hasToggle: true,
    hasDrag: false,
  },
  {
    id: 17,
    title: '배경 음악',
    feature: '',
    content: <ThemeFeature />,
    hasToggle: true,
    hasDrag: false,
  },
];
