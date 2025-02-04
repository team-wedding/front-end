import axios from 'axios';
import { API } from '../utils/config';

export interface S3Detail {
  imageUrls: string[];
}

export const getS3ImageUrl = async (imageUrl: File[]): Promise<S3Detail> => {
  const formData = new FormData()
  imageUrl.map((value) => (
    formData.append("images", value)
  ))
  if (imageUrl.length == 0) {
    return { imageUrls: [] }
  }
  const response = await axios.post(API.S3Images(), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};