import LoginButton from '@/components/login/LoginButton';
import kakaoLoginImg from '@assets/kakao_login.png';

const K_REST_API_KEY = import.meta.env.VITE_K_REST_API_KEY;
const K_REDIRECT_URI = `https://woogyeol.site/oauth/callback/kakao`;
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <LoginButton
      imgSrc={kakaoLoginImg}
      altText="Kakao Login"
      onClick={handleKakaoLogin}
      additionalStyles="w-[60px]"
    />
  );
};

export default KakaoLoginButton;
