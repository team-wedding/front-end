interface LoginButtonProps {
  imgSrc: string;
  altText: string;
  onClick: () => void;
  additionalStyles?: string;
}

const LoginButton = ({
  imgSrc,
  altText,
  onClick,
  additionalStyles,
}: LoginButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${additionalStyles || ''}`}
    >
      <img src={imgSrc} alt={altText} />
    </button>
  );
};

export default LoginButton;
