import PhotoTalkCard from '@/components/phototalk/Card/PhotoTalkCard';
import PhotoTalkGallery from '@/components/phototalk/Gallery/PhotoTalkGallery';
// import { examplePhototalkCard } from '@/constants/phototalkData';
import SkeletonPhotoTalk from '../../common/Skeleton/SkeletonPhotoTalk';
import SkeletonGallery from '../../common/Skeleton/SkeletonGallery';
import PhotoTalkEmptyState from '@/components/phototalk/EmptyState/PhotoTalkEmptyState';
import { UserMode } from '@/types/photoTalkUserTypes';
import { PhotoTalk } from '@/types/phototalkTypes';

interface PhotoTalkCommonListProps {
  userMode: UserMode;
  photoTalkList: PhotoTalk[];
  onEdit?: (photoTalk: PhotoTalk) => void;
  onDelete: (photoTalk: PhotoTalk) => void;
  isGalleryOpen: boolean;
  isPending: boolean;
  observeRef?: React.RefObject<HTMLDivElement>;
  isFetchingNextPage?: boolean;
}

const PhotoTalkCommonList = ({
  userMode,
  photoTalkList,
  onEdit,
  onDelete,
  isGalleryOpen,
  isPending,
  observeRef,
  isFetchingNextPage,
}: PhotoTalkCommonListProps) => {
  const isEmpty = photoTalkList.length === 0;

  // const photoTalks = isEmpty ? examplePhototalkCard : photoTalkList;

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
    <div>
      {isGalleryOpen ? (
        <PhotoTalkGallery userMode={userMode} isCardEmpty={isEmpty} />
      ) : (
        <>
          {isEmpty ? (
            <PhotoTalkEmptyState userMode={userMode} viewType="list" />
          ) : (
            photoTalkList.map((photoTalk) => {
              return (
                <PhotoTalkCard
                  key={photoTalk.id}
                  photoTalk={photoTalk}
                  onEdit={onEdit ? () => onEdit(photoTalk) : undefined}
                  onDelete={() => onDelete(photoTalk)}
                  userMode={userMode}
                />
              );
            })
          )}

          <section ref={observeRef}>
            {isFetchingNextPage && <SkeletonPhotoTalk />}
          </section>
        </>
      )}
    </div>
  );
};

export default PhotoTalkCommonList;
