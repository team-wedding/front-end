import useImageStore from '@store/useImageStore';
import thumbnail from '@assets/image/wedding1.png';

const Image = () => {
  const { uploadedImage } = useImageStore();

  return (
    <div className="flex-center w-full">
      {uploadedImage ? (
        <img src={uploadedImage} alt="Thumbnail" />
      ) : (
        <img src={thumbnail} alt="Default Thumbnail" />
      )}
    </div>
  );
};

export default Image;
