import PhotoTalkEditor from '@/components/common/PhotoTalk/Editor/PhotoTalkEditor';
import PhotoTalkListPreview from '@/components/common/PhotoTalk/List/PhotoTalkListPreview';
import PhotoTalkLayout from '@/components/layout/PhotoTalkLayout';
import { phototalkData } from '@/constants/phototalkData';
import { useState } from 'react';

const PreviewPhotoTalkPage = () => {
  const [isEditorOpen, setEditorOpen] = useState(false);

  return (
    <PhotoTalkLayout title="포토톡 예시입니다" titleStyle="animate-pulse">
      <section
        aria-label="포토톡 예시 리스트"
        className="px-3 bg-gradient-to-br from-[#DEE8FF] via-[#EFE1F4] to-[#FFDBE9] rounded-t-[40px] border-t min-h-screen pb-20"
      >
        <PhotoTalkListPreview
          photoTalkList={phototalkData}
          onOpenEditor={() => {
            setEditorOpen(true);
          }}
        />
      </section>

      <section aria-label="포토톡 메시지 작성하기">
        <PhotoTalkEditor
          isEditorOpen={isEditorOpen}
          closeEditor={() => setEditorOpen(false)}
        />
      </section>
    </PhotoTalkLayout>
  );
};

export default PreviewPhotoTalkPage;
