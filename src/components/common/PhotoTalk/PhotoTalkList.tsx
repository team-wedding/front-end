import { useState } from 'react';
import usePhotoTalkStore from '@store/usePhotoTalkStore';
import PhotoTalkCard from '@/components/common/PhotoTalk/PhotoTalkCard';
// import PasswordConfirmModal from '@/components/display/PhotoTalkSection/PasswordConfirmModal';
// import PhotoTalkEditor from '@/pages/PhotoTalk/PhotoTalkEditor';
import { useDeletePhototalk, useGetPhototalks } from '@/hooks/usePhototalk';
import PhotoTalkGallery from '@/components/common/PhotoTalk/PhotoTalkGallery';
import PasswordConfirmModal from '@/components/common/PhotoTalk/PasswordConfirmModal';
// import PhotoTalkEditor from '@/components/common/PhotoTalk/PhotoTalkEditor';
import { PhotoTalk } from '@/types/phototalkType';

interface PhotoTalkListProps {
  isAdmin: boolean;
  onOpenEditor?: () => void;
}

interface PhotoTalkResponse {
  allCelebrationMsgs: PhotoTalk[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

const PhotoTalkList = ({ isAdmin, onOpenEditor }: PhotoTalkListProps) => {
  const { setEditingPhotoTalk } = usePhotoTalkStore();

  // 포토톡 전체 조회
  const { data } = useGetPhototalks(1, 10) as {
    data: PhotoTalkResponse | undefined;
  };
  const deletePhototalk = useDeletePhototalk();

  const photoTalkList = Array.isArray(data?.allCelebrationMsgs)
    ? data.allCelebrationMsgs
    : [];

  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  // const [isDeleting, setIsDeleting] = useState(false);
  // const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  // 선택한 포토톡 및 모드 관리
  const [selectedPhotoTalk, setSelectedPhotoTalk] = useState<{
    data: PhotoTalk | null;
    mode: 'edit' | 'delete' | null;
  }>({ data: null, mode: null });

  const confirmPassword = () => {
    if (!selectedPhotoTalk?.data || !selectedPhotoTalk.mode) return;

    // 비밀번호 검증
    if (!isAdmin && selectedPhotoTalk.data.password !== passwordInput) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 편집 모드
    if (selectedPhotoTalk.mode === 'edit') {
      setEditingPhotoTalk(selectedPhotoTalk.data);
      if (onOpenEditor) onOpenEditor();
    } else if (selectedPhotoTalk.mode === 'delete') {
      if (!selectedPhotoTalk.data.id) return; // id가 없으면 실행 방지
      deletePhototalk.mutate(
        {
          id: selectedPhotoTalk.data.id,
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

    setPasswordModalOpen(false);
    setPasswordInput('');
    setSelectedPhotoTalk({ data: null, mode: null });
  };

  // const handleDeleteClick = (talk: PhotoTalk) => {
  //   setSelectedPhotoTalk();
  //   setIsDeleting(true);
  //   if (isAdmin) {
  //     setDeleteConfirmOpen(true);
  //   }
  // };

  // const confirmDelete = () => {
  //   if (selectedPhotoTalk?.data) {
  //     adminDeletePhotoTalk(selectedPhotoTalk?.data.id);
  //   }
  //   setSelectedPhotoTalk({ data: null, mode: 'delete' });
  //   setDeleteConfirmOpen(false);
  // };

  return (
    <div className="w-full">
      <div className="flex justify-end mx-8">
        <button
          onClick={() => setGalleryOpen(!isGalleryOpen)}
          className="select-btn"
        >
          {isGalleryOpen ? '목록 보기' : '갤러리 보기'}
        </button>
      </div>

      {isGalleryOpen ? (
        <PhotoTalkGallery isAdmin={isAdmin} />
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

      {!isAdmin && (
        <PasswordConfirmModal
          isOpen={isPasswordModalOpen}
          onClose={() => {
            setPasswordModalOpen(false);
            setSelectedPhotoTalk({ data: null, mode: null });
            setPasswordInput('');
          }}
          onConfirm={confirmPassword}
          passwordInput={passwordInput}
          setPasswordInput={setPasswordInput}
          isEditMode={selectedPhotoTalk.mode === 'edit'}
        />
      )}

      {/* {isAdmin && isDeleteConfirmOpen && (
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
                onClick={() => {
                  console.log('삭제');
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* 
      <PhotoTalkEditor
        isOpen={isEditorOpen}
        closeEditor={() => setEditorOpen(false)}
      /> */}
    </div>
  );
};

export default PhotoTalkList;
