import { useDarkModeStore } from '@/store/useDarkModeStore';
import MoonIcon from '@/components/icons/MoonIcon';
import SunIcon from '@/components/icons/SunIcon';

const DarkModeToggle = () => {
  const { mode, setMode } = useDarkModeStore();

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  return (
    <button
      onClick={toggleMode}
      className="p-3 rounded dark:bg-black/30 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {mode === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default DarkModeToggle;
