import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { postKakaoLogin } from '../../../services/userService';
import { useUserStore } from '@/store/useUserStore';

export const KakaoRedirect = () => {
  const navigate = useNavigate();
  const { fetchUserInfo } = useUserStore();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const handleLogin = async () => {
      if (code) {
        try {
          await postKakaoLogin(code);
          await fetchUserInfo();
          navigate('/dashboard');
        } catch (error) {
          console.error('카카오 로그인 실패', error);
        }
      }
    };
    handleLogin();
  }, [navigate]);

  return <div>{/* <h1 className="text-gray-300">로그인 중입니다.</h1> */}</div>;
};

export default KakaoRedirect;
