import { signup } from '@/services/userService';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '@/utils/validator';
import { useState } from 'react';
import { useNavigate } from 'react-router';

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
    const { name, value } = e.target;

    if (name === 'name') {
      setIsNameValid(validateName(value));
    }

    if (name === 'email') {
      setIsEmailValid(validateEmail(value));
    }

    if (name === 'password') {
      setIsPasswordValid(validatePassword(value));
    }

    if (name === 'confirmPassword') {
      setIsPasswordMatch(value === signupInfo.password);
    }

    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
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
      {!isNameValid && signupInfo.name.length > 0 && (
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
      {!isEmailValid && signupInfo.email.length > 0 && (
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
      {!isPasswordValid && signupInfo.password.length > 0 && (
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
      {!isPasswordMatch && signupInfo.confirmPassword.length > 0 && (
        <p className="text-xs text-rose-500">비밀번호가 일치하지 않습니다.</p>
      )}

      <button
        className={`h-12 mt-4 mb-4 text-sm font-medium rounded-lg shadow-sm transition duration-100 ease-out hover:ease-in ${
          isFormValid
            ? 'bg-button20 text-primary hover:bg-rose-100'
            : 'bg-gray-300 text-white cursor-not-allowed'
        }`}
        disabled={!isFormValid} // 폼이 유효하지 않으면 버튼 비활성화
        onClick={handleSubmit}
      >
        회원가입
      </button>
    </div>
  );
};

export default Signup;
