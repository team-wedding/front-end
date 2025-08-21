import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import useAuthStore from '../store/useAuthStore';

const BASE_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`; // *** 확인
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;
    console.log(status);

    const isAuthRequired = !originalRequest.headers?.['X-No-Auth'];

    if (status === 401 && isAuthRequired) {
      try {
        // Refresh Token으로 Access Token 갱신
        const refreshResponse = await axios.get(API.REFRESH(), {});

        const newAccessToken = refreshResponse.headers['authorization'];

        if (newAccessToken) {
          // Zustand 상태에 새로 발급받은 Access Token 저장
          useAuthStore.getState().setAccessToken(newAccessToken);

          // 실패했던 요청을 다시 실행
          originalRequest.headers.Authorization = `${newAccessToken}`; // *** 확인
          return axiosInstance.request(originalRequest);
        }
      } catch (refreshError) {
        console.error('Refresh Token 갱신 실패:', refreshError);
        // 로그인 페이지로 이동
        useAuthStore.getState().clearAccessToken();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    if (status === 403 && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

export const API = {
  EMAILLOGIN: () => `${BASE_URL}/users/login`,
  KAKAOLOGIN: () => `${BASE_URL}/users/oauth/kakao`,
  NAVERLOGIN: () => `${BASE_URL}/users/oauth/naver`,
  RESETPASSWORD: () => `${BASE_URL}/users/account/password/reset`,
  SIGNUP: () => `${BASE_URL}/users/signup`,
  LOGOUT: () => `${BASE_URL}/users/logout`,
  REFRESH: () => `${BASE_URL}/users/refresh`,
  ACCOUNT: () => `${BASE_URL}/users/account`,
  INVITATION: (id?: string) => `${BASE_URL}/invitations/${id ? id : ''}`,
  INVITATION_CREDENTIAL: (id?: string) =>
    `${BASE_URL}/invitations/${id ? `${id}/` : ''}credential`,
  ATTENDANCE: (page?: number, size?: number) =>
    `${BASE_URL}/attendances${page ? `/?page=${page}` : ''}${size ? `&size=${size}` : ''}`,
  CHANGEPASSWORD: () => `${BASE_URL}/users/account/password`,
  PHOTOTALKS: {
    list: () => `${BASE_URL}/celebrationMsgs`,
    guestList: (userId: string) =>
      `${BASE_URL}/celebrationMsgs/guest/${userId}`,

    detail: (id: string) => `${BASE_URL}/celebrationMsgs/${id}`,
    create: () => `${BASE_URL}/celebrationMsgs`,
    update: (id: string) => `${BASE_URL}/celebrationMsgs/${id}`,

    deleteByGuest: (id: string) => `${BASE_URL}/celebrationMsgs/${id}`,
    deleteByAdmin: (id: string) => `${BASE_URL}/celebrationMsgs/admin/${id}`,
  },
  S3Images: (directory: string) => `${BASE_URL}/s3/?directory=${directory}`,
  S3InvitationRemoval: (id: string) => `${BASE_URL}/s3/invitations/${id}`,
  S3PhotoTalkRemoval: (id: string) => `${BASE_URL}/s3/celebrationMsgs/${id}`,
};
