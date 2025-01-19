import { useState } from 'react';

const Toggle = () => {
  const [on, setOn] = useState(false);

  const toggleHandler = () => {
    setOn(!on);
  };

  return (
    <button
      onClick={toggleHandler}
      className={`w-10 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${on ? 'bg-rose-300' : 'bg-gray-200'}`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${on ? 'transform translate-x-[13px]' : ''}`}
      ></div>
    </button>
  );
};

export default Toggle;
