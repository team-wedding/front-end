export interface InvitationDetiail {
  id?: number;
  title: string;
  // createdAt?: string;
  // updatedAt?: string;
  groomName: string;
  brideName: string;
  groomContact: string;
  brideContact: string;
  date: string;
  location: string[];
  imgUrl: string;
  contentType: string;
  content: string;
  weddingTime: string;
  groomFatherName: string;
  groomMotherName: string;
  brideFatherName: string;
  brideMotherName: string;
  groomFatherContact: string;
  groomMotherContact: string;
  brideFatherContact: string;
  brideMotherContact: string;
  groomFatherAlive: boolean;
  groomMotherAlive: boolean;
  brideFatherAlive: boolean;
  brideMotherAlive: boolean;
  backgroundColor: string;
  attendanceTitle: '참석 여부 제목';
  attendanceContent: '참석 여부 설명';
  attendanceIsDining: true;
  font: string;
  calendars?: CalaendarDetail[];
  maps?: MapDetail[];
  galleries?: [];
  accounts?: [
    {
      order: number;
      accountHolderName: string;
      bankName: string;
      accountNumber: string;
      kakaoUrl: string;
    },
  ];
  contacts?: [
    {
      order: number;
      groomContact: string;
      brideContact: string;
      groomFatherContact: string;
      groomMotherContact: string;
      brideFatherContact: string;
      brideMotherContact: string;
    },
  ];
  notices?: [
    {
      order: number;
      title: string;
      content: string;
      image: string;
    },
  ];
}

interface CalaendarDetail {
  order: number;
  calendar: true;
  dDay: true;
  countdown: true;
}
interface MapDetail {
  order: number;
  tMap: true;
  naverMap: false;
  kakaoMap: false;
  personalCar: true;
  subway: false;
  bus: false;
  personalCarContent: string;
  subwayContent: string;
  busContent: string;
}
interface GalleryDetail {
  order: number;
  images: string[];
  grid: true;
}
interface AccountDetail {
  order: number;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  kakaoUrl: string;
}
interface ContactDetail {
  order: number;
  groomContact: string;
  brideContact: string;
  groomFatherContact: string;
  groomMotherContact: string;
  brideFatherContact: string;
  brideMotherContact: string;
}
interface NoticeDetail {
  order: number;
  title: string;
  content: string;
  image: string;
}
