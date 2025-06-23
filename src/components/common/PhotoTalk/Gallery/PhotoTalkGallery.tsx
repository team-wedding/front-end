import PhotoTalkGalleryAdmin from '@/components/common/PhotoTalk/Gallery/PhotoTalkGalleryAdmin';
import PhotoTalkGalleryGuest from '@/components/common/PhotoTalk/Gallery/PhotoTalkGalleryGuest';
import PhotoTalkGalleryPreview from '@/components/common/PhotoTalk/Gallery/PhotoTalkGalleryPreview';
import { exampleImages } from '@/constants/phototalkData';
import { USER_MODE } from '@/constants/photoTalkUserConstants';
import usePhotoTalkStore from '@/store/usePhotoTalkStore';
import { UserMode } from '@/types/photoTalkUserTypes';

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
