import { useUserStore } from '@/store/useUserStore';
import logo from '@assets/woogyeol/preview_light.png';
import { useNavigate } from 'react-router';

interface PreviewButtonProps {
  id?: string;
  update: () => void;
}

const PreviewButton = ({ id, update }: PreviewButtonProps) => {
  const navigate = useNavigate();
  const { id: userId } = useUserStore();

  const handleClick = () => {
    update();
    navigate(id ? `/preview/${userId}/${id}` : '/preview');
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
        className={`h-14 rounded-full shadow-xl backdrop-blur-lg hover:opacity-70`}
      />
      <span className="animate-pulse rounded-md backdrop-blur-lg px-2 py-1 font-light text-xs">
        {'미리보기'}
      </span>
    </button>
  );
};

export default PreviewButton;
