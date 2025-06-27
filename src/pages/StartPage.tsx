import { useNavigate } from 'react-router';
import Logo from '@/components/common/Logo';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-stone-900  dark:via-zinc-900 dark:to-slate-900 column-between min-h-screen max-w-[520px] m-auto py-6">
      <div className="max-w-[520px] fixed inset-0 m-auto overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-12 w-32 h-32 bg-rose-200/30 dark:bg-yellow-50/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-52 right-16 w-24 h-24 bg-purple-200/30 dark:bg-purple-200/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-pink-200/30 dark:bg-yellow-50/5 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-300/20 dark:bg-rose-100/5 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <main className="column-center space-y-16 w-full flex-1">
        <header className="flex-center gap-1">
          <Logo className="w-10" />
          <h1 className="font-bold text-4xl text-black/90 dark:text-label-dark">
            우리 결혼해요
          </h1>
        </header>

        {/* <section className="bg-surface-muted dark:bg-surface-muted-dark w-11/12 rounded-xl column-center flex-1">
          <p className="font-light text-label-secondary/60 dark:text-label-secondary-dark/60 text-wrap">
            내가 직접 만드는 우리만의 청첩장
          </p>
        </section> */}

        <section className="w-11/12">
          <div className="relative bg-white/70 dark:bg-black/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
            {/* Decorative corner elements */}
            <div className="absolute top-4 right-4">
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
            </div>

            <div className="space-y-6">
              {/* <div className="w-12 h-12 mx-auto bg-gradient-to-br from-rose-100 to-purple-100 dark:from-rose-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-rose-500 dark:text-rose-400" />
              </div> */}

              <p className="text-gray-600 text-center dark:text-gray-100 text-lg font-light leading-relaxed">
                내가 직접 만드는
                <br />
                <span className="font-medium bg-gradient-to-r from-rose-600 to-sky-500 bg-clip-text text-transparent">
                  우리만의 청첩장
                </span>
              </p>

              {/* Feature highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                {[
                  { icon: '💝', text: '맞춤 디자인' },
                  { icon: '✨', text: '간편 제작' },
                  { icon: '💌', text: '청첩장 관리' },
                  { icon: '🎵', text: '배경 음악' },
                  { icon: '📊', text: 'RSVP 통계' },
                  { icon: '📸', text: '포토톡' },
                  // { icon: '💌', text: '특별한 순간' },
                ].map((feature, index) => (
                  <div key={index} className="text-center space-y-4">
                    <div className="text-2xl">{feature.icon}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-100 font-medium">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
