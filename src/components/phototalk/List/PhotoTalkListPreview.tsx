import PhotoTalkCommonList from '@/components/phototalk/List/PhotoTalkCommonList';
import PhotoTalkListHeader from '@/components/phototalk/List/PhotoTalkListHeader';
import PasswordConfirmModal from '@/components/phototalk/Modal/PasswordConfirmModal';
import { PhotoTalk } from '@/types/phototalkType';
import { ACTION_MODE, ActionMode, USER_MODE } from '@/types/users';
import { useState } from 'react';

const userMode = USER_MODE.PREVIEW;

interface PhotoTalkListPreviewProps {
  photoTalkList: PhotoTalk[];
  onOpenEditor: () => void;
}

const PhotoTalkListPreview = ({
  photoTalkList,
  onOpenEditor,
}: PhotoTalkListPreviewProps) => {
  const [isGalleryOpen, setGalleryOpen] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [actionMode, setActionMode] = useState<ActionMode | null>(null);
  const [passwordInput, setPasswordInput] = useState('');

  const openModal = (mode: ActionMode) => {
    setActionMode(mode);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPasswordInput('');
    setActionMode(null);
  };

  return (
    <>
      <PhotoTalkListHeader
        userMode={userMode}
        isGalleryOpen={isGalleryOpen}
        onToggleGallery={() => setGalleryOpen(!isGalleryOpen)}
        onOpenEditor={onOpenEditor}
      />

      <PhotoTalkCommonList
        userMode={userMode}
        photoTalkList={photoTalkList}
        onEdit={() => openModal(ACTION_MODE.EDIT)}
        onDelete={() => openModal(ACTION_MODE.DELETE)}
        isGalleryOpen={isGalleryOpen}
        isPending={false}
      />

      <PasswordConfirmModal
        mode={actionMode}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => {
          alert('예시 페이지입니다.');
          closeModal();
        }}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
      />
    </>
  );
};

export default PhotoTalkListPreview;
