import LoginButton from '@/components/login/LoginButton';
import naverLoginImg from '@assets/naver_login.png';

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const STATE = 'test';
const REDIRECT_URI = 'http://localhost:5173/oauth/callback/naver';
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;

const NaverLoginButton = () => {
  const handleNaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <LoginButton
      imgSrc={naverLoginImg}
      altText="Naver Login"
      onClick={handleNaverLogin}
      additionalStyles="w-[60px]"
    />
  );
};

export default NaverLoginButton;
