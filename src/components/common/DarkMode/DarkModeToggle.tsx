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
      className="p-3 rounded-xl hover:bg-surface-muted dark:hover:bg-surface-muted-dark"
    >
      {mode === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default DarkModeToggle;
