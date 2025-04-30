import PhotoTalkCard from '@/components/common/PhotoTalk/Card/PhotoTalkCard';
import PhotoTalkGallery from '@/components/common/PhotoTalk/Gallery/PhotoTalkGallery';
import { PhotoTalk } from '@/types/phototalkType';
import { UserMode } from '@/types/users';
import { examplePhototalkCard } from '@/constants/phototalkData';
import PhotoTalkEmptyState from '@/components/common/PhotoTalk/EmptyState/PhotoTalkEmptyState';
import SkeletonPhotoTalk from '../../Skeleton/SkeletonPhotoTalk';
import SkeletonGallery from '../../Skeleton/SkeletonGallery';

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
  const isCardEmpty = !isPending && photoTalkList.length === 0;
  const photoTalks = isCardEmpty ? examplePhototalkCard : photoTalkList;

  if (isPending) {
    return isGalleryOpen
      ? Array.from({ length: 3 }).map((_, index) => (
          <SkeletonGallery key={index} />
        ))
      : Array.from({ length: 3 }).map((_, index) => (
          <SkeletonPhotoTalk key={index} />
        ));
  }

  return (
    <>
      {isCardEmpty && (
        <PhotoTalkEmptyState
          userMode={userMode}
          viewType={`${isGalleryOpen ? 'gallery' : 'list'}`}
        />
      )}

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
