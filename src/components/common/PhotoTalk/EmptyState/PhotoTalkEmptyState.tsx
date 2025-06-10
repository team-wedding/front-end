import { UserMode } from '@/types/users';

const EMPTY_STATE_CONFIG: Record<string, React.ReactNode> = {
  'list-admin': (
    <>
      <p className="flex-center h-[14rem] w-full text-center text-md text-white/80 bg-black/10 backdrop-blur-xl rounded-xl dark:text-black/90 dark:bg-white/10">
        아직 업로드된 포토톡이 없어요.
      </p>
    </>
  ),
  'list-guest': (
    <>
      <p className="flex-center h-[14rem] w-full text-md backdrop-blur-xl rounded-xl text-white/80 bg-black/10 text-center">
        첫 번째 포토톡으로 따뜻한 마음을 전해보세요.
      </p>
    </>
  ),
  'gallery-admin': (
    <>
      <p className="flex-center text-center text-white/80 bg-black/10 text-md rounded-xl w-full h-[12rem] backdrop-blur-xl leading-relaxed">
        업로드된 이미지가 없습니다.
        <br /> 하객 포토를 기다려보세요.
      </p>
    </>
  ),
  'gallery-guest': (
    <>
      <p className="flex-center text-center leading-relaxed text-white/80 bg-black/10 text-md rounded-xl w-full h-[12rem] backdrop-blur-xl ">
        첫 번째 사진을 올리고
        <br /> 추억을 나눠보세요.
      </p>
    </>
  ),
};

interface PhotoTalkEmptyStateProps {
  userMode: UserMode;
  viewType: 'list' | 'gallery';
}

const PhotoTalkEmptyState = ({
  userMode,
  viewType,
}: PhotoTalkEmptyStateProps) => {
  const key = `${viewType}-${userMode}`;

  return EMPTY_STATE_CONFIG[key] ?? null;
};

export default PhotoTalkEmptyState;
