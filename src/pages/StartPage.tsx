import { useNavigate } from 'react-router';
import logo from '@/assets/woogyeol/logo_light.png';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white column-between min-h-screen max-w-[520px] m-auto py-8 relative">
      <main className="column-between gap-4">
        <header className="p-5">
          <img src={logo} alt="우결 로고" className="w-36" />
        </header>
        <h1 className="font-bold text-2xl">우리, 결혼해요</h1>
        <p className="font-light text-sm text-[#323232] text-wrap leading-8">
          내가 직접 만드는 우리만의 청첩장
        </p>
      </main>

      <footer className="w-full flex justify-center">
        <button
          onClick={() => navigate('/login')}
          className="splash-btn w-11/12"
          aria-label="시작하기"
        >
          시작하기
        </button>
      </footer>
    </div>
  );
};

export default StartPage;
