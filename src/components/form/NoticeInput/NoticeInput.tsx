import React, { useMemo } from 'react';
import useNoticeStore from '../../../store/useNoticeStore';
import TrashBinIcon from '../../icons/TrashBinIcon';
import { Notice } from './NoticeItem';

const NoticeInput: React.FC = () => {
  const {
    notices,
    expandedIds,
    maxNotices,
    addNotice,
    deleteNotice,
    updateNotice,
    toggleExpand,
  } = useNoticeStore();

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
            <span className="text-xs font-bold">
              {notice.title || `공지 ${index + 1}`}
            </span>
          </div>
        ),
        content: (
          <div className="m-2 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
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

            <div className="flex flex-col gap-2">
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

            <div className="flex flex-col gap-2">
              <label className="label w-full">이미지 업로드</label>
              {notice.image ? (
                <div className="mb-2">
                  <img
                    src={notice.image}
                    alt="Uploaded"
                    className="w-32 h-32 object-cover mb-2 border rounded-md"
                  />
                  <button
                    onClick={() => updateNotice(notice.id, 'image', null)}
                    className="text-sm text-red-500"
                  >
                    x
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(notice.id, e.target.files?.[0] || null)
                  }
                  className="block w-full text-sm border rounded-md px-3 py-2"
                />
              )}
            </div>
          </div>
        ),
      })),
    [notices, updateNotice, deleteNotice],
  );

  return (
    <div>
      <div className="max-w-lg mx-auto p-4 text-[10px] text-gray-500">
        <div className="flex items-start gap-1 mb-1">
          <span className="text-gray-600">ⓘ</span>
          <span>공지는 최대 5개까지 입력할 수 있습니다.</span>
        </div>
      </div>

      <Notice
        items={accordionItems}
        expandedIds={expandedIds}
        toggleExpand={toggleExpand}
      />

      {notices.length < maxNotices && (
        <button
          onClick={addNotice}
          className="w-full p-2 mt-4 border rounded-md text-sm hover:bg-rose-200"
        >
          + 공지 추가 ({notices.length}/{maxNotices})
        </button>
      )}
    </div>
  );
};

export default NoticeInput;
