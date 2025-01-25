import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { postNaverLogin } from '../../../services/userService';

export const NaverRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      console.log(code);

      if (code) {
        try {
          await postNaverLogin(code);

          navigate('/');
        } catch (err) {
          console.error(err);
        }
      }
    };
    handleLogin();
  }, [navigate]);

  return <div>{/* <h1 className="text-gray-300">로그인 중입니다.</h1> */}</div>;
};

export default NaverRedirect;
