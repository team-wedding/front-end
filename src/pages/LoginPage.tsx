import { Link, useNavigate } from 'react-router';

const K_REST_API_KEY = import.meta.env.VITE_K_REST_API_KEY;
const K_REDIRECT_URI = `http://localhost:3000/api/users/oauth/kakao`;
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

const LoginPage = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  }

  return (
    <div className="splash-layout">
      <div className="column-center w-full p-8">
        <img className="w-52 mb-8" src="/src/assets/logo2.png" alt="Logo" />

        <div className='text-sm text-gray-500 opacity-70 mb-20'>우리만의 청첩장을 만들어 보세요!</div>

        {/* Login Buttons */}
        <div className="flex flex-col gap-4">
          <img
            src="/src/assets/kakao-login.png"
            alt="Kakao Login"
            className="cursor-pointer w-full"
            onClick={handleKakaoLogin}
          />
          <img
            src="/src/assets/naver-login.png"
            alt="Naver Login"
            className="cursor-pointer w-full pb-12"
            onClick={() => navigate('/naver-login')}
          />
          <img
            src="/src/assets/email-login.png"
            alt="Email Login"
            className="cursor-pointer w-full pb-3"
            onClick={() => navigate('/email-login')}
          />
        </div>

        {/* Signup Link */}
        <div className="flex gap-1 text-sm text-gray-500 opacity-70">
          아직 계정이 없으신가요?
          <Link to="/signup" className="underline hover:text-gray-800">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// const K_REST_API_KEY = process.env.REACT_APP_K_REST_API_KEY; 
// const K_REDIRECT_URI = `http://localhost:3001/oauth`;
// const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

// const Loginpage = () => {

//   const handleKakaoLogin = () => {
//     window.location.href = kakaoURL; //kakaoURL로 이동
    
//    return(
//     <div>
//      <button onClick={handleKakaoLogin} className="KakaoButton"></button>
//     </div
   
//    )

    
//   };}