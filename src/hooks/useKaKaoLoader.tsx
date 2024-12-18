import React from 'react';
import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

const useKaKaoLoader = () => {
  useKakaoLoaderOrigin({
    appkey: '72880e700c7ae990a1b46adf720794c5',
    libraries: ['clusterer', 'drawing', 'services'],
  });
};

export default useKaKaoLoader;
