import Toggle from '@common/Toggle';
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
    <div className="max-w-lg mx-auto px-4 flex flex-col text-xs">
      <section className="text-[10px] text-gray-500">
        <div className="flex items-start gap-1 mb-1">
          <span className="text-gray-600">ⓘ</span>
          <span>결혼식 당일의 구체적인 계획에 도움을 받을수있습니다.</span>
        </div>
        <div className="flex items-start gap-1">
          <span className="text-gray-600">ⓘ</span>
          <span>제출된 답변은 마이페이지에서 확인할 수 있습니다.</span>
        </div>
      </section>
      <section className="flex  gap-3 flex-col mt-2">
        <div className="flex flex-col gap-1">
          제목 :
          <input
            onChange={setRSVPonChange}
            name="rsvpTitle"
            type="text"
            value={rsvpTitle}
            className="text-xs rounded-md border border-gray-300 shadow-md focus:outline-none focus:border-none"
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div className="flex flex-col gap-1">
          설명 :
          <textarea
            onChange={setRSVPonChange}
            name="rsvpDescription"
            value={rsvpDescription}
            className="resize-none px-2 p-3 text-[10px] leading-3 rounded-md border border-gray-300 shadow-md"
            placeholder="설명을 입력해주세요..."
          />
        </div>
        <hr />
        <div className="flex flex-row justify-between items-center  border rounded-md p-2">
          식사여부
          <Toggle state={rsvpIncludeMeal} setState={setRSVPIncludeMeal} />
        </div>
        <div className="flex flex-row justify-between items-center border rounded-md p-2">
          참석 인원
          <Toggle state={rsvpIncludePopulation} setState={setRSVPIncludePopulation} />
        </div>
      </section>
    </div>
  );
};

export default RsvpExample;
