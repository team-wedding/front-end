import DownloadIcon from '@/components/icons/DownloadIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import { USER_MODE, UserMode } from '@/types/users';

interface PhotoTalkGalleryModalFooterProps {
  userMode: UserMode;
  isExample: boolean;
  onDownload: () => void;
}

const PhotoTalkGalleryModalFooter = ({
  userMode,
  isExample,
  onDownload,
}: PhotoTalkGalleryModalFooterProps) => {
  if (userMode == USER_MODE.GUEST && USER_MODE.PREVIEW) return null;

  return (
    <footer className="flex-center w-full gap-4 text-white/90 p-2 bg-black/80 dark:bg-black/60">
      <button
        className="flex-1 py-2 text-xs rounded-xl  hover:bg-white/10 font-medium flex-center"
        onClick={() => {}}
        aria-label="이미지 삭제"
      >
        <TrashIcon className="size-5 text-white/80" strokeWidth={1.5} />
      </button>
      <button
        className="flex-1 py-2 text-xs rounded-xl hover:bg-white/10 font-medium flex-center"
        onClick={onDownload}
        disabled={isExample}
        aria-label="이미지 다운로드"
      >
        <DownloadIcon className="size-5 text-white/80" />
      </button>
    </footer>
  );
};

export default PhotoTalkGalleryModalFooter;
