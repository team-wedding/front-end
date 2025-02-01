import { useState } from "react";
import { validateEmail } from "@/utils/validator";
import { resetPassword } from "@/services/userService";
import ResetPasswordButton from "./ResetPasswordButton";

interface EmailInfo {
    email: string;
}

interface ResetPasswordFormProps {
    setIsModalOpen: (value: boolean) => void;
}

const ResetPasswordForm = ({ setIsModalOpen }: ResetPasswordFormProps) => {
    const [emailInfo, setEmailInfo] = useState<EmailInfo>({ email: '' });
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") {
            setIsEmailValid(validateEmail(value));
        }
        setEmailInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleResetPassword = async () => {
        try {
            await resetPassword(emailInfo);
            setIsModalOpen(true);
        } catch (error) {
            console.log('비밀번호 초기화 실패', error);
        }
    };

    return (
        <div className="flex flex-col w-full gap-3">
            <h1 className="text-2xl font-semibold pb-6">
                회원가입 시 등록한<br /> 이메일 주소를 입력해 주세요
            </h1>
            <h3 className='text-gray-600 text-sm'>이메일</h3>
            <input
                name="email"
                onChange={handleChange}
                className="splash-input"
                type="email"
                placeholder="이메일 입력"
            />
            {!isEmailValid && emailInfo.email.length > 0 && (
                <p className="text-xs text-rose-500">올바른 이메일 형식을 입력하세요.</p>
            )}
            <ResetPasswordButton isEmailValid={isEmailValid} onClick={handleResetPassword} />
        </div>
    );
};

export default ResetPasswordForm;
