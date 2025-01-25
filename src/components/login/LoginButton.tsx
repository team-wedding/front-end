interface LoginButtonProps {
    imgSrc: string;
    altText: string;
    onClick: () => void;
    additionalStyles?: string;
}

const LoginButton = ({ imgSrc, altText, onClick, additionalStyles }: LoginButtonProps) => {
    return (
        <img
            src={imgSrc}
            alt={altText}
            className={`cursor-pointer w-full ${additionalStyles || ''}`}
            onClick={onClick}
        />
    );
};

export default LoginButton;