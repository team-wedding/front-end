import PhotoTalkEditor from '@/components/phototalk/Editor/PhotoTalkEditor';
import PhotoTalkListPreview from '@/components/phototalk/List/PhotoTalkListPreview';
import PhotoTalkLayout from '@/components/layout/PhotoTalkLayout';
import { phototalkData } from '@/constants/phototalkData';
import { USER_MODE } from '@/types/users';
import { useState } from 'react';

const PreviewPhotoTalkPage = () => {
  const [isEditorOpen, setEditorOpen] = useState(false);

  return (
    <PhotoTalkLayout title="포토톡 예시입니다" titleStyle="animate-pulse">
      <section
        aria-label="포토톡 예시 리스트"
        className="px-4 pt-2 bg-gradient-to-br from-[#DEE8FF]  via-[#EFE1F4] to-secondary-muted dark:from-primary-muted-dark dark:to-secondary-muted-dark rounded-t-[40px] border-t dark:border-border-dark min-h-screen pb-20"
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
          userMode={USER_MODE.PREVIEW}
          isEditorOpen={isEditorOpen}
          closeEditor={() => setEditorOpen(false)}
        />
      </section>
    </PhotoTalkLayout>
  );
};

export default PreviewPhotoTalkPage;
