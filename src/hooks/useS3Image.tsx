import {
  deleteInvitationS3Url,
  deletePhototalkS3Url,
  uploadAndGetS3Url,
} from '@/services/imageService';
import useImageStore from '@/store/useImageStore';
import { S3UploadRequest, S3UploadResponse } from '@/types/s3Type';
import { useMutation } from '@tanstack/react-query';

export const useS3Image = () => {
  const { setUploadedImageUrl } = useImageStore();

  return useMutation<S3UploadResponse, Error, S3UploadRequest>({
    mutationFn: ({ imageFiles, directory }: S3UploadRequest) =>
      uploadAndGetS3Url({ imageFiles, directory }),
    onSuccess: async (data) => {
      if (data) {
        if (data.imageUrls) {
          if (data.imageUrls.length > 0) {
            await setUploadedImageUrl(data.imageUrls[0]);
          } else {
            console.warn('이미지 URL이 없습니다.');
          }
        }
      }
    },
  });
};

export const useDeleteInvitationS3Url = (id: string) => {
  return useMutation({
    mutationFn: () => deleteInvitationS3Url(id),
    onSuccess: async (data) => {
      if (data) {
        console.log(data.message);
      }
    },
  });
};

export const useDeletePhototalkS3Url = () => {
  return useMutation({
    mutationFn: (id: number) => deletePhototalkS3Url(id),
    onSuccess: async (data) => {
      if (data) {
        console.log(data.message);
      }
    },
  });
};
