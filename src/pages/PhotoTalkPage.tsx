import { useState } from 'react';
import usePhotoTalkStore, { PhotoTalk } from '@store/usePhotoTalkStore';
import PhotoTalkEditor from '@components/display/PhotoTalkSection/PhotoTalkEditor';
import PhotoTalkCard from '@components/display/PhotoTalkSection/PhotoTalkCard';
import PhotoTalkGallery from '@components/display/PhotoTalkSection/PhotoTalkGallery';
import ImageIcon from '@icons/ImageIcon';
import PasswordConfirmModal from '@components/display/PhotoTalkSection/PasswordConfirmModal';

const PhotoTalkPage = () => {
  const { openEditor, setEditingPhotoTalk, deletePhotoTalk } =
    usePhotoTalkStore();
  const [selectedPhotoTalk, setSelectedPhotoTalk] = useState<PhotoTalk | null>(
    null,
  );
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmPassword = (passwordInput: string) => {
    if (!selectedPhotoTalk) return;

    if (selectedPhotoTalk.password === passwordInput) {
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
    <div className="result-layout w-full">
      <div className="column-center w-full">
        <div className="sub-title">PHOTO TALK</div>
        <div className="title">포토톡</div>
        <button onClick={openEditor} className="select-btn">
          작성하기
        </button>
      </div>
      <div>
        <button
          onClick={() => setGalleryOpen(!isGalleryOpen)}
          className="w-full flex justify-end px-8"
        >
          {isGalleryOpen ? (
            <div className="select-btn bg-button bg-opacity-10">
              <ImageIcon />
            </div>
          ) : (
            <div className="select-btn">
              <ImageIcon />
            </div>
          )}
        </button>
        {isGalleryOpen ? (
          <div className="w-full p-4">
            <h2 className="text-lg font-semibold mb-4">이미지 갤러리</h2>
            <PhotoTalkGallery />
          </div>
        ) : (
          <PhotoTalkCard
            onEdit={(talk) => {
              setSelectedPhotoTalk(talk);
              setIsDeleting(false);
            }}
            onDelete={(talk) => {
              setSelectedPhotoTalk(talk);
              setIsDeleting(true);
            }}
          />
        )}
      </div>
      <PhotoTalkEditor />

      <PasswordConfirmModal
        isOpen={!!selectedPhotoTalk}
        onClose={() => setSelectedPhotoTalk(null)}
        onConfirm={confirmPassword}
        actionType={isDeleting ? 'delete' : 'edit'}
      />
    </div>
  );
};

export default PhotoTalkPage;
