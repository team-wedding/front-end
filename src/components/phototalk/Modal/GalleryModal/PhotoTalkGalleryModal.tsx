import PhotoTalkGalleryModalFooter from '@/components/phototalk/Modal/GalleryModal/PhotoTalkGalleryModalFooter';
import ChevronLeft from '@/components/icons/Chevron_LeftIcon';
import ChevronRight from '@/components/icons/Chevron_RightIcon';
import ImageIcon from '@/components/icons/ImageIcon';
import { USER_MODE, UserMode } from '@/types/users';
import { downloadImage } from '@/utils/downloadUtils';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PhotoTalkGalleryModalProps {
  userMode: UserMode;
  images: string[];
  isExample?: boolean;
  currentImageIndex: number;
  closeModal: () => void;
}

const PhotoTalkGalleryModal = ({
  userMode,
  images,
  isExample,
  currentImageIndex,
  closeModal,
}: PhotoTalkGalleryModalProps) => {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    throw new Error(
      'Modal root element not found. Make sure <div id="modal-root" /> exists in index.html.',
    );
  }

  const [currentIndex, setCurrentIndex] = useState(currentImageIndex);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(currentImageIndex);
  }, [currentImageIndex]);

  useEffect(() => {
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const downloadCurrentImage = () => {
    const url = images[currentIndex];
    downloadImage(url, currentIndex);
  };

  return createPortal(
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={closeModal}
      ref={modalRef}
      tabIndex={-1}
      className="max-w-[520px] m-auto column-center fixed inset-0 z-50 bg-black/90 focus:ring-0 focus:border-none "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full h-[34rem] overflow-hidden backdrop-blur-2xl bg-white/20 rounded-sm dark:bg-white/20 shadow-custom column-center gap-4 ${userMode !== USER_MODE.ADMIN && 'py-8'}`}
      >
        <header>
          <h2 id="modal-title" className="sr-only">
            이미지 전체화면
          </h2>
        </header>

        <section
          className="relative flex-center w-full h-full px-10 pt-8"
          id="modal-description"
        >
          <button
            onClick={showPreviousImage}
            aria-label="이전 이미지 보기"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full hover:opacity-50"
          >
            <ChevronLeft className="size-8 text-white/80" />
          </button>

          <img
            src={images[currentIndex]}
            alt={`이미지 ${currentIndex + 1}`}
            className="max-w-full h-[24rem] object-cover"
          />

          <button
            onClick={showNextImage}
            aria-label="다음 이미지 보기"
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full hover:opacity-50 `}
          >
            <ChevronRight className="size-8 text-white/80" />
          </button>
        </section>

        <aside
          className={`text-white text-xs bg-black/0 rounded-full flex-center gap-1 font-thin`}
        >
          <ImageIcon className="size-4" />
          <span>
            {images.length}장 중 {currentIndex + 1}번
          </span>
        </aside>

        {userMode === USER_MODE.ADMIN && (
          <PhotoTalkGalleryModalFooter
            isExample={isExample!}
            onDownload={downloadCurrentImage}
          />
        )}
      </div>
    </section>,
    modalRoot,
  );
};

export default PhotoTalkGalleryModal;
