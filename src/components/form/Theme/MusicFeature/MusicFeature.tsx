import MusicItem from './MusicItem';

const MusicFeature = () => {
  return (
    <div>
      <div className="text-[11px] mx-4 mt-4">
        {/* 안내문 */}
        <div className="max-w-sm mx-auto text-[9px] text-gray-400 opacity-80 m-6">
          <div className="flex items-start gap-1">
            <span className="text-gray-400">ⓘ</span>
            <span>선택한 음악은 완성본에서 자동으로 재생됩니다.</span>
          </div>
        </div>
        <hr />
        <MusicItem />
      </div>
    </div>
  );
};

export default MusicFeature;
