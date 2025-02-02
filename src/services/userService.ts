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
  try {
    const response = await axiosInstance.post(API.NAVERLOGIN(), { code });

    const accessToken = response.headers['authorization'];
    if (accessToken) {
      useAuthStore.getState().setAccessToken(accessToken);
    } else {
      console.error('Access Token이 응답 헤더에 없습니다.');
      throw new Error('Access Token이 누락되었습니다.');
    }
    console.log('네이버 로그인 성공');
  } catch (error) {
    console.log('네이버 로그인 중 오류 발생:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    // 서버 로그아웃 요청
    const response = await axiosInstance.delete(API.LOGOUT(), {});
    const accessToken = response.headers['authorization'];
    console.log(accessToken);
    // 클라이언트 상태 초기화
    useAuthStore.getState().clearAccessToken();

    // 로그아웃 후 로그인 페이지로 리다이렉트
    window.location.href = '/login';
  } catch (error) {
    console.log('로그아웃 중 오류 발생:', error);
    throw error;
  }
};

export const withdraw = async () => {
  try {
    // 서버 로그아웃 요청
    await axiosInstance.delete(API.ACCOUNT(), {});

    // 클라이언트 상태 초기화
    useAuthStore.getState().clearAccessToken();

    // 회원탈퇴 후 로그인 페이지로 리다이렉트
    window.location.href = '/login';
  } catch (error) {
    console.log('회원탈퇴 중 오류 발생:', error);
    throw error;
  }
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
  console.log(passwordInfo);
  const response = await axiosInstance.put(API.CHANGEPASSWORD(), passwordInfo);
  return response.data;
}