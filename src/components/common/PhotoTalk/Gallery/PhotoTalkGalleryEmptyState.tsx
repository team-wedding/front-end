import { USER_MODE, UserMode } from '@/types/users';

interface PhotoTalkGalleryEmptyStateProps {
  userMode?: UserMode;
}

const PhotoTalkGalleryEmptyState = ({
  userMode,
}: PhotoTalkGalleryEmptyStateProps) => {
  return (
    <main className="text-center p-4 bg-white/40 text-black/30 font-light text-sm rounded-2xl">
      {userMode === USER_MODE.ADMIN && (
        <>
          아직 등록된 이미지가 없습니다.
          <br /> 하객 포토를 기다려보세요.
        </>
      )}
      {userMode === USER_MODE.GUEST && (
        <>
          첫 번째 사진을 올리고
          <br /> 추억을 나눠보세요
        </>
      )}
    </main>
  );
};

export default PhotoTalkGalleryEmptyState;
