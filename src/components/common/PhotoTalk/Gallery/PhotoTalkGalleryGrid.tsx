import PhotoTalkGalleryEmptyState from '@/components/common/PhotoTalk/Gallery/PhotoTalkGalleryEmptyState';
import { UserMode } from '@/types/users';

interface PhotoTalkGalleryGridProps {
  userMode?: UserMode;
  images: string[];
  onImageClick: (index: number) => void;
  checkboxOptions?: {
    show: boolean;
    selectedImages: string[];
    onSelectImage: (url: string) => void;
  };
}

const PhotoTalkGalleryGrid = ({
  userMode,
  images,
  onImageClick,
  checkboxOptions,
}: PhotoTalkGalleryGridProps) => {
  if (images.length === 0)
    return <PhotoTalkGalleryEmptyState userMode={userMode} />;

  return (
    <div>
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
              className="w-full aspect-[1/1] rounded-sm object-cover cursor-pointer shadow-custom"
              onClick={() => onImageClick(index)}
            />
          </div>
        ))}
      </main>
    </div>
  );
};

export default PhotoTalkGalleryGrid;
