import React, { useState } from 'react';
import { Link, useNavigate } from "react-router";

interface LoginInfo {
    email: string;
    password: string;
}

const EmailLoginPage = () => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState<LoginInfo>({
        email: '',
        password: '',
    });

    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsEmailValid(emailRegex.test(value));
        }

        setLoginInfo({
            ...loginInfo,
            [name]: value,
        });
    };

    const isFormValid = isEmailValid && loginInfo.password.length > 0;

    return (
        <div className="splash-layout">
            <div className="column-center w-full p-8">
                <div className="flex flex-col w-full gap-3">
                    <h1 className='text-3xl font-bold pb-6'>이메일로 로그인</h1>
                    <input
                        name="email"
                        onChange={handleChange}
                        className="splash-input"
                        type="email"
                        placeholder="이메일 입력"
                    />
                    {/* 이메일 유효성 검사를 보여주는 메시지 */}
                    {!isEmailValid && loginInfo.email.length > 0 && (
                        <p className="text-xs text-rose-500">올바른 이메일 형식을 입력하세요.</p>
                    )}
                    <input
                        name="password"
                        onChange={handleChange}
                        className="splash-input"
                        type="password"
                        placeholder="비밀번호 입력"
                    />
                    <button
                        className={`h-12 mt-4 mb-4 text-sm font-bold rounded-lg shadow-sm transition duration-100 ease-out hover:ease-in ${isFormValid ? 'bg-button text-primary hover:bg-rose-100' : 'bg-gray-300 text-white cursor-not-allowed'
                            }`}
                        disabled={!isFormValid} // 폼이 유효하지 않으면 버튼 비활성화
                        onClick={() => {
                            if (isFormValid) {
                                navigate('/login');
                            }
                        }}
                    >
                        로그인
                    </button>
                </div>
                <div className='flex gap-1 text-sm text-gray-500 opacity-70'>
                    비밀번호를 잊으셨나요?
                    <Link to="/reset-password" className="underline hover:text-gray-800">비밀번호 재설정</Link>

                </div>

            </div>

        </div>
    )
}

export default EmailLoginPage;