import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import ImageUploader from '@/components/common/ImageUploader';
import useImageStore from '@/store/useImageStore';

const ThumbnailFeature = () => {
  const { uploadedImage, setUploadedImage } = useImageStore();

  return (
    <div className="mx-4 my-6">
      <InformationItem messages={['썸네일에 나타나는 사진입니다.']} />

      <hr />

      <div className="my-10">
        <ImageUploader
          initialImage={uploadedImage}
          onImageUpload={setUploadedImage}
        />
      </div>
    </div>
  );
};

export default ThumbnailFeature;
