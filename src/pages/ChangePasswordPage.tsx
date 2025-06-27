import { useState } from 'react';
import { getButtonClasses } from '@/components/mypage/ResetPassword/ResetPasswordButton';
import { useNavigate } from 'react-router';
import { changePassword } from '@/services/userService';
import PageLayout from '@/components/layout/PageLayout';
import BackIcon from '@/components/icons/BackIcon';

interface PasswordInfo {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePasswordPage = () => {
  const navigate = useNavigate();

  const [passwordInfo, setPasswordInfo] = useState<PasswordInfo>({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNewPasswordDifferent, setIsNewPasswordDifferent] = useState(false);
  const [isNewPasswordMatch, setIsNewPasswordMatch] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 새 비밀번호 유효성 검사
    if (name === 'newPassword') {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
      setIsPasswordValid(passwordRegex.test(value));
    }

    // 새 비밀번호가 기존 비밀번호와 다른 지 체크
    if (name === 'newPassword') {
      setIsNewPasswordDifferent(value !== passwordInfo.password);
    }

    // 새 비밀번호 확인
    if (name === 'confirmNewPassword') {
      setIsNewPasswordMatch(value === passwordInfo.newPassword);
    }

    setPasswordInfo({
      ...passwordInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    const { password, newPassword } = passwordInfo;

    try {
      const responseData = await changePassword({ password, newPassword });
      console.log(responseData);
      navigate('/mypage/rsvp');
    } catch (error) {
      throw new Error(`비밀번호 변경 실패 :${error}`);
    }
  };

  const isFormValid = isNewPasswordMatch && isPasswordValid;

  return (
    <PageLayout
      leftButton={
        <button onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
      }
      customFooter={null}
    >
      <div className="flex flex-col w-full h-content p-8">
        <div className="flex flex-col w-full gap-3">
          <h1 className="text-3xl font-semibold pb-6">비밀번호 변경</h1>
          <h3 className="text-gray-600 text-sm">기존 비밀번호</h3>
          <input
            name="password"
            onChange={handleChange}
            className="splash-input"
            type="password"
            placeholder="기존 비밀번호 입력"
          />
          <h3 className="text-gray-600 text-sm">새 비밀번호</h3>
          <input
            name="newPassword"
            onChange={handleChange}
            className="splash-input"
            type="password"
            placeholder="숫자, 영문, 특수문자 8 ~ 16자 입력"
          />
          {!isPasswordValid && passwordInfo.newPassword.length > 0 && (
            <p className="text-xs text-rose-500">
              비밀번호는 숫자, 영문, 특수문자를 포함해 8 ~ 16자여야 합니다.
            </p>
          )}
          {!isNewPasswordDifferent && passwordInfo.newPassword.length > 0 && (
            <p className="text-xs text-rose-500">
              새 비밀번호는 기존 비밀번호와 달라야 합니다.
            </p>
          )}

          <h3 className="text-gray-600 text-sm">새 비밀번호 확인</h3>
          <input
            name="confirmNewPassword"
            onChange={handleChange}
            className="splash-input"
            type="password"
            placeholder="새 비밀번호 확인"
          />
          {!isNewPasswordMatch &&
            passwordInfo.confirmNewPassword.length > 0 && (
              <p className="text-xs text-rose-500">
                새 비밀번호가 일치하지 않습니다.
              </p>
            )}
          <button
            className={getButtonClasses(isFormValid)}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            저장
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ChangePasswordPage;
