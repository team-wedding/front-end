import EmailLogin from '@/components/login/EmailLogin/EmailLogin';
import SocialLogin from '@/components/login/SocialLogin';
import Logo from '@/components/common/Logo';

const LoginPage = () => {
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
    </div>
  );
};

export default LoginPage;
