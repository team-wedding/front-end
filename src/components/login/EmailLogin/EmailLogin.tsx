import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { validateEmail } from '@utils/validator';
import { postEmailLogin } from '../../../services/userService';
import { useUserStore } from '@/store/useUserStore';

interface LoginInfo {
  email: string;
  password: string;
}

const EmailLogin = () => {
  const navigate = useNavigate();
  const { fetchUserInfo } = useUserStore();
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: '',
    password: '',
  });

  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setIsEmailValid(validateEmail(value));
    }

    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) return;

    try {
      await postEmailLogin(loginInfo);
      await fetchUserInfo();
      navigate('/dashboard');
    } catch (error) {
      console.log('이메일 로그인 실패', error);
    }
  };

  const isFormValid = isEmailValid && loginInfo.password.length > 0;

  return (
    <main className="column-center w-11/12">
      <form onSubmit={handleSubmit} className="w-full column-center gap-4">
        <fieldset className="w-full column-center gap-2">
          <legend className="sr-only">이메일 로그인 폼</legend>

          <div className="w-full">
            <label
              htmlFor="email"
              className="text-label-secondary/60 dark:text-label-secondary-dark/60 text-sm mx-2"
            >
              이메일
            </label>
            <input
              id="email"
              name="email"
              onChange={handleChange}
              className="splash-input"
              type="email"
              placeholder="이메일 입력"
            />
            {!isEmailValid && loginInfo.email.length > 0 && (
              <p className="m-2 text-xs text-status-error dark:text-status-error-dark">
                올바른 이메일 형식을 입력하세요.
              </p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="password"
              className="text-label-secondary/60 dark:text-label-secondary-dark/60 text-sm mx-2"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              onChange={handleChange}
              className="splash-input"
              type="password"
              placeholder="비밀번호 입력"
            />
          </div>
        </fieldset>

        <button
          type="submit"
          className={`splash-btn hover:ease-in ${
            isFormValid
              ? 'bg-gradient-to-r from-primary-muted to-secondary-muted text-black dark:from-primary-muted-dark dark:to-secondary-muted-dark dark:text-white'
              : 'cursor-not-allowed'
          }`}
          disabled={!isFormValid}
        >
          로그인
        </button>

        <p className="text-label-secondary/60 dark:text-label-secondary-dark/60 text-xs text-center my-4">
          아직 계정이 없으신가요?{' '}
          <Link
            to="/signup"
            className="text-label dark:text-label-dark font-medium hover:text-label-secondary/60 dark:hover:text-label-secondary-dark/60"
          >
            회원가입
          </Link>
        </p>
      </form>
    </main>
  );
};

export default EmailLogin;
