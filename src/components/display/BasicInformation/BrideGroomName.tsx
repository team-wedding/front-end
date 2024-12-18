import React from 'react';
import useBrideGroomStore from '../../../store/useBrideGroomStore';

const BrideGroomName = () => {
  const brideGroom = useBrideGroomStore((state) => state.brideGroom);

  return (
    <div>
      <div className="flex justify-center">
        {brideGroom.map((person, index) => (
          <div key={index} className="text-lg">
            <div className="m-1">{person.name}</div>
            {index < brideGroom.length - 1 && '♥️'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrideGroomName;
