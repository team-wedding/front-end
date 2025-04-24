import PhotoTalkGalleryGrid from '@/components/common/PhotoTalk/Gallery/PhotoTalkGalleryGrid';
import PhotoTalkGalleryModal from '@/components/common/PhotoTalk/Modal/GalleryModal/PhotoTalkGalleryModal';
import { UserMode } from '@/types/users';
import { useState } from 'react';

interface PhotoTalkGalleryGuestProps {
  userMode: UserMode;
  images: string[];
  isEmpty: boolean;
}

const PhotoTalkGalleryGuest = ({
  userMode,
  images,
  isEmpty,
}: PhotoTalkGalleryGuestProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      <PhotoTalkGalleryGrid
        images={images}
        isExample={isEmpty}
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
