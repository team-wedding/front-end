export interface AccordionItemData {
  id: number;
  title: string;
  feature: string;
  isCompleted?: boolean;
  isRequired?: boolean;
  hasToggle?: boolean;
  hasDrag?: boolean;
}

export const accordionData: AccordionItemData[] = [
  {
    id: 1,
    title: '신랑 / 신부 이름',
    feature: 'nameInput',
    isCompleted: false,
    isRequired: true,
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 2,
    title: '예식 일시',
    feature: 'weddingDateInput',
    isCompleted: false,
    isRequired: true,
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 3,
    title: '예식 장소',
    feature: 'weddingPlaceInput',
    isCompleted: false,
    isRequired: true,
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 4,
    title: '대표 이미지',
    feature: 'thumbnail',
    isCompleted: false,
    isRequired: true,
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 5,
    title: '제목 / 인사말',
    feature: 'greeting',
    isCompleted: false,
    isRequired: true,
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 6,
    title: '참석 여부',
    feature: 'rsvp',
    isCompleted: false,
    isRequired: true,
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 7,
    title: '실시간 포토월',
    feature: 'phototalk',
    isCompleted: false,
    isRequired: true,
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 8,
    title: '캘린더',
    feature: 'calendar',
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 9,
    title: '지도 / 교통수단',
    feature: 'location',
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 10,
    title: '갤러리',
    feature: 'gallery',
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 11,
    title: '축의금',
    feature: 'account',
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 12,
    title: '연락하기',
    feature: 'contact',
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 13,
    title: '공지사항',
    feature: 'notice',
    hasToggle: true,
    hasDrag: true,
  },
  {
    id: 14,
    title: '글꼴',
    feature: 'font',
    hasToggle: false,
    hasDrag: false,
  },
  {
    id: 15,
    title: '배경 음악',
    feature: 'music',
    hasToggle: true,
    hasDrag: false,
  },
  // {
  //   id: 14,
  //   title: '테마 색상',
  //   feature: '',
  //   content: <ThemeFeature />,
  //   hasToggle: false,
  //   hasDrag: false,
  // },

  // {
  //   id: 16,
  //   title: '인트로 효과',
  //   feature: '',
  //   content: <ThemeFeature />,
  //   hasToggle: true,
  //   hasDrag: false,
  // },
];
