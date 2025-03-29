import { signup } from '@/services/userService';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '@/utils/validator';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

interface SignupInfo {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === 'name') {
      setIsNameValid(validateName(value));
    }

    if (id === 'email') {
      setIsEmailValid(validateEmail(value));
    }

    if (id === 'password') {
      setIsPasswordValid(validatePassword(value));
    }

    if (id === 'confirmPassword') {
      setIsPasswordMatch(value === signupInfo.password);
    }

    setSignupInfo({
      ...signupInfo,
      [id]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) return;

    // confirmPassword를 제거한 데이터 생성
    const { name, email, password } = signupInfo;

    try {
      const responseData = await signup({ name, email, password });
      console.log(responseData);
      navigate('/login');
    } catch (error) {
      console.log('회원가입 실패', error);
    }
  };

  const isFormValid =
    isPasswordMatch && isNameValid && isEmailValid && isPasswordValid;

  return (
    <main className="column-center w-11/12">
      <form onSubmit={handleSubmit} className="w-full column-center gap-3">
        <fieldset className="w-full column-center gap-2">
          <legend className="sr-only">회원가입 폼</legend>

          <div className="w-full">
            <label htmlFor="name" className="text-gray-600 text-sm mx-2">
              이름
            </label>
            <input
              id="name"
              onChange={handleChange}
              className="splash-input"
              type="text"
              placeholder="이름 입력"
            />
            {!isNameValid && signupInfo.name.length > 0 && (
              <p className="m-2 text-xs text-red-500">
                {' '}
                이름은 최소 2자 이상이어야 합니다.
              </p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="email" className="text-gray-600 text-sm mx-2">
              이메일
            </label>
            <input
              id="email"
              onChange={handleChange}
              className="splash-input"
              type="email"
              placeholder="이메일 입력"
            />
            {!isEmailValid && signupInfo.email.length > 0 && (
              <p className="m-2 text-xs text-red-500">
                올바른 이메일 형식을 입력하세요.
              </p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="password" className="text-gray-600 text-sm mx-2">
              비밀번호
            </label>
            <input
              id="password"
              onChange={handleChange}
              className="splash-input"
              type="password"
              placeholder="숫자, 영문, 특수문자 8 ~ 16자 입력"
            />
            {!isPasswordValid && signupInfo.password.length > 0 && (
              <p className="m-2 text-xs text-red-500">
                비밀번호는 숫자, 영문, 특수문자를 포함해 8 ~ 16자여야 합니다.
              </p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="confirmPassword"
              className="text-gray-600 text-sm mx-2"
            >
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              onChange={handleChange}
              className="splash-input"
              type="password"
              placeholder="비밀번호 확인"
            />
            {!isPasswordMatch && signupInfo.confirmPassword.length > 0 && (
              <p className="m-2 text-xs text-red-500">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>
        </fieldset>

        <button
          type="submit"
          className={`splash-btn mt-2 hover:ease-in ${
            isFormValid
              ? 'bg-gradient-to-r from-[#CEDFFF] to-[#F8D4E2] text-black'
              : 'cursor-not-allowed'
          }`}
          disabled={!isFormValid} // 폼이 유효하지 않으면 버튼 비활성화
        >
          회원가입
        </button>

        <p className="text-[#9B9B9B] text-xs text-center pt-4 pb-10">
          이미 계정이 있으신가요?{' '}
          <Link
            to="/login"
            className="text-black font-medium hover:text-gray-800"
          >
            로그인
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Signup;
