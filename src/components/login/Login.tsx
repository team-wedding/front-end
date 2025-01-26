import { Link } from 'react-router';
import KakaoLoginButton from './SocialLogin/KakaoLoginButton';
import NaverLoginButton from './SocialLogin/NaverLoginButton';
import EmailLoginButton from './EmailLogin/EmailLoginButton';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-content p-8">
      <img className="w-52 mb-8" src="/src/assets/logo2.png" alt="Logo" />

      <div className="text-sm text-gray-500 opacity-70 mb-16">
        우리만의 청첩장을 만들어 보세요!
      </div>

      <div className="flex flex-col gap-4">
        <KakaoLoginButton />
        <NaverLoginButton />
        <EmailLoginButton />
      </div>

      <div className="flex gap-1 text-sm text-gray-500 opacity-70">
        아직 계정이 없으신가요?
        <Link to="/signup" className="underline hover:text-gray-800">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
