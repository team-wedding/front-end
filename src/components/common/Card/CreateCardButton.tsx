import logo from '@assets/woogyeol/logo_light.png';
import logoDark from '@assets/woogyeol/logo_dark.png';
import PlusIcon from '@/components/icons/PlusIcon';

const CreateCardButton = () => {
  return (
    <div className="flex-center text-white transition-all duration-200 w-8 hover:-translate-y-0.5 hover:w-9">
      <img src={logo} className="relative block dark:hidden" />
      <img src={logoDark} className="relative hidden dark:block" />
      <div className="absolute">
        <PlusIcon />
      </div>
    </div>
  );
};

export default CreateCardButton;
