import useThemeStore from '@/store/useThemeStore';
import { useAccordionStore } from '@store/useAccordionStore';

const ResultDisplay = () => {
  const { getSections } = useAccordionStore();
  const { font } = useThemeStore()
  return (
    <div className={`result-layout ${font}`}>
      {getSections().map((section, index) => (
        <div key={index}>{section}</div>
      ))}
    </div>
  )
}

export default ResultDisplay;
