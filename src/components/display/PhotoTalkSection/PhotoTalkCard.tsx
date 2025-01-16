import { useState, useRef, useEffect } from 'react';
import usePhotoTalkStore from '../../../store/usePhotoTalkStore';
import { PhotoTalk } from '../../../store/usePhotoTalkStore';
import MenuDotsIcon from '../../icons/MenuDotsIcon';

interface PhotoTalkCardProps {
  onEdit: (photoTalk: PhotoTalk) => void;
}

const PhotoTalkCard = ({ onEdit }: PhotoTalkCardProps) => {
  const { photoTalks } = usePhotoTalkStore();
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null,
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full p-8">
      {photoTalks.map((talk, index) => (
        <div
          key={talk.id}
          className="flex flex-col gap-2 bg-white w-full p-4 rounded-md shadow-md border border-gray-200 relative"
        >
          <div className="absolute top-2 right-3" ref={dropdownRef}>
            <button
              className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm"
              type="button"
              onClick={() => toggleDropdown(index)}
            >
              <span className="sr-only">Open dropdown</span>
              <MenuDotsIcon />
            </button>

            {openDropdownIndex === index && (
              <div className="absolute top-6 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() => onEdit(talk)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      편집하기
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="flex gap-2 my-4 overflow-x-auto">
            {talk.images.map((image, imgIndex) => (
              <img
                key={imgIndex}
                src={image}
                alt={`Uploaded ${imgIndex}`}
                className="w-20 h-20 object-cover rounded-md border"
              />
            ))}
          </div>

          <p className="text-gray-700">{talk.content}</p>
          <div className="flex justify-end p-2">
            <span className="font-light px-2">From</span>
            <p className="text-gray-700">{talk.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoTalkCard;
