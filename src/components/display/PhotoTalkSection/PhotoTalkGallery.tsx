import { useState } from 'react';
import usePhotoTalkStore from '../../../store/usePhotoTalkStore';
import CloseIcon from '../../icons/CloseIcon';

const PhotoTalkGallery = () => {
  const getAllImages = usePhotoTalkStore((state) => state.getAllImages);
  const images = getAllImages();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  if (images.length === 0) {
    return (
      <p className="text-center text-gray-500">업로드된 이미지가 없습니다.</p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Uploaded ${index}`}
            className="h-24 w-full rounded-lg object-cover cursor-pointer"
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="page-container fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="preview-section p-20 h-full">
            <div className="flex flex-col items-center h-3/4 w-full rounded-lg bg-black bg-opacity-50 p-4 border">
              <button onClick={closeModal}>
                <CloseIcon className="size=[20px] text-white" />
              </button>
              <div className="relative h-full">
                <button
                  onClick={showPreviousImage}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 text-white rounded-full"
                >
                  ◀
                </button>
                <img
                  src={images[currentImageIndex]}
                  alt={`Full Image ${currentImageIndex}`}
                  className="h-4/5 object-contain rounded-lg"
                />
                <button
                  onClick={showNextImage}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 text-white rounded-full"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoTalkGallery;
