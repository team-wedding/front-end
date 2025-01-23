import useAuthStore from "../store/useAuthStore";
import { API, axiosInstance } from "../utils/config";

interface LoginInfo {
    email: string;
    password: string;
}

export const login = async (loginInfo: LoginInfo) => {
    try {
        const response = await axiosInstance.post(API.LOGIN(), loginInfo);

        const accessToken = response.headers['authorization'];
        if (accessToken) {
            useAuthStore.getState().setAccessToken(accessToken);
        } else {
            console.error('Access Token이 응답 헤더에 없습니다.');
            throw new Error('Access Token이 누락되었습니다.');
        }
        console.log('이메일로 로그인 성공');
        // return response.data;
    } catch (error) {
        console.log('이메일로 로그인 중 오류 발생:', error);
        throw error;
    }
};

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