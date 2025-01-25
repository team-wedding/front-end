import { Link, useNavigate } from "react-router";
import PageLayout from '../components/layout/PageLayout';
import BackIcon from '../components/icons/BackIcon';
import EmailLogin from '../components/login/EmailLogin/EmailLogin';

const EmailLoginPage = () => {
    const navigate = useNavigate();

    return (
        <PageLayout leftButton={<button onClick={() => navigate('/login')}><BackIcon /></button>} customFooter={null}>
            <div className="flex flex-col items-center w-full h-content p-8">
                <EmailLogin />
                <div className='flex gap-1 text-sm text-gray-500 opacity-70'>
                    비밀번호를 잊으셨나요?
                    <Link to="/reset-password" className="underline hover:text-gray-800">비밀번호 재설정</Link>
                </div>
            </div>
        </PageLayout>
    )
}

export default EmailLoginPage;