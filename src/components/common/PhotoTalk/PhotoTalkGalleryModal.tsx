import ChevronLeft from '@/components/icons/Chevron_LeftIcon';
import ChevronRight from '@/components/icons/Chevron_RightIcon';
import { downloadImage } from '@/utils/downloadUtils';
import { useEffect, useRef, useState } from 'react';

interface PhotoTalkGalleryModalProps {
  isAdmin: boolean;
  images: string[];
  currentImageIndex: number;
  closeModal: () => void;
}

const PhotoTalkGalleryModal = ({
  isAdmin,
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
            포토톡 미리보기
          </h2>
        </header>
        <div
          className="relative flex-center w-full h-full p-10"
          id="modal-description"
        >
          <button
            onClick={showPreviousImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full hover:opacity-50"
          >
            <ChevronLeft className="size-8 text-white/80" />
          </button>

          <img
            src={images[currentIndex]}
            alt={`미리보기 이미지 ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-xl"
          />

          <button
            onClick={showNextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full hover:opacity-50"
          >
            <ChevronRight className="size-8 text-white/80" />
          </button>
        </div>

        {isAdmin && (
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
              onClick={downloadCurrentImage}
              aria-label="이미지 다운로드"
            >
              다운로드
            </button>
          </footer>
        )}
      </div>
    </section>
  );
};

export default PhotoTalkGalleryModal;
