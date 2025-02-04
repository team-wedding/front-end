import { useMemo, useState } from 'react';
import { Notice } from './NoticeItem';
import TrashBinIcon from '@icons/TrashBinIcon';
import ReusableModal from '@/components/common/Modal/ReusableModal';
import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import ImageUploader from '@/components/common/ImageUploader';
import useNoticeStore from '@/store/OptionalFeature/useNoticeFeatureStore';

const NoticeFeature = () => {
  const {
    notices,
    expandedIds,
    maxNotices,
    addNotice,
    deleteNotice,
    updateNotice,
    toggleExpand,
  } = useNoticeStore();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedNoticeId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedNoticeId !== null) {
      deleteNotice(selectedNoticeId);
    }
    setIsDeleteModalOpen(false);
    setSelectedNoticeId(null);
  };

  const handleImageUpload = (id: number, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          updateNotice(id, 'image', reader.result);
        }
      };
      reader.onerror = () => {
        console.error('이미지를 읽는 중 오류가 발생했습니다.');
      };
      reader.readAsDataURL(file);
    }
  };

  const accordionItems = useMemo(
    () =>
      notices.map((notice, index) => ({
        noticeId: notice.noticeId,
        title: (
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(notice.noticeId);
              }}
            >
              <TrashBinIcon />
            </button>
            <span>{notice.title || `공지 ${index + 1}`}</span>
          </div>
        ),
        content: (
          <div className="m-3 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label className="label w-full">제목</label>
              <input
                type="text"
                placeholder="제목을 입력해주세요"
                value={notice.title}
                onChange={(e) =>
                  updateNotice(notice.noticeId, 'title', e.target.value)
                }
                className="formInput w-full"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="label w-full">내용</label>
              <textarea
                placeholder="내용을 입력해주세요"
                value={notice.content}
                onChange={(e) =>
                  updateNotice(notice.noticeId, 'content', e.target.value)
                }
                rows={4}
                className="formInput w-full"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="label w-full">이미지 업로드</label>
              <div key={notice.noticeId} className="relative">
                <ImageUploader
                  // initialImage={notice.image}
                  // onImageUpload={(img) => updateNotice(notice.noticeId, 'image', img)}
                  ImageUrl={notice.image}
                  ImageFile={null}
                  setImageFile={(file) => updateNotice(notice.noticeId, 'imgFile', file)}
                  setImageUrl={(url) => updateNotice(notice.noticeId, 'image', url)}
                />
              </div>
            </div>
          </div>
        ),
      })),
    [notices, updateNotice, deleteNotice],
  );

  return (
    <div className="mx-4 my-6 text-xs">
      <InformationItem messages={['공지는 최대 5개까지 입력할 수 있습니다.']} />

      <hr />

      <Notice
        items={accordionItems}
        expandedIds={expandedIds}
        toggleExpand={toggleExpand}
      />

      {notices.length < maxNotices && (
        <button
          onClick={addNotice}
          className="w-full p-3 border rounded-2xl text-gray-500 hover:bg-button hover:bg-opacity-20 hover:shadow-md hover:border-transparent"
        >
          + 공지 추가 ({notices.length}/{maxNotices})
        </button>
      )}
      <ReusableModal
        isOpen={isDeleteModalOpen}
        title="이 공지를 삭제하시겠습니까?"
        confirmText="확인"
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default NoticeFeature;
