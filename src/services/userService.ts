import useAuthStore from '../store/useAuthStore';
import { API, axiosInstance } from '../utils/config';

interface SignupInfo {
  name: string;
  email: string;
  password: string;
}

interface LoginInfo {
  email: string;
  password: string;
}

interface EmailInfo {
  email: string;
}

interface PasswordInfo {
  password: string;
  newPassword: string;
}

export const signup = async (signupInfo: SignupInfo) => {
  console.log({ signupInfo, provider: 'local' });
  const response = await axiosInstance.post(API.SIGNUP(), { ...signupInfo, provider: 'local' });
  return response.data;
}


export const postEmailLogin = async (loginInfo: LoginInfo) => {
  const response = await axiosInstance.post(API.EMAILLOGIN(), loginInfo);
  const accessToken = response.headers['authorization'];
  useAuthStore.getState().setAccessToken(accessToken);
  return response.data;
};

export const postKakaoLogin = async (code: string) => {
  const response = await axiosInstance.post(API.KAKAOLOGIN(), { code });
  const accessToken = response.headers['authorization'];
  useAuthStore.getState().setAccessToken(accessToken);
};

export const postNaverLogin = async (code: string) => {
  const response = await axiosInstance.post(API.NAVERLOGIN(), { code });
  const accessToken = response.headers['authorization'];
  useAuthStore.getState().setAccessToken(accessToken);
};

export const logout = async () => {
  await axiosInstance.delete(API.LOGOUT(), {});
  useAuthStore.getState().clearAccessToken();
};

export const withdraw = async () => {
  await axiosInstance.delete(API.ACCOUNT(), {});
  useAuthStore.getState().clearAccessToken();
};

export const resetPassword = async (emailInfo: EmailInfo) => {
  const response = await axiosInstance.put(API.RESETPASSWORD(), emailInfo);
  return response.data;
}

export const getUserInfo = async () => {
  const response = await axiosInstance.get(API.ACCOUNT(), {});
  return response.data;
}

export const changePassword = async (passwordInfo: PasswordInfo) => {
  const response = await axiosInstance.put(API.CHANGEPASSWORD(), passwordInfo);
  return response.data;
}