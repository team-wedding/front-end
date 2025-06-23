import PasswordConfirmModal from '@/components/common/PhotoTalk/Modal/PasswordConfirmModal';
import PhotoTalkCommonList from '@/components/common/PhotoTalk/List/PhotoTalkCommonList';
import { PhotoTalk } from '@/types/phototalkTypes';
import usePhotoTalkStore from '@/store/usePhotoTalkStore';
import { usePhototalkAction } from '@/hooks/usePhototalkAction';
import PhotoTalkListHeader from '@/components/common/PhotoTalk/List/PhotoTalkListHeader';
import { ACTION_MODE, USER_MODE } from '@/constants/photoTalkUserConstants';

const userMode = USER_MODE.GUEST;

interface PhotoTalkListGuestProps {
  photoTalkList: PhotoTalk[];
  isLoading: boolean;
  onOpenEditor: () => void;
  observeRef?: React.RefObject<HTMLDivElement>;
  isFetchingNextPage?: boolean;
  refetch: () => void;
  isGalleryOpen: boolean;
  onToggleGallery: () => void;
}

const PhotoTalkListGuest = ({
  photoTalkList,
  isLoading,
  onOpenEditor,
  observeRef,
  isFetchingNextPage,
  refetch,
  isGalleryOpen,
  onToggleGallery,
}: PhotoTalkListGuestProps) => {
  const { setEditingPhotoTalk } = usePhotoTalkStore();

  const {
    isModalOpen,
    openModal,
    closeModal,
    confirmAction,
    passwordInput,
    setPasswordInput,
    actionMode,
    errorMessage,
    setErrorMessage,
  } = usePhototalkAction({
    mode: userMode,
    onEdit: (photoTalk) => {
      setEditingPhotoTalk(photoTalk);
      onOpenEditor();
    },
    onDelete: (photoTalk) => {
      console.log(`${userMode}: ${photoTalk.name}님의 포토톡 삭제 완료`);
    },
    refetch,
  });

  return (
    <div>
      <PhotoTalkListHeader
        userMode={userMode}
        isGalleryOpen={isGalleryOpen}
        onToggleGallery={onToggleGallery}
        onOpenEditor={onOpenEditor}
      />

      <PhotoTalkCommonList
        userMode={userMode}
        photoTalkList={photoTalkList}
        onEdit={(talk) => openModal(talk, ACTION_MODE.EDIT)}
        onDelete={(talk) => openModal(talk, ACTION_MODE.DELETE)}
        isGalleryOpen={isGalleryOpen}
        isPending={isLoading}
        observeRef={observeRef}
        isFetchingNextPage={isFetchingNextPage}
      />

      <PasswordConfirmModal
        mode={actionMode}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmAction}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default PhotoTalkListGuest;
