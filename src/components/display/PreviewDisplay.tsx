import { useAccordionStore } from '@store/useAccordionStore';

const PreviewDisplay = () => {
  const { getSections } = useAccordionStore();

  return (
    <div className="result-layout">
      {getSections().map((section, index) => (
        <div key={index}>{section}</div>
      ))}
    </div>
  );
};

export default PreviewDisplay;
