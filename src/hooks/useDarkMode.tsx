import { useDarkModeStore } from '@/store/useDarkModeStore';
import { useEffect } from 'react';

const useDarkMode = () => {
  const { mode } = useDarkModeStore();

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else if (mode === 'light') {
      root.classList.remove('dark');
    }
  }, [mode]);
};

export default useDarkMode;
