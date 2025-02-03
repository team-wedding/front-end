import { useState } from 'react';
import usePhotoTalkStore, { PhotoTalk } from '@store/usePhotoTalkStore';
import PhotoTalkEditor from './PhotoTalkEditor';
import PhotoTalkCard from './PhotoTalkCard';
import PhotoTalkGallery from './PhotoTalkGallery';
import ImageIcon from '@icons/ImageIcon';
import PasswordConfirmModal from './PasswordConfirmModal';
import { useDeletePhototalk, useGetPhototalks } from '@/hooks/usePhototalk';

interface PhotoTalkResponse {
  allCelebrationMsgs: PhotoTalk[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

const PhotoTalkSection = () => {
  const { setEditingPhotoTalk } = usePhotoTalkStore();
  const deletePhototalk = useDeletePhototalk();

  // 포토톡 전체 조회
  const { data } = useGetPhototalks(1, 10) as {
    data: PhotoTalkResponse | undefined;
  };

  const photoTalkList = Array.isArray(data?.allCelebrationMsgs)
    ? data.allCelebrationMsgs
    : [];

  const [isEditorOpen, setEditorOpen] = useState(false);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  // 선택한 포토톡 및 모드 관리
  const [selectedPhotoTalk, setSelectedPhotoTalk] = useState<{
    data: PhotoTalk | null;
    mode: 'edit' | 'delete';
  }>({ data: null, mode: 'edit' });

  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  const confirmPassword = () => {
    if (selectedPhotoTalk.data?.password === passwordInput) {
      if (selectedPhotoTalk.mode === 'edit') {
        setEditingPhotoTalk(selectedPhotoTalk.data); // 편집 모드 활성화
        setEditorOpen(true);
      } else {
        deletePhototalk.mutate(
          {
            id: selectedPhotoTalk.data.id!,
            name: selectedPhotoTalk.data.name,
            password: passwordInput,
          },
          {
            onSuccess: () => {
              console.log('삭제 완료');
            },
          },
        );
      }
      setSelectedPhotoTalk({ data: null, mode: 'edit' });
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }

    setPasswordModalOpen(false);
    setPasswordInput('');
  };

  return (
    <div className="w-96">
      <div className="column-center w-full">
        <div className="sub-title">PHOTO TALK</div>
        <div className="title">포토톡</div>
        <button onClick={() => setEditorOpen(true)} className="select-btn">
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
        ) : photoTalkList.length > 0 ? (
          photoTalkList.map((photoTalk) => (
            <PhotoTalkCard
              key={photoTalk.id}
              photoTalk={photoTalk}
              onEdit={() => {
                setSelectedPhotoTalk({ data: photoTalk, mode: 'edit' });
                setPasswordModalOpen(true);
              }}
              onDelete={() => {
                setSelectedPhotoTalk({ data: photoTalk, mode: 'delete' });
                setPasswordModalOpen(true);
              }}
            />
          ))
        ) : (
          <div className="flex-center m-10">등록된 포토톡이 없습니다.</div>
        )}
      </div>

      <PhotoTalkEditor
        isOpen={isEditorOpen}
        closeEditor={() => setEditorOpen(false)}
      />

      <PasswordConfirmModal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setPasswordModalOpen(false);
          setSelectedPhotoTalk({ data: null, mode: 'edit' });
          setPasswordInput('');
        }}
        onConfirm={confirmPassword}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        isEditMode={selectedPhotoTalk.mode === 'edit'}
      />
    </div>
  );
};

export default PhotoTalkSection;
