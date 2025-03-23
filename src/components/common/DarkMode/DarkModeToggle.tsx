import useDarkMode from '@/hooks/useDarkMode';
import { useDarkModeStore } from '@/store/useDarkModeStore';
import MoonIcon from '@/components/icons/MoonIcon';
import SunIcon from '@/components/icons/SunIcon';

const DarkModeToggle = () => {
  const { mode, setMode } = useDarkModeStore();
  useDarkMode();

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  return (
    <div className="m-4">
      <button
        onClick={toggleMode}
        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {mode === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
};

export default DarkModeToggle;
