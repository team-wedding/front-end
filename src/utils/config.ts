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
    const accessToken = import.meta.env.VITE_TOKEN;
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
  INVITATIONS: (id?: string) => `${BASE_URL}/invitations/${id ? id : ''}`,
  ATTENDANCE: () => `${BASE_URL}/attendances`,
};
