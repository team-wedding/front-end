import {
  deletePhototalkByAdmin,
  deletePhototalkByGuest,
  getGuestPhototalks,
  getPhototalk,
  getPhototalks,
  postPhototalk,
  updatePhototalk,
} from '@/services/phototalkService';
import { PhotoTalk } from '@/types/phototalkType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

interface useInfinitePhototalkByQueryProps<T, ItemType> {
  queryFn: (page: number) => Promise<T>; // 실제 요청 함수
  extractItems: (response: T) => ItemType[]; /// 실제로 보여줄 데이터 배열만 추출
  getHasMore: (response: T) => boolean; // 다음 페이지가 존재하는지 여부
  initialPage?: number; // 처음 시작 페이지 번호
  enabled?: boolean; // 무한스크롤 활성화 여부
}

// 포토톡 무한스크롤
export const useInfinitePhototalkByQuery = <T, ItemType>({
  queryFn,
  extractItems,
  getHasMore,
  initialPage = 1,
  enabled = true,
}: useInfinitePhototalkByQueryProps<T, ItemType>) => {
  const [page, setPage] = useState(initialPage); // 현재 몇 번째 페이지
  const [items, setItems] = useState<ItemType[]>([]); // 현재까지 로딩된 모든 포토톡 데이터
  // const [isLoading, setIsLoading] = useState(false); // 중복 요청 방지
  const [hasMore, setHasMore] = useState(true); // 다음 페이지가 있는지 여부
  const [isFetching, setIsFetching] = useState(false);
  const observeRef = useRef<HTMLDivElement | null>(null); // 무한스크롤 감지 대상

  const isInitialLoading = page === 1 && isFetching;
  const isFetchingNextPage = page > 1 && isFetching;

  // 다음 페이지 요청 함수
  const loadMore = useCallback(async () => {
    if (!enabled || !hasMore || isFetching) return;
    setIsFetching(true);

    try {
      const res = await queryFn(page); // 페이지 api 호출

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setItems((prev) => [...prev, ...extractItems(res)]); // 기존 + 새 데이터 누적
      setHasMore(getHasMore(res)); // 더 불러올 수 있는지
      setPage((prev) => prev + 1); // 다음 페이지로 증가
    } catch (error) {
      throw new Error(`포토톡 다음페이지 불러오기 실패 :${error}`);
    } finally {
      setIsFetching(false);
    }
  }, [enabled, hasMore, isFetching, page, queryFn, extractItems, getHasMore]);

  // IntersectionObserver가 호출할 함수
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        console.log('감지됨');
        loadMore();
      }
    },
    [loadMore],
  );

  // IntersectionObserver 등록
  useEffect(() => {
    const currentRef = observeRef.current;
    if (!enabled || !currentRef) return;

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2,
    });

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [observerCallback, enabled]);

  return {
    items,
    isLoading: isInitialLoading,
    isFetchingNextPage,
    hasMore,
    observeRef,
  };
};

// 포토톡 전체 조회
export const useGetPhototalks = (page: number, size: number) => {
  return useQuery({
    queryKey: ['phototalks', page, size],
    queryFn: () => getPhototalks(page, size),
  });
};

// 포토톡 하객용 전체 조회 (비회원)
export const useGetGuestPhototalks = (
  userId: string,
  page: number,
  size: number,
  enabled = true,
) => {
  return useQuery({
    queryKey: ['phototalks', userId, page, size],
    queryFn: () => getGuestPhototalks(userId, page, size),
    enabled,
  });
};

// 포토톡 개별 조회
export const useGetPhototalk = (id: number) => {
  return useQuery<PhotoTalk, Error>({
    queryKey: ['phototalks', id],
    queryFn: () => getPhototalk(id),
    enabled: !!id,
  });
};

// 포토톡 생성
export const useCreatePhototalk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPhototalk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phototalks'] });
    },
  });
};

// 포토톡 수정
export const useUpdatePhototalk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      photoTalkData,
    }: {
      id: number;
      photoTalkData: PhotoTalk;
    }) => updatePhototalk(id, { ...photoTalkData }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['phototalks', id] });
    },
  });
};

// 포토톡 삭제
export const useDeletePhototalkByGuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      name,
      password,
    }: {
      id: number;
      name: string;
      password: string;
    }) => {
      return deletePhototalkByGuest({ id, name, password });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phototalks'] });
    },
  });
};

export const useDeletePhototalkByAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePhototalkByAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phototalks'] });
    },
  });
};
