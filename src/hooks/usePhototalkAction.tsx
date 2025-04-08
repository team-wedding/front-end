import {
  useDeletePhototalkByAdmin,
  useDeletePhototalkByGuest,
} from '@/hooks/usePhototalk';
import { PhotoTalk } from '@/types/phototalkType';
import { ACTION_MODE, ActionMode, USER_MODE, UserMode } from '@/types/users';
import { useState } from 'react';

interface usePhototalkActionProps {
  mode: UserMode;
  onEdit?: (photoTalk: PhotoTalk) => void;
  onDelete?: (photoTalk: PhotoTalk) => void;
}

export const usePhototalkAction = ({
  mode,
  onEdit,
  onDelete,
}: usePhototalkActionProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [selectedPhotoTalk, setSelectedPhotoTalk] = useState<PhotoTalk | null>(
    null,
  );
  const [actionMode, setActionMode] = useState<ActionMode | null>(null);

  const { mutate: deleteByAdmin } = useDeletePhototalkByAdmin();
  const { mutate: deleteByGuest } = useDeletePhototalkByGuest();

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

  const confirmAction = () => {
    if (!selectedPhotoTalk || !actionMode) return;

    if (mode === USER_MODE.ADMIN) {
      if (actionMode === ACTION_MODE.DELETE) {
        deleteByAdmin(selectedPhotoTalk.id!, {
          onSuccess: () => {
            onDelete?.(selectedPhotoTalk);
            closeModal();
          },
        });
      }
    }

    if (mode === USER_MODE.GUEST) {
      if (actionMode === ACTION_MODE.EDIT) {
        onEdit?.(selectedPhotoTalk);
        closeModal();
      }

      if (actionMode === ACTION_MODE.DELETE) {
        deleteByGuest(
          {
            id: selectedPhotoTalk.id!,
            name: selectedPhotoTalk.name,
            password: selectedPhotoTalk.password,
          },
          {
            onSuccess: () => {
              onDelete?.(selectedPhotoTalk);
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
