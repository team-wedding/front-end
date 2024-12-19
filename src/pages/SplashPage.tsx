import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { useNavigate } from 'react-router';

const SplashPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center w-full gap-4 p-4 sm:gap-6 sm:p-8">

        {/* Title Section */}
        <img 
          className="mt-10 sm:mt-30 w-60 h-45" 
          src="/src/assets/image20.png" 
          alt="Title" 
        />

        {/* Logo Section */}
        <img 
          className="w-20 h-240 sm:w-32 sm:h-32" 
          src="/src/assets/logo.png" 
          alt="Logo" 
        />

        {/* Description */}
        <div className="text-center text-gray-600 text-base sm:text-lg mb-6">
          나만의 청첩장을 만들어 보세요!
        </div>

        {/* Buttons */}
        <div className="flex flex-col w-full max-w-sm gap-4">
          <button
            className="h-12 bg-primary rounded-lg font-medium text-white text-lg shadow-md"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </button>
          <button
            className="h-12 bg-primary rounded-lg font-medium text-white text-lg shadow-md"
            onClick={() => navigate("/login")}
          >
            로그인
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default SplashPage;
