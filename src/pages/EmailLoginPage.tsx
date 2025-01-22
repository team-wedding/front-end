import React, { useState } from 'react';
import { Link, useNavigate } from "react-router";
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import PageLayout from '../components/layout/PageLayout';
import BackIcon from '../components/icons/BackIcon';
import useAuthStore from '../store/useAuthStore';
// import LoginPage from './LoginPage';

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

    // react-query mutation
    const loginMutation = useMutation(
        {
            mutationFn: async (data: LoginInfo) => {
                try {
                    const response = await axios.post('http://localhost:3000/api/users/login', data, { headers: { 'Content-Type': 'application/json' }, });
                    return response;
                } catch (error) {
                    console.error('Mutation error:', error);
                    throw error;
                }
            },
            onSuccess: (response) => {
                console.log('로그인 성공');
                // Access Token 저장
                const accessToken = response.headers['authorization'];
                // console.log(accessToken);

                if (accessToken) {
                    useAuthStore.getState().setAccessToken(accessToken); // Zustand에 저장
                    // const currentState = useAuthStore.getState();
                    // console.log('현재 Zustand 상태:', currentState);

                } else {
                    console.error('Access Token이 응답 헤더에 없습니다.');
                }
                navigate('/');
            },
            onError: (error) => {
                console.log(error);
            },
        }
    );

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

    const handleSubmit = () => {
        if (!isFormValid) return;

        const { email, password } = loginInfo;

        loginMutation.mutate({
            email, password
        });
    };

    const isFormValid = isEmailValid && loginInfo.password.length > 0;

    return (
        <PageLayout leftButton={<button onClick={() => navigate('/login')}><BackIcon /></button>} customFooter={null}>
            <div className="flex flex-col w-full h-content p-8">
                <div className="flex flex-col w-full gap-3">
                    <h1 className='text-3xl font-semibold pb-6'>이메일로 로그인</h1>
                    <h3 className='text-gray-600 text-sm'>이메일</h3>
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
                    <h3 className='text-gray-600 text-sm'>비밀번호</h3>
                    <input
                        name="password"
                        onChange={handleChange}
                        className="splash-input"
                        type="password"
                        placeholder="비밀번호 입력"
                    />
                    <button
                        className={`h-12 mt-4 mb-4 text-sm font-medium rounded-lg shadow-sm transition duration-100 ease-out hover:ease-in ${isFormValid ? 'bg-button text-primary hover:bg-rose-100' : 'bg-gray-300 text-white cursor-not-allowed'
                            }`}
                        disabled={!isFormValid} // 폼이 유효하지 않으면 버튼 비활성화
                        onClick={handleSubmit}
                    >
                        로그인
                    </button>
                </div>
                <div className='flex gap-1 text-sm text-gray-500 opacity-70'>
                    비밀번호를 잊으셨나요?
                    <Link to="/reset-password" className="underline hover:text-gray-800">비밀번호 재설정</Link>

                </div>

            </div>

        </PageLayout>
    )
}

export default EmailLoginPage;