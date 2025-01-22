import { useRef, useState } from 'react';
import useGallaryStore from '../../../../store/useGallaryStore';
import CloseIcon from '../../../icons/CloseIcon';
import GridIcon from '../../../../assets/GridIcon.svg'
import ChevronRight from '../../../icons/Chevron_RightIcon';
import ChevronLeft from '../../../icons/Chevron_LeftIcon';

export default function GalleryFeature() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { images, grid, setImages, setGrid } = useGallaryStore();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length + e.target.files!.length <= 9) {
      const target = e.target.files as FileList;
      const fileArray = [...target].map((value: Blob) =>
        URL.createObjectURL(value),
      );
      setImages([...images, ...fileArray]);
    } else alert('9 images?');
  };

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  const handleDragpEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  const handleLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        if (file) {
          reader.readAsDataURL(file);
          reader.onload = () => {
            setImages([...images, reader.result as string])
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
    const reorderedImages = [...images];
    const [removed] = reorderedImages.splice(draggedIndex, 1);
    reorderedImages.splice(index, 0, removed);
    setImages(reorderedImages);
    setDraggedIndex(null);
    setHoveredIndex(null);
  };

  const handleSortDragEnd = () => {
    setHoveredIndex(null);
  };


  return (
    <div className="flex flex-col gap-4">
      <label
        className={`${images.length === 0 ? `flex flex-col` : `grid grid-cols-2 justify-items-center gap-2 px-4 lg:px-1 py-2 lg:grid-cols-3 lg:gap-1`} w-full h-fit p-1 border-2  rounded-md cursor-pointer items-center overflow-y-scroll`}
        htmlFor="dropzone"
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragLeave={handleLeave}
        onDragEnter={handleDragpEnter}
        onClick={(e) => e.preventDefault()}
      >
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-xs text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">
              SVG, PNG, JPG or GIF (MAX. 2000x2000px)
            </p>
          </div>
        ) : (
          images.map((value, index) => {
            return (
              <div
                className={`relative w-32 h-44 lg:w-24 lg:h-32 rounded-md flex items-center justify-center cursor-pointer ${hoveredIndex == index ? 'shadow-2xl' : 'shadow-none '}`}
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
                <img src={value} alt="" className="object-center  rounded-md size-full border border-gray-300" />
              </div>
            );
          })
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
        className="px-4 py-2 bg-primary text-white rounded-md cursor-pointer text-center"
      >
        사진 추가하기
      </label>
      <section className="w-full flex flex-row items-stretch gap-4 h-28">
        <button
          onClick={() => setGrid(true)}
          className={`flex-1 px-5 py-4 rounded-md flex flex-col items-center justify-between border ${grid ? 'border-transparent ring-1 ring-primary' : 'bg-transparent  '}`}
        >
          <img src={GridIcon} alt="" className='size-12 text-gray-400' />
          그리드
        </button>
        <button
          onClick={() => setGrid(false)}
          className={` flex-1 px-5 py-4 rounded-md flex flex-col items-center justify-between border  ${!grid ? 'border-transparent ring-1 ring-primary' : 'bg-transparent  '}`}
        >
          <div className=' flex flex-row items-center'>
            <ChevronLeft className='text-gray-400/70 size-6' />
            <div className='size-12 bg-gray-400/70 rounded-lg' />
            <ChevronRight className='text-gray-400/70 size-6' />
          </div>
          페이징
        </button>
      </section>
      {/* <button
        onClick={handleSave}
        className="bg-button p-2 rounded-md text-white hover:bg-button/80"
      >
        저장하기
      </button> */}
    </div >
  );
}
