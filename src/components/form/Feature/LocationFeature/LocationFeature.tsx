import { useLocationFeatureStore } from '../../../../store/OptionalFeature/useLocationFeatureStore';
import OnOff from '../../../common/OnOff';
import NavigationInput from './NavigationInput';
import TransportationInput from './TransportationInput';

const LocationFeature = () => {
  const { subFeatures, toggleSubFeature } = useLocationFeatureStore();

  return (
    <div className="text-[11px] mx-4 mt-4">
      {/* 안내문 */}
      <div className="max-w-sm mx-auto text-[9px] text-gray-400 opacity-80 m-6">
        <div className="flex items-start gap-1">
          <span className="text-gray-400">ⓘ</span>
          <span>예식 장소를 나타내고 싶은 기능을 선택해주세요.</span>
        </div>
        <div className="flex items-start gap-1">
          <span className="text-gray-400">ⓘ</span>
          <span>내비게이션은 선택한 어플로 안내합니다</span>
        </div>
      </div>

      <hr />

      <div className="flex items-center gap-3 my-6">
        <div>지도 이동 및 확대</div>
        <OnOff
          state={subFeatures.canMoveMap}
          setState={(enabled) => toggleSubFeature('canMoveMap', enabled)}
        />
      </div>

      <hr />

      <div className="my-6">
        <div>내비게이션 안내</div>
        <NavigationInput />
      </div>

      <hr />

      <div className="my-6">
        <div>교통 수단 안내</div>
        <TransportationInput />
      </div>
    </div>
  );
};

export default LocationFeature;
