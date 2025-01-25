import { useState } from "react";
import { useNavigate } from "react-router";
import { validateEmail } from "../../../utils/validator";
import { postEmailLogin } from "../../../services/userService";

interface LoginInfo {
    email: string;
    password: string;
}

const EmailLogin = () => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState<LoginInfo>({
        email: '',
        password: '',
    });

    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "email") {
            setIsEmailValid(validateEmail(value));
        }

        setLoginInfo({
            ...loginInfo,
            [name]: value,
        });
    }

    const handleSubmit = async () => {
        if (!isFormValid) return;

        try {
            await postEmailLogin(loginInfo);
            navigate('/');
        } catch (error) {
            console.log('이메일 로그인 실패', error);
        }
    };

    const isFormValid = isEmailValid && loginInfo.password.length > 0;

    return (
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
                disabled={!isFormValid}
                onClick={handleSubmit}
            >
                로그인
            </button>
        </div>
    );
}

export default EmailLogin;