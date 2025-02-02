import { GuestInfo } from "@/types/GuestType";
import { API, axiosInstance } from "@/utils/config"

// 전체 참석 여부 조회
export const getAttendances = async () => {
    const response = await axiosInstance.get(API.ATTENDANCE());
    return response.data;
}

// 개인 참석 여부 등록
export const postAttendance = async (guestInfo: GuestInfo) => {
    const response = await axiosInstance.post(API.ATTENDANCE(), guestInfo);
    return response.data;
}