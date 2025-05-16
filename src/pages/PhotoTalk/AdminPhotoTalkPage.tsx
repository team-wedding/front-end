import PhotoTalkListAdmin from '@/components/common/PhotoTalk/List/PhotoTalkListAdmin';
import { useInfinitePhototalkByQuery } from '@/hooks/usePhototalk';
import { getPhototalks } from '@/services/phototalkService';
import usePhotoTalkStore from '@/store/usePhotoTalkStore';
import { PhotoTalk, PhotoTalkResponse } from '@/types/phototalkType';
import { useEffect } from 'react';

const AdminPhotoTalkPage = () => {
  const {
    items: data,
    isLoading,
    observeRef,
    isFetchingNextPage,
  } = useInfinitePhototalkByQuery<PhotoTalkResponse, PhotoTalk>({
    queryFn: (page) => getPhototalks(page, 6),
    extractItems: (res) => res.allCelebrationMsgs,
    getHasMore: (res) => res.currentPage < res.totalPages,
  });
  const { setPhotoTalkList } = usePhotoTalkStore();

  useEffect(() => {
    if (data.length > 0) {
      setPhotoTalkList(data);
    }
  }, [data, setPhotoTalkList]);

  return (
    <main className="min-h-screen" aria-label="관리자 포토톡 리스트">
      <PhotoTalkListAdmin
        photoTalkList={data || []}
        isLoading={isLoading}
        observeRef={observeRef}
        isFetchingNextPage={isFetchingNextPage}
      />
    </main>
  );
};

export default AdminPhotoTalkPage;
