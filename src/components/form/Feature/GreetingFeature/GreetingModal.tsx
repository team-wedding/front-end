import useGreetingStore from '../../../store/useGreetingStore';
import CloseIcon from '../../icons/CloseIcon';

const greetingSample = [
  `저희 두 사람의 작은 만남이\n 사랑의 결실을 이루어\n소중한 결혼식을 올리게 되었습니다.\n\n평생 서로 귀하게 여기며\n첫 마음 그대로 존중하고 배려하며 살겠습니다.\n\n오로지 믿음과 사랑을 약속하는 날\n오셔서 축복해 주시면 더없는 기쁨으로\n간직하겠습니다.`,
  `서로에게 행복을 주는 사람을 만났습니다.\n웃는 모습이 너무나 예쁜 그 사람을 만났습니다.\n배려하는 마음이 따뜻한 그 사람을 만났습니다.\n\n운명처럼 만나게 된 우리의 인연\n그 인연에 이끌려 이제 영원을\n함께 약속하려 합니다.\n\n저희의 하나 됨을 지켜보아 주시고\n격려해 주시면 더없는 기쁨으로\n간직하겠습니다.`,
];

const GreetingModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { selectedSample, setSelectedSample, setGreeting } = useGreetingStore();

  if (!isOpen) return null;

  return (
    <div
      id="select-modal"
      tabIndex={-1}
      aria-hidden="false"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-auto min-h-screen"
      onClick={onClose}
    >
      <div className="relative w-full h-full max-w-md p-10 text-sm">
        <div className="bg-white rounded-lg shadow-md h-3/4">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <h3 className="text-base font-semibold text-gray-900">
                샘플 문구 선택
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2"
              >
                <CloseIcon className="size-[26px]" />
              </button>
            </div>
            <div className="flex flex-col gap-4 p-4 overflow-y-auto">
              {greetingSample.map((text, index) => (
                <button
                  key={index}
                  className={`whitespace-pre-wrap cursor-pointer p-5 rounded-lg border w-full ${
                    text === selectedSample
                      ? 'border-black bg-gray-100'
                      : 'border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setSelectedSample(text);
                    setGreeting(text);
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
