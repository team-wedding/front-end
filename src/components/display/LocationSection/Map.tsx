import { useEffect, useState } from 'react';
import { Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';
import useKaKaoLoader from '../../../hooks/useKaKaoLoader';
import useAddressStore from '../../../store/useAddressStore';
import { useLocationFeatureStore } from '../../../store/OptionalFeature/useLocationFeatureStore';

const Map = () => {
  const { subFeatures } = useLocationFeatureStore();
  const { address, coords, setCoords } = useAddressStore();
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [zoomControl, setZoomControl] = useState<kakao.maps.ZoomControl | null>(
    null,
  );

  useKaKaoLoader();

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

  // 지도에 컨트롤 도구 올리기
  useEffect(() => {
    if (!map) return;

    if (!zoomControl) {
      const control = new window.kakao.maps.ZoomControl();
      setZoomControl(control);
    }

    if (zoomControl) {
      return subFeatures.canMoveMap
        ? map.addControl(
            zoomControl,
            window.kakao.maps.ControlPosition.TOPRIGHT,
          )
        : map.removeControl(zoomControl);
    }
  }, [map, subFeatures.canMoveMap, zoomControl]);

  return (
    <KakaoMap
      id="map"
      center={{
        lat: coords.lat,
        lng: coords.lng,
      }}
      style={{
        width: '384px',
        height: '300px',
      }}
      level={4}
      minLevel={8}
      zoomable={subFeatures.canMoveMap}
      draggable={subFeatures.canMoveMap}
      onCreate={(map) => setMap(map)}
    >
      <MapMarker position={{ lat: coords.lat, lng: coords.lng }}></MapMarker>
    </KakaoMap>
  );
};

export default Map;
