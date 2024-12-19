import React from 'react';
import useAddressStore from '../../../store/useAddressStore';

const LocationTitle = () => {
  const { address } = useAddressStore();

  return (
    <div className="column-center gap-2">
      <div className="sub-title">LOCATION</div>
      <div className="title">오시는 길</div>
      <div className="font-normal"> 더라움 1층 1홀</div>
      <div className="text-gray-500 text-sm">
        {address ? address : '(서울 강남구 언주로 564)'}
      </div>
    </div>
  );
};

export default LocationTitle;
