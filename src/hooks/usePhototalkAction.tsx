import {
  useDeletePhototalkByAdmin,
  useDeletePhototalkByGuest,
} from '@/hooks/usePhototalk';
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

  const { mutate: deleteByAdmin } = useDeletePhototalkByAdmin();
  const { mutate: deleteByGuest } = useDeletePhototalkByGuest();
  // const { mutate: deleteS3Image } = useDeletePhototalkS3Image();

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
  };

  const checkPassword = (phototalk: PhotoTalk): boolean => {
    if (phototalk.password !== passwordInput) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    return true;
  };

  const confirmAction = () => {
    if (!selectedPhotoTalk || !actionMode) return;

    if (mode === USER_MODE.ADMIN) {
      if (actionMode === ACTION_MODE.DELETE) {
        deleteByAdmin(selectedPhotoTalk.id!, {
          onSuccess: () => {
            // deleteS3Image(selectedPhotoTalk.id!);
            onDelete?.(selectedPhotoTalk);
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
              // deleteS3Image(selectedPhotoTalk.id!);
              onDelete?.(selectedPhotoTalk);
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
  };
};
