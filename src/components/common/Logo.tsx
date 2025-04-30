import useDarkMode from '@/hooks/useDarkMode';
import logo from '@/assets/woogyeol/logo_light.png';
import logoDark from '@/assets/woogyeol/logo_dark.png';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  const isDark = useDarkMode();
  const logoSrc = isDark === 'dark' ? logoDark : logo;

  return <img alt="WooGyeol" src={logoSrc} className={` ${className}`} />;
};

export default Logo;
