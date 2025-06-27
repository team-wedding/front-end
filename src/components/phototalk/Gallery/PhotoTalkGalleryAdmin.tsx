import PhotoTalkEmptyState from '@/components/phototalk/EmptyState/PhotoTalkEmptyState';
import PhotoTalkGalleryGrid from '@/components/phototalk/Gallery/PhotoTalkGalleryGrid';
import PhotoTalkGalleryModal from '@/components/phototalk/Modal/GalleryModal/PhotoTalkGalleryModal';
import DownloadIcon from '@/components/icons/DownloadIcon';
import { UserMode } from '@/types/users';
import { downloadSelectedImages } from '@/utils/downloadUtils';
import { useState } from 'react';

interface PhotoTalkGalleryAdminProps {
  userMode: UserMode;
  images: string[];
  isCardEmpty: boolean;
  isImageEmpty: boolean;
}

const PhotoTalkGalleryAdmin = ({
  userMode,
  images,
  isCardEmpty,
  isImageEmpty,
}: PhotoTalkGalleryAdminProps) => {
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

  const handleDownloadSelected = async () => {
    await downloadSelectedImages(selectedImages);
  };

  return (
    <>
      <header className="flex justify-between items-center mb-2" role="banner">
        <div className="flex-center gap-1">
          <input
            type="checkbox"
            id="check-all"
            checked={
              selectedImages.length === images.length && images.length !== 0
            }
            onChange={toggleAllImages}
            className="size-4 rounded bg-white/80 border border-border dark:border-white/10 cursor-pointer z-10 shadow-inner  dark:bg-black/20 checked:bg-black dark:checked:bg-black focus:ring-0 focus:outline-none"
            aria-label="이미지 전체 선택"
          />
          <label
            htmlFor="check-all"
            className="text-xs font-light text-label dark:text-label-dark/80 ml-1"
          >
            모두 선택하기
          </label>

          <p className="text-xs font-light text-label dark:text-label-dark/80">
            <span>( </span>
            <span className="font-medium">{selectedImages.length}</span>
            <span className=""> / {images.length} ) </span>
          </p>
        </div>

        <button
          onClick={handleDownloadSelected}
          className={`bg-surface dark:bg-surface-dark px-3 py-1 rounded-full shadow active:bg-black/20 dark:active:bg-white/20 ${isCardEmpty && 'cursor-not-allowed'}`}
          aria-label="선택한 이미지 다운로드"
          disabled={isCardEmpty}
        >
          <DownloadIcon className="size-5" />
        </button>
      </header>

      {isImageEmpty && !isCardEmpty && (
        <PhotoTalkEmptyState userMode={userMode} viewType="gallery" />
      )}

      <PhotoTalkGalleryGrid
        images={images}
        isExample={isCardEmpty}
        onImageClick={(index) => {
          setCurrentImageIndex(index);
          setModalOpen(true);
        }}
        checkboxOptions={{
          show: true,
          selectedImages: selectedImages,
          onSelectImage: toggleSelectImage,
        }}
      />

      {isModalOpen && (
        <PhotoTalkGalleryModal
          userMode={userMode}
          images={images}
          isExample={isCardEmpty}
          currentImageIndex={currentImageIndex}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default PhotoTalkGalleryAdmin;
