import { InvitationDetail } from '../types/invitationTypes';
import { axiosInstance, API } from '../utils/config';

//청첩장 리스트 조회
export const getInvitations = async () => {
  const { data } = await axiosInstance.get(API.INVITATION());
  return data;
};

//청첩장 단일 조회
export const getInvitation = async (id: number) => {
  const { data } = await axiosInstance.get(API.INVITATION(id.toString()));
  return data;
};

//청첩장 단일 조회
export const getInvitationCredential = async (id: number) => {
  const { data } = await axiosInstance.get(
    API.INVITATION_CREDENTIAL(id.toString()),
  );
  return data;
};

//청첩장 생성
export const postInvitation = async (
  details: Omit<InvitationDetail, 'id' | 'createdAt'>,
) => {
  const { data } = await axiosInstance.post(API.INVITATION(), details);
  return data;
};

//청첩장 삭제
export const deleteInvitation = async (id: number) => {
  const { data } = await axiosInstance.delete(API.INVITATION(id.toString()));
  return data;
};

//청첩장 수정
export const updateInvitation = async ({
  id,
  details,
}: {
  id: number;
  details: Omit<InvitationDetail, 'title' | 'createdAt'>;
}) => {
  const { data } = await axiosInstance.put(
    API.INVITATION(id.toString()),
    details,
  );
  return data;
};
