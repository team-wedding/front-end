import BackIcon from '@/components/icons/BackIcon';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router';

interface PhotoTalkLayoutProps {
  title: string;
  titleStyle?: string;
  asideText?: ReactNode;
  children: ReactNode;
}

const defaultAside = (
  <>
    📷 사진과 함께 축하 메시지를 남길 수 있는 공간이에요! 💬
    <br />
    다른 사람들의 포토톡도 함께 보며 추억을 나눠보면 어떨까요? 🥳
  </>
);

const PhotoTalkLayout = ({
  title,
  titleStyle,
  asideText = defaultAside,
  children,
}: PhotoTalkLayoutProps) => {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <div className="bg-white max-w-[520px] min-h-screen m-auto">
      <header className="fixed top-0 left-0 right-0 z-20 m-auto max-w-[520px] flex-between h-12 backdrop-blur-3xl bg-black/50 text-white">
        <button onClick={handleBack} aria-label="뒤로가기" className="p-2">
          <BackIcon />
        </button>
        <h1
          className={`absolute left-1/2 transform -translate-x-1/2 ${titleStyle}`}
        >
          {title}
        </h1>
      </header>

      <div className="h-12"></div>

      <main>
        <aside className="text-center text-sm font-light leading-loose tracking-tight text-black/80 py-8 px-6 break-keep">
          {asideText}
        </aside>

        {children}
      </main>
    </div>
  );
};

export default PhotoTalkLayout;
