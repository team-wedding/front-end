import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Link, useNavigate } from 'react-router';

const LoginPage = () => {
  const navigate = useNavigate()
  return (
    <PageLayout>
      <div className='flex flex-col w-full h-full justify-center items-center gap-4'>
        <div className='flex flex-col w-full  items-center mt-40 text-5xl font-semibold'>
          <span>로그인</span>
        </div>
        <div className="flex flex-col w-3/6 gap-3">
          <div>이메일</div>
          <input className="rounded-lg" type="text" placeholder="이메일을 입력해주세요" />
          <div>비밀번호</div>
          <input className="rounded-lg" type="password" placeholder="이름을 입력해주세요" />
        </div>
        <button className='h-12 bg-primary w-3/6 rounded-md font-medium text-white text-xl' onClick={() => { navigate("/") }}>로그인</button>
        <div >계정이 없나요? <Link to="/signup" className='text-primary'>회원가입</Link></div>
      </div>
    </PageLayout>)
};

export default LoginPage;
