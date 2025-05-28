import { ReactNode } from 'react';
import useDarkMode from '@/hooks/useDarkMode';

interface Props {
  children: ReactNode;
}

const DarkModeProvider = ({ children }: Props) => {
  useDarkMode();
  return <>{children}</>;
};

export default DarkModeProvider;
