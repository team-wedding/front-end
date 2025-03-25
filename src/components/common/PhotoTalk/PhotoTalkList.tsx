import { useEffect, useState } from 'react';
import usePhotoTalkStore from '@store/usePhotoTalkStore';
import PhotoTalkCard from '@/components/common/PhotoTalk/PhotoTalkCard';
// import PasswordConfirmModal from '@/components/display/PhotoTalkSection/PasswordConfirmModal';
// import PhotoTalkEditor from '@/pages/PhotoTalk/PhotoTalkEditor';
import { useDeletePhototalk, useGetPhototalks } from '@/hooks/usePhototalk';
import PhotoTalkGallery from '@/components/common/PhotoTalk/PhotoTalkGallery';
import PasswordConfirmModal from '@/components/common/PhotoTalk/PasswordConfirmModal';
// import PhotoTalkEditor from '@/components/common/PhotoTalk/PhotoTalkEditor';
import { PhotoTalk } from '@/types/phototalkType';
// import ListIcon from '@/components/icons/ListIcon';
// import ImageIcon from '@/components/icons/ImageIcon';
import PhotoTalkEditor from '@/components/common/PhotoTalk/PhotoTalkEditor';
import EditIcon from '@/components/icons/EditIcon';
import ReusableModal from '@/components/common/Modal/ReusableModal';

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
  const { setEditingPhotoTalk, setPhotoTalkList } = usePhotoTalkStore();

  // 포토톡 전체 조회
  const { data } = useGetPhototalks(1, 10) as {
    data: PhotoTalkResponse | undefined;
  };

  // 포토톡 삭제
  const { mutate: deletePhototalk } = useDeletePhototalk();

  useEffect(() => {
    if (data) {
      setPhotoTalkList(data.allCelebrationMsgs);
    }
  }, [data]);

  const photoTalkList = Array.isArray(data?.allCelebrationMsgs)
    ? data.allCelebrationMsgs
    : [];

  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // const [isDeleting, setIsDeleting] = useState(false);

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
      if (onOpenEditor) onOpenEditor();

      setEditingPhotoTalk(selectedPhotoTalk.data);
    } else if (selectedPhotoTalk.mode === 'delete') {
      if (!selectedPhotoTalk.data.id) return; // id가 없으면 실행 방지

      deletePhototalk(
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

  const handleEdit = (photoTalk: PhotoTalk) => {
    setSelectedPhotoTalk({ data: photoTalk, mode: 'edit' });
    setPasswordModalOpen(true);
  };

  const handleDelete = (photoTalk: PhotoTalk) => {
    setSelectedPhotoTalk({ data: photoTalk, mode: 'delete' });

    if (isAdmin) {
      setDeleteModalOpen(true);
    } else {
      setPasswordModalOpen(true);
    }
  };

  const handleAdminDelete = () => {
    if (!selectedPhotoTalk?.data || selectedPhotoTalk.data.id === undefined)
      return;

    deletePhototalk(
      {
        id: selectedPhotoTalk.data.id,
        name: selectedPhotoTalk.data.name,
        password: '',
        role: 'admin',
      },
      {
        onSuccess: () => {
          console.log('관리자 삭제 완료');
        },
      },
    );

    setDeleteModalOpen(false);
    setSelectedPhotoTalk({ data: null, mode: null });
  };

  if (isAdmin && photoTalkList.length === 0) {
    return (
      <>
        <div className="h-6"></div>
        <p className="text-center text-sm text-black/30 font-light bg-white/50 rounded-2xl p-16 w-[80%] m-auto">
          업로드된 포토톡이 없습니다.
        </p>
      </>
    );
  }

  return (
    <div className="w-full pb-20">
      <div className="flex-between p-2">
        {isAdmin ? (
          isGalleryOpen ? (
            <p className="text-xs text-[#494949] font-light">갤러리</p>
          ) : (
            <p className="text-xs text-[#494949] font-light">
              하객분들의 축하메시지와 사진을 볼 수 있습니다.
            </p>
          )
        ) : (
          <button
            onClick={() => setEditorOpen(true)}
            className="px-4 py-2 bg-black/90 shadow-sm rounded-full text-xs text-white hover:bg-black/80"
          >
            작성하기
          </button>
        )}
        <button
          onClick={() => setGalleryOpen(!isGalleryOpen)}
          // className={`select-btn ml-auto ${isGalleryOpen ? 'text-gray-800' : ''}`}
          className={`px-4 py-2 ml-auto text-xs font-light rounded-full bg-white shadow-sm hover:bg-opacity-50 active:bg-black/10`}
        >
          {/* {isGalleryOpen ? <ListIcon /> : <ImageIcon />} */}
          {isGalleryOpen ? '전체 보아보기' : '사진만 모아보기'}
        </button>
      </div>

      {isGalleryOpen ? (
        <PhotoTalkGallery isAdmin={isAdmin} />
      ) : photoTalkList.length > 0 ? (
        photoTalkList.map((photoTalk) => (
          <PhotoTalkCard
            key={photoTalk.id}
            photoTalk={photoTalk}
            onEdit={() => handleEdit(photoTalk)}
            onDelete={() => handleDelete(photoTalk)}
            isAdmin={isAdmin}
          />
        ))
      ) : (
        <div className="flex-center w-[80%] m-auto gap-2 bg-white/30 p-12 rounded-2xl mt-6">
          <EditIcon className="size-[20px] text-black/30" strokeWidth={1} />
          <p className="text-sm font-light text-black/30 text-center leading-6">
            첫 번째 포토톡을 작성하고
            <br /> 따뜻한 마음을 전해보세요
          </p>
        </div>
      )}

      {isAdmin ? (
        <ReusableModal
          isOpen={isDeleteModalOpen}
          title="정말 삭제하시겠습니까?"
          confirmText="삭제"
          onConfirm={() => handleAdminDelete()}
          onCancel={() => {
            setDeleteModalOpen(false);
            setSelectedPhotoTalk({ data: null, mode: null });
          }}
        />
      ) : (
        <PasswordConfirmModal
          isOpen={isPasswordModalOpen}
          onClose={() => {
            setPasswordModalOpen(false);
            setSelectedPhotoTalk({ data: null, mode: null });
            setPasswordInput('');
          }}
          onConfirm={() => confirmPassword()}
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

      <PhotoTalkEditor
        isOpen={isEditorOpen}
        closeEditor={() => setEditorOpen(false)}
      />
    </div>
  );
};

export default PhotoTalkList;
