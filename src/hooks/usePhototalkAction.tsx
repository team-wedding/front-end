import {
  useDeletePhototalkByAdmin,
  useDeletePhototalkByGuest,
} from '@/hooks/usePhototalk';
import { useDeletePhototalkS3Url } from '@/hooks/useS3Image';
// import { useDeletePhototalkS3Image } from '@/hooks/useS3Image';
import { PhotoTalk } from '@/types/phototalkType';
import { ACTION_MODE, ActionMode, USER_MODE, UserMode } from '@/types/users';
import { useState } from 'react';

interface usePhototalkActionProps {
  mode: UserMode;
  onEdit?: (photoTalk: PhotoTalk) => void;
  onDelete?: (photoTalk: PhotoTalk) => void;
  refetch?: () => void;
}

export const usePhototalkAction = ({
  mode,
  onEdit,
  onDelete,
  refetch,
}: usePhototalkActionProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [selectedPhotoTalk, setSelectedPhotoTalk] = useState<PhotoTalk | null>(
    null,
  );
  const [actionMode, setActionMode] = useState<ActionMode | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate: deleteByAdmin } = useDeletePhototalkByAdmin();
  const { mutate: deleteByGuest } = useDeletePhototalkByGuest();
  const { mutate: deleteS3Image } = useDeletePhototalkS3Url();

  const openModal = (photoTalk: PhotoTalk, action: ActionMode) => {
    setSelectedPhotoTalk(photoTalk);
    setActionMode(action);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPasswordInput('');
    setSelectedPhotoTalk(null);
    setActionMode(null);
    setErrorMessage('');
  };

  const checkPassword = (phototalk: PhotoTalk): boolean => {
    if (phototalk.password !== passwordInput) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const confirmAction = () => {
    if (!selectedPhotoTalk || !actionMode) return;

    if (mode === USER_MODE.ADMIN) {
      if (actionMode === ACTION_MODE.DELETE) {
        deleteByAdmin(selectedPhotoTalk.id!, {
          onSuccess: () => {
            onDelete?.(selectedPhotoTalk);
            if (selectedPhotoTalk.imageUrl.length > 0) {
              deleteS3Image(selectedPhotoTalk.id!);
            }
            refetch?.();
            closeModal();
          },
        });
      }
    }

    if (mode === USER_MODE.GUEST) {
      if (actionMode === ACTION_MODE.EDIT) {
        if (!checkPassword(selectedPhotoTalk)) {
          return;
        }

        onEdit?.(selectedPhotoTalk);
        closeModal();
      }

      if (actionMode === ACTION_MODE.DELETE) {
        if (!checkPassword(selectedPhotoTalk)) {
          return;
        }

        deleteByGuest(
          {
            id: selectedPhotoTalk.id!,
            name: selectedPhotoTalk.name,
            password: passwordInput,
          },
          {
            onSuccess: () => {
              onDelete?.(selectedPhotoTalk);
              deleteS3Image(selectedPhotoTalk.id!);
              refetch?.();
              closeModal();
            },
          },
        );
      }
    }
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    confirmAction,
    passwordInput,
    setPasswordInput,
    selectedPhotoTalk,
    actionMode,
    errorMessage,
    setErrorMessage,
  };
};
