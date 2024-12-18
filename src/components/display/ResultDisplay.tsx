import React from 'react';
import CalendarSection from './CalendarSection/CalendarSection';
import LocationSection from './LocationSection/LocationSection';
import ContactSection from './ContactSection/ContactSection';

const ResultDisplay = () => {
  return (
    <div className="result-layout">
      {/* 예식 날짜, 요일 */}
      {/* 대표이미지 */}
      {/* 제목, 인사말 */}

      <CalendarSection />
      <LocationSection />
      <ContactSection />

      {/* 참석 의사 전달 */}
      {/* 공유하기 */}
    </div>
  );
};

export default ResultDisplay;
