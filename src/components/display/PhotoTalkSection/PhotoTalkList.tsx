import { useState } from 'react';
import usePhotoTalkStore, { PhotoTalk } from '@store/usePhotoTalkStore';
import PhotoTalkCard from '@components/display/PhotoTalkSection/PhotoTalkCard';
import PhotoTalkGallery from '@components/display/PhotoTalkSection/PhotoTalkGallery';
import PasswordConfirmModal from '@components/display/PhotoTalkSection/PasswordConfirmModal';
import PhotoTalkEditor from '@components/display/PhotoTalkSection/PhotoTalkEditor';

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

  return (
    <div className="w-full">
      <button
        onClick={() => setGalleryOpen(!isGalleryOpen)}
        className="w-full flex justify-end px-8"
      >
        <div className="select-btn">
          {isGalleryOpen ? '목록 보기' : '갤러리 보기'}
        </div>
      </button>

      {isGalleryOpen ? (
        <PhotoTalkGallery />
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
          onDelete={(talk) => {
            setSelectedPhotoTalk(talk);
            setIsDeleting(true);
            if (isAdmin) {
              deletePhotoTalk(talk.id);
              setSelectedPhotoTalk(null);
            }
          }}
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

      {isOpen && <PhotoTalkEditor />}
    </div>
  );
};

export default PhotoTalkList;
