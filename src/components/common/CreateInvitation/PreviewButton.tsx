import logo from '@assets/woogyeol/preview_light.png';
import { useNavigate } from 'react-router';

interface PreviewButtonProps {
  id?: string;
  isSaving: boolean
  update: () => void
}

const PreviewButton = ({ id, isSaving, update }: PreviewButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    update();
    if (!isSaving) {
      navigate(id ? `/preview/${id}` : '/preview');
    }
  };


  return (
    <button
      className="column-center rounded-full"
      aria-label="미리보기 버튼"
      onClick={handleClick}
    >
      <img
        src={logo}
        alt="로고"
        className={`h-14 rounded-full shadow-xl backdrop-blur-lg hover:opacity-70 ${isSaving && 'animate-spin'}`}
      />
      <span className="animate-pulse rounded-md backdrop-blur-lg px-2 py-1 font-light text-xs">
        {isSaving ? '자동저장' : '미리보기'}
      </span>
    </button>
  );
};

export default PreviewButton;
