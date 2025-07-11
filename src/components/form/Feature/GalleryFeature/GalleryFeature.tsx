import { useRef, useState } from 'react';
import CloseIcon from '@icons/CloseIcon';
import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import useGalleryStore from '@/store/OptionalFeature/useGalleryFeatureStore';
import { GalleryHorizontal, LayoutGrid } from 'lucide-react';

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

  const hasImages = galleryImages && galleryImages.length !== 0;

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
    <>
      <InformationItem
        messages={[
          '사진은 최대 9장까지 추가 가능합니다.',
          '사진을 드래그해서 순서를 바꿀 수 있습니다.',
        ]}
      />

      <div className="py-3 space-y-8 w-full">
        <div className="column-center w-full mx-auto">
          <label
            // className={`flex-center w-full h-44 glass-button overflow-y-scroll ${hasImages && `grid grid-cols-2 justify-items-center gap-1`} `}
            className={`w-full min-h-44 p-2 rounded transition-all ${
              hasImages
                ? 'grid grid-cols-2 gap-1 auto-rows-fr'
                : 'flex flex-col justify-center items-center glass-button'
            }`}
            htmlFor="dropzone"
            onDrop={handleDrop}
            onDragOver={handleDrag}
            onDragLeave={handleLeave}
            onDragEnter={handleDragEnter}
            onClick={(e) => e.preventDefault()}
          >
            {hasImages ? (
              galleryImages.map((value, index) => {
                return (
                  <div
                    className={`w-full relative overflow-hidden aspect-[3/4]  ${hoveredIndex == index ? 'shadow-2xl' : 'shadow-none '}`}
                    key={index}
                    onDragStart={() => handleSortDragStart(index)}
                    onDragOver={(e) => handleSortDragOver(index, e)}
                    onDrop={() => handleSortDrop(index)}
                    onDragEnd={handleSortDragEnd}
                  >
                    <button
                      className="absolute p-1 top-1 right-1 rounded-full bg-slate-900/20 group hover:bg-black"
                      onClick={() => handleDelete(index)}
                    >
                      <CloseIcon className="size-5 text-white " />
                    </button>
                    <img
                      src={value}
                      alt=""
                      className="object-center rounded size-full"
                    />
                  </div>
                );
              })
            ) : (
              <div className="column-center space-y-3">
                {/* <Plus className="text-slate-500" strokeWidth={1.6} /> */}
                <div className="space-y-1 text-xs text-slate-400 text-center">
                  <p>이미지를 선택하거나 드래그해서 추가해주세요</p>
                  <p>
                    {acceptedFormats
                      .join(', ')
                      .replace(/image\//g, '')
                      .toUpperCase()}{' '}
                    파일 (MAX. {maxWidth}x{maxHeight}px)
                  </p>
                </div>
              </div>
            )}
          </label>

          {/* {hasImages && ( */}
          <div className="py-3">
            <label
              htmlFor="dropzone"
              className="py-2 px-4 bg-slate-900/30 shadow-md text-white rounded-xl cursor-pointer"
            >
              사진 추가하기
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
          </div>
        </div>
      </div>

      <div className="px-6 py-3">
        <div className="h-px bg-gray-200"></div>
      </div>

      <div className="flex flex-col justify-between">
        <label className="label">디자인</label>

        <div className="flex items-center justify-between gap-4 w-full py-3">
          <button
            onClick={() => setGrid(true)}
            className={`column-center gap-3 py-6 w-full ${grid ? 'glass-button-selected' : 'glass-button'}`}
          >
            <LayoutGrid className="size-8 text-slate-500" />
            <label className="label">그리드</label>
          </button>
          <button
            onClick={() => setGrid(false)}
            className={`column-center gap-3 py-6 w-full ${!grid ? 'glass-button-selected' : 'glass-button'}`}
          >
            <div className="flex flex-col items-center gap-3">
              <GalleryHorizontal className="size-8 text-slate-500" />
              <label className="label">슬라이드</label>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
