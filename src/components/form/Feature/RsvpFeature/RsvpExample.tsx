import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import useRSVPStore from '@/store/useRSVPStore';




const RsvpExample = () => {
  const {
    rsvpTitle,
    rsvpDescription,
    rsvpIncludeMeal,
    rsvpIncludePopulation,
    setRSVPonChange,
    setRSVPIncludeMeal,
    setRSVPIncludePopulation,
  } = useRSVPStore();

  return (
    <div className="mx-4 my-6 text-xs">
      <InformationItem
        messages={[
          '결혼식 당일의 구체적인 계획에 도움을 받을 수 있습니다.',
          '제출된 답변은 마이페이지에서 확인할 수 있습니다.',
        ]}
      />
      <hr />
      <div className="flex flex-col gap-5 my-10">
        <div className="flex flex-col gap-2">
          <label className="label w-full">제목</label>
          <input
            onChange={setRSVPonChange}
            name="rsvpTitle"
            type="text"
            value={rsvpTitle}
            placeholder="제목을 입력해주세요"
            className="formInput w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label w-full">내용</label>
          <textarea
            onChange={setRSVPonChange}
            name="rsvpDescription"
            value={rsvpDescription}
            className="resize-none px-2 p-3 text-[10px] leading-3 rounded-md border border-gray-300 shadow-md"
            placeholder="설명을 입력해주세요..."
          />
        </div>
      </div>
    </div>
  );
};

export default RsvpExample;
