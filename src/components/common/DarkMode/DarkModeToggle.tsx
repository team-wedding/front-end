import useDarkMode from '@/hooks/useDarkMode';
import { useDarkModeStore } from '@/store/useDarkModeStore';
import MoonIcon from '@/components/icons/MoonIcon';
import SunIcon from '@/components/icons/SunIcon';

const DarkModeToggle = () => {
  const { mode, setMode } = useDarkModeStore();
  useDarkMode();

  return (
    <div className="m-4">
      <button
        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
        className="p-2 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {mode === 'light' ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};

export default DarkModeToggle;
