import { useNavigate } from 'react-router';
import Logo from '@/components/common/Logo';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface dark:bg-surface-dark column-between min-h-screen max-w-[520px] m-auto py-6 gap-8">
      <main className="column-center gap-8 w-full flex-1">
        <header className="column-center gap-3">
          <div className="p-2">
            <Logo className="w-32" />
          </div>
          <h1 className="font-semibold text-3xl text-label dark:text-label-dark">
            우리, 결혼해요
          </h1>
        </header>

        <section className="bg-surface-muted dark:bg-surface-muted-dark w-11/12 rounded-xl column-center flex-1">
          <p className="font-light text-label-secondary/60 dark:text-label-secondary-dark/60 text-wrap">
            내가 직접 만드는 우리만의 청첩장
          </p>
        </section>
      </main>

      <footer className="w-11/12">
        <button
          onClick={() => navigate('/login')}
          className="splash-btn w-full"
          aria-label="시작하기"
        >
          시작하기
        </button>
      </footer>
    </div>
  );
};

export default StartPage;
