export interface PhotoTalk {
  id?: number;
  userId?: number | null;
  invitationId?: number;
  name: string;
  password: string;
  message: string;
  imageUrl: string[];
}

export interface CreatePhotoTalk {
  userId?: number | null;
  invitationId?: number;
  name: string;
  password: string;
  message: string;
  imageUrl: string[];
}

export interface PhotoTalkResponse {
  allCelebrationMsgs: PhotoTalk[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
