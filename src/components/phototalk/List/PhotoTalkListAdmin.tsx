import ReusableModal from '@/components/common/Modal/ReusableModal';
import PhotoTalkCommonList from '@/components/phototalk/List/PhotoTalkCommonList';
import { usePhototalkAction } from '@/hooks/usePhototalkAction';
import PhotoTalkListHeader from '@/components/phototalk/List/PhotoTalkListHeader';
import useToast from '@/hooks/useToast';
import Toast from '@/components/common/Toast';
import { ACTION_MODE, USER_MODE } from '@/constants/photoTalkUserConstants';
import { PhotoTalk } from '@/types/phototalkTypes';

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
  const { showToast, message } = useToast();
  const { isModalOpen, openModal, closeModal, confirmAction } =
    usePhototalkAction({
      mode: userMode,
      onDelete: (photoTalk) => {
        showToast(`${photoTalk.name}님의 포토톡이 삭제되었습니다.`);
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

      {message && <Toast message={message} />}
    </>
  );
};

export default PhotoTalkListAdmin;
