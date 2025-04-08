import { USER_MODE, UserMode } from '@/types/users';

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
    <header className="flex-between p-2">
      {userMode === USER_MODE.ADMIN && (
        <p className="text-xs text-[#494949] font-light">
          {isGalleryOpen
            ? `사진을 다운받고 관리할 수 있습니다.`
            : `하객분들의 축하메시지와 사진을 볼 수 있습니다.`}
        </p>
      )}

      {(userMode === USER_MODE.GUEST || userMode === USER_MODE.PREVIEW) && (
        <button
          onClick={() => onOpenEditor?.()}
          className={
            'px-4 py-2 bg-black/90 shadow-md border border-black/10 rounded-full text-xs text-white hover:bg-black/70'
          }
        >
          작성하기
        </button>
      )}

      <button
        onClick={onToggleGallery}
        aria-label="갤러리"
        className={`px-4 py-2 ml-auto text-xs font-medium rounded-full border border-black/10 trasition-all duration-200 ease-in-out ${isGalleryOpen ? `shadow-inner bg-black text-white` : `bg-transparent text-black/60 shadow-sm`}`}
      >
        갤러리
      </button>
    </header>
  );
};

export default PhotoTalkListHeader;
