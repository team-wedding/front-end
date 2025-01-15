import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteInvitation, getInvitation, getInvitations, postInvitation, updateInvitation } from "../services/invitation";
import { getInvitationDetail } from "../apis/invitation";

export const useGetInvitation = (id: number) => {
  return useQuery({
    queryKey: ['invitations', id], queryFn: () => getInvitation(id),
    staleTime: 3000
  })
}
export const useGetInvitations = (id: number) => {
  return useQuery({
    queryKey: ['invitations', id], queryFn: () => getInvitations(),
    staleTime: 3000
  })
}

export const useCreateInvitation = () => {
  let details = getInvitationDetail()
  return useMutation({
    mutationFn: () => postInvitation(details),
  });
}
export const useUpdateInvitation = (id: number) => {
  let details = getInvitationDetail()
  return useMutation({
    mutationFn: () => updateInvitation({ id, details }),
  });
}
export const useDeleteInvitation = (id: number) => {
  return useMutation({
    mutationFn: () => deleteInvitation(id),
  });
}
