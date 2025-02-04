import {
  deletePhototalk,
  getPhototalk,
  getPhototalks,
  postPhototalk,
  updatePhototalk,
} from '@/services/phototalk';
import { PhotoTalk } from '@/types/phototalkType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 포토톡 전체 조회
export const useGetPhototalks = (page: number, size: number) => {
  return useQuery({
    queryKey: ['phototalks'],
    queryFn: () => getPhototalks(page, size),
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
      queryClient.invalidateQueries({ queryKey: ['phototalks'] });
      queryClient.invalidateQueries({ queryKey: ['phototalk', id] });
    },
  });
};

// 포토톡 삭제
export const useDeletePhototalk = () => {
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
      return deletePhototalk({ id, name, password });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phototalks'] });
    },
  });
};
