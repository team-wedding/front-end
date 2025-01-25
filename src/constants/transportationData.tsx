import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import DirectionsSubwayFilledRoundedIcon from '@mui/icons-material/DirectionsSubwayFilledRounded';
import DirectionsBusFilledRoundedIcon from '@mui/icons-material/DirectionsBusFilledRounded';
import { StoreState } from '../store/OptionalFeature/useLocationFeatureStore';

interface transportationItemData {
  key: keyof StoreState['subFeatures'];
  inputKey: keyof StoreState['transportationInputs'];
  title: string;
  icon?: React.ReactNode;
}

export const transportationData: transportationItemData[] = [
  {
    key: 'transportationCar',
    inputKey: 'car',
    title: '자차',
    icon: (
      <DirectionsCarRoundedIcon fontSize="small" className="text-neutral-500" />
    ),
  },
  {
    key: 'transportationSubway',
    inputKey: 'subway',
    title: '지하철',
    icon: (
      <DirectionsSubwayFilledRoundedIcon
        fontSize="small"
        className="text-neutral-500"
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
        className="text-neutral-500"
      />
    ),
  },
];
