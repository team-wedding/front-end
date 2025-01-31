import React, { useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ImageUploaderProps {
  uploadedImage: string;
  setUploadedImage: (image: string) => void;
  maxWidth?: number;
  maxHeight?: number;
  acceptedFormats?: string[];
}

const ImageUploader = ({
  uploadedImage,
  setUploadedImage,
  maxWidth = 5000,
  maxHeight = 5000,
  acceptedFormats = ['image/svg', 'image/png', 'image/jpg'],
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  const handleImageUpload = async (file: File) => {
    const isValid = await validateImageSize(file);

    if (!isValid) {
      toast.error(`이미지 크기는 최대 ${maxWidth}x${maxHeight}px 입니다.`, {
        toastId: 'image-size-error',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        setUploadedImage(reader.result);
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center justify-center max-w-lg mx-auto">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      {!uploadedImage ? (
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-80 h-40 border-2 ${
            isDragging
              ? 'border-rose-300 bg-rose-50'
              : 'border-gray-300 bg-gray-50'
          } border-dashed rounded-xl cursor-pointer hover:bg-gray-100`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center text-center py-5">
            <p className="mb-2 text-xs text-gray-500">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {acceptedFormats
                .join(', ')
                .replace(/image\//g, '')
                .toUpperCase()}{' '}
              (MAX. {maxWidth}x{maxHeight}px)
            </p>
          </div>
          <input
            id="dropzone-file"
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
    </div>
  );
};

export default ImageUploader;
