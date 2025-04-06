export interface InvitationDetiail {
  id?: number;
  createdAt?: string;
  // updatedAt?: string;

  title: string;
  groomName: string;
  brideName: string;
  date: number[];
  location: string[];
  imgUrl: string;
  greetingTitle: string;
  greetingContent: string;
  weddingTime: number[];

  groomFatherName: string;
  groomMotherName: string;
  brideFatherName: string;
  brideMotherName: string;

  groomFatherAlive: boolean;
  groomMotherAlive: boolean;
  brideFatherAlive: boolean;
  brideMotherAlive: boolean;

  backgroundColor: string;
  attendanceTitle: string;
  attendanceContent: string;
  attendanceIsDining: boolean;
  attendance: boolean;
  font: string;
  fontSize: boolean;
  calendars: CalaendarDetail[];
  maps: MapDetail[];
  galleries: Omit<GalleryDetail[], 'images'>;
  accounts: AccountDetail[];
  contacts: ContactDetail[];
  notices: NoticeDetail[];
  audio: number | nulll;
}

interface CalendarDetail {
  order?: number;
  isActive: boolean;
  calendar: boolean;
  dDay: boolean;
  countdown: boolean;
}
interface MapDetail {
  order?: number;
  isActive: boolean;
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
  order?: number;
  isActive: boolean;
  images: string[];
  grid: boolean;
}
export interface AccountDetail {
  order?: number;
  isActive: boolean;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  kakaoUrl: string;
}
interface ContactDetail {
  order?: number;
  isActive: boolean;
  groomContact: string;
  brideContact: string;
  groomFatherContact: string;
  groomMotherContact: string;
  brideFatherContact: string;
  brideMotherContact: string;
}
export interface NoticeDetail {
  order?: number;
  id?: number;
  isActive: boolean;
  noticeId: number;
  title: string;
  content: string;
  image: string | null;
}
