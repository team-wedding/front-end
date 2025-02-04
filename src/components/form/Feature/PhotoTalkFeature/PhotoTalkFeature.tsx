import InformationItem from '@/components/common/CreateInvitation/InformationItem';

const PhotoTalkFeature = () => {
  return (
    <div className="mx-4 my-6">
      <InformationItem
        messages={[
          '실시간 포토월 기능에서 사용되는 예시입니다.',
          '관리자는 비밀번호 없이 방명록을 수정 및 삭제할 수 있습니다.',
        ]}
      />

      <hr />

      <div className="flex flex-col gap-2 my-10">
        <label className="label">예시</label>
        <div>(예시 이미지)</div>
      </div>
    </div>
  );
};

export default PhotoTalkFeature;
