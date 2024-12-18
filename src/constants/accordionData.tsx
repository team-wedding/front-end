import { AccordionItemData } from '../components/common/CreateInvitation/Accordion';
import AddressInput from '../components/form/AddressInput/AddressInput';
import ContactInput from '../components/form/ContactInput';
import GreetingInput from '../components/form/GreetingInput/GreetingInput';
import ImageInput from '../components/form/ImageInput';
import NameInput from '../components/form/NameInput';
import WeddingDateInput from '../components/form/WeddingDateInput/WeddingDateInput';

export const accordionData: AccordionItemData[] = [
  {
    id: 1,
    title: '이름',
    content: <NameInput />,
  },
  {
    id: 2,
    title: '연락처',
    content: <ContactInput />
  },
  {
    id: 3,
    title: '예식 일시',
    content: <WeddingDateInput />
  },
  {
    id: 4,
    title: '예식 장소',
    content: <AddressInput />,
  },
  {
    id: 5,
    title: '대표 이미지',
    content: <ImageInput />,
  },
  {
    id: 6,
    title: '제목 / 인사말',
    content: <GreetingInput />,
  },
  {
    id: 7,
    title: '참석 여부',
    content: <AddressInput />,
  },
  {
    id: 8,
    title: '테마 및 글꼴',
    content: <AddressInput />,
  },
  
];