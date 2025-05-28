import { deleteS3ImageUrl, getS3ImageUrl } from '@/services/imageService';
import useImageStore from '@/store/useImageStore';
import { S3UploadRequest, S3UploadResponse } from '@/types/invitationType';
import { useMutation } from '@tanstack/react-query';

export const useS3Image = () => {
  const { setUploadedImageUrl } = useImageStore();
  return useMutation<S3UploadResponse, Error, S3UploadRequest>({
    mutationFn: ({ imageFiles, directory }: S3UploadRequest) =>
      getS3ImageUrl({ imageFiles, directory }),
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

export const useS3RemoveImage = (id: string) => {
  return useMutation({
    mutationFn: () => deleteS3ImageUrl(id),
    onSuccess: async (data) => {
      if (data) {
        console.log(data.message);
      }
    },
  });
};
