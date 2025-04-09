import PhotoTalkCard from '@/components/common/PhotoTalk/Card/PhotoTalkCard';
import PhotoTalkGallery from '@/components/common/PhotoTalk/Gallery/PhotoTalkGallery';
import { PhotoTalk } from '@/types/phototalkType';
import { UserMode } from '@/types/users';
import SkeletonPhotoTalk from '@/components/common/Skeleton/SkeletonPhotoTalk';
import SkeletonGallery from '@components/common/Skeleton/SkeletonGallery';

interface PhotoTalkCommonListProps {
  userMode: UserMode;
  photoTalkList: PhotoTalk[];
  onEdit?: (photoTalk: PhotoTalk) => void;
  onDelete: (photoTalk: PhotoTalk) => void;
  isGalleryOpen: boolean;
  isPending: boolean;
}

const PhotoTalkCommonList = ({
  userMode,
  photoTalkList,
  onEdit,
  onDelete,
  isGalleryOpen,
  isPending,
}: PhotoTalkCommonListProps) => {
  const hasPhotoTalk = photoTalkList.length > 0;

  if (isPending) {
    return isGalleryOpen
      ? Array.from({ length: 3 }).map((_, i) => <SkeletonGallery key={i} />)
      : Array.from({ length: 3 }).map((_, i) => <SkeletonPhotoTalk key={i} />);
  }

  if (!hasPhotoTalk) return <PhotoTalkListEmptyState userMode={userMode} />;

      {isGalleryOpen ? (
        <PhotoTalkGallery userMode={userMode} />
      ) : (
        photoTalks.map((photoTalk) => (
          <PhotoTalkCard
            key={photoTalk.id}
            photoTalk={photoTalk}
            isExample={isCardEmpty}
            onEdit={onEdit ? () => onEdit(photoTalk) : undefined}
            onDelete={() => onDelete(photoTalk)}
            userMode={userMode}
          />
        ))
      )}
    </>
  );
};

export default PhotoTalkCommonList;
