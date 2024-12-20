import React from 'react';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onPreview?: () => void; // 미리보기 버튼 핸들러
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onPreview,
}) => {
  return (
    <div className="flex w-full justify-center gap-56 text-xs">
      {/* Previous Button */}
      <button
        onClick={onPrev}
        className={`px-4 rounded border ${
          currentStep === 1
            ? 'text-gray-300 border-gray-200 cursor-not-allowed'
            : 'text-gray-700 border-gray-300 hover:bg-gray-100'
        }`}
        disabled={currentStep === 1}
      >
        이전
      </button>

      {/* Conditional Next/Preview Button */}
      {currentStep === totalSteps ? (
        // 미리보기 버튼만 활성화
        <button
          onClick={onPreview}
          className="px-4 py-2 rounded text-white bg-primary hover:bg-opacity-80"
        >
          미리보기
        </button>
      ) : (
        // Next Button
        <button
          onClick={onNext}
          className={`px-4 py-2 rounded text-white ${
            currentStep === totalSteps
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-primary hover:bg-opacity-80'
          }`}
          disabled={currentStep === totalSteps}
        >
          다음
        </button>
      )}
    </div>
  );
};
