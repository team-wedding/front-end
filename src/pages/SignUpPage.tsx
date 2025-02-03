import { Link, useNavigate } from 'react-router';
import PageLayout from '../components/layout/PageLayout';
import BackIcon from '../components/icons/BackIcon';
import Signup from '@/components/Signup';

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      leftButton={
        <button onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
      }
      customFooter={null}
    >
      <div className="flex flex-col items-center w-full h-content p-8">
        <Signup />
        <div className="flex gap-1 text-sm text-gray-500 opacity-70">
          이미 계정이 있으신가요?
          <Link to="/email-login" className="underline hover:text-gray-800">
            로그인
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default SignUpPage;
