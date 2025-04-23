import PhotoTalkGalleryGrid from '@/components/common/PhotoTalk/Gallery/PhotoTalkGalleryGrid';
import PhotoTalkGalleryModal from '@/components/common/PhotoTalk/Modal/GalleryModal/PhotoTalkGalleryModal';
import usePhotoTalkStore from '@/store/usePhotoTalkStore';
import { USER_MODE } from '@/types/users';
import { useState } from 'react';

const userMode = USER_MODE.GUEST;

const PhotoTalkGalleryGuest = () => {
  const getAllImages = usePhotoTalkStore((state) => state.getAllImages);
  const images = getAllImages();

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div>
      <PhotoTalkGalleryGrid
        userMode={userMode}
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

export default PhotoTalkGalleryGuest;
