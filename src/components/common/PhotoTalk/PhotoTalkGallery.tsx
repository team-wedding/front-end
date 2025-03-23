import { useState } from 'react';
import usePhotoTalkStore from '@store/usePhotoTalkStore';
import ChevronLeft from '@icons/Chevron_LeftIcon';
import ChevronRight from '@icons/Chevron_RightIcon';
import DownloadIcon from '@/components/icons/DownloadIcon';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface PhotoTalkGalleryProps {
  isAdmin?: boolean;
}

const PhotoTalkGallery = ({ isAdmin = false }: PhotoTalkGalleryProps) => {
  const getAllImages = usePhotoTalkStore((state) => state.getAllImages);
  const images = getAllImages();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const toggleSelectImage = (url: string) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(url)
        ? prevSelected.filter((img) => img !== url)
        : [...prevSelected, url],
    );
  };

  const downloadSelectedImages = async (selectedImages: string[]) => {
    // zip 다운
    if (selectedImages.length >= 10) {
      const zip = new JSZip();
      const folder = zip.folder('phototalk-images');

      await Promise.all(
        selectedImages.map(async (url, index) => {
          const response = await fetch(url);
          const blob = await response.blob();
          folder?.file(`phototalk_${index + 1}.jpg`, blob);
        }),
      );

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'phototalk_images.zip');
    } else {
      // 순차 다운
      for (let i = 0; i < selectedImages.length; i++) {
        const url = selectedImages[i];
        const link = document.createElement('a');
        link.href = url;
        link.download = `phototalk_${i + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        await delay(500);
      }
    }

    console.log(`${selectedImages.length} images downloaded`);
  };

  const downloadCurrentImage = () => {
    const url = images[currentImageIndex];
    const link = document.createElement('a');
    link.href = url;
    link.download = `phototalk_${currentImageIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              onClick={() => downloadSelectedImages(selectedImages)}
              className="bg-white/80 px-2 py-1 rounded-xl active:bg-black/30 shadow-md"
              disabled={selectedImages.length === 0}
            >
              <DownloadIcon />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-[2px] p-2 place-items-center">
        {images.map((url, index) => (
          <div key={index} className="relative group">
            {isAdmin && (
              <div className="absolute -top-1 left-0 p-1 rounded-sm">
                <input
                  type="checkbox"
                  checked={selectedImages.includes(url)}
                  onChange={() => toggleSelectImage(url)}
                  className="size-4 rounded bg-white/60 cursor-pointer z-10 border-none shadow-inner checked:bg-black focus:ring-0 focus:outline-none"
                />
              </div>
            )}

            <img
              src={url}
              alt={`Uploaded ${index}`}
              className="w-full aspect-[1/1] rounded-sm object-cover cursor-pointer shadow-custom"
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
            className="relative w-[90%] aspect-[4/5] rounded-2xl overflow-hidden backdrop-blur-3xl bg-black/30 shadow-custom py-16 "
          >
            <div className="relative flex-center w-full h-full px-4">
              <button
                onClick={showPreviousImage}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 rounded-full hover:opacity-50"
              >
                <ChevronLeft className="size-7 text-white/70" />
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2rounded-full hover:opacity-50"
              >
                <ChevronRight className="size-7 text-white/70" />
              </button>
            </div>

            {isAdmin && (
              <footer className="absolute bottom-3 right-0 left-0 m-auto w-full gap-4 text-white/80 px-4">
                <button
                  className="w-1/2 py-3 text-xs rounded-xl bg-black/0 hover:bg-white/10 font-medium"
                  onClick={() => {}}
                >
                  삭제
                </button>
                <button
                  className="w-1/2 py-3 text-xs rounded-xl bg-black/0 hover:bg-white/10 font-medium"
                  onClick={downloadCurrentImage}
                >
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
