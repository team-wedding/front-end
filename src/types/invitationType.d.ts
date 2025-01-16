export interface InvitationDetiail {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  groomName: string;
  brideName: string;
  groomContact: string;
  brideContact: string;
  date: string;
  location: string;
  imgUrl: string;
  contentType: '제목';
  content: string;
  groomFatherName: string;
  groomMotherName: string;
  brideFatherName: string;
  brideMotherName: string;
  groomFatherContact: string;
  groomMotherContact: string;
  brideFatherContact: string;
  brideMotherContact: string;
  weddingTime: string;
  groomFatherAlive: boolean;
  groomMotherAlive: boolean;
  brideFatherAlive: boolean;
  brideMotherAlive: boolean;
  font: string;
  weight: string;
  backgroundColor: string;
}

interface ContactInfo {
  name: string;
  contact: string;
  alive?: boolean;
}
