import { useLocationFeatureStore } from '@store/OptionalFeature/useLocationFeatureStore';
import OnOff from '@common/Toggle/OnOff';
import NavigationItem from './NavigationItem';
import TransportationItem from './TransportationItem';
import InformationItem from '@/components/common/CreateInvitation/InformationItem';

const LocationFeature = () => {
  const { subFeatures, toggleSubFeature } = useLocationFeatureStore();

  return (
    <div className="text-[11px] mx-4">
      <InformationItem
        messages={[
          '예식 장소를 나타내고 싶은 기능을 선택해주세요.',
          '내비게이션은 선택한 어플로 안내합니다',
        ]}
      />

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
        <NavigationItem />
      </div>

      <hr />

      <div className="my-6">
        <div>교통 수단 안내</div>
        <TransportationItem />
      </div>
    </div>
  );
};

export default LocationFeature;
