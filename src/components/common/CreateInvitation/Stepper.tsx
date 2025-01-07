import React from 'react';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center bg-white px-10 py-4 shadow-md font-Paperlogy">
      {steps.map((step, index) => {
        const isActive = index + 1 === currentStep;
        const isCompleted = index + 1 < currentStep;
        return (
          <React.Fragment key={index}>
            {/* Step Indicator */}
            <div className="flex items-center">
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
                className={`ml-2 text-xs ${
                  isActive
                    ? 'text-primary font-medium'
                    : 'text-gray-300 font-light'
                }`}
              >
                {step}
              </div>
            </div>

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
