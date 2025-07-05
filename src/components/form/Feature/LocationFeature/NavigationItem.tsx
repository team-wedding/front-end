import { useLocationFeatureStore } from '@store/OptionalFeature/useLocationFeatureStore';
import { navigationData } from '@constants/navigationData';

const NavigationItem = () => {
  const { subFeatures, toggleSubFeature } = useLocationFeatureStore();

  return (
    <div className="flex-center gap-2 text-sm py-3">
      {navigationData.map(({ key, title }) => (
        <button
          key={key}
          className={`px-4 py-3 ${subFeatures[key] ? 'glass-button-selected' : 'glass-button text-slate-500'}`}
          onClick={() => toggleSubFeature(key, !subFeatures[key])}
        >
          {title}
        </button>
      ))}
    </div>
  );
};

export default NavigationItem;
