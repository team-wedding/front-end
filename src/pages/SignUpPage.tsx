import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import PageLayout from '../components/layout/PageLayout';
import BackIcon from '../components/icons/BackIcon';

interface AccountInfo {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  // react-query mutation
  const signUpMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      password: string;
    }) => {
      try {
        // const { name, email, password } = data;
        console.log(data);

        const response = await axios.post(
          'http://localhost:3000/api/users/signup',
          { ...data, provider: 'local' },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );
        return response.data;
      } catch (error) {
        console.error('Mutation error:', error);
        throw error;
      }
    },

    onSuccess: () => {
      console.log('회원가입 성공');
      navigate('/login');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error('AxiosError:', error.response?.data || error.message);
      } else {
        console.error('오류 발생:', error.message);
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 이름 유효성 검사 (한글, 영어, 최소 2자 이상)
    if (name === 'name') {
      setIsNameValid(value.length >= 2);
    }

    // 이메일 유효성 검사
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(value));
    }

    // 비밀번호 유효성 검사 (숫자, 영문, 특수문자 포함 8 ~ 16자)
    if (name === 'password') {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
      setIsPasswordValid(passwordRegex.test(value));
    }

    // 비밀번호 확인
    if (name === 'confirmPassword') {
      setIsPasswordMatch(value === accountInfo.password);
    }

    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!isFormValid) return;

    // confirmPassword를 제거한 데이터 생성
    const { name, email, password } = accountInfo;

    signUpMutation.mutate({
      name,
      email,
      password,
    });
  };

  const isFormValid =
    isPasswordMatch && isNameValid && isEmailValid && isPasswordValid;

  return (
    <PageLayout
      leftButton={
        <button onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
      }
      customFooter={null}
    >
      <div className="flex flex-col items-center w-full h-content p-8">
        <div className="flex flex-col w-full gap-3">
          <h1 className="text-3xl font-semibold pb-6">회원가입</h1>
          <h3 className="text-gray-600 text-sm">이름</h3>
          <input
            name="name"
            onChange={handleChange}
            className="splash-input"
            type="text"
            placeholder="이름 입력"
          />
          {!isNameValid && accountInfo.name.length > 0 && (
            <p className="text-xs text-rose-500">
              {' '}
              이름은 최소 2자 이상이어야 합니다.
            </p>
          )}
          <h3 className="text-gray-600 text-sm">이메일</h3>
          <input
            name="email"
            onChange={handleChange}
            className="splash-input"
            type="email"
            placeholder="이메일 입력"
          />
          {!isEmailValid && accountInfo.email.length > 0 && (
            <p className="text-xs text-rose-500">
              올바른 이메일 형식을 입력하세요.
            </p>
          )}
          <h3 className="text-gray-600 text-sm">비밀번호</h3>
          <input
            name="password"
            onChange={handleChange}
            className="splash-input"
            type="password"
            placeholder="숫자, 영문, 특수문자 8 ~ 16자 입력"
          />
          {!isPasswordValid && accountInfo.password.length > 0 && (
            <p className="text-xs text-rose-500">
              비밀번호는 숫자, 영문, 특수문자를 포함해 8 ~ 16자여야 합니다.
            </p>
          )}
          <h3 className="text-gray-600 text-sm">비밀번호 확인</h3>

          <input
            name="confirmPassword"
            onChange={handleChange}
            className="splash-input"
            type="password"
            placeholder="비밀번호 확인"
          />
          {!isPasswordMatch && accountInfo.confirmPassword.length > 0 && (
            <p className="text-xs text-rose-500">
              비밀번호가 일치하지 않습니다.
            </p>
          )}

          <button
            className={`h-12 mt-4 mb-4 text-sm font-medium rounded-lg shadow-sm transition duration-100 ease-out hover:ease-in ${
              isFormValid
                ? 'bg-button text-primary hover:bg-rose-100'
                : 'bg-gray-300 text-white cursor-not-allowed'
            }`}
            disabled={!isFormValid} // 폼이 유효하지 않으면 버튼 비활성화
            onClick={handleSubmit}
          >
            회원가입
          </button>
        </div>
        <div className="flex gap-1 text-sm text-gray-500 opacity-70">
          이미 계정이 있으신가요?
          <Link to="/email-login" className="underline hover:text-gray-800">
            로그인
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default SignUpPage;
