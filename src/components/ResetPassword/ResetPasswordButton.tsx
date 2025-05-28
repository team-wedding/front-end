interface ResetPasswordButtonProps {
  isEmailValid: boolean;
  onClick: () => void;
}

export const getButtonClasses = (isActive: boolean) =>
  `h-12 mt-4 mb-4 text-sm font-medium rounded-lg shadow-sm transition duration-100 ease-out ${
    isActive
      ? 'bg-button20 text-primary hover:bg-rose-100'
      : 'bg-gray-300 text-white cursor-not-allowed'
  }`;

const ResetPasswordButton = ({
  isEmailValid,
  onClick,
}: ResetPasswordButtonProps) => {
  return (
    <button
      className={getButtonClasses(isEmailValid)}
      disabled={!isEmailValid}
      onClick={onClick}
    >
      비밀번호 재설정
    </button>
  );
};

export default ResetPasswordButton;
