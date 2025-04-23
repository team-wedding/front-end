import PhotoTalkCard from '@/components/common/PhotoTalk/Card/PhotoTalkCard';
import PhotoTalkGallery from '@/components/common/PhotoTalk/Gallery/PhotoTalkGallery';
import { PhotoTalk } from '@/types/phototalkType';
import PhotoTalkListEmptyState from '@/components/common/PhotoTalk/List/PhotoTalkListEmptyState';
import { UserMode } from '@/types/users';

interface PhotoTalkCommonListProps {
  userMode: UserMode;
  photoTalkList: PhotoTalk[];
  onEdit?: (photoTalk: PhotoTalk) => void;
  onDelete: (photoTalk: PhotoTalk) => void;
  isGalleryOpen: boolean;
}

const PhotoTalkCommonList = ({
  userMode,
  photoTalkList,
  onEdit,
  onDelete,
  isGalleryOpen,
}: PhotoTalkCommonListProps) => {
  const hasPhotoTalk = photoTalkList.length > 0;

  if (!hasPhotoTalk) return <PhotoTalkListEmptyState userMode={userMode} />;

  return isGalleryOpen ? (
    <PhotoTalkGallery userMode={userMode} />
  ) : (
    photoTalkList.map((photoTalk) => (
      <PhotoTalkCard
        key={photoTalk.id}
        photoTalk={photoTalk}
        onEdit={onEdit ? () => onEdit(photoTalk) : undefined}
        onDelete={() => onDelete(photoTalk)}
        userMode={userMode}
      />
    ))
  );
};

export default PhotoTalkCommonList;
