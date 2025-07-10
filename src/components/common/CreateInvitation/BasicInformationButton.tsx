interface BasicInformationButtonProps {
  basicInfo: boolean;
  setBasicInfo: (info: boolean) => void;
}

const BasicInformationButton = ({
  basicInfo,
  setBasicInfo,
}: BasicInformationButtonProps) => {
  return (
    <div>
      <div className="max-w-md mx-auto mb-3">
        {!basicInfo ? (
          <button
            className="text-sm text-slate-100 px-4 py-2 rounded-lg shadow-sm backdrop-blur-xl bg-slate-900/5 hover:bg-slate-900/10 transition-all duration-300"
            onClick={() => setBasicInfo(true)}
          >
            기본 정보 불러오기
          </button>
        ) : (
          <button
            className="text-sm px-4 py-2 rounded-lg shadow-sm backdrop-blur-xl bg-red-500/10 hover:bg-red-500/15 text-red-600/90 transition-all duration-300"
            onClick={() => setBasicInfo(false)}
          >
            초기화
          </button>
        )}
      </div>
    </div>
  );
};

export default BasicInformationButton;
