import { GuestInfo } from '@/types/guestTypes';
import { API, axiosInstance } from '@/utils/config';

// 전체 참석 여부 조회 - 하객 분류
export const getStats = async () => {
  const response = await axiosInstance.get(API.ATTENDANCE());
  return response.data;
};

// 전체 참석 여부 조회 (페이지네이션) - 상세 목록
export const getAttendances = async (
  page: number,
  size: number,
): Promise<GuestInfo[]> => {
  const response = await axiosInstance.get(API.ATTENDANCE(page, size));
  return response.data;
};

// 개인 참석 여부 등록
export const postAttendance = async (guestInfo: GuestInfo) => {
  const response = await axiosInstance.post(API.ATTENDANCE(), guestInfo);
  return response.data;
};
