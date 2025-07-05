import { useCallback } from 'react';

interface useNavigationHandlerProps {
  address: string;
  lat: number;
  lng: number;
}

export const useNavigationHandler = ({
  address,
  lat,
  lng,
}: useNavigationHandlerProps) => {
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad/i.test(navigator.userAgent);
  const encodedName = encodeURIComponent(address);

  const handleNavigation = useCallback(
    (key: string) => {
      let url = '';
      let fallbackUrl = '';

      switch (key) {
        case 'navigationTmap':
          const tmapKey = import.meta.env.VITE_TMAP_APP_KEY;

          if (isAndroid) {
            url = `intent://routes?appKey=${tmapKey}&endX=${lng}&endY=${lat}&endName=${encodedName}#Intent;scheme=tmap;package=com.skt.tmap.ku;end`;
          } else if (isIOS) {
            url = `tmap://route?appKey=${tmapKey}&endX=${lng}&endY=${lat}&endName=${encodedName}`;
            fallbackUrl = `https://apps.apple.com/kr/app/id431589174`;
          } else {
            alert('Tmap은 모바일에서만 사용 가능합니다.');
            return;
          }
          break;

        case 'navigationNaver':
          if (isAndroid) {
            url = `intent://route/public?dlat=${lat}&dlng=${lng}&dname=${encodedName}&appname=woogyeol.web.app#Intent;scheme=nmap;package=com.nhn.android.nmap;end`;
          } else if (isIOS) {
            url = `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${encodedName}&appname=woogyeol.web.app`;
            fallbackUrl = `https://apps.apple.com/kr/app/id311867728`;
          } else {
            url = `https://map.naver.com/v5/search/${encodedName}`;
          }
          break;

        case 'navigationKakao':
          if (isAndroid) {
            url = `intent://navigate?name=${address}&x=${lng}&y=${lat}&coord_type=wgs84#Intent;scheme=kakaonavi;package=com.locnall.KimGiSa;end`;
          } else if (isIOS) {
            url = `kakaonavi://navigate?name=${address}&x=${lng}&y=${lat}&coord_type=wgs84`;
            fallbackUrl = `https://apps.apple.com/kr/app/id417698849`;
          } else {
            url = `https://map.kakao.com/link/search/${address}`;
          }
          break;

        default:
          return;
      }

      if (isMobile) {
        window.location.href = url;

        if (isIOS && fallbackUrl) {
          setTimeout(() => {
            window.location.href = fallbackUrl;
          }, 1500);
        }
      } else {
        if (fallbackUrl || url.startsWith('http')) {
          window.open(url, '_blank');
        }
      }
    },
    [lat, lng, encodedName, isMobile, isIOS, isAndroid],
  );

  return handleNavigation;
};
