import PhotoTalkEditor from '@/components/common/PhotoTalk/Editor/PhotoTalkEditor';
import PhotoTalkListGuest from '@/components/common/PhotoTalk/List/PhotoTalkListGuest';
import PhotoTalkLayout from '@/components/layout/PhotoTalkLayout';
import { useGetGuestPhototalks } from '@/hooks/usePhototalk';
import usePhotoTalkStore from '@/store/usePhotoTalkStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const GuestPhotoTalkPage = () => {
  const { setPhotoTalkList } = usePhotoTalkStore();
  const [isEditorOpen, setEditorOpen] = useState(false);
  const { id: userId } = useParams();

  const isPublicApiReady = false; // 백엔드 api 만들어지면 수정
  const { data, isLoading } = useGetGuestPhototalks(
    userId || '',
    1,
    20,
    !!userId && isPublicApiReady,
  );

  useEffect(() => {
    if (data) {
      setPhotoTalkList(data.allCelebrationMsgs);
    }
  }, [data]);

  return (
    <PhotoTalkLayout title="포토톡">
      <section
        aria-label="게스트 포토톡 리스트"
        className="px-3 bg-gradient-to-br from-[#DEE8FF] via-[#EFE1F4] to-[#FFDBE9] rounded-t-[40px] border-t min-h-screen pb-28"
      >
        <PhotoTalkListGuest
          photoTalkList={data?.allCelebrationMsgs || []}
          isLoading={isLoading}
          onOpenEditor={() => setEditorOpen(true)}
        />
      </section>

      <section aria-label="포토톡 작성">
        <PhotoTalkEditor
          isEditorOpen={isEditorOpen}
          closeEditor={() => setEditorOpen(false)}
        />
      </section>
    </PhotoTalkLayout>
  );
};

export default GuestPhotoTalkPage;
