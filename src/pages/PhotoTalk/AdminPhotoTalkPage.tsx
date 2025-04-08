import PhotoTalkListAdmin from '@/components/common/PhotoTalk/List/PhotoTalkListAdmin';
import { useGetPhototalks } from '@/hooks/usePhototalk';
import usePhotoTalkStore from '@/store/usePhotoTalkStore';
import { useEffect } from 'react';

const AdminPhotoTalkPage = () => {
  const { data, isLoading } = useGetPhototalks(1, 20);
  const { setPhotoTalkList } = usePhotoTalkStore();

  useEffect(() => {
    if (data) {
      setPhotoTalkList(data.allCelebrationMsgs);
    }
  }, [data]);

  return (
    <main className="min-h-screen" aria-label="관리자 포토톡 리스트">
      <PhotoTalkListAdmin
        photoTalkList={data?.allCelebrationMsgs || []}
        isLoading={isLoading}
      />
    </main>
  );
};

export default AdminPhotoTalkPage;
