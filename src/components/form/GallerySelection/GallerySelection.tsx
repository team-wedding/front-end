import { useRef, useState } from "react";
import useGallaryStore from "../../../store/useGallaryStore";
import CloseIcon from "../../icons/CloseIcon";
import GridIcon from "../../icons/GridIcon";

export default function GallerySelection() {

  const fileRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [grid, setGrid] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length + e.target.files!.length <= 9) {
      const target = e.target.files as FileList;
      const fileArray = [...target].map((value: Blob) =>
        URL.createObjectURL(value),
      );
      setImages((prev) => [...prev, ...fileArray]);
    } else alert('9 images?');
  };

  const handleDelete = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
            setImages((prev) => [...prev, reader.result as string]);
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

  const store = useGallaryStore();
  const handleSave = () => {
    store.setImages(images);
    store.setGrid(grid);
  };
  return (
    <div className="flex flex-col gap-10">
      <label
        className={`${images.length == 0 ? `flex flex-col` : `grid grid-cols-3 gap-1`} w-full h-fit p-1 border-2  rounded-md cursor-pointer items-center`}
        htmlFor="dropzone"
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragLeave={handleLeave}
        onDragEnter={handleDragpEnter}
        onClick={(e) => e.preventDefault()}
      >
        {images.length == 0 ? (
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
                className={`relative w-24 h-32 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer ${hoveredIndex == index ? 'shadow-2xl' : 'shadow-none '}`}
                key={index}
                onDragStart={() => handleSortDragStart(index)}
                onDragOver={(e) => handleSortDragOver(index, e)}
                onDrop={() => handleSortDrop(index)}
                onDragEnd={handleSortDragEnd}
              >
                <div
                  className="absolute size-4 top-1 right-1 rounded-full bg-gray-400/80"
                  onClick={() => handleDelete(index)}
                >
                  <CloseIcon className="size-4 text-white " />
                </div>
                <img src={value} alt="" className="" />
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
      <section className="w-full flex justify-around">
        <button
          onClick={() => setGrid(true)}
          className={`px-10 py-2 rounded-md ${grid ? 'bg-gray-200 border border-black ' : 'bg-transparent  '}`}
        >
          <GridIcon />
          그리드
        </button>
        <button
          onClick={() => setGrid(false)}
          className={`px-10 py-2 rounded-md ${!grid ? 'bg-gray-200 border border-black ' : 'bg-transparent  '}`}
        >
          <GridIcon />
          페이징
        </button>
      </section>
      <button
        onClick={handleSave}
        className="bg-button p-2 rounded-md text-white hover:bg-button/80"
      >
        저장하기
      </button>
    </div>
  );
}
