import KakaoLoginButton from '@/components/login/SocialLogin/KakaoLoginButton';
import NaverLoginButton from '@/components/login/SocialLogin/NaverLoginButton';

const SocialLogin = () => {
  return (
    <div className="flex-center gap-6">
      <NaverLoginButton />
      <KakaoLoginButton />
    </div>
  );
};

export default SocialLogin;
