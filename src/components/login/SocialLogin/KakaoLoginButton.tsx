import LoginButton from "../LoginButton";

const K_REST_API_KEY = import.meta.env.VITE_K_REST_API_KEY;
const K_REDIRECT_URI = `http://localhost:5173/oauth/callback/kakao`;
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

const KakaoLoginButton = () => {

    const handleKakaoLogin = () => {
        window.location.href = kakaoURL;
    };

    return (

        <LoginButton
            imgSrc="/src/assets/kakao-login.png"
            altText="Kakao Login"
            onClick={handleKakaoLogin}
        />

    );
};

export default KakaoLoginButton;