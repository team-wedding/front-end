import React from 'react';
import { useNavigate } from 'react-router';

const SplashPage = () => {
  const navigate = useNavigate();

  return (
    <div className="splash-layout">
      <div className="column-center justify-between w-full p-8 gap-10">
        <img className="w-52" src="/src/assets/logo2.png" alt="Title" />
        <div className="opacity-60 text-gray-600 text-xs mb-10 tracking-wide font-Paperlogy">
          나만의 청첩장을 만들어 보세요!
        </div>
        <div className="flex flex-col w-full max-w-sm gap-2">
          <button
            className="splash-btn hover:bg-logo"
            onClick={() => navigate('/login')}
          >
            로그인
          </button>
          <button
            className="splash-btn hover:bg-logo"
            onClick={() => navigate('/signup')}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
