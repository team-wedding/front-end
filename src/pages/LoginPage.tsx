import EmailLogin from '@/components/login/EmailLogin/EmailLogin';
import logo from '@/assets/woogyeol/logo_light.png';
import SocialLogin from '@/components/login/SocialLogin';

const LoginPage = () => {
  return (
    <div className="bg-white column-center min-h-screen max-w-[520px] m-auto gap-2">
      <header>
        <img src={logo} alt="우결 로고" className="w-20 mb-12 opacity-100" />
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
