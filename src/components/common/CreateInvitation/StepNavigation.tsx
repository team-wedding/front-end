import BackIcon from '@icons/BackIcon';
import NextIcon from '@icons/NextIcon';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
}

export const StepNavigation = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
}: StepNavigationProps) => {
  return (
    <div className="flex w-full justify-between mx-6">
      {/* Previous Button */}
      <button
        onClick={onPrev}
        className={`px-2 py-1 rounded-lg bg-rose-200 ${
          currentStep === 1 ? 'opacity-0' : 'hover:bg-rose-100'
        }`}
        disabled={currentStep === 1}
      >
        <BackIcon />
      </button>

      <button
        onClick={onNext}
        className={`px-2 py-1 rounded-lg bg-rose-200 ${
          currentStep === totalSteps ? 'opacity-0' : 'hover:bg-rose-100'
        }`}
        disabled={currentStep === totalSteps}
      >
        <NextIcon />
      </button>
    </div>
  );
};
