import { useEffect } from "react";
import { useNavigate } from "react-router"
import { postKakaoLogin } from "../../../services/userService";

export const KakaoRedirect = () => {
    const navigate = useNavigate();


    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        console.log(window.location.href);
        console.log(code);
        const handleLogin = async () => {
            if (code) {
                // setLoading(true);
                try {
                    await postKakaoLogin(code);

                    // 인증 성공 시 리디렉션
                    navigate('/');
                } catch (err) {
                    console.error(err);
                }
            }
        };
        handleLogin();
    }, [navigate]);

    return (
        <div>
            {/* <h1 className="text-gray-300">로그인 중입니다.</h1> */}
        </div>
    );
}

export default KakaoRedirect;