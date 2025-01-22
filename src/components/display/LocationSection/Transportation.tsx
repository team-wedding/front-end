import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import DirectionsSubwayFilledRoundedIcon from '@mui/icons-material/DirectionsSubwayFilledRounded';
import DirectionsBusFilledRoundedIcon from '@mui/icons-material/DirectionsBusFilledRounded';
import {
  StoreState,
  useLocationFeatureStore,
} from '../../../store/OptionalFeature/useLocationFeatureStore';
import DOMPurify from 'dompurify';

export const transportationData: {
  key: keyof StoreState['subFeatures'];
  inputKey: keyof StoreState['transportationInputs'];
  title: string;
  icon?: React.ReactNode;
}[] = [
  {
    key: 'transportationCar',
    inputKey: 'car',
    title: '자차',
    icon: (
      <DirectionsCarRoundedIcon fontSize="small" className="text-neutral-400" />
    ),
  },
  {
    key: 'transportationSubway',
    inputKey: 'subway',
    title: '지하철',
    icon: (
      <DirectionsSubwayFilledRoundedIcon
        fontSize="small"
        className="text-neutral-400"
      />
    ),
  },
  {
    key: 'transportationBus',
    inputKey: 'bus',
    title: '버스',
    icon: (
      <DirectionsBusFilledRoundedIcon
        fontSize="small"
        className="text-neutral-400"
      />
    ),
  },
];

const Transportation = () => {
  const { subFeatures, transportationInputs } = useLocationFeatureStore();

  const enabledNavigation = transportationData.filter(
    ({ key }) => subFeatures[key],
  );
  if (enabledNavigation.length === 0) {
    return null;
  }

  console.log(transportationInputs);

  return (
    <div className="flex flex-col py-14 px-10 gap-6 bg-neutral-200 bg-opacity-50 text-xs">
      <div className="flex flex-col gap-6">
        {transportationData.map(
          ({ key, inputKey, title, icon }) =>
            subFeatures[key] && (
              <div key={key}>
                <div className="flex items-center gap-2">
                  {icon}
                  <div className="font-medium text-neutral-800">{title}</div>
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(transportationInputs[inputKey]),
                  }}
                  className="py-6 my-6 bg-neutral-50 rounded-md px-4"
                ></div>
                <hr className="border-neutral-300" />
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default Transportation;
