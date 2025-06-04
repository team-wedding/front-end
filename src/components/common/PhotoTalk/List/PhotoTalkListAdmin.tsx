import ReusableModal from '@/components/common/Modal/ReusableModal';
import PhotoTalkCommonList from '@/components/common/PhotoTalk/List/PhotoTalkCommonList';
import { PhotoTalk } from '@/types/phototalkType';
import { usePhototalkAction } from '@/hooks/usePhototalkAction';
import { ACTION_MODE, USER_MODE } from '@/types/users';
import PhotoTalkListHeader from '@/components/common/PhotoTalk/List/PhotoTalkListHeader';

const userMode = USER_MODE.ADMIN;

interface PhotoTalkListAdminProps {
  photoTalkList: PhotoTalk[];
  isLoading: boolean;
  observeRef?: React.RefObject<HTMLDivElement>;
  isFetchingNextPage?: boolean;
  refetch: () => void;
  isGalleryOpen: boolean;
  onToggleGallery: () => void;
}

const PhotoTalkListAdmin = ({
  photoTalkList,
  isLoading,
  observeRef,
  isFetchingNextPage,
  refetch,
  isGalleryOpen,
  onToggleGallery,
}: PhotoTalkListAdminProps) => {
  const { isModalOpen, openModal, closeModal, confirmAction } =
    usePhototalkAction({
      mode: userMode,
      onDelete: (photoTalk) => {
        console.log(`${userMode}: ${photoTalk.name}님의 포토톡 삭제 완료`);
      },
      refetch,
    });

  return (
    <>
      <PhotoTalkListHeader
        userMode={userMode}
        isGalleryOpen={isGalleryOpen}
        onToggleGallery={onToggleGallery}
      />

      <PhotoTalkCommonList
        userMode={userMode}
        photoTalkList={photoTalkList}
        onDelete={(talk) => openModal(talk, ACTION_MODE.DELETE)}
        isGalleryOpen={isGalleryOpen}
        isPending={isLoading}
        observeRef={observeRef}
        isFetchingNextPage={isFetchingNextPage}
      />

      <ReusableModal
        isOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={confirmAction}
        title="정말 삭제하시겠습니까?"
        confirmText="삭제"
      />
    </>
  );
};

export default PhotoTalkListAdmin;
