import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRlc3RSIiwiZW1haWwiOiJ0ZXN0UkB0ZXN0LmNvbSIsImlhdCI6MTczNjkyMTE1NywiZXhwIjoxNzM3MDA3NTU3fQ.FWd9BbP5HzZsM7EOy5x5UmyQ0bkHvUjhPtn78DTudBM';
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    return res; // Simply return the response
  },
  async (error) => {
    const status = error.response ? error.response.status : null;
    console.log(status);
    if (status === 401) {
      try {
        //Refresh Token
        // const accessToken = '';
        // // const refreshTokenFromStorage = localStorage.getItem(
        // //   STORAGE_TOKEN.REFRESH_TOKEN,
        // //   );
        // // const { accessToken, refreshToken } = await AuthService.refresh(
        // //   refreshTokenFromStorage,
        // // );
        // // LocalStorageService.setTokens(accessToken, refreshToken);
        // axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        // return await axiosInstance(originalConfig);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    if (status === 403 && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

export const API = {
  LOGIN: () => `${BASE_URL}/users/login`,
  SIGNUP: () => `${BASE_URL}/users/signup`,
  LOGOUT: () => `${BASE_URL}/users/logout`,
  REFRESH: () => `${BASE_URL}/users/refresh`,
  ACCOUNT: () => `${BASE_URL}/users/account`,
  INVITATIONS: (id?: string) => `${BASE_URL}/invitations${id ? id : ''}`,
  ATTENDANCE: () => `${BASE_URL}/attendances`,
};
