import React, { useRef, useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '@/components/common/Toast';
import useToast from '@/hooks/useToast';

interface ImageUploaderProps {
  // uploadedImageUrl: string;
  // setUploadedImageUrl: (image: string) => void;
  ImageUrl: string;
  ImageFile: File | null;
  setImageUrl: (url: string) => void;
  setImageFile: (file: File | null) => void;
  maxWidth?: number;
  maxHeight?: number;
  acceptedFormats?: string[];
}

const ImageUploader = ({
  ImageUrl,
  // ImageFile,
  setImageFile,
  setImageUrl,
  maxWidth = 5000,
  maxHeight = 5000,
  acceptedFormats = ['image/svg', 'image/png', 'image/jpg'],
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string>(ImageUrl);
  const [isDragging, setIsDragging] = useState(false);

  const validateImageSize = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const isValid = img.width <= maxWidth && img.height <= maxHeight;
        resolve(isValid);
      };
    });
  };

  const { message, duration, showToast } = useToast();
  const { message, duration, showToast } = useToast();

  const handleImageUpload = async (file: File) => {
    const isValid = await validateImageSize(file);

    if (!isValid) {
      showToast(`이미지 크기는 최대 ${maxWidth}x${maxHeight}px 입니다.`, 3000);
      showToast(`이미지 크기는 최대 ${maxWidth}x${maxHeight}px 입니다.`, 3000);
      return;
    }

    await setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        setUploadedImage(reader.result);
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleImageUpload(file);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      await handleImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleImageDelete = () => {
    setUploadedImage('');
    setImageFile(null);
    setImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  let randomId = Math.random();

  return (
    <div className="flex items-center justify-center max-w-lg mx-auto">
      {/* <ToastContainer position="top-center" autoClose={3000} hideProgressBar /> */}
      {!uploadedImage ? (
        <label
          htmlFor={`dropzone-file-${randomId}`}
          className={`flex flex-col items-center justify-center w-80 h-40 border-2 ${
            isDragging
              ? 'border-rose-300 bg-rose-50'
              : 'border-gray-100 bg-gray-50'
          }  rounded-xl cursor-pointer hover:bg-gray-100`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center text-center py-5 text-[10px] text-gray-400 gap-1">
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
            <p></p>
          </div>
          <input
            id={`dropzone-file-${randomId}`}
            type="file"
            className="hidden"
            onChange={handleFileInputChange}
            ref={fileInputRef}
          />
        </label>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={uploadedImage}
            alt="Uploaded"
            className="h-auto max-w-full border-2 rounded-xl"
          />
          <button
            onClick={handleImageDelete}
            className="mt-4 px-3 py-2 text-[12px] bg-button bg-opacity-80 text-white rounded-xl hover:bg-rose-200"
          >
            삭제
          </button>
        </div>
      )}
      {message && <Toast key={message} message={message} duration={duration} />}
      {message && <Toast key={message} message={message} duration={duration} />}
    </div>
  );
};

export default ImageUploader;
