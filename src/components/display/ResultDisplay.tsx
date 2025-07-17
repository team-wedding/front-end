import useThemeStore from '@/store/useThemeStore';
import { useAccordionStore } from '@store/useAccordionStore';

const ResultDisplay = () => {
  const { getSections } = useAccordionStore();
  const { font } = useThemeStore();
  const sections = getSections();

  return (
    <div className={`result-layout ${font}`}>
      {sections.map((section, index) => {
        if (index == 2 || index == 3) {
          return;
        }
        return <div key={index}>{section}</div>;
      })}
      {sections[2]}
      {sections[3]}
    </div>
  );
};

export default ResultDisplay;
