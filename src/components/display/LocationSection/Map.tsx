import React, { useEffect } from 'react';
import { Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';
import useKaKaoLoader from '../../../hooks/useKaKaoLoader';
import useAddressStore from '../../../store/useAddressStore';

const Map: React.FC = () => {
  const { address, coords, setCoords } = useAddressStore();

  useEffect(() => {
    if (window.kakao && window.kakao.maps && address) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const lat = parseFloat(result[0].y);
          const lng = parseFloat(result[0].x);
          setCoords(lat, lng);
        } else {
          console.error('주소 변환 실패');
        }
      });
    }
  }, [address, setCoords]);

  useKaKaoLoader();

  return (
    <KakaoMap
      id="map"
      center={{
        lat: coords.lat,
        lng: coords.lng,
      }}
      style={{
        width: '100%',
        height: '300px',
      }}
      level={4}
      zoomable={false}
    >
      <MapMarker position={{ lat: coords.lat, lng: coords.lng }}></MapMarker>
    </KakaoMap>
  );
};

export default Map;
