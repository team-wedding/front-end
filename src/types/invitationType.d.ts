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
  attendanceIsDining: boolean;
  font: string;
  calendars?: CalaendarDetail[];
  maps?: MapDetail[];
  galleries?: GalleryDetail[];
  accounts?: AccountDetail[];
  contacts?: ContactDetail[];
  notices?: NoticeDetail[];
  audio: number | nulll;
}

interface CalaendarDetail {
  order: number;
  calendar: boolean;
  dDay: boolean;
  countdown: boolean;
}
interface MapDetail {
  order: number;
  tMap: boolean;
  naverMap: boolean;
  kakaoMap: boolean;
  personalCar: boolean;
  subway: boolean;
  bus: boolean;
  personalCarContent: string;
  subwayContent: string;
  busContent: string;
}
interface GalleryDetail {
  order: number;
  images: string[];
  grid: boolean;
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
