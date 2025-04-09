interface PhotoTalkGalleryGridProps {
  images: string[];
  isExample?: boolean;
  onImageClick: (index: number) => void;
  checkboxOptions?: {
    show: boolean;
    selectedImages: string[];
    onSelectImage: (url: string) => void;
  };
}

const PhotoTalkGalleryGrid = ({
  images,
  isExample,
  onImageClick,
  checkboxOptions,
}: PhotoTalkGalleryGridProps) => {
  return (
    <>
      <main className="grid grid-cols-3 gap-[2px] p-2 place-items-center">
        {images.map((url, index) => (
          <div key={index} className="relative group hover:opacity-95">
            {checkboxOptions?.show && (
              <div className="absolute -top-1 left-0 p-1 rounded-sm">
                <input
                  type="checkbox"
                  checked={checkboxOptions.selectedImages.includes(url)}
                  onChange={() => checkboxOptions.onSelectImage(url)}
                  className="size-4 rounded bg-white/60  cursor-pointer z-10 border-none shadow-inner checked:bg-black focus:ring-0 focus:outline-none"
                  aria-label={`이미지 ${index + 1} 선택`}
                />
              </div>
            )}

            <img
              src={url}
              alt={`Uploaded image ${index + 1}`}
              className={`w-full aspect-[1/1] rounded-sm object-cover cursor-pointer shadow-custom`}
              onClick={() => onImageClick(index)}
            />

            {isExample && (
              <footer className="absolute left-0 right-0 bottom-0 backdrop-blur-xl bg-black/30 rounded-sm p-1">
                <p className="text-center text-xs text-white font-extralight">
                  example
                </p>
              </footer>
            )}
          </div>
        ))}
      </main>
    </>
  );
};

export default PhotoTalkGalleryGrid;
