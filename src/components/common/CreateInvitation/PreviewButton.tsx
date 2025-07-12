import logo from '@assets/woogyeol/logo_light.png';
import { Dispatch, SetStateAction } from 'react';

interface PreviewButtonProps {
  update: () => void;
  setPreviewModal: Dispatch<SetStateAction<boolean>>;
}

const PreviewButton = ({ update, setPreviewModal }: PreviewButtonProps) => {
  const handleClick = () => {
    update();
    setPreviewModal(true);
  };

  return (
    <button
      className="flex-center text-base rounded-md p-0 h-auto text-slate-800 hover:bg-white/30 md:hidden transition-colors"
      aria-label="미리보기 버튼"
      onClick={handleClick}
    >
      <img src={logo} alt="로고" className={`w-4 mr-2`} />
      <span>미리보기</span>
    </button>
  );
};

export default PreviewButton;
