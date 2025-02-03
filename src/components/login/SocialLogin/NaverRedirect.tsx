import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { postNaverLogin } from '../../../services/userService';
import { useUserStore } from '@/store/useUserStore';

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
          navigate('/');
        } catch (error) {
          console.error('네이버 로그인 실패', error);
        }
      }
    };
    handleLogin();
  }, [navigate]);

  return <div>{/* <h1 className="text-gray-300">로그인 중입니다.</h1> */}</div>;
};

export default NaverRedirect;
