import React from 'react';
import useGreetingStore from '../../../store/useGreetingStore';

const Greeting = () => {
  const { title, greeting } = useGreetingStore();

  return (
    <div>
      <div className="flex justify-center whitespace-pre-wrap text-xl font-semibold mb-4">
        {title}
      </div>
      <div className="flex justify-center text-center whitespace-pre-wrap text-base font-normal">
        {greeting}
      </div>
    </div>
  );
};

export default Greeting;
