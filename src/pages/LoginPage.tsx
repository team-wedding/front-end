import React from 'react';
import { Link, useNavigate } from 'react-router';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="splash-layout">
      <div className="column-center w-full p-8">
        <img className="w-52 mb-10" src="/src/assets/logo2.png" alt="Title" />

        {/* Input Fields */}
        <div className="flex flex-col w-full gap-3">
          <input className="splash-input" type="email" placeholder="이메일" />
          <input
            className="splash-input"
            type="password"
            placeholder="비밀번호"
          />
          <button
            className="splash-btn mt-4 mb-3 hover:bg-logo"
            onClick={() => navigate('/')}
          >
            로그인
          </button>
        </div>

        {/* Additional Links */}
        <div className="flex gap-3 text-xs text-gray-500 opacity-70">
          <Link to="/reset-password" className="hover:text-primary">
            비밀번호 찾기
          </Link>
          <Link to="/signup" className="hover:text-primary">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
