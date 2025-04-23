import PhotoTalkGalleryModalFooter from '@/components/common/PhotoTalk/Modal/GalleryModal/PhotoTalkGalleryModalFooter';
import ChevronLeft from '@/components/icons/Chevron_LeftIcon';
import ChevronRight from '@/components/icons/Chevron_RightIcon';
import { UserMode } from '@/types/users';
import { downloadImage } from '@/utils/downloadUtils';
import { useEffect, useRef, useState } from 'react';

interface PhotoTalkGalleryModalProps {
  userMode: UserMode;
  images: string[];
  currentImageIndex: number;
  closeModal: () => void;
}

const PhotoTalkGalleryModal = ({
  userMode,
  images,
  currentImageIndex,
  closeModal,
}: PhotoTalkGalleryModalProps) => {
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

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={closeModal}
      ref={modalRef}
      tabIndex={-1}
      className="max-w-[520px] m-auto column-center fixed inset-0 z-50 bg-black bg-opacity-80 focus:ring-0 focus:border-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] aspect-[3/4] rounded-2xl overflow-hidden backdrop-blur-3xl bg-black/30 shadow-custom py-8"
      >
        <header>
          <h2 id="modal-title" className="sr-only">
            이미지 전체화면
          </h2>
        </header>

        <section
          className="relative flex-center w-full h-full p-10"
          id="modal-description"
        >
          <button
            onClick={showPreviousImage}
            aria-label="이전 이미지 보기"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full hover:opacity-50"
          >
            <ChevronLeft className="size-8 text-white/80" />
          </button>

          <img
            src={images[currentIndex]}
            alt={`이미지 ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-xl"
          />

          <button
            onClick={showNextImage}
            aria-label="다음 이미지 보기"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full hover:opacity-50"
          >
            <ChevronRight className="size-8 text-white/80" />
          </button>
        </section>

        <PhotoTalkGalleryModalFooter
          userMode={userMode}
          onDownload={downloadCurrentImage}
        />
      </div>
    </section>
  );
};

export default PhotoTalkGalleryModal;
