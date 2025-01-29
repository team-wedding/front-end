import InformationItem from '@/components/common/CreateInvitation/InformationItem';

const PhotoTalkFeature = () => {
  return (
    <div className="mx-4 my-6">
      <InformationItem messages={['포토톡 기능에서 사용되는 예시입니다.']} />

      <hr />

      <div className="flex flex-col gap-2 my-10">
        <label className="label">예시</label>
        <div>(예시 이미지)</div>
      </div>
    </div>
  );
};

export default PhotoTalkFeature;
