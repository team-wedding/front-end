import { useLocationFeatureStore } from '@store/OptionalFeature/useLocationFeatureStore';
import { navigationData } from '@constants/navigationData';

const NavigationItem = () => {
  const { subFeatures, toggleSubFeature } = useLocationFeatureStore();

  return (
    <div className="flex-center gap-2 text-gray-400 text-[10px] my-6">
      {navigationData.map(({ key, title }) => (
        <button
          key={key}
          className={`select-btn ${subFeatures[key] && 'active-btn'}`}
          onClick={() => toggleSubFeature(key, !subFeatures[key])}
        >
          {title}
        </button>
      ))}
    </div>
  );
};

export default NavigationItem;
