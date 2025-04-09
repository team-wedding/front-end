import PhotoTalkCard from '@/components/common/PhotoTalk/PhotoTalkCard';
import PhotoTalkEditor from '@/components/common/PhotoTalk/PhotoTalkEditor';
import PhotoTalkGallery from '@/components/common/PhotoTalk/PhotoTalkGallery';
import PhotoTalkLayout from '@/components/layout/PhotoTalkLayout';
import { phototalkData } from '@/constants/phototalkData';
import { useState } from 'react';

const PreviewPhotoTalkPage = () => {
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [isGalleryOpen, setGalleryOpen] = useState(false);

  const handleToggleEditor = () => setEditorOpen(true);
  const handleToggleGallery = () => setGalleryOpen((prev) => !prev);

  return (
    <PhotoTalkLayout title="포토톡 예시입니다" titleStyle="animate-pulse">
      <section
        className="px-3 bg-gradient-to-br from-[#DEE8FF] via-[#EFE1F4] to-[#FFDBE9] rounded-t-[40px] border-t min-h-screen pb-20"
        aria-label="포토톡 리스트 섹션"
      >
        <div className="flex-between p-2">
          <button
            onClick={handleToggleEditor}
            aria-label="작성하기 버튼"
            className="px-4 py-2 bg-black/90 shadow-md border border-black/10 rounded-full text-xs text-white hover:bg-black/70"
          >
            작성하기
          </button>
          <button
            onClick={handleToggleGallery}
            aria-label="갤러리 버튼"
            className={`px-4 py-2 ml-auto text-xs font-medium rounded-full border border-black/10 trasition-all duration-200 ease-in-out ${isGalleryOpen ? `shadow-inner bg-black text-white` : `bg-transparent text-black/60 shadow-sm`}`}
          >
            갤러리
          </button>
        </div>

        {isGalleryOpen ? (
          <PhotoTalkGallery isPreview={true} />
        ) : (
          phototalkData.map((photoTalk) => (
            <PhotoTalkCard key={photoTalk.id} photoTalk={photoTalk} />
          ))
        )}
      </section>

      <section aria-label="포토톡 메시지 작성하기">
        <PhotoTalkEditor
          isOpen={isEditorOpen}
          closeEditor={() => setEditorOpen(false)}
        />
      </section>
    </PhotoTalkLayout>
  );
};

export default PreviewPhotoTalkPage;
