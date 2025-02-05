import { useState } from 'react';
import ChevronLeft from '@icons/Chevron_LeftIcon';
import ChevronRight from '@icons/Chevron_RightIcon';
import CloseIcon from '@/components/icons/CloseIcon';
import { useLocation } from 'react-router';
import { useOptionalFeatureStore } from '@/store/OptionalFeature/useOptionalFeatureStore';
import useGalleryStore from '@/store/OptionalFeature/useGalleryFeatureStore';
import SectionTitle from '@/components/common/SectionTitle';

export default function GallerySection() {
  const { galleryImages, grid } = useGalleryStore();

  const [modal, setModal] = useState(false);
  const { pathname } = useLocation();
  const isPreview = pathname === '/create' || pathname === '/preview';

  const handleModal = (index: number) => {
    //수정페이지 pathname 확인
    if (!isPreview) {
      setModal(!modal);
      setImageIndex(index);
    }
  };
  const [imageIndex, setImageIndex] = useState(0);
  const handlePrev = () => {
    if (imageIndex == 0) {
      setImageIndex(galleryImages.length - 1);
    } else setImageIndex((prev: number) => prev - 1);
  };
  const handleNext = () => {
    if (imageIndex == galleryImages.length - 1) {
      setImageIndex(0);
    } else setImageIndex((prev: number) => prev + 1);
  };

  const { selectedOptionalFeatures } = useOptionalFeatureStore();
  const isGalleryFeatureActive = selectedOptionalFeatures.gallery;

  return (
    isGalleryFeatureActive && (
      <div className="w-full h-fit py-36">
        <SectionTitle subTitle="GALLERY" title="갤러리" />
        {galleryImages ? (
          grid ? (
            <section
              className={`relative w-full grid grid-cols-3 mt-8  ${isPreview ? 'gap-2 ' : 'gap-y-3 px-2'}  justify-items-center items-center`}
            >
              {galleryImages.map((value, index) => {
                return (
                  <button
                    key={index}
                    className="rounded-md w-24 h-32"
                    onClick={() => handleModal(index)}
                  >
                    <img
                      key={index}
                      src={value}
                      alt=""
                      className="rounded-md size-full object-center"
                    />
                  </button>
                );
              })}
              {modal && (
                <button
                  className="absolute top-2 right-2 z-10"
                  onClick={() => handleModal(0)}
                >
                  <CloseIcon className="text-white hover:bg-gray-400 rounded-full" />
                </button>
              )}
              {modal && (
                <div className="absolute flex flex-row gap-4 justify-center items-center bg-black/70 size-full">
                  <button
                    onClick={handlePrev}
                    className="bg-white h-6 rounded-full flex items-center justify-center"
                  >
                    <ChevronLeft />
                  </button>
                  <img
                    src={galleryImages[imageIndex]}
                    alt="gallery-image"
                    className="w-72 rounded-md"
                  />
                  <button
                    onClick={handleNext}
                    className="bg-white h-6 rounded-full flex items-center justify-center"
                  >
                    <ChevronRight />
                  </button>
                </div>
              )}
            </section>
          ) : (
            <section className="flex flex-col w-full h-fit gap-2 px-3 justify-around items-center">
              <div className="w-full h-96 mt-10">
                <img
                  src={galleryImages[imageIndex]}
                  alt=""
                  className="size-full rounded-md"
                />
              </div>
              <div className="flex flex-row  gap-4 justify-center py-2 px-3 text-gray-400">
                <button onClick={handlePrev}>
                  <ChevronLeft className="" />
                </button>
                <div>{`${imageIndex + 1} / ${galleryImages.length}`}</div>
                <button onClick={handleNext}>
                  <ChevronRight className="" />
                </button>
              </div>
            </section>
          )
        ) : (
          <div>NO IMAGES UPLOADED YET</div>
        )}
      </div>
    )
  );
}
