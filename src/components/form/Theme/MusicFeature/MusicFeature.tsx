import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import MusicItem from './MusicItem';

const MusicFeature = () => {
  return (
    <div>
      <div className="text-[11px] mx-4 mt-4">
        {/* 안내문 */}
        <InformationItem
          messages={['선택한 음악은 완성본에서 자동으로 재생됩니다.']}
        />

        <hr />
        <MusicItem />
      </div>
    </div>
  );
};

export default MusicFeature;
