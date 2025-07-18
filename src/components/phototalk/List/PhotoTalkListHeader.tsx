import { USER_MODE } from '@/constants/photoTalkUserConstants';
import { UserMode } from '@/types/photoTalkUserTypes';

interface PhotoTalkListHeaderProps {
  userMode: UserMode;
  isGalleryOpen: boolean;
  onToggleGallery: () => void;
  onOpenEditor?: () => void;
}

const PhotoTalkListHeader = ({
  userMode,
  isGalleryOpen,
  onToggleGallery,
  onOpenEditor,
}: PhotoTalkListHeaderProps) => {
  return (
    <header className="flex-between mt-2 mb-4">
      {userMode === USER_MODE.ADMIN && (
        <p className="text-xs text-label-secondary/70 dark:text-label-secondary-dark/70 font-light">
          {isGalleryOpen
            ? `사진을 다운받고 관리할 수 있습니다.`
            : `하객분들의 축하메시지와 사진을 볼 수 있습니다.`}
        </p>
      )}

      {(userMode === USER_MODE.GUEST || userMode === USER_MODE.PREVIEW) && (
        <button
          onClick={() => onOpenEditor?.()}
          className={
            'px-4 py-2 bg-black/90 dark:bg-white/90 shadow-md border border-black/10 rounded-full text-xs text-white dark:text-black hover:bg-black/70'
          }
        >
          작성하기
        </button>
      )}

      <button
        onClick={onToggleGallery}
        aria-label="갤러리"
        className={`px-4 py-2 ml-auto text-xs font-medium rounded-full border border-border dark:border-boder-dark trasition-all duration-200 ease-in-out ${isGalleryOpen ? `shadow-inner bg-black dark:bg-surface-muted text-white dark:text-black` : `bg-transparent text-label-button/60  dark:text-label-button-dark/60 shadow-sm`}`}
      >
        갤러리
      </button>
    </header>
  );
};

export default PhotoTalkListHeader;
