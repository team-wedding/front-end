interface Props {
  state: boolean;
  setState: (enabled: boolean) => void;
}

const Toggle = ({ state, setState }: Props) => {
  const toggleHandler = () => {
    setState(!state);
  };

  return (
    <button
      onClick={toggleHandler}
      className={`w-10 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${state ? 'bg-rose-300' : 'bg-gray-200'}`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${state ? 'transform translate-x-[13px]' : ''}`}
      ></div>
    </button>
  );
};

export default Toggle;
