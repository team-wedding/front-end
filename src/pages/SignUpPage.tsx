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
      <div className='flex flex-col w-full h-full justify-center items-center gap-4'>
        <div className='flex flex-col w-full  items-center mt-40 text-5xl font-semibold gap-3'>
          <span>회원가입</span>
        </div>
        <div className="flex flex-col w-3/6 gap-3">
          <div>이름</div>
          <input name="name" onChange={handleChange} className="rounded-lg" type="text" placeholder="이름을 입력해주세요" />
          <div>이메일</div>
          <input name="email" onChange={handleChange} className="rounded-lg" type="text" placeholder="이메일을 입력해주세요" />
          <div>비밀번호</div>
          <input name="password" onChange={handleChange} className="rounded-lg" type="password" placeholder="이름을 입력해주세요" />
          <div>비밀번호 확인</div>
          <input name="confirmPassword" onChange={handleChange} className="rounded-lg" type="password" placeholder="이름을 입력해주세요" />
        </div>
        <button className='h-12 bg-primary w-3/6 rounded-md font-medium text-white text-xl' onClick={() => { navigate("/login") }}>회원가입</button>
        <div >이미 계정이 있나요? <Link to="/login" className='text-primary'>로그인</Link></div>
      </div>
    </PageLayout>)
};

export default SignUpPage;
