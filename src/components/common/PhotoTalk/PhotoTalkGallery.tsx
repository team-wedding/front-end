import { useState } from 'react';
import usePhotoTalkStore from '@store/usePhotoTalkStore';
import DownloadIcon from '@/components/icons/DownloadIcon';
import { downloadSelectedImages } from '@/utils/downloadUtils';
import PhotoTalkGalleryModal from '@/components/common/PhotoTalk/PhotoTalkGalleryModal';
import { phototalkData } from '@/constants/phototalkData';

interface PhotoTalkGalleryProps {
  isAdmin?: boolean;
  isPreview?: boolean;
}

const PhotoTalkGallery = ({
  isAdmin = false,
  isPreview = false,
}: PhotoTalkGalleryProps) => {
  const previewImages = phototalkData.flatMap(
    (phototalk) => phototalk.imageUrl,
  );
  const getAllImages = usePhotoTalkStore((state) => state.getAllImages);
  const images = isPreview ? previewImages : getAllImages();

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

  const toggleAllImages = () => {
    const allSelected = images.every((image) => selectedImages.includes(image));
    const newSelected = allSelected ? [] : [...images];

    setSelectedImages(newSelected);
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
      <p className="text-center text-gray-500 my-6 text-sm">
        업로드된 이미지가 없습니다.
      </p>
    );
  }

  return (
    <div>
      {isAdmin && (
        <header className="flex justify-between items-center m-2" role="banner">
          <div className="flex-center gap-1">
            <input
              type="checkbox"
              id="check-all"
              checked={selectedImages.length === images.length}
              onChange={toggleAllImages}
              className="size-4 rounded bg-white border border-gray-200 cursor-pointer z-10 shadow-inner checked:bg-black focus:ring-0 focus:outline-none"
              aria-label={`이미지 전체 선택`}
            />
            <label
              htmlFor="check-all"
              className="text-xs font-light text-black/80"
            >
              모두 선택하기
            </label>

            <p className="text-xs font-light text-black/80">
              <span>( </span>
              <span className="font-medium">{selectedImages.length}</span>
              <span className=""> / {images.length} ) </span>
            </p>
          </div>

          <button
            onClick={handleDownloadSelected}
            className="bg-white/80 px-2 py-1 rounded-xl active:bg-black/30 shadow-md"
            disabled={selectedImages.length === 0}
            aria-label="선택한 이미지 다운로드"
          >
            <DownloadIcon />
          </button>
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
