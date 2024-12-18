import React from 'react';
import useImageStore from '../../../store/useImageStore';

const Thumbnail = () => {
  const { uploadedImage } = useImageStore();

  return (
    <div className="w-full flex justify-center">
      {uploadedImage ? (
        <img
          src={uploadedImage}
          alt="Thumbnail"
          className="w-10/12 h-auto rounded-lg"
        />
      ) : (
        <div className="text-gray-500">이미지가 없습니다.</div>
      )}
    </div>
  );
};

export default Thumbnail;
