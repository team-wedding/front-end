import PhotoTalkGalleryAdmin from '@/components/common/PhotoTalk/Gallery/PhotoTalkGalleryAdmin';
import PhotoTalkGalleryGuest from '@/components/common/PhotoTalk/Gallery/PhotoTalkGalleryGuest';
import PhotoTalkGalleryPreview from '@/components/common/PhotoTalk/Gallery/PhotoTalkGalleryPreview';
import { exampleImages } from '@/constants/phototalkData';
import usePhotoTalkStore from '@/store/usePhotoTalkStore';
import { USER_MODE, UserMode } from '@/types/users';

interface PhotoTalkGalleryProps {
  userMode: UserMode;
}

const PhotoTalkGallery = ({ userMode }: PhotoTalkGalleryProps) => {
  const getAllImages = usePhotoTalkStore((state) => state.getAllImages)();
  const isImageEmpty = getAllImages.length === 0;

  const images = isImageEmpty ? exampleImages : getAllImages;

  return (
    <>
      {userMode === USER_MODE.ADMIN && (
        <PhotoTalkGalleryAdmin
          userMode={userMode}
          images={images}
          isEmpty={isImageEmpty}
        />
      )}
      {userMode === USER_MODE.GUEST && (
        <PhotoTalkGalleryGuest
          userMode={userMode}
          images={images}
          isEmpty={isImageEmpty}
        />
      )}
      {userMode === USER_MODE.PREVIEW && (
        <PhotoTalkGalleryPreview userMode={userMode} />
      )}
    </>
  );
};

export default PhotoTalkGallery;
