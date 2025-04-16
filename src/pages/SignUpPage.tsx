import Signup from '@/components/Signup';
import logo from '@/assets/woogyeol/logo_light.png';
import logoDark from '@/assets/woogyeol/logo_dark.png';

const SignUpPage = () => {
  // const navigate = useNavigate();

  return (
    <div className="bg-surface dark:bg-surface-dark column-center min-h-screen relative max-w-[520px] m-auto">
      <header className="column-center mb-10">
        <div className="pt-6 pb-3">
          <img
            src={logo}
            alt="우결 로고"
            className="w-20 opacity-80 block dark:hidden"
          />
          <img
            src={logoDark}
            alt="우결 로고"
            className="w-20 opacity-80 dark:block hidden"
          />
        </div>
        <span className="text-label-secondary/60 dark:text-label-secondary-dark/60 text-sm font-extralight">
          우리만의 청첩장을 만들어봐요!
        </span>
      </header>

      <main className="w-full flex-center">
        <Signup />
      </main>
    </div>
  );
};

export default SignUpPage;
