import { useLocation, useNavigate } from 'react-router';
import UserIcon from '@icons/UserIcon';
import GridIcon from '@icons/GridIcon';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: '대시보드', path: '/dashboard', Icon: GridIcon },
    { label: '마이페이지', path: '/mypage', Icon: UserIcon },
  ];

  return (
    <div className="flex items-center w-full max-w-md justify-between">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`w-full column-center hover:text-primary ${isActive ? 'text-primary font-medium' : 'text-gray-400'}`}
          >
            <item.Icon />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default Footer;
