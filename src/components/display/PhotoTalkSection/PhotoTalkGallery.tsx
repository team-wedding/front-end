import { useState } from 'react';
import usePhotoTalkStore from '@store/usePhotoTalkStore';
import ChevronLeft from '@icons/Chevron_LeftIcon';
import ChevronRight from '@icons/Chevron_RightIcon';

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
        <div
          onClick={closeModal}
          className="page-container fixed inset-0 z-50 bg-black bg-opacity-50"
        >
          <div className="preview-section p-20 h-3/4">
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full rounded-lg overflow-hidden"
            >
              <div className="relative flex items-center justify-center p-9 h-full bg-black bg-opacity-50">
                <button
                  onClick={showPreviousImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75"
                >
                  <ChevronLeft />
                </button>
                <img
                  src={images[currentImageIndex]}
                  className="max-h-full object-contain rounded-md"
                />
                <button
                  onClick={showNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75"
                >
                  <ChevronRight />
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
