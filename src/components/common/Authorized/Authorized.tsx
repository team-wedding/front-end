import { useUserStore } from '@/store/useUserStore';
import useAuthStore from '@/store/useAuthStore';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

export default function Authorized({
  children,
}: {
  children: React.ReactNode;
}) {
  const EXCLUDED_PATHS = ['/', '/login', '/signup', '/result'];
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);
  const token = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const isExcluded = EXCLUDED_PATHS.some((path) =>
      currentPath.startsWith(path),
    );

    if (token) {
      fetchUserInfo();
    } else if (!isExcluded) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login', { replace: true });
    }
  }, []);
  return <>{children}</>;
}
