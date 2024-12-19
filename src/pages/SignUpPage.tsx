import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Link, useNavigate } from 'react-router';

interface AccountInfo {
  email: string,
  name: string,
  password: string,
  confirmPassword: string
}

const SignUpPage = () => {
  const navigate = useNavigate()
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  })
  // const [passwordValid, setPasswordValid] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });
    // if (accountInfo.confirmPassword.length !== 0 && accountInfo.password == accountInfo.confirmPassword) {
    //   setPasswordValid(true)
    // }else{

    // }
  }
  //TODO: Password validation && btn disable
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center w-full gap-8 p-4 sm:gap-8 sm:p-8">

        <img
          className="mt-10 sm:mt-30 w-60 h-45 sm:w-80 sm:h-60"
          src="/src/assets/image20.png"
          alt="Title"
        />

        <div className="flex flex-col w-full max-w-md gap-3">
          <input name="name" onChange={handleChange} className="h-12 px-4 text-base rounded-lg border border-gray-300 focus-visible:ring-1 focus:ring-primary focus:border-primary" type="text" placeholder="이름" />
          <input name="email" onChange={handleChange} className="h-12 px-4 text-base rounded-lg border border-gray-300 focus-visible:ring-1 focus:ring-primary focus:border-primary" type="text" placeholder="이메일" />
          <input name="password" onChange={handleChange} className="h-12 px-4 text-base rounded-lg border border-gray-300 focus-visible:ring-1 focus:ring-primary focus:border-primary" type="password" placeholder="비밀번호" />
          <input name="confirmPassword" onChange={handleChange} className="h-12 px-4 text-base rounded-lg border border-gray-300 focus-visible:ring-1 focus:ring-primary focus:border-primary" type="password" placeholder="비밀번호 확인" />
          <button className="h-12 bg-primary rounded-lg font-medium text-white text-lg shadow-md" onClick={() => { navigate("/login") }}>회원가입</button>
        </div>
        <div className='text-gray-600'>이미 계정이 있나요? <Link to="/login" className='text-primary'>로그인</Link></div>
      </div>
    </PageLayout>)
};

export default SignUpPage;
