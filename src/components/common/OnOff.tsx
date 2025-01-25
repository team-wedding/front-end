import React from 'react';

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
        onClick={onoffHandler}
        className={`border px-2 py-[3px] rounded-xl text-gray-400 text-[10px] transition-all duration-100 ${state ? 'bg-button bg-opacity-80 text-white border-transparent shadow-sm' : 'bg-neutral-100  border-neutral-200'}`}
      >
        {state ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

export default OnOff;
