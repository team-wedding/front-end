import { UserMode } from '@/types/users';

const EMPTY_STATE_CONFIG: Record<string, React.ReactNode> = {
  'list-admin': (
    <>
      {/* <div className="h-2"></div> */}
      {/* <p className="text-center text-xs text-black/20 bg-black/0 font-light rounded-xl p-2 w-full m-auto leading-6 mb-1">
        아직 업로드된 포토톡이 없습니다.
      </p> */}
    </>
  ),
  'list-guest': (
    <div className="flex items-center gap-1 w-full m-auto backdrop-blur-sm px-2 mt-4 mb-2">
      <p className="text-xs font-light text-black/50 text-start leading-6">
        첫 번째 포토톡을 작성하고 따뜻한 마음을 전해보세요
      </p>
    </div>
  ),
  'gallery-admin': (
    <>
      {/* <div className="h-2"></div> */}
      {/* <p className="text-center text-black/20 bg-black/0 text-xs font-light p-2 rounded-xl w-full m-auto backdrop-blur-sm leading-6">
        아직 업로드된 이미지가 없습니다.
      </p> */}
    </>
  ),
  'gallery-guest': (
    <p className="text-start text-black/50 text-xs font-light rounded-lg w-full px-2 mt-4 m-auto backdrop-blur-lg leading-6">
      첫 번째 사진을 올리고 추억을 나눠보세요.
    </p>
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
