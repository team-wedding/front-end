import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteInvitation,
  getInvitation,
  getInvitations,
  postInvitation,
  updateInvitation,
} from '../services/invitation';
import { getInvitationAction } from '../actions/invitationAction';
import { InvitationDetiail } from '../types/invitationType';
import resetAllStores from '@/store/resetStore';

export const useGetInvitation = (id: number) => {
  let { data, isError } = useQuery<InvitationDetiail>({
    queryKey: ['invitations', id],
    queryFn: () => getInvitation(id),
  });
  return { invitations: data, error: isError };
};

export const useGetInvitations = () => {
  return useQuery({
    queryKey: ['invitations'],
    queryFn: () => getInvitations(),
  });
};

export const useCreateInvitation = () => {
  let details = getInvitationAction();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postInvitation(details),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
      resetAllStores()
    }
  });
};
export const useUpdateInvitation = (id: number) => {
  let details = getInvitationAction();
  return useMutation({
    mutationFn: () => updateInvitation({ id, details }),
    onSuccess: () => resetAllStores(),
  });
};
export const useDeleteInvitation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteInvitation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitaions'] });
    },
  });
};
