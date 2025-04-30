import { useState } from 'react';
import { useLocationFeatureStore } from '../../../../store/OptionalFeature/useLocationFeatureStore';
import OnOff from '@common/Toggle/OnOff';
import TextEditor from '../../../common/TextEditor';
import { transportationData } from '../../../../constants/transportationData';

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
    <div
      className="flex flex-col gap-2 
    my-6 mx-2 transition-all duration-200"
    >
      {transportationData.map(({ key, inputKey, title }) => (
        <div
          key={key}
          className={`border py-2 px-6 rounded-2xl hover:ring-1 hover:ring-black ${openAccordion === key && 'bg-neutral-100 bg-opacity-30 ring-1 ring-black shadow-md'}`}
        >
          <div
            className="flex items-center justify-between"
            onClick={() => toggleAccordion(key)}
          >
            <div>{title}</div>
            <OnOff
              state={subFeatures[key]}
              setState={(enabled) => toggleSubFeature(key, enabled)}
            />
          </div>
          {openAccordion === key && (
            <div className="my-6">
              <TextEditor
                value={transportationInputs[inputKey]}
                setValue={(value) => updateTransportationInput(inputKey, value)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TransportationItem;
