import React from 'react';
import useBrideGroomStore from '../../../store/useBrideGroomStore';

const BrideGroomName = () => {
  const brideGroom = useBrideGroomStore((state) => state.brideGroom);

  return (
    <div>
      <div className="flex justify-center">
        {brideGroom.map((person, index) => (
          <label key={index} className="text-lg">
            <label className="m-1">{person.name}</label>
            {index < brideGroom.length - 1 && '♥️'}
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrideGroomName;
