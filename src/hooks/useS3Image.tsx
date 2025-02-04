import { getS3ImageUrl, S3Detail } from "@/services/imageService";
import useImageStore from "@/store/useImageStore";
import { useMutation } from "@tanstack/react-query";

export const useS3Image = () => {
  const { setUploadedImageUrl } = useImageStore();
  return useMutation<S3Detail, Error, File[]>({
    mutationFn: (img: File[]) => getS3ImageUrl(img),
    onSuccess: async (data) => {
      if (data) {
        if (data.imageUrls) {
          if (data.imageUrls.length > 0) {
            await setUploadedImageUrl(data.imageUrls[0])
          }
          else {
            console.warn('이미지 URL이 없습니다.');
          }
        }
      }
    },
  });
};
