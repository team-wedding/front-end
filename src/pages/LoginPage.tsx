import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useUserStore } from '../store/useUserStore';
import { API } from '../utils/config';

interface LogInInfo {
  email: string,
  password: string,
}

const LoginPage = () => {
  const navigate = useNavigate();
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
    <div className="splash-layout">
      <div className="column-center w-full p-8">
        <img className="w-52 mb-10" src="/src/assets/logo2.png" alt="Title" />

        {/* Input Fields */}
        <div className="flex flex-col w-full gap-3">
          <input className="splash-input" type="email" placeholder="이메일" />
          <input
            className="splash-input"
            type="email"
            placeholder="이메일"
            name="email"
            onChange={handleChange}
          />
          <input
            className="h-12 px-4 text-base rounded-lg border border-gray-300 focus-visible:ring-1 focus:ring-primary focus:border-primary"
            type="password"
            placeholder="비밀번호"
          />
          <button
            className="splash-btn mt-4 mb-3 hover:bg-logo"
            onClick={handleLogin}
          >
            로그인
          </button>
        </div>

        {/* Additional Links */}
        <div className="flex gap-3 text-xs text-gray-500 opacity-70">
          <Link to="/reset-password" className="hover:text-primary">
            비밀번호 찾기
          </Link>
          <Link to="/signup" className="hover:text-primary">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
