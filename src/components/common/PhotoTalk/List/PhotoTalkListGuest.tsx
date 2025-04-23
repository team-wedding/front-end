import PasswordConfirmModal from '@/components/common/PhotoTalk/Modal/PasswordConfirmModal';
import PhotoTalkCommonList from '@/components/common/PhotoTalk/List/PhotoTalkCommonList';
import { PhotoTalk } from '@/types/phototalkType';
import { useState } from 'react';
import usePhotoTalkStore from '@/store/usePhotoTalkStore';
import { usePhototalkAction } from '@/hooks/usePhototalkAction';
import { ACTION_MODE, USER_MODE } from '@/types/users';
import PhotoTalkListHeader from '@/components/common/PhotoTalk/List/PhotoTalkListHeader';

const userMode = USER_MODE.GUEST;

interface PhotoTalkListGuestProps {
  photoTalkList: PhotoTalk[];
  isLoading: boolean;
  onOpenEditor: () => void;
}

const PhotoTalkListGuest = ({
  photoTalkList,
  isLoading,
  onOpenEditor,
}: PhotoTalkListGuestProps) => {
  const { setEditingPhotoTalk } = usePhotoTalkStore();
  const [isGalleryOpen, setGalleryOpen] = useState(false);

  const {
    isModalOpen,
    openModal,
    closeModal,
    confirmAction,
    passwordInput,
    setPasswordInput,
    actionMode,
  } = usePhototalkAction({
    mode: userMode,
    onEdit: (photoTalk) => {
      setEditingPhotoTalk(photoTalk);
      onOpenEditor();
    },
    onDelete: (photoTalk) => {
      console.log(`${userMode}: ${photoTalk.name}님의 포토톡 삭제 완료`);
    },
  });

  return (
    <div>
      <PhotoTalkListHeader
        userMode={userMode}
        isGalleryOpen={isGalleryOpen}
        onToggleGallery={() => setGalleryOpen(!isGalleryOpen)}
        onOpenEditor={onOpenEditor}
      />

      {isLoading ? (
        <>loading...</>
      ) : (
        <PhotoTalkCommonList
          userMode={userMode}
          photoTalkList={photoTalkList}
          onEdit={(talk) => openModal(talk, ACTION_MODE.EDIT)}
          onDelete={(talk) => openModal(talk, ACTION_MODE.DELETE)}
          isGalleryOpen={isGalleryOpen}
        />
      )}

      <PasswordConfirmModal
        mode={actionMode}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmAction}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
      />
    </div>
  );
};

export default PhotoTalkListGuest;
