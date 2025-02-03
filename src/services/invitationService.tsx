import { InvitationDetiail } from '../types/invitationType';
import { axiosInstance, API } from '../utils/config';

//청첩장 리스트 조회
export const getInvitations = async () => {
  const { data } = await axiosInstance.get(API.INVITATIONS());
  return data;
};

//청첩장 단일 조회
export const getInvitation = async (id: number) => {
  const { data } = await axiosInstance.get(API.INVITATIONS(id.toString()));
  return data;
};

//청첩장 생성
export const postInvitation = async (
  details: Omit<InvitationDetiail, 'id'>,
) => {
  const { data } = await axiosInstance.post(API.INVITATIONS(), details);
  return data;
};

//청첩장 삭제
export const deleteInvitation = async (id: number) => {
  const { data } = await axiosInstance.delete(API.INVITATIONS(id.toString()));
  return data;
};

//청첩장 수정
export const updateInvitation = async ({
  id,
  details,
}: {
  id: number;
  details: InvitationDetiail;
}) => {
  const { data } = await axiosInstance.put(
    API.INVITATIONS(id.toString()),
    details,
  );
  return data;
};
