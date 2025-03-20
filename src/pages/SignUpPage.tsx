import Signup from '@/components/Signup';
import logo from '@/assets/woogyeol/logo_light.png';

const SignUpPage = () => {
  // const navigate = useNavigate();

  return (
    <div className="bg-white column-center min-h-screen relative max-w-[520px] m-auto">
      <header className="column-center mb-8">
        <div className="pt-6 pb-4">
          <img src={logo} alt="우결 로고" className="w-16 opacity-80" />
        </div>
        <span className="text-black/80 text-xs font-extralight">
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
