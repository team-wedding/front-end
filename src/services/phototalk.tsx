import { CreatePhotoTalk, PhotoTalk } from '@/types/phototalkType';
import { API, axiosInstance } from '@/utils/config';

// 포토톡 전체 조회
export const getPhototalks = async (
  page: number,
  size: number,
): Promise<PhotoTalk[]> => {
  const { data } = await axiosInstance.get(API.PHOTOTALKS(``, page, size));

  return data;
};

// 포토톡 단일 조회
export const getPhototalk = async (id: number): Promise<PhotoTalk> => {
  const { data } = await axiosInstance.get(API.PHOTOTALKS(id.toString()));

  return data;
};

// 포토톡 등록
export const postPhototalk = async (photoTalkData: CreatePhotoTalk) => {
  const { data } = await axiosInstance.post(API.PHOTOTALKS(), photoTalkData);

  return data;
};

// 포토톡 수정
export const updatePhototalk = async (id: number, photoTalkData: PhotoTalk) => {
  const { data } = await axiosInstance.put(
    API.PHOTOTALKS(id.toString()),
    photoTalkData,
  );

  return data;
};

// 포토톡 삭제
export const deletePhototalk = async ({
  id,
  name,
  password,
}: {
  id: number;
  name: string;
  password: string;
}) => {
  const { data } = await axiosInstance.delete(API.PHOTOTALKS(id.toString()), {
    data: { name, password },
  });
  return data;
};
