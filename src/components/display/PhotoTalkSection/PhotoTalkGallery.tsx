import usePhotoTalkStore from '../../../store/usePhotoTalkStore';

const PhotoTalkGallery = () => {
  const getAllImages = usePhotoTalkStore((state) => state.getAllImages);
  const images = getAllImages();

  if (images.length === 0) {
    return (
      <p className="text-center text-gray-500">업로드된 이미지가 없습니다.</p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Uploaded ${index}`}
          className="h-24 w-full rounded-lg object-cover"
        />
      ))}
    </div>
  );
};

export default PhotoTalkGallery;
