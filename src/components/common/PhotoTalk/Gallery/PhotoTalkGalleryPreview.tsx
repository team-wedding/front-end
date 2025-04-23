import PhotoTalkGalleryGrid from '@/components/common/PhotoTalk/Gallery/PhotoTalkGalleryGrid';
import PhotoTalkGalleryModal from '@/components/common/PhotoTalk/Modal/GalleryModal/PhotoTalkGalleryModal';
import { phototalkData } from '@/constants/phototalkData';
import { USER_MODE } from '@/types/users';
import { useState } from 'react';

const userMode = USER_MODE.PREVIEW;

const PhotoTalkGalleryPreview = () => {
  const images = phototalkData.flatMap((phototalk) => phototalk.imageUrl);

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div>
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
    </div>
  );
};

export default PhotoTalkGalleryPreview;
