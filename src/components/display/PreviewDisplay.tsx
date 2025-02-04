import useThemeStore from '@/store/useThemeStore';
import { useAccordionStore } from '@store/useAccordionStore';

const PreviewDisplay = () => {
  const { getSections } = useAccordionStore();
  const { font } = useThemeStore()
  return (
    <div className={`result-layout font-${font}`}>
      {getSections().map((section, index) => (
        <div key={index}>{section}</div>
      ))}
    </div>
  );
};

export default PreviewDisplay;
