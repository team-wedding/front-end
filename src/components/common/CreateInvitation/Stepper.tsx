interface StepperProps {
  stepItem: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const Stepper = ({
  stepItem,
  currentStep,
  onStepClick,
}: StepperProps) => {
  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="glass-stepper p-1 flex-center">
        {stepItem.map((step, index) => {
          const isActive = index === currentStep;

          return (
            <button
              key={index}
              onClick={() => onStepClick(index)}
              className={`flex-1 py-3 px-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                isActive
                  ? 'glass-active text-slate-800 shadow-lg'
                  : 'text-slate-600 hover:text-slate-900/40 hover:bg-white/10'
              }
                  `}
            >
              <span>{step}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
