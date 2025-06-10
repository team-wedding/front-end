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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isEditorOpen, setEditorOpen] = useState(false);
  const { userId } = useParams();

  const { setPhotoTalkList } = usePhotoTalkStore();

  const {
    items: data,
    isLoading,
    observeRef,
    isFetchingNextPage,
    refetch,
    fetchUntilFull,
  } = useInfinitePhototalkByQuery<PhotoTalkResponse, PhotoTalk>({
    queryFn: (page) => getGuestPhototalks(userId!, page, 10),
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

  useEffect(() => {
    if (isGalleryOpen) {
      fetchUntilFull();
    }
  }, []);

  return (
    <PhotoTalkLayout title="포토톡">
      <section
        aria-label="게스트 포토톡 리스트"
        className="px-4 bg-gradient-to-br from-[#DEE8FF] via-[#EFE1F4] to-[#FFDBE9] rounded-t-[40px] border-t min-h-screen pb-28 pt-2"
      >
        <PhotoTalkListGuest
          photoTalkList={data || []}
          isLoading={isLoading}
          onOpenEditor={() => setEditorOpen(true)}
          observeRef={observeRef}
          isFetchingNextPage={isFetchingNextPage}
          refetch={refetch}
          isGalleryOpen={isGalleryOpen}
          onToggleGallery={() => setIsGalleryOpen((prev) => !prev)}
        />
      </section>

      <section aria-label="포토톡 작성">
        <PhotoTalkEditor
          isEditorOpen={isEditorOpen}
          closeEditor={() => setEditorOpen(false)}
          refetch={refetch}
        />
      </section>
    </PhotoTalkLayout>
  );
};

export default GuestPhotoTalkPage;
