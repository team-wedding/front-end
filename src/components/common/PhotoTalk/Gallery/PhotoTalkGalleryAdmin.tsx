import PhotoTalkGalleryGrid from '@/components/common/PhotoTalk/Gallery/PhotoTalkGalleryGrid';
import PhotoTalkGalleryModal from '@/components/common/PhotoTalk/Modal/GalleryModal/PhotoTalkGalleryModal';
import DownloadIcon from '@/components/icons/DownloadIcon';
import usePhotoTalkStore from '@/store/usePhotoTalkStore';
import { USER_MODE } from '@/types/users';
import { downloadSelectedImages } from '@/utils/downloadUtils';
import { useState } from 'react';

const userMode = USER_MODE.ADMIN;

const PhotoTalkGalleryAdmin = () => {
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
  const toggleAllImages = () => {
    const allSelected = images.every((image) => selectedImages.includes(image));
    const newSelected = allSelected ? [] : [...images];

    setSelectedImages(newSelected);
  };

  const handleDownloadSelected = async () => {
    await downloadSelectedImages(selectedImages);
  };

  return (
    <div>
      <header className="flex justify-between items-center m-2" role="banner">
        <div className="flex-center gap-1">
          <input
            type="checkbox"
            id="check-all"
            checked={selectedImages.length === images.length}
            onChange={toggleAllImages}
            className="size-4 rounded bg-white border border-gray-200 cursor-pointer z-10 shadow-inner checked:bg-black focus:ring-0 focus:outline-none"
            aria-label="이미지 전체 선택"
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

      <PhotoTalkGalleryGrid
        userMode={userMode}
        images={images}
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
          currentImageIndex={currentImageIndex}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PhotoTalkGalleryAdmin;
