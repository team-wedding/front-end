import React from 'react';
import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

const useKaKaoLoader = () => {
  useKakaoLoaderOrigin({
    appkey: import.meta.env.VITE_JAVSCRIPT_KEY,
    libraries: ['clusterer', 'drawing', 'services'],
  });
};

export default useKaKaoLoader;
