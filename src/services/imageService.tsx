import axios from 'axios';
import { API } from '../utils/config';
import { S3UploadRequest, S3UploadResponse } from '@/types/s3Type';

export const uploadAndGetS3Url = async ({
  imageFiles,
  directory,
}: S3UploadRequest): Promise<S3UploadResponse> => {
  if (imageFiles.length == 0) {
    return { imageUrls: [] };
  }

  const formData = new FormData();
  imageFiles.map((value) => formData.append('images', value));

  const response = await axios.post(API.S3Images(directory), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const deleteInvitationS3Url = async (id: string) => {
  const response = await axios.delete(API.S3InvitationRemoval(id));

  return response.data;
};

export const deletePhototalkS3Url = async (id: number) => {
  const { data } = await axios.delete(API.S3PhotoTalkRemoval(id.toString()));

  return data;
};
