import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import ImageUploader from '@/components/common/ImageUploader';
import { useCompletionTracker } from '@/hooks/useCompletionTracker';
import useImageStore from '@/store/useImageStore';

const ThumbnailFeature = () => {
  const {
    uploadedImageFile,
    setUploadedImageFile,
    uploadedImageUrl,
    setUploadedImageUrl,
  } = useImageStore();

  const imageFilled = uploadedImageUrl.length > 0;

  useCompletionTracker({
    feature: 'thumbnail',
    isCompleted: imageFilled,
    deps: [],
  });

  return (
    <>
      <InformationItem messages={['썸네일에 나타나는 사진입니다.']} />

      <div className="py-6">
        <ImageUploader
          ImageUrl={uploadedImageUrl}
          ImageFile={uploadedImageFile}
          setImageUrl={setUploadedImageUrl}
          setImageFile={setUploadedImageFile}
        />
      </div>
    </>
  );
};

export default ThumbnailFeature;
