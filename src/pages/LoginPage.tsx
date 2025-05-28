import EmailLogin from '@/components/login/EmailLogin/EmailLogin';
import SocialLogin from '@/components/login/SocialLogin';
import Logo from '@/components/common/Logo';
import SimpleModal from '@/components/common/Modal/SimpleModal';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const location = useLocation();
  const errorMessage = location.state?.errorMessage;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setIsModalOpen(true);
    }
  }, [errorMessage]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-surface dark:bg-surface-dark column-center min-h-screen max-w-[520px] m-auto gap-2">
      <header>
        <Logo className="w-20 mb-12 opacity-100" />
      </header>

      <main className="w-full column-center">
        <EmailLogin />

        <section>
          <SocialLogin />
        </section>
      </main>

      <SimpleModal
        isOpen={isModalOpen}
        message="해당 이메일로 가입된 계정이 이미 있습니다."
        onConfirm={handleCloseModal}
      />
    </div>
  );
};

export default LoginPage;
