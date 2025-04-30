import Signup from '@/components/Signup';
import Logo from '@/components/common/Logo';

const SignUpPage = () => {
  // const navigate = useNavigate();

  return (
    <div className="bg-surface dark:bg-surface-dark column-center min-h-screen relative max-w-[520px] m-auto">
      <header className="column-center mb-10">
        <div className="pt-6 pb-3">
          <Logo className="w-20 opacity-80" />
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
