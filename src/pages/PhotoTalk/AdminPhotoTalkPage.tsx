import PhotoTalkListAdmin from '@/components/phototalk/List/PhotoTalkListAdmin';
import { useInfinitePhototalkByQuery } from '@/hooks/usePhototalk';
import { getPhototalks } from '@/services/phototalkService';
import usePhotoTalkStore from '@/store/usePhotoTalkStore';
import { PhotoTalk, PhotoTalkResponse } from '@/types/phototalkType';
import { useEffect, useState } from 'react';

const AdminPhotoTalkPage = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const {
    items: data,
    isLoading,
    observeRef,
    isFetchingNextPage,
    refetch,
    fetchUntilFull,
  } = useInfinitePhototalkByQuery<PhotoTalkResponse, PhotoTalk>({
    queryFn: (page) => getPhototalks(page, 10),
    extractItems: (res) => res.allCelebrationMsgs,
    getHasMore: (res) => res.currentPage < res.totalPages,
  });

  const { setPhotoTalkList } = usePhotoTalkStore();

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
    <main className="min-h-screen" aria-label="관리자 포토톡 리스트">
      <PhotoTalkListAdmin
        photoTalkList={data || []}
        isLoading={isLoading}
        observeRef={observeRef}
        isFetchingNextPage={isFetchingNextPage}
        refetch={refetch}
        isGalleryOpen={isGalleryOpen}
        onToggleGallery={() => setIsGalleryOpen((prev) => !prev)}
      />
    </main>
  );
};

export default AdminPhotoTalkPage;
