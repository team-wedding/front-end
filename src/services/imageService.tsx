import axios from 'axios';
import { API } from '../utils/config';

export interface S3Detail {
  imageUrls: string[];
}

export interface S3Props {
  imageFiles: File[];
  directory: string;
}

export const getS3ImageUrl = async ({ imageFiles, directory }: S3Props): Promise<S3Detail> => {
  const formData = new FormData()
  imageFiles.map((value) => (
    formData.append("images", value)
  ))
  if (imageFiles.length == 0) {
    return { imageUrls: [] }
  }
  const response = await axios.post(API.S3Images(directory), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteS3ImageUrl = async (id: string) => {
  const response = await axios.delete(API.S3InvitationRemoval(id));
  return response.data;
};