import PhotoTalkGalleryAdmin from '@/components/common/PhotoTalk/Gallery/PhotoTalkGalleryAdmin';
import PhotoTalkGalleryGuest from '@/components/common/PhotoTalk/Gallery/PhotoTalkGalleryGuest';
import PhotoTalkGalleryPreview from '@/components/common/PhotoTalk/Gallery/PhotoTalkGalleryPreview';
import { UserMode } from '@/types/users';

interface PhotoTalkGalleryProps {
  userMode: UserMode;
}

const PhotoTalkGallery = ({ userMode }: PhotoTalkGalleryProps) => {
  return (
    <>
      {userMode === 'admin' && <PhotoTalkGalleryAdmin />}
      {userMode === 'guest' && <PhotoTalkGalleryGuest />}
      {userMode === 'preview' && <PhotoTalkGalleryPreview />}
    </>
  );
};

export default PhotoTalkGallery;
