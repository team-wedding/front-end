import { useState } from 'react';
import usePhotoTalkStore, { PhotoTalk } from '@store/usePhotoTalkStore';
import PhotoTalkCard from '@/pages/PhotoTalk/PhotoTalkCard';
import PhotoTalkGallery from '@/pages/PhotoTalk/PhotoTalkGallery';
import PasswordConfirmModal from '@/pages/PhotoTalk/PasswordConfirmModal';
import PhotoTalkEditor from '@/pages/PhotoTalk/PhotoTalkEditor';
import ListIcon from '@/components/icons/ListIcon';
import ImageIcon from '@/components/icons/ImageIcon';

interface PhotoTalkListProps {
  isAdmin: boolean;
}

const PhotoTalkList = ({ isAdmin }: PhotoTalkListProps) => {
  const { deletePhotoTalk, setEditingPhotoTalk, openEditor, isOpen } =
    usePhotoTalkStore();
  const [selectedPhotoTalk, setSelectedPhotoTalk] = useState<PhotoTalk | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const confirmPassword = (passwordInput: string) => {
    if (!selectedPhotoTalk) return;

    if (isAdmin || selectedPhotoTalk.password === passwordInput) {
      if (isDeleting) {
        deletePhotoTalk(selectedPhotoTalk.id);
      } else {
        setEditingPhotoTalk(selectedPhotoTalk);
        openEditor();
      }
      setSelectedPhotoTalk(null);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleDeleteClick = (talk: PhotoTalk) => {
    setSelectedPhotoTalk(talk);
    setIsDeleting(true);
    if (isAdmin) {
      setDeleteConfirmOpen(true);
    }
  };

  const confirmDelete = () => {
    if (selectedPhotoTalk) {
      deletePhotoTalk(selectedPhotoTalk.id);
    }
    setSelectedPhotoTalk(null);
    setDeleteConfirmOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mx-8">
        <button
          onClick={() => setGalleryOpen(!isGalleryOpen)}
          className="select-btn"
        >
          {isGalleryOpen ? <ListIcon /> : <ImageIcon />}
        </button>
      </div>

      {isGalleryOpen ? (
        <PhotoTalkGallery isAdmin={isAdmin} />
      ) : (
        <PhotoTalkCard
          onEdit={(talk) => {
            setSelectedPhotoTalk(talk);
            setIsDeleting(false);
            if (isAdmin) {
              setEditingPhotoTalk(talk);
              openEditor();
            }
          }}
          onDelete={handleDeleteClick}
        />
      )}

      {!isAdmin && (
        <PasswordConfirmModal
          isOpen={!!selectedPhotoTalk}
          onClose={() => setSelectedPhotoTalk(null)}
          onConfirm={confirmPassword}
          actionType={isDeleting ? 'delete' : 'edit'}
        />
      )}

      {isAdmin && isDeleteConfirmOpen && (
        <div
          onClick={() => setDeleteConfirmOpen(false)}
          className="result-layout fixed inset-0 z-50 bg-black bg-opacity-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-md p-6 w-3/4"
          >
            <div className="flex flex-col gap-5 mb-7">
              <p className="text-lg font-semibold text-gray-900">
                삭제하시겠습니까?
              </p>
              <p className="text-sm text-gray-600">
                이 작업은 되돌릴 수 없습니다.
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md"
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {isOpen && <PhotoTalkEditor />}
    </div>
  );
};

export default PhotoTalkList;
