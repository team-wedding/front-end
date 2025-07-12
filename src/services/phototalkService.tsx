import {
  CreatePhotoTalk,
  PhotoTalk,
  PhotoTalkResponse,
} from '@/types/phototalkTypes';
import { API, axiosInstance } from '@/utils/config';

// 포토톡 전체 조회
export const getPhototalks = async (
  page: number,
  size: number,
): Promise<PhotoTalkResponse> => {
  const url = API.PHOTOTALKS.list();
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const { data } = await axiosInstance.get(url, {
    params: { page, size },
    headers,
  });

  return data;
};

// 포토톡 하객용 전체 조회 (비회원)
export const getGuestPhototalks = async (
  userId: string,
  page: number,
  size: number,
): Promise<PhotoTalkResponse> => {
  const url = API.PHOTOTALKS.guestList(userId);
  const { data } = await axiosInstance.get(url, {
    params: { page, size },
    headers: { 'X-No-Auth': 'true' },
  });

  return data;
};

// 포토톡 단일 조회
export const getPhototalk = async (id: number): Promise<PhotoTalk> => {
  const url = API.PHOTOTALKS.detail(id.toString());
  const { data } = await axiosInstance.get(url);

  return data;
};

// 포토톡 등록
export const postPhototalk = async (
  photoTalkData: CreatePhotoTalk,
): Promise<PhotoTalk> => {
  const url = API.PHOTOTALKS.create();
  const { data } = await axiosInstance.post(url, photoTalkData);

  return data;
};

// 포토톡 수정
export const updatePhototalk = async (id: number, photoTalkData: PhotoTalk) => {
  const url = API.PHOTOTALKS.update(id.toString());
  const { data } = await axiosInstance.put(url, photoTalkData);

  return data;
};

// 포토톡 삭제 (하객)
export const deletePhototalkByGuest = async ({
  id,
  name,
  password,
}: {
  id: number;
  name: string;
  password: string;
}) => {
  const url = API.PHOTOTALKS.deleteByGuest(id.toString());
  const { data } = await axiosInstance.delete(url, {
    data: { name, password },
  });

  return data;
};

// 포토톡 삭제 (회원)
export const deletePhototalkByAdmin = async (id: number) => {
  const url = API.PHOTOTALKS.deleteByAdmin(id.toString());
  const { data } = await axiosInstance.delete(url);

  return data;
};
