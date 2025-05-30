import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { postNaverLogin } from '../../../services/userService';
import { useUserStore } from '@/store/useUserStore';
import axios from 'axios';

export const NaverRedirect = () => {
  const navigate = useNavigate();
  const { fetchUserInfo } = useUserStore();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const handleLogin = async () => {
      if (code) {
        try {
          await postNaverLogin(code);
          await fetchUserInfo();
          navigate('/dashboard');
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const errMsg = error.response?.data?.message;
            if (errMsg === '이미 해당 email로 회원가입된 이력있음.') {
              navigate('/login', {
                state: { errorMessage: errMsg },
              });
            } else {
              throw new Error(`네이버 로그인 실패 :${error}`);
            }
          }
        }
      }
    };
    handleLogin();
  }, [code, fetchUserInfo, navigate]);

  return <div>{/* <h1 className="text-gray-300">로그인 중입니다.</h1> */}</div>;
};

export default NaverRedirect;
