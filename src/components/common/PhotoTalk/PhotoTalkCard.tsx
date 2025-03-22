import { useState, useEffect, useRef } from 'react';
import MenuDotsIcon from '@icons/MenuDotsIcon';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PhotoTalk } from '@/types/phototalkType';

interface PhotoTalkCardProps {
  photoTalk: PhotoTalk;
  onEdit: () => void;
  onDelete: () => void;
  isAdmin: boolean;
}

const PhotoTalkCard = ({
  photoTalk,
  onEdit,
  onDelete,
  isAdmin,
}: PhotoTalkCardProps) => {
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
    arrows: false,
  };

  return (
    // <div className="w-full my-3">
    <div
      className={`flex-center bg-white w-full rounded-2xl relative mb-3 shadow-custom ${images.length > 0 ? `h-[220px] pb-3` : `h-fit`}`}
    >
      <div className={``} ref={dropdownRef}>
        <button
          className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-0 focus:outline-none rounded-lg text-sm absolute top-1 right-4"
          type="button"
          onClick={() => setOpenDropdown(!openDropdown)}
          aria-label="메뉴 열기"
        >
          <MenuDotsIcon />
        </button>

        {openDropdown && (
          <div
            className={`absolute top-8 right-5 z-10 bg-gray-100/20 backdrop-blur-xl divide-y divide-gray-100 rounded-2xl shadow-md w-[30%] px-2 py-1`}
          >
            <ul className="py-2">
              {!isAdmin && (
                <li>
                  <button
                    onClick={onEdit}
                    className="block w-full text-left text-sm text-gray-700 p-2 pl-3 hover:bg-black/5 rounded-2xl"
                    aria-label="편집하기"
                  >
                    편집하기
                  </button>
                </li>
              )}

              <li>
                <button
                  onClick={onDelete}
                  className="block w-full text-left text-sm text-red-500 p-2 pl-3 hover:bg-black/5 rounded-2xl"
                >
                  삭제하기
                </button>
              </li>
            </ul>
          </div>
        )}

        <div
          className={`${images.length > 0 ? `grid grid-cols-2 place-content-center gap-4 p-4 h-[200px]` : `flex-center`}`}
        >
          {images.length > 0 && (
            <Slider {...settings}>
              {images.length > 0 &&
                images.map((image: string, index: number) => (
                  <div key={index} className="">
                    <img
                      src={image}
                      alt={`Uploaded ${index}`}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </div>
                ))}
            </Slider>
          )}
          {/* <Slider {...settings}>
            {images.length > 0 &&
              images.map((image: string, index: number) => (
                <div key={index} className="">
                  <img
                    src={image}
                    alt={`Uploaded ${index}`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              ))}
          </Slider> */}
          <p
            className={`text-black/80 text-xs font-medium leading-relaxed break-keep w-full flex-center text-ellipsis tracking-tight  ${images.length > 0 ? 'p-3' : 'p-10'}`}
          >
            {photoTalk.message}
          </p>
        </div>

        <footer className="flex text-gray-500 px-4 py-1 text-xs absolute bottom-1 right-1 font-light">
          <span className="mr-2">From.</span>
          <p>{photoTalk.name}</p>
        </footer>
      </div>
    </div>
    // </div>
  );
};

export default PhotoTalkCard;
