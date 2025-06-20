import PhotoTalkGalleryModal from '@/components/phototalk/Modal/GalleryModal/PhotoTalkGalleryModal';
import { UserMode } from '@/types/users';
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';

interface PhotoTalkImageProps {
  userMode: UserMode;
  images: string[];
}

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  initialSlide: 0,
  appendDots: (dots: React.ReactNode) => (
    <div className="w-full overflow-x-auto">
      <div className="custom-dots w-fit inline-flex">{dots}</div>
    </div>
  ),
};

const PhotoTalkImage = ({ userMode, images }: PhotoTalkImageProps) => {
  const draggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const markDragging = () => {
    if (draggingRef.current) return;
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      draggingRef.current = true;
      rafRef.current = null;
    });
  };

  const handleRelease = (idx: number) => {
    if (!draggingRef.current) {
      setCurrentImageIndex(idx);
      setGalleryModalOpen(true);
    }
    draggingRef.current = false;
  };

  return (
    <>
      <Slider
        key={`img-${images.length}`}
        {...sliderSettings}
        className="w-full max-w-full"
      >
        {images.map((image: string, index: number) => (
          <div
            key={index}
            className="w-full h-full border rounded-md relative dark:border-gray-900"
          >
            <img
              src={image}
              width={600}
              height={450}
              alt={`Uploaded ${index}`}
              className="w-full h-[11rem] object-cover rounded-md"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              onMouseDown={() => (draggingRef.current = false)}
              onMouseMove={markDragging}
              onMouseUp={() => handleRelease(index)}
              onTouchStart={() => (draggingRef.current = false)}
              onTouchMove={markDragging}
              onTouchEnd={() => handleRelease(index)}
            />
          </div>
        ))}
      </Slider>

      {galleryModalOpen && (
        <PhotoTalkGalleryModal
          userMode={userMode}
          images={images}
          currentImageIndex={currentImageIndex}
          closeModal={() => setGalleryModalOpen(false)}
        />
      )}
    </>
  );
};

export default React.memo(
  PhotoTalkImage,
  (prev, next) =>
    prev.userMode === next.userMode && prev.images === next.images,
);
