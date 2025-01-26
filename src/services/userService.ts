import useAuthStore from '../store/useAuthStore';
import { API, axiosInstance } from '../utils/config';

// interface SignupInfo {
//     name: string;
//     email: string;
//     password: string;
// }

interface LoginInfo {
  email: string;
  password: string;
}

// interface PasswordInfo {
//     password: string;
//     newPassword: string;
// }

// export const signup = async (signupInfo: SignupInfo) => {
//     try {
//         await axiosInstance.post(API.SIGNUP(), SignupInfo);
//     }
// }

export const postEmailLogin = async (loginInfo: LoginInfo) => {
  try {
    const response = await axiosInstance.post(API.EMAILLOGIN(), loginInfo);

    const accessToken = response.headers['authorization'];
    if (accessToken) {
      useAuthStore.getState().setAccessToken(accessToken);
    } else {
      console.error('Access Token이 응답 헤더에 없습니다.');
      throw new Error('Access Token이 누락되었습니다.');
    }
    console.log('이메일 로그인 성공');
    // return response.data;
  } catch (error) {
    console.log('이메일 로그인 중 오류 발생:', error);
    throw error;
  }
};

export const postKakaoLogin = async (code: string) => {
  try {
    const response = await axiosInstance.post(API.KAKAOLOGIN(), { code });

    const accessToken = response.headers['authorization'];
    if (accessToken) {
      useAuthStore.getState().setAccessToken(accessToken);
    } else {
      console.error('Access Token이 응답 헤더에 없습니다.');
      throw new Error('Access Token이 누락되었습니다.');
    }
    console.log('카카오 로그인 성공');
  } catch (error) {
    console.log('카카오 로그인 중 오류 발생:', error);
    throw error;
  }
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

// export const changePassword = async (passwordInfo: PasswordInfo) => {
//     try {
//         // 비밀번호 변경 요청
//         const response = await axiosInstance.put(API.PASSWORD(), passwordInfo);

//         console.log('비밀번호 변경 성공:', response.data);

//         // 필요에 따라 성공 메시지나 상태 처리를 추가
//         return response.data;
//     } catch (error) {
//         console.error('비밀번호 변경 중 오류 발생:', error);

//         // 에러를 호출한 쪽에서 처리할 수 있도록 throw
//         throw error;
//     }
// };
