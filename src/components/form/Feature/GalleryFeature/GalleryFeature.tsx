import { useRef, useState } from 'react';
import CloseIcon from '@icons/CloseIcon';
import GridIcon from '@assets/GridIcon.svg';
import ChevronRight from '@icons/Chevron_RightIcon';
import ChevronLeft from '@icons/Chevron_LeftIcon';
import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import useGalleryStore from '@/store/OptionalFeature/useGalleryFeatureStore';

export default function GalleryFeature() {

  const fileRef = useRef<HTMLInputElement>(null);
  const {
    galleryImages,
    grid,
    galleryFiles,
    setImages,
    setGrid,
    setGalleryFiles,
  } = useGalleryStore();

  let maxWidth = 5000;
  let maxHeight = 5000;
  let acceptedFormats = ['image/svg', 'image/png', 'image/jpg'];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (galleryImages) {
      if (galleryImages.length + e.target.files!.length < 9) {
        const target = e.target.files as FileList;
        const fileArray = [...target].map((value: Blob) =>
          URL.createObjectURL(value),
        );
        setImages([...galleryImages, ...fileArray]);
        setGalleryFiles([...galleryFiles, ...target]);
      } else alert('이미지개수가 9개를 초과할수없습니다!');
    }
  };

  const handleDelete = (index: number) => {
    setGalleryFiles(galleryFiles.filter((_, i) => i !== index));
    setImages(galleryImages.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  const handleLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setGalleryFiles([...galleryFiles, ...files]);
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        if (file) {
          reader.readAsDataURL(file);
          reader.onload = () => {
            setImages([...galleryImages, reader.result as string]);
          };
        }
      }
    }
  };

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSortDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleSortDragOver = (
    index: number,
    e: React.DragEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    setHoveredIndex(index);
  };

  const handleSortDrop = (index: number) => {
    if (draggedIndex === null) return;
    const reorderedImages = [...galleryImages];
    const reorderedFiles = [...galleryFiles];
    const [removedImage] = reorderedImages.splice(draggedIndex, 1);
    const [removedFile] = reorderedFiles.splice(draggedIndex, 1);
    reorderedImages.splice(index, 0, removedImage);
    reorderedFiles.splice(index, 0, removedFile);
    setImages(reorderedImages);
    setGalleryFiles(reorderedFiles);
    setDraggedIndex(null);
    setHoveredIndex(null);
  };

  const handleSortDragEnd = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="text-xs mx-4 my-6">
      <InformationItem
        messages={[
          '사진은 최대 9장까지 추가 가능합니다.',
          '사진을 드래그해서 순서를 바꿀 수 있습니다.',
        ]}
      />

      <hr />

      <div className="flex flex-col gap-5 my-10">
        <label
          className={`${galleryImages && galleryImages.length !== 0 ? `grid grid-cols-2 justify-items-center gap-x-5 gap-y-2 px-3 py-1 lg:px-1 lg:py-2 lg:grid-cols-3` : `flex flex-col`} w-full h-fit border-2 border-gray-100   rounded-lg cursor-pointer items-center overflow-y-scroll`}
          htmlFor="dropzone"
          onDrop={handleDrop}
          onDragOver={handleDrag}
          onDragLeave={handleLeave}
          onDragEnter={handleDragEnter}
          onClick={(e) => e.preventDefault()}
        >
          {galleryImages && galleryImages.length !== 0 ? (
            galleryImages.map((value, index) => {
              return (
                <div
                  className={`relative w-28 h-40 lg:w-24 lg:h-32 rounded-md flex items-center justify-center cursor-pointer ${hoveredIndex == index ? 'shadow-2xl' : 'shadow-none '}`}
                  key={index}
                  onDragStart={() => handleSortDragStart(index)}
                  onDragOver={(e) => handleSortDragOver(index, e)}
                  onDrop={() => handleSortDrop(index)}
                  onDragEnd={handleSortDragEnd}
                >
                  <div
                    className="absolute size-4 top-2 right-2 rounded-full bg-gray-400/60 group hover:bg-black"
                    onClick={() => handleDelete(index)}
                  >
                    <CloseIcon className="size-4 text-white " />
                  </div>
                  <img
                    src={value}
                    alt=""
                    className="object-center  rounded-md size-full border border-gray-300"
                  />
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-5 text-[10px] w-full text-gray-400 gap-1 bg-gray-50">
              <svg
                className="w-6 h-6 text-gray-700 dark:text-white my-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M5 12h14m-7 7V5"
                />
              </svg>

              <p>이미지를 선택하거나 드래그해서 추가해주세요</p>
              <p>
                {acceptedFormats
                  .join(', ')
                  .replace(/image\//g, '')
                  .toUpperCase()}{' '}
                파일 (MAX. {maxWidth}x{maxHeight}px)
              </p>
            </div>
          )}
        </label>

        <input
          id="dropzone"
          ref={fileRef}
          type="file"
          onChange={handleInput}
          multiple
          accept="image/*"
          className="hidden cursor-none"
        />
        <label
          htmlFor="dropzone"
          className="p-3 bg-button bg-opacity-80 text-white font-semibold rounded-xl cursor-pointer text-center hover:bg-opacity-50"
        >
          사진 추가하기
        </label>
      </div>

      <hr />

      <div className="flex flex-col justify-between gap-5 my-10">
        <div>디자인</div>
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setGrid(true)}
            className={`flex-1 px-2 py-6 rounded-lg flex flex-col items-center justify-between  border gap-2 ${grid && 'ring-1 ring-gray-600 shadow-md'}`}
          >
            <img src={GridIcon} alt="" className="size-8" />
            <div>그리드</div>
          </button>
          <button
            onClick={() => setGrid(false)}
            className={`flex-1 px-2 py-6 rounded-lg flex flex-col items-center justify-between border  ${!grid && 'ring-1 ring-gray-600 shadow-md'}`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center">
                <ChevronLeft className="text-gray-300 size-4" />
                <div className="size-8 bg-gray-300 rounded-md" />
                <ChevronRight className="text-gray-300 size-4" />
              </div>
              <div>슬라이드</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
