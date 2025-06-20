import CloseIcon from '@/components/icons/CloseIcon';
import CloudArrowIcon from '@/components/icons/CloudArrowIcon';
import { ChangeEvent } from 'react';

interface PhotoTalkImageUploadProps {
  imageUrls: string[];
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageRemove: (indexToRemove: number) => void;
}

const PhotoTalkImageUpload = ({
  imageUrls,
  handleImageUpload,
  handleImageRemove,
}: PhotoTalkImageUploadProps) => {
  return (
    <>
      <label className="label w-full flex items-center gap-2">
        사진 추가
        <span className="font-light text-label-secondary dark:text-label-secondary-dark/ flex-center gap-1">
          <span>사진은 최대 10장까지 추가할 수 있습니다.</span>
          <span className="text-black font-medium dark:text-white">
            ( {imageUrls.length} / 10 )
          </span>
        </span>
      </label>

      {imageUrls.length === 0 ? (
        <div className="flex-center w-full mb-2">
          <label className="column-center w-full py-6 border border-dashed border-border dark:border-border-dark rounded-xl cursor-pointer bg-surface-muted dark:bg-surface-muted-dark">
            <div className="column-center">
              <CloudArrowIcon />
              <p className="text-sm text-label-secondary/60 dark:text-label-secondary-dark/60 font-semibold">
                Click to upload Image
              </p>
            </div>
            <input
              name="file"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="flex flex-nowrap gap-2 overflow-x-auto py-2">
          <div className="flex-center w-20 h-20 border-2 border-border dark:border-border-dark border-dashed rounded-lg cursor-pointer bg-surface-muted dark:bg-surface-muted-dark flex-shrink-0">
            <label className="size-[24px]">
              <CloudArrowIcon />
              <input
                id="image-upload-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {imageUrls.map((image, index) => (
            <div key={index} className="relative flex-shrink-0">
              <img
                src={image}
                alt={`Uploaded ${index}`}
                className="w-20 h-20 object-cover rounded-md border"
              />
              <button
                onClick={() => handleImageRemove(index)}
                className="absolute top-1 right-1 bg-gray-700 text-white rounded-full p-1"
              >
                <CloseIcon className="size-[12px]" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PhotoTalkImageUpload;
