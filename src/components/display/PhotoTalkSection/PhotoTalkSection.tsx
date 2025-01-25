import { useState } from 'react';
import usePhotoTalkStore, { PhotoTalk } from '../../../store/usePhotoTalkStore';
import PhotoTalkEditor from './PhotoTalkEditor';
import PhotoTalkCard from './PhotoTalkCard';
import PhotoTalkGallery from './PhotoTalkGallery';
import ImageIcon from '../../icons/ImageIcon';
import PasswordConfirmModal from './PasswordConfirmModal';

const PhotoTalkSection = () => {
  const { openEditor, setEditingPhotoTalk } = usePhotoTalkStore();
  const [selectedPhotoTalk, setSelectedPhotoTalk] = useState<null | PhotoTalk>(
    null,
  );
  const [isGalleryOpen, setGalleryOpen] = useState(false);

  const confirmPassword = (passwordInput: string) => {
    if (selectedPhotoTalk?.password === passwordInput) {
      setEditingPhotoTalk(selectedPhotoTalk);
      openEditor();
      setSelectedPhotoTalk(null);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="w-96">
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
          <PhotoTalkCard onEdit={setSelectedPhotoTalk} />
        )}
      </div>
      <PhotoTalkEditor />

      <PasswordConfirmModal
        isOpen={!!selectedPhotoTalk}
        onClose={() => setSelectedPhotoTalk(null)}
        onConfirm={confirmPassword}
      />
    </div>
  );
};

export default PhotoTalkSection;
