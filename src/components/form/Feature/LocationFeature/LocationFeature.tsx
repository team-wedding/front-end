import { useLocationFeatureStore } from '@store/OptionalFeature/useLocationFeatureStore';
import OnOff from '@common/Toggle/OnOff';
import NavigationItem from './NavigationItem';
import TransportationItem from './TransportationItem';
import InformationItem from '@/components/common/CreateInvitation/InformationItem';

const LocationFeature = () => {
  const { subFeatures, toggleSubFeature } = useLocationFeatureStore();

  return (
    <>
      <InformationItem
        messages={[
          '예식 장소를 나타내고 싶은 기능을 선택해주세요.',
          '내비게이션은 선택한 어플로 안내합니다',
        ]}
      />

      <div className="space-y-2 py-3">
        <div className="py-3 flex items-center space-x-4">
          <label className="font-medium text-slate-500 text-xs">
            지도 이동 및 확대
          </label>
          <OnOff
            state={subFeatures.canMoveMap}
            setState={(enabled: boolean) =>
              toggleSubFeature('canMoveMap', enabled)
            }
          />
        </div>

        <hr />

        <div className="py-3">
          <label className="label">내비게이션 안내</label>
          <NavigationItem />
        </div>

        <hr />

        <div className="py-3">
          <label className="label">교통 수단 안내</label>
          <TransportationItem />
        </div>
      </div>
    </>
  );
};

export default LocationFeature;
