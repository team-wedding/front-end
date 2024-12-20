import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Link, useNavigate } from 'react-router';
import { API } from '../utils/config';
import { useUserStore } from '../store/useUserStore';

interface LogInInfo {
  email: string,
  password: string,
}

const LoginPage = () => {
  const navigate = useNavigate()

  const [loginInfo, setLoginInfo] = useState<LogInInfo>({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  }

  const useStore = useUserStore()

  const handleLogin = () => {
    fetch(`${API.LOGIN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginInfo.email,
          password: loginInfo.password,
        }),
      }
    ).then((response) => {
      if (response.status == 200) {
        const Authorization = response.headers.get("Authorization");
        useStore.setToken(Authorization as string)
        return response.json()
      } else throw new Error(`${response.status}에러`)
    }).then(() => {
      navigate("/create")
    })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center w-full gap-8 p-4 sm:gap-8 sm:p-8">

        <img
          className="mt-10 sm:mt-30 w-60 h-45"
          src="/src/assets/image20.png"
          alt="Title"
        />

        {/* Input Fields */}
        <div className="flex flex-col w-full max-w-md gap-3">
          <input
            className="h-12 px-4 text-base rounded-lg border border-gray-300 focus-visible:ring-1 focus:ring-primary focus:border-primary"
            type="email"
            placeholder="이메일"
            name="email"
            onChange={handleChange}
          />
          <input
            className="h-12 px-4 text-base rounded-lg border border-gray-300 focus-visible:ring-1 focus:ring-primary focus:border-primary"
            type="password"
            placeholder="비밀번호"
            name="password"
            onChange={handleChange}
          />
          <button
            className="h-12 bg-primary rounded-lg font-medium text-white text-lg shadow-md"
            onClick={handleLogin}
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
