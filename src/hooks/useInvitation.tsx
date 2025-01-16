import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteInvitation, getInvitation, getInvitations, postInvitation, updateInvitation } from "../services/invitation";
import { getInvitationAction } from "../actions/invitationAction";
import { InvitationDetiail } from "../types/invitationType";

export const useGetInvitation = (id: number) => {
  let { data } = useQuery<InvitationDetiail>({
    queryKey: ['invitations', id], queryFn: () => getInvitation(id),
    staleTime: 3000
  })
  return data
}
export const useGetInvitations = (id: number) => {
  return useQuery({
    queryKey: ['invitations', id], queryFn: () => getInvitations(),
    staleTime: 3000
  })
}

export const useCreateInvitation = () => {
  let details = getInvitationAction()
  return useMutation({
    mutationFn: () => postInvitation(details),
  });
}
export const useUpdateInvitation = (id: number) => {
  let details = getInvitationAction()
  return useMutation({
    mutationFn: () => updateInvitation({ id, details }),
  });
}
export const useDeleteInvitation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteInvitation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitaions'] });
    }
  });
}
