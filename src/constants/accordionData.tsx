import { AccordionItemData } from '../components/common/CreateInvitation/Accordion';
import InputAddress from '../components/form/AddressInput/AddressInput';

export const accordionData: AccordionItemData[] = [
  {
    id: 1,
    title: '이름',
    content: (
      <input
        type="text"
        placeholder="이름 입력"
        className="w-full p-2 border rounded"
      />
    ),
  },
  {
    id: 2,
    title: '연락처',
    content: (
      <input
        type="tel"
        placeholder="연락처 입력"
        className="w-full p-2 border rounded"
      />
    ),
  },
  {
    id: 3,
    title: '예식 일시',
    content: (
      <input type="datetime-local" className="w-full p-2 border rounded" />
    ),
  },
  {
    id: 4,
    title: '예식 장소',
    content: <InputAddress />,
  },
];
