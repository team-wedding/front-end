import React from 'react';
import BackIcon from '../../icons/BackIcon';
import NextIcon from '../../icons/NextIcon';

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
    <div className="flex w-full justify-center gap-64 text-xs p-4">
      {/* Previous Button */}
      <button
        onClick={onPrev}
        className={`px-2 py-1 rounded  ${
          currentStep === 1
            ? 'text-gray-300 bg-rose-300 cursor-not-allowed shadow-xl'
            : 'text-gray-700 bg-rose-300 shadow-xl hover:bg-rose-200'
        }`}
        disabled={currentStep === 1}
      >
        <BackIcon />
      </button>

      {/* Conditional Next/Preview Button */}
      {currentStep === totalSteps ? (
        // 미리보기 버튼만 활성화
        <button
          onClick={onPreview}
          className="px-2 py-1 rounded text-gray-800 bg-rose-300 shadow-xl hover:bg-opacity-80"
        >
          {/* 미리보기 */}
        </button>
      ) : (
        // Next Button
        <button
          onClick={onNext}
          className={`px-2 py-1 rounded text-white ${
            currentStep === totalSteps
              ? 'border-gray-300 bg-gray-500 cursor-not-allowed shadow-xl'
              : 'bg-rose-300 border-rose-200 shadow-xl hover:bg-rose-200'
          }`}
          disabled={currentStep === totalSteps}
        >
          <NextIcon />
        </button>
      )}
    </div>
  );
};
