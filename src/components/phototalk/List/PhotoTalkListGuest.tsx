import PasswordConfirmModal from '@/components/phototalk/Modal/PasswordConfirmModal';
import PhotoTalkCommonList from '@/components/phototalk/List/PhotoTalkCommonList';
import { PhotoTalk } from '@/types/phototalkType';
import usePhotoTalkStore from '@/store/usePhotoTalkStore';
import { usePhototalkAction } from '@/hooks/usePhototalkAction';
import { ACTION_MODE, USER_MODE } from '@/types/users';
import PhotoTalkListHeader from '@/components/phototalk/List/PhotoTalkListHeader';
import useToast from '@/hooks/useToast';
import Toast from '@/components/common/Toast';

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
  const { showToast, message } = useToast();

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
      showToast(`${photoTalk.name}님의 포토톡이 삭제되었습니다.`);
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

      {message && <Toast message={message} />}
    </div>
  );
};

export default PhotoTalkListGuest;
