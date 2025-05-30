import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteInvitation,
  getInvitation,
  getInvitations,
  postInvitation,
  updateInvitation,
} from '../services/invitationService';
import { InvitationDetail } from '../types/invitationType';
import resetAllStores from '@/store/resetStore';
import { useNavigate } from 'react-router';

export const useGetInvitation = (id: number) => {
  let { data, isError } = useQuery<InvitationDetail>({
    queryKey: ['invitations', id],
    queryFn: () => getInvitation(id),
  });
  if (isError) {
    throw new Error(`청첩장 불러오기 실패`);
  }
  return { invitations: data, error: isError };
};

export const useGetInvitations = () => {
  return useQuery({
    queryKey: ['invitations'],
    queryFn: () => getInvitations(),
  });
};

export const usePostInvitation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (details: InvitationDetail) => {
      return postInvitation(details);
    },
    onSuccess: (data) => {
      const { id } = data;
      resetAllStores();
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
      navigate(`/create/${id}`);
    },
    onError: (error) => {
      throw new Error(`청첩장 생성 실패:${error}`);
    },
  });
};

export const useUpdateInvitation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (details: Omit<InvitationDetail, 'title'>) =>
      updateInvitation({ id, details }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
    onError: (error) => {
      throw new Error(`청첩장 수정 실패:${error}`);
    },
  });
};

export const useDeleteInvitation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['invitations'] });
      const previousInvitations = queryClient.getQueryData(['invitations']);
      queryClient.setQueryData(['invitations'], (old: InvitationDetail[]) =>
        old.filter((inv) => inv.id !== id),
      );
      return { previousInvitations };
    },
    mutationFn: () => deleteInvitation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
    onError: (error) => {
      throw new Error(`청첩장 삭제 실패:${error}`);
    },
  });
};
