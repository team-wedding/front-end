import PhotoTalkEmptyState from '@/components/phototalk/EmptyState/PhotoTalkEmptyState';
import PhotoTalkGalleryGrid from '@/components/phototalk/Gallery/PhotoTalkGalleryGrid';
import PhotoTalkGalleryModal from '@/components/phototalk/Modal/GalleryModal/PhotoTalkGalleryModal';
import { UserMode } from '@/types/users';
import { useState } from 'react';

interface PhotoTalkGalleryGuestProps {
  userMode: UserMode;
  images: string[];
  isCardEmpty: boolean;
  isImageEmpty: boolean;
}

const PhotoTalkGalleryGuest = ({
  userMode,
  images,
  isCardEmpty,
  isImageEmpty,
}: PhotoTalkGalleryGuestProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      {isImageEmpty && !isCardEmpty && (
        <PhotoTalkEmptyState userMode={userMode} viewType="gallery" />
      )}

      <PhotoTalkGalleryGrid
        images={images}
        isExample={isCardEmpty}
        onImageClick={(index) => {
          setCurrentImageIndex(index);
          setModalOpen(true);
        }}
      />

      {isModalOpen && (
        <PhotoTalkGalleryModal
          userMode={userMode}
          images={images}
          currentImageIndex={currentImageIndex}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default PhotoTalkGalleryGuest;
