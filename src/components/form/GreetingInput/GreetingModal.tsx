import React from 'react';
import useGreetingStore from '../../../store/useGreetingStore';

const greetingSample = ['샘플 1', '샘플 2'];

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
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-md p-4">
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">
              샘플 문구 선택
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">닫기</span>
            </button>
          </div>
          <div className="p-4 space-y-4">
            <ul className="space-y-4">
              {greetingSample.map((text, index) => (
                <li
                  key={index}
                  className={`cursor-pointer p-5 rounded-lg border ${
                    text === selectedSample
                      ? 'border-black bg-gray-100'
                      : 'border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedSample(text)}
                >
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button
                onClick={() => {
                  if (selectedSample) {
                    setGreeting(selectedSample);
                    onClose();
                  }
                }}
                className="bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
                disabled={!selectedSample}
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingModal;
