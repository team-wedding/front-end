import CreateCardButton from '@/components/common/Card/CreateCardButton';
import InputTitleModal from '@/components/common/Modal/InputTitleModal';
import GridIcon from '@/components/icons/GridIcon';
import UserIcon from '@/components/icons/UserIcon';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => setIsModalOpen((prev) => !prev);

  const navItems = [
    { label: 'Card', path: '/dashboard', Icon: GridIcon },
    { label: '', path: '/create', Icon: CreateCardButton },
    { label: 'My', path: '/mypage/rsvp', Icon: UserIcon },
  ];

  const isMyPath = (path: string) => path === '/mypage/rsvp';
  const isActive = (path: string) =>
    isMyPath(path)
      ? location.pathname.startsWith('/mypage')
      : location.pathname === path;

  const handleClick = (path: string) => {
    if (path === '/create') {
      setIsModalOpen((prev) => !prev);
    } else if (isMyPath(path)) {
      if (!location.pathname.startsWith('/mypage')) {
        navigate('/mypage/rsvp');
      }
    } else {
      navigate(path);
    }
  };

  return (
    <div className="relative">
      <div className="fixed bottom-4 left-0 right-0 z-20 m-auto w-fit flex-center bg-black/80 rounded-3xl p-4 shadow-md backdrop-blur-3xl">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item.path)}
            className={`w-14 column-center gap-[2px] text-[8px] font-semibold ${isActive(item.path) ? 'text-white' : 'text-white/30'}`}
          >
            <item.Icon />
            {item.label}
          </button>
        ))}
      </div>

      <div className="absolute top-0">
        {isModalOpen && <InputTitleModal onClose={handleModal} />}
      </div>

      <article className="fixed bottom-0 left-0 right-0 z-10 m-auto  bg-gradient-to-b from-transparent via-[#ffffff]/70 via-50% to-[#ffffff]/100 to-80%  max-w-[520px] h-40"></article>
    </div>
  );
};

export default Navbar;
