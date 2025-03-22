import { useState } from 'react';
import usePhotoTalkStore from '@store/usePhotoTalkStore';
import ChevronLeft from '@icons/Chevron_LeftIcon';
import ChevronRight from '@icons/Chevron_RightIcon';
import DownloadIcon from '@/components/icons/DownloadIcon';

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
    console.log(`${selectedImages.length} images downloaded`);
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
      <p className="text-center text-gray-500 my-6">
        업로드된 이미지가 없습니다.
      </p>
    );
  }

  return (
    <div>
      {isAdmin && (
        <div className="flex justify-end items-center px-2">
          {/* <h2 className="text-xs text-black/50">사진을 관리할 수 있습니다.</h2> */}
          <div className="flex-center gap-2 mb-2">
            <p className="text-gray-700 text-xs">
              {selectedImages.length} / {images.length}
            </p>
            <button
              onClick={downloadSelectedImages}
              className="bg-white/80 px-2 py-1 rounded-xl active:bg-black/30 shadow-md"
              disabled={selectedImages.length === 0}
            >
              <DownloadIcon />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-1 p-2 place-items-center">
        {images.map((url, index) => (
          <div key={index} className="relative group">
            {isAdmin && (
              <div className="absolute -top-1 left-0 p-1 rounded">
                <input
                  type="checkbox"
                  checked={selectedImages.includes(url)}
                  onChange={() => toggleSelectImage(url)}
                  className="size-4 rounded bg-white/90 cursor-pointer z-10 border-none checked:bg-black focus:ring-0 focus:outline-none"
                />
              </div>
            )}

            <img
              src={url}
              alt={`Uploaded ${index}`}
              className="w-full aspect-[1/1] rounded object-cover cursor-pointer shadow-custom"
              onClick={() => openModal(index)}
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          onClick={closeModal}
          className="max-w-[520px] m-auto column-center fixed inset-0 z-50 bg-black bg-opacity-80"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[80%] aspect-[3/4] rounded-2xl overflow-hidden backdrop-blur-3xl bg-black/30 shadow-custom py-16 "
          >
            <div className="relative flex-center w-full h-full px-10">
              <button
                onClick={showPreviousImage}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full hover:bg-opacity-75"
              >
                <ChevronLeft />
              </button>

              {/* <div className="p-10"> */}
              <img
                src={images[currentImageIndex]}
                alt="미리보기"
                className="max-w-full max-h-full object-contain rounded-xl"
              />
              {/* </div> */}

              <button
                onClick={showNextImage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80  rounded-full hover:bg-opacity-75"
              >
                <ChevronRight />
              </button>
            </div>

            {isAdmin && (
              <footer className="absolute bottom-3 right-0 left-0 m-auto w-full gap-4 text-white/80 px-4">
                <button className="w-1/2 py-3 text-xs rounded-lg bg-black/0 hover:bg-white/10 font-medium">
                  삭제
                </button>
                <button className="w-1/2 py-3 text-xs rounded-lg bg-black/0 hover:bg-white/10 font-medium">
                  다운로드
                </button>
              </footer>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoTalkGallery;
