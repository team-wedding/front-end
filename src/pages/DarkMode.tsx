import HeaderButton from '@/components/common/Header/HeaderButton';
import BackIcon from '@/components/icons/BackIcon';
import PageLayout from '@/components/layout/PageLayout';
import useDarkMode from '@/hooks/useDarkMode';
import { useDarkModeStore } from '@/store/useDarkModeStore';
import { useNavigate } from 'react-router';

type Mode = 'light' | 'dark' | 'system';

const DarkMode = () => {
  const navigate = useNavigate();
  const { mode, setMode } = useDarkModeStore();
  useDarkMode();

  return (
    <PageLayout
      title="테마 선택하기"
      leftButton={
        <HeaderButton onClick={() => navigate('/mypage')}>
          <BackIcon />
        </HeaderButton>
      }
    >
      <div className="m-4">
        {['light', 'dark', 'system'].map((themeMode) => (
          <div key={themeMode} className="flex items-center mb-4">
            <input
              type="radio"
              id={themeMode}
              name="darkMode"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked={mode === themeMode}
              onChange={() => setMode(themeMode as Mode)}
            />
            <label
              htmlFor={themeMode}
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {themeMode === 'light'
                ? '라이트 모드'
                : themeMode === 'dark'
                  ? '다크 모드'
                  : '시스템 기본 설정'}
            </label>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default DarkMode;
