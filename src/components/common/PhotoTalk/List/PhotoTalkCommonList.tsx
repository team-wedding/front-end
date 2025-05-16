import PhotoTalkCard from '@/components/common/PhotoTalk/Card/PhotoTalkCard';
import PhotoTalkGallery from '@/components/common/PhotoTalk/Gallery/PhotoTalkGallery';
import { PhotoTalk } from '@/types/phototalkType';
import { UserMode } from '@/types/users';
import { examplePhototalkCard } from '@/constants/phototalkData';
// import PhotoTalkEmptyState from '@/components/common/PhotoTalk/EmptyState/PhotoTalkEmptyState';
import SkeletonPhotoTalk from '../../Skeleton/SkeletonPhotoTalk';
import SkeletonGallery from '../../Skeleton/SkeletonGallery';

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
  const isCardEmpty =
    !isPending && !isFetchingNextPage && photoTalkList.length === 0;
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

  // if (isCardEmpty) {
  //   return (
  //     <PhotoTalkEmptyState
  //       userMode={userMode}
  //       viewType={`${isGalleryOpen ? 'gallery' : 'list'}`}
  //     />
  //   );
  // }

  return (
    <>
      {isGalleryOpen ? (
        <PhotoTalkGallery userMode={userMode} />
      ) : (
        <>
          {photoTalks.map((photoTalk) => {
            const isExampleCard =
              isCardEmpty &&
              examplePhototalkCard.some((ex) => ex.id === photoTalk.id);

            return (
              <PhotoTalkCard
                key={photoTalk.id}
                photoTalk={photoTalk}
                isExample={isExampleCard}
                onEdit={onEdit ? () => onEdit(photoTalk) : undefined}
                onDelete={() => onDelete(photoTalk)}
                userMode={userMode}
              />
            );
          })}

          <div ref={observeRef} className="">
            {isFetchingNextPage && <SkeletonPhotoTalk />}
          </div>
        </>
      )}
    </>
  );
};

export default PhotoTalkCommonList;
