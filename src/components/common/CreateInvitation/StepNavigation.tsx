import BackIcon from '@icons/BackIcon';
import NextIcon from '@icons/NextIcon';
import { useNavigate } from 'react-router';
import logo from '@assets/logo.png';

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
  const navigate = useNavigate();

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

      {/* 미리보기 버튼 */}
      <button
        className="absolute bottom-20 right-10  column-center gap-2"
        onClick={() => navigate('/preview')}
      >
        <img
          src={logo}
          className="h-10 bg-white rounded-full shadow-xl hover:opacity-70"
        />
        <span className="animate-bounce bg-white rounded-md px-1">
          미리보기
        </span>
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
