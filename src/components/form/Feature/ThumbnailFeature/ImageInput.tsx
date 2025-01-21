import React, { useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useImageStore from '../../../../store/useImageStore';

const ImageInput = () => {
  const { uploadedImage, setUploadedImage } = useImageStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const MAX_WIDTH = 2000;
  const MAX_HEIGHT = 2000;

  const [isDragging, setIsDragging] = useState(false);

  const validateImageSize = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const isValid = img.width <= MAX_WIDTH && img.height <= MAX_HEIGHT;
        resolve(isValid);
      };
    });
  };

  const handleImageUpload = async (file: File) => {
    const isValid = await validateImageSize(file);
    if (!isValid) {
      toast.error(`이미지 크기는 최대 ${MAX_WIDTH}x${MAX_HEIGHT}px 입니다.`, {
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
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center justify-center max-w-lg mx-auto p-4">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      {!uploadedImage ? (
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-80 h-40 border-2 ${
            isDragging
              ? 'border-primary bg-pink-100'
              : 'border-gray-300 bg-gray-50'
          } border-dashed rounded-xl cursor-pointer hover:bg-gray-100`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-xs text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">
              SVG, PNG, JPG or GIF (MAX. 2000x2000px)
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
            className="h-auto max-w-full"
          />
          <button
            onClick={handleImageDelete}
            className="mt-4 px-3 py-2 text-[10px] text-white bg-primary rounded-xl hover:opacity-70"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
