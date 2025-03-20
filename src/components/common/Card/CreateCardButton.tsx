import logo from '@assets/woogyeol/logo_dark.png';
import PlusIcon from '@/components/icons/PlusIcon';

const CreateCardButton = () => {
  return (
    <div className="flex-center">
      <button className="flex-center text-white  transition-all duration-200 w-8 hover:-translate-y-0.5 hover:w-9">
        <img src={logo} className="relative" />
        <div className="absolute">
          <PlusIcon />
        </div>
      </button>
    </div>
  );
};

export default CreateCardButton;
