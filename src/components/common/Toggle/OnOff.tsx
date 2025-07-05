interface Props {
  state: boolean;
  setState: (enabled: boolean) => void;
}

const OnOff = ({ state, setState }: Props) => {
  const onoffHandler = () => {
    setState(!state);
  };
  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onoffHandler();
        }}
        className={`px-4 py-2 text-xs ${state ? 'glass-button-selected' : 'glass-button text-slate-500'}`}
      >
        {state ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

export default OnOff;
