import React from 'react';
import useImageStore from '../../../store/useImageStore';
import thumbnail from '../../../assets/thumbnail.png';

const Image = () => {
  const { uploadedImage } = useImageStore();

  return (
    <div className="flex-center w-full">
      {uploadedImage ? (
        <img src={uploadedImage} alt="Thumbnail" />
      ) : (
        <img src={thumbnail} alt="Thumbnail" />
      )}
    </div>
  );
};

export default Image;
