import { useMemo } from 'react';
import useNoticeStore from '@store/useNoticeStore';
import { Notice } from './NoticeItem';
import TrashBinIcon from '@icons/TrashBinIcon';
import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import ImageUploader from '@/components/common/ImageUploader';

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

  const accordionItems = useMemo(
    () =>
      notices.map((notice, index) => ({
        id: notice.id,
        title: (
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('이 공지를 정말 삭제하시겠습니까?'))
                  deleteNotice(notice.id);
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
                  updateNotice(notice.id, 'title', e.target.value)
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
                  updateNotice(notice.id, 'content', e.target.value)
                }
                rows={4}
                className="formInput w-full"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="label w-full">이미지 업로드</label>
              <div key={notice.id} className="relative">
                <ImageUploader
                  uploadedImage={notice.image || ''}
                  setUploadedImage={(img) =>
                    updateNotice(notice.id, 'image', img)
                  }
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
    </div>
  );
};

export default NoticeFeature;
