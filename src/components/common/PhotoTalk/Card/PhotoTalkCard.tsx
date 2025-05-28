import { useState, useEffect, useRef } from 'react';
import MenuDotsIcon from '@icons/MenuDotsIcon';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PhotoTalk } from '@/types/phototalkType';
import { UserMode } from '@/types/users';
import PhotoTalkAction from '@/components/common/PhotoTalk/Action/PhotoTalkAction';
import DOMPurify from 'dompurify';

interface PhotoTalkCardProps {
  userMode: UserMode;
  photoTalk: PhotoTalk;
  isExample: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PhotoTalkCard = ({
  photoTalk,
  isExample,
  onEdit,
  onDelete,
}: PhotoTalkCardProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const images = Array.isArray(photoTalk.imageUrl)
    ? photoTalk.imageUrl
    : typeof photoTalk.imageUrl === 'string'
      ? JSON.parse(photoTalk.imageUrl)
      : [];
  const hasImage = images.length > 0;

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

  const photoTalkMessage = DOMPurify.sanitize(photoTalk.message);

  return (
    <div
      className={`flex-center bg-surface dark:bg-surface-dark w-full rounded-2xl relative mb-3 shadow-custom ${hasImage ? `h-[220px] pb-3` : `h-fit`}`}
    >
      <div ref={dropdownRef}>
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
            <PhotoTalkAction
              userMode={userMode}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        )}

        <div
          className={`${hasImage ? `grid grid-cols-2 place-content-center gap-4 p-4 h-[200px]` : `flex-center`}`}
        >
          {hasImage && (
            <Slider {...settings}>
              {images.map((image: string, index: number) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Uploaded ${index}`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              ))}
            </Slider>
          )}

          <p
            className={`text-label dark:text-label-dark text-xs font-medium leading-relaxed break-keep w-full flex-center text-ellipsis tracking-tight ${hasImage ? 'p-3' : 'p-10'}`}
            dangerouslySetInnerHTML={{ __html: photoTalkMessage }}
          />
        </div>

        <footer className="flex text-gray-500 px-4 py-2 text-xs absolute bottom-1 right-1 font-light">
          <span className="mr-2">From.</span>
          <p>{photoTalk.name}</p>
        </footer>

        {isExample && (
          <footer className="absolute left-0 right-0 -bottom-7 backdrop-blur-xl bg-black/20 p-2 rounded-lg shadow-sm">
            <p className="text-center text-xs text-white font-extralight">
              example
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default PhotoTalkCard;
