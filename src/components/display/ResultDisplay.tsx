import { useAccordionStore } from '@store/useAccordionStore';

const ResultDisplay = () => {
  const { getSections } = useAccordionStore();

  return (
    <div className="result-layout">
      {getSections().map((section, index) => (
        <div key={index}>{section}</div>
      ))}
    </div>
  );
};

export default ResultDisplay;
