import useAuthStore from "../store/useAuthStore";
import { API, axiosInstance } from "../utils/config";

export const logout = async () => {
    try {
        // 서버 로그아웃 요청
        await axiosInstance.delete(API.LOGOUT(), {});

        // 클라이언트 상태 초기화
        useAuthStore.getState().clearAccessToken();

        // 로그아웃 후 로그인 페이지로 리다이렉트
        window.location.href = '/login';

    } catch (error) {
        console.log('로그아웃 중 오류 발생:', error);
        throw error;
    }
};

// request body: {”password”: STRING} 백엔드랑 의논 필요
export const withdraw = async () => {
    try {
        // 서버 로그아웃 요청
        await axiosInstance.delete(API.ACCOUNT(), {});

        // 클라이언트 상태 초기화
        useAuthStore.getState().clearAccessToken();

        // 회원탈퇴 후 로그인 페이지로 리다이렉트
        window.location.href = '/login';

    } catch (error) {
        console.log('회원탈퇴 중 오류 발생:', error)
    }
}