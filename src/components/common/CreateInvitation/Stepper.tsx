import React from 'react';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="stepper-layout">
      {steps.map((step, index) => {
        const isActive = index + 1 === currentStep;
        const isCompleted = index + 1 < currentStep;
        return (
          <React.Fragment key={index}>
            {/* Step Indicator */}
            <button
              className="flex items-center rounded-xl px-1 py-2 hover:bg-gray-300 hover:bg-opacity-20 transition-all ease-in-out duration-100"
              onClick={() => onStepClick(index + 1)}
            >
              <div
                className={`w-3 h-3 flex items-center justify-center rounded-full text-[8px] font-bold border ${
                  isActive
                    ? 'text-primary border-primary'
                    : isCompleted
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-white text-gray-300'
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`ml-2 ${
                  isActive
                    ? 'text-primary font-medium'
                    : 'text-gray-300 font-light'
                }`}
              >
                {step}
              </div>
            </button>

            {/* Divider */}
            {index < steps.length - 1 && (
              <div className="flex-grow h-px bg-gray-300 mx-2"></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
