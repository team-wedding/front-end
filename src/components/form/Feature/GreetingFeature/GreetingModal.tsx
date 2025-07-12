import useGreetingStore from '@store/useGreetingStore';
import CloseIcon from '@icons/CloseIcon';

const greetingSample = [
  `저희 두 사람의 작은 만남이\n사랑의 결실을 이루어\n소중한 결혼식을 올리게 되었습니다.\n\n평생 서로 귀하게 여기며\n첫 마음 그대로 존중하고 배려하며 살겠습니다.\n\n오로지 믿음과 사랑을 약속하는 날\n오셔서 축복해 주시면 더없는 기쁨으로\n간직하겠습니다.`,
  `서로에게 행복을 주는 사람을 만났습니다.\n웃는 모습이 너무나 예쁜 그 사람을 만났습니다.\n배려하는 마음이 따뜻한 그 사람을 만났습니다.\n\n운명처럼 만나게 된 우리의 인연\n그 인연에 이끌려 이제 영원을\n함께 약속하려 합니다.\n\n저희의 하나 됨을 지켜보아 주시고\n격려해 주시면 더없는 기쁨으로\n간직하겠습니다.`,
];

const GreetingModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { selectedSample, setSelectedSample, setGreetingContent } =
    useGreetingStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div className="p-10">
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <div
                className="mx-2 text-sm font-semibold text-gray-900"
                onClick={(e) => e.stopPropagation()}
              >
                샘플 문구 선택
              </div>

              <button onClick={onClose}>
                <CloseIcon className="size-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4 p-5 pb-10 overflow-y-auto">
              {greetingSample.map((text, index) => (
                <button
                  key={index}
                  className={`whitespace-pre-wrap text-sm cursor-pointer leading-6 p-5 rounded-lg border w-full ${
                    text === selectedSample
                      ? 'border-black bg-gray-100'
                      : 'border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setSelectedSample(text);
                    setGreetingContent(text);
                  }}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingModal;
