import { useState, useEffect, useRef } from 'react';
// import usePhotoTalkStore from '@store/usePhotoTalkStore';
import MenuDotsIcon from '@icons/MenuDotsIcon';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PhotoTalk } from '@/types/phototalkType';

interface PhotoTalkCardProps {
  photoTalk: PhotoTalk;
  onEdit: () => void;
  onDelete: () => void;
}

const PhotoTalkCard = ({ photoTalk, onEdit, onDelete }: PhotoTalkCardProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const images = Array.isArray(photoTalk.imageUrl)
    ? photoTalk.imageUrl
    : typeof photoTalk.imageUrl === 'string'
      ? JSON.parse(photoTalk.imageUrl)
      : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex flex-col gap-4 w-full p-8">
      <div className="flex flex-col gap-2 bg-white w-full p-4 rounded-md shadow-md border border-gray-200 relative">
        <div className="absolute top-2 right-3" ref={dropdownRef}>
          <button
            className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none rounded-lg text-sm"
            type="button"
            onClick={() => setOpenDropdown(!openDropdown)}
            aria-label="메뉴 열기"
          >
            <MenuDotsIcon />
          </button>
          {openDropdown && (
            <div className="absolute top-6 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
              <ul className="py-2">
                <li>
                  <button
                    onClick={onEdit}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    aria-label="편집하기"
                  >
                    편집하기
                  </button>
                </li>
                <li>
                  <button
                    onClick={onDelete}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    삭제하기
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="my-5">
          <Slider {...settings}>
            {images.length > 0 &&
              images.map((image: string, index: number) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Uploaded ${index}`}
                    className="h-48 w-full object-cover rounded-md"
                  />
                </div>
              ))}
          </Slider>
        </div>

        <p className="text-gray-700">{photoTalk.message}</p>
        <div className="flex justify-end p-2">
          <span className="font-light px-2">From</span>
          <p className="text-gray-700">{photoTalk.name}</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoTalkCard;
