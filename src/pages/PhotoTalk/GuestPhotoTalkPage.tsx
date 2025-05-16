import PhotoTalkEditor from '@/components/common/PhotoTalk/Editor/PhotoTalkEditor';
import PhotoTalkListGuest from '@/components/common/PhotoTalk/List/PhotoTalkListGuest';
import PhotoTalkLayout from '@/components/layout/PhotoTalkLayout';
import { useInfinitePhototalkByQuery } from '@/hooks/usePhototalk';
import { getGuestPhototalks } from '@/services/phototalkService';
import usePhotoTalkStore from '@/store/usePhotoTalkStore';
import { PhotoTalk, PhotoTalkResponse } from '@/types/phototalkType';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const GuestPhotoTalkPage = () => {
  const { setPhotoTalkList } = usePhotoTalkStore();
  const [isEditorOpen, setEditorOpen] = useState(false);
  const { userId } = useParams();

  const {
    items: data,
    isLoading,
    observeRef,
    isFetchingNextPage,
  } = useInfinitePhototalkByQuery<PhotoTalkResponse, PhotoTalk>({
    queryFn: (page) => getGuestPhototalks(userId!, page, 6),
    extractItems: (res) => res.allCelebrationMsgs,
    getHasMore: (res) => res.currentPage < res.totalPages,
  });

  // useEffect(() => {
  //   if (data) {
  //     console.log('받아온 포토톡 데이터:', data.allCelebrationMsgs);
  //     setPhotoTalkList(data.allCelebrationMsgs);
  //   }
  // }, [data]);

  useEffect(() => {
    if (data.length > 0) {
      setPhotoTalkList(data);
    }
  }, [data, setPhotoTalkList]);

  return (
    <PhotoTalkLayout title="포토톡">
      <section
        aria-label="게스트 포토톡 리스트"
        className="px-3 bg-gradient-to-br from-[#DEE8FF] via-[#EFE1F4] to-[#FFDBE9] rounded-t-[40px] border-t min-h-screen pb-28"
      >
        <PhotoTalkListGuest
          photoTalkList={data || []}
          isLoading={isLoading}
          onOpenEditor={() => setEditorOpen(true)}
          observeRef={observeRef}
          isFetchingNextPage={isFetchingNextPage}
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
