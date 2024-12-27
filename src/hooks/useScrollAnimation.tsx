import { RefObject, useEffect, useState } from 'react';

/**
 * @param ref - DOM 요소를 참조하는 리액트 객체, 어떤 요소를 관찰할지 정한다
 * @param threshold - 요소가 뷰포트에 얼마나 보이는지를 결정하는 기준, 얼마나 보이면 관찰 상태로 간주할지 설정 (0.5 = 50% 이상 보이면 콜백이 호출)
 * @returns inView - boolean 값
 */

const useScrollAnimation = (ref: RefObject<HTMLElement>, threshold = 1) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      // 콜백, 요소가 뷰포트와 교차 상태인지 확인
      ([entry]) => {
        setInView(entry.isIntersecting);
        console.log(entry);
      },
      { threshold },
    );

    observer.observe(ref.current);

    // 클린업 함수, 관찰 중지
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return inView;
};

export default useScrollAnimation;
