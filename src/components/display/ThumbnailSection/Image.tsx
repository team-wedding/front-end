import useImageStore from '@store/useImageStore';
import thumbnail from '@assets/image/wedding1.png';

const Image = () => {
  const { uploadedImageUrl } = useImageStore();

  return (
    <div className="flex-center w-full">
      {uploadedImageUrl ? (
        <img src={uploadedImageUrl} alt="Thumbnail" />
      ) : (
        <img src={thumbnail} alt="Default Thumbnail" />
      )}
    </div>
  );
};

export default Image;
