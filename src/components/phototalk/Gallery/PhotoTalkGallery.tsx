import PhotoTalkGalleryAdmin from '@/components/phototalk/Gallery/PhotoTalkGalleryAdmin';
import PhotoTalkGalleryGuest from '@/components/phototalk/Gallery/PhotoTalkGalleryGuest';
import PhotoTalkGalleryPreview from '@/components/phototalk/Gallery/PhotoTalkGalleryPreview';
import { exampleImages } from '@/constants/phototalkData';
import usePhotoTalkStore from '@/store/usePhotoTalkStore';
import { USER_MODE, UserMode } from '@/types/users';

interface PhotoTalkGalleryProps {
  userMode: UserMode;
  isCardEmpty: boolean;
}

const PhotoTalkGallery = ({ userMode, isCardEmpty }: PhotoTalkGalleryProps) => {
  const getAllImages = usePhotoTalkStore((state) => state.getAllImages)();

  const images = isCardEmpty ? exampleImages : getAllImages;
  const isImageEmpty = getAllImages.length === 0;

  return (
    <>
      {userMode === USER_MODE.ADMIN && (
        <PhotoTalkGalleryAdmin
          userMode={userMode}
          images={images}
          isCardEmpty={isCardEmpty}
          isImageEmpty={isImageEmpty}
        />
      )}
      {userMode === USER_MODE.GUEST && (
        <PhotoTalkGalleryGuest
          userMode={userMode}
          images={images}
          isCardEmpty={isCardEmpty}
          isImageEmpty={isImageEmpty}
        />
      )}
      {userMode === USER_MODE.PREVIEW && (
        <PhotoTalkGalleryPreview userMode={userMode} />
      )}
    </>
  );
};

export default PhotoTalkGallery;
