import { useState } from 'react';
import { useLocationFeatureStore } from '../../../../store/OptionalFeature/useLocationFeatureStore';
import OnOff from '@common/Toggle/OnOff';
import { transportationData } from '../../../../constants/transportationData';
import TipTapEditor from '@/components/common/Editor/TiptapEditor';

const TransportationItem = () => {
  const {
    subFeatures,
    transportationInputs,
    updateTransportationInput,
    toggleSubFeature,
  } = useLocationFeatureStore();

  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (accordionKey: string) => {
    setOpenAccordion((prev) => (prev === accordionKey ? null : accordionKey));
  };

  return (
    <div className="space-y-2 py-3 transition-all duration-200">
      {transportationData.map(({ key, inputKey, title }) => (
        <div
          key={key}
          className={`py-3 px-6 rounded-3xl ${openAccordion === key ? 'glass-button-selected' : 'glass-button'}`}
        >
          <div
            className="flex items-center justify-between"
            onClick={() => toggleAccordion(key)}
          >
            <div className="text-slate-700 text-base">{title}</div>
            <OnOff
              state={subFeatures[key]}
              setState={(enabled: boolean) => toggleSubFeature(key, enabled)}
            />
          </div>

          {openAccordion === key && (
            <div className="my-4">
              <TipTapEditor
                content={transportationInputs[inputKey] || ''}
                onChange={(value) => {
                  updateTransportationInput(inputKey, value);
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TransportationItem;
