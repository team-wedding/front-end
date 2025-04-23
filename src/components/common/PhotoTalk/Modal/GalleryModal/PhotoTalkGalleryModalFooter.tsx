import { USER_MODE, UserMode } from '@/types/users';

interface PhotoTalkGalleryModalFooterProps {
  userMode: UserMode;
  onDownload: () => void;
}

const PhotoTalkGalleryModalFooter = ({
  userMode,
  onDownload,
}: PhotoTalkGalleryModalFooterProps) => {
  if (userMode !== USER_MODE.ADMIN) return null;

  return (
    <footer className="absolute bottom-0 left-0 right-0 flex-center w-full gap-4 text-white/80 p-4">
      <button
        className="flex-1 py-3 text-xs rounded-xl  hover:bg-white/10 font-medium"
        onClick={() => {}}
        aria-label="이미지 삭제"
      >
        삭제
      </button>
      <button
        className="flex-1 py-3 text-xs rounded-xl hover:bg-white/10 font-medium"
        onClick={onDownload}
        aria-label="이미지 다운로드"
      >
        다운로드
      </button>
    </footer>
  );
};

export default PhotoTalkGalleryModalFooter;
