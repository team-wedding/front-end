import PhotoTalkGalleryGrid from '@/components/phototalk/Gallery/PhotoTalkGalleryGrid';
import PhotoTalkGalleryModal from '@/components/phototalk/Modal/PhotoTalkGalleryModal';
import { phototalkData } from '@/constants/phototalkData';
import { UserMode } from '@/types/users';
import { useState } from 'react';

interface PhotoTalkGalleryPreviewProps {
  userMode: UserMode;
}

const PhotoTalkGalleryPreview = ({
  userMode,
}: PhotoTalkGalleryPreviewProps) => {
  const images = phototalkData.flatMap((phototalk) => phototalk.imageUrl);

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      <PhotoTalkGalleryGrid
        images={images}
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

export default PhotoTalkGalleryPreview;
