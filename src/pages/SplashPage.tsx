import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { useNavigate } from 'react-router';

const SplashPage = () => {
  const navigate = useNavigate()
  return (
    <PageLayout>
      <div className='flex flex-col w-full justify-center items-center gap-4'>
        <div className='flex flex-col w-full  items-center mt-40 text-5xl font-semibold gap-3'>
          <span>우리,</span>
          <span>결혼해요</span>
        </div>
        <img className="size-48" src="/src/assets/logo.png" alt="" />
        <div>나의 청첩장을 만들어 보세요!</div>
        <button className='h-12 bg-primary w-3/6 rounded-md font-medium text-white text-xl' onClick={() => { navigate("/signup") }}>회원가입</button>
        <button className='h-12 bg-primary w-3/6 rounded-md font-medium text-white text-xl' onClick={() => { navigate("/login") }}>로그인</button>
      </div>
    </PageLayout>
  )
};

export default SplashPage;
