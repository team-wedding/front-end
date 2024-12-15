import React, { useRef } from 'react';
import { create } from 'zustand';

type StoreState = {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
};

const useImageStore = create<StoreState>((set) => ({
  uploadedImage: null,
  setUploadedImage: (image) => set({ uploadedImage: image }),
}));

const ImageUpload = () => {
  const { uploadedImage, setUploadedImage } = useImageStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          setUploadedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    alert('저장 완료');
  };

  return (
    <div>
      {!uploadedImage ? (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            style={{ marginBottom: '10px' }}
          />
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '10px' }}>
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{
                maxWidth: '100%',
                height: 'auto',
                border: '1px solid #ddd',
                borderRadius: '10px',
              }}
            />
          </div>
          <button onClick={handleImageDelete}>삭제</button>
        </div>
      )}
      <button onClick={handleSubmit}>저장</button>
    </div>
  );
};

export default ImageUpload;
