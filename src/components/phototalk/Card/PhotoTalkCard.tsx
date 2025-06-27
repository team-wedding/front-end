import React, { useMemo } from 'react';
import MenuDotsIcon from '@icons/MenuDotsIcon';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PhotoTalkAction from '@/components/phototalk/Card/PhotoTalkAction';
import PhotoTalkMessage from '@/components/phototalk/Card/PhotoTalkMessage';
import { useDropdown } from '@/hooks/useDropDown';
import PhotoTalkImage from '@/components/phototalk/Card/PhotoTalkImage';
import { UserMode } from '@/types/photoTalkUserTypes';
import { PhotoTalk } from '@/types/phototalkTypes';

interface PhotoTalkCardProps {
  userMode: UserMode;
  photoTalk: PhotoTalk;
  onEdit?: () => void;
  onDelete?: () => void;
}

const usePhotoTalkImages = (photoTalk: PhotoTalk) => {
  return useMemo(() => {
    if (Array.isArray(photoTalk.imageUrl)) {
      return photoTalk.imageUrl;
    }
    if (typeof photoTalk.imageUrl === 'string') {
      try {
        return JSON.parse(photoTalk.imageUrl);
      } catch {
        return [];
      }
    }
    return [];
  }, [photoTalk.imageUrl]);
};

const PhotoTalkCard = ({
  userMode,
  photoTalk,
  onEdit,
  onDelete,
}: PhotoTalkCardProps) => {
  const { open, setOpen, ref } = useDropdown();
  const images = usePhotoTalkImages(photoTalk);
  const hasImage = images.length > 0;

  return (
    <article
      role="group"
      aria-label={`${photoTalk.name}님의 포토톡`}
      className={`flex flex-col justify-center bg-surface/60 backdrop-blur-lg dark:bg-surface-dark/70 w-full rounded-xl relative mb-3 py-4 px-2 shadow-custom border dark:border-black trasition-all duration-300 ease-in-out ${hasImage ? `min-h-[14rem]` : `h-fit`} `}
    >
      <header ref={ref} className="relative">
        <button
          type="button"
          aria-label="메뉴 열기"
          aria-haspopup="true"
          className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-0 focus:outline-none rounded-lg text-sm absolute -top-2 right-4 dark:hover:bg-gray-800 "
          onClick={() => setOpen(!open)}
        >
          <MenuDotsIcon />
        </button>

        {open && (
          <nav
            aria-label="포토톡 카드 옵션"
            className={`absolute top-6 right-2 z-50 bg-gray-200 dark:bg-gray-800 backdrop-blur-3xl divide-y divide-gray-100 rounded-2xl shadow-md w-[9rem] px-2 py-1 `}
          >
            <PhotoTalkAction
              userMode={userMode}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </nav>
        )}
      </header>

      <main
        className={`w-full p-2 ${hasImage ? `grid grid-cols-2 gap-1` : `flex-center`}`}
      >
        {hasImage && (
          <section
            aria-label="포토톡 사진"
            className="w-full h-full overflow-visible"
          >
            <PhotoTalkImage userMode={userMode} images={images} />
          </section>
        )}

        <section
          aria-label="포토톡 메시지"
          className="w-full h-full flex-center"
        >
          <PhotoTalkMessage message={photoTalk.message} hasImage={hasImage} />
        </section>
      </main>

      <footer className="flex items-center justify-end gap-1 pr-6 text-label-secondary/80  dark:text-label-secondary-dark/80 text-sm">
        <span className="italic">from.</span>
        <p className="font-medium">{photoTalk.name}</p>
      </footer>
    </article>
  );
};

export default React.memo(PhotoTalkCard);
