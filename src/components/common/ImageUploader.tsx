import React, { useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '@/components/common/Toast';
import useToast from '@/hooks/useToast';
import { Plus } from 'lucide-react';

interface ImageUploaderProps {
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
  const { message, duration, showToast } = useToast();

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
    setImageFile(null);
    setImageUrl('');
    setUploadedImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  let randomId = Math.random();

  return (
    <div className="flex-center w-full mx-auto">
      {!uploadedImage ? (
        <label
          htmlFor={`dropzone-file-${randomId}`}
          className={`flex-center w-full h-44 cursor-pointer  glass-button ${
            isDragging
              ? 'border-rose-300 bg-rose-50'
              : 'border-gray-100 bg-gray-50'
          }  `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="column-center space-y-3">
            <Plus className="text-slate-500" strokeWidth={1.6} />
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

          <input
            id={`dropzone-file-${randomId}`}
            type="file"
            className="hidden"
            onChange={handleFileInputChange}
            ref={fileInputRef}
          />
        </label>
      ) : (
        <div className="space-y-4 column-center">
          <img
            src={uploadedImage}
            alt="Uploaded"
            className="max-h-96 w-full rounded-xl"
          />

          <button
            onClick={handleImageDelete}
            className="px-4 py-2 glass-button text-slate-900"
          >
            삭제
          </button>
        </div>
      )}
      {message && <Toast key={message} message={message} duration={duration} />}
    </div>
  );
};

export default ImageUploader;
