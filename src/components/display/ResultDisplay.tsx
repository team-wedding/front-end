import React from 'react';
import CalendarSection from './CalendarSection/CalendarSection';
import LocationSection from './LocationSection/LocationSection';
import ContactSection from './ContactSection/ContactSection';
import ThumbnailSection from './ThumbnailSection.tsx/ThumbnailSection';
import GreetingSection from './GreetingSection.tsx/GreetingSection';
import GallarySection from './GallarySection/Gallary';

const ResultDisplay = () => {
  return (
    <div className="result-layout">
      <ThumbnailSection />
      <GreetingSection />
      <CalendarSection />
      <LocationSection />
      <ContactSection />
      <GallarySection />
    </div>
  );
};

export default ResultDisplay;
