import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Link, useNavigate } from 'react-router';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center w-full gap-8 p-4 sm:gap-8 sm:p-8">

        <img 
          className="mt-10 sm:mt-30 w-60 h-45 sm:w-80 sm:h-60" 
          src="/src/assets/image20.png" 
          alt="Title" 
        />

        {/* Input Fields */}
        <div className="flex flex-col w-full max-w-md gap-3">
          <input
            className="h-12 px-4 text-base rounded-lg border border-gray-300 focus-visible:ring-1 focus:ring-primary focus:border-primary"
            type="email"
            placeholder="이메일"
          />
          <input
            className="h-12 px-4 text-base rounded-lg border border-gray-300 focus-visible:ring-1 focus:ring-primary focus:border-primary"
            type="password"
            placeholder="비밀번호"
          />
          <button
            className="h-12 bg-primary rounded-lg font-medium text-white text-lg shadow-md"
            onClick={() => navigate("/")}
          >
            로그인
          </button>
        </div>

        {/* Additional Links */}
        <div className="flex flex-row w-full justify-between max-w-md text-sm text-gray-600">
          <Link to="/reset-password" className="hover:text-primary">
            비밀번호 찾기
          </Link>
          <Link to="/signup" className="hover:text-primary">
            회원가입
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
