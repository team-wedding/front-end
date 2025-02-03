import { useState } from 'react';
import usePhotoTalkStore from '@store/usePhotoTalkStore';
import ChevronLeft from '@icons/Chevron_LeftIcon';
import ChevronRight from '@icons/Chevron_RightIcon';

interface PhotoTalkGalleryProps {
  isAdmin?: boolean;
}

const PhotoTalkGallery = ({ isAdmin = false }: PhotoTalkGalleryProps) => {
  const getAllImages = usePhotoTalkStore((state) => state.getAllImages);
  const images = getAllImages();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleSelectImage = (url: string) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(url)
        ? prevSelected.filter((img) => img !== url)
        : [...prevSelected, url],
    );
  };

  const downloadSelectedImages = () => {
    console.log('downloaded');
  };

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
      {isAdmin && (
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold">이미지 갤러리</h2>
          <div className="flex gap-2">
            <button
              onClick={downloadSelectedImages}
              className="select-btn"
              disabled={selectedImages.length === 0}
            >
              다운로드
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 p-4">
        {images.map((url, index) => (
          <div key={index} className="relative group">
            {isAdmin && (
              <input
                type="checkbox"
                checked={selectedImages.includes(url)}
                onChange={() => toggleSelectImage(url)}
                className="absolute top-2 right-2 w-5 h-5 rounded cursor-pointer z-10"
              />
            )}

            <img
              src={url}
              alt={`Uploaded ${index}`}
              className="h-24 w-full rounded-lg object-cover cursor-pointer border-2"
              onClick={() => openModal(index)}
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          onClick={closeModal}
          className="result-layout fixed inset-0 z-50 bg-black bg-opacity-50"
        >
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
      )}
    </div>
  );
};

export default PhotoTalkGallery;
