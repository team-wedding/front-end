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
      onClick={(e) => {
        e.stopPropagation();
        toggleHandler();
        e.currentTarget.blur();
      }}
      className={`w-11 h-7 flex items-center rounded-full p-1 transition-all duration-300 ${state ? 'bg-slate-900/80' : 'bg-slate-900/10'}`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${state ? 'transform translate-x-[13px]' : ''}`}
      ></div>
    </button>
  );
};

export default Toggle;
