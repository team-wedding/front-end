import { useState } from 'react';
import ChevronLeft from '@icons/Chevron_LeftIcon';
import ChevronRight from '@icons/Chevron_RightIcon';
import { useOptionalFeatureStore } from '@store/OptionalFeature/useOptionalFeatureStore';
import useGallaryStore from '@/store/useGallaryStore';

export default function GallerySection() {
  const store = useGallaryStore();
  const images = store.images;
  const grid = store.grid;

  const [imageIndex, setImageIndex] = useState(0);
  const handlePrev = () => {
    if (imageIndex == 0) {
      setImageIndex(images.length - 1);
    } else setImageIndex((prev: number) => prev - 1);
  };
  const handleNext = () => {
    if (imageIndex == images.length - 1) {
      setImageIndex(0);
    } else setImageIndex((prev: number) => prev + 1);
  };

  const { selectedOptionalFeatures } = useOptionalFeatureStore();
  const isGalleryFeatureActive = selectedOptionalFeatures.gallery;

  return (
    <div className="bg-white w-full h-fit p-2">
      {isGalleryFeatureActive &&
        (images ? (
          grid ? (
            <section className="grid grid-cols-3 gap-2">
              {images.map((value, index) => {
                return (
                  <div key={index}>
                    <img src={value} alt="" className="w-24" />
                  </div>
                );
              })}
            </section>
          ) : (
            <section className="flex flex-col w-full h-[300px] justify-around items-center">
              <img src={images[imageIndex]} alt="" className="w-42 h-52" />
              <div className="flex flex-row  gap-4 justify-center">
                <button onClick={handlePrev}>
                  <ChevronLeft />
                </button>
                <div>{`${imageIndex + 1} / ${images.length}`}</div>
                <button onClick={handleNext}>
                  <ChevronRight />
                </button>
              </div>
            </section>
          )
        ) : (
          <div>NO IMAGES UPLOADED YET</div>
        ))}
    </div>
  );
}
