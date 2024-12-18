import React from 'react';
import useGreetingStore from '../../../store/useGreetingStore';

const Greeting = () => {
  const { title, greeting } = useGreetingStore();

  return (
    <div>
      <label className="flex justify-center whitespace-pre-wrap text-xl font-semibold mb-4">
        {title}
      </label>
      <label className="flex justify-center text-center whitespace-pre-wrap text-base font-normal">
        {greeting}
      </label>
    </div>
  );
};

export default Greeting;
