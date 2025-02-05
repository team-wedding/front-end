import { Link } from 'react-router';
import KakaoLoginButton from './SocialLogin/KakaoLoginButton';
import NaverLoginButton from './SocialLogin/NaverLoginButton';
import EmailLoginButton from './EmailLogin/EmailLoginButton';
import logo from '@/assets/logo2.png'
const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-content">
      <img className="w-52 my-8" src={logo} alt="Logo" />

      <div className="text-sm text-gray-500 opacity-70 mb-40">
        우리만의 청첩장을 만들어 보세요!
      </div>

      <div className="column-center gap-2 px-6">
        <KakaoLoginButton />
        <NaverLoginButton />
        <EmailLoginButton />
      </div>

      <div className="flex gap-1 text-xs text-gray-500 opacity-70">
        아직 계정이 없으신가요?
        <Link to="/signup" className="underline hover:text-gray-800">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
