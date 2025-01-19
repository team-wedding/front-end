import BackIcon from '../../icons/BackIcon';
import NextIcon from '../../icons/NextIcon';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  // onPreview?: () => void; // 미리보기 버튼 핸들러
}

export const StepNavigation = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  // onPreview,
}: StepNavigationProps) => {
  return (
    <div className="flex w-full justify-center gap-64">
      {/* Previous Button */}
      <button
        onClick={onPrev}
        className={`px-2 py-1 rounded bg-rose-300 ${currentStep === 1 ? 'opacity-0' : 'hover:bg-rose-200'
          }`}
        disabled={currentStep === 1}
      >
        <BackIcon />
      </button>
      <button
        onClick={onNext}
        className={`px-2 py-1 rounded bg-rose-300 ${currentStep === totalSteps ? 'opacity-0' : 'hover:bg-rose-200'
          }`}
        disabled={currentStep === totalSteps}
      >
        <NextIcon />
      </button>
    </div>
  );
};
