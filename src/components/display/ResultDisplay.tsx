import React, { useRef } from 'react';
import CalendarSection from './CalendarSection/CalendarSection';
import LocationSection from './LocationSection/LocationSection';
import ContactSection from './ContactSection/ContactSection';
import ThumbnailSection from './ThumbnailSection.tsx/ThumbnailSection';
import GreetingSection from './GreetingSection.tsx/GreetingSection';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const ResultDisplay = () => {
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const thumbnailInView = useScrollAnimation(thumbnailRef, 0.2);
  const greetingInView = useScrollAnimation(greetingRef, 0.2);
  const calendarInView = useScrollAnimation(calendarRef, 0.2);
  const locationInView = useScrollAnimation(locationRef, 0.2);
  const contactInView = useScrollAnimation(contactRef, 0.2);

  // const ref = useRef<HTMLDivElement>(null);
  // const inView = useScrollAnimation(ref, 0.5);

  return (
    <div className="result-layout">
      <div
        ref={thumbnailRef}
        className={`transition-all duration-500 ${thumbnailInView ? 'animate-fadeInUpDelay' : 'opacity-0'}`}
      >
        <ThumbnailSection />
      </div>
      <div
        ref={greetingRef}
        className={`transition-all duration-500 ${greetingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <GreetingSection />
      </div>
      <div
        ref={calendarRef}
        className={`transition-all duration-500 ${calendarInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <CalendarSection />
      </div>
      <div
        ref={locationRef}
        className={`transition-all duration-500 ${locationInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <LocationSection />
      </div>
      <div
        ref={contactRef}
        className={`transition-all duration-500 ${contactInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <ContactSection />
      </div>
    </div>
  );
};

export default ResultDisplay;
