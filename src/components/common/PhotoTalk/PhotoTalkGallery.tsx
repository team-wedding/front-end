import { useState } from 'react';
import usePhotoTalkStore from '@store/usePhotoTalkStore';
import DownloadIcon from '@/components/icons/DownloadIcon';
import { downloadSelectedImages } from '@/utils/downloadUtils';
import PhotoTalkGalleryModal from '@/components/common/PhotoTalk/PhotoTalkGalleryModal';

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

  // 여러 장 다운로드
  const handleDownloadSelected = async () => {
    await downloadSelectedImages(selectedImages);
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

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
        <header className="flex justify-end items-center px-2" role="banner">
          <div className="flex-center gap-2 mb-2">
            <p className="text-gray-700 text-xs">
              {selectedImages.length} / {images.length}
            </p>
            <button
              onClick={handleDownloadSelected}
              className="bg-white/80 px-2 py-1 rounded-xl active:bg-black/30 shadow-md"
              disabled={selectedImages.length === 0}
              aria-label="선택한 이미지 다운로드"
            >
              <DownloadIcon />
            </button>
          </div>
        </header>
      )}

      <main
        className="grid grid-cols-3 gap-[2px] p-2 place-items-center"
        role="main"
      >
        {images.map((url, index) => (
          <div key={index} className="relative group hover:opacity-95">
            {isAdmin && (
              <div className="absolute -top-1 left-0 p-1 rounded-sm">
                <input
                  type="checkbox"
                  checked={selectedImages.includes(url)}
                  onChange={() => toggleSelectImage(url)}
                  className="size-4 rounded bg-white/60  cursor-pointer z-10 border-none shadow-inner checked:bg-black focus:ring-0 focus:outline-none"
                  aria-label={`이미지 ${index + 1} 선택`}
                />
              </div>
            )}

            <img
              src={url}
              alt={`Uploaded image ${index + 1}`}
              className="w-full aspect-[1/1] rounded-sm object-cover cursor-pointer shadow-custom"
              onClick={() => openModal(index)}
            />
          </div>
        ))}
      </main>

      {isModalOpen && (
        <PhotoTalkGalleryModal
          isAdmin={isAdmin}
          images={images}
          currentImageIndex={currentImageIndex}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default PhotoTalkGallery;
