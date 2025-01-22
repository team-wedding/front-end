import React from 'react';
import { useLocationFeatureStore } from '../../../../store/OptionalFeature/useLocationFeatureStore';

const NavigationInput = () => {
  const { subFeatures, toggleSubFeature } = useLocationFeatureStore();

  return (
    <div className="flex-center gap-2 text-gray-400 text-[10px] my-6">
      <button
        className={`select-btn ${subFeatures.navigationTmap ? 'active-btn' : ''}`}
        onClick={() =>
          toggleSubFeature('navigationTmap', !subFeatures.navigationTmap)
        }
      >
        티맵
      </button>
      <button
        className={`select-btn ${subFeatures.navigationNaver ? 'active-btn' : ''}`}
        onClick={() =>
          toggleSubFeature('navigationNaver', !subFeatures.navigationNaver)
        }
      >
        네이버지도
      </button>
      <button
        className={`select-btn ${subFeatures.navigationKakao ? 'active-btn' : ''}`}
        onClick={() =>
          toggleSubFeature('navigationKakao', !subFeatures.navigationKakao)
        }
      >
        카카오내비
      </button>
    </div>
  );
};

export default NavigationInput;
